import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Sidebar from './components/Sidebar'
import LoginPage from './components/Login'
import Comercial from './pages/Comercial'
import CustomerSuccessOverview from './pages/CustomerSuccessOverview'
import CustomerSuccessStatus from './pages/CustomerSuccessStatus'
import CustomerSuccessFinance from './pages/CustomerSuccessFinance'
import Administrativo from './pages/Administrativo'
import Gestao from './pages/Gestao'
import Home from './components/Home'

// Wrapper component para páginas que requerem autenticação
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { currentUser, loading } = useAuth()

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <div>Carregando...</div>
      </div>
    )
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

// Layout com Sidebar para páginas protegidas
function DashboardLayout({ children, isCollapsed, onToggle }: { children: React.ReactNode; isCollapsed: boolean; onToggle: () => void }) {
  const sidebarWidth = isCollapsed ? 64 : 240;
  
  return (
    <>
      <Sidebar isCollapsed={isCollapsed} onToggle={onToggle} />
      <main style={{ 
        marginLeft: `${sidebarWidth}px`,
        transition: 'margin-left 0.3s ease',
        minHeight: '100vh'
      }}>
        {children}
      </main>
    </>
  )
}

function AppRoutes() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const DashboardLayoutWithState = ({ children }: { children: React.ReactNode }) => (
    <DashboardLayout isCollapsed={isCollapsed} onToggle={() => setIsCollapsed(!isCollapsed)}>
      {children}
    </DashboardLayout>
  );

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayoutWithState>
              <Home />
            </DashboardLayoutWithState>
          </ProtectedRoute>
        }
      />
      <Route
        path="/comercial"
        element={
          <ProtectedRoute>
            <DashboardLayoutWithState>
              <Comercial />
            </DashboardLayoutWithState>
          </ProtectedRoute>
        }
      />
      <Route
        path="/customer-success/overview"
        element={
          <ProtectedRoute>
            <DashboardLayoutWithState>
              <CustomerSuccessOverview />
            </DashboardLayoutWithState>
          </ProtectedRoute>
        }
      />
      <Route
        path="/customer-success/status"
        element={
          <ProtectedRoute>
            <DashboardLayoutWithState>
              <CustomerSuccessStatus />
            </DashboardLayoutWithState>
          </ProtectedRoute>
        }
      />
      <Route
        path="/customer-success/finance"
        element={
          <ProtectedRoute>
            <DashboardLayoutWithState>
              <CustomerSuccessFinance />
            </DashboardLayoutWithState>
          </ProtectedRoute>
        }
      />
      <Route
        path="/customer-success"
        element={<Navigate to="/customer-success/overview" replace />}
      />
      <Route
        path="/administrativo"
        element={
          <ProtectedRoute>
            <DashboardLayoutWithState>
              <Administrativo />
            </DashboardLayoutWithState>
          </ProtectedRoute>
        }
      />
      <Route
        path="/gestao"
        element={
          <ProtectedRoute>
            <DashboardLayoutWithState>
              <Gestao />
            </DashboardLayoutWithState>
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App

