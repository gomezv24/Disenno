import React from 'react';
import { Container, Typography, Button, Box, Card, CardContent, TextField } from '@mui/material';
import imagenRegistro from '../../assets/logoTec.png';
import imagenUsuario from '../../assets/imagenUsuario.png';
import { useNavigate } from 'react-router-dom';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';  // Import corregido
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';
import SemestralLevantamientos from './SemestralLevantamientos';
import HistLevantamientos from './HistLevantamientos';

const AdministrativosLevantamientos = () => {
  const navigate = useNavigate();

  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
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
            <MenuItem style={menuItemStyle} onClick={() => navigate('/administrativo/historico/inclusiones/informacion')}>Histórico de inclusiones</MenuItem>
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
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 5 ,flexDirection: { xs: 'column', md: 'row' },position: 'relative'  }}>
            <Box sx={{ flex: 1, minWidth: '50%', mb: { xs: 2, md: 0 }, order: 1}}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#062043', mt: 1 }}>
              Estadísticas de levantamiento de requisitos y RN
              </Typography>
              <Typography variant="body1" component="p">
              A continuación, se presentan diferentes gráficos con información sobre las inclusiones 
              </Typography>
            </Box >
           
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, position: { md: 'absolute' }, right: 0, top: 0, order: 2 }}>
              <TabContext value={value}>
                <Box sx={{ width: 'auto' }}>
                  <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="Semestral" value="1" />
                    <Tab label="Histórico" value="2" />
                  </TabList>
                </Box>
                <TabPanel value="1"></TabPanel>
                <TabPanel value="2"></TabPanel>
              </TabContext>
            </Box>
            <Box sx={{ order: 3 }}>
              <img src={imagenUsuario} alt="Usuario" style={{ height: '50px', borderRadius: '50%' }} 
              />
            </Box>
          </Box>
          {/* Renderizado condicional de componentes */}
          {value === '1' ? (
            <SemestralLevantamientos tipoVista={value} />
          ) : (
            <HistLevantamientos tipoVista={value} />
          )}
        </Container>
        <Container maxWidth="xl" sx={{ py: 5 }}>
         
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


export default AdministrativosLevantamientos;