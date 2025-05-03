import React from 'react';
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

      {/* ======================= MENÚ DE NAVEGACIÓN ======================= */}
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

      {/* ======================= CONTENIDO PRINCIPAL ======================= */}
      <main style={{ flex: 1 }}>
        <Container disableGutters sx={{ px: 5, py: 2 }}>

          {/* ------------------ CONTENIDO DE INCLUSIONES ------------------ */}
          <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold', color: '#062043', mb: 3 }}>
            Inclusión a cursos
          </Typography>

          <section>
            <Typography sx={{ mb: 2 }}>
              El proceso de inclusión permite ocupar espacios disponibles en algunos grupos tras el periodo de matrícula. 
              Solo muestra los cursos con cupo disponible para solicitar una inclusión. Las solicitudes serán procesadas tras el cierre del formulario.
            </Typography>
          </section>

          <section aria-labelledby="info-importante">
            <Box sx={{ backgroundColor: '#E0E7FF', p: 2, borderRadius: 2, mb: 2 }}>
              <Typography id="info-importante" variant="h2" sx={{ mb: 1, fontWeight: 'bold', fontSize: '1.3rem' }}>Información importante</Typography>
              <ul>
                <li>La solicitud debe completarse en su totalidad; datos falsos o incompletos no serán tramitados.</li>
                <li>La existencia de cupo no garantiza la aprobación de la inclusión.</li>
                <li>No se aprobarán solicitudes que generen choques de horario o excedan el límite de créditos permitidos.</li>
                <li>Al enviar la solicitud, autoriza a la Escuela de Ingeniería en Computación a matricularlo en caso de asignación de cupo.</li>
              </ul>
            </Box>
          </section>

          <section>
            <Typography variant="h2" sx={{ mt: 4, mb: 1, fontWeight: 'bold', fontSize: '1.3rem' }}>Periodo de solicitud</Typography>
            <Typography sx={{ mb: 2 }}>
              27 de junio de 2024 al 28 de junio de 2024 (hasta las 2:00 p.m.)
            </Typography>

            <Typography variant="h2" sx={{ mt: 4, mb: 1, fontWeight: 'bold', fontSize: '1.3rem' }}>Publicación de resultados</Typography>
            <Typography sx={{ mb: 2 }}>
              17 de julio de 2024
            </Typography>

            <Typography variant="h2" sx={{ mt: 4, mb: 1, fontWeight: 'bold', fontSize: '1.3rem' }}>Consultas</Typography>
            <Typography>Dudas generales: <b>bdittel@itcr.ac.cr</b></Typography>
            <Typography>Situaciones particulares: <b>eshuman@itcr.ac.cr</b> (se atenderán tras el cierre del formulario).</Typography>
          </section>

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