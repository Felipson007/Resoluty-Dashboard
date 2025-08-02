# 🎨 Frontend Dashboard - Resoluty

Aplicação React/TypeScript com Material-UI que fornece uma interface moderna e responsiva para visualização de dados e KPIs empresariais.

## 📋 Visão Geral

O frontend é responsável por:
- Interface de usuário moderna e responsiva
- Visualização de dados com gráficos interativos
- Sistema de autenticação e navegação
- Integração com backend via APIs REST
- Comunicação em tempo real via Socket.IO

## 🏗️ Estrutura

```
frontend/
├── src/
│   ├── components/           # Componentes reutilizáveis
│   │   └── Sidebar.tsx      # Menu lateral
│   ├── pages/               # Páginas da aplicação
│   │   ├── Login.tsx        # Tela de login
│   │   ├── Home.tsx         # Dashboard principal
│   │   ├── CustomerSuccess.tsx  # Métricas CS
│   │   ├── Gestao.tsx       # Indicadores gestão
│   │   ├── Financeiro.tsx   # Dados financeiros
│   │   ├── Comercial.tsx    # Métricas comerciais
│   │   └── Administrativo.tsx # Controles administrativos
│   ├── utils/               # Utilitários
│   │   ├── api.ts           # Funções API
│   │   └── googleSheets.ts  # Integração Google Sheets
│   ├── @types/              # Definições TypeScript
│   │   └── gapi-script.d.ts # Tipos Google API
│   ├── App.tsx              # Componente principal
│   └── index.tsx            # Ponto de entrada
├── public/                  # Arquivos estáticos
└── package.json
```

## 🚀 Configuração

### 1. Instalação de Dependências

```bash
npm install
```

### 2. Configuração do Backend

Certifique-se de que o backend está rodando na porta 4000:
```bash
cd ../backend-dashboard
npm run dev
```

### 3. Executar

```bash
npm start
```

A aplicação estará disponível em: http://localhost:3000

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

- **Títulos**: Material-UI Typography variant="h4" com fontWeight: 700
- **Subtítulos**: variant="h6" com fontWeight: 600
- **Corpo**: variant="body1" com fontWeight: 400
- **Legendas**: variant="body2" com color: textSecondary

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

## 📱 Páginas

### Login (`src/pages/Login.tsx`)

Tela de autenticação com:
- Formulário de login responsivo
- Validação de credenciais
- Feedback visual de erros
- Design consistente com a paleta Resoluty

**Credenciais de Teste:**
- Admin: `admin` / `admin123`
- Usuário: `user` / `user123`

### Home (`src/pages/Home.tsx`)

Dashboard principal com:
- KPIs de faturamento
- Cards informativos
- Layout responsivo
- Design limpo e moderno

### Customer Success (`src/pages/CustomerSuccess.tsx`)

Página mais complexa com:
- **KPIs Principais**: Meta, Realizado, Diferença, % Meta, Avaliações
- **Gráficos Interativos**: Barras, Pizza, Linha
- **Integração Google Sheets**: Leitura automática de dados
- **Atualização Automática**: A cada 10 minutos
- **Responsividade**: Adaptável para mobile

**Gráficos Disponíveis:**
1. Faturamento por Funcionário (Bar)
2. Número de Acordos por Funcionário (Bar)
3. P.E/Adimplência por Funcionário (Bar)
4. Grande por Funcionário (Bar)
5. Quitação Geral (Pie)
6. Média de Meses de Quitação (Pie)
7. Vazão da Carteira (Pie)

### Outras Páginas

- **Gestao.tsx**: Indicadores de gestão
- **Financeiro.tsx**: Dados financeiros
- **Comercial.tsx**: Métricas comerciais
- **Administrativo.tsx**: Controles administrativos

## 🔧 Componentes

### Sidebar (`src/components/Sidebar.tsx`)

Menu lateral responsivo com:
- **Desktop**: Menu fixo com largura 240px
- **Mobile**: Drawer temporário
- **Navegação**: Links para todas as páginas
- **Logout**: Botão para sair da aplicação
- **Logo**: Logo da Resoluty
- **Estados**: Hover e ativo

**Seções:**
1. **Home**: Dashboard principal
2. **Administrativo**: Gestão e Financeiro
3. **Geral**: Comercial, Customer Success, Administrativo

## 🔌 Integração

### APIs (`src/utils/api.ts`)

Funções para comunicação com backend:
```typescript
export async function getSheetData(sheetId: string, tab: string): Promise<any[][]>
```

### Google Sheets (`src/utils/googleSheets.ts`)

Integração direta com Google Sheets via backend:
```typescript
export async function getSheetData(spreadsheetId: string, sheetName: string): Promise<any[][]>
```

## 📊 Gráficos

### Chart.js Configuration

```typescript
const chartOptions = (title: string, isPie = false) => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: { color: resolutyPalette.text, font: { size: 18 } }
    },
    title: { 
      display: true, 
      text: title, 
      color: resolutyPalette.text, 
      font: { size: 18, weight: 700 } 
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        color: resolutyPalette.text,
        font: { size: 18, weight: 700 }
      }
    }
  }
});
```

### Tipos de Gráficos

1. **Bar Chart**: Para comparações entre categorias
2. **Pie Chart**: Para distribuições percentuais
3. **Line Chart**: Para tendências temporais

## 🔐 Autenticação

### Sistema de Rotas Protegidas

```typescript
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}
```

### Armazenamento de Sessão

- **localStorage**: Armazena estado de autenticação
- **Sessão**: Persiste durante a navegação
- **Logout**: Limpa dados e redireciona para login

## 📱 Responsividade

### Breakpoints Material-UI

```typescript
// Mobile
useMediaQuery(theme.breakpoints.down('sm'))

// Desktop
useMediaQuery(theme.breakpoints.up('md'))
```

### Layout Adaptativo

- **Sidebar**: Fixa no desktop, drawer no mobile
- **Gráficos**: Redimensionam automaticamente
- **Cards**: Flexbox responsivo
- **KPIs**: Grid adaptativo

## 🚀 Deploy

### Build de Produção

```bash
npm run build
```

### Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify

```bash
# Build
npm run build

# Deploy manual ou via Git
```

## 🔧 Scripts Disponíveis

```json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
}
```

## 📝 Dependências

### UI/UX
- `@mui/material`: Componentes Material-UI
- `@mui/icons-material`: Ícones Material-UI
- `@emotion/react`: Sistema de estilos
- `@emotion/styled`: Componentes estilizados

### Gráficos
- `chart.js`: Biblioteca de gráficos
- `react-chartjs-2`: Wrapper React para Chart.js
- `chartjs-plugin-datalabels`: Labels nos gráficos

### Navegação
- `react-router-dom`: Roteamento

### Google APIs
- `gapi-script`: Google API Script

### Desenvolvimento
- `@types/react`: Tipos TypeScript para React
- `@types/react-dom`: Tipos TypeScript para React DOM
- `@types/gapi`: Tipos Google API

## 🐛 Troubleshooting

### Erro de CORS
1. Verifique se o backend está rodando
2. Confirme a URL da API no código
3. Verifique configuração CORS no backend

### Gráficos não carregam
1. Verifique se Chart.js está registrado
2. Confirme se os dados estão no formato correto
3. Verifique console para erros

### Autenticação não funciona
1. Verifique localStorage no DevTools
2. Confirme se as credenciais estão corretas
3. Verifique se as rotas estão protegidas

## 📞 Suporte

Para problemas específicos do frontend:
1. Verifique console do navegador
2. Confirme se todas as dependências estão instaladas
3. Verifique se o backend está acessível
4. Teste em diferentes navegadores
