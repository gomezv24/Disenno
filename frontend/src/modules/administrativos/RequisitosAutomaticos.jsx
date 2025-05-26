import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  InputBase,
  Paper,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Pagination,
  Button
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import imagenRegistro from '../../assets/logoTec.png';

import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PersonIcon from '@mui/icons-material/Person';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { useNavigate, useLocation } from 'react-router-dom';
import { obtenerRequisitosAutomaticos } from './Funciones/coordinadoraFun';

 const menuItems = [
  { text: 'Inicio', icon: <HomeIcon />, path: '/administrativo' },
  { text: 'Inclusiones', icon: <SchoolIcon />, path: '/administrativo/listadoInclusiones' },
  { text: 'Levantamientos y RN ', icon: <TrendingUpIcon />, path: '/administrativo/levantamientorn' },
  { text: 'Reglamento de Levantamientos', icon: <MenuBookIcon />, path: '/administrativo/reglamento' },
  { text: 'Panel de Control', icon: <ManageAccountsIcon />, path: '/administrativo/panelControl' },
  { text: 'Usuario', icon: <PersonIcon />, path: '/infoUsuario' },
];


const ListaRequisitosAutomaticos = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [requisitos, setRequisitos] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await obtenerRequisitosAutomaticos();
      setRequisitos(data);
    };

    fetchData();
  }, []);


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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" fontWeight="bold" color="#062043">
            Requisitos automáticos
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/administrativo/formularioAuto')}
            aria-label="Ir al formulario para agregar un nuevo requisito automático"
            sx={{
              backgroundColor: '#405F90',
              '&:hover': {
                backgroundColor: '#324b73'
              }
            }}
          >
            + Nuevo Requisito automático
          </Button>
        </Box>

        <Typography variant="body1" sx={{ mb: 4 }}>
          A continuación, se listan los cursos en los que sí se puede aplicar el levantamiento de requisitos, si se cumplen las reglas específicas:
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Paper component="form" sx={{ display: 'flex', alignItems: 'center', width: 300 }}>
            <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Buscar..." inputProps={{ 'aria-label': 'Buscar' }} />
            <IconButton type="submit" sx={{ p: 1 }} aria-label="Buscar">
              <SearchIcon />
            </IconButton>
          </Paper>
        </Box>

        <TableContainer component={Paper}>
          <Table aria-label="Tabla de Requisitos Automáticos">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Curso a matricular</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Requisito a levantar</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Regla para levantar</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requisitos.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {row.curso_objetivo 
                      ? `${row.curso_objetivo.nombre} (${row.curso_objetivo.codigo})`
                      : 'Curso no disponible'}
                  </TableCell>
                  <TableCell>
                    {row.curso_requerido 
                      ? `${row.curso_requerido.nombre} (${row.curso_requerido.codigo})`
                      : 'Curso no disponible'}
                  </TableCell>
                  <TableCell>{row.regla}</TableCell>
                  <TableCell>
                    <IconButton aria-label="Eliminar"><DeleteIcon /></IconButton>
                    <IconButton aria-label="Ver"><VisibilityIcon /></IconButton>
                    <IconButton aria-label="Editar"><EditIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

          </Table>
        </TableContainer>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Pagination count={3} page={1} color="primary" />
        </Box>
      </Box>
    </Box>
  );
};

export default ListaRequisitosAutomaticos;
