import { useNavigate, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Divider,
  Button
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { useAuth } from '../contexts/AuthContext';

// Configuração de cores
const resolutyPalette = {
  sidebar: '#1a1a2e',
  text: '#ffffff',
  primary: '#16213e',
  border: '#0f3460',
  hoverSidebar: '#16213e',
  activeSidebar: '#0f3460',
};

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
    ],
  },
  {
    title: 'Geral',
    items: [
      { text: 'Comercial', icon: <TrendingUpIcon />, path: '/comercial' },
      { text: 'Customer Success', icon: <SupportAgentIcon />, path: '/customer-success' },
      { text: 'Administrativo', icon: <MenuBookIcon />, path: '/administrativo' },
    ],
  },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      navigate('/login');
    }
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <Drawer
      variant="permanent"
      open={true}
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
          <Typography variant="h6" sx={{ color: resolutyPalette.text }}>
            Resoluty
          </Typography>
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
                sx={{ pl: 1, color: resolutyPalette.text }}
              >
                {section.title}
              </Typography>

              <List disablePadding>
                {section.items.map(item => (
                  <ListItem
                    key={item.text}
                    onClick={() => handleNavigation(item.path)}
                    sx={{
                      pl: 2,
                      mb: 0.5,
                      borderRadius: 1,
                      '&:hover': { background: resolutyPalette.border },
                      background: location.pathname === item.path ? resolutyPalette.primary : 'transparent',
                      color: resolutyPalette.text,
                      cursor: 'pointer',
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
                borderColor: resolutyPalette.activeSidebar,
                background: resolutyPalette.hoverSidebar
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
