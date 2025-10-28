# 📊 Customer Success - Submenu

## Visão Geral

O Customer Success foi dividido em 3 páginas especializadas com submenu expansível no Sidebar.

## Estrutura

### 1. Customer Success - Geral
**Rota:** `/customer-success/geral`

Página com visão geral dos clientes:
- **Total de Clientes**: KPI principal (310 clientes)
- **Distribuição de Clientes**: Gráfico de pizza (Serviço vs Veículo)
- **Clientes por Fase**: Gráfico de barras (Fase 1 a 5)
- **Contato Pendente**: Gráfico de barras por fase
- **Planejar vs B.A.**: Gráfico de pizza
- **Distribuição de Status**: Gráfico de pizza (Negociação, Antecipação, etc.)
- **Tabela de Detalhes**: Lista de clientes com status e valores

### 2. Customer Success - Financeiro
**Rota:** `/customer-success/financeiro`

Página com métricas financeiras:
- **KPIs Principais**:
  - Meta: R$ 465.000,00
  - Realizado: R$ 320.728,73
  - Diferença: R$ -144.271,27
  - % Quitação: 73,26%
  - Meses Quitação: 12,43
- **Avaliação no Google**: Gráfico de pizza (Sim: 60% / Não: 40%)
- **Vazão de Carteira**: Gráfico de pizza (Sim: 5.9% / Não: 94.1%)

### 3. Customer Success - Atendimentos
**Rota:** `/customer-success/atendimentos`

Página com métricas de atendimento:
- **KPIs Superiores**: Faturamento, Adimplência, Acordos, Google
- **Relatórios**: Gráfico de barras (Realizado: 586, Atrasado: 113, Pendente: 13)
- **B.A. Lista**: Gráfico de barras (Realizado: 571, Atrasado: 107, Pendente: 7)
- **Contato Cliente**: Lista de clientes
- **Pendência Retorno/B.A.**: Lista de pendências com motivos
- **Contato Assessoria**: Lista de assessoria
- **Honorários**:
  - Honorários do Dia: R$ 704,80
  - Honorários em Aberto: R$ 7.939,60
  - Recuperação Total: R$ 50.978,94

## Navegação

O submenu está implementado no Sidebar com:
- Ícone de expansão/colapso
- Expansão automática quando em páginas de CS
- Navegação suave entre as 3 páginas
- Responsivo para mobile e desktop

## Tecnologias

- **Next.js 14**: App Router com páginas dinâmicas
- **Material-UI**: Componentes e design system
- **Chart.js**: Gráficos interativos
- **TypeScript**: Tipagem estática

## Como Usar

1. Acesse o Dashboard
2. No menu lateral, clique em "Customer Success"
3. O submenu será expandido automaticamente
4. Escolha uma das 3 opções:
   - Geral
   - Financeiro
   - Atendimentos

## Estrutura de Arquivos

```
frontend/
├── app/
│   └── (dashboard)/
│       └── customer-success/
│           ├── page.tsx              # Redireciona para /geral
│           ├── geral/
│           │   └── page.tsx          # Página Geral
│           ├── financeiro/
│           │   └── page.tsx          # Página Financeiro
│           └── atendimentos/
│               └── page.tsx          # Página Atendimentos
└── components/
    └── Sidebar.tsx                    # Sidebar com submenu
```

## Paleta de Cores

```typescript
const resolutyPalette = {
  background: '#FFFFFF',
  text: '#222222',
  textSecondary: '#757575',
  border: '#E0E0E0',
  card: '#FFFFFF',
  primary: '#2196f3',
  secondary: '#ff9800',
  success: '#4caf50',
  error: '#f44336',
};
```

