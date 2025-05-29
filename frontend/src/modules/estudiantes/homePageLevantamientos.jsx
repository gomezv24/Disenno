// Versión accesible estructurada de HomePageLevantamientos
import React, { useEffect, useState } from 'react';
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
  const [info, setInfo] = useState(null);

  useEffect(() => {
    const fetchLevantamientoInfo = async () => {
      try {
        const response = await fetch('http://localhost:5000/procesos/Levantamiento%20de%20requisitos');
        const data = await response.json();
        setInfo(data[0]);
      } catch (error) {
        console.error('Error al obtener la información de levantamientos:', error);
      }
    };
    fetchLevantamientoInfo();
  }, []);

  const menuItems = [
    { text: 'Inicio', icon: <HomeIcon />, path: '/' },
    { text: 'Inclusiones', icon: <SchoolIcon />, path: '/inclusiones' },
    { text: 'Levantamientos', icon: <TrendingUpIcon />, path: '/levantamientos' },
    { text: 'Retiros', icon: <ExitToAppIcon />, path: '/retiros' },
    { text: 'Seguimiento', icon: <AssignmentTurnedInIcon />, path: '/seguimiento' },
    { text: 'Usuario', icon: <PersonIcon />, path: '/infoUsuario' }
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <a href="#contenido-principal" className="sr-only focus:not-sr-only" style={{ position: 'absolute', left: '-10000px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}>Saltar al contenido principal</a>

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
                  '&.Mui-selected': { backgroundColor: '#f0f0f0', fontWeight: 'bold' },
                  '&:hover': { backgroundColor: '#f9f9f9' }
                }}
              >
                <ListItemIcon sx={{ color: '#062043' }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </nav>

      <main id="contenido-principal" style={{ flex: 1 }}>
        <Container sx={{ px: 5, pt: 6 }}>
          <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold', color: '#062043', mb: 3 }}>
            Levantamiento de requisitos y condición RN
          </Typography>

          <Typography sx={{ mb: 2 }}>
            {info?.informacion || 'Cargando información del proceso...'}
          </Typography>

          <section aria-labelledby="info-title">
            <Box sx={{ backgroundColor: '#E0E7FF', p: 2, borderRadius: 2, mb: 2 }}>
              <Typography id="info-title" component="h2" variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                Información
              </Typography>
              <ul>
                <li>Los cursos listados en el formulario son los únicos autorizados para levantamiento de requisitos.</li>
                <li>Existe una opción para solicitar levantamiento en otros cursos, evaluada caso por caso.</li>
                <li>No debe usarse este formulario para Práctica Profesional.</li>
              </ul>
            </Box>
          </section>

          <section>
            <Typography component="h2" variant="h6" sx={{ mt: 4, mb: 1, fontWeight: 'bold' }}>
              Periodo de solicitud
            </Typography>
            <Typography sx={{ mb: 2 }}>
              {info?.fechaInicio && info?.fechaFin
                ? `${info.fechaInicio} al ${info.fechaFin}`
                : 'Cargando fechas...'}
            </Typography>

            <Typography component="h2" variant="h6" sx={{ mt: 4, mb: 1, fontWeight: 'bold' }}>
              Consultas
            </Typography>
            <Typography>
              {info?.Consultas || 'Cargando correos de contacto...'}
            </Typography>
          </section>

          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              size="large"
              aria-label="Ir al formulario de levantamiento de requisitos"
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
        </Container>

        <footer style={{ textAlign: 'center', padding: '1rem', fontSize: '0.9rem' }}>
          <p>© Curso Diseño de software. Todos los derechos reservados</p>
        </footer>
      </main>
    </Box>
  );
};

export default HomePageLevantamientos;
