/**
 * Configuração do Google API para integração com Google Sheets
 */

// Variáveis de ambiente para Google API
export const GOOGLE_CONFIG = {
  API_KEY: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || '',
  CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
  SPREADSHEET_ID: process.env.NEXT_PUBLIC_SPREADSHEET_ID || '',
  DISCOVERY_DOCS: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
  SCOPES: 'https://www.googleapis.com/auth/spreadsheets',
};

/**
 * Verifica se a configuração do Google está completa
 */
export function isGoogleConfigured(): boolean {
  return !!(GOOGLE_CONFIG.API_KEY && GOOGLE_CONFIG.CLIENT_ID && GOOGLE_CONFIG.SPREADSHEET_ID);
}

/**
 * Retorna mensagem de erro se a configuração estiver incompleta
 */
export function getConfigError(): string | null {
  if (!GOOGLE_CONFIG.API_KEY) return 'GOOGLE_API_KEY não configurada';
  if (!GOOGLE_CONFIG.CLIENT_ID) return 'GOOGLE_CLIENT_ID não configurado';
  if (!GOOGLE_CONFIG.SPREADSHEET_ID) return 'SPREADSHEET_ID não configurado';
  return null;
}

