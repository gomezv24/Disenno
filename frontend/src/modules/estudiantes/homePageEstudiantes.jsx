// Página de inicio para estudiantes con estructura accesible HTML5
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  TextField,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';

// Íconos de navegación
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import RuleFolderIcon from '@mui/icons-material/RuleFolder';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import PersonIcon from '@mui/icons-material/Person';

// Imágenes
import imagenRegistro from '../../assets/logoTec.png';

const HomePageEstudiantes = () => {
  const location = useLocation();

  // Menú lateral: enlaces a las distintas secciones del sistema
  const menuItems = [
    { text: 'Inicio', icon: <HomeIcon />, path: '/' },
    { text: 'Inclusiones', icon: <SchoolIcon />, path: '/inclusiones' },
    { text: 'Levantamientos', icon: <TrendingUpIcon />, path: '/levantamientos' },
    { text: 'Retiros', icon: <ExitToAppIcon />, path: '/retiros' },
    { text: 'Seguimiento', icon: <AssignmentTurnedInIcon />, path: '/seguimiento' },
    { text: 'Usuario', icon: <PersonIcon />, path: '/perfil' }
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>

      {/* ======================= MENÚ DE NAVEGACIÓN ======================= */}
      <nav aria-label="Menú principal" style={{ width: '250px', backgroundColor: '#ffffff', color: '#062043', padding: '32px 0', boxShadow: '2px 0 5px rgba(0,0,0,0.1)', borderRight: '1px solid #ddd', height: '100vh' }}>
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

      {/* ======================= CONTENIDO PRINCIPAL ======================= */}
      <main style={{ flex: 1 }}>

        {/* ------------------ ENCABEZADO DE PÁGINA ------------------ */}
        <header>
          <Container sx={{ px: 5, pt: 6 }}></Container>
        </header>

        {/* ------------------ TÍTULO PRINCIPAL Y BUSCADOR ------------------ */}
        <Container sx={{ px: 5, py: 2 }}>
          <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold', color: '#062043', mb: 3 }}>
            Gestión de Fondos
          </Typography>

          {/* Barra de búsqueda y botón de seguimiento */}
          <Box component="section" aria-label="Buscador" sx={{ display: 'flex', alignItems: 'center', flexWrap: 'nowrap', gap: 2, mb: 5 }}>
            <TextField
              variant="outlined"
              placeholder="Buscar formularios o procesos..."
              size="medium"
              sx={{
                flexGrow: 1,
                minWidth: '700px',
                maxWidth: '1000px',
                height: '56px',
                '& .MuiInputBase-root': { height: '56px' }
              }}
              inputProps={{ 'aria-label': 'Campo de búsqueda' }}
            />
            <Button variant="contained" sx={{ height: '56px', backgroundColor: '#3b5998', textTransform: 'none', fontWeight: 'bold', px: 4 }}>
              Buscar
            </Button>
            <Button component={Link} to="/seguimiento" variant="contained" sx={{ height: '56px', backgroundColor: '#3b5998', textTransform: 'none', fontWeight: 'bold', px: 3 }}>
              Seguimiento
            </Button>
          </Box>

          {/* ------------------ SECCIÓN DE TARJETAS ------------------ */}
          <Box sx={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'flex-start' }}>

            {/* -------- TARJETA: Inclusión -------- */}
            <section>
              <article>
                <Card sx={{ width: '290px', minHeight: '460px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 3 }}>
                  <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', flexGrow: 1 }}>
                    <LibraryAddIcon sx={{ fontSize: 50, color: '#062043', mb: 2 }} />
                    <Typography component="h2" variant="h6" sx={{ fontWeight: 'bold' }}>Inclusión a cursos</Typography>
                    <Typography component="p" variant="body2" sx={{ fontSize: '0.85rem' }}>
                      Proceso de inclusión a cursos no matriculados
                    </Typography>
                    <Typography component="p" variant="body2" sx={{ textAlign: 'justify', mt: 3 }}>
                      La inclusión a cursos es un proceso mediante el cual los estudiantes pueden solicitar la incorporación a asignaturas...
                    </Typography>
                    <Typography component="p" variant="body2" sx={{ fontWeight: 'bold', mt: 5 }}>
                      Fecha de inclusiones: 15 de febrero del 2025
                    </Typography>
                    <Button component={Link} to="/inclusiones" variant="contained" fullWidth sx={{ backgroundColor: '#3b5998', mt: 3 }}>
                      Más información
                    </Button>
                  </CardContent>
                </Card>
              </article>
            </section>

            {/* -------- TARJETA: Levantamiento -------- */}
            <section>
              <article>
                <Card sx={{ width: '290px', minHeight: '460px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 3 }}>
                  <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', flexGrow: 1 }}>
                    <RuleFolderIcon sx={{ fontSize: 50, color: '#062043', mb: 2 }} />
                    <Typography component="h2" variant="h6" sx={{ fontWeight: 'bold' }}>Levantamiento</Typography>
                    <Typography component="p" variant="body2" sx={{ fontSize: '0.85rem' }}>
                      Solicitud de levantamiento de requisitos o condición especial
                    </Typography>
                    <Typography component="p" variant="body2" sx={{ textAlign: 'justify', mt: 3 }}>
                      Permite solicitar el levantamiento de un requisito académico o la matrícula bajo condición especial RN...
                    </Typography>
                    <Typography component="p" variant="body2" sx={{ fontWeight: 'bold', mt: 5 }}>
                      Fecha de solicitudes: 27 y 28 de junio del 2024
                    </Typography>
                    <Button component={Link} to="/levantamientos" variant="contained" fullWidth sx={{ backgroundColor: '#3b5998', mt: 3 }}>
                      Más información
                    </Button>
                  </CardContent>
                </Card>
              </article>
            </section>

            {/* -------- TARJETA: Retiro -------- */}
            <section>
              <article>
                <Card sx={{ width: '290px', minHeight: '460px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 3 }}>
                  <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', flexGrow: 1 }}>
                    <RemoveCircleOutlineIcon sx={{ fontSize: 50, color: '#062043', mb: 2 }} />
                    <Typography component="h2" variant="h6" sx={{ fontWeight: 'bold' }}>Retiro de cursos</Typography>
                    <Typography component="p" variant="body2" sx={{ fontSize: '0.85rem' }}>
                      Proceso para solicitar el retiro de asignaturas
                    </Typography>
                    <Typography component="p" variant="body2" sx={{ textAlign: 'justify', mt: 3 }}>
                      El retiro de cursos permite a los estudiantes darse de baja de una asignatura previamente matriculada...
                    </Typography>
                    <Typography component="p" variant="body2" sx={{ fontWeight: 'bold', mt: 5 }}>
                      Fecha límite de retiro: Semana 6 del semestre
                    </Typography>
                    <Button component={Link} to="/retiros" variant="contained" fullWidth sx={{ backgroundColor: '#3b5998', mt: 3 }}>
                      Más información
                    </Button>
                  </CardContent>
                </Card>
              </article>
            </section>
          </Box>
        </Container>

        {/* ======================= PIE DE PÁGINA ======================= */}
        <footer>
          <Container sx={{ px: 5, py: 4 }}>
            <Typography variant="body2" color="textSecondary" align="center">
              © 2025 Diseño de sofware I semestre.
            </Typography>
          </Container>
        </footer>

      </main>
    </Box>
  );
};

export default HomePageEstudiantes;