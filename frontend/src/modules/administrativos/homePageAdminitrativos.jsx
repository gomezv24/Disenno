import React from 'react';
import { Container, Typography, Button, Box, Card, CardContent, TextField, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import imagenRegistro from '../../assets/logoTec.png';
import imagenUsuario from '../../assets/imagenUsuario.png';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';  // Import corregido
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';
import { Link, useLocation } from 'react-router-dom';
import SemestralInclusiones from './SemestralInclusiones';
import HistInclusiones from './HistInclusiones';
import BarChartIcon from '@mui/icons-material/BarChart';
import ViewListIcon from '@mui/icons-material/ViewList';


const AdministrativosLevantamientos = () => {
  const location = useLocation();
  

  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  const menuItems = [
      { text: 'Inclusiones', icon: <BarChartIcon />, path: '/administrativo' },
      { text: 'Levantamientos', icon: <BarChartIcon />, path: '/administrativo/levantamientos' },
      { text: 'Histórico de inclusiones', icon: <ViewListIcon />, path: '/administrativo/historico/inclusiones/informacion' },
      { text: 'Histórico de levantamientos', icon: <ViewListIcon />, path: '/administrativo/historico/levantamientos' },
    ];

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <nav
        aria-label="Menú principal"
        style={{
          width: '325px',
          backgroundColor: '#ffffff',
          color: '#062043',
          padding: '32px 0',
          boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
          borderRight: '1px solid #ddd',
          height: '100vh'
        }}
      >
        {/* Logo institucional */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <img src={imagenRegistro} alt="Logo del Instituto Tecnológico de Costa Rica" style={{ height: '60px' }} />
        </Box>

        {/* Lista de navegación */}
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
        <Container maxWidth="xl" sx={{ px: 0, py: 5 }}>

        

          {/* Logo arriba y "Gestión de Fondos" debajo, usuario a la derecha */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 5 ,flexDirection: { xs: 'column', md: 'row' },position: 'relative'  }}>
            <Box sx={{ flex: 1, minWidth: '10%', mb: { xs: 0, md: 0 }, order: 1}}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#062043', mt: 1 }}>
              Estadísticas de solicitudes de inclusión
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
            <SemestralInclusiones tipoVista={value} />
          ) : (
            <HistInclusiones tipoVista={value} />
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