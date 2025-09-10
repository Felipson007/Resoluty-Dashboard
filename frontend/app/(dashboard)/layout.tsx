'use client'

import { AuthProvider } from '@/contexts/AuthContext'
import Sidebar from '@/components/Sidebar'
import { useEffect, useState } from 'react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div style={{ display: 'flex' }}>
        <div style={{ 
          flex: 1, 
          paddingLeft: 240, 
          transition: 'padding-left 0.2s' 
        }}>
          {children}
        </div>
      </div>
    )
  }

  return (
    <AuthProvider>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ 
          flex: 1, 
          paddingLeft: 240, 
          transition: 'padding-left 0.2s' 
        }}>
          {children}
        </div>
      </div>
    </AuthProvider>
  )
}
