# 🔧 Backend Dashboard - Resoluty

Servidor API Node.js/Express que fornece endpoints para o frontend e integração com Google Sheets.

## 📋 Visão Geral

O backend é responsável por:
- Servir APIs REST para o frontend
- Gerenciar comunicação em tempo real via Socket.IO
- Integrar com Google Sheets para armazenamento de dados
- Fornecer logs e estatísticas de uso

## 🏗️ Estrutura

```
backend-dashboard/
├── src/
│   ├── index.ts                    # Servidor principal
│   └── services/
│       └── googleSheetsService.ts  # Serviço Google Sheets
├── package.json
├── tsconfig.json
└── README.md
```

## 🚀 Configuração

### 1. Instalação de Dependências

```bash
npm install
```

### 2. Variáveis de Ambiente

Crie um arquivo `.env` na raiz:

```env
PORT=4000
GOOGLE_SHEET_ID=sua_sheet_id_aqui
GOOGLE_CREDENTIALS_PATH=./credentials.json
NODE_ENV=development
```

### 3. Configuração Google Sheets

1. **Criar Projeto Google Cloud**:
   - Acesse [Google Cloud Console](https://console.cloud.google.com/)
   - Crie um novo projeto
   - Habilite a Google Sheets API

2. **Criar Service Account**:
   - Vá para "IAM & Admin" > "Service Accounts"
   - Clique em "Create Service Account"
   - Baixe o arquivo JSON de credenciais

3. **Configurar Credenciais**:
   - Renomeie o arquivo para `credentials.json`
   - Coloque na raiz do projeto backend
   - Compartilhe sua planilha com o email da Service Account

### 4. Executar

**Desenvolvimento:**
```bash
npm run dev
```

**Produção:**
```bash
npm run build
npm start
```

## 📊 APIs Disponíveis

### Health Check
```http
GET /api/health
```

**Resposta:**
```json
{
  "status": "ok",
  "message": "Backend Dashboard Resoluty rodando!",
  "services": {
    "googleSheets": "connected",
    "socketIO": "active"
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Google Sheets

#### Testar Conexão
```http
GET /api/sheets/test
```

#### Escrever Dados
```http
POST /api/sheets/write
Content-Type: application/json

{
  "range": "A1:B2",
  "values": [["Dado1", "Dado2"], ["Dado3", "Dado4"]]
}
```

#### Ler Dados
```http
GET /api/sheets/read/A1:D10
```

#### Adicionar Dados
```http
POST /api/sheets/append
Content-Type: application/json

{
  "range": "A:A",
  "values": [["Novo Dado"]]
}
```

#### Registrar Log
```http
POST /api/sheets/log
Content-Type: application/json

{
  "type": "user-action",
  "data": {
    "action": "login",
    "details": "Usuário fez login",
    "userId": "user123"
  }
}
```

### Socket.IO

#### Emitir Evento
```http
POST /api/emit
Content-Type: application/json

{
  "event": "data-updated",
  "data": { "message": "Dados atualizados" },
  "room": "dashboard" // opcional
}
```

### Estatísticas
```http
GET /api/stats
```

## 🔧 Serviços

### Google Sheets Service

O serviço `googleSheetsService.ts` gerencia toda a integração com Google Sheets:

#### Métodos Principais

- `testConnection()`: Testa a conexão com Google Sheets
- `writeData(range, values)`: Escreve dados em uma faixa específica
- `readData(range)`: Lê dados de uma faixa específica
- `appendData(range, values)`: Adiciona dados ao final de uma faixa
- `logUserAction(action, details, userId)`: Registra ações do usuário
- `logFrontendEvent(event, details)`: Registra eventos do frontend
- `getStats()`: Retorna estatísticas de uso
- `createHeaders()`: Cria cabeçalhos nas abas de log

#### Estrutura das Planilhas

**Aba: UserActions**
| Coluna | Descrição |
|--------|-----------|
| A | Data/Hora |
| B | User ID |
| C | Ação |
| D | Detalhes |
| E | Timestamp |

**Aba: FrontendEvents**
| Coluna | Descrição |
|--------|-----------|
| A | Data/Hora |
| B | Evento |
| C | Detalhes |
| D | Timestamp |

## 🔒 Segurança

### CORS
Configurado para permitir requisições do frontend:
```typescript
app.use(cors({
  origin: "*", // Em produção, especifique domínios específicos
  methods: ["GET", "POST"]
}));
```

### Validação de Entrada
Todas as APIs validam os dados de entrada antes de processar:
```typescript
if (!range || !values) {
  return res.status(400).json({ 
    ok: false, 
    error: 'Range e values são obrigatórios' 
  });
}
```

### Tratamento de Erros
Erros são capturados e retornados de forma consistente:
```typescript
try {
  // operação
} catch (error: any) {
  console.error('❌ Erro:', error);
  res.status(500).json({ 
    ok: false, 
    error: error.message 
  });
}
```

## 📈 Monitoramento

### Logs
O servidor registra logs detalhados:
- Conexões Socket.IO
- Operações Google Sheets
- Erros e exceções
- Estatísticas de uso

### Health Check
Endpoint `/api/health` fornece status dos serviços:
- Status geral do servidor
- Status da conexão Google Sheets
- Status do Socket.IO
- Timestamp da verificação

## 🚀 Deploy

### Heroku
```bash
# Configurar variáveis de ambiente
heroku config:set GOOGLE_SHEET_ID=sua_sheet_id
heroku config:set GOOGLE_CREDENTIALS_PATH=./credentials.json

# Deploy
git push heroku main
```

### Vercel
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## 🔧 Scripts Disponíveis

```json
{
  "scripts": {
    "start": "node dist/index.js",
    "dev": "ts-node src/index.ts",
    "build": "tsc",
    "watch": "tsc -w"
  }
}
```

## 📝 Dependências

### Produção
- `express`: Servidor web
- `cors`: Cross-origin resource sharing
- `dotenv`: Gerenciamento de variáveis de ambiente
- `socket.io`: Comunicação em tempo real
- `googleapis`: Integração Google APIs
- `fs`: Sistema de arquivos
- `path`: Manipulação de caminhos

### Desenvolvimento
- `@types/node`: Tipos TypeScript para Node.js
- `@types/express`: Tipos TypeScript para Express
- `@types/cors`: Tipos TypeScript para CORS
- `typescript`: Compilador TypeScript
- `ts-node`: Execução TypeScript

## 🐛 Troubleshooting

### Erro de Conexão Google Sheets
1. Verifique se o arquivo `credentials.json` existe
2. Confirme se a planilha está compartilhada com a Service Account
3. Verifique se a Google Sheets API está habilitada

### Erro de CORS
1. Verifique se o frontend está rodando na porta correta
2. Confirme a configuração CORS no backend

### Erro de Socket.IO
1. Verifique se o servidor está rodando
2. Confirme se o cliente está conectando na URL correta

## 📞 Suporte

Para problemas específicos do backend, verifique:
1. Logs do console
2. Status do endpoint `/api/health`
3. Configuração das variáveis de ambiente
4. Permissões do Google Sheets 