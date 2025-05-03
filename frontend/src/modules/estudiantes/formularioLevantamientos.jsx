import React, { useState } from 'react';
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
  FormLabel,
  FormControlLabel,
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

import imagenRegistro from '../../assets/logoTec.png';
import imagenUsuario from '../../assets/imagenUsuario.png';

const FormularioLevantamiento = () => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['Datos personales', 'Detalles académicos', 'Motivo de solicitud', 'Confirmación'];
  const location = useLocation();

  const menuItems = [
    { text: 'Inicio', icon: <HomeIcon />, path: '/' },
    { text: 'Inclusiones', icon: <SchoolIcon />, path: '/inclusiones' },
    { text: 'Levantamientos', icon: <TrendingUpIcon />, path: '/levantamientos' },
    { text: 'Retiros', icon: <ExitToAppIcon />, path: '/retiros' },
    { text: 'Seguimiento', icon: <AssignmentTurnedInIcon />, path: '/seguimiento' }
  ];

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>

      {/* ======================= MENÚ DE NAVEGACIÓN ======================= */}
      <nav aria-label="Menú principal" style={{ width: '250px', backgroundColor: '#ffffff', color: '#062043', padding: '32px 0', boxShadow: '2px 0 5px rgba(0,0,0,0.1)', borderRight: '1px solid #ddd', height: '100vh' }}>
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <img src={imagenRegistro} alt="Logo del Instituto Tecnológico de Costa Rica" style={{ height: '60px' }} />
        </Box>
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              sx={{
                color: '#062043',
                '&.Mui-selected': { backgroundColor: '#f0f0f0', fontWeight: 'bold' },
                '&:hover': { backgroundColor: '#f9f9f9' }
              }}
            >
              <ListItemIcon sx={{ color: '#062043' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </nav>

      {/* ======================= CONTENIDO PRINCIPAL ======================= */}
      <main style={{ flex: 1 }}>
        <Container disableGutters sx={{ maxWidth: '1400px', mx: 'auto', px: 2, py: 6 }}>

          <header>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 5 }}>
              <img src={imagenUsuario} alt="Foto de perfil del usuario" style={{ height: '60px', borderRadius: '50%' }} />
            </Box>
          </header>

          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: '#062043', mb: 3 }}>
            Levantamiento de requisitos y condición RN
          </Typography>

          <Box sx={{ backgroundColor: '#EAF0FF', p: 4, borderRadius: 2 }}>
            <Typography variant="h6" align="center" sx={{ mb: 3, fontWeight: 'bold', backgroundColor: '#DDE8FF', py: 1, borderRadius: 1 }}>
              Formulario solicitud de Levantamiento de requisitos y condición RN - Sede Cartago
            </Typography>

            <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {activeStep === 0 && (
              <form>
                <fieldset>
                  <legend>Datos personales</legend>

                  <FormControl component="fieldset" sx={{ mb: 3 }}>
                    <FormLabel component="legend">1. Sede a la que pertenece</FormLabel>
                    <RadioGroup name="sede">
                      <FormControlLabel value="Cartago" control={<Radio />} label="Cartago" />
                      <FormControlLabel value="San José" control={<Radio />} label="San José" />
                      <FormControlLabel value="San Carlos" control={<Radio />} label="San Carlos" />
                      <FormControlLabel value="Limón" control={<Radio />} label="Limón" />
                      <FormControlLabel value="Alajuela" control={<Radio />} label="Alajuela" />
                    </RadioGroup>
                  </FormControl>

                  <label htmlFor="carnet">2. Ingrese el carnet:</label>
                  <TextField id="carnet" fullWidth sx={{ mb: 2 }} placeholder="Ej: 2023123456" />

                  <label htmlFor="nombre">3. Ingrese el Primer Apellido - Segundo Apellido - Nombre:</label>
                  <TextField id="nombre" fullWidth sx={{ mb: 2 }} placeholder="Ej: Pérez López Ana" />

                  <label htmlFor="correo">4. Correo electrónico para notificación:</label>
                  <TextField id="correo" fullWidth sx={{ mb: 2 }} placeholder="Ej: ejemplo@estudiantec.cr" />

                  <FormControl component="fieldset" sx={{ mb: 3 }}>
                    <FormLabel component="legend">5. Seleccione el Plan de Estudio</FormLabel>
                    <RadioGroup name="planEstudio">
                      <FormControlLabel value="anteriores" control={<Radio />} label="Planes Anteriores" />
                      <FormControlLabel value="410" control={<Radio />} label="410" />
                      <FormControlLabel value="411" control={<Radio />} label="411" />
                      <FormControlLabel value="412" control={<Radio />} label="412" />
                    </RadioGroup>
                  </FormControl>

                  <FormControl component="fieldset">
                    <FormLabel component="legend">6. Tipo de levantamiento a solicitar</FormLabel>
                    <RadioGroup name="tipoLevantamiento">
                      <FormControlLabel value="Requisitos" control={<Radio />} label="Requisitos" />
                      <FormControlLabel value="Condición RN" control={<Radio />} label="Condición RN" />
                    </RadioGroup>
                  </FormControl>
                </fieldset>
              </form>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button
                variant="outlined"
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                atrás
              </Button>
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ backgroundColor: '#3b5998', textTransform: 'none', fontWeight: 'bold' }}
              >
                {activeStep === steps.length - 1 ? 'enviar solicitud' : 'siguiente'}
              </Button>
            </Box>
          </Box>

          <footer>
            <Typography variant="body2" align="center" sx={{ mt: 8, color: 'gray' }}>
              © 2025 Tecnológico de Costa Rica
            </Typography>
          </footer>
        </Container>
      </main>
    </Box>
  );
};

export default FormularioLevantamiento;