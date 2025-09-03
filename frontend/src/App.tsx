/**
 * 🎨 App Component - Resoluty Dashboard
 * 
 * Componente principal da aplicação que gerencia:
 * - Roteamento entre páginas
 * - Sistema de autenticação Firebase
 * - Layout responsivo com sidebar
 * - Proteção de rotas
 * 
 * @author Resoluty
 * @version 1.0.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import Home from './pages/Home';
import CustomerSuccess from './pages/CustomerSuccess';
import Gestao from './pages/Gestao';
import Financeiro from './pages/Financeiro';
import Comercial from './pages/Comercial';
import Administrativo from './pages/Administrativo';

// Constante para largura da sidebar
const SIDEBAR_WIDTH = 240;

/**
 * Componente principal de rotas da aplicação
 * Gerencia navegação e lógica de autenticação
 */
function AppRoutes() {
  const location = useLocation();
  const hideSidebar = location.pathname === '/login';

  return (
    <div style={{ display: 'flex' }}>
      {/* Renderizar sidebar apenas se não estiver na página de login */}
      {!hideSidebar && <Sidebar />}
      
      {/* Conteúdo principal com padding ajustável */}
      <div style={{ 
        flex: 1, 
        paddingLeft: !hideSidebar ? SIDEBAR_WIDTH : 0, 
        transition: 'padding-left 0.2s' 
      }}>
        <Routes>
          {/* Rota pública - Login */}
          <Route path="/login" element={<Login />} />
          
          {/* Rotas protegidas */}
          <Route path="/" element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } />
          
          <Route path="/home" element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } />
          
          <Route path="/gestao" element={
            <PrivateRoute>
              <Gestao />
            </PrivateRoute>
          } />
          
          <Route path="/financeiro" element={
            <PrivateRoute>
              <Financeiro />
            </PrivateRoute>
          } />
          
          <Route path="/comercial" element={
            <PrivateRoute>
              <Comercial />
            </PrivateRoute>
          } />
          
          <Route path="/customer-success" element={
            <PrivateRoute>
              <CustomerSuccess />
            </PrivateRoute>
          } />
          
          <Route path="/administrativo" element={
            <PrivateRoute>
              <Administrativo />
            </PrivateRoute>
          } />
          
          {/* Rota padrão - redirecionar para home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}

/**
 * Componente raiz da aplicação
 * Configura o roteador, contexto de autenticação e renderiza as rotas
 */
export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}
