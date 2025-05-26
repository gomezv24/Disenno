import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  InputBase,
  Paper,
  IconButton,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Pagination,
  Chip,
  Menu,
  Snackbar,
  Alert,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DescriptionIcon from '@mui/icons-material/Description';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import imagenRegistro from '../../assets/logoTec.png';
import { useNavigate, useLocation } from 'react-router-dom';
import { obtenerLevantamientos } from './Funciones/coordinadoraFun';
import { actualizarEstado } from './Funciones/coordinadoraFun';


const menuItems = [
  { text: 'Inicio', icon: <HomeIcon />, path: '/administrativo' },
  { text: 'Inclusiones', icon: <SchoolIcon />, path: '/administrativo/listadoInclusiones' },
  { text: 'Levantamientos y RN ', icon: <TrendingUpIcon />, path: '/administrativo/levantamientorn' },
  { text: 'Reglamento de Levantamientos', icon: <MenuBookIcon />, path: '/administrativo/reglamento' },
  { text: 'Panel de Control', icon: <ManageAccountsIcon />, path: '/administrativo/panelControl' },
  { text: 'Usuario', icon: <PersonIcon />, path: '/infoUsuario' },
];

const LevantamientosRN = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [levantamientos, setLevantamientos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [filtroActual, setFiltroActual] = useState('Todos');
  const [detalleAbierto, setDetalleAbierto] = useState(false);
  const [seleccionado, setSeleccionado] = useState(null);
  const [resumen, setResumen] = useState({ total: 0, pendientes: 0, automaticos: 0 });

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const data = await obtenerLevantamientos('1');
        setLevantamientos(data);
        const total = data.length;
        const pendientes = data.filter(item => item.estado === 'Pendiente').length;
        const automaticos = data.filter(item => item.tipo === 'Automática').length;

        setResumen({ total, pendientes, automaticos });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    cargarDatos();
  }, []);

  
  const getEstadoChip = (estado) => {
    switch (estado) {
      case 'Aprobado':
        return <Chip label="Aprobado" sx={{ backgroundColor: '#d9f3e5', color: '#2e7d32', fontWeight: 'bold' }} />;
      case 'Rechazado':
        return <Chip label="Rechazado" sx={{ backgroundColor: '#fdecea', color: '#c62828', fontWeight: 'bold' }} />;
      case 'Pendiente':
        return <Chip label="Pendiente" sx={{ backgroundColor: '#fff3e0', color: '#ef6c00', fontWeight: 'bold' }} />;
      default:
        return <Chip label={estado} />;
    }
  };

  const getTipoChip = (tipo) => {
    switch (tipo) {
      case 'Automática':
        return <Chip label="Automática" sx={{ backgroundColor: '#e3f2fd', color: '#1976d2', fontWeight: 'bold' }} />;
      case 'Manual':
        return <Chip label="Manual" sx={{ backgroundColor: '#f3e5f5', color: '#8e24aa', fontWeight: 'bold' }} />;
      default:
        return <Chip label={tipo} />;
    }
  };

  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  //Estados de los formularios
  const handleAccion = async (tipo, index) => {
    const idformulario = levantamientos[index].idformulario; // Asegúrate de que venga del backend

    const idestado = tipo === 'aprobar' ? 3 : 4;
    console.log("idformulario:", idformulario, "idestado:", idestado);


    try {
      await actualizarEstado(idformulario, idestado);

      // Actualiza en frontend solo para reflejar visualmente
      const updated = [...levantamientos];
      updated[index].estado = idestado === 3 ? 'Aprobado' : 'Rechazado';
      setLevantamientos(updated);

      setSnackbar({
        open: true,
        message: tipo === 'aprobar' ? 'Solicitud aprobada' : 'Solicitud rechazada',
        severity: 'success',
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: `Error al actualizar estado: ${error.message}`,
        severity: 'error',
      });
    }
  };


  const filtrados = levantamientos.filter((item) => {
    if (filtroActual === 'Todos') return true;

    const estadoMap = {
      Pendientes: 'Pendiente',
      Aprobados: 'Aprobado',
      Rechazados: 'Rechazado',
    };

    const tipoMap = {
      Manuales: 'Manual',
      Automáticos: 'Automática',
    };

    if (estadoMap[filtroActual]) return item.estado === estadoMap[filtroActual];
    if (tipoMap[filtroActual]) return item.tipo === tipoMap[filtroActual];
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

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Navegación lateral */}
      <Box component="nav" sx={{ width: '260px', backgroundColor: '#fff', borderRight: '1px solid #ddd', p: 3 }}>
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <img src={imagenRegistro} alt="Logo del TEC" style={{ height: 60 }} />
        </Box>
        <List>
          {menuItems.map((item) => (
            <ListItem button key={item.text} onClick={() => navigate(item.path)} selected={location.pathname === item.path} sx={{ color: '#001B3D', mb: 1, borderRadius: '8px' }}>
              <ListItemIcon sx={{ color: '#001B3D' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Contenido principal */}
      <Box component="main" sx={{ flexGrow: 1, p: 5 }}>
        <Typography variant="h4" fontWeight="bold" color="#062043">
          Levantamiento de requisitos y condición RN
        </Typography>
        <Typography variant="body1" sx={{ mt: 1, mb: 4 }}>
          A continuación, se listan los levantamientos registrados, su estado y tipo
        </Typography>

        <Grid container spacing={6} mb={4}>
      <Grid item xs={12} sm={6}>
        <Card sx={{ height: '100%' }}>
          <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', height: 150 }}>
            <Box>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Total de levantamientos
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Todos los levantamientos registrados
              </Typography>
              <Typography variant="h5" fontWeight="bold">
                {resumen.total}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                I Semestre 2025
              </Typography>
            </Box>
            <Box sx={{ width: 40, height: 40, backgroundColor: '#002B5C', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 22 }}>
              <DescriptionIcon />
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Card sx={{ height: '100%' }}>
          <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', height: 150 }}>
            <Box>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Pendientes
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Levantamientos que requieren revisión
              </Typography>
              <Typography variant="h5" fontWeight="bold">
                {resumen.pendientes}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                I Semestre 2025
              </Typography>
            </Box>
            <Box sx={{ width: 40, height: 40, backgroundColor: '#002B5C', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 22 }}>
              <AccessTimeIcon />
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Card sx={{ height: '100%' }}>
          <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', height: 150 }}>
            <Box>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Automáticos
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Levantamientos aprobados automáticamente
              </Typography>
              <Typography variant="h5" fontWeight="bold">
                {resumen.automaticos}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                I Semestre 2025
              </Typography>
            </Box>
            <Box sx={{ width: 40, height: 40, backgroundColor: '#002B5C', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 22 }}>
              <SettingsIcon />
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>

        <Tabs value={filtroActual} onChange={(e, v) => setFiltroActual(v)} variant="scrollable" scrollButtons="auto" sx={{ mb: 2, bgcolor: '#405F90', color: '#fff' }}>
          {['Todos', 'Pendientes', 'Aprobados', 'Rechazados', 'Manuales', 'Automáticos'].map((filtro) => (
            <Tab key={filtro} label={filtro} value={filtro} sx={{ fontSize: '0.85rem', fontWeight: 500 }} />
          ))}
        </Tabs>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Paper component="form" sx={{ display: 'flex', alignItems: 'center', width: 250, height: 40, pl: 1 }}>
            <SearchIcon />
            <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Buscar..." inputProps={{ 'aria-label': 'Buscar' }} />
          </Paper>
          <Select size="small" defaultValue="recientes" sx={{ height: 40, ml: 2 }}>
            <MenuItem value="recientes">Más recientes</MenuItem>
            <MenuItem value="antiguos">Más antiguos</MenuItem>
          </Select>
        </Box>

        {loading && <Typography align="center" sx={{ mt: 4 }}>Cargando levantamientos...</Typography>}
        {error && <Alert severity="error">Error al cargar los datos: {error}</Alert>}

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Sede</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Carnet</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Curso</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Requisito</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Estado</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Tipo</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtrados.map((item, i) => (
                <TableRow key={i}>
                  <TableCell>{item.sede}</TableCell>
                  <TableCell>{item.carnet}</TableCell>
                  <TableCell>{item.nombre}</TableCell>
                  <TableCell>{item.curso}</TableCell>
                  <TableCell>{item.requisito}</TableCell>
                  <TableCell>{getEstadoChip(item.estado)}</TableCell>
                  <TableCell>{getTipoChip(item.tipo)}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleAccion('aprobar', i)}><CheckIcon /></IconButton>
                    <IconButton onClick={() => handleAccion('rechazar', i)}><CloseIcon /></IconButton>
                    <IconButton onClick={() => manejarVerDetalles(item)}><VisibilityIcon /></IconButton>
                    <IconButton onClick={handleMenuClick}><MoreVertIcon /></IconButton>
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                      <MenuItem onClick={handleMenuClose}>Descargar PDF</MenuItem>
                      <MenuItem onClick={handleMenuClose}>Comentarios</MenuItem>
                      <MenuItem onClick={handleMenuClose}>Gestión</MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Pagination count={3} page={1} color="primary" sx={{ mt: 3, display: 'flex', justifyContent: 'center' }} />

        <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>{snackbar.message}</Alert>
        </Snackbar>

        <Dialog open={detalleAbierto} onClose={manejarCerrarDetalles}>
          <DialogTitle>Detalle del levantamiento</DialogTitle>
          <DialogContent dividers>
            {seleccionado && (
              <Box>
                <Typography><strong>Sede:</strong> {seleccionado.sede}</Typography>
                <Typography><strong>Carnet:</strong> {seleccionado.carnet}</Typography>
                <Typography><strong>Nombre:</strong> {seleccionado.nombre}</Typography>
                <Typography><strong>Curso:</strong> {seleccionado.curso}</Typography>
                <Typography><strong>Requisito:</strong> {seleccionado.requisito}</Typography>
                <Typography><strong>Estado:</strong> {seleccionado.estado}</Typography>
                <Typography><strong>Tipo:</strong> {seleccionado.tipo}</Typography>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={manejarCerrarDetalles}>Cerrar</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default LevantamientosRN;
