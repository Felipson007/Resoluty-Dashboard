import { Box, Typography, Paper, Grid } from '@mui/material';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { 
  Business, 
  People, 
  Assignment, 
  Schedule, 
  Assessment, 
  Security,
  Description,
  FolderOpen,
  Work,
  Group,
  TrendingUp
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
    { label: 'Total de Funcionários', value: '156' },
    { label: 'Documentos Processados', value: '2.847' },
    { label: 'Processos Ativos', value: '89' },
    { label: 'Eficiência Administrativa', value: '94.2%' },
    { label: 'Tempo Médio de Processo', value: '3.2 dias' },
    { label: 'Documentos Pendentes', value: '127' },
    { label: 'Reuniões Realizadas', value: '45' },
    { label: 'Contratos Renovados', value: '23' },
    { label: 'Licenças Válidas', value: '98.5%' },
    { label: 'Custos Administrativos', value: 'R$ 45.200' },
    { label: 'Satisfação Interna', value: '8.7/10' },
  ],
  funcionariosDepartamentoData: {
    labels: ['RH', 'Financeiro', 'Comercial', 'TI', 'Operações', 'Jurídico'],
    datasets: [
      {
        label: 'Funcionários por Departamento',
        data: [28, 22, 35, 18, 32, 21],
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
  processosMensaisData: {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    datasets: [
      {
        label: 'Processos Concluídos',
        data: [245, 267, 289, 312, 298, 325, 341, 318, 334, 356, 342, 368],
        backgroundColor: '#4caf50',
        borderColor: '#2e7d32',
        borderWidth: 2,
      },
    ],
  },
  documentosCategoriaData: {
    labels: ['Contratos', 'Relatórios', 'Licenças', 'Certificados', 'Outros'],
    datasets: [
      {
        label: 'Documentos por Categoria',
        data: [450, 320, 180, 95, 210],
        backgroundColor: [
          '#2196f3',
          '#4caf50',
          '#ff9800',
          '#9c27b0',
          '#f44336'
        ],
      },
    ],
  },
  eficienciaData: {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    datasets: [
      {
        label: 'Eficiência Administrativa (%)',
        data: [89.2, 91.5, 92.8, 93.1, 94.2, 94.8, 95.1, 94.6, 95.3, 95.8, 96.1, 96.4],
        backgroundColor: '#2196f3',
        borderColor: '#1976d2',
        borderWidth: 3,
        fill: false,
        tension: 0.4,
      },
    ],
  },
  custosAdministrativosData: {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    datasets: [
      {
        label: 'Custos Administrativos (R$)',
        data: [42000, 43500, 42800, 44200, 45600, 43800, 45200, 44100, 44800, 46200, 45100, 47200],
        backgroundColor: '#ff9800',
        borderColor: '#f57c00',
        borderWidth: 2,
      },
    ],
  },
  satisfacaoInternaData: {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Satisfação Interna (nota)',
        data: [8.2, 8.4, 8.6, 8.7],
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
          if (context.dataset.label === 'Custos Administrativos (R$)') {
            return `${context.dataset.label}: R$ ${context.parsed.y.toLocaleString('pt-BR')}`;
          }
          if (context.dataset.label === 'Eficiência Administrativa (%)') {
            return `${context.dataset.label}: ${context.parsed.y.toFixed(1)}%`;
          }
          if (context.dataset.label === 'Satisfação Interna (nota)') {
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
  <People fontSize="large" />,              // Total de Funcionários
  <Description fontSize="large" />,         // Documentos Processados
  <Assignment fontSize="large" />,          // Processos Ativos
  <Assessment fontSize="large" />,          // Eficiência Administrativa
  <Schedule fontSize="large" />,            // Tempo Médio de Processo
  <FolderOpen fontSize="large" />,          // Documentos Pendentes
  <Group fontSize="large" />,               // Reuniões Realizadas
  <Work fontSize="large" />,                // Contratos Renovados
  <Security fontSize="large" />,            // Licenças Válidas
  <Business fontSize="large" />,            // Custos Administrativos
  <TrendingUp fontSize="large" />,          // Satisfação Interna
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

export default function Administrativo() {
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
                color: index === 3 ? resolutyPalette.success : resolutyPalette.text,
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
        {/* Funcionários por Departamento */}
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
              <Pie data={mockData.funcionariosDepartamentoData} options={chartOptions('Funcionários por Departamento', true)} />
            </Box>
          </Paper>
        </Grid>

        {/* Processos Mensais */}
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
              <Bar data={mockData.processosMensaisData} options={chartOptions('Processos Concluídos Mensalmente')} />
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Gráficos Secundários */}
      <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ marginBottom: 4 }}>
        {/* Documentos por Categoria */}
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
              <Pie data={mockData.documentosCategoriaData} options={chartOptions('Documentos por Categoria', true)} />
            </Box>
          </Paper>
        </Grid>

        {/* Eficiência Administrativa */}
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
              <Line data={mockData.eficienciaData} options={chartOptions('Eficiência Administrativa (%)', false)} />
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Gráficos Adicionais */}
      <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ marginBottom: 4 }}>
        {/* Custos Administrativos */}
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
              <Bar data={mockData.custosAdministrativosData} options={chartOptions('Custos Administrativos Mensais')} />
            </Box>
          </Paper>
        </Grid>

        {/* Satisfação Interna */}
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
              <Bar data={mockData.satisfacaoInternaData} options={chartOptions('Satisfação Interna Trimestral')} />
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