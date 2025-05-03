import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Box, Container, Typography, Radio, RadioGroup, FormControlLabel, TextField, Button,
  Stepper, Step, StepLabel, List, ListItem, ListItemIcon, ListItemText
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import imagenRegistro from '../../assets/logoTec.png';
import imagenUsuario from '../../assets/imagenUsuario.png';

const FormularioInclusiones = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    sede: '', carnet: '', nombre: '', correo: '', tipoCurso: '', motivo: ''
  });
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['Datos generales', 'Detalles de la inclusión', 'Confirmación'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const menuItems = [
    { text: 'Inicio', icon: <HomeIcon />, path: '/' },
    { text: 'Inclusiones', icon: <SchoolIcon />, path: '/inclusiones' },
    { text: 'Levantamientos', icon: <TrendingUpIcon />, path: '/levantamientos' },
    { text: 'Retiros', icon: <ExitToAppIcon />, path: '/retiros' },
    { text: 'Seguimiento', icon: <AssignmentTurnedInIcon />, path: '/seguimiento' }
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <nav aria-label="Menú principal">
        <Box sx={{ width: '250px', backgroundColor: '#fff', color: '#062043', py: 4, boxShadow: '2px 0 5px rgba(0,0,0,0.1)', borderRight: '1px solid #ddd', height: '100vh' }}>
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <img src={imagenRegistro} alt="Logo del Tecnológico de Costa Rica" style={{ height: '60px' }} />
          </Box>
          <List>
            {menuItems.map((item) => (
              <ListItem
                button
                key={item.text}
                component={Link}
                to={item.path}
                selected={location.pathname === item.path}
                sx={{ color: '#062043', '&.Mui-selected': { backgroundColor: '#f0f0f0', fontWeight: 'bold' }, '&:hover': { backgroundColor: '#f9f9f9' } }}
              >
                <ListItemIcon sx={{ color: '#062043' }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </nav>

      <main style={{ flex: 1 }}>
        <Container disableGutters sx={{ px: 5, py: 6 }}>
          <header>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 5 }}>
              <Typography variant="h1" sx={{ fontWeight: 'bold', fontSize: '2rem', color: '#062043' }}>
                Inclusión a cursos
              </Typography>
              <img src={imagenUsuario} alt="Foto del usuario autenticado" style={{ height: '60px', borderRadius: '50%' }} />
            </Box>
          </header>

          <Box sx={{ backgroundColor: '#EEF3FF', p: 4, borderRadius: 2 }}>
            <Typography variant="h6" align="center" sx={{ mb: 3, fontWeight: 'bold', backgroundColor: '#DDE8FF', py: 1, borderRadius: 1 }}>
              Formulario solicitud de Inclusión a cursos - Sede Cartago
            </Typography>

            <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {activeStep === 0 && (
              <Box component="form" aria-labelledby="datos-generales">
                <fieldset>
                  <legend id="datos-generales">Datos generales</legend>
                  <label htmlFor="sede">Sede a la que pertenece:</label>
                  <RadioGroup name="sede" value={formData.sede} onChange={handleChange}>
                    <FormControlLabel value="Cartago" control={<Radio />} label="Cartago" />
                    <FormControlLabel value="San José" control={<Radio />} label="San José" />
                    <FormControlLabel value="San Carlos" control={<Radio />} label="San Carlos" />
                    <FormControlLabel value="Limón" control={<Radio />} label="Limón" />
                    <FormControlLabel value="Alajuela" control={<Radio />} label="Alajuela" />
                  </RadioGroup>
                  <label htmlFor="carnet">Carnet:</label>
                  <TextField fullWidth id="carnet" name="carnet" placeholder="Ingrese el carnet" value={formData.carnet} onChange={handleChange} sx={{ my: 2 }} />
                  <label htmlFor="nombre">Nombre completo:</label>
                  <TextField fullWidth id="nombre" name="nombre" placeholder="Ingrese el nombre completo" value={formData.nombre} onChange={handleChange} sx={{ mb: 2 }} />
                  <label htmlFor="correo">Correo electrónico:</label>
                  <TextField fullWidth id="correo" name="correo" placeholder="Correo electrónico para notificación" value={formData.correo} onChange={handleChange} sx={{ mb: 2 }} />
                </fieldset>
                <Button variant="contained" fullWidth onClick={handleNext} sx={{ backgroundColor: '#3b5998', fontWeight: 'bold', textTransform: 'none', mt: 3 }}>
                  siguiente
                </Button>
              </Box>
            )}

            {activeStep === 1 && (
              <Box component="form" aria-labelledby="detalles-inclusion">
                <fieldset>
                  <legend id="detalles-inclusion">Detalles de la inclusión</legend>
                  <label htmlFor="tipoCurso">Tipo de curso:</label>
                  <RadioGroup name="tipoCurso" value={formData.tipoCurso} onChange={handleChange}>
                    <FormControlLabel value="Curso regular" control={<Radio />} label="Curso regular" />
                    <FormControlLabel value="Curso especial" control={<Radio />} label="Curso especial (recuperación, extensión, etc.)" />
                  </RadioGroup>
                  <label htmlFor="motivo">Motivo de la solicitud:</label>
                  <TextField
                    fullWidth
                    id="motivo"
                    name="motivo"
                    multiline
                    minRows={4}
                    placeholder="Describa brevemente la razón por la que solicita la inclusión"
                    value={formData.motivo}
                    onChange={handleChange}
                  />
                </fieldset>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                  <Button variant="outlined" onClick={handleBack}>atrás</Button>
                  <Button variant="contained" onClick={handleNext} sx={{ backgroundColor: '#3b5998', fontWeight: 'bold', textTransform: 'none' }}>siguiente</Button>
                </Box>
              </Box>
            )}

            {activeStep === 2 && (
              <Box>
                <Typography variant="h6" gutterBottom>Confirmación de datos</Typography>
                <pre>{JSON.stringify(formData, null, 2)}</pre>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                  <Button variant="outlined" onClick={handleBack}>atrás</Button>
                  <Button variant="contained" sx={{ backgroundColor: '#3b5998', fontWeight: 'bold', textTransform: 'none' }}>enviar solicitud</Button>
                </Box>
              </Box>
            )}
          </Box>

        </Container>
      </main>
    </Box>
  );
};

export default FormularioInclusiones;
