import React from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PersonIcon from '@mui/icons-material/Person';
import imagenRegistro from '../../assets/logoTec.png';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

const ReglamentosLevantamiento = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: 'Panel de Control', icon: <ManageAccountsIcon />, path: '/administrativo/panelControl' },
    { text: 'Inclusiones', icon: <SchoolIcon />, path: '/administrativo/listadoInclusiones' },
    { text: 'Levantamientos y RN ', icon: <TrendingUpIcon />, path: '/administrativo/levantamientorn' },
    { text: 'Reglamento de Levantamientos', icon: <MenuBookIcon />, path: '/administrativo/reglamento' },
  
  ];


  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
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
          <img src={imagenRegistro} alt="Logo del TEC" style={{ height: 60 }} />
        </Box>

        {/* Menú */}
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
      <Box sx={{ flexGrow: 1, p: 6 }}>
        <Container maxWidth="xl">
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#062043' }}>
            Reglamento Levantamiento de requisitos y condición RN
          </Typography>

          <Typography component="p" paragraph>
            El levantamiento de requisitos es una excepción académica que permite a los estudiantes cursar materias sin haber cumplido con algunos requisitos previos, bajo ciertas condiciones.
          </Typography>
          <Typography component="p" paragraph>
            Este proceso busca:
          </Typography>
          <ul>
            <li>Acelerar el proceso de graduación.</li>
            <li>Optimizar el uso de recursos de la Escuela.</li>
            <li>Facilitar la matrícula sin comprometer la calidad académica.</li>
          </ul>
          <Typography component="p" sx={{ mt: 2, fontWeight: 'bold' }}>
            Nota importante: La Escuela no está obligada a autorizar ningún levantamiento. Cada caso se evalúa de forma individual.
          </Typography>

          <Box
            sx={{
              mt: 4,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 3,
            }}
          >
            <InfoCard
              title="Reglas generales"
              content={`Información importante sobre el proceso de levantamiento de requisitos

              • Las solicitudes se tramitan en el período de inclusiones.
              • No se autoriza el cambio de grupo.
              • Las condiciones laborales no son motivo suficiente.
              • Si un estudiante no aprueba el curso tras el levantamiento, no se volverá a levantar ese requisito en el futuro.
              • Las decisiones de Coordinación son inapelables.`}
            />

            <InfoCard
              title="Reglamento oficial"
              content={
                <>
                  <Typography variant="body2" component="p" paragraph>
                    Basado en el Reglamento de Régimen de Enseñanza (RRE), Artículos 34 y 34 Bis
                  </Typography>
                  <Typography variant="body2" component="p" paragraph>
                    Las autoridades académicas pueden autorizar levantamientos, de forma justificada y según criterios del Consejo de Escuela.
                  </Typography>
                  <Link 
                      href="/lineamientos-levantamientos.pdf" 
                      underline="hover" 
                      target="_blank" 
                      rel="noopener"
                      aria-label="Abrir archivo PDF de Lineamientos Levantamientos de Requisitos en una nueva pestaña">
                      Lineamientos Levantamientos de Requisitos.pdf
                    </Link>

                </>
              }
            />

            <InfoCard
              title="Requisitos que no se pueden levantar"
              content={`• Cursos de primer año de la carrera.
                        • Si se deben cursos de VI semestre o anteriores, no se permite levantar cursos de VI o VII semestre.
                        • Taller de Diseño (DIGRAF) no se levanta sin tener Cálculo aprobado.`}
            />

            <InfoCard
              title="Requisitos automáticos"
              content={
                <>
                  <Typography variant="body2" component="p" paragraph>
                    Estos requisitos se procesan de forma automática si cumple con los criterios establecidos.
                  </Typography>
                  <Typography variant="body2" component="p" paragraph>
                    Para conocer los requisitos automáticos puedes seleccionar el siguiente botón:
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => navigate('/administrativo/requisitosAuto')}
                      aria-label="Ver lista de requisitos automáticos"
                      sx={{
                        mb: 3,
                        backgroundColor: '#405F90',
                        color: '#fff',
                        '&:hover': {
                          backgroundColor: '#324b73',
                        },
                      }}
                    >
                      Requisitos automáticos
                    </Button>
                  </Box>
                </>
              }
            />

            <InfoCard
              title="Cursos que se analizan individualmente"
              content={`Basado en el Reglamento de Régimen de Enseñanza (RRE), Artículos 34 y 34 Bis

                Algunos cursos y situaciones deben ser revisadas por la Coordinación del Campus/Centro, especialmente si:

                • Retrasan Práctica Profesional.
                • Se trata de electivos (por cambio de código por semestre).
                • Hay errores de registro de notas pendientes de corregir.
                • Son solicitudes de otros campus.

                En estos casos, se debe presentar justificación y documentación formal.`}
            />
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

function InfoCard({ title, content }) {
  return (
    <Card
      role="region"
      aria-label={title}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: 2,
        boxShadow: 2,
        minHeight: 360,
      }}
    >
      <Box
        sx={{
          backgroundColor: '#002B5C',
          paddingY: 1.5,
          paddingX: 2,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        }}
      >
        <Typography
          variant="subtitle1"
          component="h2"
          sx={{ color: '#fff', fontWeight: 'bold' }}
        >
          {title}
        </Typography>
      </Box>

      <CardContent sx={{ flexGrow: 1 }}>
        {typeof content === 'string' ? (
          <Typography
            component="div"
            sx={{
              whiteSpace: 'pre-line',
              fontSize: '0.95rem',
              color: 'text.secondary',
            }}
          >
            {content}
          </Typography>
        ) : (
          content
        )}
      </CardContent>
    </Card>
  );
}

export default ReglamentosLevantamiento;
