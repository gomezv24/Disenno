// src/modules/registro/LoginScreen.jsx

import React from 'react';
import { Container, Typography, TextField, Button, Link, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 
import imagenRegistro from '../../assets/imagenRegistro.png';

const LoginScreen = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/estudiantes'); // 👈 ahora lleva a /estudiantes
  };

  return (
    <Container maxWidth="xl" sx={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
      {/* Sección Izquierda */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <img src={imagenRegistro} alt="Gráfico" style={{ width: '80%', maxWidth: '400px' }} />
      </Box>

      {/* Sección Derecha */}
      <Box sx={{ flex: 1, px: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#062043', mb: 2 }}>
          Inicio de Sesión
        </Typography>
        <Typography variant="body2" sx={{ color: '#6b6b6b', mb: 4 }}>
          Ingresa tu correo estudiantil o ltcr
        </Typography>

        <TextField
          fullWidth
          label="Dirección de correo electrónico"
          variant="outlined"
          sx={{ mb: 3 }}
        />
        <TextField
          fullWidth
          label="Contraseña"
          type="password"
          variant="outlined"
          sx={{ mb: 4 }}
        />

        <Button
          fullWidth
          variant="contained"
          onClick={handleLogin}
          sx={{ backgroundColor: '#3b5998', textTransform: 'none', fontWeight: 'bold', mb: 2 }}
        >
          Iniciar Sesión
        </Button>

        <Link href="#" variant="body2" sx={{ display: 'block', textAlign: 'center', color: '#6b6b6b' }}>
          ¿Tienes problemas para acceder?
        </Link>
      </Box>
    </Container>
  );
};

export default LoginScreen;
