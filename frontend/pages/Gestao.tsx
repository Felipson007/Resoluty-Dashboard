import { Box, Typography, Paper, Grid } from '@mui/material';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { 
  Dashboard, 
  TrendingUp, 
  People, 
  AttachMoney, 
  Assessment, 
  Speed,
  Business,
  Flag,
  Analytics,
  Timeline,
  ShowChart
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
    { label: 'ROI Geral', value: '24.8%' },
    { label: 'Crescimento Anual', value: '18.5%' },
    { label: 'Eficiência Operacional', value: '91.2%' },
    { label: 'Satisfação dos Stakeholders', value: '8.9/10' },
    { label: 'Metas Atingidas', value: '87.5%' },
    { label: 'Produtividade da Equipe', value: '94.3%' },
    { label: 'Custos Controlados', value: 'R$ 1.2M' },
    { label: 'Inovação Index', value: '7.8/10' },
    { label: 'Risco Operacional', value: 'Baixo' },
    { label: 'Sustentabilidade', value: '85.6%' },
    { label: 'Agilidade Organizacional', value: '8.2/10' },
  ],
  performanceDepartamentosData: {
    labels: ['Vendas', 'Marketing', 'Operações', 'TI', 'RH', 'Financeiro'],
    datasets: [
      {
        label: 'Performance por Departamento (%)',
        data: [92.5, 88.3, 94.7, 89.1, 91.8, 93.2],
        backgroundColor: [
          '#4caf50',
          '#2196f3',
          '#ff9800',
          '#9c27b0',
          '#f44336',
          '#795548'
        ],
      },
    ],
  },
  crescimentoTrimestralData: {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Crescimento Trimestral (%)',
        data: [15.2, 17.8, 19.3, 18.5],
        backgroundColor: '#4caf50',
        borderColor: '#2e7d32',
        borderWidth: 2,
      },
    ],
  },
  distribuicaoRecursosData: {
    labels: ['Pessoal', 'Tecnologia', 'Marketing', 'Operações', 'Pesquisa', 'Outros'],
    datasets: [
      {
        label: 'Distribuição de Recursos (%)',
        data: [35, 25, 15, 12, 8, 5],
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
  kpisEstrategicosData: {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    datasets: [
      {
        label: 'KPIs Estratégicos (score)',
        data: [78, 82, 85, 88, 91, 89, 93, 90, 94, 92, 95, 97],
        backgroundColor: '#2196f3',
        borderColor: '#1976d2',
        borderWidth: 3,
        fill: false,
        tension: 0.4,
      },
    ],
  },
  satisfacaoStakeholdersData: {
    labels: ['Clientes', 'Funcionários', 'Investidores', 'Fornecedores', 'Comunidade'],
    datasets: [
      {
        label: 'Satisfação por Stakeholder (nota)',
        data: [9.1, 8.7, 8.9, 8.5, 8.8],
        backgroundColor: ['#4caf50', '#2196f3', '#ff9800', '#9c27b0', '#f44336'],
      },
    ],
  },
  inovacaoData: {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Índice de Inovação',
        data: [7.2, 7.5, 7.8, 7.8],
        backgroundColor: '#ff9800',
        borderColor: '#f57c00',
        borderWidth: 3,
        fill: false,
        tension: 0.4,
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
          if (context.dataset.label === 'Crescimento Trimestral (%)' || context.dataset.label === 'Performance por Departamento (%)' || context.dataset.label === 'Distribuição de Recursos (%)') {
            return `${context.dataset.label}: ${context.parsed.y.toFixed(1)}%`;
          }
          if (context.dataset.label === 'KPIs Estratégicos (score)') {
            return `${context.dataset.label}: ${context.parsed.y}`;
          }
          if (context.dataset.label === 'Satisfação por Stakeholder (nota)') {
            return `${context.dataset.label}: ${context.parsed.y.toFixed(1)}/10`;
          }
          if (context.dataset.label === 'Índice de Inovação') {
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
  <TrendingUp fontSize="large" />,          // ROI Geral
  <ShowChart fontSize="large" />,           // Crescimento Anual
  <Speed fontSize="large" />,               // Eficiência Operacional
  <People fontSize="large" />,              // Satisfação dos Stakeholders
  <Flag fontSize="large" />,                // Metas Atingidas
  <Assessment fontSize="large" />,          // Produtividade da Equipe
  <AttachMoney fontSize="large" />,         // Custos Controlados
  <Analytics fontSize="large" />,           // Inovação Index
  <Business fontSize="large" />,            // Risco Operacional
  <Timeline fontSize="large" />,            // Sustentabilidade
  <Dashboard fontSize="large" />,           // Agilidade Organizacional
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

export default function Gestao() {
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
        🎯 Dashboard de Gestão
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
                       index === 2 ? resolutyPalette.success : resolutyPalette.text,
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
        {/* Performance por Departamentos */}
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
              <Bar data={mockData.performanceDepartamentosData} options={chartOptions('Performance por Departamento')} />
            </Box>
          </Paper>
        </Grid>

        {/* Crescimento Trimestral */}
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
              <Bar data={mockData.crescimentoTrimestralData} options={chartOptions('Crescimento Trimestral')} />
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Gráficos Secundários */}
      <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ marginBottom: 4 }}>
        {/* Distribuição de Recursos */}
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
              <Pie data={mockData.distribuicaoRecursosData} options={chartOptions('Distribuição de Recursos', true)} />
            </Box>
          </Paper>
        </Grid>

        {/* KPIs Estratégicos */}
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
              <Line data={mockData.kpisEstrategicosData} options={chartOptions('Evolução dos KPIs Estratégicos', false, true)} />
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Gráficos Adicionais */}
      <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ marginBottom: 4 }}>
        {/* Satisfação dos Stakeholders */}
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
              <Bar data={mockData.satisfacaoStakeholdersData} options={chartOptions('Satisfação dos Stakeholders')} />
            </Box>
          </Paper>
        </Grid>

        {/* Índice de Inovação */}
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
              <Line data={mockData.inovacaoData} options={chartOptions('Evolução do Índice de Inovação', false, true)} />
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