//------------------------------------------------------------------------------
// SEGUIMIENTO
//
// Página principal del formulario de inclusiones
// Contiene una barra lateral accesible con navegación a funcionalidades clave
// como Inclusiones, Levantamientos, Retiros, Seguimiento y Perfil de Usuario.
// contiene todo lo relacionado con el seguimiento de una solicitud de estudiantes
//------------------------------------------------------------------------------


import React from 'react';
import { Container, Typography, Box, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Delete, Visibility, Home, School, TrendingUp, ExitToApp, AssignmentTurnedIn } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import imagenRegistro from '../../assets/logoTec.png';
import imagenUsuario from '../../assets/imagenUsuario.png';

const PageSeguimiento = () => {
  const location = useLocation();

  const solicitudes = [
    { tipo: 'Inclusión', semestre: 'IS-2025', curso: 'IC1803 TALLER DE PROGRAMACION (grupos 1, 2)', estado: 'Pendiente' },
    { tipo: 'Inclusión', semestre: 'IS-2025', curso: 'IC1803 TALLER DE PROGRAMACION (grupos 1, 2)', estado: 'Aprobada' },
    { tipo: 'Inclusión', semestre: 'IS-2025', curso: 'IC1803 TALLER DE PROGRAMACION (grupos 1, 2)', estado: 'Rechazada' },
    { tipo: 'Inclusión', semestre: 'IS-2025', curso: 'IC1803 TALLER DE PROGRAMACION (grupos 1, 2)', estado: 'Aprobada' },
    { tipo: 'Inclusión', semestre: 'IS-2025', curso: 'IC1803 TALLER DE PROGRAMACION (grupos 1, 2)', estado: 'Pendiente' },
    { tipo: 'Inclusión', semestre: 'IS-2025', curso: 'IC1803 TALLER DE PROGRAMACION (grupos 1, 2)', estado: 'Aprobada' },
    { tipo: 'Inclusión', semestre: 'IS-2025', curso: 'IC1803 TALLER DE PROGRAMACION (grupos 1, 2)', estado: 'Pendiente' }
  ];

  const colorEstado = (estado) => {
    if (estado === 'Pendiente') return { backgroundColor: '#FFE0B2', color: '#FB8C00', fontWeight: 'bold', borderRadius: '8px', px: 1, py: 0.5 };
    if (estado === 'Aprobada') return { backgroundColor: '#C8E6C9', color: '#388E3C', fontWeight: 'bold', borderRadius: '8px', px: 1, py: 0.5 };
    if (estado === 'Rechazada') return { backgroundColor: '#FFCDD2', color: '#D32F2F', fontWeight: 'bold', borderRadius: '8px', px: 1, py: 0.5 };
  };

  const menuItems = [
    { text: 'Inicio', icon: <Home />, path: '/' },
    { text: 'Inclusiones', icon: <School />, path: '/inclusiones' },
    { text: 'Levantamientos', icon: <TrendingUp />, path: '/levantamientos' },
    { text: 'Retiros', icon: <ExitToApp />, path: '/retiros' },
    { text: 'Seguimiento', icon: <AssignmentTurnedIn />, path: '/seguimiento' }
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>

      {/* BARRA LATERAL */}
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
              sx={{ color: '#062043', '&.Mui-selected': { backgroundColor: '#f0f0f0', fontWeight: 'bold' }, '&:hover': { backgroundColor: '#f9f9f9' } }}
            >
              <ListItemIcon sx={{ color: '#062043' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </nav>

      {/* CONTENIDO PRINCIPAL */}
      <main style={{ flex: 1 }}>
        <Container disableGutters sx={{ maxWidth: '1400px', mx: 'auto', px: 2, py: 6 }}>

          {/* ENCABEZADO */}
          <Box sx={{ mb: 5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#062043' }}>
                Seguimiento de Formularios Académicos
              </Typography>
              <img src={imagenUsuario} alt="Usuario" style={{ height: '60px', borderRadius: '50%' }} />
            </Box>
          </Box>

          {/* BUSCADOR */}
          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2, mb: 5 }}>
            <TextField
              variant="outlined"
              placeholder="Buscar formularios..."
              size="medium"
              aria-label="Buscar formularios"
              sx={{ flexGrow: 1, minWidth: '700px', maxWidth: '1000px', height: '56px' }}
            />
            <Button
              variant="contained"
              sx={{ width: '200px', height: '56px', backgroundColor: '#3b5998', textTransform: 'none', fontWeight: 'bold' }}
              aria-label="Buscar"
            >
              Buscar
            </Button>
          </Box>

          {/* TABLA */}
          <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
            <Table aria-label="Tabla de solicitudes académicas">
              <TableHead sx={{ backgroundColor: '#E3EAFD' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Tipo de solicitud</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Semestre</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Curso</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Estado</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {solicitudes.map((sol, index) => (
                  <TableRow key={index}>
                    <TableCell>{sol.tipo}</TableCell>
                    <TableCell>{sol.semestre}</TableCell>
                    <TableCell>{sol.curso}</TableCell>
                    <TableCell>
                      <Box sx={colorEstado(sol.estado)}>
                        {sol.estado}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <IconButton aria-label="Eliminar solicitud" color="error">
                        <Delete />
                      </IconButton>
                      <IconButton aria-label="Ver detalles de la solicitud" color="primary">
                        <Visibility />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </main>
    </Box>
  );
};

export default PageSeguimiento;






