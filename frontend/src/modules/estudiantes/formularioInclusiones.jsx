import React, { useState } from 'react';
import { Container, Typography, Box, Radio, RadioGroup, FormControlLabel, TextField, Button, Stepper, Step, StepLabel } from '@mui/material';
import imagenRegistro from '../../assets/logoTec.png';
import imagenUsuario from '../../assets/imagenUsuario.png';

const FormularioInclusiones = () => {
  const [formData, setFormData] = useState({
    sede: '',
    carnet: '',
    nombre: '',
    correo: '',
    tipoCurso: '',
    motivo: '',
  });

  const [activeStep, setActiveStep] = useState(0);
  const steps = ['Datos generales', 'Detalles de la inclusión', 'Confirmación'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  return (
    <Container disableGutters sx={{ maxWidth: '1400px', mx: 'auto', px: 2, py: 6 }}>
      
      {/*-------------------------------------------------------------------------------*/}
      {/*                             LOGO Y TEXTO                                      */}
      {/*-------------------------------------------------------------------------------*/}
      <Box sx={{ mb: 5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <img src={imagenRegistro} alt="TEC" style={{ height: '60px' }} />
          <img src={imagenUsuario} alt="Usuario" style={{ height: '60px', borderRadius: '50%' }} />
        </Box>

        <Box sx={{ mt: 5 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#062043' }}>
            Inclusión a cursos
          </Typography>
        </Box>
      </Box>

      {/*-------------------------------------------------------------------------------*/}
      {/*                             FORMULARIO PASO A PASO                             */}
      {/*-------------------------------------------------------------------------------*/}
      <Box sx={{ backgroundColor: '#EEF3FF', p: 4, borderRadius: 2 }}>
        
        {/* Título del formulario */}
        <Typography variant="h6" align="center" sx={{ mb: 3, fontWeight: 'bold', backgroundColor: '#DDE8FF', py: 1, borderRadius: 1 }}>
          Formulario solicitud de Inclusión a cursos - Sede Cartago
        </Typography>

        {/* Stepper */}
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* Paso 1: Datos generales */}
        {activeStep === 0 && (
          <Box>
            <Typography sx={{ mb: 1 }}>1. Sede a la que pertenece</Typography>
            <RadioGroup name="sede" value={formData.sede} onChange={handleChange}>
              <FormControlLabel value="Cartago" control={<Radio />} label="Cartago" />
              <FormControlLabel value="San José" control={<Radio />} label="San José" />
              <FormControlLabel value="San Carlos" control={<Radio />} label="San Carlos" />
              <FormControlLabel value="Limón" control={<Radio />} label="Limón" />
              <FormControlLabel value="Alajuela" control={<Radio />} label="Alajuela" />
            </RadioGroup>

            <TextField fullWidth label="Ingrese el carnet" name="carnet" sx={{ my: 2 }} value={formData.carnet} onChange={handleChange} />
            <TextField fullWidth label="Ingrese el nombre completo" name="nombre" sx={{ mb: 2 }} value={formData.nombre} onChange={handleChange} />
            <TextField fullWidth label="Correo electrónico para notificación" name="correo" sx={{ mb: 2 }} value={formData.correo} onChange={handleChange} />

            <Button variant="contained" fullWidth onClick={handleNext} sx={{ backgroundColor: '#3b5998', fontWeight: 'bold', textTransform: 'none', mt: 3 }}>
              siguiente
            </Button>
          </Box>
        )}

        {/* Paso 2: Detalles de inclusión */}
        {activeStep === 1 && (
          <Box>
            <Typography sx={{ mb: 1 }}>2. Tipo de curso al que desea incluirse</Typography>
            <RadioGroup name="tipoCurso" value={formData.tipoCurso} onChange={handleChange}>
              <FormControlLabel value="Curso regular" control={<Radio />} label="Curso regular" />
              <FormControlLabel value="Curso especial" control={<Radio />} label="Curso especial (recuperación, extensión, etc.)" />
            </RadioGroup>

            <Typography sx={{ mt: 3, mb: 1 }}>3. Motivo de la solicitud</Typography>
            <TextField
              fullWidth
              name="motivo"
              label="Describa brevemente la razón por la que solicita la inclusión"
              multiline
              minRows={4}
              value={formData.motivo}
              onChange={handleChange}
            />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              <Button variant="outlined" onClick={handleBack}>
                atrás
              </Button>
              <Button variant="contained" onClick={handleNext} sx={{ backgroundColor: '#3b5998', fontWeight: 'bold', textTransform: 'none' }}>
                siguiente
              </Button>
            </Box>
          </Box>
        )}

        {/* Paso 3: Confirmación */}
        {activeStep === 2 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Confirmación de datos
            </Typography>
            <pre>{JSON.stringify(formData, null, 2)}</pre>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              <Button variant="outlined" onClick={handleBack}>
                atrás
              </Button>
              <Button variant="contained" sx={{ backgroundColor: '#3b5998', fontWeight: 'bold', textTransform: 'none' }}>
                enviar solicitud
              </Button>
            </Box>
          </Box>
        )}

      </Box>
      
    </Container>
  );
};

export default FormularioInclusiones;
