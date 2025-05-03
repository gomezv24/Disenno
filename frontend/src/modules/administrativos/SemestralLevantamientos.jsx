import React from 'react';
import { Container, Typography, Button, Box, Card, CardContent, TextField } from '@mui/material';
import imagenRegistro from '../../assets/logoTec.png';
import imagenUsuario from '../../assets/imagenUsuario.png';
import imagenInclu from '../../assets/imagenInclu.png';
import imagenLeva from '../../assets/imagenLeva.png';
import imagenReti from '../../assets/imagenReti.png';
import imagenDosUsers from '../../assets/dosUsers.png';
import imagenSumatoria from '../../assets/Sumatoria.png';
import { useNavigate } from 'react-router-dom';
import CardActionArea from '@mui/material/CardActionArea';


const SemestralLevantamientos = () => {
  const cards = [
    {
      id: 1,
      title: 'Total de solicitudes de levantamientos',
      description: 'Plants are essential for all life.',
      imagen: imagenDosUsers,
    },
    {
      id: 2,
      title: 'Total de levantamiento de requisitos aprobados',
      description: 'Animals are a part of nature.',
      imagen: imagenSumatoria,
    },
    {
      id: 3,
      title: 'Total de levantamiento de RN aprobados',
      description: 'Humans depend on plants and animals for survival.',
      imagen: imagenSumatoria,
    },
  ];
  

    return (
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center',
        flexDirection: { xs: 'column', sm: 'row' }, // Columna en móvil, fila en desktop
        gap: { xs: 1, sm: 2 },
        textAlign: { xs: 'center', sm: 'left' }
      }}>

        {cards.map((card, index) => (
          <Card>
            
              <CardContent sx={{ height: '100%' }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', // Alinea verticalmente imagen y texto
                  gap: 2, // Espacio entre imagen y texto
                  mb: 1 // Margen inferior para separar del texto secundario
                }}>
                  <Typography variant="body1" component="div" sx={{ fontWeight: 'bold' }}>
                    {card.title}
                  </Typography>
                  <img 
                    src={card.imagen} 
                    alt={card.title} 
                    style={{ 
                      width: '60px', // Tamaño fijo para uniformidad
                      height: '60px', 
                      objectFit: 'contain' // Mantiene proporciones de la imagen
                    }} 
                  />
                  
                </Box>
                
                <Typography variant="body2" color="text.secondary">
                  {card.description}
                </Typography>
              </CardContent>

            </Card>
        ))}
      </Box>
    );
  
};



export default SemestralLevantamientos;