import { Box, Typography, Paper, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { 
  People, 
  Assignment,
  CheckCircle,
  MonetizationOn
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
  kpis: [
    { label: 'Faturamento', value: 'R$ 4.349,11', icon: <MonetizationOn />, color: '#22c55e' },
    { label: 'Adimplência', value: '28,95%', icon: <CheckCircle />, color: '#eab308' },
    { label: 'Acordos', value: '0', icon: <Assignment />, color: '#3b82f6' },
    { label: 'Google', value: '0', icon: <People />, color: '#8b5cf6' },
  ],
  realizadosAtrasados: {
    labels: ['Realizado', 'Atrasado', 'Pendente'],
    datasets: [
      {
        label: 'Status',
        data: [586, 113, 13],
        backgroundColor: ['#22c55e', '#ef4444', '#f59e0b'],
      },
    ],
  },
  realizadosAtrasados2: {
    labels: ['Realizado', 'Atrasado', 'Pendente'],
    datasets: [
      {
        label: 'Status',
        data: [571, 137, 3],
        backgroundColor: ['#22c55e', '#ef4444', '#f59e0b'],
      },
    ],
  },
  clientes: [
    'Olimpio De Souza Paula',
    'Marineuza Marques Souza',
    'Lucas Sudre Rela',
    'Lais Santomauro Rela De Moura',
    'Jose Raimundo De Silva Lema',
    'Joaquinao Luiz Scripianeli',
  ],
  pendencias: [
    { nome: 'Valdete Pereira De Almeida Ferreira', motivo: 'B.A.' },
    { nome: 'Maria Rosa Castro', motivo: 'B.A.' },
    { nome: 'Claudio Marinelo', motivo: 'B.A.' },
  ],
  assessoria: [
    'Marineuza Marques Souza',
    'Lucas Sudre Rela',
    'Laurindo Modolo',
  ],
  financeiro: [
    { label: 'Honorários do Dia', value: 'R$ 704,80', color: '#10b981' },
    { label: 'Honorários em Aberto', value: 'R$ 7.939,60', color: '#3b82f6' },
    { label: 'Recuperação Total', value: 'R$ 50.978,94', color: '#ec4899' },
  ],
});

const chartOptions = (title: string) => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'top' as const },
    title: { display: true, text: title },
  },
  scales: {
    y: { beginAtZero: true },
  },
});

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

export default function CustomerSuccessOverview() {
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
        {mockData.kpis.map((kpi, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              elevation={3}
              sx={{
                padding: { xs: 2, sm: 3 },
                textAlign: 'center',
                background: kpi.color,
                color: '#fff',
                borderRadius: 3,
                transition: 'transform 0.2s ease-in-out',
                '&:hover': { transform: 'translateY(-5px)' },
              }}
            >
              <Box sx={{ marginBottom: 1 }}>{kpi.icon}</Box>
              <Typography variant="body2" sx={{ fontWeight: 600, marginBottom: 1 }}>{kpi.label}</Typography>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>{kpi.value}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Gráficos e Listas */}
      <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ marginBottom: 4 }}>
        {/* Gráficos de Barras */}
        <Grid item xs={12} lg={6}>
          <Paper elevation={3} sx={{ padding: 2, borderRadius: 3, height: 300 }}>
            <Box sx={{ height: 240 }}>
              <Bar data={mockData.realizadosAtrasados} options={chartOptions('Status Atual')} />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Paper elevation={3} sx={{ padding: 2, borderRadius: 3, height: 300 }}>
            <Box sx={{ height: 240 }}>
              <Bar data={mockData.realizadosAtrasados2} options={chartOptions('Status Anterior')} />
            </Box>
          </Paper>
        </Grid>

        {/* Listas de Contatos */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: 2 }}>Contato Cliente</Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Cliente</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockData.clientes.map((cliente, index) => (
                    <TableRow key={index}>
                      <TableCell>{cliente}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Typography variant="caption" sx={{ textAlign: 'right', display: 'block', mt: 1 }}>1-12/12</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: 2 }}>Pendência Retorno/B.A.</Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Cliente</strong></TableCell>
                    <TableCell><strong>Motivo</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockData.pendencias.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.nome}</TableCell>
                      <TableCell>{item.motivo}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Typography variant="caption" sx={{ textAlign: 'right', display: 'block', mt: 1 }}>1-2/2</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: 2 }}>Contato Assessoria</Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Contato</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockData.assessoria.map((contato, index) => (
                    <TableRow key={index}>
                      <TableCell>{contato}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Typography variant="caption" sx={{ textAlign: 'right', display: 'block', mt: 1 }}>1-3/3</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2, borderRadius: 3, minHeight: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="body1" sx={{ color: resolutyPalette.textSecondary }}>Não há dados</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Resumo Financeiro */}
      <Grid container spacing={{ xs: 2, sm: 3 }}>
        {mockData.financeiro.map((item, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Paper
              elevation={3}
              sx={{
                padding: 3,
                textAlign: 'center',
                background: item.color,
                color: '#fff',
                borderRadius: 3,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: 1 }}>{item.label}</Typography>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>{item.value}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

