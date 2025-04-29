// src/modules/estudiantes/HomePageInclusiones.jsx

import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import imagenRegistro from '../../assets/logoTec.png';
import imagenUsuario from '../../assets/imagenUsuario.png';
import { useNavigate } from 'react-router-dom';


const HomePageInclusiones = () => {
    const navigate = useNavigate();

    
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
            Inclusión a cursos
          </Typography>
        </Box>
      </Box>

      {/*-------------------------------------------------------------------------------*/}
      {/*                         DESCRIPCIÓN GENERAL                                   */}
      {/*-------------------------------------------------------------------------------*/}
      <Typography sx={{ mb: 2 }}>
        El proceso de inclusión permite ocupar espacios disponibles en algunos grupos tras el periodo de matrícula. 
        Solo muestra los cursos con cupo disponible para solicitar una inclusión. Las solicitudes serán procesadas tras el cierre del formulario.
      </Typography>

      {/*-------------------------------------------------------------------------------*/}
      {/*                         INFORMACIÓN IMPORTANTE                                */}
      {/*-------------------------------------------------------------------------------*/}
      <Box sx={{ backgroundColor: '#E0E7FF', p: 2, borderRadius: 2, mb: 2 }}>
        <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>Información importante</Typography>
        <ul>
          <li>La solicitud debe completarse en su totalidad; datos falsos o incompletos no serán tramitados.</li>
          <li>La existencia de cupo no garantiza la aprobación de la inclusión.</li>
          <li>No se aprobarán solicitudes que generen choques de horario o excedan el límite de créditos permitidos.</li>
          <li>Al enviar la solicitud, autoriza a la Escuela de Ingeniería en Computación a matricularlo en caso de asignación de cupo.</li>
        </ul>
      </Box>

      {/*-------------------------------------------------------------------------------*/}
      {/*                         FECHAS Y CONSULTAS                                    */}
      {/*-------------------------------------------------------------------------------*/}

      {/* Periodo de solicitud */}
      <Typography variant="h6" sx={{ mt: 4, mb: 1, fontWeight: 'bold' }}>Periodo de solicitud</Typography>
      <Typography sx={{ mb: 2 }}>
        27 de junio de 2024 al 28 de junio de 2024 (hasta las 2:00 p.m.)
      </Typography>

      {/* Publicación de resultados */}
      <Typography variant="h6" sx={{ mt: 4, mb: 1, fontWeight: 'bold' }}>Publicación de resultados</Typography>
      <Typography sx={{ mb: 2 }}>
        17 de julio de 2024
      </Typography>

      {/* Consultas */}
      <Typography variant="h6" sx={{ mt: 4, mb: 1, fontWeight: 'bold' }}>Consultas</Typography>
      <Typography>Dudas generales: <b>bdittel@itcr.ac.cr</b></Typography>
      <Typography>Situaciones particulares: <b>eshuman@itcr.ac.cr</b> (se atenderán tras el cierre del formulario).</Typography>

      {/*-------------------------------------------------------------------------------*/}
      {/*                          BOTÓN FORMULARIO                                     */}
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
            onClick={() => navigate('/formulario-inclusiones')}
            >
            Formulario
        </Button>
      </Box>

    </Container>
  );
};

export default HomePageInclusiones;
