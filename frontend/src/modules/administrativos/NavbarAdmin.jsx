import React from 'react';
import { AppBar, Toolbar, IconButton, Box, Typography, Avatar } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';

const NavbarAdmin = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" elevation={0} sx={{ backgroundColor: '#fff', borderBottom: '1px solid #ddd' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo TEC */}
        <Box display="flex" alignItems="center">
          <img
            src="/tec-logo.png"
            alt="Logo Tecnológico de Costa Rica"
            style={{ height: 50, marginRight: 16 }}
          />
        </Box>

        {/* Iconos a la derecha */}
        <Box display="flex" gap={2}>
          <IconButton onClick={() => navigate('/administrativo')}>
            <HomeIcon sx={{ color: '#1A4C8B' }} />
          </IconButton>
          <IconButton onClick={() => navigate('/perfil')}>
            <PersonIcon sx={{ color: '#1A4C8B' }} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavbarAdmin;
