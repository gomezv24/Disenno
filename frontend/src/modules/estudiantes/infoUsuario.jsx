import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper
} from '@mui/material';

import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import PersonIcon from '@mui/icons-material/Person';

import imagenRegistro from '../../assets/logoTec.png';

const InfoUsuario = () => {
  const location = useLocation();

  const menuItems = [
    { text: 'Inicio', icon: <HomeIcon />, path: '/' },
    { text: 'Inclusiones', icon: <SchoolIcon />, path: '/inclusiones' },
    { text: 'Levantamientos', icon: <TrendingUpIcon />, path: '/levantamientos' },
    { text: 'Retiros', icon: <ExitToAppIcon />, path: '/retiros' },
    { text: 'Seguimiento', icon: <AssignmentTurnedInIcon />, path: '/seguimiento' },
    { text: 'Usuario', icon: <PersonIcon />, path: '/usuario' }
  ];

  const datosUsuario = {
    nombre: 'Ana Pérez López',
    correo: 'ana.perezlopez@estudiantec.cr',
    telefono: '+506 8888-8888',
    sede: 'Cartago',
    carrera: 'Ingeniería en Computación',
    planEstudio: 'Plan 411',
    beca: 'Beca socioeconómica'
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>

      {/* MENÚ LATERAL */}
      <nav
        aria-label="Menú principal"
        style={{
          width: '250px',
          backgroundColor: '#ffffff',
          color: '#062043',
          padding: '32px 0',
          boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
          borderRight: '1px solid #ddd',
          height: '100vh'
        }}
      >
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <img src={imagenRegistro} alt="Logo del TEC" style={{ height: '60px' }} />
        </Box>
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              sx={{
                color: '#062043',
                '&.Mui-selected': { backgroundColor: '#f0f0f0', fontWeight: 'bold' },
                '&:hover': { backgroundColor: '#f9f9f9' }
              }}
            >
              <ListItemIcon sx={{ color: '#062043' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </nav>

      {/* CONTENIDO PRINCIPAL */}
      <main style={{ flex: 1 }}>
        <Container sx={{ px: 5, py: 6 }}>
          <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold', color: '#062043', mb: 4 }}>
            Información del Usuario
          </Typography>

          <Paper sx={{ p: 4, backgroundColor: '#f7faff' }}>
            {Object.entries(datosUsuario).map(([label, value]) => (
              <Box key={label} sx={{ mb: 3 }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#062043' }}>
                  {label.charAt(0).toUpperCase() + label.slice(1).replace(/([A-Z])/g, ' $1')}:
                </Typography>
                <Typography variant="body1">{value}</Typography>
              </Box>
            ))}
          </Paper>
        </Container>
      </main>
    </Box>
  );
};

export default InfoUsuario;
