import React from 'react';
import { Box, Typography, Button, Card, CardContent, Grid } from '@mui/material';
import imagenRegistro from '../../assets/logoTec-sinFondo.png';
import iconPersona from '../../assets/dosUsers.png';
import iconSuma from '../../assets/Sumatoria.png';
import PersonIcon from '../../assets/imagenUsuario.png';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';


const PanelCoordinadora = () => {
    const navigate = useNavigate();  
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      
      {/* Sidebar */}
      <Box
        sx={{
          width: '230px', //cambio tamaño del sidebar
          backgroundColor: '#f2f2f2',
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <img src={imagenRegistro} alt="TEC" style={{ height: 60, marginBottom: 24 }} />
          
          <Typography variant="subtitle1" fontWeight="bold" mb={1}>Inclusiones</Typography>
          <Typography variant="body2" mb={2}>Gestión de solicitudes de inclusión</Typography>
          <Button fullWidth variant="contained" 
          sx={{
                mb: 3,
                backgroundColor: '#405F90',
                color: '#fff',
                '&:hover': {
                backgroundColor: '#324b73',
                },
            }}
            onClick={() => navigate('/administrativo/reglamento')}//falta desarrollar
            aria-label="Ver las inclusiones">
            Acceder a inclusiones
          </Button>

          <Typography variant="subtitle1" fontWeight="bold" mb={3}>Levantamiento y RN</Typography>
          <Typography variant="body2" mb={2}>Gestión de solicitudes de levantamiento y RN</Typography>
          <Button fullWidth variant="contained" 
          sx={{
                mb: 3,
                backgroundColor: '#405F90',
                color: '#fff',
                '&:hover': {
                backgroundColor: '#324b73',
                },
            }}
            onClick={() => navigate('/administrativo/reglamento')}//falta desarrollar pantalla
            aria-label="Ir a levantamientos y estados RN">
            Acceder a levantamientos y RN
          </Button>
          <Button fullWidth variant="contained" 
          sx={{
                mb: 3,
                backgroundColor: '#405F90',
                color: '#fff',
                '&:hover': {
                backgroundColor: '#324b73',
                },
            }} 
            onClick={() => navigate('/administrativo/reglamento')}
            aria-label="Ir al reglamento">
            Reglamento de Levantamientos
            
          </Button>
          <Button fullWidth variant="contained" 
          sx={{
                mb: 3,
                backgroundColor: '#405F90',
                color: '#fff',
                '&:hover': {
                backgroundColor: '#324b73',
                },
            }}
            onClick={() => navigate('/administrativo/reglamento')}//falta la pantalla
            aria-label="Ver listado de levantamientos automáticos">
            Lista de levantamientos automáticos
          </Button>
        </Box>
      </Box>

      {/* Contenido principal */}
      <Box sx={{ flexGrow: 1, p: 5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" fontWeight="bold" sx={{ color: '#001B3D' }} >
            Panel de Coordinadora de la carrera
          </Typography>
            <IconButton
                onClick={() => navigate('/perfil')}
                aria-label="Ir al perfil de usuario"
                sx={{
                    width: 60,
                    height: 60,
                    p: 0,
                    borderRadius: '50%',
                    overflow: 'hidden',
                }}
                >
                <img
                    src={PersonIcon}
                    alt="Foto de perfil"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </IconButton>
        </Box>

        <Typography variant="body1" mb={4}>
          A continuación, se presentan las diferentes opciones para la coordinadora de la Escuela de Ingeniería en Computación
        </Typography>


        {/* Tarjetas superiores */}
        <Grid container spacing={12} mb={6}>
          <Grid item xs={12} sm={6} md={12}>
          <Card>
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="body2" mb={3}>Total de solicitudes de inclusión</Typography>
                    <Typography variant="h5" fontWeight="bold">350</Typography>
                </Box>
                <img src={iconPersona} alt="Icono persona" style={{ width: 60, height: 60 }} />
                </Box>
            </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={12}>
          <Card>
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="body2" mb={3}>Total de solicitudes de inclusión</Typography>
                    <Typography variant="h5" fontWeight="bold">350</Typography>
                </Box>
                <img src={iconSuma} alt="Icono suma" style={{ width: 60, height: 60 }} />
                </Box>
            </CardContent>
            </Card>
          </Grid>
        </Grid>


        {/* Gráficos simulados */}
        <Grid container spacing={8}>
          <Grid item xs={20} sm={6}>
            <Card sx={{ p: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold" mb={2}>
                Sede con mayor cantidad de solicitudes
              </Typography>
              {/* Aquí irá el gráfico */}
              <Box sx={{ height: 180, backgroundColor: '#eaeaea', mb: 2 }} />
              <Button variant="contained">Detalles</Button>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card sx={{ p: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold" mb={2}>
                Curso con mayor cantidad de solicitudes
              </Typography>
              {/* Aquí irá el gráfico */}
              <Box sx={{ height: 180, backgroundColor: '#eaeaea', mb: 2 }} />
              <Button variant="contained">Detalles</Button>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default PanelCoordinadora;
