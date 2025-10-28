import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Sidebar from './components/Sidebar'
import LoginPage from './components/Login'
import Home from './components/Home'
import Comercial from './pages/Comercial'
import CustomerSuccess from './pages/CustomerSuccess'
import Administrativo from './pages/Administrativo'
import Gestao from './pages/Gestao'

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
function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: 1, marginLeft: 240 }}>
        {children}
      </div>
    </div>
  )
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Home />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/comercial"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Comercial />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/customer-success"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <CustomerSuccess />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/administrativo"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Administrativo />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/gestao"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Gestao />
            </DashboardLayout>
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

