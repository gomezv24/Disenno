// src/modules/estudiantes/HomePageLevantamientos.jsx

import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import imagenRegistro from '../../assets/logoTec.png';
import imagenUsuario from '../../assets/imagenUsuario.png';
import { useNavigate } from 'react-router-dom';


const HomePageLevantamientos = () => {
  const navigate = useNavigate(); // ✅ INICIALIZADO AQUÍ
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
            Levantamiento de requisitos y condición RN
          </Typography>
        </Box>
      </Box>

      {/*-------------------------------------------------------------------------------*/}
      {/*                           DESCRIPCIÓN GENERAL                                 */}
      {/*-------------------------------------------------------------------------------*/}
      <Typography sx={{ mb: 2 }}>
        Solicita el levantamiento de requisitos o condición RN para cursos específicos del II Semestre 2024.
      </Typography>

      {/*-------------------------------------------------------------------------------*/}
      {/*                        INFORMACIÓN IMPORTANTE                                 */}
      {/*-------------------------------------------------------------------------------*/}
      <Box sx={{ backgroundColor: '#E0E7FF', p: 2, borderRadius: 2, mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>Información importante</Typography>
        <ul>
          <li>Los cursos listados en el formulario son los únicos autorizados para levantamiento de requisitos.</li>
          <li>Existe una opción para solicitar levantamiento en otros cursos, evaluada caso por caso.</li>
          <li>No debe usarse este formulario para Práctica Profesional.</li>
        </ul>
      </Box>

      {/*-------------------------------------------------------------------------------*/}
      {/*                            FECHAS Y CONSULTAS                                  */}
      {/*-------------------------------------------------------------------------------*/}

      {/* Periodo de solicitud */}
      <Typography variant="h6" sx={{ mt: 4, mb: 1, fontWeight: 'bold' }}>Periodo de solicitud</Typography>
      <Typography sx={{ mb: 2 }}>
        27 de junio de 2024 al 28 de junio de 2024 (hasta las 2:00 p.m.)
      </Typography>

      {/* Importante */}
      <Typography variant="h6" sx={{ mt: 4, mb: 1, fontWeight: 'bold' }}>Importante</Typography>
      <Typography sx={{ mb: 2 }}>
        No se recibirán solicitudes fuera del periodo establecido.
      </Typography>

      {/* Consultas */}
      <Typography variant="h6" sx={{ mt: 4, mb: 1, fontWeight: 'bold' }}>Consultas</Typography>
      <Typography>
        Coordinar sesión escribiendo a: <b>eshuman@itcr.ac.cr</b>
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
            px: 8, // más ancho
            fontSize: '1rem'
          }}
          onClick={() => navigate('/formulario-levantamiento')}
        >
          formulario
        </Button>
      </Box>

    </Container>
  );
};

export default HomePageLevantamientos;
