import React from 'react';
import { AppBar, Toolbar, IconButton, Box } from '@mui/material';
import HomeIcon from '../../assets/home.png';
import PersonIcon from '../../assets/imagenUsuario.png';
import { useNavigate } from 'react-router-dom';
import imagenRegistro from '../../assets/logoTec.png'; // así como lo usa tu compañera


const NavbarAdmin = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" elevation={0} sx={{ backgroundColor: '#fff', borderBottom: '1px solid #ddd' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo TEC */}
        <Box display="flex" alignItems="center">
          <img
            src={imagenRegistro}
            alt="Logo Tecnológico de Costa Rica"
            style={{ height: 60, marginRight: 30 }}
          />
        </Box>

        {/* Iconos a la derecha */}
        <Box display="flex" gap={2}>
          {/* Botón de inicio */}
          <IconButton
            onClick={() => navigate('/administrativo/panelControl')}
            aria-label="Ir al panel de control"
            sx={{ p: 0, borderRadius: '50%', overflow: 'hidden' }}
          >
            <img
              src={HomeIcon}
              alt="Ícono de inicio"
              style={{ width: 60, height: 60 }}
            />
          </IconButton>

          {/* Botón de perfil */}
          <IconButton
            onClick={() => navigate('/perfil')}
            aria-label="Ir al perfil de usuario"
            sx={{ p: 0, borderRadius: '50%', overflow: 'hidden' }}
          >
            <img
              src={PersonIcon}
              alt="Foto de perfil"
              style={{ width: 60, height: 60, objectFit: 'cover' }}
            />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavbarAdmin;
