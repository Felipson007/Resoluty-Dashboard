import { Box, Typography, Paper, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
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
import { resolutyPalette } from './CustomerSuccessOverview';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const getMockData = () => ({
  totalClientes: 310,
  clientesTipo: {
    labels: ['Serviço', 'Veículo'],
    datasets: [
      {
        data: [235, 75],
        backgroundColor: ['#3b82f6', '#f59e0b'],
      },
    ],
  },
  clientesPorFase: {
    labels: ['Fase 1', 'Fase 2', 'Fase 3', 'Fase 4', 'Fase 5'],
    datasets: [
      {
        label: 'Clientes',
        data: [68, 68, 54, 102, 22],
        backgroundColor: '#3b82f6',
      },
    ],
  },
  contatoPendente: {
    labels: ['Fase 1', 'Fase 2', 'Fase 3', 'Fase 4', 'Fase 5'],
    datasets: [
      {
        label: 'Contatos Pendentes',
        data: [13, 6, 6, 88, 27],
        backgroundColor: '#ef4444',
      },
    ],
  },
  planejamento: {
    labels: ['Planej.', 'B.A.'],
    datasets: [
      {
        data: [88, 90],
        backgroundColor: ['#3b82f6', '#f59e0b'],
      },
    ],
  },
  statusDistribuicao: {
    labels: ['Negociação', 'Antecipação de P.S.', 'Possibilidade', 'Quitação direta', 'Aprovado', 'Agendado'],
    datasets: [
      {
        data: [215, 44, 32, 13, 0, 0],
        backgroundColor: ['#3b82f6', '#f59e0b', '#8b5cf6', '#06b6d4', '#22c55e', '#eab308'],
      },
    ],
  },
  clientesList: [
    { status: 'Quitação direta', cliente: 'Sarah Cristina Casonatto', valor: 'R$ 4.200,00' },
    { status: 'Quitação direta', cliente: 'Dhacson Aparecido Dos Santos', valor: 'R$ 6.200,00' },
    { status: 'Quitação direta', cliente: 'Ana Claudia Ricardo De Gois', valor: 'R$ 2.500,00' },
    { status: 'Quitação direta', cliente: 'Patricia De Paula Santana', valor: '' },
    { status: 'Quitação direta', cliente: 'Luiz Gustavo De Souza Silva', valor: '' },
    { status: 'Quitação direta', cliente: 'Felipe De Carvalho Silva', valor: '' },
    { status: 'Possibilidade', cliente: 'Laís Ariane Da Fonseca Moura', valor: '' },
    { status: 'Possibilidade', cliente: 'Marcelo Andre Dias De Oliveira Junior', valor: 'R$ 1.500,00' },
    { status: 'Possibilidade', cliente: 'Jose De Jesus Paes', valor: '' },
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
        ticks: { color: resolutyPalette.text, font: { size: 12 } },
      },
      x: {
        ticks: { color: resolutyPalette.text, font: { size: 12 } },
      },
    },
  })
});

export default function CustomerSuccessStatus() {
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
        📈 Status e Fases
      </Typography>

      {/* KPIs e Gráficos Principais */}
      <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ marginBottom: 4 }}>
        {/* Total Clientes com Pie Chart */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ padding: 3, borderRadius: 3, background: resolutyPalette.card }}>
            <Typography variant="h3" sx={{ fontWeight: 700, textAlign: 'center', mb: 2 }}>
              {mockData.totalClientes}
            </Typography>
            <Typography variant="h6" sx={{ textAlign: 'center', mb: 2, color: resolutyPalette.textSecondary }}>
              Total Clientes
            </Typography>
            <Box sx={{ height: 200 }}>
              <Pie data={mockData.clientesTipo} options={chartOptions('Total Clientes', true)} />
            </Box>
          </Paper>
        </Grid>

        {/* N° Clientes por Fase */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ padding: 3, borderRadius: 3, background: resolutyPalette.card, height: 400 }}>
            <Box sx={{ height: 320 }}>
              <Bar data={mockData.clientesPorFase} options={chartOptions('N° Clientes por Fase')} />
            </Box>
          </Paper>
        </Grid>

        {/* Contato Pendente Clientes */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ padding: 3, borderRadius: 3, background: resolutyPalette.card, height: 400 }}>
            <Box sx={{ height: 320 }}>
              <Bar data={mockData.contatoPendente} options={chartOptions('Contato Pendente Clientes')} />
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Planejamento e Status */}
      <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ marginBottom: 4 }}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ padding: 3, borderRadius: 3, background: resolutyPalette.card, height: 300 }}>
            <Box sx={{ height: 240 }}>
              <Bar data={mockData.planejamento} options={chartOptions('Planejamento e B.A.')} />
            </Box>
          </Paper>
        </Grid>

        {/* Status Distribution */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ padding: 3, borderRadius: 3, background: resolutyPalette.card, height: 300 }}>
            <Box sx={{ height: 240 }}>
              <Pie data={mockData.statusDistribuicao} options={chartOptions('Distribuição de Status', true)} />
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Lista de Clientes */}
      <Grid container spacing={{ xs: 2, sm: 3 }}>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: 2, borderRadius: 3 }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Status</strong></TableCell>
                    <TableCell><strong>Cliente</strong></TableCell>
                    <TableCell><strong>Valor Cliente</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockData.clientesList.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.status}</TableCell>
                      <TableCell>{row.cliente}</TableCell>
                      <TableCell>{row.valor || '-'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Typography variant="caption" sx={{ textAlign: 'right', display: 'block', mt: 1 }}>
              1 - 100 / 280
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

