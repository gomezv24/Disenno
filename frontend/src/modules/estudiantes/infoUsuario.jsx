import React, { useContext } from 'react';
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
import { UserContext } from '../../context/UserContext';

const InfoUsuario = () => {
  const location = useLocation();
  const { usuario } = useContext(UserContext);

  // Diccionario de sedes
  const sedes = {
    1: 'Cartago',
    2: 'San José',
    3: 'Alajuela',
    4: 'Limón',
    5: 'San Carlos',
    6: 'San Francisco de Dos Ríos',
    7: 'Santa Clara',
  };

  // Diccionario de roles
  const roles = {
    1: 'Administrador',
    2: 'Coordinadora',
    3: 'Estudiante',
    4: 'Funcionario Administrativo',
  };

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
          <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold', color: '#062043', mb: 2 }}>
            Información Personal
          </Typography>
          <Typography variant="caption" sx={{ color: '#757575', mb: 3, display: 'block', textAlign: 'left', pl: 0.5 }}>
            Nota: Si alguno de estos datos es incorrecto, por favor contacte con el Departamento de Admisión y Registro (DAR).
          </Typography>

          {usuario ? (
            <Paper sx={{ p: 4, background: 'linear-gradient(135deg, #f7faff 60%, #e3f0ff 100%)', borderRadius: 4, boxShadow: 3, maxWidth: 700, ml: 0, mt: 4 }} role="region" aria-label="Datos personales del usuario">
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <Box sx={{ mr: 4 }}>
                  <Box sx={{ width: 110, height: 110, borderRadius: '50%', background: '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 1 }}>
                    <PersonIcon sx={{ fontSize: 70, color: '#bdbdbd' }} />
                  </Box>
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#062043', mb: 0.5 }}>Nombre Completo</Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>{usuario.nombre}</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#062043', mb: 0.5 }}>Correo institucional</Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>{usuario.correoinstitucional}</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#062043', mb: 0.5 }}>Teléfono</Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>{usuario.telefono}</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#062043', mb: 0.5 }}>Sede</Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>{sedes[usuario.idsede] || 'Sede desconocida'}</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#062043', mb: 0.5 }}>Rol</Typography>
                  <Typography variant="body1">{roles[usuario.idtipousuario] || 'Rol desconocido'}</Typography>
                </Box>
              </Box>
            </Paper>
          ) : (
            <Typography color="error">No se ha iniciado sesión o no hay datos disponibles.</Typography>
          )}
        </Container>
      </main>
    </Box>
  );
};

export default InfoUsuario;
