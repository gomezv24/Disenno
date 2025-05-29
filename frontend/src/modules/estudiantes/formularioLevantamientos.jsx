//------------------------------------------------------------------------------
// FORMULARIO LEVANTAMIENTO
//
// Página principal del formulario de levantamientos
// Contiene una barra lateral accesible con navegación a funcionalidades clave
// como Inclusiones, Levantamientos, Retiros, Seguimiento y Perfil de Usuario.
// Contiene todos los campos necesarios para llenar la solicitud de levantamientos
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
  MenuItem,
  Select,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Snackbar
} from '@mui/material';

import { Link, useLocation } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

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
    plan: '',
    tipoSolicitud: '',
    requisito: '',
    motivo: '',
    detalle: ''
  });
  const [cursosDisponibles, setCursosDisponibles] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [mensajeExito, setMensajeExito] = useState(false);

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

    const fetchCursos = async () => {
      try {
        const res = await fetch('http://localhost:5000/cursos');
        const data = await res.json();
        if (res.ok) {
          setCursosDisponibles(data);
        } else {
          console.error('Error al cargar cursos:', data.error);
        }
      } catch (error) {
        console.error('Error de red al consultar cursos:', error);
      }
    };

    fetchUsuarioDetallado();
    fetchCursos();
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
        setMensajeExito(true);
        setMensaje('¡Solicitud enviada exitosamente! Pronto podrás ver el seguimiento en la sección correspondiente.');
        setActiveStep(0);
      } else {
        setMensaje('Error al enviar la solicitud: ' + (data.error || 'Error desconocido'));
      }
    } catch (error) {
      setMensaje('Error de red al enviar la solicitud');
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <a href="#contenido-principal" className="sr-only focus:not-sr-only" style={{ position: 'absolute', left: '-10000px' }}>Saltar al contenido principal</a>
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
      <main id="contenido-principal" style={{ flex: 1 }}>
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
            <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
              {steps.map((label, index) => (
                <Step key={label}><StepLabel>{label}</StepLabel></Step>
              ))}
            </Stepper>
            <form aria-labelledby={`paso-${activeStep}`}> {/* Paso accesible */}
              <Typography id={`paso-${activeStep}`} component="h2" variant="h6" sx={{ mb: 2 }}>{steps[activeStep]}</Typography>
              {activeStep === 0 && (
                <form>
                  <fieldset>
                    <legend className="visuallyhidden">Datos personales</legend>
                    <label htmlFor="carnet" className="visuallyhidden">Carnet</label>
                    <TextField id="carnet" fullWidth value={formValues.carnet} disabled sx={{ mb: 2 }} />
                    <label htmlFor="nombre" className="visuallyhidden">Nombre completo</label>
                    <TextField id="nombre" fullWidth value={formValues.nombre} disabled sx={{ mb: 2 }} />
                    <label htmlFor="correo" className="visuallyhidden">Correo electrónico</label>
                    <TextField id="correo" fullWidth value={formValues.correo} disabled sx={{ mb: 2 }} />
                    <label htmlFor="carrera" className="visuallyhidden">Carrera</label>
                    <TextField id="carrera" fullWidth value={formValues.carrera} disabled sx={{ mb: 2 }} />
                    <label htmlFor="sede" className="visuallyhidden">Sede</label>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <Select id="sede" value={formValues.sede} disabled inputProps={{ 'aria-label': 'Sede' }}>
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
                    <legend className="visuallyhidden">Detalles académicos</legend>
                    <label htmlFor="curso" className="visuallyhidden">Curso a matricular</label>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <Select id="curso" name="curso" value={academicDetails.curso} onChange={handleAcademicChange} inputProps={{ 'aria-label': 'Curso a matricular' }}>
                        {cursosDisponibles.map((curso) => (
                          <MenuItem key={curso.codigo} value={curso.codigo}>
                            {`${curso.codigo} - ${curso.nombre}`}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <label htmlFor="plan" className="visuallyhidden">Plan de estudio</label>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <Select id="plan" name="plan" value={academicDetails.plan} onChange={handleAcademicChange} inputProps={{ 'aria-label': 'Plan de estudio' }}>
                        <MenuItem value="410">410</MenuItem>
                        <MenuItem value="411">411</MenuItem>
                        <MenuItem value="412">412</MenuItem>
                      </Select>
                    </FormControl>
                    <label htmlFor="tipoSolicitud" className="visuallyhidden">Tipo de solicitud</label>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <Select id="tipoSolicitud" name="tipoSolicitud" value={academicDetails.tipoSolicitud} onChange={handleAcademicChange} inputProps={{ 'aria-label': 'Tipo de solicitud' }}>
                        <MenuItem value="Levantamiento de requisitos">Levantamiento de requisitos</MenuItem>
                        <MenuItem value="RN">RN</MenuItem>
                      </Select>
                    </FormControl>
                    <label htmlFor="requisito" className="visuallyhidden">Requisito a levantar</label>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <Select id="requisito" name="requisito" value={academicDetails.requisito} onChange={handleAcademicChange} inputProps={{ 'aria-label': 'Requisito a levantar' }}>
                        {cursosDisponibles.map((curso) => (
                          <MenuItem key={curso.codigo} value={curso.codigo}>
                            {`${curso.codigo} - ${curso.nombre}`}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </fieldset>
                </form>
              )}

              {activeStep === 2 && (
                <>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1, mt: 2 }}>Motivo de la solicitud</Typography>
                  <TextField
                    id="motivo"
                    name="motivo"
                    fullWidth
                    multiline
                    rows={3}
                    sx={{ mb: 2 }}
                    value={academicDetails.motivo}
                    onChange={handleMotivoChange}
                    InputLabelProps={{ shrink: false }}
                    label=""
                    placeholder="Motivo de la solicitud"
                  />
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1, mt: 2 }}>Detalle adicional</Typography>
                  <TextField
                    id="detalle"
                    name="detalle"
                    fullWidth
                    multiline
                    rows={2}
                    sx={{ mb: 2 }}
                    value={academicDetails.detalle}
                    onChange={handleMotivoChange}
                    InputLabelProps={{ shrink: false }}
                    label=""
                    placeholder="Detalle adicional"
                  />
                </>
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
            </form>
          </Box>
        </Container>
        <Snackbar
          open={mensajeExito}
          autoHideDuration={6000}
          onClose={() => setMensajeExito(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          ContentProps={{
            sx: { backgroundColor: '#43a047', color: 'white', display: 'flex', alignItems: 'center', fontWeight: 'bold', fontSize: 18 },
            role: 'alert'
          }}
          message={
            <span style={{ display: 'flex', alignItems: 'center' }}>
              <CheckCircleIcon sx={{ mr: 1, fontSize: 28 }} />
              {mensaje}
            </span>
          }
        />
        <footer style={{ textAlign: 'center', padding: '1rem', fontSize: '0.9rem' }}>
          <p>© 2025 Curso Diseño de software. Todos los derechos reservados.</p>
        </footer>
      </main>
    </Box>
  );
};

export default FormularioLevantamiento;