// src/modules/estudiantes/PageSeguimiento.jsx

import React from 'react';
import { Container, Typography, Box, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Delete, Visibility } from '@mui/icons-material';
import imagenRegistro from '../../assets/logoTec.png';
import imagenUsuario from '../../assets/imagenUsuario.png';

const PageSeguimiento = () => {
  const solicitudes = [
    { tipo: 'Inclusión', semestre: 'IS-2025', curso: 'IC1803 TALLER DE PROGRAMACION (grupos 1, 2)', estado: 'Pendiente' },
    { tipo: 'Inclusión', semestre: 'IS-2025', curso: 'IC1803 TALLER DE PROGRAMACION (grupos 1, 2)', estado: 'Aprobada' },
    { tipo: 'Inclusión', semestre: 'IS-2025', curso: 'IC1803 TALLER DE PROGRAMACION (grupos 1, 2)', estado: 'Rechazada' },
    { tipo: 'Inclusión', semestre: 'IS-2025', curso: 'IC1803 TALLER DE PROGRAMACION (grupos 1, 2)', estado: 'Aprobada' },
    { tipo: 'Inclusión', semestre: 'IS-2025', curso: 'IC1803 TALLER DE PROGRAMACION (grupos 1, 2)', estado: 'Pendiente' },
    { tipo: 'Inclusión', semestre: 'IS-2025', curso: 'IC1803 TALLER DE PROGRAMACION (grupos 1, 2)', estado: 'Aprobada' },
    { tipo: 'Inclusión', semestre: 'IS-2025', curso: 'IC1803 TALLER DE PROGRAMACION (grupos 1, 2)', estado: 'Pendiente' }
  ];

  const colorEstado = (estado) => {
    if (estado === 'Pendiente') return { backgroundColor: '#FFE0B2', color: '#FB8C00', fontWeight: 'bold', borderRadius: '8px', px: 1, py: 0.5 };
    if (estado === 'Aprobada') return { backgroundColor: '#C8E6C9', color: '#388E3C', fontWeight: 'bold', borderRadius: '8px', px: 1, py: 0.5 };
    if (estado === 'Rechazada') return { backgroundColor: '#FFCDD2', color: '#D32F2F', fontWeight: 'bold', borderRadius: '8px', px: 1, py: 0.5 };
  };

  return (
    <Container disableGutters sx={{ maxWidth: '1400px', mx: 'auto', px: 2, py: 6 }}>
      
      {/* LOGO Y TEXTO */}
      <Box sx={{ mb: 5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <img src={imagenRegistro} alt="TEC" style={{ height: '60px' }} />
          <img src={imagenUsuario} alt="Usuario" style={{ height: '60px', borderRadius: '50%' }} />
        </Box>
        <Box sx={{ mt: 5 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#062043' }}>
            Seguimiento de Formularios Académicos
          </Typography>
        </Box>
      </Box>

      {/* BUSCADOR */}
      <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2, mb: 5 }}>
        <TextField
          variant="outlined"
          placeholder="Buscar formularios..."
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
      </Box>

      {/* TABLA */}
      <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#E3EAFD' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Tipo de solicitud</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Semestre</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Curso</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Estado</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {solicitudes.map((sol, index) => (
              <TableRow key={index}>
                <TableCell>{sol.tipo}</TableCell>
                <TableCell>{sol.semestre}</TableCell>
                <TableCell>{sol.curso}</TableCell>
                <TableCell>
                  <Box sx={colorEstado(sol.estado)}>
                    {sol.estado}
                  </Box>
                </TableCell>
                <TableCell>
                  <IconButton color="error">
                    <Delete />
                  </IconButton>
                  <IconButton color="primary">
                    <Visibility />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </Container>
  );
};

export default PageSeguimiento;
