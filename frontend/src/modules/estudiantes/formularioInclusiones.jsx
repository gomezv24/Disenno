// Formulario de Inclusión Accesible
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
  ListItemText,
  Snackbar
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import PersonIcon from '@mui/icons-material/Person';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import imagenRegistro from '../../assets/logoTec.png';
import { UserContext } from '../../context/UserContext';

const FormularioInclusion = () => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['Datos personales', 'Detalles de la inclusión', 'Observaciones y validaciones', 'Confirmación'];
  const location = useLocation();
  const { usuario } = useContext(UserContext);
  const [mensaje, setMensaje] = useState('');
  const [mensajeExito, setMensajeExito] = useState(false);
  const [formValues, setFormValues] = useState({
    carnet: '', nombre: '', correo: '', telefono: '', carrera: '', sede: '', beca: '',
    cursoinclusion: '', grupoinclusion: '', profesor: '', otroscursosmatriculados: '',
    tienerequisitos: '', tienechoquehorario: '', tienecurson: '', consideraciones: ''
  });
  const [cursosDisponibles, setCursosDisponibles] = useState([]);

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
        setMensajeExito(true);
        setMensaje('¡Solicitud enviada exitosamente! Pronto podrás ver el seguimiento en la sección correspondiente.');
        setActiveStep(activeStep + 1);
      } else {
        setMensaje('Error al enviar: ' + data.error);
      }
    } catch (error) {
      setMensaje('Ocurrió un error al enviar');
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
      <a href="#contenido-principal" className="sr-only focus:not-sr-only" style={{ position: 'absolute', left: '-10000px' }}>Saltar al contenido principal</a>

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

      <main id="contenido-principal" style={{ flex: 1 }}>
        <Container sx={{ px: 5, py: 6 }}>
          <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>Formulario de Inclusión a Cursos</Typography>
          <Box sx={{ backgroundColor: '#EAF0FF', p: 4, borderRadius: 2 }}>
            <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
              {steps.map((label, index) => (
                <Step key={label}><StepLabel>{label}</StepLabel></Step>
              ))}
            </Stepper>

            <form aria-labelledby={`paso-${activeStep}`}> {/* Paso accesible */}
              <Typography id={`paso-${activeStep}`} component="h2" variant="h6" sx={{ mb: 2 }}>{steps[activeStep]}</Typography>

              {activeStep === 0 && (
                <>
                  <label htmlFor="carnet" className="visuallyhidden">Carnet</label>
                  <TextField id="carnet" fullWidth value={formValues.carnet} disabled sx={{ mb: 2 }} />
                  <label htmlFor="nombre" className="visuallyhidden">Nombre completo</label>
                  <TextField id="nombre" fullWidth value={formValues.nombre} disabled sx={{ mb: 2 }} />
                  <label htmlFor="correo" className="visuallyhidden">Correo electrónico</label>
                  <TextField id="correo" fullWidth value={formValues.correo} disabled sx={{ mb: 2 }} />
                  <label htmlFor="telefono" className="visuallyhidden">Teléfono</label>
                  <TextField id="telefono" fullWidth value={formValues.telefono} disabled sx={{ mb: 2 }} />
                  <label htmlFor="carrera" className="visuallyhidden">Carrera</label>
                  <TextField id="carrera" fullWidth value={formValues.carrera} disabled sx={{ mb: 2 }} />
                  <label htmlFor="sede" className="visuallyhidden">Sede</label>
                  <TextField id="sede" fullWidth value={formValues.sede} disabled sx={{ mb: 2 }} />
                  <label htmlFor="beca" className="visuallyhidden">Tipo de beca</label>
                  <Select id="beca" fullWidth value={formValues.beca} onChange={handleInput('beca')} sx={{ mb: 2 }} displayEmpty inputProps={{ 'aria-label': 'Tipo de beca' }}>
                    <MenuItem value="" disabled>Seleccione tipo de beca</MenuItem>
                    <MenuItem value={1}>Beca socioeconómica</MenuItem>
                    <MenuItem value={2}>Beca excelencia</MenuItem>
                    <MenuItem value={3}>Sin beca</MenuItem>
                  </Select>
                </>
              )}

              {activeStep === 1 && (
                <>
                  <label htmlFor="cursoinclusion" className="visuallyhidden">Curso a incluir</label>
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <Select
                      id="cursoinclusion"
                      value={formValues.cursoinclusion}
                      onChange={handleInput('cursoinclusion')}
                      displayEmpty
                      inputProps={{ 'aria-label': 'Curso a incluir' }}
                    >
                      <MenuItem value="" disabled>Seleccione curso</MenuItem>
                      {cursosDisponibles.map((curso) => (
                        <MenuItem key={curso.codigo} value={curso.codigo}>
                          {`${curso.codigo} - ${curso.nombre}`}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <label htmlFor="grupoinclusion" className="visuallyhidden">Grupo del curso</label>
                  <TextField id="grupoinclusion" fullWidth value={formValues.grupoinclusion} onChange={handleInput('grupoinclusion')} sx={{ mb: 2 }} placeholder="Grupo del curso" InputLabelProps={{ shrink: false }} />
                  <label htmlFor="profesor" className="visuallyhidden">Profesor</label>
                  <TextField id="profesor" fullWidth value={formValues.profesor} onChange={handleInput('profesor')} sx={{ mb: 2 }} placeholder="Profesor" InputLabelProps={{ shrink: false }} />
                  <label htmlFor="otroscursosmatriculados" className="visuallyhidden">Detalles de la inclusión</label>
                  <TextField
                    id="otroscursosmatriculados"
                    fullWidth
                    value={formValues.otroscursosmatriculados}
                    onChange={handleInput('otroscursosmatriculados')}
                    sx={{ mb: 2 }}
                    multiline
                    rows={2}
                    InputLabelProps={{ shrink: false }}
                    placeholder="Detalles de la inclusión"
                    aria-label="Detalles de la inclusión"
                  />
                </>
              )}

              {activeStep === 2 && (
                <>
                  <fieldset style={{ border: 0, margin: 0, padding: 0 }}>
                    <legend style={{ fontWeight: 'bold', marginBottom: 8 }}>¿Cumple con los requisitos?</legend>
                    <RadioGroup
                      aria-label="¿Cumple con los requisitos?"
                      name="tienerequisitos"
                      value={formValues.tienerequisitos}
                      onChange={handleInput('tienerequisitos')}
                      row
                    >
                      <FormControlLabel value="si" control={<Radio id="tienerequisitos-si" />} label={<label htmlFor="tienerequisitos-si">Sí</label>} />
                      <FormControlLabel value="no" control={<Radio id="tienerequisitos-no" />} label={<label htmlFor="tienerequisitos-no">No</label>} />
                    </RadioGroup>
                  </fieldset>
                  <fieldset style={{ border: 0, margin: 0, padding: 0 }}>
                    <legend style={{ fontWeight: 'bold', marginBottom: 8 }}>¿Tiene choque de horario?</legend>
                    <RadioGroup
                      aria-label="¿Tiene choque de horario?"
                      name="tienechoquehorario"
                      value={formValues.tienechoquehorario}
                      onChange={handleInput('tienechoquehorario')}
                      row
                    >
                      <FormControlLabel value="si" control={<Radio id="tienechoquehorario-si" />} label={<label htmlFor="tienechoquehorario-si">Sí</label>} />
                      <FormControlLabel value="no" control={<Radio id="tienechoquehorario-no" />} label={<label htmlFor="tienechoquehorario-no">No</label>} />
                    </RadioGroup>
                  </fieldset>
                  <fieldset style={{ border: 0, margin: 0, padding: 0 }}>
                    <legend style={{ fontWeight: 'bold', marginBottom: 8 }}>¿Tiene curso con condición RN superior a 3?</legend>
                    <RadioGroup
                      aria-label="¿Tiene curso con condición RN superior a 3?"
                      name="tienecurson"
                      value={formValues.tienecurson}
                      onChange={handleInput('tienecurson')}
                      row
                    >
                      <FormControlLabel value="si" control={<Radio id="tienecurson-si" />} label={<label htmlFor="tienecurson-si">Sí</label>} />
                      <FormControlLabel value="no" control={<Radio id="tienecurson-no" />} label={<label htmlFor="tienecurson-no">No</label>} />
                    </RadioGroup>
                  </fieldset>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1, mt: 2 }}>Consideraciones</Typography>
                  <TextField id="consideraciones" fullWidth label="" value={formValues.consideraciones} onChange={handleInput('consideraciones')} sx={{ mb: 2 }} multiline rows={3} InputLabelProps={{ shrink: false }} placeholder="Consideraciones" />
                </>
              )}

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                <Button variant="contained" disabled={activeStep === 0} onClick={handleBack} sx={{ backgroundColor: '#3b5998' }}>Atrás</Button>
                <Button variant="contained" onClick={activeStep === steps.length - 1 ? handleEnviar : handleNext} sx={{ backgroundColor: '#3b5998' }}>
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

export default FormularioInclusion;
