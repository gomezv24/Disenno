//------------------------------------------------------------------------------
// HOME PAGE ESTUDIANTES
//
// Página principal del módulo estudiantes
// Contiene una barra lateral accesible con navegación a funcionalidades clave
// como Inclusiones, Levantamientos, Retiros, Seguimiento y Perfil de Usuario.
// El cuerpo principal muestra tarjetas informativas sobre cada trámite
//------------------------------------------------------------------------------

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
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
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import RuleFolderIcon from '@mui/icons-material/RuleFolder';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import PersonIcon from '@mui/icons-material/Person';

import imagenRegistro from '../../assets/logoTec.png';

const HomePageEstudiantes = () => {
  const location = useLocation();

  //--------------------------------------------------------------------------
  // Lista de elementos del menú lateral con ruta, texto e ícono asociado
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

        {/* ENCABEZADO DE LA PÁGINA */}
        <header>
          <Container sx={{ px: 5, pt: 6 }}></Container>
        </header>

        {/*--------------------------------*/}
        {/*       CUERPO DE LA PAGINA      */}
        {/*--------------------------------*/}
        <Container sx={{ px: 5, py: 2 }}>
          <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold', color: '#062043', mb: 3 }}>
            Gestión de Fondos
          </Typography>

          {/* Tarjetas de navegación rápida */}
          <Box sx={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'flex-start', mt: 4 }}>

            {/* Tarjeta de Inclusión */}
            <Card sx={{ width: 290, minHeight: 460, p: 3 }}>
              <CardContent>
                <LibraryAddIcon sx={{ fontSize: 50, color: '#062043', mb: 2 }} />
                <Typography variant="h6" fontWeight="bold">Inclusión a cursos</Typography>
                <Typography variant="body2" sx={{ mt: 2 }}>
                  La inclusión a cursos es un proceso mediante el cual los estudiantes pueden solicitar la incorporación a asignaturas no matriculadas.
                </Typography>
                <Typography variant="body2" fontWeight="bold" sx={{ mt: 4 }}>
                  Fecha: 15 de febrero del 2025
                </Typography>
                <Button component={Link} to="/inclusiones" fullWidth variant="contained" sx={{ mt: 3, backgroundColor: '#3b5998' , fontWeight: 'bold'}}>
                  Más información
                </Button>
              </CardContent>
            </Card>

            {/* Tarjeta de Levantamiento */}
            <Card sx={{ width: 290, minHeight: 460, p: 3 }}>
              <CardContent>
                <RuleFolderIcon sx={{ fontSize: 50, color: '#062043', mb: 2 }} />
                <Typography variant="h6" fontWeight="bold">Levantamiento y RN</Typography>
                <Typography variant="body2" sx={{ mt: 2 }}>
                  Permite solicitar el levantamiento de un requisito académico o condición especial RN                                                 
                </Typography>
                <Typography variant="body2" fontWeight="bold" sx={{ mt: 6.5 }}>
                  Fecha: 27 y 28 de junio del 2024
                </Typography>
                <Button component={Link} to="/levantamientos" fullWidth variant="contained" sx={{ mt: 3, backgroundColor: '#3b5998' , fontWeight: 'bold'}}>
                  Más información
                </Button>
              </CardContent>
            </Card>

            {/* Tarjeta de Retiro */}
            <Card sx={{ width: 290, minHeight: 460, p: 3 }}>
              <CardContent>
                <RemoveCircleOutlineIcon sx={{ fontSize: 50, color: '#062043', mb: 2 }} />
                <Typography variant="h6" fontWeight="bold">Retiro de cursos</Typography>
                <Typography variant="body2" sx={{ mt: 2 }}>
                  Proceso para solicitar la baja de una asignatura previamente matriculada.
                </Typography>
                <Typography variant="body2" fontWeight="bold" sx={{ mt: 9 }}>
                  Límite: Semana 6 del semestre
                </Typography>
                <Button component={Link} to="/retiros" fullWidth variant="contained" sx={{ mt: 3, backgroundColor: '#3b5998' ,fontWeight: 'bold'}}>
                  Más información
                </Button>
              </CardContent>
            </Card>

          </Box>
        </Container>
      </main>
    </Box>
  );
};

export default HomePageEstudiantes;
