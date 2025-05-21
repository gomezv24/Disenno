import React, { useEffect, useState } from 'react';
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
  const [datosUsuario, setDatosUsuario] = useState(null);

  useEffect(() => {
  const idUsuario = localStorage.getItem('idusuario');
  console.log("➡️ ID desde localStorage:", idUsuario);

  if (!idUsuario) return;

  const fetchUsuario = async () => {
    try {
      const response = await fetch(`http://localhost:5000/usuario/estudiante/${idUsuario}`);
      const data = await response.json();
      console.log('📦 Respuesta del backend:', data);

      if (data.error) {
        console.error('❌ Error recibido del backend:', data.error);
        return;
      }

      setDatosUsuario(data);
    } catch (error) {
      console.error('❌ Error al cargar datos del usuario:', error);
    }
  };

  fetchUsuario();
}, []);


  const menuItems = [
    { text: 'Inicio', icon: <HomeIcon />, path: '/' },
    { text: 'Inclusiones', icon: <SchoolIcon />, path: '/inclusiones' },
    { text: 'Levantamientos', icon: <TrendingUpIcon />, path: '/levantamientos' },
    { text: 'Retiros', icon: <ExitToAppIcon />, path: '/retiros' },
    { text: 'Seguimiento', icon: <AssignmentTurnedInIcon />, path: '/seguimiento' },
    { text: 'Usuario', icon: <PersonIcon />, path: '/usuario' }
  ];

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

          {datosUsuario ? (
            <Paper sx={{ p: 4, backgroundColor: '#f7faff' }}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#062043' }}>
                  Nombre:
                </Typography>
                <Typography variant="body1">{datosUsuario.nombre}</Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#062043' }}>
                  Correo institucional:
                </Typography>
                <Typography variant="body1">{datosUsuario.correoinstitucional}</Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#062043' }}>
                  Teléfono:
                </Typography>
                <Typography variant="body1">{datosUsuario.telefono}</Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#062043' }}>
                  Sede:
                </Typography>
                <Typography variant="body1">{datosUsuario.idsede}</Typography>
              </Box>

              {/* Datos de estudiante si existen */}
              {datosUsuario.estudiante && (
                <>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#062043' }}>
                      Carrera:
                    </Typography>
                    <Typography variant="body1">{datosUsuario.estudiante.carrera || 'No registrada'}</Typography>
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#062043' }}>
                      Plan de estudio:
                    </Typography>
                    <Typography variant="body1">{datosUsuario.estudiante.plan || 'No registrado'}</Typography>
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#062043' }}>
                      Beca:
                    </Typography>
                    <Typography variant="body1">{datosUsuario.estudiante.beca || 'Sin beca'}</Typography>
                  </Box>
                </>
              )}
            </Paper>
          ) : (
            <Typography>Cargando datos del usuario...</Typography>
          )}
        </Container>
      </main>
    </Box>
  );
};

export default InfoUsuario;
