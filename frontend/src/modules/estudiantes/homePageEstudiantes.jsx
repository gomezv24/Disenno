//------------------------------------------------------------------------------
// HOME PAGE ESTUDIANTES
//
// Página principal del módulo estudiantes
// Contiene una barra lateral accesible con navegación a funcionalidades clave
// como Inclusiones, Levantamientos, Retiros, Seguimiento y Perfil de Usuario.
// El cuerpo principal muestra tarjetas informativas sobre cada trámite
//------------------------------------------------------------------------------

import React, { useEffect, useState } from 'react';
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

  const [inclusion, setInclusion] = useState(null);
  const [levantamiento, setLevantamiento] = useState(null);
  const [retiro, setRetiro] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all([
          fetch('http://localhost:5000/procesos/Inclusión de curso'),
          fetch('http://localhost:5000/procesos/Levantamiento de requisitos'),
          fetch('http://localhost:5000/procesos/Retiro')
        ]);

        const [dataInclusion, dataLevantamiento, dataRetiro] = await Promise.all(
          responses.map(r => r.json())
        );

        // Función para formatear fechas como: 3 de marzo de 2025
        const formatDate = (fecha) => {
          if (!fecha) return '';
          return new Date(fecha).toLocaleDateString('es-CR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          });
        };

        // Tomar solo el primer elemento de cada respuesta
        const inclusionData = dataInclusion[0];
        const levantamientoData = dataLevantamiento[0];
        const retiroData = dataRetiro[0];

        // Agregar campos formateados
        if (inclusionData) {
          inclusionData.fechaFormateada = `${formatDate(inclusionData.fechaInicio)} al ${formatDate(inclusionData.fechaFin)}`;
        }
        if (levantamientoData) {
          levantamientoData.fechaFormateada = `${formatDate(levantamientoData.fechaInicio)} al ${formatDate(levantamientoData.fechaFin)}`;
        }
        if (retiroData) {
          retiroData.fechaFormateada = `${formatDate(retiroData.fechaInicio)} al ${formatDate(retiroData.fechaFin)}`;
        }

        setInclusion(inclusionData);
        setLevantamiento(levantamientoData);
        setRetiro(retiroData);
      } catch (error) {
        console.error('❌ Error al cargar procesos:', error);
      }
    };

    fetchData();
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

      <main style={{ flex: 1 }}>
        <header>
          <Container sx={{ px: 5, pt: 6 }} />
        </header>

        <Container sx={{ px: 5, py: 2 }}>
          <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold', color: '#062043', mb: 3 }}>
            Gestión de Fondos
          </Typography>

          <Box sx={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'flex-start', mt: 4 }}>
            {/* Inclusión */}
            <Card sx={{ width: 290, minHeight: 460, p: 3 }}>
              <CardContent>
                <LibraryAddIcon sx={{ fontSize: 50, color: '#062043', mb: 2 }} />
                <Typography variant="h6" fontWeight="bold">Inclusión a cursos</Typography>
                <Typography variant="body2" sx={{ mt: 2 }}>
                  {inclusion?.informacion || 'Cargando...'}
                </Typography>
                <Typography variant="body2" fontWeight="bold" sx={{ mt: 4 }}>
                  {inclusion ? `Fecha: ${inclusion.fechaInicio} al ${inclusion.fechaFin}` : ''}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {inclusion?.Consultas}
                </Typography>
                <Button component={Link} to="/inclusiones" fullWidth variant="contained" sx={{ mt: 3, backgroundColor: '#3b5998', fontWeight: 'bold' }}>
                  Más información
                </Button>
              </CardContent>
            </Card>

            {/* Levantamiento */}
            <Card sx={{ width: 290, minHeight: 460, p: 3 }}>
              <CardContent>
                <RuleFolderIcon sx={{ fontSize: 50, color: '#062043', mb: 2 }} />
                <Typography variant="h6" fontWeight="bold">Levantamiento y RN</Typography>
                <Typography variant="body2" sx={{ mt: 2 }}>
                  {levantamiento?.informacion || 'Cargando...'}
                </Typography>
                <Typography variant="body2" fontWeight="bold" sx={{ mt: 4 }}>
                  {levantamiento ? `Fecha: ${levantamiento.fechaInicio} al ${levantamiento.fechaFin}` : ''}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {levantamiento?.Consultas}
                </Typography>
                <Button component={Link} to="/levantamientos" fullWidth variant="contained" sx={{ mt: 3, backgroundColor: '#3b5998', fontWeight: 'bold' }}>
                  Más información
                </Button>
              </CardContent>
            </Card>

            {/* Retiro */}
            <Card sx={{ width: 290, minHeight: 460, p: 3 }}>
              <CardContent>
                <RemoveCircleOutlineIcon sx={{ fontSize: 50, color: '#062043', mb: 2 }} />
                <Typography variant="h6" fontWeight="bold">Retiro de cursos</Typography>
                <Typography variant="body2" sx={{ mt: 2 }}>
                  {retiro?.informacion || 'Cargando...'}
                </Typography>
                <Typography variant="body2" fontWeight="bold" sx={{ mt: 4 }}>
                  {retiro ? `Fecha: ${retiro.fechaInicio} al ${retiro.fechaFin}` : ''}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {retiro?.Consultas}
                </Typography>
                <Button component={Link} to="/retiros" fullWidth variant="contained" sx={{ mt: 3, backgroundColor: '#3b5998', fontWeight: 'bold' }}>
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

