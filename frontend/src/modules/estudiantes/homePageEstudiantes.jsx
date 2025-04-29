// src/modules/estudiantes/HomePageEstudiantes.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Box, Card, CardContent, TextField } from '@mui/material';
import imagenRegistro from '../../assets/logoTec.png';
import imagenUsuario from '../../assets/imagenUsuario.png';
import imagenInclu from '../../assets/imagenInclu.png';
import imagenLeva from '../../assets/imagenLeva.png';
import imagenReti from '../../assets/imagenReti.png';

const HomePageEstudiantes = () => {
  return (
    <Container disableGutters sx={{ maxWidth: '1400px', mx: 'auto', px: -20, py: 6 }}>

      
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
            Gestión de Fondos
          </Typography>
        </Box>
      </Box>

      {/*-------------------------------------------------------------------------------*/}
      {/*                         BUSCADOR Y BOTONES                                    */}
      {/*-------------------------------------------------------------------------------*/}
      <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2, mb: 5 }}>
        <TextField
          variant="outlined"
          placeholder="Buscar formularios o procesos..."
          size="medium"
          sx={{ flexGrow: 1, minWidth: '700px', maxWidth: '1000px', height: '56px' }}
        />

        <Button
          variant="contained"
          sx={{
            width: '200px',
            height: '56px',
            backgroundColor: '#3b5998',
            textTransform: 'none',
            fontWeight: 'bold'
          }}
        >
          Buscar
        </Button>

        <Button
        component={Link}
        to="/seguimiento"  
        variant="contained"
        sx={{
          width: '200px',
          height: '56px',
          backgroundColor: '#3b5998',
          textTransform: 'none',
          fontWeight: 'bold'
        }}
      >
        Seguimiento
      </Button>
      </Box>

      {/*-------------------------------------------------------------------------------*/}
      {/*                                  TARJETAS                                     */}
      {/*-------------------------------------------------------------------------------*/}
      <Box sx={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'flex-start' }}>

        {/*-------------------------------------------------------------------------------*/}
        {/*                               Tarjeta Inclusión                               */}
        {/*-------------------------------------------------------------------------------*/}
        <Card sx={{ width: '320px', p: 3 }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>

            {/* Ícono centrado */}
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <img src={imagenInclu} alt="Inclusión" style={{ width: '50px' }} />
            </Box>

            {/* Títulos a la izquierda */}
            <Box sx={{ width: '100%', textAlign: 'left' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Inclusión a cursos
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ fontSize: '0.85rem' }}>
                Proceso de inclusión a cursos no matriculados
              </Typography>
            </Box>

            {/* Texto principal */}
            <Typography variant="body2" sx={{ mt: 2, mb: 2, textAlign: 'justify' }}>
              La inclusión a cursos es un proceso mediante el cual los estudiantes pueden solicitar la incorporación a asignaturas en las que no lograron matricularse durante los períodos de matrícula ordinaria o extraordinaria. Esta opción está destinada a casos específicos y debe ser gestionada dentro del plazo establecido por la institución.
            </Typography>

            {/* Fecha destacada */}
            <Typography variant="body2" sx={{ fontWeight: 'bold', mt: 1 }}>
              Fecha de inclusiones: 15 de febrero del 2025
            </Typography>

            {/* Botón ancho */}
            <Button
              component={Link}
              to="/inclusiones"
              variant="contained"
              size="small"
              fullWidth
              sx={{
                backgroundColor: '#3b5998',
                textTransform: 'none',
                fontWeight: 'bold',
                mt: 3
              }}
            >
              Más información
            </Button>

          </CardContent>
        </Card>

        {/*-------------------------------------------------------------------------------*/}
        {/*                         Tarjeta Levantamiento                                 */}
        {/*-------------------------------------------------------------------------------*/}
        <Card sx={{ width: '320px', p: 3 }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>

            {/* Ícono centrado */}
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <img src={imagenLeva} alt="Levantamiento" style={{ width: '50px' }} />
            </Box>

            {/* Títulos a la izquierda */}
            <Box sx={{ width: '100%', textAlign: 'left' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Levantamiento de requisitos 
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ fontSize: '0.85rem' }}>
                Solicitud de levantamiento de requisitos o condición especial
              </Typography>
            </Box>

            {/* Texto principal */}
            <Typography variant="body2" sx={{ mt: 2, mb: 2, textAlign: 'justify' }}>
              Permite solicitar el levantamiento de un requisito académico o la matrícula bajo condición especial RN. Las solicitudes son evaluadas caso por caso conforme a la normativa vigente y criterios académicos establecidos por la institución.
            </Typography>

            {/* Fecha destacada */}
            <Typography variant="body2" sx={{ fontWeight: 'bold', mt: 1 }}>
              Fecha de solicitudes: 27 y 28 de junio del 2024
            </Typography>

            {/* Botón ancho */}
            <Button
              component={Link}
              to="/levantamientos"
              variant="contained"
              size="small"
              fullWidth
              sx={{
                backgroundColor: '#3b5998',
                textTransform: 'none',
                fontWeight: 'bold',
                mt: 3
              }}
            >
              Más información
            </Button>

          </CardContent>
        </Card>

        {/*-------------------------------------------------------------------------------*/}
        {/*                               Tarjeta Retiro                                  */}
        {/*-------------------------------------------------------------------------------*/}
        <Card sx={{ width: '320px', p: 3 }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>

            {/* Ícono centrado */}
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <img src={imagenReti} alt="Retiro" style={{ width: '50px' }} />
            </Box>

            {/* Títulos a la izquierda */}
            <Box sx={{ width: '100%', textAlign: 'left' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Retiro de cursos
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ fontSize: '0.85rem' }}>
                Proceso para solicitar el retiro de asignaturas
              </Typography>
            </Box>

            {/* Texto principal */}
            <Typography variant="body2" sx={{ mt: 2, mb: 2, textAlign: 'justify' }}>
              El retiro de cursos permite a los estudiantes darse de baja de una asignatura previamente matriculada, por razones académicas, personales o administrativas. Se debe realizar en los plazos establecidos para evitar costos adicionales o impactos en el historial académico.
            </Typography>

            {/* Fecha destacada */}
            <Typography variant="body2" sx={{ fontWeight: 'bold', mt: 1 }}>
              Fecha límite de retiro: Semana 6 del semestre
            </Typography>

            {/* Botón ancho */}
            <Button
              component={Link}
              to="/retiros"
              variant="contained"
              size="small"
              fullWidth
              sx={{
                backgroundColor: '#3b5998',
                textTransform: 'none',
                fontWeight: 'bold',
                mt: 3
              }}
            >
              Más información
            </Button>

          </CardContent>
        </Card>

      </Box>






    </Container>
  );
};

export default HomePageEstudiantes;
