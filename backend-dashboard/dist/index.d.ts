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
import { Server } from 'socket.io';
declare const io: Server<import("socket.io").DefaultEventsMap, import("socket.io").DefaultEventsMap, import("socket.io").DefaultEventsMap, any>;
export { io };
//# sourceMappingURL=index.d.ts.map