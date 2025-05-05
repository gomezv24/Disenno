//------------------------------------------------------------------------------
// HOME PAGE RETIROS
// 
// Página principal de proceso de retiros
// Contiene una barra lateral accesible con navegación a funcionalidades clave
// como Inclusiones, Levantamientos, Retiros, Seguimiento y Perfil de Usuario.
// contiene un cuerpo principal con información clara sobre el proceso
// de solicitud, fechas importantes, restricciones y contactos.
//------------------------------------------------------------------------------

import React from 'react';
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

//-------------------------
// Íconos del menú lateral
//-------------------------
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import PersonIcon from '@mui/icons-material/Person';

import imagenRegistro from '../../assets/logoTec.png';

const HomePageRetiros = () => {
  const location = useLocation();

  //--------------------------------------------------------------------------
  // Elementos del menú lateral con rutas e íconos
  //--------------------------------------------------------------------------

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

      {/*--------------------------------*/}
      {/*           MENÚ LATERAL         */}
      {/*--------------------------------*/}
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
        {/* Logo institucional */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <img src={imagenRegistro} alt="Logo del Instituto Tecnológico de Costa Rica" style={{ height: '60px' }} />
        </Box>

        {/* Lista de navegación */}
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

      {/*--------------------------------*/}
      {/*       CONTENIDO PRINCIPAL      */}
      {/*--------------------------------*/}
      <main style={{ flex: 1 }}>

        {/* ENCABEZADO */}
        <header>
          <Container sx={{ px: 5, pt: 6 }}></Container>
        </header>

        {/* CUERPO DE LA PÁGINA */}
        <Container sx={{ px: 5, py: 2 }}>

          {/* Título principal */}
          <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold', color: '#062043', mb: 3 }}>
            Retiro de cursos
          </Typography>

          {/* Descripción del proceso */}
          <Typography sx={{ mb: 2 }}>
            El proceso de retiro permite a estudiantes solicitar la baja de asignaturas matriculadas durante el semestre, por razones académicas o personales.
          </Typography>

          {/* Información clave del proceso */}
          <Box sx={{ backgroundColor: '#E0E7FF', p: 2, borderRadius: 2, mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
              Información importante
            </Typography>
            <ul>
              <li>Los retiros son posibles únicamente entre la semana 1 y la semana 6 del semestre.</li>
              <li>Después de la semana 6, el retiro no será gratuito y podría generar cargos adicionales.</li>
              <li>El formulario es gestionado directamente por el Departamento de Admisión y Registro.</li>
            </ul>
          </Box>

          {/* Enlace al formulario oficial */}
          <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 4, mb: 1 }}>
            Solicitud de retiro de cursos
          </Typography>
          <Typography sx={{ mb: 2 }}>
            <a
              href="https://www.tec.ac.cr/form/webform-26941"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#3b5998', fontWeight: 'bold' }}
            >
              https://www.tec.ac.cr/form/webform-26941
            </a>
          </Typography>

        </Container>
      </main>
    </Box>
  );
};

export default HomePageRetiros;
