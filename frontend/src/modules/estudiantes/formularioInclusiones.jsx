//------------------------------------------------------------------------------
// FORMULARIO INCLUSIÓN
//
// Página principal del formulario de inclusiones
// Contiene una barra lateral accesible con navegación a funcionalidades clave
// como Inclusiones, Levantamientos, Retiros, Seguimiento y Perfil de Usuario.
// contiene un todos los campos necesarios para llenar la solicitud de inclusion
//------------------------------------------------------------------------------

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
  MenuItem,
  Select,
  InputLabel,
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
import PersonIcon from '@mui/icons-material/Person';

const FormularioInclusion = () => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['Datos personales', 'Detalles de la inclusión', 'Observaciones y validaciones', 'Confirmación'];
  const location = useLocation();

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
              sx={{ color: '#062043', '&.Mui-selected': { backgroundColor: '#f0f0f0', fontWeight: 'bold' }, '&:hover': { backgroundColor: '#f9f9f9' } }}
            >
              <ListItemIcon sx={{ color: '#062043' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </nav>

    
          {/*--------------------------------*/}
          {/*       CONTENIDO PRINCIPAL      */}
          {/*--------------------------------*/}
          <main style={{ flex: 1 }}>
    
            {/* ENCABEZADO */}
            <header>
              <Container sx={{ px: 5, pt: 6 }}></Container>
            </header>
    
            {/* CUERPO DE LA PÁGINA */}
            <Container sx={{ px: 5, py: 2 }}>
    
              {/* Título principal */}
              <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold', color: '#062043', mb: 3 }}>
              Formulario de Inclusión a Cursos
              </Typography>

          <Box sx={{ backgroundColor: '#EAF0FF', p: 4, borderRadius: 2 }}>
            <Typography variant="h6" align="center" sx={{ mb: 3, fontWeight: 'bold', backgroundColor: '#DDE8FF', py: 1, borderRadius: 1 }}>
              Solicitud de Inclusión - Sede Cartago
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
                  <Typography component="legend" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Datos personales
                  </Typography>

                  <Typography sx={{ mt: 2, fontWeight: 'light' }}>Carnet</Typography>
                  <TextField fullWidth sx={{ mb: 2 }} />

                  <Typography sx={{ mt: 2, fontWeight: 'light' }}>Nombre completo</Typography>
                  <TextField fullWidth sx={{ mb: 2 }}  />

                  <Typography sx={{ mt: 2, fontWeight: 'light' }}>Correo electrónico</Typography>
                  <TextField fullWidth sx={{ mb: 2 }}  />

                  <Typography sx={{ mt: 2, fontWeight: 'light' }}>Teléfono</Typography>
                  <TextField fullWidth sx={{ mb: 2 }}  />

                  <Typography sx={{ mt: 2, fontWeight: 'light' }}>Carrera</Typography>
                  <TextField fullWidth sx={{ mb: 2 }} />

                  <Typography sx={{ mt: 2, fontWeight: 'light' }}>Sede</Typography>
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <Select defaultValue="">
                      <MenuItem value={1}>Cartago</MenuItem>
                      <MenuItem value={2}>San José</MenuItem>
                      <MenuItem value={3}>San Carlos</MenuItem>
                    </Select>
                  </FormControl>

                  <Typography sx={{ mt: 2, fontWeight: 'light' }}>Tipo de beca</Typography>
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <Select defaultValue="">
                      <MenuItem value={1}>Beca socioeconómica</MenuItem>
                      <MenuItem value={2}>Beca excelencia</MenuItem>
                      <MenuItem value={3}>Sin beca</MenuItem>
                    </Select>
                  </FormControl>
                </fieldset>
              </form>
            )}

            {activeStep === 1 && (
              <form>
                <fieldset>
                  <Typography component="legend" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Detalles de la inclusión
                  </Typography>
                  <Typography sx={{ mt: 2, fontWeight: 'light' }}>Seleccione el curso en el que quiere la inclusión. Este es el curso que le limitaría la cantidad de créditos a matricular </Typography>
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <Select defaultValue="">
                      <MenuItem value="CI1311">CI1311 - Introducción a la Programación</MenuItem>
                      <MenuItem value="CI1330">CI1330 - Estructuras de Datos</MenuItem>
                      <MenuItem value="CB1022">CB1022 - Cálculo Diferencial</MenuItem>
                    </Select>
                  </FormControl>

                  <Typography sx={{ mt: 2, fontWeight: 'light' }}>Grupo del curso</Typography>
                  <TextField fullWidth sx={{ mb: 2 }} />

                  <Typography sx={{ mt: 2, fontWeight: 'light' }}>Profesor</Typography>
                  <TextField fullWidth sx={{ mb: 2 }} />

                  <Typography sx={{ fontWeight: 'light', mt: 2, mb: 1 }}>Mencione qué otros cursos matriculó este semestre</Typography>
                  <TextField fullWidth multiline rows={2} sx={{ mb: 2 }} />
                </fieldset>
              </form>
            )}

            {activeStep === 2 && (
              <form>
                <fieldset>
                  <Typography component="legend" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Observaciones y validaciones
                  </Typography>

                  {/* Cumple requisitos */}
                  <Typography sx={{ mt: 2, fontWeight: 'light' }}>¿Cumple con los requisitos?</Typography>
                  <FormControl component="fieldset" sx={{ mb: 3 }}>
                    <RadioGroup>
                      <FormControlLabel value="si" control={<Radio />} label="Sí" />
                      <FormControlLabel value="no" control={<Radio />} label="No" />
                    </RadioGroup>
                  </FormControl>

                  {/* Choque de horario */}
                  <Typography sx={{ mt: 1, fontWeight: 'light' }}>¿Tiene choque de horario?</Typography>
                  <FormControl component="fieldset" sx={{ mb: 3 }}>
                    <RadioGroup>
                      <FormControlLabel value="si" control={<Radio />} label="Sí" />
                      <FormControlLabel value="no" control={<Radio />} label="No" />
                    </RadioGroup>
                  </FormControl>

                  {/* RN mayor a 3 */}
                  <Typography sx={{ fontWeight: 'light', mb: 1 }}>
                    Si tiene algún curso con condición RN superior a 3, por favor menciónelo:
                  </Typography>
                  <TextField fullWidth multiline rows={2} sx={{ mb: 2 }} />

                  {/* Consideraciones */}
                  <Typography sx={{ fontWeight: 'light', mb: 1 }}>
                    Mencione consideraciones importantes al analizar su caso. También indique si le serviría otro grupo distinto al que ya mencionó.
                  </Typography>
                  <TextField fullWidth multiline rows={4} sx={{ mb: 2 }} />
                </fieldset>
              </form>
            )}


            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              variant="contained"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ backgroundColor: '#3b5998', textTransform: 'none', fontWeight: 'bold' }}
            >
              Atrás
            </Button>
              <Button variant="contained" onClick={handleNext} sx={{ backgroundColor: '#3b5998', textTransform: 'none', fontWeight: 'bold' }}>
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
