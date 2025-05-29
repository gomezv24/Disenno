import React from 'react';
import { Container, Button, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, List, ListItem, ListItemIcon, ListItemText, Tabs, Tab } from '@mui/material';
import { Delete, Visibility, Home, School, TrendingUp, ExitToApp, AssignmentTurnedIn } from '@mui/icons-material';
import imagenRegistro from '../../assets/logoTec.png';
import imagenUsuario from '../../assets/imagenUsuario.png';
import { Link, useLocation } from 'react-router-dom';
import BarChartIcon from '@mui/icons-material/BarChart';
import ViewListIcon from '@mui/icons-material/ViewList';
import { TablePagination } from '@mui/material';
import { informacion } from './Funciones/historicoLev';
import { useNavigate } from 'react-router-dom';
import DownloadIcon from '@mui/icons-material/Download';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import * as XLSX from 'xlsx';


const AdministrativosHistLev = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [value, setValue] = React.useState('1');
  const [solicitudes, setSolicitudes] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [filteredSolicitudes, setFilteredSolicitudes] = React.useState([]);
  const [tabValue, setTabValue] = React.useState('1');

  // Estados para paginación
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // Cargar datos al montar el componente
  const cargarDatos = async (tipo) => {

    try {
      setLoading(true);
      let datos;

      datos = await informacion(tipo);

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
    { text: 'Inclusiones', icon: <BarChartIcon />, path: '/administrativo' },
    { text: 'Levantamientos', icon: <BarChartIcon />, path: '/administrativo/levantamientos' },
    { text: 'Histórico de inclusiones', icon: <ViewListIcon />, path: '/administrativo/historico/inclusiones/informacion' },
    { text: 'Histórico de levantamientos', icon: <ViewListIcon />, path: '/administrativo/historico/levantamientos' },
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
    // Preparar los datos para exportar
    const datosExportar = filteredSolicitudes.map(sol => ({
      "Nombre Estudiante": sol.nombre || '',
      Carnet: sol.carnet || '',
      "Fecha de Solicitud": sol.fecha || '',
      "Curso a matricular": sol.curso || '',
      "Requisito a levantar": sol.requisito || '',
      Estado: sol.estado || '',
      Correo: sol.correo || '',
      "Estado Solicitud": sol.estado || '',
      Carrera: sol.carrera || '',
      Consideraciones: sol.consideraciones || '',
      "Tipo de solicitud": sol.tiposolicitud || '',
      "Plan de estudio": sol.planestudio || '',
      Sede: sol.sede || '',
      Comentarios: sol.comentario || '',
    }));

    // Crear hoja de trabajo
    const ws = XLSX.utils.json_to_sheet(datosExportar);

    // Crear libro de trabajo
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "DatosInclusiones");

    // Exportar el archivo
    XLSX.writeFile(wb, "inclusiones_historicas.xlsx");
  };

  const exportSingleToExcel = (sol) => {
    // Preparar los datos para exportar (como array con un solo elemento)
    const datosExportar = [{

      "Nombre Estudiante": sol.nombre || '',
      Carnet: sol.carnet || '',
      "Fecha de Solicitud": sol.fecha || '',
      "Curso a matricular": sol.curso || '',
      "Requisito a levantar": sol.requisito || '',
      Estado: sol.estado || '',
      Correo: sol.correo || '',
      "Estado Solicitud": sol.estado || '',
      Carrera: sol.carrera || '',
      Consideraciones: sol.consideraciones || '',
      "Tipo de solicitud": sol.tiposolicitud || '',
      "Plan de estudio": sol.planestudio || '',
      Sede: sol.sede || '',
      Comentarios: sol.comentario || '',

    }];

    try {
      // Crear hoja de trabajo
      const ws = XLSX.utils.json_to_sheet(datosExportar);

      // Crear libro de trabajo
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "DatosLevantamiento");

      // Exportar el archivo con nombre personalizado
      XLSX.writeFile(wb, `levantamiento_${sol.carnet || 'estudiante'}.xlsx`);
    } catch (error) {
      console.error("Error al exportar a Excel:", error);
      alert("Ocurrió un error al exportar los datos");
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <nav
        aria-label="Menú principal"
        style={{
          width: '300px',
          backgroundColor: '#ffffff',
          color: '#062043',
          padding: '32px 0',
          boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
          borderRight: '1px solid #ddd',
          height: '100vh'
        }}
      >
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <img src={imagenRegistro} alt="Logo del Instituto Tecnológico de Costa Rica" style={{ height: '60px' }} />
        </Box>
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              component={Link}
              to={item.path}
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
      {/* Contenido principal */}
      <Box sx={{
        flexGrow: 1,
        marginLeft: '10px',
        padding: 3,
        width: 'calc(100% - 250px)'
      }}>
        <Container maxWidth="xl" sx={{ py: 5 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 5, flexDirection: { xs: 'column', md: 'row' }, position: 'relative' }}>
            <Box sx={{ flex: 1, minWidth: '50%', mb: { xs: 2, md: 0 }, order: 1 }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#062043', mt: 1 }}>
                Información Histórica Levantamiento de requisitos y condición RN
              </Typography>
              <Typography variant="body1" component="p">
                A continuación, se listan las solicitudes de levantamiento de requisitos y conición RN realizadas por los estudiantes y su estado
              </Typography>
            </Box >
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              order: { xs: 2, md: 3 }
            }}>

              <img src={imagenUsuario} alt="Usuario" style={{ height: '50px', borderRadius: '50%' }}
              />
            </Box>
          </Box>
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
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="Filtros de estado de las solicitudes"
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                '& .MuiTab-root': {
                  fontWeight: 'bold',
                  textTransform: 'none',
                  fontSize: '0.875rem'
                },
                '& .Mui-selected': {
                  color: '#1976d2 !important',
                }
              }}
            >
              <Tab label="Todos" value="1" />
              <Tab label="Pendientes" value="2" />
              <Tab label="Aprobados" value="3" />
              <Tab label="Rechazado" value="4" />
            </Tabs>

          </Box>

          <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
            <Table aria-label="Tabla de información histórica de inclusiones">
              <TableHead sx={{ backgroundColor: '#E3EAFD' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Sede</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Carnet</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Nombre estudiante</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Curso a matricular</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Requisito a levantar</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Estado</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={8} align="center">
                      Cargando datos...
                    </TableCell>
                  </TableRow>
                ) : error ? (
                  <TableRow>
                    <TableCell colSpan={8} align="center" sx={{ color: 'error.main' }}>
                      Error: {error}
                    </TableCell>
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
                          <Box sx={colorEstado(sol.estado)}>
                            {sol.estado}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <IconButton aria-label="Ver detalles de la solicitud"
                            color="primary"
                            size="small"
                            onClick={() => navigate('/administrativo/vista/levantamiento', { state: { sol } })}>

                            <Visibility />
                            <IconButton
                              aria-label="Descargar"
                              color="secondary"

                              onClick={(e) => {
                                e.stopPropagation();
                                exportSingleToExcel(sol);
                              }}
                              size="small"
                            >
                              <DownloadIcon fontSize="small" />
                            </IconButton>
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
        <Container maxWidth="xl" sx={{ py: 5 }}>
<       footer style={{ textAlign: 'center', padding: '1rem', fontSize: '0.9rem' }}>
          <p>© 2025 Curso Diseño de software. Todos los derechos reservados.</p>
        </footer>
        </Container>
      </Box>
    </Box>
  );
};




export default AdministrativosHistLev;