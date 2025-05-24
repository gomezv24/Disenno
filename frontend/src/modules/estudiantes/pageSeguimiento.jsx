import React, { useContext, useEffect, useState } from 'react';
import {
  Container, Typography, Box, TextField, Button,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, List, ListItem, ListItemIcon, ListItemText
} from '@mui/material';
import { Delete, Visibility, Home, School, TrendingUp, ExitToApp, AssignmentTurnedIn } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import imagenRegistro from '../../assets/logoTec.png';
import imagenUsuario from '../../assets/imagenUsuario.png';
import { UserContext } from '../../context/UserContext';

const PageSeguimiento = () => {
  const location = useLocation();
  const { usuario } = useContext(UserContext);
  const [solicitudes, setSolicitudes] = useState([]);
  const [detalleOpen, setDetalleOpen] = useState(false);
  const [detalleSolicitud, setDetalleSolicitud] = useState(null);

  useEffect(() => {
    const obtenerSeguimiento = async () => {
      if (!usuario?.idusuario) return;
      try {
        const res = await fetch(`http://localhost:5000/seguimientoUsuario/${usuario.idusuario}`);
        const data = await res.json();
        setSolicitudes(data);
      } catch (error) {
        console.error('Error al cargar seguimiento:', error);
      }
    };
    obtenerSeguimiento();
  }, [usuario]);

  const colorEstado = (estado) => {
    if (estado === 'Pendiente') return { backgroundColor: '#FFE0B2', color: '#FB8C00', fontWeight: 'bold', borderRadius: '8px', px: 1, py: 0.5 };
    if (estado === 'Aprobado') return { backgroundColor: '#C8E6C9', color: '#388E3C', fontWeight: 'bold', borderRadius: '8px', px: 1, py: 0.5 };
    if (estado === 'Rechazado') return { backgroundColor: '#FFCDD2', color: '#D32F2F', fontWeight: 'bold', borderRadius: '8px', px: 1, py: 0.5 };
    return { backgroundColor: '#e0e0e0', color: '#424242', fontWeight: 'bold', borderRadius: '8px', px: 1, py: 0.5 };
  };

  const menuItems = [
    { text: 'Inicio', icon: <Home />, path: '/' },
    { text: 'Inclusiones', icon: <School />, path: '/inclusiones' },
    { text: 'Levantamientos', icon: <TrendingUp />, path: '/levantamientos' },
    { text: 'Retiros', icon: <ExitToApp />, path: '/retiros' },
    { text: 'Seguimiento', icon: <AssignmentTurnedIn />, path: '/seguimiento' }
  ];

  const handleVerDetalle = (solicitud) => {
    setDetalleSolicitud(solicitud);
    setDetalleOpen(true);
  };
  const handleCerrarDetalle = () => {
    setDetalleOpen(false);
    setDetalleSolicitud(null);
  };

  // Eliminar solicitud
  const handleEliminar = async (solicitud) => {
    if (!window.confirm('¿Seguro que deseas eliminar esta solicitud?')) return;
    try {
      const res = await fetch(`http://localhost:5000/seguimientoUsuario/${solicitud.idformulario}`, { method: 'DELETE' });
      if (res.ok) {
        // Refresca la lista desde el backend para asegurar que está actualizada
        const res2 = await fetch(`http://localhost:5000/seguimientoUsuario/${usuario.idusuario}`);
        const data2 = await res2.json();
        setSolicitudes(data2);
        alert('Solicitud eliminada correctamente');
      } else {
        alert('Error al eliminar la solicitud');
      }
    } catch (error) {
      alert('Error al eliminar la solicitud');
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* BARRA LATERAL */}
      <nav style={{ width: '250px', backgroundColor: '#ffffff', color: '#062043', padding: '32px 0', borderRight: '1px solid #ddd', height: '100vh' }}>
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
          <Box sx={{ mb: 5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#062043' }}>
                Seguimiento de Formularios Académicos
              </Typography>
              <img src={imagenUsuario} alt="Usuario" style={{ height: '60px', borderRadius: '50%' }} />
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2, mb: 5 }}>
            <TextField
              variant="outlined"
              placeholder="Buscar formularios..."
              size="medium"
              sx={{ flexGrow: 1, minWidth: '700px', maxWidth: '1000px', height: '56px' }}
            />
            <Button variant="contained" sx={{ width: '200px', height: '56px', backgroundColor: '#3b5998', textTransform: 'none', fontWeight: 'bold' }}>
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
                      <IconButton aria-label="Eliminar solicitud" color="error" onClick={() => handleEliminar(sol)}>
                        <Delete />
                      </IconButton>
                      <IconButton aria-label="Ver detalles de la solicitud" color="primary" onClick={() => handleVerDetalle(sol)}>
                        <Visibility />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Dialogo de detalles */}
          <Dialog open={detalleOpen} onClose={handleCerrarDetalle} maxWidth="sm" fullWidth>
            <DialogTitle>Detalle de la Solicitud</DialogTitle>
            <DialogContent>
              {detalleSolicitud && (
                <Box>
                  <Typography variant="subtitle1"><b>Tipo:</b> {detalleSolicitud.tipo}</Typography>
                  <Typography variant="subtitle1"><b>Semestre:</b> {detalleSolicitud.semestre}</Typography>
                  <Typography variant="subtitle1"><b>Curso:</b> {detalleSolicitud.curso}</Typography>
                  <Typography variant="subtitle1"><b>Estado:</b> {detalleSolicitud.estado}</Typography>
                  {detalleSolicitud.fecha && (
                    <Typography variant="subtitle1"><b>Fecha:</b> {new Date(detalleSolicitud.fecha).toLocaleDateString()}</Typography>
                  )}
                  {/* Puedes agregar más campos aquí si el backend los retorna */}
                </Box>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCerrarDetalle} color="primary">Cerrar</Button>
            </DialogActions>
          </Dialog>
        </Container>
      </main>
    </Box>
  );
};

export default PageSeguimiento;
