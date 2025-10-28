'use client';

import { Box, Typography, Paper, Grid } from '@mui/material';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const resolutyPalette = {
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
  primary: '#2196f3',
  secondary: '#ff9800',
};

const getMockData = () => ({
  totalClientes: 310,
  distribuicaoClientes: {
    labels: ['Serviço', 'Veículo'],
    datasets: [
      {
        data: [235, 75],
        backgroundColor: ['#2196f3', '#ff9800'],
      },
    ],
  },
  clientesPorFase: {
    labels: ['Fase 1', 'Fase 2', 'Fase 3', 'Fase 4', 'Fase 5'],
    datasets: [
      {
        label: 'N° Clientes por Fase',
        data: [68, 68, 54, 102, 22],
        backgroundColor: '#2196f3',
      },
    ],
  },
  contatoPendente: {
    labels: ['Fase 1', 'Fase 2', 'Fase 3', 'Fase 4', 'Fase 5'],
    datasets: [
      {
        label: 'Contato Pendente Clientes',
        data: [13, 6, 6, 88, 27],
        backgroundColor: '#2196f3',
      },
    ],
  },
  planejarVsBA: {
    labels: ['Planejar', 'B.A.'],
    datasets: [
      {
        data: [88, 90],
        backgroundColor: ['#2196f3', '#ff9800'],
      },
    ],
  },
  distribuicaoStatus: {
    labels: ['Negociação', 'Antecipação de P.S.', 'Possibilidade', 'Quitação direta', 'Agendado'],
    datasets: [
      {
        data: [215, 44, 32, 13, 6],
        backgroundColor: ['#2196f3', '#ff9800', '#9c27b0', '#4caf50', '#26c6da'],
      },
    ],
  },
  tabelaClientes: [
    { status: 'Quitação direta', cliente: 'Sarah Cristina Casonatto', valor: 'R$ 4.200,00' },
    { status: 'Possibilidade', cliente: 'Dheison Aparecido Dos Santos', valor: 'R$ 2.500,00' },
    { status: 'Quitação direta', cliente: 'Gisele Fernandes Da Silva', valor: 'R$ 1.500,00' },
    { status: 'Possibilidade', cliente: 'Julia Ferroni Vicensotti', valor: '' },
    { status: 'Quitação direta', cliente: 'Marcelo Luis Simoes', valor: 'R$ 1.000,00' },
    { status: 'Possibilidade', cliente: 'Adilson Pereira Dos Santos', valor: '' },
    { status: 'Quitação direta', cliente: 'Eduardo Alexandre Machado', valor: 'R$ 3.500,00' },
    { status: 'Possibilidade', cliente: 'Fabio Junior Evangelista', valor: '' },
    { status: 'Quitação direta', cliente: 'Leonardo Viana Carvalho', valor: 'R$ 2.000,00' },
    { status: 'Possibilidade', cliente: 'Patricia Ribeiro Alves', valor: '' },
    { status: 'Quitação direta', cliente: 'Rodrigo Santos Lima', valor: 'R$ 5.000,00' },
    { status: 'Possibilidade', cliente: 'Tamiris Oliveira Costa', valor: '' },
  ],
});

const chartOptions = (title: string, isPie = false) => ({
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
  ...(isPie ? {} : {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: resolutyPalette.text,
          font: { size: 12 },
        },
      },
      x: {
        ticks: {
          color: resolutyPalette.text,
          font: { size: 12 },
        },
      },
    },
  })
});

export default function CustomerSuccessGeral() {
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
        📊 Customer Success - Geral
      </Typography>

      {/* KPI Principal - Total Clientes */}
      <Grid container spacing={3} sx={{ marginBottom: 4 }}>
        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{
              padding: 4,
              textAlign: 'center',
              background: resolutyPalette.card,
              border: `2px solid ${resolutyPalette.border}`,
              borderRadius: 3,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, color: resolutyPalette.textSecondary, marginBottom: 2 }}>
              Total Clientes
            </Typography>
            <Typography variant="h2" sx={{ fontWeight: 700, color: resolutyPalette.primary }}>
              {mockData.totalClientes}
            </Typography>
          </Paper>
        </Grid>

        {/* Distribuição de Clientes */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{
              padding: 2,
              background: resolutyPalette.card,
              border: `2px solid ${resolutyPalette.border}`,
              borderRadius: 3,
              height: 300,
            }}
          >
            <Box sx={{ height: '100%' }}>
              <Pie 
                data={mockData.distribuicaoClientes} 
                options={chartOptions('Distribuição de Clientes', true)} 
              />
            </Box>
          </Paper>
        </Grid>

        {/* Planejar vs B.A. */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{
              padding: 2,
              background: resolutyPalette.card,
              border: `2px solid ${resolutyPalette.border}`,
              borderRadius: 3,
              height: 300,
            }}
          >
            <Box sx={{ height: '100%' }}>
              <Pie 
                data={mockData.planejarVsBA} 
                options={chartOptions('Planejar vs B.A.', true)} 
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Gráficos de Fases */}
      <Grid container spacing={3} sx={{ marginBottom: 4 }}>
        <Grid item xs={12} lg={6}>
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
            <Box sx={{ height: '100%' }}>
              <Bar data={mockData.clientesPorFase} options={chartOptions('N° Clientes por Fase')} />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={6}>
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
            <Box sx={{ height: '100%' }}>
              <Bar data={mockData.contatoPendente} options={chartOptions('Contato Pendente Clientes')} />
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Distribuição de Status e Tabela */}
      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <Paper
            elevation={3}
            sx={{
              padding: 2,
              background: resolutyPalette.card,
              border: `2px solid ${resolutyPalette.border}`,
              borderRadius: 3,
              height: 400,
            }}
          >
            <Box sx={{ height: 350 }}>
              <Pie 
                data={mockData.distribuicaoStatus} 
                options={chartOptions('Distribuição de Status', true)} 
              />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Paper
            elevation={3}
            sx={{
              padding: 2,
              background: resolutyPalette.card,
              border: `2px solid ${resolutyPalette.border}`,
              borderRadius: 3,
              height: 400,
              overflow: 'auto',
            }}
          >
            <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 700 }}>
              Detalhes de Clientes
            </Typography>
            <Box sx={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', fontSize: '14px' }}>
                <thead>
                  <tr style={{ borderBottom: `2px solid ${resolutyPalette.border}`, textAlign: 'left' }}>
                    <th style={{ padding: '8px' }}>Status</th>
                    <th style={{ padding: '8px' }}>Cliente</th>
                    <th style={{ padding: '8px' }}>Valor Cliente</th>
                  </tr>
                </thead>
                <tbody>
                  {mockData.tabelaClientes.map((row, index) => (
                    <tr 
                      key={index} 
                      style={{ 
                        borderBottom: `1px solid ${resolutyPalette.border}`,
                        backgroundColor: index % 2 === 0 ? resolutyPalette.background : '#f5f5f5'
                      }}
                    >
                      <td style={{ padding: '8px' }}>{row.status}</td>
                      <td style={{ padding: '8px' }}>{row.cliente}</td>
                      <td style={{ padding: '8px' }}>{row.valor || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Box sx={{ marginTop: 2, textAlign: 'right' }}>
                <Typography variant="caption" color="textSecondary">
                  1 - 100 / 280
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

