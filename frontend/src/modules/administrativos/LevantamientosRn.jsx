import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  InputBase,
  Select,
  MenuItem
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

const mockData = [
  {
    sede: 'San Jose',
    carnet: '2022438535',
    estudiante: 'Méndez Abarca Maria',
    curso: 'IC1803 - TALLER DE PROGRAMACION',
    requisito: 'IC1803 - TALLER DE PROGRAMACION',
    estado: 'Aprobado',
    tipo: 'Automático',
  },
  {
    sede: 'San Jose',
    carnet: '2022438535',
    estudiante: 'Méndez Abarca Maria',
    curso: 'IC1803 - TALLER DE PROGRAMACION',
    requisito: 'IC1803 - TALLER DE PROGRAMACION',
    estado: 'Rechazada',
    tipo: 'Manual',
  },
];

const tags = ['Todos', 'Pendientes', 'Aprobados', 'Rechazados', 'Manuales', 'Automáticos'];

const EstadoColor = {
  Aprobado: '#4CAF50',
  Rechazada: '#F44336',
  Pendiente: '#FFC107',
};

const TipoColor = {
  Automático: '#2196F3',
  Manual: '#E91E63',
};

const LevantamientosRN = () => {
  const navigate = useNavigate();
  const [selectedTag, setSelectedTag] = useState('Todos');
  const [search, setSearch] = useState('');
  const [orden, setOrden] = useState('recientes');

  const filteredData = mockData.filter((row) => {
    const matchTag = selectedTag === 'Todos' || row.estado === selectedTag || row.tipo === selectedTag;
    const matchSearch = row.estudiante.toLowerCase().includes(search.toLowerCase());
    return matchTag && matchSearch;
  });

  return (
    <Box>
      {/* Navbar */}
      <AppBar position="static" elevation={0} sx={{ backgroundColor: '#fff', borderBottom: '1px solid #ddd' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box display="flex" alignItems="center">
            <img
              src="/logo.png"
              alt="Logo TEC"
              style={{ height: 50, marginRight: 16 }}
            />
            <Typography variant="h6" fontWeight="bold" sx={{ color: '#001B3D' }}>
              Levantamiento de requisitos y condición RN
            </Typography>
          </Box>
          <Box display="flex" gap={2}>
            <IconButton onClick={() => navigate('/PanelCoordinadora')} aria-label="Inicio">
              <HomeIcon sx={{ color: '#405F90' }} />
            </IconButton>
            <IconButton onClick={() => navigate('/perfil')} aria-label="Perfil">
              <AccountCircleIcon sx={{ color: '#405F90' }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 4 }}>
        <Typography variant="body1" gutterBottom>
          A continuación, se listan los levantamientos de requisitos requisitos y condición RN, su estado y tipo
        </Typography>

        {/* Tarjetas superiores */}
        <Grid container spacing={3} sx={{ my: 3 }}>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="body2">Total de levantamientos</Typography>
                <Typography variant="h5">100</Typography>
                <Typography variant="caption">I Semestre 2025</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="body2">Pendientes</Typography>
                <Typography variant="h5">40</Typography>
                <Typography variant="caption">I Semestre 2025</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="body2">Automáticos</Typography>
                <Typography variant="h5">80</Typography>
                <Typography variant="caption">I Semestre 2025</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Filtros */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Tabs value={selectedTag} onChange={(e, v) => setSelectedTag(v)}>
            {tags.map((tag) => (
              <Tab key={tag} value={tag} label={tag} />
            ))}
          </Tabs>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Paper sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Buscar estudiante"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <IconButton>
                <SearchIcon />
              </IconButton>
            </Paper>

            <Select
              value={orden}
              onChange={(e) => setOrden(e.target.value)}
              size="small"
            >
              <MenuItem value="recientes">Más recientes</MenuItem>
              <MenuItem value="antiguos">Más antiguos</MenuItem>
            </Select>
          </Box>
        </Box>

        {/* Tabla */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Sede</TableCell>
                <TableCell>Carnet</TableCell>
                <TableCell>Nombre del estudiante</TableCell>
                <TableCell>Cursos a matricular</TableCell>
                <TableCell>Requisito a levantar</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.sede}</TableCell>
                  <TableCell>{row.carnet}</TableCell>
                  <TableCell>{row.estudiante}</TableCell>
                  <TableCell>{row.curso}</TableCell>
                  <TableCell>{row.requisito}</TableCell>
                  <TableCell>
                    <Typography sx={{ color: '#fff', backgroundColor: EstadoColor[row.estado], px: 1.5, py: 0.5, borderRadius: 2, fontSize: '0.75rem', display: 'inline-block' }}>
                      {row.estado}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ color: '#fff', backgroundColor: TipoColor[row.tipo], px: 1.5, py: 0.5, borderRadius: 2, fontSize: '0.75rem', display: 'inline-block' }}>
                      {row.tipo}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <IconButton><VisibilityIcon /></IconButton>
                    <IconButton><EditIcon /></IconButton>
                    <IconButton><DeleteIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default LevantamientosRN;
