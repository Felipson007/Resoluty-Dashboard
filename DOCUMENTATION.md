# 📚 Documentação Técnica - Resoluty Dashboard

Documentação completa e detalhada do sistema Resoluty Dashboard, incluindo arquitetura, APIs, componentes e guias de desenvolvimento.

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Arquitetura do Sistema](#arquitetura-do-sistema)
3. [Backend - APIs e Serviços](#backend---apis-e-serviços)
4. [Frontend - Componentes e Páginas](#frontend---componentes-e-páginas)
5. [Integração Google Sheets](#integração-google-sheets)
6. [Sistema de Autenticação](#sistema-de-autenticação)
7. [Design System](#design-system)
8. [Deploy e Configuração](#deploy-e-configuração)
9. [Troubleshooting](#troubleshooting)
10. [Guia de Desenvolvimento](#guia-de-desenvolvimento)

## 🎯 Visão Geral

O **Resoluty Dashboard** é uma aplicação web full-stack desenvolvida para visualização e gestão de dados empresariais. O sistema combina:

- **Frontend**: React/TypeScript com Material-UI
- **Backend**: Node.js/Express com TypeScript
- **Banco de Dados**: Google Sheets (como fonte de dados)
- **Comunicação**: Socket.IO para tempo real
- **Autenticação**: Sistema baseado em localStorage

### 🏗️ Stack Tecnológica

| Camada | Tecnologia | Versão | Propósito |
|--------|------------|--------|-----------|
| **Frontend** | React | 18.2.0 | Interface de usuário |
| **Frontend** | TypeScript | 4.9.5 | Tipagem estática |
| **Frontend** | Material-UI | 5.15.15 | Componentes UI |
| **Frontend** | Chart.js | 4.5.0 | Gráficos |
| **Backend** | Node.js | 16+ | Runtime |
| **Backend** | Express | 4.18.2 | Servidor web |
| **Backend** | Socket.IO | 4.7.2 | Tempo real |
| **Backend** | Google APIs | 128.0.0 | Integração Sheets |

## 🏗️ Arquitetura do Sistema

### Diagrama de Arquitetura

```
┌─────────────────┐    HTTP/WebSocket    ┌─────────────────┐
│   Frontend      │ ◄──────────────────► │    Backend      │
│   (React)       │                      │   (Node.js)     │
└─────────────────┘                      └─────────────────┘
         │                                        │
         │                                        │
         ▼                                        ▼
┌─────────────────┐                      ┌─────────────────┐
│  Google Sheets  │                      │  Google APIs    │
│   (Dados)       │                      │   (Auth)        │
└─────────────────┘                      └─────────────────┘
```

### Fluxo de Dados

1. **Autenticação**: Usuário faz login → localStorage armazena sessão
2. **Navegação**: Sidebar gerencia rotas protegidas
3. **Dados**: Frontend solicita dados via API → Backend consulta Google Sheets
4. **Tempo Real**: Socket.IO mantém conexão para atualizações
5. **Logs**: Ações do usuário são registradas no Google Sheets

## 🔧 Backend - APIs e Serviços

### Estrutura de Arquivos

```
backend-dashboard/
├── src/
│   ├── index.ts                    # Servidor principal
│   └── services/
│       └── googleSheetsService.ts  # Serviço Google Sheets
├── package.json
├── tsconfig.json
└── .env
```

### Servidor Principal (`src/index.ts`)

#### Configuração Inicial

```typescript
// Configuração do servidor Express
const app = express();
const server = createServer(app);

// Configuração Socket.IO com CORS
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());
```

#### Endpoints Disponíveis

| Método | Endpoint | Descrição | Parâmetros |
|--------|----------|-----------|------------|
| `GET` | `/api/health` | Status dos serviços | - |
| `GET` | `/api/sheets/test` | Testar conexão Sheets | - |
| `POST` | `/api/sheets/write` | Escrever dados | `range`, `values` |
| `GET` | `/api/sheets/read/:range` | Ler dados | `range` (URL) |
| `POST` | `/api/sheets/append` | Adicionar dados | `range`, `values` |
| `POST` | `/api/sheets/log` | Registrar logs | `type`, `data` |
| `POST` | `/api/emit` | Emitir eventos | `event`, `data`, `room` |
| `GET` | `/api/stats` | Estatísticas | - |

#### Socket.IO Events

```typescript
// Conexão
io.on('connection', (socket) => {
  console.log('👤 Cliente conectado:', socket.id);
  
  // Entrar em sala
  socket.on('join-room', (roomId) => {
    socket.join(roomId);
  });
  
  // Desconexão
  socket.on('disconnect', () => {
    console.log('👤 Cliente desconectado:', socket.id);
  });
});
```

### Google Sheets Service (`src/services/googleSheetsService.ts`)

#### Métodos Principais

```typescript
export const googleSheetsService = {
  // Testar conexão
  async testConnection(): Promise<object>
  
  // Operações CRUD
  async writeData(range: string, values: any[][]): Promise<object>
  async readData(range: string): Promise<any[][]>
  async appendData(range: string, values: any[][]): Promise<object>
  
  // Logging
  async logUserAction(action: string, details: any, userId?: string): Promise<void>
  async logFrontendEvent(event: string, details: any): Promise<void>
  
  // Estatísticas
  async getStats(): Promise<object>
  
  // Configuração
  async createHeaders(): Promise<void>
};
```

#### Estrutura das Planilhas

**Aba: UserActions**
| Coluna | Tipo | Descrição |
|--------|------|-----------|
| A | String | Data/Hora (pt-BR) |
| B | String | User ID |
| C | String | Tipo da ação |
| D | String | Detalhes (JSON) |
| E | String | Timestamp (ISO) |

**Aba: FrontendEvents**
| Coluna | Tipo | Descrição |
|--------|------|-----------|
| A | String | Data/Hora (pt-BR) |
| B | String | Tipo do evento |
| C | String | Detalhes (JSON) |
| D | String | Timestamp (ISO) |

## 🎨 Frontend - Componentes e Páginas

### Estrutura de Arquivos

```
frontend/
├── src/
│   ├── components/
│   │   └── Sidebar.tsx
│   ├── pages/
│   │   ├── Login.tsx
│   │   ├── Home.tsx
│   │   ├── CustomerSuccess.tsx
│   │   ├── Gestao.tsx
│   │   ├── Financeiro.tsx
│   │   ├── Comercial.tsx
│   │   └── Administrativo.tsx
│   ├── utils/
│   │   ├── api.ts
│   │   └── googleSheets.ts
│   ├── @types/
│   │   └── gapi-script.d.ts
│   ├── App.tsx
│   └── index.tsx
└── public/
```

### Componente Principal (`src/App.tsx`)

#### Sistema de Rotas

```typescript
// Rota pública
<Route path="/login" element={<Login />} />

// Rotas protegidas
<Route path="/home" element={
  <ProtectedRoute>
    <Home />
  </ProtectedRoute>
} />
```

#### Proteção de Rotas

```typescript
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}
```

### Sidebar (`src/components/Sidebar.tsx`)

#### Configuração de Seções

```typescript
const sections = [
  {
    title: 'Home',
    items: [
      { text: 'Home', icon: <HomeIcon />, path: '/home' },
    ],
  },
  {
    title: 'Administrativo',
    items: [
      { text: 'Gestão', icon: <PeopleIcon />, path: '/gestao' },
      { text: 'Financeiro', icon: <BarChartIcon />, path: '/financeiro' },
    ],
  },
  // ...
];
```

#### Responsividade

```typescript
// Mobile: Drawer temporário
if (isMobile) {
  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={open}>
        {/* Conteúdo mobile */}
      </Drawer>
    </>
  );
}

// Desktop: Sidebar fixa
return (
  <Drawer variant="permanent">
    {/* Conteúdo desktop */}
  </Drawer>
);
```

### Páginas Principais

#### Login (`src/pages/Login.tsx`)

```typescript
// Credenciais de teste
const credentials = {
  admin: { username: 'admin', password: 'admin123' },
  user: { username: 'user', password: 'user123' }
};

// Validação
const handleLogin = async (e: React.FormEvent) => {
  if (username === 'admin' && password === 'admin123') {
    localStorage.setItem('isAuthenticated', 'true');
    navigate('/home');
  }
};
```

#### Customer Success (`src/pages/CustomerSuccess.tsx`)

**KPIs Principais:**
- Meta de faturamento
- Realizado atual
- Diferença (meta - realizado)
- Percentual da meta
- Avaliações Google

**Gráficos Disponíveis:**
1. Faturamento por Funcionário (Bar)
2. Número de Acordos por Funcionário (Bar)
3. P.E/Adimplência por Funcionário (Bar)
4. Grande por Funcionário (Bar)
5. Quitação Geral (Pie)
6. Média de Meses de Quitação (Pie)
7. Vazão da Carteira (Pie)

**Integração Google Sheets:**
```typescript
// Configuração
const SHEET_ID = '1KQkNGco7Nht6J7JiD98heXPLOz_K8uwTQ45u_Vw2uLM';
const SHEET_TAB = 'Metas CS';

// Atualização automática
useEffect(() => {
  const interval = setInterval(fetchSheet, 10 * 60 * 1000); // 10 minutos
  return () => clearInterval(interval);
}, []);
```

## 📊 Integração Google Sheets

### Configuração

1. **Criar Projeto Google Cloud**
   ```bash
   # Acessar Google Cloud Console
   # Criar novo projeto
   # Habilitar Google Sheets API
   ```

2. **Criar Service Account**
   ```bash
   # IAM & Admin > Service Accounts
   # Create Service Account
   # Download JSON credentials
   ```

3. **Configurar Credenciais**
   ```bash
   # Renomear para credentials.json
   # Colocar na raiz do backend
   # Compartilhar planilha com email da Service Account
   ```

### Variáveis de Ambiente

```env
# Backend (.env)
PORT=4000
GOOGLE_SHEET_ID=sua_sheet_id_aqui
GOOGLE_CREDENTIALS_PATH=./credentials.json
NODE_ENV=development
```

### Operações Disponíveis

```typescript
// Leitura
const data = await googleSheetsService.readData('A1:D10');

// Escrita
await googleSheetsService.writeData('A1:B2', [['Dado1', 'Dado2']]);

// Adição
await googleSheetsService.appendData('A:A', [['Novo Dado']]);

// Logging
await googleSheetsService.logUserAction('login', { userId: 'user123' });
await googleSheetsService.logFrontendEvent('page_load', { page: '/dashboard' });
```

## 🔐 Sistema de Autenticação

### Fluxo de Autenticação

1. **Login**: Usuário insere credenciais
2. **Validação**: Frontend valida localmente
3. **Armazenamento**: localStorage salva sessão
4. **Proteção**: Rotas verificam autenticação
5. **Logout**: Remove dados e redireciona

### Implementação

```typescript
// Login
localStorage.setItem('isAuthenticated', 'true');
localStorage.setItem('user', JSON.stringify({ username, role }));

// Verificação
const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

// Logout
localStorage.removeItem('isAuthenticated');
localStorage.removeItem('user');
```

### Credenciais de Teste

| Usuário | Senha | Role |
|---------|-------|------|
| `admin` | `admin123` | Admin |
| `user` | `user123` | User |

## 🎨 Design System

### Paleta de Cores (Resoluty)

```typescript
const resolutyPalette = {
  // Cores principais
  background: '#FFFFFF',
  sidebar: '#FFFFFF',
  text: '#222222',
  textSecondary: '#757575',
  border: '#E0E0E0',
  card: '#FFFFFF',
  
  // KPIs
  kpiHit: '#22C55E',
  kpiMiss: '#EF4444',
  
  // Gráficos
  chartMain: ['#4ADE80', '#3B82F6', '#FBBF24', '#F97316', '#8B5CF6', '#FB7185'],
  
  // Estados
  sucesso: '#4ADE80',
  alerta: '#FBBF24',
  erro: '#EF4444',
  
  // Interações
  hoverSidebar: '#F5F5F5',
  activeSidebar: '#E0E0E0'
};
```

### Tipografia

```typescript
// Títulos
<Typography variant="h4" fontWeight={700}>

// Subtítulos
<Typography variant="h6" fontWeight={600}>

// Corpo
<Typography variant="body1" fontWeight={400}>

// Legendas
<Typography variant="body2" color="textSecondary">
```

### Componentes

#### Cards
```typescript
const cardStyle = {
  background: resolutyPalette.card,
  borderRadius: 3,
  boxShadow: 4,
  border: `1.5px solid ${resolutyPalette.border}`,
  padding: 3
};
```

#### KPIs
```typescript
const kpiStyle = {
  p: 3,
  borderRadius: 3,
  background: resolutyPalette.card,
  color: resolutyPalette.text,
  fontWeight: 700,
  textAlign: 'center',
  boxShadow: 4,
  minWidth: 180,
  minHeight: 90
};
```

## 🚀 Deploy e Configuração

### Desenvolvimento Local

```bash
# Backend
cd backend-dashboard
npm install
npm run dev

# Frontend
cd frontend
npm install
npm start
```

### Produção

#### Backend (Heroku)
```bash
# Configurar variáveis
heroku config:set GOOGLE_SHEET_ID=sua_sheet_id
heroku config:set GOOGLE_CREDENTIALS_PATH=./credentials.json

# Deploy
git push heroku main
```

#### Frontend (Vercel)
```bash
# Build
npm run build

# Deploy
vercel
```

### Variáveis de Ambiente

```env
# Backend
PORT=4000
GOOGLE_SHEET_ID=1KQkNGco7Nht6J7JiD98heXPLOz_K8uwTQ45u_Vw2uLM
GOOGLE_CREDENTIALS_PATH=./credentials.json
NODE_ENV=production

# Frontend (se necessário)
REACT_APP_API_URL=http://localhost:4000
```

## 🐛 Troubleshooting

### Problemas Comuns

#### 1. Erro de CORS
```bash
# Verificar se backend está rodando
curl http://localhost:4000/api/health

# Verificar configuração CORS no backend
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"]
}));
```

#### 2. Google Sheets não conecta
```bash
# Verificar arquivo credentials.json
ls -la credentials.json

# Verificar permissões da planilha
# Compartilhar com email da Service Account

# Testar conexão
curl http://localhost:4000/api/sheets/test
```

#### 3. Gráficos não carregam
```typescript
// Verificar se Chart.js está registrado
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);
```

#### 4. Autenticação não funciona
```javascript
// Verificar localStorage
localStorage.getItem('isAuthenticated')
localStorage.getItem('user')

// Limpar dados
localStorage.clear()
```

### Logs Úteis

#### Backend
```bash
# Logs de conexão
👤 Cliente conectado: socket_id
📥 Cliente socket_id entrou na sala room_id

# Logs Google Sheets
✅ Google Sheets autenticação inicializada
📊 Dados escritos no Sheets: A1:B2
📝 Ação do usuário logada: login
```

#### Frontend
```javascript
// Console do navegador
console.log('Dados carregados:', data);
console.log('Erro na API:', error);
```

## 👨‍💻 Guia de Desenvolvimento

### Adicionando Novas Páginas

1. **Criar componente**
```typescript
// src/pages/NovaPagina.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';

export default function NovaPagina() {
  return (
    <Box>
      <Typography variant="h4">Nova Página</Typography>
    </Box>
  );
}
```

2. **Adicionar rota**
```typescript
// src/App.tsx
import NovaPagina from './pages/NovaPagina';

<Route path="/nova-pagina" element={
  <ProtectedRoute>
    <NovaPagina />
  </ProtectedRoute>
} />
```

3. **Adicionar ao menu**
```typescript
// src/components/Sidebar.tsx
const sections = [
  {
    title: 'Nova Seção',
    items: [
      { text: 'Nova Página', icon: <Icon />, path: '/nova-pagina' },
    ],
  },
];
```

### Adicionando Novos Gráficos

```typescript
// Configuração do gráfico
const chartData = {
  labels: ['Label1', 'Label2'],
  datasets: [{
    label: 'Dados',
    data: [10, 20],
    backgroundColor: resolutyPalette.chartMain[0]
  }]
};

// Renderização
<Bar data={chartData} options={chartOptions('Título do Gráfico')} />
```

### Adicionando Novas APIs

```typescript
// Backend
app.get('/api/nova-api', async (req, res) => {
  try {
    const result = await algumServico();
    res.json({ ok: true, data: result });
  } catch (error: any) {
    res.status(500).json({ ok: false, error: error.message });
  }
});

// Frontend
const fetchData = async () => {
  const response = await fetch('/api/nova-api');
  const data = await response.json();
  return data;
};
```

### Boas Práticas

1. **TypeScript**: Sempre usar tipagem
2. **Componentes**: Reutilizáveis e modulares
3. **Estados**: Usar hooks apropriados
4. **Erros**: Tratar sempre com try/catch
5. **Logs**: Registrar ações importantes
6. **Performance**: Otimizar re-renders
7. **Responsividade**: Testar em diferentes tamanhos
8. **Acessibilidade**: Usar semantic HTML

---

**Resoluty Dashboard** - Documentação Técnica v1.0.0 📚 