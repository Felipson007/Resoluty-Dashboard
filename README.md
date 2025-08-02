# 📊 Resoluty Dashboard

Um sistema de dashboard completo para gestão empresarial, desenvolvido com React/TypeScript no frontend e Node.js/Express no backend, com integração ao Google Sheets para armazenamento e análise de dados.

## 🚀 Visão Geral

O **Resoluty Dashboard** é uma aplicação web moderna que oferece:

- **Dashboard Interativo**: Visualização de KPIs e métricas em tempo real
- **Integração Google Sheets**: Sincronização automática com planilhas do Google
- **Sistema de Autenticação**: Controle de acesso com diferentes níveis de usuário
- **Interface Responsiva**: Design adaptável para desktop e mobile
- **Gráficos Dinâmicos**: Visualizações com Chart.js para análise de dados
- **Comunicação em Tempo Real**: Socket.IO para atualizações instantâneas

## 🏗️ Arquitetura

```
resolutyDashboard/
├── backend-dashboard/     # API Node.js + Express
│   ├── src/
│   │   ├── index.ts      # Servidor principal
│   │   └── services/
│   │       └── googleSheetsService.ts  # Integração Google Sheets
│   └── package.json
├── frontend/             # Aplicação React/TypeScript
│   ├── src/
│   │   ├── components/   # Componentes reutilizáveis
│   │   ├── pages/        # Páginas da aplicação
│   │   └── utils/        # Utilitários e APIs
│   └── package.json
└── README.md
```

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js** + **Express**: Servidor API REST
- **TypeScript**: Tipagem estática
- **Socket.IO**: Comunicação em tempo real
- **Google APIs**: Integração com Google Sheets
- **CORS**: Cross-origin resource sharing

### Frontend
- **React 18**: Biblioteca de interface
- **TypeScript**: Tipagem estática
- **Material-UI**: Componentes de interface
- **React Router**: Navegação entre páginas
- **Chart.js**: Gráficos e visualizações
- **Socket.IO Client**: Comunicação em tempo real

## 📋 Funcionalidades

### 🔐 Autenticação
- Sistema de login com diferentes níveis de acesso
- Proteção de rotas baseada em autenticação
- Armazenamento seguro de sessão

### 📊 Dashboards Especializados
- **Home**: Visão geral com KPIs principais
- **Customer Success**: Métricas de sucesso do cliente
- **Gestão**: Indicadores de gestão
- **Financeiro**: Dados financeiros
- **Comercial**: Métricas comerciais
- **Administrativo**: Controles administrativos

### 📈 Visualizações
- Gráficos de barras para comparações
- Gráficos de pizza para distribuições
- Gráficos de linha para tendências
- KPIs com indicadores visuais
- Dashboards responsivos

### 🔄 Integração Google Sheets
- Leitura automática de dados
- Escrita de logs e eventos
- Sincronização em tempo real
- Backup automático de dados

## 🚀 Como Executar

### Pré-requisitos
- Node.js 16+ 
- npm ou yarn
- Conta Google com Google Sheets API habilitada

### 1. Configuração do Backend

```bash
cd backend-dashboard
npm install
```

Crie um arquivo `.env` na raiz do backend:
```env
PORT=4000
GOOGLE_SHEET_ID=sua_sheet_id_aqui
GOOGLE_CREDENTIALS_PATH=./credentials.json
```

Configure as credenciais do Google Sheets:
1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um projeto e habilite a Google Sheets API
3. Crie uma Service Account
4. Baixe o arquivo JSON de credenciais
5. Renomeie para `credentials.json` e coloque na raiz do backend

### 2. Configuração do Frontend

```bash
cd frontend
npm install
```

### 3. Executando o Projeto

**Terminal 1 - Backend:**
```bash
cd backend-dashboard
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

### 4. Acessando a Aplicação

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000
- **Health Check**: http://localhost:4000/api/health

### 5. Credenciais de Teste

- **Admin**: `admin` / `admin123`
- **Usuário**: `user` / `user123`

## 📁 Estrutura Detalhada

### Backend (`backend-dashboard/`)

#### `src/index.ts`
- Servidor Express principal
- Configuração Socket.IO
- Rotas da API
- Middleware de CORS e JSON

#### `src/services/googleSheetsService.ts`
- Autenticação com Google Sheets API
- Operações de leitura/escrita
- Logging de eventos
- Estatísticas de uso

### Frontend (`frontend/`)

#### `src/App.tsx`
- Configuração de rotas
- Sistema de autenticação
- Layout principal da aplicação

#### `src/components/Sidebar.tsx`
- Menu lateral responsivo
- Navegação entre páginas
- Sistema de logout

#### `src/pages/`
- **Login.tsx**: Tela de autenticação
- **Home.tsx**: Dashboard principal
- **CustomerSuccess.tsx**: Métricas de CS
- **Gestao.tsx**: Indicadores de gestão
- **Financeiro.tsx**: Dados financeiros
- **Comercial.tsx**: Métricas comerciais
- **Administrativo.tsx**: Controles administrativos

#### `src/utils/`
- **api.ts**: Funções de comunicação com backend
- **googleSheets.ts**: Integração com Google Sheets

## 🔧 Configuração Avançada

### Variáveis de Ambiente

**Backend (.env):**
```env
PORT=4000
GOOGLE_SHEET_ID=1KQkNGco7Nht6J7JiD98heXPLOz_K8uwTQ45u_Vw2uLM
GOOGLE_CREDENTIALS_PATH=./credentials.json
NODE_ENV=development
```

### Google Sheets Setup

1. **Criar Planilha**: Crie uma planilha no Google Sheets
2. **Compartilhar**: Compartilhe com o email da Service Account
3. **Configurar Abas**: Configure as abas necessárias:
   - `UserActions`: Logs de ações dos usuários
   - `FrontendEvents`: Eventos do frontend
   - `Metas CS`: Metas do Customer Success

## 📊 APIs Disponíveis

### Health Check
```
GET /api/health
```

### Google Sheets
```
GET /api/sheets/test
POST /api/sheets/write
GET /api/sheets/read/:range
POST /api/sheets/append
POST /api/sheets/log
```

### Socket.IO
```
POST /api/emit
```

### Estatísticas
```
GET /api/stats
```

## 🎨 Design System

### Paleta de Cores (Resoluty)
```typescript
const resolutyPalette = {
  background: '#FFFFFF',
  sidebar: '#FFFFFF', 
  text: '#222222',
  textSecondary: '#757575',
  border: '#E0E0E0',
  card: '#FFFFFF',
  kpiHit: '#22C55E',
  kpiMiss: '#EF4444',
  // ... mais cores
};
```

## 🔒 Segurança

- Autenticação baseada em localStorage
- Validação de entrada em todas as APIs
- CORS configurado para desenvolvimento
- Sanitização de dados do Google Sheets

## 🚀 Deploy

### Backend (Heroku/Vercel)
```bash
cd backend-dashboard
npm run build
```

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👥 Equipe

- **Resoluty**: Desenvolvimento e manutenção

## 📞 Suporte

Para suporte, entre em contato com a equipe Resoluty ou abra uma issue no repositório.

---

**Resoluty Dashboard** - Transformando dados em insights acionáveis 🚀 