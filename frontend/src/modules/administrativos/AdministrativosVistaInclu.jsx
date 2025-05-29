import React from 'react';
import { Container, Button, Typography, Box, Table, TableBody, TableCell, Card, Divider, TableRow, Paper, Chip, CardContent, Avatar, Grid, CardHeader } from '@mui/material';
import { Delete, Visibility, Home, School, TrendingUp, ExitToApp, AssignmentTurnedIn } from '@mui/icons-material';
import imagenRegistro from '../../assets/logoTecAzul.png';
import imagenUsuario from '../../assets/imagenUsuario.png';
import { Link, useLocation } from 'react-router-dom';
import * as XLSX from 'xlsx';


const AdministrativosVista = () => {
  const location = useLocation();
  const { sol } = location.state || {};
  console.log("estudiante", sol);
  const student = {
    name: sol.nombre,
    carnet: sol.carnet,
    requestDate: sol.fecha,
    group: sol.grupo,
    course: sol.curso,
    professor: sol.profesor,
    email: sol.correo,
    status: sol.estado,
    program: sol.carrera,
    consideraciones: sol.consideraciones,
    requisitos: sol.requisitos,
    choquehorario: sol.choquehorario,
    beca: sol.beca,
    sede: sol.sede
  };


  const exportToExcel = () => {
    // Preparar los datos para exportar
    const datosExportar = [{
      "Nombre Estudiante": sol.nombre,
      Carnet: sol.carnet,
      "Fecha de Solicitud": sol.fecha,
      Grupo: sol.grupo,
      Curso: sol.curso,
      Profesor: sol.profesor,
      Correo: sol.correo,
      "Estado Solicitud": sol.estado,
      Carrera: sol.carrera,
      Consideraciones: sol.consideraciones,
      "Tiene requisitos": sol.requisitos,
      "Tiene choque horario": sol.choquehorario,
      Beca: sol.beca,
      Sede: sol.sede
    }];

    // Crear hoja de trabajo
    const ws = XLSX.utils.json_to_sheet(datosExportar);

    // Crear libro de trabajo
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "DatosInclusiones");

    // Exportar el archivo
    XLSX.writeFile(wb, "inclusiones_historicas.xlsx");
  };

  const colorEstado = (estado) => {
    if (estado === 'Pendiente') return { backgroundColor: '#FFE0B2', color: '#FB8C00', fontWeight: 'bold', borderRadius: '8px', px: 1, py: 0.5 };
    if (estado === 'Aprobado') return { backgroundColor: '#C8E6C9', color: '#388E3C', fontWeight: 'bold', borderRadius: '8px', px: 1, py: 0.5 };
    if (estado === 'Rechazado') return { backgroundColor: '#FFCDD2', color: '#D32F2F', fontWeight: 'bold', borderRadius: '8px', px: 1, py: 0.5 };
    if (estado === 'En revisión') return { backgroundColor: '#BBDEFB', color: '#1976D2', fontWeight: 'bold', borderRadius: '8px', px: 1, py: 0.5 };
    if (estado === 'Completado') return { backgroundColor: '#B2DFDB', color: '#00796B', fontWeight: 'bold', borderRadius: '8px', px: 1, py: 0.5 };
  };

  // Get initials for avatar
  const getInitials = (name) => {
    return name
      .split(" ")
      .slice(0, 2)
      .map((n) => n[0])
      .join("");
  };
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.paper' }}>
      {/* Header */}
      <Paper
        square
        elevation={0}
        sx={{
          bgcolor: '#082954',
          color: 'white',
          p: 2
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>

              <img src={imagenRegistro} alt="Logo del Instituto Tecnológico de Costa Rica" style={{ height: '60px' }} />
            </Box>
            <Button
              variant="contained"
              onClick={() => window.history.back()}
              sx={{
                bgcolor: 'white',
                color: '#062043',
                '&:hover': {
                  color: 'white',
                  bgcolor: '#265491'
                }
              }}
            >
              Volver
            </Button>
          </Box>
        </Container>
      </Paper>

      {/* Main content */}
      <Container maxWidth="lg" sx={{ p: 4 }}>
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" fontWeight="bold" color="#062043">
            Detalles de la solicitud
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Información detallada del estudiante y su solicitud
          </Typography>
        </Box>
        <Card variant="outlined">
          <CardHeader
            title={
              <Typography variant="h6" fontWeight="semibold" color="#062043">
                Información de la solicitud
              </Typography>
            }
            action={
              <Chip
                label={student.status}
                variant="filled"
                sx={colorEstado(sol.estado)}
              />
            }
            sx={{
              bgcolor: '#f5f7fa',
              borderBottom: '1px solid',
              borderColor: 'divider'
            }}
          />
          <CardContent sx={{ p: 6 }}>
            {/* datos de la solicitud */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, mb: 6 }}>
              <Avatar
                sx={{
                  bgcolor: '#1a3a73',
                  width: 64,
                  height: 64,
                  fontSize: '1.5rem'
                }}
              >
                {getInitials(student.name)}
              </Avatar>
              <Box>
                <Typography variant="h5" fontWeight="medium">
                  {student.name}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {student.email}
                </Typography>
              </Box>
            </Box>

            {/* Student details */}
            <Grid container spacing={6}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" fontWeight="medium" color="#1a3a73" mb={4}>
                  Información del Estudiante
                </Typography>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ color: 'text.secondary', py: 2 }}>Carnet:</TableCell>
                      <TableCell sx={{ fontWeight: 'medium', py: 2 }}>{student.carnet}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ color: 'text.secondary', py: 2 }}>Carrera:</TableCell>
                      <TableCell sx={{ fontWeight: 'medium', py: 2 }}>{student.program}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ color: 'text.secondary', py: 2 }}>Sede:</TableCell>
                      <TableCell sx={{ fontWeight: 'medium', py: 2 }}>{student.sede}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ color: 'text.secondary', py: 2 }}>Beca:</TableCell>
                      <TableCell sx={{ fontWeight: 'medium', py: 2 }}>{student.beca}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h6" fontWeight="medium" color="#1a3a73" mb={4}>
                  Información de Curso
                </Typography>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ color: 'text.secondary', py: 2 }}>Fecha de Solicitud:</TableCell>
                      <TableCell sx={{ fontWeight: 'medium', py: 2 }}>{student.requestDate}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ color: 'text.secondary', py: 2 }}>Curso:</TableCell>
                      <TableCell sx={{ fontWeight: 'medium', py: 2 }}>{student.course}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ color: 'text.secondary', py: 2 }}>Grupo:</TableCell>
                      <TableCell sx={{ fontWeight: 'medium', py: 2 }}>{student.group}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ color: 'text.secondary', py: 2 }}>Profesor:</TableCell>
                      <TableCell sx={{ fontWeight: 'medium', py: 2 }}>{student.professor}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ color: 'text.secondary', py: 2 }}>Requisitos:</TableCell>
                      <TableCell sx={{ fontWeight: 'medium', py: 2 }}>{student.requisitos}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ color: 'text.secondary', py: 2 }}>Choque de horario:</TableCell>
                      <TableCell sx={{ fontWeight: 'medium', py: 2 }}>{student.choquehorario}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ color: 'text.secondary', py: 2 }}>Consideraciones:</TableCell>
                      <TableCell sx={{ fontWeight: 'medium', py: 2 }}>{student.consideraciones}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Grid>
            </Grid>
            <Box sx={{ mt: 8, display: 'flex', gap: 4 }}>

              <Button
                variant="outlined"
                onClick={exportToExcel}
                sx={{
                  color: '#1a3a73',
                  borderColor: '#1a3a73',
                  '&:hover': {
                    bgcolor: '#f5f7fa'
                  }
                }}
              >
                Exportar Datos
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
      <footer style={{ textAlign: 'center', padding: '1rem', fontSize: '0.9rem' }}>
        <p>© 2025 Curso Diseño de software. Todos los derechos reservados.</p>
      </footer>
    </Box>
  );

}
export default AdministrativosVista;