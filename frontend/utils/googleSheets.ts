/**
 * Utilitário para leitura de Google Sheets via Google API diretamente
 */

import { googleSheetsService } from '../services/googleSheetsService';

/**
 * Obtém dados de uma planilha do Google Sheets
 * 
 * @param spreadsheetId - ID da planilha
 * @param sheetName - Nome da aba (ex: 'A1:D10')
 * @returns Promise<any[][]> - Array 2D com os dados
 */
export async function getSheetData(spreadsheetId: string, sheetName: string): Promise<any[][]> {
  try {
    return await googleSheetsService.readData(spreadsheetId, sheetName);
  } catch (error: any) {
    console.error('Erro ao buscar dados do Google Sheets:', error);
    throw error;
  }
} 