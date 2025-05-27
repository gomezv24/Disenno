import React, { useState, useEffect } from 'react';

import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Grid,
  Card,
  CardContent,
  Button,
} from '@mui/material';

import { useNavigate, useLocation } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip
} from 'chart.js';

import imagenRegistro from '../../assets/logoTec.png';
import iconPersona from '../../assets/dosUsers.png';
import iconSuma from '../../assets/Sumatoria.png';

import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import PersonIcon from '@mui/icons-material/Person';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

import { informacion } from '../administrador/Funciones/historicoInclusiones';
import { obtenerLevantamientos } from './Funciones/coordinadoraFun';
import { inclusiones } from './Funciones/estadisticas';
import { Sedes, totalincluAprob, inclusionesAprobadas, levantamientosAprobadosTotal, levantamientos } from './Funciones/estadisticas';


ChartJS.register(BarElement, CategoryScale, LinearScale, Legend, Tooltip);


const PanelCoordinadora = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: 'Panel de Control', icon: <ManageAccountsIcon />, path: '/administrativo/panelControl' },
    { text: 'Inclusiones', icon: <SchoolIcon />, path: '/administrativo/listadoInclusiones' },
    { text: 'Levantamientos y RN ', icon: <TrendingUpIcon />, path: '/administrativo/levantamientorn' },
    { text: 'Reglamento de Levantamientos', icon: <MenuBookIcon />, path: '/administrativo/reglamento' },
  ];

  const [dataPorSede, setDataPorSede] = useState({ labels: [], datasets: [] });
  const [totalSolicitudes, setTotalSolicitudes] = useState(0);
  const [totalLevantamientos, setTotalLevantamientos] = useState(0);
  const [sedes, setSedes] = useState([]);
  const [datosInclusionesData, setDatosInclusionesData] = useState([]);
  const [datosInlcuAprob, setDatosIncluAprob] = useState([]);
  const [datosLevantamientos, setDatosLevantamientos] = useState([]);
  const [datosLevantamientosAprob, setDatosLevantamientosAprob] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const datos = await informacion('1');
        const data = await obtenerLevantamientos('1');
        setTotalSolicitudes(datos.length);
        setTotalLevantamientos(data.length);


        const conteoTotal = {};
        const conteoAprobadas = {};

        datos.forEach(item => {
          const sede = item.sede;
          const estado = item.estado;

          conteoTotal[sede] = (conteoTotal[sede] || 0) + 1;
          if (estado === 'Aprobado') {
            conteoAprobadas[sede] = (conteoAprobadas[sede] || 0) + 1;
          }
        });

        const [sedesData, datosInclusionesData, datosIncluAprob, levantamientosData, datosLevantamientosAprob] = await Promise.all([
          Sedes(),
          inclusiones('2'),
          inclusionesAprobadas('2'),
          levantamientos('2'),
          levantamientosAprobadosTotal('2')
        ]);


        setSedes(sedesData);
        setDatosInclusionesData(datosInclusionesData);
        setDatosIncluAprob(datosIncluAprob);
        setDatosLevantamientos(levantamientosData);
        setDatosLevantamientosAprob(datosLevantamientosAprob);



        /*const sedes = Object.keys(conteoTotal);

        setDataPorSede({
          labels: sedes,
          datasets: [
            {
              label: 'Solicitudes de Inclusión',
              data: sedes.map(s => conteoTotal[s] || 0),
              backgroundColor: '#001B3D',
            },
            {
              label: 'Solicitudes Aprobadas',
              data: sedes.map(s => conteoAprobadas[s] || 0),
              backgroundColor: '#90CAF9',
            }
          ]
        });*/
      } catch (error) {
        console.error('Error cargando datos del gráfico', error);
      }
      
    };

    cargarDatos();
  }, []);

  const data = {
    labels: sedes,
    datasets: [
      {
        label: 'Solicitudes de Inclusiones',
        data: datosInclusionesData,
        backgroundColor: '#062043',
        borderColor: 'rgb(10, 49, 99)',
        borderWidth: 1,
      },
      {
        label: 'Solicitudes Aprobadas',
        data: datosInlcuAprob,
        backgroundColor: 'rgba(59, 117, 197, 0.86)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Solicitudes por Sede',
      },
    },
  };


  const dataLev = {
    labels: sedes,
    datasets: [
      {
        label: 'Solicitudes de Levantamiento',
        data: datosLevantamientos,
        backgroundColor: '#062043',
        borderColor: 'rgb(10, 49, 99)',
        borderWidth: 1,
      },
      {
        label: 'Solicitudes Aprobadas',
        data: datosLevantamientosAprob, // Ajusta al tamaño de los datos
        backgroundColor: 'rgba(59, 117, 197, 0.86)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar con navegación */}
      <Box
        component="nav"
        role="navigation"
        aria-label="Menú principal"
        sx={{
          width: '260px',
          backgroundColor: '#fff',
          borderRight: '1px solid #ddd',
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          gap: 2,
        }}
      >
        {/* Logo */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <img
            src={imagenRegistro}
            alt="Logo del Tecnológico de Costa Rica"
            style={{ height: 60 }}
          />
        </Box>

        {/* Menú accesible */}
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => navigate(item.path)}
              selected={location.pathname === item.path}
              sx={{
                color: '#001B3D',
                mb: 1,
                borderRadius: '8px',
                '&.Mui-selected': {
                  backgroundColor: '#f0f0f0',
                  fontWeight: 'bold',
                },
                '&:hover': {
                  backgroundColor: '#f9f9f9',
                },
              }}
              aria-label={`Ir a ${item.text}`}
            >
              <ListItemIcon sx={{ color: '#001B3D' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Contenido principal */}
      <Box
        component="main"
        role="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          minHeight: '100vh',
          px: 5,
          py: 8,
        }}
      >
        <Box sx={{ maxWidth: '1000px', width: '100%' }}>
          <Typography variant="h4" fontWeight="bold" sx={{ color: '#001B3D', mb: 4 }}>
            Panel de Coordinadora de la carrera
          </Typography>

          <Typography variant="body1" mb={4}>
            A continuación, se presentan las diferentes opciones para la coordinadora de la Escuela de Ingeniería en Computación
          </Typography>

          {/* Tarjetas estadísticas */}
          <Grid container spacing={6} mb={6}>
            <Grid item xs={12} sm={6}>
              <Card aria-label="Total de solicitudes de inclusión">
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="body2" mb={3}>Total de solicitudes de inclusión</Typography>
                      <Typography variant="h5" fontWeight="bold">{totalSolicitudes}</Typography>
                    </Box>
                    <img
                      src={iconPersona}
                      alt="Icono de personas"
                      style={{ width: 60, height: 60 }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Card aria-label="Total de solicitudes con sumatoria">
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="body2" mb={3}>Total de solicitudes de levantamiento</Typography>
                      <Typography variant="h5" fontWeight="bold">{totalLevantamientos}</Typography>
                    </Box>
                    <img
                      src={iconSuma}
                      alt="Icono de sumatoria"
                      style={{ width: 60, height: 60 }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Card sx={{ boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" component="div" gutterBottom>
                Estadísticas de Inclusiones
              </Typography>
              <Box sx={{ height: '400px', position: 'relative' }}>
                <Bar
                  data={data}
                  options={options}
                  key={JSON.stringify(sedes)}
                />
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Datos actualizados al {new Date().toLocaleDateString()}
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" component="div" gutterBottom>
                Estadísticas de Levantamientos
              </Typography>
              <Box sx={{ height: '400px', position: 'relative' }}>
                <Bar
                  data={dataLev}
                  options={options}
                  key={JSON.stringify(sedes)} // Esto fuerza recreación del gráfico cuando cambian las sedes
                />
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Datos actualizados al {new Date().toLocaleDateString()}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>

  );
};

export default PanelCoordinadora;
