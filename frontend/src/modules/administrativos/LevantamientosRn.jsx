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
import { informacion } from './Funciones/historicoLev';
import { actualizarEstado } from './Funciones/coordinadoraFun';
import DownloadIcon from '@mui/icons-material/Download';
import * as XLSX from 'xlsx';

const menuItems = [
  { text: 'Panel de Control', icon: <ManageAccountsIcon />, path: '/administrativo/panelControl' },
  { text: 'Inclusiones', icon: <SchoolIcon />, path: '/administrativo/listadoInclusiones' },
  { text: 'Levantamientos y RN ', icon: <TrendingUpIcon />, path: '/administrativo/levantamientorn' },
  { text: 'Reglamento de Levantamientos', icon: <MenuBookIcon />, path: '/administrativo/reglamento' },
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
        const data = await informacion('1');
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
        return <Chip label="Aprobado" sx={{ backgroundColor: '#d9f3e5', color: '#2e7d32', fontWeight: 'bold' }} aria-label={`Estado: Aprobado`} />;
      case 'Rechazado':
        return <Chip label="Rechazado" sx={{ backgroundColor: '#fdecea', color: '#c62828', fontWeight: 'bold' }} aria-label={`Estado: Rechazado`} />;
      case 'Pendiente':
        return <Chip label="Pendiente" sx={{ backgroundColor: '#fff3e0', color: '#ef6c00', fontWeight: 'bold' }} aria-label={`Estado: Pendiente`} />;
      default:
        return <Chip label={estado} aria-label={`Estado: ${estado}`} />;
    }
  };

  const getTipoChip = (tipo) => {
    switch (tipo) {
      case 'Automática':
        return <Chip label="Automática" sx={{ backgroundColor: '#e3f2fd', color: '#1976d2', fontWeight: 'bold' }} aria-label={`Tipo: Automática`} />;
      case 'Manual':
        return <Chip label="Manual" sx={{ backgroundColor: '#f3e5f5', color: '#8e24aa', fontWeight: 'bold' }} aria-label={`Tipo: Manual`} />;
      default:
        return <Chip label={tipo} aria-label={`Tipo: ${tipo}`} />;
    }
  };

  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleAccion = async (tipo, index) => {
    const idformulario = levantamientos[index].idformulario;
    const idestado = tipo === 'aprobar' ? 3 : 4;

    try {
      await actualizarEstado(idformulario, idestado);
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

  const exportSingleToExcel = (sol) => {
    const datosExportar = [{
      "Nombre Estudiante": sol.nombre || '',
      Carnet: sol.carnet || '',
      "Fecha de Solicitud": sol.fecha || '',
      "Curso a matricular": sol.curso || '',
      "Requisito a levantar": sol.requisito || '',
      Estado: sol.estado || '',
      Correo: sol.correo || '',
      "Estado Solicitud": sol.estado || '',
      Carrera: sol.carrera || '',
      Consideraciones: sol.consideraciones || '',
      "Tipo de solicitud": sol.tiposolicitud || '',
      "Plan de estudio": sol.planestudio || '',
      Sede: sol.sede || '',
      Comentarios: sol.comentario || '',
    }];

    try {
      const ws = XLSX.utils.json_to_sheet(datosExportar);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "DatosLevantamiento");
      XLSX.writeFile(wb, `levantamiento_${sol.carnet || 'estudiante'}.xlsx`);
    } catch (error) {
      console.error("Error al exportar a Excel:", error);
      setSnackbar({
        open: true,
        message: "Ocurrió un error al exportar los datos",
        severity: 'error',
      });
    }
  };

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
          Levantamiento de requisitos y condición RN
        </Typography>
        <Typography variant="body1" sx={{ mt: 1, mb: 4 }}>
          A continuación, se listan los levantamientos registrados, su estado y tipo
        </Typography>

        {/* Resumen estadístico */}
        <Grid container spacing={6} mb={4} aria-label="Resumen estadístico de levantamientos">
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
                  <Typography variant="h5" fontWeight="bold" aria-live="polite">
                    {resumen.total}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    I Semestre 2025
                  </Typography>
                </Box>
                <Box 
                  sx={{ 
                    width: 40, 
                    height: 40, 
                    backgroundColor: '#002B5C', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    color: '#fff', 
                    fontSize: 22 
                  }}
                  aria-hidden="true"
                >
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
                  <Typography variant="h5" fontWeight="bold" aria-live="polite">
                    {resumen.pendientes}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    I Semestre 2025
                  </Typography>
                </Box>
                <Box 
                  sx={{ 
                    width: 40, 
                    height: 40, 
                    backgroundColor: '#002B5C', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    color: '#fff', 
                    fontSize: 22 
                  }}
                  aria-hidden="true"
                >
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
                  <Typography variant="h5" fontWeight="bold" aria-live="polite">
                    {resumen.automaticos}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    I Semestre 2025
                  </Typography>
                </Box>
                <Box 
                  sx={{ 
                    width: 40, 
                    height: 40, 
                    backgroundColor: '#002B5C', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    color: '#fff', 
                    fontSize: 22 
                  }}
                  aria-hidden="true"
                >
                  <SettingsIcon />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Filtros */}
        <Tabs 
          value={filtroActual} 
          onChange={(e, v) => setFiltroActual(v)} 
          variant="scrollable" 
          scrollButtons="auto" 
          sx={{ mb: 2, bgcolor: '#405F90', color: '#fff' }}
          aria-label="Filtros de levantamientos"
        >
          {['Todos', 'Pendientes', 'Aprobados', 'Rechazados'].map((filtro) => (
            <Tab 
              key={filtro} 
              label={filtro} 
              value={filtro} 
              sx={{ fontSize: '0.85rem', fontWeight: 500, color: '#fff' }}
              id={`tab-${filtro}`}
              aria-controls={`tabpanel-${filtro}`}
            />
          ))}
        </Tabs>

        {loading && (
          <Typography align="center" sx={{ mt: 4 }} aria-live="polite" aria-busy="true">
            Cargando levantamientos...
          </Typography>
        )}
        {error && (
          <Alert severity="error" aria-live="assertive">
            Error al cargar los datos: {error}
          </Alert>
        )}

        {/* Tabla de levantamientos */}
        <TableContainer component={Paper} aria-label="Lista de levantamientos">
          <Table aria-label="Tabla de levantamientos de requisitos">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Sede</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Carnet</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Curso</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Requisito</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Estado</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtrados.map((item, i) => (
                <TableRow key={i} aria-rowindex={i+1}>
                  <TableCell>{item.sede || 'No especificado'}</TableCell>
                  <TableCell>{item.carnet || 'No especificado'}</TableCell>
                  <TableCell>{item.nombre || 'No especificado'}</TableCell>
                  <TableCell>{item.curso || 'No especificado'}</TableCell>
                  <TableCell>{item.requisito || 'No especificado'}</TableCell>
                  <TableCell>{getEstadoChip(item.estado)}</TableCell>
                  <TableCell>
                    <IconButton 
                      onClick={() => handleAccion('aprobar', i)}
                      aria-label={`Aprobar solicitud de ${item.nombre || 'estudiante'}`}
                    >
                      <CheckIcon />
                    </IconButton>
                    <IconButton 
                      onClick={() => handleAccion('rechazar', i)}
                      aria-label={`Rechazar solicitud de ${item.nombre || 'estudiante'}`}
                    >
                      <CloseIcon />
                    </IconButton>
                    <IconButton 
                      aria-label={`Ver detalles de la solicitud de ${item.nombre || 'estudiante'}`}
                      color="primary"
                      size="small"
                      onClick={() => navigate('/administrativo/vista/levantamiento', { state: { sol: item } })}
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton
                      aria-label={`Descargar solicitud de ${item.nombre || 'estudiante'} en formato Excel`}
                      color="secondary"
                      onClick={(e) => {
                        e.stopPropagation();
                        exportSingleToExcel(item);
                      }}
                      size="small"
                    >
                      <DownloadIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Pagination 
          count={3} 
          page={1} 
          color="primary" 
          sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}
          aria-label="Paginación de resultados"
        />

        <Snackbar 
          open={snackbar.open} 
          autoHideDuration={4000} 
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

        <Dialog 
          open={detalleAbierto} 
          onClose={manejarCerrarDetalles}
          aria-labelledby="detalle-dialog-title"
          aria-describedby="detalle-dialog-description"
        >
          <DialogTitle id="detalle-dialog-title">Detalle del levantamiento</DialogTitle>
          <DialogContent dividers id="detalle-dialog-description">
            {seleccionado && (
              <Box component="div" role="document">
                <Typography><strong>Sede:</strong> {seleccionado.sede || 'No especificado'}</Typography>
                <Typography><strong>Carnet:</strong> {seleccionado.carnet || 'No especificado'}</Typography>
                <Typography><strong>Nombre:</strong> {seleccionado.nombre || 'No especificado'}</Typography>
                <Typography><strong>Curso:</strong> {seleccionado.curso || 'No especificado'}</Typography>
                <Typography><strong>Requisito:</strong> {seleccionado.requisito || 'No especificado'}</Typography>
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

export default LevantamientosRN;