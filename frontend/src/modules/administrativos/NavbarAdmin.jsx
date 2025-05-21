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
            style={{ height: 50, marginRight: 20 }}
          />
        </Box>

        {/* Iconos a la derecha */}
        <Box display="flex" gap={2}>
          <IconButton onClick={() => navigate('/administrativo')}> {/* aqui cambio la ruta al panel */}
            <img src={HomeIcon} alt="Inicio" style={{ width: 50, height: 50 }} />
          </IconButton>

          <IconButton onClick={() => navigate('/perfil')}>
            <img src={PersonIcon} alt="Perfil" style={{ width: 50, height: 50 }} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavbarAdmin;
