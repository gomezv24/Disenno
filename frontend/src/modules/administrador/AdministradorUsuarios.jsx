import React from 'react';
import { Container, Button, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, List, ListItem, ListItemIcon, ListItemText, Tabs, Tab } from '@mui/material';
import { Delete, Visibility, Home, School, TrendingUp, ExitToApp, AssignmentTurnedIn } from '@mui/icons-material';
import imagenRegistro from '../../assets/logoTec.png';
import imagenUsuario from '../../assets/imagenUsuario.png';
import { Link, useLocation } from 'react-router-dom';
import { TablePagination } from '@mui/material';
import { informacion } from './Funciones/usuarios';
import { useNavigate } from 'react-router-dom';
import GroupIcon from '@mui/icons-material/Group';
import SchoolIcon from '@mui/icons-material/School';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const AdministradorUsuarios = () => {
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
    { text: 'Manejo de Usuarios', icon: <GroupIcon />, path: '/administrador' },
    { text: 'Inclusiones', icon: <SchoolIcon />, path: '/administrador/inclusiones' },
    { text: 'Levantamientos de Requisitos y RN', icon: <TrendingUpIcon />, path: '/administrador/levantamientos' }
  ];

  const colorEstado = (estado) => {
    if (estado === 'Activo') return { backgroundColor: '#C8E6C9', color: '#388E3C', fontWeight: 'bold', borderRadius: '8px', px: 1, py: 0.5 };
    if (estado === 'Inactivo') return { backgroundColor: '#FFCDD2', color: '#D32F2F', fontWeight: 'bold', borderRadius: '8px', px: 1, py: 0.5 };
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
                Usuarios
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

          </Box>


          <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
            <Table aria-label="Tabla de información histórica de inclusiones">
              <TableHead sx={{ backgroundColor: '#E3EAFD' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Sede</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Identificacion</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Estado</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Rol</TableCell>
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
                        <TableCell>{sol.identificacion}</TableCell>
                        <TableCell>{sol.nombre}</TableCell>
                        <TableCell>{sol.tipo}</TableCell>
                        <TableCell>
                          <Box sx={colorEstado(sol.estado)}>
                            {sol.estado}
                          </Box>
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

        </Container>
      </Box>
    </Box>
  );
};




export default AdministradorUsuarios;