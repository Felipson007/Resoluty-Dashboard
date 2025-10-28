/**
 * 📊 Google Sheets Service - Resoluty Frontend
 * 
 * Serviço responsável por toda integração com Google Sheets API no frontend.
 * 
 * Funcionalidades:
 * - Autenticação com Google Sheets API via OAuth 2.0
 * - Operações CRUD (Create, Read, Update, Delete)
 * - Logging de eventos e ações do usuário
 * - Estatísticas de uso
 * - Tratamento de erros e fallbacks
 * 
 * @author Resoluty
 * @version 2.0.0
 */

// Variáveis globais para autenticação
let gapiLoaded = false;
let gisLoaded = false;

// Configuração do cliente Google API
const DISCOVERY_DOCS = ['https://sheets.googleapis.com/$discovery/rest?version=v4'];
const SCOPES = 'https://www.googleapis.com/auth/spreadsheets';

/**
 * Carrega a biblioteca do Google API
 */
export function loadGapi(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (gapiLoaded) {
      resolve();
      return;
    }

    // Carregar gapi
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.onload = () => {
      gapi.load('client', () => {
        gapiLoaded = true;
        resolve();
      });
      gapi.load('client', () => {
        gisLoaded = true;
      });
    };
    script.onerror = () => reject(new Error('Erro ao carregar Google API'));
    document.body.appendChild(script);
  });
}

/**
 * Inicializa a autenticação com Google Sheets API
 * 
 * @param apiKey - Chave da API do Google
 * @param clientId - ID do cliente OAuth
 * @returns Promise<any> - Objeto de autenticação ou null se falhar
 */
export async function initializeAuth(apiKey: string, clientId: string): Promise<any> {
  try {
    if (!apiKey || !clientId) {
      console.log('⚠️ API Key ou Client ID não configurados. Google Sheets desabilitado.');
      return null;
    }

    // Carregar gapi se ainda não carregou
    await loadGapi();

    // Inicializar cliente
    await gapi.client.init({
      apiKey,
      clientId,
      discoveryDocs: DISCOVERY_DOCS,
    });

    console.log('✅ Google Sheets autenticação inicializada');
    return gapi.client;
  } catch (error: any) {
    console.error('❌ Erro ao inicializar Google Sheets:', error.message);
    return null;
  }
}

/**
 * Faz o sign-in com Google OAuth
 * 
 * @param clientId - ID do cliente OAuth
 * @returns Promise<any> - Token de autenticação
 */
export async function signIn(clientId: string): Promise<any> {
  return new Promise((resolve, reject) => {
    try {
      if (typeof (window as any).google === 'undefined') {
        reject(new Error('Google API não carregada'));
        return;
      }
      
      const tokenClient = (window as any).google.accounts.oauth2.initTokenClient({
        client_id: clientId,
        scope: SCOPES,
        callback: (token: any) => {
          if (token.error) {
            reject(new Error(token.error));
          } else {
            resolve(token.access_token);
          }
        },
      });
      tokenClient.requestAccessToken();
    } catch (error: any) {
      reject(error);
    }
  });
}

/**
 * Faz sign-out
 */
export async function signOut(): Promise<void> {
  try {
    if (typeof (window as any).google === 'undefined' || !gapi.client) {
      return;
    }
    
    const token = gapi.client.getToken();
    if (token !== null) {
      (window as any).google.accounts.oauth2.revoke(token.access_token);
      gapi.client.setToken('');
    }
  } catch (error: any) {
    console.error('❌ Erro ao fazer sign-out:', error);
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
   * @param spreadsheetId - ID da planilha
   * @returns Promise<object> - Status da conexão
   */
  async testConnection(spreadsheetId: string) {
    try {
      if (!gapiLoaded) {
        return { status: 'not_initialized', message: 'Google Sheets não inicializado' };
      }

      // Tentar ler uma célula para testar conexão
      const response = await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId,
        range: 'A1:A1',
      });
      
      return { 
        status: 'connected', 
        message: 'Google Sheets conectado com sucesso',
        sheetId: spreadsheetId
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
   * @param spreadsheetId - ID da planilha
   * @param range - Faixa da planilha (ex: 'A1:B2')
   * @param values - Array 2D com os valores
   * @returns Promise<object> - Resultado da operação
   */
  async writeData(spreadsheetId: string, range: string, values: any[][]) {
    try {
      if (!gapiLoaded) {
        console.log('⚠️ Google Sheets não inicializado, pulando escrita');
        return { status: 'skipped' };
      }
      
      const response = await gapi.client.sheets.spreadsheets.values.update({
        spreadsheetId,
        range,
        valueInputOption: 'RAW',
        resource: {
          values
        }
      });
      
      console.log(`📊 Dados escritos no Sheets: ${range}`);
      return response.result;
    } catch (error: any) {
      console.error('❌ Erro ao escrever no Sheets:', error);
      throw error;
    }
  },

  /**
   * Adiciona dados ao final de uma faixa no Google Sheets
   * 
   * @param spreadsheetId - ID da planilha
   * @param range - Faixa da planilha (ex: 'A:A')
   * @param values - Array 2D com os valores
   * @returns Promise<object> - Resultado da operação
   */
  async appendData(spreadsheetId: string, range: string, values: any[][]) {
    try {
      if (!gapiLoaded) {
        console.log('⚠️ Google Sheets não inicializado, pulando append');
        return { status: 'skipped' };
      }
      
      const response = await gapi.client.sheets.spreadsheets.values.append({
        spreadsheetId,
        range,
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        resource: {
          values
        }
      });
      
      console.log(`📊 Dados adicionados no Sheets: ${range}`);
      return response.result;
    } catch (error: any) {
      console.error('❌ Erro ao adicionar no Sheets:', error);
      throw error;
    }
  },

  /**
   * Lê dados de uma faixa específica do Google Sheets
   * 
   * @param spreadsheetId - ID da planilha
   * @param range - Faixa da planilha (ex: 'A1:D10')
   * @returns Promise<any[][]> - Array 2D com os dados
   */
  async readData(spreadsheetId: string, range: string) {
    try {
      if (!gapiLoaded) {
        console.log('⚠️ Google Sheets não inicializado, retornando vazio');
        return [];
      }
      
      const response = await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId,
        range,
      });
      
      return response.result.values || [];
    } catch (error: any) {
      console.error('❌ Erro ao ler do Sheets:', error);
      throw error;
    }
  },

  /**
   * Registra ações do usuário no Google Sheets
   * 
   * @param spreadsheetId - ID da planilha
   * @param action - Tipo da ação (ex: 'login', 'click_button')
   * @param details - Detalhes da ação (objeto ou string)
   * @param userId - ID do usuário (opcional)
   */
  async logUserAction(spreadsheetId: string, action: string, details: any, userId: string = 'frontend-user') {
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
      
      await this.appendData(spreadsheetId, 'UserActions!A:E', [row]);
      console.log(`📝 Ação do usuário logada: ${action}`);
    } catch (error: any) {
      console.error('❌ Erro ao logar ação do usuário:', error);
      // Não propagar erro para não quebrar fluxo principal
    }
  },

  /**
   * Registra eventos do frontend no Google Sheets
   * 
   * @param spreadsheetId - ID da planilha
   * @param event - Tipo do evento (ex: 'page_load', 'chart_interaction')
   * @param details - Detalhes do evento (objeto ou string)
   */
  async logFrontendEvent(spreadsheetId: string, event: string, details: any) {
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
      
      await this.appendData(spreadsheetId, 'FrontendEvents!A:D', [row]);
      console.log(`📊 Evento do frontend logado: ${event}`);
    } catch (error: any) {
      console.error('❌ Erro ao logar evento do frontend:', error);
      // Não propagar erro para não quebrar fluxo principal
    }
  },

  /**
   * Retorna estatísticas de uso do sistema
   * 
   * @param spreadsheetId - ID da planilha
   * @returns Promise<object> - Estatísticas das últimas 24h
   */
  async getStats(spreadsheetId: string) {
    try {
      if (!gapiLoaded) {
        return { status: 'not_initialized', message: 'Google Sheets não inicializado' };
      }

      // Buscar dados das abas de log
      const userActionsData = await this.readData(spreadsheetId, 'UserActions!A:E');
      const frontendEventsData = await this.readData(spreadsheetId, 'FrontendEvents!A:D');
      
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
   * 
   * @param spreadsheetId - ID da planilha
   */
  async createHeaders(spreadsheetId: string) {
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
      await this.writeData(spreadsheetId, 'UserActions!A1:E1', userActionHeaders);
      await this.writeData(spreadsheetId, 'FrontendEvents!A1:D1', frontendEventHeaders);
      
      console.log('✅ Headers criados no Google Sheets');
    } catch (error: any) {
      console.error('❌ Erro ao criar headers:', error);
    }
  }
};

