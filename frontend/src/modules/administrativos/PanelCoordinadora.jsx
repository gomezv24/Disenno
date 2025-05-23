import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Grid,
  Card,
  CardContent,
  Button,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

import imagenRegistro from '../../assets/logoTec.png';
import iconPersona from '../../assets/dosUsers.png';
import iconSuma from '../../assets/Sumatoria.png';

import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import PersonIcon from '@mui/icons-material/Person';
import MenuBookIcon from '@mui/icons-material/MenuBook';


const PanelCoordinadora = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: 'Inicio', icon: <HomeIcon />, path: '/administrativo/panel-control' },
    { text: 'Inclusiones', icon: <SchoolIcon />, path: '/administrativo/listadoInclusiones' },
    { text: 'Levantamientos y RN ', icon: <TrendingUpIcon />, path: '/administrativo/levantamientorn' },
    { text: 'Reglamento de Levantamientos', icon: <MenuBookIcon />, path: '/administrativo/reglamento' },
    { text: 'Usuario', icon: <PersonIcon />, path: '/perfil' },
  ];

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar con navegación */}
      <Box
        component="nav"
        role="navigation"
        aria-label="Menú principal"
        sx={{
          width: '260px',
          backgroundColor: '#fff',
          borderRight: '1px solid #ddd',
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          gap: 2,
        }}
      >
        {/* Logo */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <img
            src={imagenRegistro}
            alt="Logo del Tecnológico de Costa Rica"
            style={{ height: 60 }}
          />
        </Box>

        {/* Menú accesible */}
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => navigate(item.path)}
              selected={location.pathname === item.path}
              sx={{
                color: '#001B3D',
                mb: 1,
                borderRadius: '8px',
                '&.Mui-selected': {
                  backgroundColor: '#f0f0f0',
                  fontWeight: 'bold',
                },
                '&:hover': {
                  backgroundColor: '#f9f9f9',
                },
              }}
              aria-label={`Ir a ${item.text}`}
            >
              <ListItemIcon sx={{ color: '#001B3D' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Contenido principal */}
      <Box
        component="main"
        role="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          minHeight: '100vh',
          px: 5,
          py: 8,
        }}
      >
        <Box sx={{ maxWidth: '1000px', width: '100%' }}>
          <Typography variant="h4" fontWeight="bold" sx={{ color: '#001B3D', mb: 4 }}>
            Panel de Coordinadora de la carrera
          </Typography>

          <Typography variant="body1" mb={4}>
            A continuación, se presentan las diferentes opciones para la coordinadora de la Escuela de Ingeniería en Computación
          </Typography>

          {/* Tarjetas estadísticas */}
          <Grid container spacing={6} mb={6}>
            <Grid item xs={12} sm={6}>
              <Card aria-label="Total de solicitudes de inclusión">
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="body2" mb={3}>Total de solicitudes de inclusión</Typography>
                      <Typography variant="h5" fontWeight="bold">350</Typography>
                    </Box>
                    <img
                      src={iconPersona}
                      alt="Icono de personas"
                      style={{ width: 60, height: 60 }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Card aria-label="Total de solicitudes con sumatoria">
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="body2" mb={3}>Total de solicitudes de inclusión</Typography>
                      <Typography variant="h5" fontWeight="bold">350</Typography>
                    </Box>
                    <img
                      src={iconSuma}
                      alt="Icono de sumatoria"
                      style={{ width: 60, height: 60 }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Gráficos simulados */}
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle1" fontWeight="bold" mb={2}>
                    Sede con mayor cantidad de solicitudes
                  </Typography>
                  <Box
                    role="img"
                    aria-label="Gráfico de solicitudes por sede"
                    sx={{ height: 180, backgroundColor: '#eaeaea', mb: 2 }}
                  />
                  <Button variant="contained" aria-label="Ver detalles de solicitudes por sede">
                    Detalles
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle1" fontWeight="bold" mb={2}>
                    Curso con mayor cantidad de solicitudes
                  </Typography>
                  <Box
                    role="img"
                    aria-label="Gráfico de solicitudes por curso"
                    sx={{ height: 180, backgroundColor: '#eaeaea', mb: 2 }}
                  />
                  <Button variant="contained" aria-label="Ver detalles de solicitudes por curso">
                    Detalles
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>

  );
};

export default PanelCoordinadora;
