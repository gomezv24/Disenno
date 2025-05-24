import React, { useState } from 'react';
import {
  Box, Typography, Grid, Card, CardContent, List, ListItem, ListItemIcon, ListItemText,
  InputBase, Paper, IconButton, MenuItem, Select, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Pagination, Chip, Tabs, Tab, Snackbar, Alert,
  Dialog, DialogTitle, DialogContent, DialogActions, Button
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PersonIcon from '@mui/icons-material/Person';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DescriptionIcon from '@mui/icons-material/Description';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SettingsIcon from '@mui/icons-material/Settings';
import imagenRegistro from '../../assets/logoTec.png';
import { useNavigate, useLocation } from 'react-router-dom';

const menuItems = [
  { text: 'Inicio', icon: <HomeIcon />, path: '/administrativo/panel-control' },
  { text: 'Inclusiones', icon: <SchoolIcon />, path: '/administrativo/listadoInclusiones' },
  { text: 'Levantamientos y RN ', icon: <TrendingUpIcon />, path: '/administrativo/levantamientorn' },
  { text: 'Reglamento de Levantamientos', icon: <MenuBookIcon />, path: '/administrativo/reglamento' },
  { text: 'Usuario', icon: <PersonIcon />, path: '/perfil' },
];

const summaryCards = [
  { title: 'Todas las inclusiones', subtitle: 'Todas las inclusiones realizadas', count: 100, icon: <DescriptionIcon /> },
  { title: 'Pendientes', subtitle: 'Inclusiones que requieren revisión', count: 40, icon: <AccessTimeIcon /> },
  { title: 'Revisados', subtitle: 'Inclusiones aprobadas o rechazadas', count: 80, icon: <SettingsIcon /> }
];

const getEstadoChip = (estado) => {
  switch (estado) {
    case 'Aprobado':
      return <Chip label="Aprobado" sx={{ backgroundColor: '#d9f3e5', color: '#2e7d32', fontWeight: 'bold' }} />;
    case 'Rechazada':
      return <Chip label="Rechazada" sx={{ backgroundColor: '#fdecea', color: '#c62828', fontWeight: 'bold' }} />;
    case 'Pendiente':
      return <Chip label="Pendiente" sx={{ backgroundColor: '#fff3e0', color: '#ef6c00', fontWeight: 'bold' }} />;
    default:
      return <Chip label={estado} />;
  }
};

const ListadoInclusiones = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [detalleAbierto, setDetalleAbierto] = useState(false);
  const [seleccionado, setSeleccionado] = useState(null);

  const [inclusiones, setInclusiones] = useState(
    [...Array(6)].map((_, i) => ({
      id: i,
      sede: 'San José',
      carnet: '2022438535',
      nombre: 'Méndez Abarca María',
      grupo: '01',
      curso: 'IC1803 - TALLER DE PROGRAMACIÓN',
      profesor: 'Mario Chacon',
      estado: i % 2 === 0 ? 'Aprobado' : 'Rechazada'
    }))
  );

  const [filtroActual, setFiltroActual] = useState('Todos');
  const filtrados = inclusiones.filter((item) => {
    if (filtroActual === 'Todos') return true;
    if (filtroActual === 'Pendientes') return item.estado === 'Pendiente';
    if (filtroActual === 'Aprobados') return item.estado === 'Aprobado';
    if (filtroActual === 'Rechazados') return item.estado === 'Rechazada';
    return true;
  });

  const manejarVerDetalles = (item) => {
    setSeleccionado(item);
    setDetalleAbierto(true);
  };
  const manejarCerrarDetalles = () => {
    setDetalleAbierto(false);
    setSeleccionado(null);
  };

  const handleAccion = (tipo, index) => {
    const actualizadas = [...inclusiones];
    actualizadas[index].estado = tipo === 'aprobar' ? 'Aprobado' : 'Rechazada';
    setInclusiones(actualizadas);
    setSnackbar({
      open: true,
      message: tipo === 'aprobar' ? 'Inclusión aprobada correctamente.' : 'Inclusión rechazada correctamente.',
      severity: tipo === 'aprobar' ? 'success' : 'error'
    });
  };


  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Box component="nav" sx={{ width: '260px', backgroundColor: '#fff', borderRight: '1px solid #ddd', p: 3 }}>
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <img src={imagenRegistro} alt="Logo del TEC" style={{ height: 60 }} />
        </Box>
        <List>
          {menuItems.map((item) => (
            <ListItem button key={item.text} onClick={() => navigate(item.path)} selected={location.pathname === item.path}>
              <ListItemIcon sx={{ color: '#001B3D' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Box>

      <Box sx={{ flexGrow: 1, p: 5 }}>
        <Typography variant="h4" fontWeight="bold" color="#062043">Inclusiones</Typography>
        <Typography sx={{ mt: 1, mb: 4 }}>A continuación, se listan las inclusiones realizadas por los estudiantes y su estado.</Typography>

        <Grid container spacing={6} mb={4}>
          {summaryCards.map((card) => (
            <Grid item xs={12} sm={4} key={card.title}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', height: 150 }}>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">{card.title}</Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>{card.subtitle}</Typography>
                    <Typography variant="h5" fontWeight="bold">{card.count}</Typography>
                    <Typography variant="caption">I Semestre 2025</Typography>
                  </Box>
                  <Box sx={{ backgroundColor: '#002B5C', color: '#fff', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', color: '#fff',
                      fontSize: 22,
                      mt: 0,
                      ml: 3 }}>
                    {card.icon}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Tabs value={filtroActual} onChange={(e, val) => setFiltroActual(val)} sx={{ bgcolor: '#405F90', color: '#fff', mb: 3 }}>
          {['Todos', 'Pendientes', 'Aprobados', 'Rechazados'].map((f) => (
            <Tab key={f} value={f} label={f} sx={{ color: '#fff' }} />
          ))}
        </Tabs>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 2, mb: 3 }}>
          <Paper sx={{ display: 'flex', alignItems: 'center', width: 250, height: 40, pl: 1 }}>
            <SearchIcon />
            <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Buscar..." />
          </Paper>
          <Select size="small" defaultValue="recientes" sx={{ height: 40 }}>
            <MenuItem value="recientes">Más recientes</MenuItem>
            <MenuItem value="antiguos">Más antiguos</MenuItem>
          </Select>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Sede</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Carnet</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Nombre del estudiante</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Grupo</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Curso</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Profesor</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Estado</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtrados.map((item, i) => (
                <TableRow key={i}>
                  <TableCell>{item.sede}</TableCell>
                  <TableCell>{item.carnet}</TableCell>
                  <TableCell>{item.nombre}</TableCell>
                  <TableCell>{item.grupo}</TableCell>
                  <TableCell>{item.curso}</TableCell>
                  <TableCell>{item.profesor}</TableCell>
                  <TableCell>{getEstadoChip(item.estado)}</TableCell>
                  <TableCell>
                    <IconButton aria-label="Aprobar" onClick={() => handleAccion('aprobar', i)}>
                      <CheckIcon />
                    </IconButton>
                    <IconButton aria-label="Rechazar" onClick={() => handleAccion('rechazar', i)}>
                      <CloseIcon />
                    </IconButton>
                    <IconButton aria-label="Ver detalles" onClick={() => manejarVerDetalles(item)}>
                      <VisibilityIcon />
                    </IconButton>
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={detalleAbierto} onClose={manejarCerrarDetalles}>
          <DialogTitle>Detalles de inclusión</DialogTitle>
          <DialogContent>
            {seleccionado && (
              <Box>
                <Typography><strong>Nombre:</strong> {seleccionado.nombre}</Typography>
                <Typography><strong>Carnet:</strong> {seleccionado.carnet}</Typography>
                <Typography><strong>Curso:</strong> {seleccionado.curso}</Typography>
                <Typography><strong>Profesor:</strong> {seleccionado.profesor}</Typography>
                <Typography><strong>Estado:</strong> {seleccionado.estado}</Typography>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={manejarCerrarDetalles}>Cerrar</Button>
          </DialogActions>
        </Dialog>

        <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>{snackbar.message}</Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default ListadoInclusiones;