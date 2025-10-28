'use client';

import dynamic from 'next/dynamic';
import { Box, CircularProgress } from '@mui/material';

const Comercial = dynamic(() => import('@/pages/Comercial'), {
  ssr: false,
  loading: () => (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
      <CircularProgress />
    </Box>
  )
});

export default function ComercialPage() {
  return <Comercial />;
}
