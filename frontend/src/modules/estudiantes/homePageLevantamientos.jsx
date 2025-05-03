// src/modules/estudiantes/HomePageLevantamientos.jsx

import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';

import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import PersonIcon from '@mui/icons-material/Person';

import imagenRegistro from '../../assets/logoTec.png';

const HomePageLevantamientos = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: 'Inicio', icon: <HomeIcon />, path: '/' },
    { text: 'Inclusiones', icon: <SchoolIcon />, path: '/inclusiones' },
    { text: 'Levantamientos', icon: <TrendingUpIcon />, path: '/levantamientos' },
    { text: 'Retiros', icon: <ExitToAppIcon />, path: '/retiros' },
    { text: 'Seguimiento', icon: <AssignmentTurnedInIcon />, path: '/seguimiento' },
    { text: 'Usuario', icon: <PersonIcon />, path: '/perfil' }
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* ---------------------- BARRA LATERAL ---------------------- */}
      <nav aria-label="Menú principal">
        <Box
          sx={{
            width: '250px',
            backgroundColor: '#ffffff',
            color: '#062043',
            py: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
            borderRight: '1px solid #ddd',
            height: '100vh'
          }}
        >
          <Box sx={{ mb: 4 }}>
            <img src={imagenRegistro} alt="Logo del Tecnológico de Costa Rica" style={{ height: '60px' }} />
          </Box>
          <List sx={{ width: '100%' }}>
            {menuItems.map((item) => (
              <ListItem
                button
                key={item.text}
                component={Link}
                to={item.path}
                selected={location.pathname === item.path}
                sx={{
                  color: '#062043',
                  minHeight: '3.5rem',
                  '&.Mui-selected': {
                    backgroundColor: '#f0f0f0',
                    fontWeight: 'bold'
                  },
                  '&:hover': {
                    backgroundColor: '#f9f9f9'
                  }
                }}
              >
                <ListItemIcon sx={{ color: '#062043' }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </nav>

      {/* ---------------------- CONTENIDO PRINCIPAL ---------------------- */}
      <main style={{ flex: 1 }}>
        <Container disableGutters sx={{px: 5, py: 2 }}>

          <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold', color: '#062043', mb: 3 }}>
            Levantamiento de requisitos y condición RN
          </Typography>

          {/* DESCRIPCIÓN GENERAL */}
          <Typography sx={{ mb: 2 }}>
            Solicita el levantamiento de requisitos o condición RN para cursos específicos del II Semestre 2024.
          </Typography>

          {/* INFORMACIÓN IMPORTANTE */}
          <section>
            <Box sx={{ backgroundColor: '#E0E7FF', p: 2, borderRadius: 2, mb: 2 }}>
              <Typography variant="h2" sx={{ fontWeight: 'bold', fontSize: '1.3rem', mb: 1 }}>Información importante</Typography>
              <ul>
                <li>Los cursos listados en el formulario son los únicos autorizados para levantamiento de requisitos.</li>
                <li>Existe una opción para solicitar levantamiento en otros cursos, evaluada caso por caso.</li>
                <li>No debe usarse este formulario para Práctica Profesional.</li>
              </ul>
            </Box>
          </section>

          {/* FECHAS Y CONSULTAS */}
          <section>
            <Typography variant="h2" sx={{ mt: 4, mb: 1, fontWeight: 'bold', fontSize: '1.3rem' }}>Periodo de solicitud</Typography>
            <Typography sx={{ mb: 2 }}>
              27 de junio de 2024 al 28 de junio de 2024 (hasta las 2:00 p.m.)
            </Typography>

            <Typography variant="h2" sx={{ mt: 4, mb: 1, fontWeight: 'bold', fontSize: '1.3rem' }}>Importante</Typography>
            <Typography sx={{ mb: 2 }}>
              No se recibirán solicitudes fuera del periodo establecido.
            </Typography>

            <Typography variant="h2" sx={{ mt: 4, mb: 1, fontWeight: 'bold', fontSize: '1.3rem' }}>Consultas</Typography>
            <Typography>
              Coordinar sesión escribiendo a: <b>eshuman@itcr.ac.cr</b>
            </Typography>
          </section>

          {/* BOTÓN FORMULARIO */}
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              size="large"
              sx={{
                mt: 5,
                backgroundColor: '#3b5998',
                textTransform: 'none',
                fontWeight: 'bold',
                px: 8,
                fontSize: '1rem'
              }}
              onClick={() => navigate('/formulario-levantamiento')}
            >
              Formulario
            </Button>
          </Box>

          {/* PIE DE PÁGINA */}
          <footer>
            <Typography variant="body2" align="center" sx={{ mt: 8, color: 'gray' }}>
              © 2025 Tecnológico de Costa Rica
            </Typography>
          </footer>

        </Container>
      </main>
    </Box>
  );
};

export default HomePageLevantamientos;
