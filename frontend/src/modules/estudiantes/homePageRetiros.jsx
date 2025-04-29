// src/modules/estudiantes/HomePageRetiros.jsx

import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import imagenRegistro from '../../assets/logoTec.png';
import imagenUsuario from '../../assets/imagenUsuario.png';

const HomePageRetiros = () => {
  return (
    <Container disableGutters sx={{ maxWidth: '1400px', mx: 'auto', px: 2, py: 6 }}>
      
      {/*-------------------------------------------------------------------------------*/}
      {/*                             LOGO Y TEXTO                                      */}
      {/*-------------------------------------------------------------------------------*/}
      <Box sx={{ mb: 5 }}>
        {/* Fila superior: logo + usuario */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <img src={imagenRegistro} alt="TEC" style={{ height: '60px' }} />
          <img src={imagenUsuario} alt="Usuario" style={{ height: '60px', borderRadius: '50%' }} />
        </Box>

        {/* Fila inferior: texto alineado a la izquierda */}
        <Box sx={{ mt: 5 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#062043' }}>
            Retiro de cursos
          </Typography>
        </Box>
      </Box>

      {/*-------------------------------------------------------------------------------*/}
      {/*                           DESCRIPCIÓN GENERAL                                 */}
      {/*-------------------------------------------------------------------------------*/}
      <Typography sx={{ mb: 2 }}>
        El proceso de retiro permite a estudiantes solicitar la baja de asignaturas matriculadas durante el semestre, por razones académicas o personales.
      </Typography>

      {/*-------------------------------------------------------------------------------*/}
      {/*                        INFORMACIÓN IMPORTANTE                                 */}
      {/*-------------------------------------------------------------------------------*/}
      <Box sx={{ backgroundColor: '#E0E7FF', p: 2, borderRadius: 2, mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>Información importante</Typography>
        <ul>
          <li>Los retiros son posibles únicamente entre la semana 1 y la semana 6 del semestre.</li>
          <li>Después de la semana 6, el retiro no será gratuito y podría generar cargos adicionales.</li>
          <li>El formulario es gestionado directamente por el Departamento de Admisión y Registro.</li>
        </ul>
      </Box>

      {/*-------------------------------------------------------------------------------*/}
      {/*                       SOLICITUD DE RETIRO DE CURSOS                            */}
      {/*-------------------------------------------------------------------------------*/}
      <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 4, mb: 1 }}>
        Solicitud de retiro de cursos
      </Typography>

      <Typography sx={{ mb: 2 }}>
        <a href="https://www.tec.ac.cr/form/webform-26941" target="_blank" rel="noopener noreferrer" style={{ color: '#3b5998', fontWeight: 'bold' }}>
          https://www.tec.ac.cr/form/webform-26941
        </a>
      </Typography>

      {/*-------------------------------------------------------------------------------*/}
      {/*                             BOTÓN FORMULARIO                                   */}
      {/*-------------------------------------------------------------------------------*/}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          size="large"
          sx={{
            mt: 5,
            backgroundColor: '#3b5998',
            textTransform: 'none',
            fontWeight: 'bold',
            px: 8,
            fontSize: '1rem'
          }}
        >
          formulario
        </Button>
      </Box>

    </Container>
  );
};

export default HomePageRetiros;
