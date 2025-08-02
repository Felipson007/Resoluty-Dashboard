/**
 * 📊 Google Sheets Service - Resoluty
 * 
 * Serviço responsável por toda integração com Google Sheets API.
 * 
 * Funcionalidades:
 * - Autenticação com Google Sheets API
 * - Operações CRUD (Create, Read, Update, Delete)
 * - Logging de eventos e ações do usuário
 * - Estatísticas de uso
 * - Tratamento de erros e fallbacks
 * 
 * @author Resoluty
 * @version 1.0.0
 */

import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

// Configuração das variáveis de ambiente
const SHEET_ID = process.env.GOOGLE_SHEET_ID;
const CREDENTIALS_PATH = process.env.GOOGLE_CREDENTIALS_PATH || './credentials.json';

// Variáveis globais para autenticação
let auth: any = null;
let sheets: any = null;

/**
 * Inicializa a autenticação com Google Sheets API
 * 
 * @returns Promise<any> - Objeto de autenticação ou null se falhar
 */
async function initializeAuth() {
  if (auth) return auth;
  
  try {
    // Verificar se arquivo de credenciais existe
    if (!fs.existsSync(CREDENTIALS_PATH)) {
      console.log('⚠️ Arquivo credentials.json não encontrado. Google Sheets desabilitado.');
      return null;
    }
    
    // Ler e parsear credenciais
    const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));
    
    // Configurar autenticação
    auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });
    
    // Inicializar serviço do Google Sheets
    sheets = google.sheets({ version: 'v4', auth });
    
    console.log('✅ Google Sheets autenticação inicializada');
    return auth;
  } catch (error: any) {
    console.error('❌ Erro ao inicializar Google Sheets:', error.message);
    return null;
  }
}

/**
 * Serviço principal do Google Sheets
 * Contém todos os métodos para interação com planilhas
 */
export const googleSheetsService = {
  
  /**
   * Testa a conexão com Google Sheets
   * 
   * @returns Promise<object> - Status da conexão
   */
  async testConnection() {
    try {
      await initializeAuth();
      
      if (!auth || !SHEET_ID) {
        return { status: 'disabled', message: 'Google Sheets não configurado' };
      }
      
      // Tentar ler uma célula para testar conexão
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: 'A1:A1',
      });
      
      return { 
        status: 'connected', 
        message: 'Google Sheets conectado com sucesso',
        sheetId: SHEET_ID
      };
    } catch (error: any) {
      console.error('❌ Erro ao testar Google Sheets:', error);
      return { 
        status: 'error', 
        message: error.message 
      };
    }
  },

  /**
   * Escreve dados em uma faixa específica do Google Sheets
   * 
   * @param range - Faixa da planilha (ex: 'A1:B2')
   * @param values - Array 2D com os valores
   * @returns Promise<object> - Resultado da operação
   */
  async writeData(range: string, values: any[][]) {
    try {
      await initializeAuth();
      
      if (!auth || !SHEET_ID) {
        console.log('⚠️ Google Sheets não configurado, pulando escrita');
        return { status: 'skipped' };
      }
      
      const response = await sheets.spreadsheets.values.update({
        spreadsheetId: SHEET_ID,
        range: range,
        valueInputOption: 'RAW',
        resource: {
          values: values
        }
      });
      
      console.log(`📊 Dados escritos no Sheets: ${range}`);
      return response.data;
    } catch (error: any) {
      console.error('❌ Erro ao escrever no Sheets:', error);
      throw error;
    }
  },

  /**
   * Adiciona dados ao final de uma faixa no Google Sheets
   * 
   * @param range - Faixa da planilha (ex: 'A:A')
   * @param values - Array 2D com os valores
   * @returns Promise<object> - Resultado da operação
   */
  async appendData(range: string, values: any[][]) {
    try {
      await initializeAuth();
      
      if (!auth || !SHEET_ID) {
        console.log('⚠️ Google Sheets não configurado, pulando append');
        return { status: 'skipped' };
      }
      
      const response = await sheets.spreadsheets.values.append({
        spreadsheetId: SHEET_ID,
        range: range,
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        resource: {
          values: values
        }
      });
      
      console.log(`📊 Dados adicionados no Sheets: ${range}`);
      return response.data;
    } catch (error: any) {
      console.error('❌ Erro ao adicionar no Sheets:', error);
      throw error;
    }
  },

  /**
   * Lê dados de uma faixa específica do Google Sheets
   * 
   * @param range - Faixa da planilha (ex: 'A1:D10')
   * @returns Promise<any[][]> - Array 2D com os dados
   */
  async readData(range: string) {
    try {
      await initializeAuth();
      
      if (!auth || !SHEET_ID) {
        console.log('⚠️ Google Sheets não configurado, retornando vazio');
        return [];
      }
      
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: range,
      });
      
      return response.data.values || [];
    } catch (error: any) {
      console.error('❌ Erro ao ler do Sheets:', error);
      throw error;
    }
  },

  /**
   * Registra ações do usuário no Google Sheets
   * 
   * @param action - Tipo da ação (ex: 'login', 'click_button')
   * @param details - Detalhes da ação (objeto ou string)
   * @param userId - ID do usuário (opcional)
   */
  async logUserAction(action: string, details: any, userId: string = 'frontend-user') {
    try {
      const timestamp = new Date().toISOString();
      const formattedDate = new Date().toLocaleString('pt-BR');
      
      // Formatar dados para inserção
      const row = [
        formattedDate,                    // Data/Hora formatada
        userId,                          // ID do usuário
        action,                          // Tipo da ação
        JSON.stringify(details).substring(0, 500), // Detalhes (limitado a 500 chars)
        timestamp                        // Timestamp ISO
      ];
      
      await this.appendData('UserActions!A:E', [row]);
      console.log(`📝 Ação do usuário logada: ${action}`);
    } catch (error: any) {
      console.error('❌ Erro ao logar ação do usuário:', error);
      // Não propagar erro para não quebrar fluxo principal
    }
  },

  /**
   * Registra eventos do frontend no Google Sheets
   * 
   * @param event - Tipo do evento (ex: 'page_load', 'chart_interaction')
   * @param details - Detalhes do evento (objeto ou string)
   */
  async logFrontendEvent(event: string, details: any) {
    try {
      const timestamp = new Date().toISOString();
      const formattedDate = new Date().toLocaleString('pt-BR');
      
      // Formatar dados para inserção
      const row = [
        formattedDate,                    // Data/Hora formatada
        event,                           // Tipo do evento
        JSON.stringify(details).substring(0, 500), // Detalhes (limitado a 500 chars)
        timestamp                        // Timestamp ISO
      ];
      
      await this.appendData('FrontendEvents!A:D', [row]);
      console.log(`📊 Evento do frontend logado: ${event}`);
    } catch (error: any) {
      console.error('❌ Erro ao logar evento do frontend:', error);
      // Não propagar erro para não quebrar fluxo principal
    }
  },

  /**
   * Retorna estatísticas de uso do sistema
   * 
   * @returns Promise<object> - Estatísticas das últimas 24h
   */
  async getStats() {
    try {
      await initializeAuth();
      
      if (!auth || !SHEET_ID) {
        return { status: 'disabled', message: 'Google Sheets não configurado' };
      }

      // Buscar dados das abas de log
      const userActionsData = await this.readData('UserActions!A:E');
      const frontendEventsData = await this.readData('FrontendEvents!A:D');
      
      // Calcular período das últimas 24h
      const now = new Date();
      const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      
      // Filtrar dados das últimas 24h
      const recentUserActions = userActionsData.filter((row: any[]) => {
        if (row.length < 5) return false;
        const rowDate = new Date(row[4]); // timestamp está na coluna 5 (índice 4)
        return rowDate > yesterday;
      });
      
      const recentFrontendEvents = frontendEventsData.filter((row: any[]) => {
        if (row.length < 4) return false;
        const rowDate = new Date(row[3]); // timestamp está na coluna 4 (índice 3)
        return rowDate > yesterday;
      });

      return {
        userActions: {
          total: userActionsData.length,
          last24h: recentUserActions.length
        },
        frontendEvents: {
          total: frontendEventsData.length,
          last24h: recentFrontendEvents.length
        },
        lastUpdate: new Date().toISOString()
      };
    } catch (error: any) {
      console.error('❌ Erro ao buscar estatísticas:', error);
      return { 
        error: error.message,
        lastUpdate: new Date().toISOString()
      };
    }
  },

  /**
   * Cria cabeçalhos nas abas de log do Google Sheets
   * Deve ser executado uma vez para configurar a planilha
   */
  async createHeaders() {
    try {
      // Headers para aba de Ações do Usuário
      const userActionHeaders = [
        ['Data/Hora', 'User ID', 'Ação', 'Detalhes', 'Timestamp']
      ];
      
      // Headers para aba de Eventos do Frontend
      const frontendEventHeaders = [
        ['Data/Hora', 'Evento', 'Detalhes', 'Timestamp']
      ];
      
      // Escrever headers nas respectivas abas
      await this.writeData('UserActions!A1:E1', userActionHeaders);
      await this.writeData('FrontendEvents!A1:D1', frontendEventHeaders);
      
      console.log('✅ Headers criados no Google Sheets');
    } catch (error: any) {
      console.error('❌ Erro ao criar headers:', error);
    }
  }
}; 