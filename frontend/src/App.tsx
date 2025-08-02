/**
 * 🎨 App Component - Resoluty Dashboard
 * 
 * Componente principal da aplicação que gerencia:
 * - Roteamento entre páginas
 * - Sistema de autenticação
 * - Layout responsivo com sidebar
 * - Proteção de rotas
 * 
 * @author Resoluty
 * @version 1.0.0
 */

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Home from './pages/Home';
import CustomerSuccess from './pages/CustomerSuccess';
import Gestao from './pages/Gestao';
import Financeiro from './pages/Financeiro';
import Comercial from './pages/Comercial';
import Administrativo from './pages/Administrativo';

// Constante para largura da sidebar
const SIDEBAR_WIDTH = 240;

/**
 * Componente para verificar autenticação e proteger rotas
 * 
 * @param children - Componentes filhos a serem renderizados se autenticado
 * @returns JSX.Element - Componente protegido ou redirecionamento
 */
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  // Verificar se usuário está autenticado via localStorage
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  // Se não autenticado, redirecionar para login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // Se autenticado, renderizar componentes filhos
  return <>{children}</>;
}

/**
 * Componente principal de rotas da aplicação
 * Gerencia navegação e lógica de autenticação
 */
function AppRoutes() {
  const location = useLocation();
  const hideSidebar = location.pathname === '/login';
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  // Se não estiver autenticado e não estiver na página de login, redirecionar
  if (!isAuthenticated && location.pathname !== '/login') {
    return <Navigate to="/login" replace />;
  }

  // Se estiver autenticado e estiver na página de login, redirecionar para home
  if (isAuthenticated && location.pathname === '/login') {
    return <Navigate to="/home" replace />;
  }

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
          <Route path="/home" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          
          <Route path="/gestao" element={
            <ProtectedRoute>
              <Gestao />
            </ProtectedRoute>
          } />
          
          <Route path="/financeiro" element={
            <ProtectedRoute>
              <Financeiro />
            </ProtectedRoute>
          } />
          
          <Route path="/comercial" element={
            <ProtectedRoute>
              <Comercial />
            </ProtectedRoute>
          } />
          
          <Route path="/customer-success" element={
            <ProtectedRoute>
              <CustomerSuccess />
            </ProtectedRoute>
          } />
          
          <Route path="/administrativo" element={
            <ProtectedRoute>
              <Administrativo />
            </ProtectedRoute>
          } />
          
          {/* Rota padrão - redirecionar para login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </div>
  );
}

/**
 * Componente raiz da aplicação
 * Configura o roteador e renderiza as rotas
 */
export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
