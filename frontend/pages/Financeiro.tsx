import { Box, Typography, Paper, Grid } from '@mui/material';
import {  Bar, Pie, Line } from 'react-chartjs-2';
import { 
  MonetizationOn, 
  TrendingUp, 
  TrendingDown, 
  Percent, 
  AccountBalance, 
  Receipt, 
  Payment,
  Savings,
  CreditCard,
  AttachMoney
} from '@mui/icons-material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const getMockData = () => ({
  indicadores: [
    { label: 'Receita Total', value: 'R$ 2.450.000,00' },
    { label: 'Despesas Totais', value: 'R$ 1.850.000,00' },
    { label: 'Lucro Líquido', value: 'R$ 600.000,00' },
    { label: 'Margem de Lucro', value: '24.5%' },
    { label: 'Contas a Receber', value: 'R$ 320.000,00' },
    { label: 'Contas a Pagar', value: 'R$ 180.000,00' },
    { label: 'Fluxo de Caixa', value: 'R$ 140.000,00' },
    { label: 'Dias de Recebimento', value: '45 dias' },
    { label: 'Dias de Pagamento', value: '30 dias' },
    { label: 'Capital de Giro', value: 'R$ 280.000,00' },
    { label: 'ROI', value: '18.2%' },
  ],
  receitaMensalData: {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    datasets: [
      {
        label: 'Receita',
        data: [180000, 195000, 210000, 225000, 240000, 255000, 270000, 285000, 300000, 315000, 330000, 345000],
        backgroundColor: '#4caf50',
        borderColor: '#2e7d32',
        borderWidth: 2,
      },
    ],
  },
  despesasCategoriaData: {
    labels: ['Salários', 'Marketing', 'Operacional', 'TI', 'Administrativo', 'Impostos'],
    datasets: [
      {
        label: 'Despesas por Categoria',
        data: [850000, 320000, 280000, 150000, 120000, 130000],
        backgroundColor: [
          '#ff5722',
          '#ff9800',
          '#ffc107',
          '#2196f3',
          '#9c27b0',
          '#795548'
        ],
      },
    ],
  },
  lucroMensalData: {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    datasets: [
      {
        label: 'Lucro',
        data: [45000, 52000, 58000, 65000, 72000, 78000, 85000, 92000, 98000, 105000, 112000, 118000],
        backgroundColor: '#4caf50',
        borderColor: '#2e7d32',
        borderWidth: 2,
      },
    ],
  },
  fluxoCaixaData: {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    datasets: [
      {
        label: 'Entrada',
        data: [180000, 195000, 210000, 225000, 240000, 255000, 270000, 285000, 300000, 315000, 330000, 345000],
        backgroundColor: '#4caf50',
        borderColor: '#2e7d32',
        borderWidth: 2,
      },
      {
        label: 'Saída',
        data: [135000, 143000, 152000, 160000, 168000, 177000, 185000, 193000, 202000, 210000, 218000, 227000],
        backgroundColor: '#f44336',
        borderColor: '#c62828',
        borderWidth: 2,
      },
    ],
  },
  margemLucroData: {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    datasets: [
      {
        label: 'Margem de Lucro (%)',
        data: [25.0, 26.7, 27.6, 28.9, 30.0, 30.6, 31.5, 32.3, 32.7, 33.3, 33.9, 34.2],
        backgroundColor: '#2196f3',
        borderColor: '#1976d2',
        borderWidth: 3,
        fill: false,
        tension: 0.4,
      },
    ],
  },
  contasReceberData: {
    labels: ['0-30 dias', '31-60 dias', '61-90 dias', '91-120 dias', '120+ dias'],
    datasets: [
      {
        label: 'Contas a Receber por Vencimento',
        data: [180000, 80000, 35000, 15000, 10000],
        backgroundColor: [
          '#4caf50',
          '#ff9800',
          '#ffc107',
          '#ff5722',
          '#f44336'
        ],
      },
    ],
  },
  roiData: {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'ROI Trimestral (%)',
        data: [15.2, 16.8, 17.5, 18.2],
        backgroundColor: ['#4caf50', '#2196f3', '#ff9800', '#9c27b0'],
      },
    ],
  },
});

const chartOptions = (title: string, isPie = false, isLine = false) => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: { color: resolutyPalette.text, font: { size: 16 } },
    },
    title: { 
      display: true, 
      text: title, 
      color: resolutyPalette.text, 
      font: { size: 18, weight: 700 } 
    },
    tooltip: { 
      enabled: true,
      callbacks: {
        label: function(context: any) {
          if (context.dataset.label === 'Receita' || context.dataset.label === 'Lucro' || 
              context.dataset.label === 'Entrada' || context.dataset.label === 'Saída') {
            return `${context.dataset.label}: R$ ${context.parsed.y.toLocaleString('pt-BR')}`;
          }
          if (context.dataset.label === 'Margem de Lucro (%)') {
            return `${context.dataset.label}: ${context.parsed.y.toFixed(1)}%`;
          }
          return `${context.dataset.label}: ${context.parsed.y}`;
        }
      }
    },
  },
  ...(isPie ? {} : {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: resolutyPalette.text,
          font: { size: 14, weight: 600 },
          callback: function (tickValue: string | number) {
            if (typeof tickValue === 'number') {
              return tickValue >= 1000 ? `${(tickValue / 1000).toFixed(1)}k` : tickValue;
            }
            return tickValue;
          },
        },
      },
      x: {
        ticks: {
          color: resolutyPalette.text,
          font: { size: 14, weight: 600 },
        },
      },
    },
  })
});

const kpiIcons = [
  <MonetizationOn fontSize="large" />,      // Receita Total
  <TrendingDown fontSize="large" />,        // Despesas Totais
  <TrendingUp fontSize="large" />,          // Lucro Líquido
  <Percent fontSize="large" />,             // Margem de Lucro
  <Receipt fontSize="large" />,             // Contas a Receber
  <Payment fontSize="large" />,             // Contas a Pagar
  <AccountBalance fontSize="large" />,      // Fluxo de Caixa
  <CreditCard fontSize="large" />,          // Dias de Recebimento
  <AttachMoney fontSize="large" />,         // Dias de Pagamento
  <Savings fontSize="large" />,            // Capital de Giro
  <TrendingUp fontSize="large" />,          // ROI
];

// Paleta Resoluty
export const resolutyPalette = {
  background: '#FFFFFF',
  sidebar: '#FFFFFF',
  text: '#222222',
  textSecondary: '#757575',
  border: '#E0E0E0',
  card: '#FFFFFF',
  chartBg: '#FFFFFF',
  kpiHit: '#22C55E',
  kpiWarning: '#F59E0B',
  kpiDanger: '#EF4444',
  primary: '#1976d2',
  secondary: '#26c6da',
  success: '#4caf50',
  warning: '#ff9800',
  error: '#f44336',
  info: '#2196f3',
};

export default function Financeiro() {
  const mockData = getMockData();

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: resolutyPalette.background, 
      color: resolutyPalette.text,
      padding: 3
    }}>

      {/* KPIs Principais */}
      <Grid container spacing={3} sx={{ marginBottom: 4 }}>
        {mockData.indicadores.slice(0, 4).map((kpi, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              elevation={3}
              sx={{
                padding: 3,
                textAlign: 'center',
                background: resolutyPalette.card,
                border: `2px solid ${resolutyPalette.border}`,
                borderRadius: 3,
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 6,
                },
              }}
            >
              <Box sx={{ color: resolutyPalette.primary, marginBottom: 1 }}>
                {kpiIcons[index]}
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 600, color: resolutyPalette.textSecondary, marginBottom: 1 }}>
                {kpi.label}
              </Typography>
              <Typography variant="h4" sx={{ 
                fontWeight: 700, 
                color: index === 2 ? resolutyPalette.success : resolutyPalette.text 
              }}>
                {kpi.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Gráficos Principais */}
      <Grid container spacing={3} sx={{ marginBottom: 4 }}>
        {/* Receita Mensal */}
        <Grid item xs={12} lg={6}>
          <Paper
            elevation={3}
            sx={{
              padding: 3,
              background: resolutyPalette.card,
              border: `2px solid ${resolutyPalette.border}`,
              borderRadius: 3,
              height: 400,
            }}
          >
            <Box sx={{ height: 320 }}>
              <Bar data={mockData.receitaMensalData} options={chartOptions('Receita Mensal')} />
            </Box>
          </Paper>
        </Grid>

        {/* Despesas por Categoria */}
        <Grid item xs={12} lg={6}>
          <Paper
            elevation={3}
            sx={{
              padding: 3,
              background: resolutyPalette.card,
              border: `2px solid ${resolutyPalette.border}`,
              borderRadius: 3,
              height: 400,
            }}
          >
            <Box sx={{ height: 320 }}>
              <Pie data={mockData.despesasCategoriaData} options={chartOptions('Despesas por Categoria', true)} />
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Gráficos Secundários */}
      <Grid container spacing={3} sx={{ marginBottom: 4 }}>
        {/* Lucro Mensal */}
        <Grid item xs={12} lg={6}>
          <Paper
            elevation={3}
            sx={{
              padding: 3,
              background: resolutyPalette.card,
              border: `2px solid ${resolutyPalette.border}`,
              borderRadius: 3,
              height: 400,
            }}
          >
            <Box sx={{ height: 320 }}>
              <Bar data={mockData.lucroMensalData} options={chartOptions('Lucro Mensal')} />
            </Box>
          </Paper>
        </Grid>

        {/* Fluxo de Caixa */}
        <Grid item xs={12} lg={6}>
          <Paper
            elevation={3}
            sx={{
              padding: 3,
              background: resolutyPalette.card,
              border: `2px solid ${resolutyPalette.border}`,
              borderRadius: 3,
              height: 400,
            }}
          >
            <Box sx={{ height: 320 }}>
              <Bar data={mockData.fluxoCaixaData} options={chartOptions('Fluxo de Caixa')} />
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Gráficos Adicionais */}
      <Grid container spacing={3} sx={{ marginBottom: 4 }}>
        {/* Margem de Lucro */}
        <Grid item xs={12} lg={6}>
          <Paper
            elevation={3}
            sx={{
              padding: 3,
              background: resolutyPalette.card,
              border: `2px solid ${resolutyPalette.border}`,
              borderRadius: 3,
              height: 400,
            }}
          >
            <Box sx={{ height: 320 }}>
              <Line data={mockData.margemLucroData} options={chartOptions('Margem de Lucro (%)', false, true)} />
            </Box>
          </Paper>
        </Grid>

        {/* Contas a Receber */}
        <Grid item xs={12} lg={6}>
          <Paper
            elevation={3}
            sx={{
              padding: 3,
              background: resolutyPalette.card,
              border: `2px solid ${resolutyPalette.border}`,
              borderRadius: 3,
              height: 400,
            }}
          >
            <Box sx={{ height: 320 }}>
              <Pie data={mockData.contasReceberData} options={chartOptions('Contas a Receber por Vencimento', true)} />
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* KPIs Secundários */}
      <Grid container spacing={3}>
        {mockData.indicadores.slice(4).map((kpi, index) => (
          <Grid item xs={12} sm={6} md={4} key={index + 4}>
            <Paper
              elevation={2}
              sx={{
                padding: 2,
                textAlign: 'center',
                background: resolutyPalette.card,
                border: `1px solid ${resolutyPalette.border}`,
                borderRadius: 2,
              }}
            >
              <Box sx={{ color: resolutyPalette.primary, marginBottom: 1 }}>
                {kpiIcons[index + 4]}
              </Box>
              <Typography variant="body2" sx={{ fontWeight: 500, color: resolutyPalette.textSecondary, marginBottom: 1 }}>
                {kpi.label}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, color: resolutyPalette.text }}>
                {kpi.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
} 