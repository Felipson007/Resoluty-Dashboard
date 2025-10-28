'use client';

import { Box, Typography, Paper, Grid, IconButton } from '@mui/material';
import { Edit, MoreVert } from '@mui/icons-material';
import { Bar, Pie } from 'react-chartjs-2';
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
  success: '#4caf50',
  error: '#f44336',
};

const getMockData = () => ({
  kpis: {
    faturamento: 'R$ 4.349,11',
    adimplencia: '28,95%',
    acordos: '0',
    google: '0',
  },
  relatorios: {
    labels: ['Realizado', 'Atrasado', 'Pendente'],
    datasets: [
      {
        data: [586, 113, 13],
        backgroundColor: ['#2196f3', '#ff9800', '#f44336'],
      },
    ],
  },
  baLista: {
    labels: ['Realizado', 'Atrasado', 'Pendente'],
    datasets: [
      {
        data: [571, 107, 7],
        backgroundColor: ['#2196f3', '#ff9800', '#f44336'],
      },
    ],
  },
  contatoCliente: [
    'Olimpio De Souza Paula',
    'Marinezua Marques Souza',
    'Lucas Sudre Rela',
    'Luis Santomauro Rela De Moura',
    'Jose Raimundo De Silva Lema',
    'Joaquim Luiz Scripelanti',
  ],
  contatoAssessoria: [
    'Marinezua Marques Souza',
    'Lucas Sudre Rela',
    'Laurindo Modolo',
  ],
  pendencia: [
    { cliente: 'Valeria Pereira De Almeida Ferreira', motivo: 'B.A.' },
    { cliente: 'Maria Rosa Castro', motivo: 'B.A.' },
    { cliente: 'Claudio Marinelo', motivo: 'B.A.' },
  ],
  honorarios: {
    dia: 'R$ 704,80',
    aberto: 'R$ 7.939,60',
    total: 'R$ 50.978,94',
  },
});

const chartOptions = (title: string, isPie = false) => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: { color: resolutyPalette.text, font: { size: 12 } },
    },
    title: { 
      display: true, 
      text: title, 
      color: resolutyPalette.text, 
      font: { size: 14, weight: 700 } 
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

export default function CustomerSuccessAtendimentos() {
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
        📞 Customer Success - Atendimentos
      </Typography>

      {/* KPIs Superiores */}
      <Grid container spacing={2} sx={{ marginBottom: 4 }}>
        <Grid item xs={6} sm={3}>
          <Paper
            elevation={3}
            sx={{
              padding: 2,
              background: '#FFF9C4',
              textAlign: 'center',
              borderRadius: 3,
            }}
          >
            <Typography variant="caption" sx={{ fontWeight: 600, color: '#666' }}>
              Faturamento
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#333' }}>
              {mockData.kpis.faturamento}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper
            elevation={3}
            sx={{
              padding: 2,
              background: '#FFF9C4',
              textAlign: 'center',
              borderRadius: 3,
            }}
          >
            <Typography variant="caption" sx={{ fontWeight: 600, color: '#666' }}>
              Adimplência
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#333' }}>
              {mockData.kpis.adimplencia}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper
            elevation={3}
            sx={{
              padding: 2,
              background: '#FFF9C4',
              textAlign: 'center',
              borderRadius: 3,
              position: 'relative',
            }}
          >
            <Box sx={{ position: 'absolute', top: 4, right: 4 }}>
              <IconButton size="small">
                <Edit fontSize="small" />
              </IconButton>
              <IconButton size="small">
                <MoreVert fontSize="small" />
              </IconButton>
            </Box>
            <Typography variant="caption" sx={{ fontWeight: 600, color: '#666' }}>
              Acordos
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#333' }}>
              {mockData.kpis.acordos}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper
            elevation={3}
            sx={{
              padding: 2,
              background: '#FFF9C4',
              textAlign: 'center',
              borderRadius: 3,
            }}
          >
            <Typography variant="caption" sx={{ fontWeight: 600, color: '#666' }}>
              Google
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#333' }}>
              {mockData.kpis.google}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Gráficos e Listas */}
      <Grid container spacing={3} sx={{ marginBottom: 4 }}>
        {/* Relatórios */}
        <Grid item xs={12} lg={4}>
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
            <Box sx={{ height: 250 }}>
              <Bar data={mockData.relatorios} options={chartOptions('Relatórios')} />
            </Box>
          </Paper>
        </Grid>

        {/* Contato Cliente */}
        <Grid item xs={12} lg={4}>
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
            <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 700 }}>
              Contato Cliente
            </Typography>
            <Box sx={{ overflowY: 'auto', maxHeight: 230 }}>
              {mockData.contatoCliente.map((nome, index) => (
                <Box 
                  key={index}
                  sx={{ 
                    padding: 1.5, 
                    borderBottom: `1px solid ${resolutyPalette.border}`,
                    backgroundColor: index % 2 === 0 ? resolutyPalette.background : '#f5f5f5'
                  }}
                >
                  <Typography variant="body2">{nome}</Typography>
                </Box>
              ))}
            </Box>
            <Box sx={{ marginTop: 1, textAlign: 'center' }}>
              <Typography variant="caption" color="textSecondary">
                1-12/12
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Pendência Retorno/B.A. */}
        <Grid item xs={12} lg={4}>
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
            <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 700 }}>
              Pendência Retorno/B.A.
            </Typography>
            <Box sx={{ overflowY: 'auto', maxHeight: 230 }}>
              {mockData.pendencia.map((item, index) => (
                <Box 
                  key={index}
                  sx={{ 
                    padding: 1.5, 
                    borderBottom: `1px solid ${resolutyPalette.border}`,
                    backgroundColor: index % 2 === 0 ? resolutyPalette.background : '#f5f5f5'
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>{item.cliente}</Typography>
                  <Typography variant="caption" color="textSecondary">Motivo: {item.motivo}</Typography>
                </Box>
              ))}
            </Box>
            <Box sx={{ marginTop: 1, textAlign: 'center' }}>
              <Typography variant="caption" color="textSecondary">
                1-2/2
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Segunda Linha */}
      <Grid container spacing={3} sx={{ marginBottom: 4 }}>
        {/* B.A. Lista */}
        <Grid item xs={12} lg={4}>
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
            <Box sx={{ height: 250 }}>
              <Bar data={mockData.baLista} options={chartOptions('B.A. Lista')} />
            </Box>
          </Paper>
        </Grid>

        {/* Contato Assessoria */}
        <Grid item xs={12} lg={4}>
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
            <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 700 }}>
              Contato Assessoria
            </Typography>
            <Box sx={{ overflowY: 'auto', maxHeight: 230 }}>
              {mockData.contatoAssessoria.map((nome, index) => (
                <Box 
                  key={index}
                  sx={{ 
                    padding: 1.5, 
                    borderBottom: `1px solid ${resolutyPalette.border}`,
                    backgroundColor: index % 2 === 0 ? resolutyPalette.background : '#f5f5f5'
                  }}
                >
                  <Typography variant="body2">{nome}</Typography>
                </Box>
              ))}
            </Box>
            <Box sx={{ marginTop: 1, textAlign: 'center' }}>
              <Typography variant="caption" color="textSecondary">
                1-3/3
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Proposta em Análise */}
        <Grid item xs={12} lg={4}>
          <Paper
            elevation={3}
            sx={{
              padding: 2,
              background: resolutyPalette.card,
              border: `2px solid ${resolutyPalette.border}`,
              borderRadius: 3,
              height: 300,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 700 }}>
              Proposta em Análise
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Não há dados
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Honorários */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{
              padding: 3,
              background: resolutyPalette.success,
              textAlign: 'center',
              borderRadius: 3,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#fff', marginBottom: 1 }}>
              Honorários do Dia
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#fff' }}>
              {mockData.honorarios.dia}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{
              padding: 3,
              background: resolutyPalette.primary,
              textAlign: 'center',
              borderRadius: 3,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#fff', marginBottom: 1 }}>
              Honorários em Aberto
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#fff' }}>
              {mockData.honorarios.aberto}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{
              padding: 3,
              background: '#FF6B9D',
              textAlign: 'center',
              borderRadius: 3,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#fff', marginBottom: 1 }}>
              Recuperação Total
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#fff' }}>
              {mockData.honorarios.total}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

