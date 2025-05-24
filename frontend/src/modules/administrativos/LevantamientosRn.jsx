import React, { useState } from 'react';
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
  Alert
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
import imagenRegistro from '../../assets/logoTec.png';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { Tabs, Tab } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const menuItems = [
    { text: 'Inicio', icon: <HomeIcon />, path: '/administrativo/panel-control' },
    { text: 'Inclusiones', icon: <SchoolIcon />, path: '/administrativo/listadoInclusiones' },
    { text: 'Levantamientos y RN ', icon: <TrendingUpIcon />, path: '/administrativo/levantamientorn' },
    { text: 'Reglamento de Levantamientos', icon: <MenuBookIcon />, path: '/administrativo/reglamento' },
    { text: 'Usuario', icon: <PersonIcon />, path: '/perfil' },
  ];

const summaryCards = [
  { title: 'Total de levantamientos', subtitle: 'Todos los levantamientos registrados', count: 100, icon: <DescriptionIcon /> },
  { title: 'Pendientes', subtitle: 'Levantamientos que requieren revisión', count: 40, icon: <AccessTimeIcon /> },
  { title: 'Automáticos', subtitle: 'Levantamientos aprobados automáticamente', count: 80, icon: <SettingsIcon /> }
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

const LevantamientosRN = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [levantamientos, setLevantamientos] = useState(
    [...Array(8)].map((_, i) => ({
      id: i,
      sede: 'San José',
      carnet: '2022438535',
      nombre: 'Méndez Abarca María',
      curso: 'IC1803 - TALLER DE PROGRAMACIÓN',
      requisito: 'IC1803 - TALLER DE PROGRAMACIÓN',
      estado: 'Pendiente',
      tipo: 'Automática'
    }))
  );

  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleAccion = (tipo, index) => {
    const updated = [...levantamientos];
    updated[index].estado = tipo === 'aprobar' ? 'Aprobado' : 'Rechazada';
    setLevantamientos(updated);
    setSnackbar({
      open: true,
      message: tipo === 'aprobar' ? 'Solicitud aprobada correctamente.' : 'Solicitud rechazada correctamente.',
      severity: tipo === 'aprobar' ? 'success' : 'error'
    });
  };

  const [filtroActual, setFiltroActual] = useState('Todos');

  const filtrados = levantamientos.filter((item) => {
    if (filtroActual === 'Todos') return true;

    const estadoMap = {
      Pendientes: 'Pendiente',
      Aprobados: 'Aprobado',
      Rechazados: 'Rechazada',
    };

    const tipoMap = {
      Manuales: 'Manual',
      Automáticos: 'Automática',
    };

    if (estadoMap[filtroActual]) {
      return item.estado === estadoMap[filtroActual];
    }

    if (tipoMap[filtroActual]) {
      return item.tipo === tipoMap[filtroActual];
    }

    return true;
  });



  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Box component="nav" role="navigation" aria-label="Menú principal" sx={{ width: '260px', backgroundColor: '#fff', borderRight: '1px solid #ddd', p: 3, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: 2 }}>
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <img src={imagenRegistro} alt="Logo del TEC" style={{ height: 60 }} />
        </Box>
        <List>
          {menuItems.map((item) => (
            <ListItem button key={item.text} onClick={() => navigate(item.path)} selected={location.pathname === item.path} sx={{ color: '#001B3D', mb: 1, borderRadius: '8px', '&.Mui-selected': { backgroundColor: '#f0f0f0', fontWeight: 'bold' }, '&:hover': { backgroundColor: '#f9f9f9' } }} aria-label={`Ir a ${item.text}`}>
              <ListItemIcon sx={{ color: '#001B3D' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Box>

      <Box component="main" role="main" sx={{ flexGrow: 1, p: 5 }}>
        <Typography variant="h4" fontWeight="bold" color="#062043">
          Levantamiento de requisitos y condición RN
        </Typography>
        <Typography variant="body1" sx={{ mt: 1, mb: 4 }}>
          A continuación, se listan los levantamientos de requisitos requisitos y condición RN, su estado y tipo
        </Typography>

          <Grid container spacing={6} mb={4}>
          {summaryCards.map((card) => (
            <Grid item xs={12} sm={6} key={card.title}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', height: 150 }}>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      {card.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {card.subtitle}
                    </Typography>
                    <Typography variant="h5" fontWeight="bold">
                      {card.count}
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
                      fontSize: 22,
                      mt: 0,
                      ml: 3
                    }}
                  >
                    {card.icon}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
            <Tabs
              value={filtroActual}
              onChange={(e, nuevoValor) => setFiltroActual(nuevoValor)}
              variant="scrollable"
              scrollButtons="auto"
              textColor="inherit"
              indicatorColor="primary"
              sx={{
                borderRadius: 1,
                bgcolor: '#405F90',
                color: '#fff',
                '& .Mui-selected': {
                  fontWeight: 'bold',
                  borderBottom: '3px solid white',
                },
              }}>
              {['Todos', 'Pendientes', 'Aprobados', 'Rechazados', 'Manuales', 'Automáticos'].map((filtro) => (
                <Tab
                  key={filtro}
                  label={filtro}
                  value={filtro}
                  sx={{
                    fontSize: '0.85rem',
                    fontWeight: '500',
                    color: 'white',
                    px: 2,
                    '&.Mui-selected': {
                      color: '#fff',
                    },
                  }}
                  aria-label={`Filtrar por ${filtro}`}
                />
              ))}
            </Tabs>
            <Box sx={{ height: 8 }} />

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Paper component="form" sx={{ display: 'flex', alignItems: 'center', width: 200 }}>
              <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Buscar..." inputProps={{ 'aria-label': 'Buscar' }} />
              <IconButton type="submit" sx={{ p: 1 }} aria-label="Buscar">
                <SearchIcon />
              </IconButton>
            </Paper>

            <Select size="small" defaultValue="recientes">
              <MenuItem value="recientes">Más recientes</MenuItem>
              <MenuItem value="antiguos">Más antiguos</MenuItem>
            </Select>
          </Box>
        
        <TableContainer component={Paper}>
          <Table aria-label="Tabla de levantamientos">
            <TableHead>
              <TableRow>
                <TableCell>Sede</TableCell>
                <TableCell>Carnet</TableCell>
                <TableCell>Nombre del estudiante</TableCell>
                <TableCell>Cursos a matricular</TableCell>
                <TableCell>Requisito a Levantar</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtrados.map((item, i) => (
                <TableRow key={item.id}>
                  <TableCell>{item.sede}</TableCell>
                  <TableCell>{item.carnet}</TableCell>
                  <TableCell>{item.nombre}</TableCell>
                  <TableCell>{item.curso}</TableCell>
                  <TableCell>{item.requisito}</TableCell>
                  <TableCell>{getEstadoChip(item.estado)}</TableCell>
                  <TableCell>{getTipoChip(item.tipo)}</TableCell>
                  <TableCell>
                    <IconButton aria-label="Aprobar" onClick={() => handleAccion('aprobar', i)}><CheckIcon /></IconButton>
                    <IconButton aria-label="Rechazar" onClick={() => handleAccion('rechazar', i)}><CloseIcon /></IconButton>
                    <IconButton aria-label="Ver detalles"><VisibilityIcon /></IconButton>
                    <IconButton aria-label="Más acciones" onClick={handleMenuClick}><MoreVertIcon /></IconButton>
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

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Pagination count={3} page={1} color="primary" />
        </Box>

        <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default LevantamientosRN;
