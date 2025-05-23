import React from 'react';
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
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import PersonIcon from '@mui/icons-material/Person';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { useNavigate, useLocation } from 'react-router-dom';


const menuItems = [
    { text: 'Inicio', icon: <HomeIcon />, path: '/administrativo/panel-control' },
    { text: 'Inclusiones', icon: <SchoolIcon />, path: '/administrativo/listadoInclusiones' },
    { text: 'Levantamientos y RN ', icon: <TrendingUpIcon />, path: '/administrativo/levantamientorn' },
    { text: 'Reglamento de Levantamientos', icon: <MenuBookIcon />, path: '/administrativo/reglamento' },
    { text: 'Usuario', icon: <PersonIcon />, path: '/perfil' },
  ];

const requisitosData = [
  { curso: 'Investigación de Operaciones (IC6400)', requisito: 'Estadística (MA3405)', regla: 'Haber aprobado Probabilidades (MA2404)' },
  { curso: 'Inteligencia Artificial (IC6200)', requisito: 'Investigación de Operaciones (IC6400)', regla: 'Haber aprobado Estadística (MA3405)' },
  { curso: 'Computación y Sociedad (IC7900)', requisito: 'Administración de Proyectos (IC4810)', regla: 'Haber aprobado todo el IV semestre.' },
  { curso: 'Computación y Sociedad (IC7900)', requisito: 'Seminario Estudios Costarricenses (CS4402)', regla: 'Haber aprobado todo el IV semestre.' },
  { curso: 'Proyecto de Software (IC7841)', requisito: 'Aseguramiento de Calidad / Seguridad de Software / BD II', regla: 'Solo se levanta uno. Se analiza si retrasa la práctica.' },
  { curso: 'Desarrollo de Emprendedores (AE4208)', requisito: 'Proyecto de Ingeniería de Software (IC7841)', regla: 'Se analiza si retrasa la práctica.' },
  { curso: 'Análisis de Algoritmos (IC6302)', requisito: 'Cálculo Diferencial e Integral', regla: 'Debe tener Matemática General y todos los cursos IC de I y II semestre.' },
  { curso: 'Administración de Proyectos (IC4810)', requisito: 'Diseño de Software (IC6821)', regla: 'Debe haber aprobado Requerimientos de Software.' },
];

const ListaRequisitosAutomaticos = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
                <TableCell>Curso a matricular</TableCell>
                <TableCell>Requisito a levantar</TableCell>
                <TableCell>Regla para levantar</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requisitosData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.curso}</TableCell>
                  <TableCell>{row.requisito}</TableCell>
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
