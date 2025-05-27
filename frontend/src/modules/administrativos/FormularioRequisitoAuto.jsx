import React, { useState, useEffect } from 'react';

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
  Snackbar,
  Alert
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PersonIcon from '@mui/icons-material/Person';
import imagenRegistro from '../../assets/logoTec.png';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

import { insertarRequisitoAutomatico } from './Funciones/coordinadoraFun';

import { obtenerCursos } from './Funciones/coordinadoraFun';

 const menuItems = [
  { text: 'Inicio', icon: <HomeIcon />, path: '/administrativo' },
  { text: 'Inclusiones', icon: <SchoolIcon />, path: '/administrativo/listadoInclusiones' },
  { text: 'Levantamientos y RN ', icon: <TrendingUpIcon />, path: '/administrativo/levantamientorn' },
  { text: 'Reglamento de Levantamientos', icon: <MenuBookIcon />, path: '/administrativo/reglamento' },
  { text: 'Panel de Control', icon: <ManageAccountsIcon />, path: '/administrativo/panelControl' },
  { text: 'Usuario', icon: <PersonIcon />, path: '/infoUsuario' },
];

const FormularioRequisitoAutomatico = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [planEstudio, setPlanEstudio] = useState('');
  const handlePlanChange = (event) => {
    setPlanEstudio(event.target.value);
  };

  const [cursos, setCursos] = useState([]);
  const [cursoSeleccionado, setCursoSeleccionado] = useState('');
  const [requisitoSeleccionado, setRequisitoSeleccionado] = useState('');
  const [cursoRequeSeleccionado, setcursoRequeSeleccionado] = useState('');
  const [comentario, setComentario] = useState('');

  useEffect(() => {
    const cargarCursos = async () => {
      const data = await obtenerCursos();
      setCursos(data);
    };

    cargarCursos();
  }, []);


  const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleSubmit = async (event) => {
      event.preventDefault();

      const nuevoRequisito = {
        idcurso_objetivo: parseInt(cursoSeleccionado, 10),
        idcurso_requerido: parseInt(requisitoSeleccionado, 10),
        tipo_levantamiento: planEstudio,
        regla: comentario,
        idcurso_regla: parseInt(cursoRequeSeleccionado, 10)
      };

      console.log('Datos que se enviarán a la base:', nuevoRequisito);

      try {
        await insertarRequisitoAutomatico(nuevoRequisito);
        setOpenSnackbar(true);
        setCursoSeleccionado('');
        setRequisitoSeleccionado('');
        setPlanEstudio('');
        setcursoRequeSeleccionado('');
        setComentario('');

      } catch (error) {
        console.error('Error al guardar:', error);
        alert('Error al guardar. Revisa consola.');
      }
    };





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

          <form aria-label="Formulario nuevo requisito automático" onSubmit={handleSubmit}>
          <Box sx={{ mb: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="curso-label">1. Curso a matricular</InputLabel>
              <Select
                labelId="curso-label"
                id="curso"
                name="curso"
                value={cursoSeleccionado}
                label="Curso a matricular"
                  onChange={(e) => {
                      console.log('Curso seleccionado:', e.target.value);
                      setCursoSeleccionado(e.target.value);
                  }}

                aria-label="Curso a matricular"
                renderValue={(selected) => {
                  if (!selected) return '-- Seleccione un curso --';
                  const curso = cursos.find(c => String(c.idcurso) === selected);
                  return curso ? `${curso.nombre} (${curso.codigo})` : '-- Seleccione un curso --';
                }}
              >
                <MenuItem value="" disabled>-- Seleccione un curso --</MenuItem>
                {cursos.map((curso) => (
                  <MenuItem key={curso.idcurso} value={String(curso.idcurso)}>
                    {curso.nombre} ({curso.codigo})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

          </Box>

            <Box sx={{ mb: 2 }}>
              <FormControl fullWidth>
                <InputLabel id="label-plan-estudio">2. Seleccione el plan de estudio</InputLabel>
                <Select
                  labelId="label-plan-estudio"
                  id="select-plan-estudio"
                  value={planEstudio}
                  label="Seleccione el plan de estudio"
                  onChange={handlePlanChange}
                  aria-label="Selector de plan de estudio"
                >
                  <MenuItem value={410}>410</MenuItem>
                  <MenuItem value={411}>411</MenuItem>
                  <MenuItem value={412}>412</MenuItem>
                </Select>
              </FormControl>
            </Box>
              <Box sx={{ mb: 2 }}>
              <FormControl fullWidth>
                <InputLabel id="requisito-label">3. Requisito a levantar</InputLabel>
                <Select
                  labelId="requisito-label"
                  id="requisito"
                  name="requisito"
                  value={requisitoSeleccionado}
                  label="Requisito a levantar"
                     onChange={(e) => {
                        console.log('Curso seleccionado:', e.target.value);
                        setRequisitoSeleccionado(e.target.value);
                      }}

                  aria-label="Requisito a levantar"
                  renderValue={(selected) => {
                    if (!selected) return '-- Seleccione un requisito --';
                    const curso = cursos.find(c => String(c.idcurso) === selected);
                    return curso ? `${curso.nombre} (${curso.codigo})` : '-- Seleccione un requisito --';
                  }}
                >
                  <MenuItem value="" disabled>-- Seleccione un requisito --</MenuItem>
                  {cursos.map((curso) => (
                    <MenuItem key={curso.idcurso} value={String(curso.idcurso)}>
                      {curso.nombre} ({curso.codigo})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
              <Box sx={{ mb: 2 }}>
              <FormControl fullWidth>
                <InputLabel id="cursoregla-label">4. Curso que cumpla con la regla</InputLabel>
                <Select
                  labelId="cursoRegla-label"
                  id="regla"
                  name="regla"
                  value={cursoRequeSeleccionado}
                  label="Curso que cumple la regla"
                     onChange={(e) => {
                        console.log('Curso seleccionado:', e.target.value);
                        setcursoRequeSeleccionado(e.target.value);
                      }}

                  aria-label="Materia que debe tener aprobada"
                  renderValue={(selected) => {
                    if (!selected) return '-- Seleccione un requisito --';
                    const curso = cursos.find(c => String(c.idcurso) === selected);
                    return curso ? `${curso.nombre} (${curso.codigo})` : '-- Seleccione un requisito --';
                  }}
                >
                  <MenuItem value="" disabled>-- Seleccione un requisito --</MenuItem>
                  {cursos.map((curso) => (
                    <MenuItem key={curso.idcurso} value={String(curso.idcurso)}>
                      {curso.nombre} ({curso.codigo})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>  
            <Box sx={{ mb: 2 }}>
              <label htmlFor="comentarios" style={{ fontWeight: 'bold' }}>5. Comentarios</label>
              <TextField
                fullWidth
                multiline
                minRows={4}
                id="comentarios"
                name="comentarios"
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                variant="outlined"
                aria-label="Comentarios"
              />

            </Box>

            <Box textAlign="center">
              <Button type="submit" variant="contained" sx={{ backgroundColor: '#405F90', '&:hover': { backgroundColor: '#324b73' } }} aria-label="Insertar nuevo requisito automático">
                Insertar
              </Button>
            </Box>
          </form>

          <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
            <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
              ¡Requisito guardado exitosamente! ¿Desea ingresar otro?
            </Alert>
          </Snackbar>
        </Paper>
      </Box>
    </Box>
  );
};

export default FormularioRequisitoAutomatico;
