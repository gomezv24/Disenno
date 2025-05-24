//------------------------------------------------------------------------------
// FORMULARIO INCLUSIÓN
//------------------------------------------------------------------------------

import React, { useState, useContext, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  TextField,
  Stepper,
  Step,
  StepLabel,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  MenuItem,
  Select,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import PersonIcon from '@mui/icons-material/Person';

import imagenRegistro from '../../assets/logoTec.png';
import { UserContext } from '../../context/UserContext';

const FormularioInclusion = () => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['Datos personales', 'Detalles de la inclusión', 'Observaciones y validaciones', 'Confirmación'];
  const location = useLocation();

  const { usuario } = useContext(UserContext);

  const [formValues, setFormValues] = useState({
    carnet: '', nombre: '', correo: '', telefono: '', carrera: '', sede: '', beca: '',
    cursoinclusion: '', grupoinclusion: '', profesor: '', otroscursosmatriculados: '',
    tienerequisitos: '', tienechoquehorario: '', tienecurson: '', consideraciones: ''
  });

  useEffect(() => {
    const fetchUsuarioDetallado = async () => {
      if (!usuario?.idusuario) return;

      try {
        const res = await fetch(`http://localhost:5000/usuariodetallado/${usuario.idusuario}`);
        const data = await res.json();
        if (res.ok) {
          setFormValues(prev => ({
            ...prev,
            carnet: data.estudiante?.carnet || '',
            nombre: data.nombre || '',
            correo: data.correoinstitucional || '',
            telefono: data.telefono || '',
            carrera: data.estudiante?.carrera || '',
            sede: data.idsede || ''
          }));
        }
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    };
    fetchUsuarioDetallado();
  }, [usuario]);

  const handleInput = (field) => (event) => {
    setFormValues(prev => ({ ...prev, [field]: event.target.value }));
  };

  const handleEnviar = async () => {
    try {
      const res = await fetch('http://localhost:5000/formularios/inclusiones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          carnet: formValues.carnet,
          nombre: formValues.nombre,
          correo: formValues.correo,
          telefono: formValues.telefono,
          carrera: formValues.carrera,
          idsede: formValues.sede,
          idtipobeca: parseInt(formValues.beca),
          cursoinclusion: formValues.cursoinclusion,
          grupoinclusion: formValues.grupoinclusion,
          profesor: formValues.profesor,
          otroscursosmatriculados: formValues.otroscursosmatriculados,
          tienerequisitos: formValues.tienerequisitos === 'si',
          tienechoquehorario: formValues.tienechoquehorario === 'si',
          tienecurson: formValues.tienecurson === 'si',
          consideraciones: formValues.consideraciones
        })
      });

      const data = await res.json();
      if (res.ok) {
        alert('Formulario enviado con éxito ✅');
        alert(`Seguimiento: ${data.seguimiento}`);
        setActiveStep(activeStep + 1);
      } else {
        alert('Error al enviar: ' + data.error);
      }
    } catch (error) {
      alert('Ocurrió un error al enviar');
      console.error(error);
    }
  };

  const menuItems = [
    { text: 'Inicio', icon: <HomeIcon />, path: '/' },
    { text: 'Inclusiones', icon: <SchoolIcon />, path: '/inclusiones' },
    { text: 'Levantamientos', icon: <TrendingUpIcon />, path: '/levantamientos' },
    { text: 'Retiros', icon: <ExitToAppIcon />, path: '/retiros' },
    { text: 'Seguimiento', icon: <AssignmentTurnedInIcon />, path: '/seguimiento' },
    { text: 'Usuario', icon: <PersonIcon />, path: '/infoUsuario' }
  ];

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <nav style={{ width: '250px', backgroundColor: '#ffffff', padding: '32px 0', borderRight: '1px solid #ddd', height: '100vh' }}>
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <img src={imagenRegistro} alt="Logo TEC" style={{ height: '60px' }} />
        </Box>
        <List>
          {menuItems.map((item) => (
            <ListItem button key={item.text} component={Link} to={item.path} selected={location.pathname === item.path}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </nav>

      <main style={{ flex: 1 }}>
        <Container sx={{ px: 5, py: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>Formulario de Inclusión a Cursos</Typography>
          <Box sx={{ backgroundColor: '#EAF0FF', p: 4, borderRadius: 2 }}>
            <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
              {steps.map((label) => (
                <Step key={label}><StepLabel>{label}</StepLabel></Step>
              ))}
            </Stepper>

            {activeStep === 0 && (
              <form>
                <TextField fullWidth label="Carnet" value={formValues.carnet} disabled sx={{ mb: 2 }} />
                <TextField fullWidth label="Nombre completo" value={formValues.nombre} disabled sx={{ mb: 2 }} />
                <TextField fullWidth label="Correo electrónico" value={formValues.correo} disabled sx={{ mb: 2 }} />
                <TextField fullWidth label="Teléfono" value={formValues.telefono} disabled sx={{ mb: 2 }} />
                <TextField fullWidth label="Carrera" value={formValues.carrera} disabled sx={{ mb: 2 }} />
                <TextField fullWidth label="Sede" value={formValues.sede} disabled sx={{ mb: 2 }} />
                <Select fullWidth value={formValues.beca} onChange={handleInput('beca')} sx={{ mb: 2 }} displayEmpty>
                  <MenuItem value="" disabled>Seleccione tipo de beca</MenuItem>
                  <MenuItem value={1}>Beca socioeconómica</MenuItem>
                  <MenuItem value={2}>Beca excelencia</MenuItem>
                  <MenuItem value={3}>Sin beca</MenuItem>
                </Select>
              </form>
            )}

            {activeStep === 1 && (
              <form>
                <Select fullWidth value={formValues.cursoinclusion} onChange={handleInput('cursoinclusion')} sx={{ mb: 2 }} displayEmpty>
                  <MenuItem value="" disabled>Seleccione curso</MenuItem>
                  <MenuItem value="CI1311">CI1311 - Introducción a la Programación</MenuItem>
                  <MenuItem value="CI1330">CI1330 - Estructuras de Datos</MenuItem>
                  <MenuItem value="CB1022">CB1022 - Cálculo Diferencial</MenuItem>
                </Select>
                <TextField fullWidth label="Grupo del curso" value={formValues.grupoinclusion} onChange={handleInput('grupoinclusion')} sx={{ mb: 2 }} />
                <TextField fullWidth label="Profesor" value={formValues.profesor} onChange={handleInput('profesor')} sx={{ mb: 2 }} />
                <TextField fullWidth label="Otros cursos matriculados" value={formValues.otroscursosmatriculados} onChange={handleInput('otroscursosmatriculados')} sx={{ mb: 2 }} multiline rows={2} />
              </form>
            )}

            {activeStep === 2 && (
              <form>
                <FormControl sx={{ mb: 2 }}>
                  <Typography>¿Cumple con los requisitos?</Typography>
                  <RadioGroup value={formValues.tienerequisitos} onChange={handleInput('tienerequisitos')}>
                    <FormControlLabel value="si" control={<Radio />} label="Sí" />
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                  </RadioGroup>
                </FormControl>
                <FormControl sx={{ mb: 2 }}>
                  <Typography>¿Tiene choque de horario?</Typography>
                  <RadioGroup value={formValues.tienechoquehorario} onChange={handleInput('tienechoquehorario')}>
                    <FormControlLabel value="si" control={<Radio />} label="Sí" />
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                  </RadioGroup>
                </FormControl>
                <FormControl sx={{ mb: 2 }}>
                  <Typography>¿Tiene curso con condición RN superior a 3?</Typography>
                  <RadioGroup value={formValues.tienecurson} onChange={handleInput('tienecurson')}>
                    <FormControlLabel value="si" control={<Radio />} label="Sí" />
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                  </RadioGroup>
                </FormControl>
                <TextField fullWidth label="Consideraciones" value={formValues.consideraciones} onChange={handleInput('consideraciones')} sx={{ mb: 2 }} multiline rows={3} />
              </form>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button variant="contained" disabled={activeStep === 0} onClick={handleBack} sx={{ backgroundColor: '#3b5998' }}>Atrás</Button>
              <Button variant="contained" onClick={activeStep === steps.length - 1 ? handleEnviar : handleNext} sx={{ backgroundColor: '#3b5998' }}>
                {activeStep === steps.length - 1 ? 'Enviar solicitud' : 'Siguiente'}
              </Button>
            </Box>
          </Box>
        </Container>
      </main>
    </Box>
  );
};

export default FormularioInclusion;