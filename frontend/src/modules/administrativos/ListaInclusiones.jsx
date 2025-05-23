import React from 'react';
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
  Menu
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
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
import { useNavigate, useLocation } from 'react-router-dom';

const menuItems = [
  { text: 'Inicio', icon: <HomeIcon />, path: '/administrativo/panel-control' },
  { text: 'Inclusiones', icon: <SchoolIcon />, path: '/administrativo/inclusiones' },
  { text: 'Levantamientos', icon: <TrendingUpIcon />, path: '/administrativo/levantamientos' },
  { text: 'Levantamientos automáticos', icon: <AssignmentTurnedInIcon />, path: '/administrativo/seguimiento' },
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

const ListaInclusiones = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
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

      {/* Main content */}
      <Box component="main" role="main" sx={{ flexGrow: 1, p: 5 }}>
        <Typography variant="h4" fontWeight="bold" color="#062043">
          Inclusiones
        </Typography>
        <Typography variant="body1" sx={{ mt: 1, mb: 4 }}>
          A continuación, se listan las inclusiones realizadas por los estudiantes y su estado.
        </Typography>

        {/* Summary Cards */}
        <Grid container spacing={3} mb={4}>
          {summaryCards.map((card) => (
            <Grid item xs={12} sm={4} key={card.title}>
              <Card>
                <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="body2">{card.title}</Typography>
                    <Typography variant="h5" fontWeight="bold">{card.count}</Typography>
                    <Typography variant="caption">I Semestre 2025</Typography>
                  </Box>
                  <Box sx={{ fontSize: 32 }}>{card.icon}</Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Filters and search */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, flexWrap: 'wrap', gap: 2 }}>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {['Todos', 'Pendientes', 'Aprobados', 'Rechazados'].map((label) => (
              <Button key={label} variant="contained" size="small">{label}</Button>
            ))}
          </Box>

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
        </Box>

        {/* Table */}
        <TableContainer component={Paper}>
          <Table aria-label="Tabla de Inclusiones">
            <TableHead>
              <TableRow>
                <TableCell>Sede</TableCell>
                <TableCell>Carnet</TableCell>
                <TableCell>Nombre del estudiante</TableCell>
                <TableCell>Grupo</TableCell>
                <TableCell>Curso</TableCell>
                <TableCell>Profesor</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[...Array(8)].map((_, i) => (
                <TableRow key={i}>
                  <TableCell>San José</TableCell>
                  <TableCell>2022438535</TableCell>
                  <TableCell>Méndez Abarca María</TableCell>
                  <TableCell>01</TableCell>
                  <TableCell>IC1803 - TALLER DE PROGRAMACIÓN</TableCell>
                  <TableCell>Mario Chacon</TableCell>
                  <TableCell>{getEstadoChip(i % 2 === 0 ? 'Aprobado' : 'Rechazada')}</TableCell>
                  <TableCell>
                    <IconButton aria-label="Aprobar"><CheckIcon /></IconButton>
                    <IconButton aria-label="Rechazar"><CloseIcon /></IconButton>
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

        {/* Pagination */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Pagination count={3} page={1} color="primary" />
        </Box>
      </Box>
    </Box>
  );
};

export default ListaInclusiones;
