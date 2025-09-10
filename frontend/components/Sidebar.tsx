'use client'

/**
 * 🧭 Sidebar Component - Resoluty Dashboard
 * 
 * Menu lateral responsivo que fornece:
 * - Navegação entre páginas da aplicação
 * - Design adaptativo para desktop e mobile
 * - Sistema de logout
 * - Logo da empresa
 * - Estados visuais (hover, ativo)
 * 
 * @author Resoluty
 * @version 1.0.0
 */

import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box, Typography, ListSubheader, ListItemButton, Divider, Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';
import PeopleIcon from '@mui/icons-material/People';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { resolutyPalette } from '@/pages/Financeiro';
import Logo from '@/logo.svg';

/**
 * Configuração das seções do menu
 * Define estrutura hierárquica da navegação
 */
const sections = [
  {
    title: 'Home',
    items: [
      { text: 'Home', icon: <HomeIcon />, path: '/dashboard' },
    ],
  },
  {
    title: 'Administrativo',
    items: [
      { text: 'Gestão', icon: <PeopleIcon />, path: '/gestao' },
      { text: 'Financeiro', icon: <BarChartIcon />, path: '/financeiro' },
    ],
  },
  {
    title: 'Geral',
    items: [
      { text: 'Comercial', icon: <TrendingUpIcon />, path: '/comercial' },
      { text: 'Costumer Sucess', icon: <SupportAgentIcon />, path: '/customer-success' },
      { text: 'Administrativo', icon: <MenuBookIcon />, path: '/administrativo' },
    ],
  },
];

/**
 * Componente Sidebar principal
 * Renderiza menu lateral com navegação e logout
 */
export default function Sidebar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const { logout } = useAuth();

  /**
   * Função para fazer logout do usuário
   * Remove dados de autenticação e redireciona para login
   */
  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  // Renderização para dispositivos móveis
  if (isMobile) {
    return (
      <>
        {/* Botão hambúrguer para abrir menu */}
        <IconButton 
          onClick={() => setOpen(true)} 
          sx={{ 
            position: 'fixed', 
            top: 16, 
            left: 16, 
            zIndex: 2000, 
            color: resolutyPalette.text 
          }}
        >
          <MenuIcon fontSize="large" />
        </IconButton>
        
        {/* Drawer temporário para mobile */}
        <Drawer 
          anchor="left" 
          open={open} 
          onClose={() => setOpen(false)}
          PaperProps={{ 
            sx: { 
              background: resolutyPalette.sidebar, 
              color: resolutyPalette.text, 
              width: 220 
            } 
          }}
        >
          {/* Logo da empresa */}
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 2 }}>
            <img src={Logo} alt="Resoluty Logo" style={{ height: 40 }} />
          </Box>
          
          {/* Conteúdo do menu */}
          <Box sx={{ px: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Box sx={{ flex: 1 }}>
              {sections.map(section => (
                <List key={section.title} sx={{ mb: 2 }}>
                  <ListSubheader 
                    disableSticky 
                    sx={{ 
                      background: 'transparent', 
                      color: resolutyPalette.text, 
                      fontWeight: 700 
                    }}
                  >
                    {section.title}
                  </ListSubheader>
                  
                  {section.items.map(item => (
                    <ListItemButton
                      key={item.text}
                      onClick={() => { setOpen(false); router.push(item.path); }}
                      sx={{ 
                        pl: 2, 
                        mb: 0.5, 
                        borderRadius: 1, 
                        '&:hover': { background: resolutyPalette.border }, 
                        background: item.path === window.location.pathname ? resolutyPalette.primary : 'transparent', 
                        color: resolutyPalette.text, 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 2 
                      }}
                      component="li"
                    >
                      <ListItemIcon sx={{ minWidth: 36, color: resolutyPalette.text }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText primary={item.text} />
                    </ListItemButton>
                  ))}
                </List>
              ))}
            </Box>
            
            {/* Botão de logout */}
            <Divider sx={{ my: 2, borderColor: resolutyPalette.text }} />
            <Button
              fullWidth
              variant="outlined"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              sx={{
                color: resolutyPalette.text,
                borderColor: resolutyPalette.text,
                '&:hover': {
                  borderColor: resolutyPalette.primary,
                  background: resolutyPalette.border
                }
              }}
            >
              Sair
            </Button>
          </Box>
        </Drawer>
      </>
    );
  }

  // Renderização para desktop
  return (
    <Drawer
      variant="permanent"
      open={open}
      PaperProps={{
        style: {
          width: 240,
          background: resolutyPalette.sidebar,
          color: resolutyPalette.text,
          borderRight: '1px solid #eee',
          paddingTop: 24,
        },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Logo da empresa */}
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 2 }}>
          <img src={Logo} alt="Resoluty Logo" style={{ height: 40 }} />
        </Box>
        
        {/* Conteúdo do menu */}
        <Box sx={{ px: 2, flex: 1 }}>
          {sections.map(section => (
            <Box key={section.title} mb={2}>
              <Typography 
                variant="body2" 
                color="textSecondary" 
                fontWeight={500} 
                mb={1} 
                sx={{ pl: 1 }}
              >
                {section.title}
              </Typography>
              
              <List disablePadding>
                {section.items.map(item => (
                  <ListItem
                    key={item.text}
                    onClick={() => router.push(item.path)}
                    sx={{
                      pl: 2,
                      mb: 0.5,
                      borderRadius: 1,
                      '&:hover': { background: resolutyPalette.border },
                      background: item.path === window.location.pathname ? resolutyPalette.primary : 'transparent',
                      color: item.path === window.location.pathname ? resolutyPalette.text : resolutyPalette.text,
                    }}
                    component="li"
                  >
                    <ListItemIcon sx={{ minWidth: 36, color: resolutyPalette.text }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItem>
                ))}
              </List>
            </Box>
          ))}
        </Box>
        
        {/* Botão de logout */}
        <Box sx={{ px: 2, pb: 2 }}>
          <Divider sx={{ mb: 2, borderColor: resolutyPalette.text }} />
          <Button
            fullWidth
            variant="outlined"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{
              color: resolutyPalette.text,
              borderColor: resolutyPalette.text,
              '&:hover': {
                borderColor: resolutyPalette.primary,
                background: resolutyPalette.border
              }
            }}
          >
            Sair
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}
