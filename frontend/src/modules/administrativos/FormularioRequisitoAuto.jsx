import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  IconButton,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import PersonIcon from '@mui/icons-material/Person';
import imagenRegistro from '../../assets/logoTec.png';
import { useNavigate, useLocation } from 'react-router-dom';

const menuItems = [
  { text: 'Inicio', icon: <HomeIcon />, path: '/administrativo/panel-control' },
  { text: 'Inclusiones', icon: <SchoolIcon />, path: '/administrativo/inclusiones' },
  { text: 'Levantamientos', icon: <TrendingUpIcon />, path: '/administrativo/levantamientos' },
  { text: 'Levantamientos automáticos', icon: <AssignmentTurnedInIcon />, path: '/administrativo/seguimiento' },
  { text: 'Usuario', icon: <PersonIcon />, path: '/perfil' },
];

const FormularioRequisitoAutomatico = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
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
      <Box sx={{ flexGrow: 1, p: 5 }}>
        <Paper elevation={3} sx={{ p: 4, backgroundColor: '#e8f0fe' }}>
          <Typography variant="h6" component="h2" align="center" fontWeight="bold" mb={3}>
            Formulario de nuevo requisito automático
          </Typography>

          <form aria-label="Formulario nuevo requisito automático">
            <Box sx={{ mb: 2 }}>
              <label htmlFor="curso" style={{ fontWeight: 'bold' }}>1. Curso a matricular</label>
              <TextField fullWidth id="curso" name="curso" variant="outlined" aria-label="Curso a matricular" />
            </Box>

            <Box sx={{ mb: 2 }}>
              <label htmlFor="requisito" style={{ fontWeight: 'bold' }}>2. Requisito a levantar</label>
              <TextField fullWidth id="requisito" name="requisito" variant="outlined" aria-label="Requisito a levantar" />
            </Box>

            <Box sx={{ mb: 2 }}>
              <label htmlFor="regla" style={{ fontWeight: 'bold' }}>3. Regla para levantar</label>
              <TextField fullWidth id="regla" name="regla" variant="outlined" aria-label="Regla para levantar" />
            </Box>

            <Box sx={{ mb: 2 }}>
              <label htmlFor="comentarios" style={{ fontWeight: 'bold' }}>4. Comentarios</label>
              <TextField fullWidth multiline minRows={4} id="comentarios" name="comentarios" variant="outlined" aria-label="Comentarios" />
            </Box>

            <Box textAlign="center">
              <Button variant="contained" sx={{ backgroundColor: '#405F90', '&:hover': { backgroundColor: '#324b73' } }}>
                Insertar
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </Box>
  );
};

export default FormularioRequisitoAutomatico;

