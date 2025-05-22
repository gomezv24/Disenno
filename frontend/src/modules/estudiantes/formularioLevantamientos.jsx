//------------------------------------------------------------------------------
// FORMULARIO INCLUSIÓN
//
// Página principal del formulario de levantamientos
// Contiene una barra lateral accesible con navegación a funcionalidades clave
// como Inclusiones, Levantamientos, Retiros, Seguimiento y Perfil de Usuario.
// contiene un todos los campos necesarios para llenar la solicitud de levantamientos
//------------------------------------------------------------------------------
import React, { useState, useEffect, useContext } from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  TextField,
  Stepper,
  Step,
  StepLabel,
  FormControl,
  FormControlLabel,
  MenuItem,
  Select,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  FormGroup,
  Checkbox
} from '@mui/material';

import { Link, useLocation } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

import imagenRegistro from '../../assets/logoTec.png';
import PersonIcon from '@mui/icons-material/Person';
import { UserContext } from '../../context/UserContext';

const FormularioLevantamiento = () => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['Datos personales', 'Detalles académicos', 'Motivo de solicitud', 'Confirmación'];
  const location = useLocation();

  const { usuario } = useContext(UserContext);
  const [formValues, setFormValues] = useState({
    carnet: '',
    nombre: '',
    correo: '',
    carrera: '',
    sede: ''
  });

  const [academicDetails, setAcademicDetails] = useState({
    curso: '',
    grupo: '',
    plan: '',
    tipoSolicitud: '',
    requisito: '',
    motivo: '',
    detalle: ''
  });

  useEffect(() => {
    const fetchUsuarioDetallado = async () => {
      if (!usuario?.idusuario) return;
      try {
        const res = await fetch(`http://localhost:5000/usuariodetallado/${usuario.idusuario}`);
        const data = await res.json();
        if (res.ok) {
          setFormValues({
            carnet: data.estudiante?.carnet || '',
            nombre: data.nombre || '',
            correo: data.correoinstitucional || '',
            carrera: data.estudiante?.carrera || '',
            sede: data.idsede || ''
          });
        } else {
          console.error('Error al cargar datos detallados:', data.error);
        }
      } catch (error) {
        console.error('Error de red al consultar datos detallados:', error);
      }
    };
    fetchUsuarioDetallado();
  }, [usuario]);

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

  const handleAcademicChange = (e) => {
    const { name, value } = e.target;
    setAcademicDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleMotivoChange = (e) => {
    const { name, value } = e.target;
    setAcademicDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const body = {
      carnet: formValues.carnet,
      nombre: formValues.nombre,
      correo: formValues.correo,
      carrera: formValues.carrera,
      idsede: formValues.sede,
      plandeestudio: academicDetails.plan,
      cursoalevantar: academicDetails.curso,
      requisitoalevantar: academicDetails.requisito,
      comentariosolicitud: academicDetails.motivo,
      otrodetalle: academicDetails.detalle,
      // idtiposolicitud, idregla pueden agregarse si los manejas en el frontend
    };
    try {
      const res = await fetch('http://localhost:5000/formularios/levantamientos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (res.ok) {
        alert('Solicitud enviada correctamente');
        setActiveStep(0);
      } else {
        alert('Error al enviar la solicitud: ' + (data.error || 'Error desconocido'));
      }
    } catch (error) {
      alert('Error de red al enviar la solicitud');
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>

      {/*--------------------------------*/}
      {/*           MENÚ LATERAL         */}
      {/*--------------------------------*/}
      <nav
        aria-label="Menú principal"
        style={{
          width: '250px',
          backgroundColor: '#ffffff',
          color: '#062043',
          padding: '32px 0',
          boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
          borderRight: '1px solid #ddd',
          height: '100vh'
        }}
      >
        {/* Logo institucional */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <img src={imagenRegistro} alt="Logo del Instituto Tecnológico de Costa Rica" style={{ height: '60px' }} />
        </Box>

        {/* Lista de navegación */}
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
                minHeight: '3.5rem',
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
            Levantamiento de requisitos y condición RN
          </Typography>

          <Box sx={{ backgroundColor: '#EAF0FF', p: 4, borderRadius: 2 }}>
            <Typography variant="h6" align="center" sx={{ mb: 3, fontWeight: 'bold', backgroundColor: '#DDE8FF', py: 1, borderRadius: 1 }}>
              Formulario solicitud de Levantamiento - Sede Cartago
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
                  <Typography component="legend" sx={{ fontWeight: 'bold', mb: 1 }}>Datos personales</Typography>

                  <Typography sx={{ mt: 2 }}>Carnet</Typography>
                  <TextField fullWidth sx={{ mb: 2 }} value={formValues.carnet} disabled />

                  <Typography>Nombre completo</Typography>
                  <TextField fullWidth sx={{ mb: 2 }} value={formValues.nombre} disabled />

                  <Typography>Correo electrónico</Typography>
                  <TextField fullWidth sx={{ mb: 2 }} value={formValues.correo} disabled />

                  <Typography>Carrera</Typography>
                  <TextField fullWidth sx={{ mb: 2 }} value={formValues.carrera} disabled />

                  <Typography>Sede</Typography>
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <Select value={formValues.sede} disabled>
                      <MenuItem value={1}>Cartago</MenuItem>
                      <MenuItem value={2}>San José</MenuItem>
                      <MenuItem value={3}>San Carlos</MenuItem>
                    </Select>
                  </FormControl>
                </fieldset>
              </form>
            )}

            {activeStep === 1 && (
              <form>
                <fieldset>
                  <Typography component="legend" sx={{ fontWeight: 'bold', mb: 1 }}>Detalles académicos</Typography>

                  <Typography>Seleccione el curso que necesita matricular</Typography>
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <Select name="curso" value={academicDetails.curso} onChange={handleAcademicChange}>
                      <MenuItem value={"CI1311"}>CI1311 - Introducción a la Programación</MenuItem>
                      <MenuItem value={"CI1330"}>CI1330 - Estructuras de Datos</MenuItem>
                      <MenuItem value={"CB1022"}>CB1022 - Cálculo Diferencial</MenuItem>
                    </Select>
                  </FormControl>

                  <Typography>Grupo</Typography>
                  <TextField fullWidth sx={{ mb: 2 }} name="grupo" value={academicDetails.grupo} onChange={handleAcademicChange} />

                  <Typography>Plan de estudio</Typography>
                  <TextField fullWidth sx={{ mb: 2 }} name="plan" value={academicDetails.plan} onChange={handleAcademicChange} />

                  <Typography>Tipo de solicitud</Typography>
                  <TextField fullWidth sx={{ mb: 2 }} name="tipoSolicitud" value={academicDetails.tipoSolicitud} onChange={handleAcademicChange} />

                  <Typography>Requisito a levantar</Typography>
                  <TextField fullWidth sx={{ mb: 2 }} name="requisito" value={academicDetails.requisito} onChange={handleAcademicChange} />
                </fieldset>
              </form>
            )}

            {activeStep === 2 && (
              <form>
                <fieldset>
                  <Typography component="legend" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Motivo de la solicitud
                  </Typography>

                  <Typography sx={{ mt: 2, mb: 2 }}>
                    Comentario por el que solicita el Levantamiento de Requisitos.
                  </Typography>

                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    sx={{ mb: 2 }}
                    name="motivo"
                    value={academicDetails.motivo}
                    onChange={handleMotivoChange}
                  />
                  <Typography sx={{ mt: 3 }}>Cualquier otro detalle que desee ampliar:</Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    sx={{ mb: 2 }}
                    name="detalle"
                    value={academicDetails.detalle}
                    onChange={handleMotivoChange}
                  />
                </fieldset>
              </form>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button
                variant="contained"
                onClick={handleBack}
                disabled={activeStep === 0}
                sx={{ backgroundColor: '#3b5998', textTransform: 'none', fontWeight: 'bold' }}
              >
                Atrás
              </Button>
              <Button
                variant="contained"
                onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
                sx={{ backgroundColor: '#3b5998', textTransform: 'none', fontWeight: 'bold' }}
              >
                {activeStep === steps.length - 1 ? 'Enviar solicitud' : 'Siguiente'}
              </Button>
            </Box>
          </Box>
        </Container>
      </main>
    </Box>
  );
};

export default FormularioLevantamiento;