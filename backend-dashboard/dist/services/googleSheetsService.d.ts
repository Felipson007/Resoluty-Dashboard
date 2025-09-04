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
/**
 * Serviço principal do Google Sheets
 * Contém todos os métodos para interação com planilhas
 */
export declare const googleSheetsService: {
    /**
     * Testa a conexão com Google Sheets
     *
     * @returns Promise<object> - Status da conexão
     */
    testConnection(): Promise<{
        status: string;
        message: string;
        sheetId: string;
    } | {
        status: string;
        message: any;
        sheetId?: undefined;
    }>;
    /**
     * Escreve dados em uma faixa específica do Google Sheets
     *
     * @param range - Faixa da planilha (ex: 'A1:B2')
     * @param values - Array 2D com os valores
     * @returns Promise<object> - Resultado da operação
     */
    writeData(range: string, values: any[][]): Promise<any>;
    /**
     * Adiciona dados ao final de uma faixa no Google Sheets
     *
     * @param range - Faixa da planilha (ex: 'A:A')
     * @param values - Array 2D com os valores
     * @returns Promise<object> - Resultado da operação
     */
    appendData(range: string, values: any[][]): Promise<any>;
    /**
     * Lê dados de uma faixa específica do Google Sheets
     *
     * @param range - Faixa da planilha (ex: 'A1:D10')
     * @returns Promise<any[][]> - Array 2D com os dados
     */
    readData(range: string): Promise<any>;
    /**
     * Registra ações do usuário no Google Sheets
     *
     * @param action - Tipo da ação (ex: 'login', 'click_button')
     * @param details - Detalhes da ação (objeto ou string)
     * @param userId - ID do usuário (opcional)
     */
    logUserAction(action: string, details: any, userId?: string): Promise<void>;
    /**
     * Registra eventos do frontend no Google Sheets
     *
     * @param event - Tipo do evento (ex: 'page_load', 'chart_interaction')
     * @param details - Detalhes do evento (objeto ou string)
     */
    logFrontendEvent(event: string, details: any): Promise<void>;
    /**
     * Retorna estatísticas de uso do sistema
     *
     * @returns Promise<object> - Estatísticas das últimas 24h
     */
    getStats(): Promise<{
        status: string;
        message: string;
        userActions?: undefined;
        frontendEvents?: undefined;
        lastUpdate?: undefined;
        error?: undefined;
    } | {
        userActions: {
            total: any;
            last24h: any;
        };
        frontendEvents: {
            total: any;
            last24h: any;
        };
        lastUpdate: string;
        status?: undefined;
        message?: undefined;
        error?: undefined;
    } | {
        error: any;
        lastUpdate: string;
        status?: undefined;
        message?: undefined;
        userActions?: undefined;
        frontendEvents?: undefined;
    }>;
    /**
     * Cria cabeçalhos nas abas de log do Google Sheets
     * Deve ser executado uma vez para configurar a planilha
     */
    createHeaders(): Promise<void>;
};
//# sourceMappingURL=googleSheetsService.d.ts.map