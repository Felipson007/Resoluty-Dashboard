# 🔐 Sistema de Autenticação - Resoluty Dashboard

## Visão Geral

O sistema de autenticação do Resoluty Dashboard utiliza Firebase Authentication e Firestore para gerenciar usuários de forma segura e escalável.

## 🚀 Funcionalidades

### ✅ Implementadas
- **Login/Logout** com email e senha
- **Cadastro** de novos usuários
- **Proteção de rotas** - usuários não autenticados são redirecionados para login
- **Perfil de usuário** armazenado no Firestore
- **Contexto de autenticação** para gerenciar estado global
- **Interface moderna** com Material-UI

### 🔧 Recursos Técnicos
- Firebase Authentication
- Firestore Database
- React Context API
- TypeScript
- Material-UI Components

## 📁 Estrutura de Arquivos

```
src/
├── firebase.ts                 # Configuração do Firebase
├── contexts/
│   └── AuthContext.tsx         # Contexto de autenticação
├── components/
│   ├── Login.tsx              # Componente de login/cadastro
│   └── PrivateRoute.tsx       # Proteção de rotas
└── services/
    └── userService.ts         # Serviços para gerenciar usuários
```

## 🛠️ Como Usar

### 1. Login
```typescript
import { useAuth } from '../contexts/AuthContext';

function MyComponent() {
  const { login, currentUser } = useAuth();
  
  const handleLogin = async () => {
    try {
      await login('user@example.com', 'password');
      // Usuário será redirecionado automaticamente
    } catch (error) {
      console.error('Erro no login:', error);
    }
  };
}
```

### 2. Cadastro
```typescript
import { useAuth } from '../contexts/AuthContext';

function MyComponent() {
  const { signup } = useAuth();
  
  const handleSignup = async () => {
    try {
      await signup('newuser@example.com', 'password');
      // Perfil será criado automaticamente no Firestore
    } catch (error) {
      console.error('Erro no cadastro:', error);
    }
  };
}
```

### 3. Logout
```typescript
import { useAuth } from '../contexts/AuthContext';

function MyComponent() {
  const { logout } = useAuth();
  
  const handleLogout = async () => {
    try {
      await logout();
      // Usuário será redirecionado para login
    } catch (error) {
      console.error('Erro no logout:', error);
    }
  };
}
```

### 4. Proteção de Rotas
```typescript
import PrivateRoute from '../components/PrivateRoute';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      } />
    </Routes>
  );
}
```

## 📊 Estrutura do Banco de Dados

### Coleção: `users`
```typescript
interface UserProfile {
  uid: string;              // ID único do Firebase Auth
  email: string;            // Email do usuário
  displayName?: string;     // Nome de exibição
  role?: string;            // Função/cargo
  department?: string;      // Departamento
  createdAt: Date;          // Data de criação
  lastLogin?: Date;         // Último login
  isActive: boolean;        // Status ativo/inativo
}
```

## 🔒 Segurança

### Regras do Firestore
- Usuários podem ler/escrever apenas seus próprios dados
- Usuários autenticados podem ler dados de outros usuários (para listagens)
- Acesso negado para usuários não autenticados

### Autenticação
- Senhas são criptografadas pelo Firebase
- Tokens JWT gerenciados automaticamente
- Sessões persistentes

## 🎨 Interface

### Componente de Login
- Design responsivo
- Validação de campos
- Mensagens de erro claras
- Alternância entre login e cadastro
- Loading states

### Sidebar
- Botão de logout integrado
- Informações do usuário logado
- Navegação protegida

## 🚀 Deploy

O sistema está configurado para deploy automático no Firebase:

1. **Build**: `npm run build`
2. **Deploy**: `firebase deploy`
3. **URL**: https://resolutydashboard.web.app

## 🔧 Configuração

### Firebase Console
1. Acesse: https://console.firebase.google.com/project/resolutydashboard
2. Habilite Authentication > Sign-in method > Email/Password
3. Configure Firestore Database
4. Verifique as regras de segurança

### Variáveis de Ambiente
As configurações do Firebase estão no arquivo `src/firebase.ts`:
```typescript
const firebaseConfig = {
  apiKey: "AIzaSyDgFH74k2pOBWnYew00OMVBjnQYXcYzZdY",
  authDomain: "resolutydashboard.firebaseapp.com",
  projectId: "resolutydashboard",
  // ... outras configurações
};
```

## 📝 Próximos Passos

### Funcionalidades Futuras
- [ ] Autenticação com Google/GitHub
- [ ] Recuperação de senha
- [ ] Verificação de email
- [ ] Roles e permissões avançadas
- [ ] Logs de auditoria
- [ ] Dashboard de administração de usuários

### Melhorias Técnicas
- [ ] Testes unitários
- [ ] Testes de integração
- [ ] Otimização de performance
- [ ] PWA (Progressive Web App)
- [ ] Offline support

## 🆘 Suporte

Para dúvidas ou problemas:
1. Verifique o console do navegador
2. Consulte os logs do Firebase
3. Teste a conectividade com o Firebase
4. Verifique as regras de segurança do Firestore

---

**Desenvolvido com ❤️ pela equipe Resoluty**
