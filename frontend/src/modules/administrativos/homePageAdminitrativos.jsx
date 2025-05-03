import React from 'react';
import { Container, Typography, Button, Box, Card, CardContent, TextField } from '@mui/material';
import imagenRegistro from '../../assets/logoTec.png';
import imagenUsuario from '../../assets/imagenUsuario.png';
import imagenInclu from '../../assets/imagenInclu.png';
import imagenLeva from '../../assets/imagenLeva.png';
import imagenReti from '../../assets/imagenReti.png';
import { useNavigate } from 'react-router-dom';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

const HomePageAdministrativos = () => {
  const navigate = useNavigate();
  return (
      <Box sx={{ display: 'flex', height: '100vh' }}>
        {/* Sidebar fijo a la izquierda */}
        <Box sx={{ 
          width: '280px', 
          flexShrink: 0,
          position: 'fixed',
          height: '100vh',
          zIndex: 1000,
          backgroundColor: 'background.paper',
          boxShadow: 2
        }}>
          <Sidebar rootStyles={sidebarStyle} >
            <Menu iconShape="square" >
            <img src={imagenRegistro} alt="TEC" style={{ height: '50px' , marginLeft: '20px', marginTop: '15px', marginBottom: '20px'} } />
              <MenuItem style={menuItemStyle} onClick={() => navigate('/administrativo')}>Inclusiones</MenuItem>
              <MenuItem style={menuItemStyle} onClick={() => navigate('/administrativo/levantamientos')}>Levantamientos y condición RN</MenuItem>
              <MenuItem style={menuItemStyle} onClick={() => navigate('/administrativo/historico/inclusiones')}>Histórico de inclusiones</MenuItem>
              <MenuItem style={menuItemStyle} onClick={() => navigate('/administrativo/historico/levantamientos')}>Histórico de levantamientos</MenuItem>
            </Menu>
          </Sidebar>
        </Box>
  
        {/* Contenido principal */}
        <Box sx={{ 
          flexGrow: 1, 
          marginLeft: '250px',
          padding: 3,
          width: 'calc(100% - 250px)'
        }}>
          <Container maxWidth="xl" sx={{ py: 5 }}>
            {/* Logo arriba y "Gestión de Fondos" debajo, usuario a la derecha */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 5 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#062043', mt: 1 }}>
                Estadísticas solicitudes de Inclusiones
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
        </Box>
      </Box>
    );
  };
  
  const menuItemStyle = {
    padding: '15px 20px',
    fontWeight: 'bold',
    color: '#062043',
    whiteSpace: 'normal',
    wordBreak: 'break-word',
    lineHeight: '1.3',
    '&:hover': {
      backgroundColor: '#c21b31', // Morado claro
      borderRadius: '4px', // Opcional: agrega bordes redondeados
    },
    transition: 'all 0.3s ease', // Transición suave para todos los cambios
  };
  
  // Asegúrate de que tu Sidebar tenga la prop "rootStyles" para heredar estilos
  const sidebarStyle = {
    height: '100%',
    width: '100%',
    '& .pro-sidebar-inner': {
      background: '#c21b31 !important', // Fuerza el color de fondo
    },
    '& .pro-menu-item': {
      '&:hover': {
        background: '#c21b31 !important',
        color: '#c21b31 !important',
      },
    },
  };


export default HomePageAdministrativos;