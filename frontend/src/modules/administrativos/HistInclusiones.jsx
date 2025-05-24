import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Box, Card, CardContent, TextField } from '@mui/material';
import { Sedes, inclusiones, totalinclusiones, inclusionesAprobadas, totalincluAprob} from './Funciones/estadisticas';
import imagenDosUsers from '../../assets/dosUsers.png';
import imagenSumatoria from '../../assets/Sumatoria.png';
import { useNavigate } from 'react-router-dom';
import CardActionArea from '@mui/material/CardActionArea';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const HistInclusiones = ({tipoVista}) => {
  const [sedes, setSedes] = useState([]);
  const [datosInclusionesData, setDatosInclusionesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalInclusiones, setTotalInclusiones] = useState('');
  const [totalIncluAprobadas, setTotalIncluAprobadas] = useState('');
  const [datosInlcuAprob, setDatosIncluAprob] = useState([]);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sedesData, totalInclusiones, datosInclusionesData, totalIncluAprobadas, datosIncluAprob] = await Promise.all([
          Sedes(),
          totalinclusiones(tipoVista),
          inclusiones(tipoVista),
          totalincluAprob(tipoVista),
          inclusionesAprobadas(tipoVista)

        ]);
        
        setSedes(sedesData);
        setTotalInclusiones(totalInclusiones);
        setDatosInclusionesData(datosInclusionesData); 
        setTotalIncluAprobadas(totalIncluAprobadas);
        setDatosIncluAprob(datosIncluAprob); 


      } catch (error) {
        console.error('Error al cargar datos:', error);
        // Datos de respaldo
        setSedes(['Sede 1', 'Sede 2', 'Sede 3']);
        setDatosInclusionesData([0, 0, 0]);
        setTotalInclusiones('0');
        setTotalIncluAprobadas('0');
        setDatosIncluAprob([0, 0, 0]);


      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
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

  const cards = [
    {
      id: 1,
      title: 'Total de solicitudes de inclusiones',
      description: totalInclusiones,
      imagen: imagenDosUsers,
    },
    {
      id: 2,
      title: 'Total de inclusiones aprobados',
      description: totalIncluAprobadas,
      imagen: imagenSumatoria,
    },

  ];

  if (loading) {
    return <Typography>Cargando datos...</Typography>;
  }

  return (
    <Box sx={{ 
      display: 'flex',
      flexDirection: 'column',
      gap: 3,
      padding: 2
    }}>
      <Box sx={{ 
        display: 'flex', 
        flexWrap: 'wrap',
        gap: 2,
        justifyContent: 'center'
      }}>
        {cards.map((card) => (
          <Card key={card.id} sx={{ minWidth: 275, maxWidth: 350 }}>
            <CardContent>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center',
                gap: 2,
                mb: 1
              }}>
                <Typography variant="body1" component="div" sx={{ fontWeight: 'bold' }}>
                  {card.title}
                </Typography>
                <img 
                  src={card.imagen} 
                  alt={card.title} 
                  style={{ 
                    width: '60px',
                    height: '60px', 
                    objectFit: 'contain'
                  }} 
                />
              </Box>
              <Typography variant="body2" color="text.secondary" fontSize={28}>
                {card.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
      
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
    </Box>
  );
};

export default HistInclusiones;