//------------------------------------------------------------------------------
// HOME PAGE INCLUSIONES
// 
// Página principal de proceso de inclusiones
// Contiene una barra lateral accesible con navegación a funcionalidades clave
// como Inclusiones, Levantamientos, Retiros, Seguimiento y Perfil de Usuario.
// contiene un cuerpo principal con información clara sobre el proceso
// de solicitud, fechas importantes, restricciones y contactos.
// Permite acceso directo al formulario para realizar la solicitud de inclusión.
//------------------------------------------------------------------------------

import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
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

const HomePageInclusiones = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [info, setInfo] = useState(null);

  useEffect(() => {
    const fetchInclusionInfo = async () => {
      try {
        const response = await fetch('http://localhost:5000/procesos/Inclusi%C3%B3n%20de%20curso');
        const data = await response.json();
        console.log("Data inclusión:", data);
        setInfo(data[0]); 
      } catch (error) {
        console.error('Error al obtener la información de inclusión:', error);
      }
    };

    fetchInclusionInfo();
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
      {/* Menú lateral */}
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

      {/* Cuerpo principal */}
      <main style={{ flex: 1 }}>
        <header>
          <Container sx={{ px: 5, pt: 6 }} />
        </header>

        <Container sx={{ px: 5, py: 2 }}>
          <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold', color: '#062043', mb: 3 }}>
            Inclusiones a cursos
          </Typography>

          <section>
            <Typography sx={{ mb: 2 }}>
              {info?.informacion || 'Cargando información del proceso...'}
            </Typography>
          </section>

          <section aria-labelledby="info-importante">
            <Box sx={{ backgroundColor: '#E0E7FF', p: 2, borderRadius: 2, mb: 2 }}>
              <Typography id="info-importante" variant="h2" sx={{ mb: 1, fontWeight: 'bold', fontSize: '1.3rem' }}>
                Información
              </Typography>
              <ul>
                <li>La solicitud debe completarse en su totalidad; datos falsos o incompletos no serán tramitados.</li>
                <li>La existencia de cupo no garantiza la aprobación de la inclusión.</li>
                <li>No se aprobarán solicitudes que generen choques de horario o excedan el límite de créditos permitidos.</li>
                <li>Al enviar la solicitud, autoriza a la Escuela de Ingeniería en Computación a matricularlo en caso de asignación de cupo.</li>
              </ul>
            </Box>
          </section>

          {/* Periodo de solicitud */}
          <section>
            <Typography variant="h2" sx={{ mt: 4, mb: 1, fontWeight: 'bold', fontSize: '1.3rem' }}>
              Periodo de solicitud
            </Typography>
            <Typography sx={{ mb: 2 }}>
              {info?.fechaInicio && info?.fechaFin
                ? `${info.fechaInicio} al ${info.fechaFin}`
                : 'Cargando fechas...'}
            </Typography>

            <Typography variant="h2" sx={{ mt: 4, mb: 1, fontWeight: 'bold', fontSize: '1.3rem' }}>
              Consultas
            </Typography>
            <Typography>
              {info?.Consultas || 'Cargando correos de contacto...'}
            </Typography>
          </section>

          {/* Botón */}
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
              onClick={() => navigate('/formulario-inclusiones')}
            >
              Formulario
            </Button>
          </Box>
        </Container>
      </main>
    </Box>
  );
};

export default HomePageInclusiones;
