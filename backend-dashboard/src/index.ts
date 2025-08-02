/**
 * 🚀 Backend Dashboard - Resoluty
 * 
 * Servidor principal que fornece APIs REST e Socket.IO para o frontend.
 * 
 * Funcionalidades:
 * - API REST para integração com Google Sheets
 * - Socket.IO para comunicação em tempo real
 * - Logging de ações do usuário e eventos
 * - Health check e monitoramento
 * 
 * @author Resoluty
 * @version 1.0.0
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { googleSheetsService } from './services/googleSheetsService';

// Configuração de variáveis de ambiente
dotenv.config();

// Inicialização do servidor Express
const app = express();
const server = createServer(app);

// Configuração Socket.IO com CORS
const io = new Server(server, {
  cors: {
    origin: "*", // Em produção, especifique domínios específicos
    methods: ["GET", "POST"]
  }
});

// Middleware para CORS e parsing JSON
app.use(cors());
app.use(express.json());

/**
 * Socket.IO Connection Handling
 * Gerencia conexões em tempo real com o frontend
 */
io.on('connection', (socket) => {
  console.log('👤 Cliente conectado:', socket.id);

  // Entrar em uma sala específica
  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    console.log(`📥 Cliente ${socket.id} entrou na sala ${roomId}`);
  });

  // Cliente desconectado
  socket.on('disconnect', () => {
    console.log('👤 Cliente desconectado:', socket.id);
  });
});

/**
 * Health Check Endpoint
 * Retorna status dos serviços e informações do servidor
 */
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Backend Dashboard Resoluty rodando!',
    services: {
      googleSheets: 'connected',
      socketIO: 'active'
    },
    timestamp: new Date().toISOString()
  });
});

/**
 * Google Sheets API Endpoints
 * Fornece operações CRUD para Google Sheets
 */

// Testar conexão com Google Sheets
app.get('/api/sheets/test', async (req, res) => {
  try {
    const result = await googleSheetsService.testConnection();
    res.json({ ok: true, data: result });
  } catch (error: any) {
    console.error('❌ Erro ao testar Google Sheets:', error);
    res.status(500).json({ ok: false, error: error.message });
  }
});

// Escrever dados no Google Sheets
app.post('/api/sheets/write', async (req, res) => {
  const { range, values } = req.body;
  
  // Validação de entrada
  if (!range || !values) {
    return res.status(400).json({ ok: false, error: 'Range e values são obrigatórios' });
  }
  
  try {
    const result = await googleSheetsService.writeData(range, values);
    res.json({ ok: true, data: result });
  } catch (error: any) {
    console.error('❌ Erro ao escrever no Sheets:', error);
    res.status(500).json({ ok: false, error: error.message });
  }
});

// Ler dados do Google Sheets
app.get('/api/sheets/read/:range', async (req, res) => {
  const { range } = req.params;
  
  try {
    const result = await googleSheetsService.readData(range);
    res.json({ ok: true, data: result });
  } catch (error: any) {
    console.error('❌ Erro ao ler do Sheets:', error);
    res.status(500).json({ ok: false, error: error.message });
  }
});

// Adicionar dados ao Google Sheets
app.post('/api/sheets/append', async (req, res) => {
  const { range, values } = req.body;
  
  // Validação de entrada
  if (!range || !values) {
    return res.status(400).json({ ok: false, error: 'Range e values são obrigatórios' });
  }
  
  try {
    const result = await googleSheetsService.appendData(range, values);
    res.json({ ok: true, data: result });
  } catch (error: any) {
    console.error('❌ Erro ao adicionar no Sheets:', error);
    res.status(500).json({ ok: false, error: error.message });
  }
});

// Registrar logs no Google Sheets
app.post('/api/sheets/log', async (req, res) => {
  const { type, data } = req.body;
  
  // Validação de entrada
  if (!type || !data) {
    return res.status(400).json({ ok: false, error: 'Type e data são obrigatórios' });
  }
  
  try {
    // Roteamento de logs por tipo
    switch (type) {
      case 'user-action':
        await googleSheetsService.logUserAction(data.action, data.details, data.userId);
        break;
      case 'frontend-event':
        await googleSheetsService.logFrontendEvent(data.event, data.details);
        break;
      default:
        return res.status(400).json({ ok: false, error: 'Tipo de log não suportado' });
    }
    
    res.json({ ok: true, message: 'Log registrado com sucesso' });
  } catch (error: any) {
    console.error('❌ Erro ao registrar log:', error);
    res.status(500).json({ ok: false, error: error.message });
  }
});

/**
 * Socket.IO Event Emitter Endpoint
 * Permite emitir eventos para o frontend via HTTP
 */
app.post('/api/emit', async (req, res) => {
  const { event, data, room } = req.body;
  
  // Validação de entrada
  if (!event) {
    return res.status(400).json({ ok: false, error: 'Event é obrigatório' });
  }
  
  try {
    // Emitir para sala específica ou broadcast geral
    if (room) {
      io.to(room).emit(event, data);
    } else {
      io.emit(event, data);
    }
    
    res.json({ ok: true, message: 'Evento emitido com sucesso' });
  } catch (error: any) {
    console.error('❌ Erro ao emitir evento:', error);
    res.status(500).json({ ok: false, error: error.message });
  }
});

/**
 * Estatísticas Endpoint
 * Retorna estatísticas de uso do sistema
 */
app.get('/api/stats', async (req, res) => {
  try {
    const stats = await googleSheetsService.getStats();
    res.json({ ok: true, data: stats });
  } catch (error: any) {
    console.error('❌ Erro ao buscar estatísticas:', error);
    res.status(500).json({ ok: false, error: error.message });
  }
});

// Configuração da porta do servidor
const PORT = process.env.PORT || 4000;

// Inicialização do servidor
server.listen(PORT, () => {
  console.log(`🚀 Backend Dashboard rodando na porta ${PORT}`);
  console.log(`📡 Socket.IO habilitado para tempo real`);
  console.log(`📊 Google Sheets integração ativa`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🎯 Focado apenas no frontend!`);
});

// Exportar io para uso em outros módulos
export { io }; 