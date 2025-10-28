/**
 * Função API simplificada para obter dados do Google Sheets
 * Agora usa o serviço direto do frontend
 */

import { getSheetData as getGoogleSheetsData } from './googleSheets';

/**
 * Obtém dados de uma planilha do Google Sheets
 * 
 * @param sheetId - ID da planilha
 * @param tab - Nome da aba (ex: 'A1:D10')
 * @returns Promise<any[][]> - Array 2D com os dados
 */
export async function getSheetData(sheetId: string, tab: string): Promise<any[][]> {
  try {
    return await getGoogleSheetsData(sheetId, tab);
  } catch (error: any) {
    console.error('Erro ao buscar dados:', error);
    throw error;
  }
} 