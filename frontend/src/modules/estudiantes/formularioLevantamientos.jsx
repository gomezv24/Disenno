import React, { useState } from 'react';
import {
  Container, Typography, Box, TextField, Radio, RadioGroup,
  FormControlLabel, FormControl, FormLabel, Button, Stepper, Step, StepLabel
} from '@mui/material';
import imagenRegistro from '../../assets/logoTec.png';
import imagenUsuario from '../../assets/imagenUsuario.png';

const FormularioLevantamiento = () => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['Datos personales', 'Detalles académicos', 'Motivo de solicitud', 'Confirmación'];

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
            Levantamiento de requisitos y condición RN
          </Typography>
        </Box>
      </Box>

      {/*-------------------------------------------------------------------------------*/}
      {/*                             FORMULARIO PASO A PASO                             */}
      {/*-------------------------------------------------------------------------------*/}
      <Box sx={{ backgroundColor: '#EAF0FF', p: 4, borderRadius: 2 }}>
        
        {/* Título del formulario */}
        <Typography variant="h6" align="center" sx={{ mb: 3, fontWeight: 'bold', backgroundColor: '#DDE8FF', py: 1, borderRadius: 1 }}>
          Formulario solicitud de Levantamiento de requisitos y condición RN - Sede Cartago
        </Typography>

        {/* Stepper */}
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* Paso 0 */}
        {activeStep === 0 && (
          <Box>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <FormLabel>1. Sede a la que pertenece</FormLabel>
              <RadioGroup>
                <FormControlLabel value="Cartago" control={<Radio />} label="Cartago" />
                <FormControlLabel value="San José" control={<Radio />} label="San José" />
                <FormControlLabel value="San Carlos" control={<Radio />} label="San Carlos" />
                <FormControlLabel value="Limón" control={<Radio />} label="Limón" />
                <FormControlLabel value="Alajuela" control={<Radio />} label="Alajuela" />
              </RadioGroup>
            </FormControl>

            <TextField label="2. Ingrese el carnet" fullWidth sx={{ mb: 2 }} />
            <TextField label="3. Ingrese el Primer Apellido - Segundo Apellido - Nombre" fullWidth sx={{ mb: 2 }} />
            <TextField label="4. Correo electrónico para notificación" fullWidth sx={{ mb: 2 }} />

            <FormControl fullWidth sx={{ mb: 3 }}>
              <FormLabel>5. Seleccione el Plan de Estudio</FormLabel>
              <RadioGroup>
                <FormControlLabel value="anteriores" control={<Radio />} label="Planes Anteriores" />
                <FormControlLabel value="410" control={<Radio />} label="410" />
                <FormControlLabel value="411" control={<Radio />} label="411" />
                <FormControlLabel value="412" control={<Radio />} label="412" />
              </RadioGroup>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <FormLabel>6. Tipo de levantamiento a solicitar</FormLabel>
              <RadioGroup>
                <FormControlLabel value="Requisitos" control={<Radio />} label="Requisitos" />
                <FormControlLabel value="Condición RN" control={<Radio />} label="Condición RN" />
              </RadioGroup>
            </FormControl>
          </Box>
        )}

        {/* Botones de navegación */}
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
    </Container>
  );
};

export default FormularioLevantamiento;
