'use client'

import { useEffect, useRef } from 'react'

interface ChartWrapperProps {
  children: React.ReactNode
}

export default function ChartWrapper({ children }: ChartWrapperProps) {
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Garantir que Chart.js seja executado apenas no cliente
    if (typeof window !== 'undefined') {
      // Chart.js já está registrado globalmente
    }
  }, [])

  return (
    <div ref={chartRef} style={{ width: '100%', height: '100%' }}>
      {children}
    </div>
  )
}
