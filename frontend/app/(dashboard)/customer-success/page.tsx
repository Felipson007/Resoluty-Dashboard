'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, CircularProgress, Typography } from '@mui/material';

export default function CustomerSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirecionar automaticamente para a página Geral
    router.replace('/customer-success/geral');
  }, [router]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        gap: 2,
      }}
    >
      <CircularProgress />
      <Typography variant="h6" color="textSecondary">
        Carregando...
      </Typography>
    </Box>
  );
}
