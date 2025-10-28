import { Box, Typography, Paper, Grid } from '@mui/material';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { 
  TrendingUp, 
  People, 
  AttachMoney, 
  ShoppingCart, 
  Assessment,
  Campaign,
  PersonAdd,
  MonetizationOn,
  Speed,
  Star
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
    { label: 'Vendas do Mês', value: 'R$ 485.000' },
    { label: 'Novos Leads', value: '1.247' },
    { label: 'Taxa de Conversão', value: '12.8%' },
    { label: 'Ticket Médio', value: 'R$ 2.340' },
    { label: 'Vendas por Vendedor', value: 'R$ 97.000' },
    { label: 'Leads Qualificados', value: '892' },
    { label: 'Tempo de Ciclo', value: '18 dias' },
    { label: 'CAC (Custo Aquisição)', value: 'R$ 450' },
    { label: 'LTV (Valor Vitalício)', value: 'R$ 8.500' },
    { label: 'Meta Atingida', value: '97.2%' },
    { label: 'Satisfação Cliente', value: '9.2/10' },
  ],
  vendasMensaisData: {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    datasets: [
      {
        label: 'Vendas Mensais (R$)',
        data: [320000, 365000, 410000, 385000, 450000, 420000, 480000, 465000, 520000, 485000, 510000, 550000],
        backgroundColor: '#4caf50',
        borderColor: '#2e7d32',
        borderWidth: 2,
      },
    ],
  },
  leadsOrigemData: {
    labels: ['Site', 'Redes Sociais', 'Indicação', 'E-mail', 'Telefone', 'Outros'],
    datasets: [
      {
        label: 'Leads por Origem',
        data: [450, 320, 180, 150, 95, 52],
        backgroundColor: [
          '#2196f3',
          '#4caf50',
          '#ff9800',
          '#9c27b0',
          '#f44336',
          '#795548'
        ],
      },
    ],
  },
  conversaoFunilData: {
    labels: ['Leads', 'Qualificados', 'Propostas', 'Negociação', 'Fechamento'],
    datasets: [
      {
        label: 'Funil de Conversão',
        data: [1247, 892, 456, 234, 160],
        backgroundColor: [
          '#2196f3',
          '#4caf50',
          '#ff9800',
          '#ff5722',
          '#4caf50'
        ],
      },
    ],
  },
  performanceVendedoresData: {
    labels: ['João', 'Maria', 'Pedro', 'Ana', 'Carlos', 'Lucia'],
    datasets: [
      {
        label: 'Vendas por Vendedor (R$)',
        data: [125000, 98000, 87000, 95000, 82000, 88000],
        backgroundColor: '#2196f3',
        borderColor: '#1976d2',
        borderWidth: 2,
      },
    ],
  },
  ticketMedioData: {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    datasets: [
      {
        label: 'Ticket Médio (R$)',
        data: [2100, 2250, 2180, 2400, 2300, 2450, 2380, 2520, 2480, 2340, 2600, 2550],
        backgroundColor: '#ff9800',
        borderColor: '#f57c00',
        borderWidth: 3,
        fill: false,
        tension: 0.4,
      },
    ],
  },
  satisfacaoClientesData: {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Satisfação Cliente (nota)',
        data: [8.8, 9.0, 9.1, 9.2],
        backgroundColor: ['#4caf50', '#2196f3', '#ff9800', '#9c27b0'],
      },
    ],
  },
});

const chartOptions = (title: string, isPie = false) => ({
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
          if (context.dataset.label === 'Vendas Mensais (R$)' || context.dataset.label === 'Vendas por Vendedor (R$)') {
            return `${context.dataset.label}: R$ ${context.parsed.y.toLocaleString('pt-BR')}`;
          }
          if (context.dataset.label === 'Ticket Médio (R$)') {
            return `${context.dataset.label}: R$ ${context.parsed.y.toLocaleString('pt-BR')}`;
          }
          if (context.dataset.label === 'Satisfação Cliente (nota)') {
            return `${context.dataset.label}: ${context.parsed.y.toFixed(1)}/10`;
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
  <MonetizationOn fontSize="large" />,      // Vendas do Mês
  <PersonAdd fontSize="large" />,           // Novos Leads
  <TrendingUp fontSize="large" />,          // Taxa de Conversão
  <ShoppingCart fontSize="large" />,        // Ticket Médio
  <People fontSize="large" />,              // Vendas por Vendedor
  <Assessment fontSize="large" />,          // Leads Qualificados
  <Speed fontSize="large" />,               // Tempo de Ciclo
  <AttachMoney fontSize="large" />,         // CAC
  <Star fontSize="large" />,                // LTV
  <Campaign fontSize="large" />,            // Meta Atingida
  <Star fontSize="large" />,                // Satisfação Cliente
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

export default function Comercial() {
  const mockData = getMockData();

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: resolutyPalette.background, 
      color: resolutyPalette.text,
      padding: { xs: 2, sm: 3 }
    }}>
      {/* KPIs Principais */}
      <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ marginBottom: 4 }}>
        {mockData.indicadores.slice(0, 4).map((kpi, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              elevation={3}
              sx={{
                padding: { xs: 2, sm: 3 },
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
              <Typography variant="h6" sx={{ 
                fontWeight: 600, 
                color: resolutyPalette.textSecondary, 
                marginBottom: 1,
                fontSize: { xs: '0.9rem', sm: '1rem' }
              }}>
                {kpi.label}
              </Typography>
              <Typography variant="h4" sx={{ 
                fontWeight: 700, 
                color: index === 0 ? resolutyPalette.success : resolutyPalette.text,
                fontSize: { xs: '1.5rem', sm: '2rem' }
              }}>
                {kpi.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Gráficos Principais */}
      <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ marginBottom: 4 }}>
        {/* Vendas Mensais */}
        <Grid item xs={12} lg={6}>
          <Paper
            elevation={3}
            sx={{
              padding: { xs: 2, sm: 3 },
              background: resolutyPalette.card,
              border: `2px solid ${resolutyPalette.border}`,
              borderRadius: 3,
              height: { xs: 350, sm: 400 },
            }}
          >
            <Box sx={{ height: { xs: 280, sm: 320 } }}>
              <Bar data={mockData.vendasMensaisData} options={chartOptions('Vendas Mensais')} />
            </Box>
          </Paper>
        </Grid>

        {/* Leads por Origem */}
        <Grid item xs={12} lg={6}>
          <Paper
            elevation={3}
            sx={{
              padding: { xs: 2, sm: 3 },
              background: resolutyPalette.card,
              border: `2px solid ${resolutyPalette.border}`,
              borderRadius: 3,
              height: { xs: 350, sm: 400 },
            }}
          >
            <Box sx={{ height: { xs: 280, sm: 320 } }}>
              <Pie data={mockData.leadsOrigemData} options={chartOptions('Leads por Origem', true)} />
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Gráficos Secundários */}
      <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ marginBottom: 4 }}>
        {/* Funil de Conversão */}
        <Grid item xs={12} lg={6}>
          <Paper
            elevation={3}
            sx={{
              padding: { xs: 2, sm: 3 },
              background: resolutyPalette.card,
              border: `2px solid ${resolutyPalette.border}`,
              borderRadius: 3,
              height: { xs: 350, sm: 400 },
            }}
          >
            <Box sx={{ height: { xs: 280, sm: 320 } }}>
              <Bar data={mockData.conversaoFunilData} options={chartOptions('Funil de Conversão')} />
            </Box>
          </Paper>
        </Grid>

        {/* Performance dos Vendedores */}
        <Grid item xs={12} lg={6}>
          <Paper
            elevation={3}
            sx={{
              padding: { xs: 2, sm: 3 },
              background: resolutyPalette.card,
              border: `2px solid ${resolutyPalette.border}`,
              borderRadius: 3,
              height: { xs: 350, sm: 400 },
            }}
          >
            <Box sx={{ height: { xs: 280, sm: 320 } }}>
              <Bar data={mockData.performanceVendedoresData} options={chartOptions('Performance dos Vendedores')} />
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Gráficos Adicionais */}
      <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ marginBottom: 4 }}>
        {/* Ticket Médio */}
        <Grid item xs={12} lg={6}>
          <Paper
            elevation={3}
            sx={{
              padding: { xs: 2, sm: 3 },
              background: resolutyPalette.card,
              border: `2px solid ${resolutyPalette.border}`,
              borderRadius: 3,
              height: { xs: 350, sm: 400 },
            }}
          >
            <Box sx={{ height: { xs: 280, sm: 320 } }}>
              <Line data={mockData.ticketMedioData} options={chartOptions('Evolução do Ticket Médio', false)} />
            </Box>
          </Paper>
        </Grid>

        {/* Satisfação dos Clientes */}
        <Grid item xs={12} lg={6}>
          <Paper
            elevation={3}
            sx={{
              padding: { xs: 2, sm: 3 },
              background: resolutyPalette.card,
              border: `2px solid ${resolutyPalette.border}`,
              borderRadius: 3,
              height: { xs: 350, sm: 400 },
            }}
          >
            <Box sx={{ height: { xs: 280, sm: 320 } }}>
              <Bar data={mockData.satisfacaoClientesData} options={chartOptions('Satisfação dos Clientes Trimestral')} />
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* KPIs Secundários */}
      <Grid container spacing={{ xs: 2, sm: 3 }}>
        {mockData.indicadores.slice(4).map((kpi, index) => (
          <Grid item xs={12} sm={6} md={4} key={index + 4}>
            <Paper
              elevation={2}
              sx={{
                padding: { xs: 1.5, sm: 2 },
                textAlign: 'center',
                background: resolutyPalette.card,
                border: `1px solid ${resolutyPalette.border}`,
                borderRadius: 2,
              }}
            >
              <Box sx={{ color: resolutyPalette.primary, marginBottom: 1 }}>
                {kpiIcons[index + 4]}
              </Box>
              <Typography variant="body2" sx={{ 
                fontWeight: 500, 
                color: resolutyPalette.textSecondary, 
                marginBottom: 1,
                fontSize: { xs: '0.8rem', sm: '0.875rem' }
              }}>
                {kpi.label}
              </Typography>
              <Typography variant="h6" sx={{ 
                fontWeight: 700, 
                color: resolutyPalette.text,
                fontSize: { xs: '1rem', sm: '1.25rem' }
              }}>
                {kpi.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}