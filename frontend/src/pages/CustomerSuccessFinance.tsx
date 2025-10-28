import { Box, Typography, Paper, Grid } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { resolutyPalette } from './CustomerSuccessOverview';

ChartJS.register(
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const getMockData = () => ({
  metrics: [
    { label: 'Meta', value: 'R$ 465.000,00', color: '#6366f1' },
    { label: 'Realizado', value: 'R$ 320.728,73', color: '#22c55e' },
    { label: 'Diferença', value: 'R$ -144.271,27', color: '#ef4444' },
    { label: '% Quitação', value: '73,26%', color: '#f59e0b' },
    { label: 'Meses quitação', value: '12,43', color: '#8b5cf6' },
  ],
  avaliacaoGoogle: {
    labels: ['Sim', 'Não'],
    datasets: [
      {
        data: [60, 40],
        backgroundColor: ['#3b82f6', '#f59e0b'],
      },
    ],
  },
  vazaoCarteira: {
    labels: ['Não', 'Sim'],
    datasets: [
      {
        data: [94.1, 5.9],
        backgroundColor: ['#f59e0b', '#3b82f6'],
      },
    ],
  },
});

const chartOptions = (title: string) => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: { 
        color: resolutyPalette.text, 
        font: { size: 14 },
        padding: 15
      },
    },
    title: { 
      display: true, 
      text: title, 
      color: resolutyPalette.text, 
      font: { size: 18, weight: 700 } 
    },
  },
});

export default function CustomerSuccessFinance() {
  const mockData = getMockData();

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: resolutyPalette.background, 
      color: resolutyPalette.text,
      padding: { xs: 2, sm: 3 }
    }}>
      <Typography variant="h4" gutterBottom sx={{ 
        fontWeight: 700, 
        color: resolutyPalette.text,
        marginBottom: 3
      }}>
        💰 Financeiro e Avaliação
      </Typography>

      <Grid container spacing={{ xs: 2, sm: 3 }}>
        {/* Métricas Financeiras */}
        <Grid item xs={12} md={6}>
          <Grid container spacing={{ xs: 2, sm: 3 }} direction="column">
            {mockData.metrics.map((metric, index) => (
              <Grid item key={index}>
                <Paper
                  elevation={3}
                  sx={{
                    padding: 3,
                    background: metric.color,
                    color: '#fff',
                    borderRadius: 3,
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': { transform: 'translateY(-5px)' },
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: 1 }}>
                    {metric.label}
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {metric.value}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Gráficos */}
        <Grid item xs={12} md={6}>
          <Grid container spacing={{ xs: 2, sm: 3 }} direction="column">
            {/* Avaliação no Google */}
            <Grid item>
              <Paper elevation={3} sx={{ padding: 3, borderRadius: 3, background: resolutyPalette.card, height: 300 }}>
                <Box sx={{ height: 220 }}>
                  <Pie data={mockData.avaliacaoGoogle} options={chartOptions('Avaliação no Google')} />
                </Box>
              </Paper>
            </Grid>

            {/* Vazão de Carteira */}
            <Grid item>
              <Paper elevation={3} sx={{ padding: 3, borderRadius: 3, background: resolutyPalette.card, height: 300 }}>
                <Box sx={{ height: 220 }}>
                  <Pie data={mockData.vazaoCarteira} options={chartOptions('Vazão de Carteira')} />
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

