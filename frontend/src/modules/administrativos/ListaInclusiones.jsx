import React, { useState, useEffect } from 'react';
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
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { actualizarEstado } from './Funciones/coordinadoraFun';
import { useNavigate, useLocation } from 'react-router-dom';
import { informacion } from './Funciones/historicoInclusiones';

const menuItems = [
  { text: 'Panel de Control', icon: <ManageAccountsIcon />, path: '/administrativo/panelControl' },
  { text: 'Inclusiones', icon: <SchoolIcon />, path: '/administrativo/listadoInclusiones' },
  { text: 'Levantamientos y RN ', icon: <TrendingUpIcon />, path: '/administrativo/levantamientorn' },
  { text: 'Reglamento de Levantamientos', icon: <MenuBookIcon />, path: '/administrativo/reglamento' },
];

const getEstadoChip = (estado) => {
  switch (estado) {
    case 'Aprobado':
      return <Chip 
        label="Aprobado" 
        sx={{ backgroundColor: '#d9f3e5', color: '#2e7d32', fontWeight: 'bold' }} 
        aria-label={`Estado: Aprobado`}
      />;
    case 'Rechazado':
      return <Chip 
        label="Rechazado" 
        sx={{ backgroundColor: '#fdecea', color: '#c62828', fontWeight: 'bold' }} 
        aria-label={`Estado: Rechazado`}
      />; 
    case 'Pendiente':
      return <Chip 
        label="Pendiente" 
        sx={{ backgroundColor: '#fff3e0', color: '#ef6c00', fontWeight: 'bold' }} 
        aria-label={`Estado: Pendiente`}
      />;
    default:
      return <Chip label={estado} aria-label={`Estado: ${estado}`} />;
  }
};

const ListadoInclusiones = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [detalleAbierto, setDetalleAbierto] = useState(false);
  const [seleccionado, setSeleccionado] = useState(null);

  const [inclusiones, setInclusiones] = useState([]);
  const [filtroActual, setFiltroActual] = useState('Todos');
  const [resumen, setResumen] = useState({ total: 0, pendientes: 0, revisados: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setLoading(true);
        const datos = await informacion('1');
        setInclusiones(datos);

        const total = datos.length;
        const pendientes = datos.filter(i => i.estado === 'Pendiente').length;
        const revisados = datos.filter(i => i.estado === 'Aprobado' || i.estado === 'Rechazada').length;

        setResumen({ total, pendientes, revisados });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    cargarDatos();
  }, []);

  const filtrados = inclusiones.filter((item) => {
    if (filtroActual === 'Todos') return true;
    if (filtroActual === 'Pendientes') return item.estado === 'Pendiente';
    if (filtroActual === 'Aprobados') return item.estado === 'Aprobado';
    if (filtroActual === 'Rechazados') return item.estado === 'Rechazado';
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

  const handleAccion = async (tipo, index) => {
    const idformulario = inclusiones[index].idformulario;
    const idestado = tipo === 'aprobar' ? 3 : 4;

    try {
      await actualizarEstado(idformulario, idestado);

      const actualizadas = [...inclusiones];
      actualizadas[index].estado = idestado === 3 ? 'Aprobado' : 'Rechazado';
      setInclusiones(actualizadas);

      setSnackbar({
        open: true,
        message: tipo === 'aprobar' ? 'Inclusión aprobada correctamente.' : 'Inclusión rechazada correctamente.',
        severity: tipo === 'aprobar' ? 'success' : 'error'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error al actualizar el estado en la base de datos.',
        severity: 'error'
      });
      console.error('Error al actualizar estado:', error);
    }
  };

  const summaryCards = [
    { 
      title: 'Todas las inclusiones', 
      subtitle: 'Todas las inclusiones realizadas', 
      count: resumen.total, 
      icon: <DescriptionIcon />,
      ariaLabel: 'Resumen de todas las inclusiones'
    },
    { 
      title: 'Pendientes', 
      subtitle: 'Inclusiones que requieren revisión', 
      count: resumen.pendientes, 
      icon: <AccessTimeIcon />,
      ariaLabel: 'Resumen de inclusiones pendientes'
    },
    { 
      title: 'Revisados', 
      subtitle: 'Inclusiones aprobadas o rechazadas', 
      count: resumen.revisados, 
      icon: <SettingsIcon />,
      ariaLabel: 'Resumen de inclusiones revisadas'
    }
  ];

  return (
    <Box sx={{ display: 'flex', height: '100vh' }} role="main">
      {/* Navegación lateral */}
      <Box 
        component="nav" 
        aria-label="Menú principal"
        sx={{ width: '260px', backgroundColor: '#fff', borderRight: '1px solid #ddd', p: 3 }}
      >
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <img 
            src={imagenRegistro} 
            alt="Logo del Tecnológico de Costa Rica" 
            style={{ height: 60 }}
            aria-hidden="false"
          />
        </Box>
        <List aria-label="Opciones del menú">
          {menuItems.map((item) => (
            <ListItem 
              button 
              key={item.text} 
              onClick={() => navigate(item.path)} 
              selected={location.pathname === item.path}
              sx={{ color: '#001B3D', mb: 1, borderRadius: '8px' }}
              aria-current={location.pathname === item.path ? 'page' : undefined}
            >
              <ListItemIcon sx={{ color: '#001B3D' }} aria-hidden="true">
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Contenido principal */}
      <Box 
        component="main" 
        sx={{ flexGrow: 1, p: 5 }}
        aria-labelledby="page-title"
      >
        <Typography variant="h4" fontWeight="bold" color="#062043" id="page-title">
          Inclusiones
        </Typography>
        <Typography sx={{ mt: 1, mb: 4 }} aria-live="polite">
          A continuación, se listan las inclusiones realizadas por los estudiantes y su estado.
        </Typography>

        {/* Resumen estadístico */}
        <Grid container spacing={6} mb={4} aria-label="Resumen estadístico de inclusiones">
          {summaryCards.map((card) => (
            <Grid item xs={12} sm={4} key={card.title}>
              <Card 
                sx={{ height: '100%' }}
                aria-label={card.ariaLabel}
              >
                <CardContent sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'flex-start', 
                  height: 150 
                }}>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">{card.title}</Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>{card.subtitle}</Typography>
                    <Typography variant="h5" fontWeight="bold" aria-live="polite">
                      {card.count}
                    </Typography>
                    <Typography variant="caption">I Semestre 2025</Typography>
                  </Box>
                  <Box 
                    sx={{ 
                      backgroundColor: '#002B5C', 
                      color: '#fff', 
                      width: 40, 
                      height: 40, 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      borderRadius: '50%', 
                      fontSize: 22, 
                      mt: 0, 
                      ml: 3 
                    }}
                    aria-hidden="true"
                  >
                    {card.icon}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Filtros */}
        <Tabs 
          value={filtroActual} 
          onChange={(e, val) => setFiltroActual(val)} 
          sx={{ 
            bgcolor: '#405F90', 
            color: '#fff', 
            mb: 3 
          }}
          aria-label="Filtros de inclusiones"
        >
          {['Todos', 'Pendientes', 'Aprobados', 'Rechazados'].map((f) => (
            <Tab 
              key={f} 
              value={f} 
              label={f} 
              sx={{ color: '#fff' }}
              id={`tab-${f}`}
              aria-controls={`tabpanel-${f}`}
            />
          ))}
        </Tabs>

        {/* Estado de carga y errores */}
        {loading ? (
          <Typography align="center" aria-live="polite" aria-busy="true">
            Cargando inclusiones...
          </Typography>
        ) : error ? (
          <Alert severity="error" aria-live="assertive">
            Error al cargar los datos: {error}
          </Alert>
        ) : (
          <TableContainer component={Paper} aria-label="Lista de inclusiones">
            <Table aria-label="Tabla de inclusiones de cursos">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }} scope="col">Sede</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }} scope="col">Carnet</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }} scope="col">Nombre del estudiante</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }} scope="col">Grupo</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }} scope="col">Curso</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }} scope="col">Profesor</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }} scope="col">Estado</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }} scope="col">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtrados.map((item, i) => (
                  <TableRow key={i} aria-rowindex={i+1}>
                    <TableCell>{item.sede || 'No especificado'}</TableCell>
                    <TableCell>{item.carnet || 'No especificado'}</TableCell>
                    <TableCell>{item.nombre || 'No especificado'}</TableCell>
                    <TableCell>{item.grupo || 'No especificado'}</TableCell>
                    <TableCell>{item.curso || 'No especificado'}</TableCell>
                    <TableCell>{item.profesor || 'No especificado'}</TableCell>
                    <TableCell>{getEstadoChip(item.estado)}</TableCell>
                    <TableCell>
                      <IconButton 
                        aria-label={`Aprobar inclusión de ${item.nombre || 'estudiante'}`}
                        onClick={() => handleAccion('aprobar', i)}
                      >
                        <CheckIcon />
                      </IconButton>
                      <IconButton 
                        aria-label={`Rechazar inclusión de ${item.nombre || 'estudiante'}`}
                        onClick={() => handleAccion('rechazar', i)}
                      >
                        <CloseIcon />
                      </IconButton>
                      <IconButton 
                        aria-label={`Ver detalles de la inclusión de ${item.nombre || 'estudiante'}`} 
                        color="primary" 
                        onClick={() => navigate('/administrativo/vista', { state: { sol: item } })}
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Notificación de estado */}
        <Snackbar 
          open={snackbar.open} 
          autoHideDuration={6000} 
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          aria-live="assertive"
        >
          <Alert 
            onClose={() => setSnackbar({ ...snackbar, open: false })} 
            severity={snackbar.severity}
            aria-atomic="true"
          >
            {snackbar.message}
          </Alert>
        </Snackbar>

        {/* Diálogo de detalles */}
        <Dialog 
          open={detalleAbierto} 
          onClose={manejarCerrarDetalles}
          aria-labelledby="detalle-dialog-title"
          aria-describedby="detalle-dialog-description"
        >
          <DialogTitle id="detalle-dialog-title">Detalle de la inclusión</DialogTitle>
          <DialogContent dividers id="detalle-dialog-description">
            {seleccionado && (
              <Box component="div" role="document">
                <Typography><strong>Sede:</strong> {seleccionado.sede || 'No especificado'}</Typography>
                <Typography><strong>Carnet:</strong> {seleccionado.carnet || 'No especificado'}</Typography>
                <Typography><strong>Nombre:</strong> {seleccionado.nombre || 'No especificado'}</Typography>
                <Typography><strong>Grupo:</strong> {seleccionado.grupo || 'No especificado'}</Typography>
                <Typography><strong>Curso:</strong> {seleccionado.curso || 'No especificado'}</Typography>
                <Typography><strong>Profesor:</strong> {seleccionado.profesor || 'No especificado'}</Typography>
                <Typography><strong>Estado:</strong> {seleccionado.estado || 'No especificado'}</Typography>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button 
              onClick={manejarCerrarDetalles}
              autoFocus
              aria-label="Cerrar diálogo de detalles"
            >
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default ListadoInclusiones;