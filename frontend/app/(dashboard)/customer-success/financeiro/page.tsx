'use client';

import { Box, Typography, Paper, Grid } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { resolutyPalette } from '@/pages/CustomerSuccess';

ChartJS.register(
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const getMockData = () => ({
  metas: {
    meta: 'R$ 465.000,00',
    realizado: 'R$ 320.728,73',
    diferenca: 'R$ -144.271,27',
    porcentagemQuitacao: '73,26%',
    mesesQuitacao: '12,43',
  },
  avaliacaoGoogle: {
    labels: ['Sim', 'Não'],
    datasets: [
      {
        data: [60, 40],
        backgroundColor: ['#2196f3', '#ff9800'],
      },
    ],
  },
  vazaoCarteira: {
    labels: ['Sim', 'Não'],
    datasets: [
      {
        data: [5.9, 94.1],
        backgroundColor: ['#2196f3', '#ff9800'],
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
      labels: { color: resolutyPalette.text, font: { size: 14 } },
    },
    title: { 
      display: true, 
      text: title, 
      color: resolutyPalette.text, 
      font: { size: 16, weight: 700 } 
    },
  },
});

export default function CustomerSuccessFinanceiro() {
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
        marginBottom: 4,
        textAlign: 'center'
      }}>
        💰 Customer Success - Financeiro
      </Typography>

      <Grid container spacing={3}>
        {/* Coluna Esquerda - KPIs Financeiros */}
        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Meta */}
            <Paper
              elevation={3}
              sx={{
                padding: 3,
                background: resolutyPalette.card,
                border: `2px solid ${resolutyPalette.border}`,
                borderRadius: 3,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, color: resolutyPalette.textSecondary, marginBottom: 1 }}>
                Meta
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, color: resolutyPalette.text }}>
                {mockData.metas.meta}
              </Typography>
            </Paper>

            {/* Realizado */}
            <Paper
              elevation={3}
              sx={{
                padding: 3,
                background: resolutyPalette.card,
                border: `2px solid ${resolutyPalette.border}`,
                borderRadius: 3,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, color: resolutyPalette.textSecondary, marginBottom: 1 }}>
                Realizado
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, color: resolutyPalette.text }}>
                {mockData.metas.realizado}
              </Typography>
            </Paper>

            {/* Diferença */}
            <Paper
              elevation={3}
              sx={{
                padding: 3,
                background: resolutyPalette.card,
                border: `2px solid ${resolutyPalette.border}`,
                borderRadius: 3,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, color: resolutyPalette.textSecondary, marginBottom: 1 }}>
                Diferença
              </Typography>
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 700, 
                  color: mockData.metas.diferenca.startsWith('R$ -') ? resolutyPalette.error : resolutyPalette.success 
                }}
              >
                {mockData.metas.diferenca}
              </Typography>
            </Paper>

            {/* % Quitação */}
            <Paper
              elevation={3}
              sx={{
                padding: 3,
                background: resolutyPalette.card,
                border: `2px solid ${resolutyPalette.border}`,
                borderRadius: 3,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, color: resolutyPalette.textSecondary, marginBottom: 1 }}>
                % Quitação
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, color: resolutyPalette.success }}>
                {mockData.metas.porcentagemQuitacao}
              </Typography>
            </Paper>

            {/* Meses Quitação */}
            <Paper
              elevation={3}
              sx={{
                padding: 3,
                background: resolutyPalette.card,
                border: `2px solid ${resolutyPalette.border}`,
                borderRadius: 3,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, color: resolutyPalette.textSecondary, marginBottom: 1 }}>
                Meses Quitação
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, color: resolutyPalette.text }}>
                {mockData.metas.mesesQuitacao}
              </Typography>
            </Paper>
          </Box>
        </Grid>

        {/* Coluna Direita - Gráficos */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            {/* Avaliação no Google */}
            <Grid item xs={12}>
              <Paper
                elevation={3}
                sx={{
                  padding: 2,
                  background: resolutyPalette.card,
                  border: `2px solid ${resolutyPalette.border}`,
                  borderRadius: 3,
                  height: 350,
                }}
              >
                <Box sx={{ height: 300 }}>
                  <Pie 
                    data={mockData.avaliacaoGoogle} 
                    options={chartOptions('Avaliação no Google')} 
                  />
                </Box>
              </Paper>
            </Grid>

            {/* Vazão de Carteira */}
            <Grid item xs={12}>
              <Paper
                elevation={3}
                sx={{
                  padding: 2,
                  background: resolutyPalette.card,
                  border: `2px solid ${resolutyPalette.border}`,
                  borderRadius: 3,
                  height: 350,
                }}
              >
                <Box sx={{ height: 300 }}>
                  <Pie 
                    data={mockData.vazaoCarteira} 
                    options={chartOptions('Vazão de Carteira')} 
                  />
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

