import React from 'react';
import {
  Container, Button, Typography, Box, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton, List, ListItem, ListItemIcon, ListItemText,
  Tabs, Tab, TablePagination
} from '@mui/material';
import {
  Delete, Visibility, Home, School, TrendingUp, ExitToApp, AssignmentTurnedIn,
  Download as DownloadIcon
} from '@mui/icons-material';
import imagenRegistro from '../../assets/logoTec.png';
import imagenUsuario from '../../assets/imagenUsuario.png';
import GroupIcon from '@mui/icons-material/Group';
import SchoolIcon from '@mui/icons-material/School';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { informacion } from './Funciones/historicoLev';

const AdministradorHistLev = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [value, setValue] = React.useState('1');
  const [solicitudes, setSolicitudes] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [filteredSolicitudes, setFilteredSolicitudes] = React.useState([]);
  const [tabValue, setTabValue] = React.useState('1');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const cargarDatos = async (tipo) => {
    try {
      setLoading(true);
      const datos = await informacion(tipo);
      setSolicitudes(datos);
      setFilteredSolicitudes(datos);
      setError(null);
    } catch (err) {
      setError(err.message);
      setSolicitudes([]);
      setFilteredSolicitudes([]);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    cargarDatos(value);
  }, [value]);

  React.useEffect(() => {
    if (tabValue === '1') {
      setFilteredSolicitudes(solicitudes);
    } else {
      const estadoMap = {
        '2': 'Pendiente',
        '3': 'Aprobado',
        '4': 'Rechazado',
      };
      const filtered = solicitudes.filter(sol => sol.estado === estadoMap[tabValue]);
      setFilteredSolicitudes(filtered);
    }
    setPage(0);
  }, [tabValue, solicitudes]);

  const menuItems = [
    { text: 'Manejo de Usuarios', icon: <GroupIcon />, path: '/administrador' },
    { text: 'Inclusiones', icon: <SchoolIcon />, path: '/administrador/inclusiones' },
    { text: 'Levantamientos de Requisitos y RN', icon: <TrendingUpIcon />, path: '/administrador/levantamientos' }
  ];

  const colorEstado = (estado) => {
    if (estado === 'Pendiente') return { backgroundColor: '#FFE0B2', color: '#FB8C00', fontWeight: 'bold', borderRadius: '8px', px: 1, py: 0.5 };
    if (estado === 'Aprobado') return { backgroundColor: '#C8E6C9', color: '#388E3C', fontWeight: 'bold', borderRadius: '8px', px: 1, py: 0.5 };
    if (estado === 'Rechazado') return { backgroundColor: '#FFCDD2', color: '#D32F2F', fontWeight: 'bold', borderRadius: '8px', px: 1, py: 0.5 };
    if (estado === 'En revisión') return { backgroundColor: '#BBDEFB', color: '#1976D2', fontWeight: 'bold', borderRadius: '8px', px: 1, py: 0.5 };
    if (estado === 'Completado') return { backgroundColor: '#B2DFDB', color: '#00796B', fontWeight: 'bold', borderRadius: '8px', px: 1, py: 0.5 };
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const exportToExcel = () => {
    const datosExportar = filteredSolicitudes.map(sol => ({
      "Nombre Estudiante": sol.nombre || '',
      Carnet: sol.carnet || '',
      "Fecha de Solicitud": sol.fecha || '',
      "Curso a matricular": sol.curso || '',
      "Requisito a levantar": sol.requisito || '',
      Estado: sol.estado || '',
      Correo: sol.correo || '',
      Carrera: sol.carrera || '',
      Consideraciones: sol.consideraciones || '',
      "Tipo de solicitud": sol.tiposolicitud || '',
      "Plan de estudio": sol.planestudio || '',
      Sede: sol.sede || '',
      Comentarios: sol.comentario || '',
    }));

    const ws = XLSX.utils.json_to_sheet(datosExportar);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "DatosLevantamientos");
    XLSX.writeFile(wb, "levantamientos_historicos.xlsx");
  };

  const exportSingleToExcel = (sol) => {
    const datosExportar = [{
      "Nombre Estudiante": sol.nombre || '',
      Carnet: sol.carnet || '',
      "Fecha de Solicitud": sol.fecha || '',
      "Curso a matricular": sol.curso || '',
      "Requisito a levantar": sol.requisito || '',
      Estado: sol.estado || '',
      Correo: sol.correo || '',
      Carrera: sol.carrera || '',
      Consideraciones: sol.consideraciones || '',
      "Tipo de solicitud": sol.tiposolicitud || '',
      "Plan de estudio": sol.planestudio || '',
      Sede: sol.sede || '',
      Comentarios: sol.comentario || '',
    }];

    try {
      const ws = XLSX.utils.json_to_sheet(datosExportar);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "DatosLevantamiento");
      XLSX.writeFile(wb, `levantamiento_${sol.carnet || 'estudiante'}.xlsx`);
    } catch (error) {
      console.error("Error al exportar a Excel:", error);
      alert("Ocurrió un error al exportar los datos");
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <nav aria-label="Menú principal" style={{
          width: '300px',
          backgroundColor: '#ffffff',
          color: '#062043',
          padding: '32px 0',
          boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
          borderRight: '1px solid #ddd',
          height: '100vh'
        }}>
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <img src={imagenRegistro} alt="Logo del Instituto Tecnológico de Costa Rica" style={{ height: '60px' }} />
          </Box>
          <List>
            {menuItems.map((item) => (
              <ListItem button key={item.text} component={Link} to={item.path}
                selected={location.pathname === item.path}
                sx={{
                  color: '#062043',
                  minHeight: '3.5rem',
                  '&.Mui-selected': { backgroundColor: '#f0f0f0', fontWeight: 'bold' },
                  '&:hover': { backgroundColor: '#f9f9f9' }
                }}
              >
                <ListItemIcon sx={{ color: '#062043' }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </nav>
        <Box sx={{ flexGrow: 1, padding: 3 }}>
          <Container maxWidth="xl" sx={{ py: 5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 5 }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#062043' }}>
                Solicitudes de Levantamiento de Requisitos y Condición RN
              </Typography>
              <img src={imagenUsuario} alt="Usuario" style={{ height: '50px', borderRadius: '50%' }} />
            </Box>

            <Typography
              id="descripcion-tabla"
              variant="body1"
              sx={{ mb: 2 }}
            >
              Esta tabla muestra el historial de solicitudes realizadas para levantamiento de requisitos y condición RN. Puede filtrarlas por estado, revisarlas y exportarlas.
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<DownloadIcon />}
                onClick={exportToExcel}
                sx={{
                  backgroundColor: '#062043',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#143f7a'
                  }
                }}
              >
                Exportar datos
              </Button>
            </Box>

            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="Filtros de estado"
              sx={{ mb: 2 }}
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="Todos" value="1" />
              <Tab label="Pendientes" value="2" />
              <Tab label="Aprobados" value="3" />
              <Tab label="Rechazados" value="4" />
            </Tabs>

            <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
              <Table aria-label="Tabla de solicitudes" aria-describedby="descripcion-tabla">
                <TableHead sx={{ backgroundColor: '#E3EAFD' }}>
                  <TableRow>
                    <TableCell>Sede</TableCell>
                    <TableCell>Carnet</TableCell>
                    <TableCell>Nombre estudiante</TableCell>
                    <TableCell>Curso a matricular</TableCell>
                    <TableCell>Requisito a levantar</TableCell>
                    <TableCell>Estado</TableCell>
                    <TableCell>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={7} align="center">Cargando datos...</TableCell>
                    </TableRow>
                  ) : error ? (
                    <TableRow>
                      <TableCell colSpan={7} align="center" sx={{ color: 'error.main' }}>Error: {error}</TableCell>
                    </TableRow>
                  ) : (
                    filteredSolicitudes
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((sol, index) => (
                        <TableRow key={index}>
                          <TableCell>{sol.sede}</TableCell>
                          <TableCell>{sol.carnet}</TableCell>
                          <TableCell>{sol.nombre}</TableCell>
                          <TableCell>{sol.curso}</TableCell>
                          <TableCell>{sol.requisito}</TableCell>
                          <TableCell>
                            <Box sx={colorEstado(sol.estado)}>{sol.estado}</Box>
                          </TableCell>
                          <TableCell>
                            <IconButton
                              aria-label="Ver solicitud"
                              color="primary"
                              size="small"
                              onClick={() => navigate('/administrativo/vista/levantamiento', { state: { sol } })}
                            >
                              <Visibility />
                            </IconButton>
                            <IconButton
                              aria-label="Exportar solicitud"
                              color="secondary"
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                exportSingleToExcel(sol);
                              }}
                            >
                              <DownloadIcon fontSize="small" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))
                  )}
                </TableBody>
              </Table>
              {!loading && !error && (
                <TablePagination
                  rowsPerPageOptions={[10, 25, 50]}
                  component="div"
                  count={solicitudes.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  labelRowsPerPage="Filas por página:"
                />
              )}
            </TableContainer>
          </Container>
        </Box>
      </Box>
        <footer style={{ textAlign: 'center', padding: '1rem', fontSize: '0.9rem' }}>
          <p>© 2025 Curso Diseño de software. Todos los derechos reservados.</p>
        </footer>
    </Box>
  );
};

export default AdministradorHistLev;
