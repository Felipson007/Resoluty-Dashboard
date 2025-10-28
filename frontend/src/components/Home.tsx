import { Box, Typography, Paper } from '@mui/material'

export default function Home() {
  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          🚀 Bem-vindo ao Resoluty Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Selecione uma página no menu lateral para começar.
        </Typography>
      </Paper>
    </Box>
  )
}

