import { Box, Typography, Paper, Grid } from '@mui/material';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { 
  ThumbUp, 
  People, 
  Star, 
  TrendingUp, 
  Refresh,
  Assignment,
  Speed,
  CheckCircle,
  Warning,
  EmojiEmotions
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
    { label: 'NPS Score', value: '72' },
    { label: 'Taxa de Retenção', value: '94.2%' },
    { label: 'Churn Rate', value: '2.1%' },
    { label: 'Satisfação Geral', value: '9.1/10' },
    { label: 'Tickets Resolvidos', value: '1.847' },
    { label: 'Tempo Médio Resposta', value: '2.3h' },
    { label: 'Tempo Médio Resolução', value: '18.5h' },
    { label: 'Clientes Ativos', value: '2.456' },
    { label: 'Upsells Realizados', value: '127' },
    { label: 'Cross-sells Realizados', value: '89' },
    { label: 'Health Score Médio', value: '87.5%' },
  ],
  npsMensalData: {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    datasets: [
      {
        label: 'NPS Score',
        data: [65, 68, 70, 72, 71, 73, 74, 72, 75, 73, 74, 72],
        backgroundColor: '#4caf50',
        borderColor: '#2e7d32',
        borderWidth: 2,
      },
    ],
  },
  satisfacaoCategoriaData: {
    labels: ['Muito Satisfeito', 'Satisfeito', 'Neutro', 'Insatisfeito', 'Muito Insatisfeito'],
    datasets: [
      {
        label: 'Distribuição de Satisfação',
        data: [45, 35, 15, 4, 1],
        backgroundColor: [
          '#4caf50',
          '#8bc34a',
          '#ffc107',
          '#ff9800',
          '#f44336'
        ],
      },
    ],
  },
  ticketsCategoriaData: {
    labels: ['Suporte Técnico', 'Dúvidas', 'Solicitações', 'Problemas', 'Outros'],
    datasets: [
      {
        label: 'Tickets por Categoria',
        data: [450, 320, 280, 180, 120],
        backgroundColor: [
          '#2196f3',
          '#4caf50',
          '#ff9800',
          '#f44336',
          '#9c27b0'
        ],
      },
    ],
  },
  churnRateData: {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    datasets: [
      {
        label: 'Churn Rate (%)',
        data: [3.2, 2.8, 2.5, 2.3, 2.1, 1.9, 1.8, 2.0, 1.7, 1.9, 2.1, 2.1],
        backgroundColor: '#f44336',
        borderColor: '#c62828',
        borderWidth: 3,
        fill: false,
        tension: 0.4,
      },
    ],
  },
  healthScoreData: {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Health Score Médio (%)',
        data: [82.5, 84.2, 86.1, 87.5],
        backgroundColor: '#2196f3',
        borderColor: '#1976d2',
        borderWidth: 3,
        fill: false,
        tension: 0.4,
      },
    ],
  },
  retencaoSegmentoData: {
    labels: ['Startup', 'SMB', 'Enterprise', 'Mid-Market'],
    datasets: [
      {
        label: 'Taxa de Retenção por Segmento (%)',
        data: [89.2, 92.5, 96.8, 94.1],
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
          if (context.dataset.label === 'NPS Score') {
            return `${context.dataset.label}: ${context.parsed.y}`;
          }
          if (context.dataset.label === 'Churn Rate (%)' || context.dataset.label === 'Health Score Médio (%)' || context.dataset.label === 'Taxa de Retenção por Segmento (%)') {
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
  <ThumbUp fontSize="large" />,             // NPS Score
  <People fontSize="large" />,              // Taxa de Retenção
  <Warning fontSize="large" />,             // Churn Rate
  <Star fontSize="large" />,                // Satisfação Geral
  <Assignment fontSize="large" />,          // Tickets Resolvidos
  <Speed fontSize="large" />,               // Tempo Médio Resposta
  <CheckCircle fontSize="large" />,         // Tempo Médio Resolução
  <People fontSize="large" />,              // Clientes Ativos
  <TrendingUp fontSize="large" />,          // Upsells Realizados
  <Refresh fontSize="large" />,             // Cross-sells Realizados
  <EmojiEmotions fontSize="large" />,       // Health Score Médio
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

export default function CustomerSuccess() {
  const mockData = getMockData();

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: resolutyPalette.background, 
      color: resolutyPalette.text,
      padding: { xs: 2, sm: 3 }
    }}>
      <Typography variant="h3" gutterBottom sx={{ 
        fontWeight: 700, 
        color: resolutyPalette.text,
        marginBottom: 4,
        textAlign: 'center',
        fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
      }}>
        🎯 Dashboard Customer Success
      </Typography>

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
                color: index === 0 ? resolutyPalette.success : 
                       index === 1 ? resolutyPalette.success : 
                       index === 2 ? resolutyPalette.error : resolutyPalette.text,
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
        {/* NPS Score Mensal */}
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
              <Bar data={mockData.npsMensalData} options={chartOptions('Evolução do NPS Score')} />
            </Box>
          </Paper>
        </Grid>

        {/* Distribuição de Satisfação */}
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
              <Pie data={mockData.satisfacaoCategoriaData} options={chartOptions('Distribuição de Satisfação', true)} />
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Gráficos Secundários */}
      <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ marginBottom: 4 }}>
        {/* Tickets por Categoria */}
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
              <Pie data={mockData.ticketsCategoriaData} options={chartOptions('Tickets por Categoria', true)} />
            </Box>
          </Paper>
        </Grid>

        {/* Churn Rate */}
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
              <Line data={mockData.churnRateData} options={chartOptions('Evolução do Churn Rate', false)} />
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Gráficos Adicionais */}
      <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ marginBottom: 4 }}>
        {/* Health Score */}
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
              <Line data={mockData.healthScoreData} options={chartOptions('Evolução do Health Score', false)} />
            </Box>
          </Paper>
        </Grid>

        {/* Retenção por Segmento */}
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
              <Bar data={mockData.retencaoSegmentoData} options={chartOptions('Taxa de Retenção por Segmento')} />
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