// Versión accesible estructurada de HomePageRetiros (sin sección de solicitud de retiro de cursos)
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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

const HomePageRetiros = () => {
  const location = useLocation();
  const [info, setInfo] = useState(null);

  useEffect(() => {
    const fetchRetiroInfo = async () => {
      try {
        const response = await fetch('http://localhost:5000/procesos/Retiro');
        const data = await response.json();
        setInfo(data[0]);
      } catch (error) {
        console.error('Error al obtener la información de retiro:', error);
      }
    };

    fetchRetiroInfo();
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

      {/* Menú lateral */}
      <nav aria-label="Menú principal" style={{ width: '250px', backgroundColor: '#ffffff', color: '#062043', padding: '32px 0', boxShadow: '2px 0 5px rgba(0,0,0,0.1)', borderRight: '1px solid #ddd', height: '100vh' }}>
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <img src={imagenRegistro} alt="Logo del Instituto Tecnológico de Costa Rica" style={{ height: '60px' }} />
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
      </nav>

      {/* Contenido principal */}
      <main id="contenido-principal" style={{ flex: 1 }}>
        <Container sx={{ px: 5, pt: 6 }}>
          <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold', color: '#062043', mb: 3 }}>
            Retiro de cursos
          </Typography>

          <Typography sx={{ mb: 2 }}>
            {info?.informacion || 'Cargando información del proceso...'}
          </Typography>

          <section aria-labelledby="info-title">
            <Box sx={{ backgroundColor: '#E0E7FF', p: 2, borderRadius: 2, mb: 2 }}>
              <Typography id="info-title" component="h2" variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                Información importante
              </Typography>
              <ul>
                <li>Los retiros son posibles únicamente entre la semana 1 y la semana 6 del semestre.</li>
                <li>Después de la semana 6, el retiro no será gratuito y podría generar cargos adicionales.</li>
                <li>El formulario es gestionado directamente por el Departamento de Admisión y Registro.</li>
              </ul>
            </Box>
          </section>

          <section>
            <Typography component="h2" variant="h6" sx={{ fontWeight: 'bold', mt: 4, mb: 1 }}>
              Periodo de solicitud
            </Typography>
            <Typography sx={{ mb: 2 }}>
              {info?.fechaInicio && info?.fechaFin
                ? `${info.fechaInicio} al ${info.fechaFin}`
                : 'Cargando fechas...'}
            </Typography>

            <Typography component="h2" variant="h6" sx={{ fontWeight: 'bold', mt: 4, mb: 1 }}>
              Consultas
            </Typography>
            <Typography sx={{ mb: 2 }}>
              {info?.Consultas || 'Cargando contacto...'}
            </Typography>
          </section>
        </Container>

        <footer style={{ textAlign: 'center', padding: '1rem', fontSize: '0.9rem' }}>
          <p>© Curso Diseño de software. Todos los derechos reservados</p>
        </footer>
      </main>
    </Box>
  );
};

export default HomePageRetiros;