// src/modules/estudiantes/homePageEstudiantes.jsx

import React from 'react';
import { Container, Typography, Button, Box, Card, CardContent, TextField } from '@mui/material';
import imagenRegistro from '../../assets/logoTec.png';
import imagenUsuario from '../../assets/imagenUsuario.png';
import imagenInclu from '../../assets/imagenInclu.png';
import imagenLeva from '../../assets/imagenLeva.png';
import imagenReti from '../../assets/imagenReti.png';

const HomePageEstudiantes = () => {
  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      {/* Logo arriba y "Gestión de Fondos" debajo, usuario a la derecha */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 5 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1 }}>
          <img src={imagenRegistro} alt="TEC" style={{ height: '60px' }} />
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#062043', mt: 1 }}>
            Gestión de Fondos
          </Typography>
        </Box>
        <img src={imagenUsuario} alt="Usuario" style={{ height: '50px', borderRadius: '50%' }} />
      </Box>

      {/* Buscador grande y botón de seguimiento */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 5, flexWrap: 'wrap', gap: 2 }}>
        <TextField
          variant="outlined"
          placeholder="Buscar formularios o procesos..."
          size="medium"
          sx={{ flexGrow: 1, minWidth: '300px', maxWidth: '600px' }}
        />
        <Button variant="contained" sx={{ backgroundColor: '#062043', height: '56px' }}>
          Seguimiento
        </Button>
      </Box>

      {/* Tarjetas */}
      <Box sx={{ display: 'flex', gap: 5, flexWrap: 'wrap', justifyContent: 'center' }}>
        {/* Inclusión */}
        <Card sx={{ flex: '1 1 300px', maxWidth: '350px', p: 2 }}>
          <CardContent sx={{ textAlign: 'center' }}>
            <img src={imagenInclu} alt="Inclusión" style={{ width: '60px', marginBottom: '16px' }} />
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Inclusión a cursos
            </Typography>
            <Typography variant="body2" sx={{ mb: 3 }}>
              Solicita la incorporación a asignaturas cuando no has logrado matricular por situaciones específicas...
            </Typography>
            <Button variant="contained" size="small">Más información</Button>
          </CardContent>
        </Card>

        {/* Levantamiento */}
        <Card sx={{ flex: '1 1 300px', maxWidth: '350px', p: 2 }}>
          <CardContent sx={{ textAlign: 'center' }}>
            <img src={imagenLeva} alt="Levantamiento" style={{ width: '60px', marginBottom: '16px' }} />
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Levantamiento de requisitos y condición RN
            </Typography>
            <Typography variant="body2" sx={{ mb: 3 }}>
              Permite pedir levantamiento de requisitos o solicitar matrícula bajo condición especial RN...
            </Typography>
            <Button variant="contained" size="small">Más información</Button>
          </CardContent>
        </Card>

        {/* Retiro */}
        <Card sx={{ flex: '1 1 300px', maxWidth: '350px', p: 2 }}>
          <CardContent sx={{ textAlign: 'center' }}>
            <img src={imagenReti} alt="Retiro" style={{ width: '60px', marginBottom: '16px' }} />
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Retiro de cursos
            </Typography>
            <Typography variant="body2" sx={{ mb: 3 }}>
              Gestiona la solicitud para darte de baja de un curso previamente matriculado si así lo necesitas...
            </Typography>
            <Button variant="contained" size="small">Más información</Button>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default HomePageEstudiantes;
