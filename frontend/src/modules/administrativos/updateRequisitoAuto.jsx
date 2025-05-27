import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { obtenerCursos } from './Funciones/coordinadoraFun';
import { obtenerRequisitoPorId } from './Funciones/coordinadoraFun';
import { actualizarRequisito } from './Funciones/coordinadoraFun';

const EditarRequisitoAutomatico = () => {
  const { id } = useParams(); // <- ID del requisito a editar
  const navigate = useNavigate();

  // Estados para el formulario
  const [cursoObjetivo, setCursoObjetivo] = useState('');
  const [cursoRequerido, setCursoRequerido] = useState('');
  const [planEstudio, setPlanEstudio] = useState('');
  const [regla, setRegla] = useState('');
  const [cursoRegla, setCursoRegla] = useState('');

  // ⚠️ Pronto se llenará este array con los cursos desde la API
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
  if (!id) return; // evita correr si aún no hay id

  const cargarDatos = async () => {
    try {
      const requisito = await obtenerRequisitoPorId(id);
      const cursos = await obtenerCursos();

      setCursos(cursos);
      setCursoObjetivo(String(requisito.idcurso_objetivo));
      setCursoRequerido(String(requisito.idcurso_requerido));
      setPlanEstudio(requisito.tipo_levantamiento);
      setRegla(requisito.regla);
      setCursoRegla(String(requisito.idcurso_regla));
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  };

  cargarDatos();
}, [id]);



  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 600, backgroundColor: '#e8f0fe' }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Editar Requisito Automático
        </Typography>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="curso-objetivo-label">Curso a matricular</InputLabel>
          <Select
            labelId="curso-objetivo-label"
            value={cursoObjetivo}
            label="Curso a matricular"
            onChange={(e) => setCursoObjetivo(e.target.value)}
          >
            {cursos.map((curso) => (
              <MenuItem key={curso.idcurso} value={curso.idcurso}>
                {curso.nombre} ({curso.codigo})
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="curso-requerido-label">Requisito a levantar</InputLabel>
          <Select
            labelId="curso-requerido-label"
            value={cursoRequerido}
            label="Requisito a levantar"
            onChange={(e) => setCursoRequerido(e.target.value)}
          >
            {cursos.map((curso) => (
              <MenuItem key={curso.idcurso} value={curso.idcurso}>
                {curso.nombre} ({curso.codigo})
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="plan-estudio-label">Plan de estudio</InputLabel>
          <Select
            labelId="plan-estudio-label"
            value={planEstudio}
            label="Plan de estudio"
            onChange={(e) => setPlanEstudio(e.target.value)}
          >
            <MenuItem value={410}>410</MenuItem>
            <MenuItem value={411}>411</MenuItem>
            <MenuItem value={412}>412</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="curso-regla-label">Curso que cumple la regla</InputLabel>
            <Select
                labelId="curso-regla-label"
                value={cursoRegla}
                label="Curso que cumple la regla"
                onChange={(e) => setCursoRegla(e.target.value)}
            >
                <MenuItem value="" disabled>
                -- Seleccione un curso --
                </MenuItem>
                {cursos.map((curso) => (
                <MenuItem key={curso.idcurso} value={String(curso.idcurso)}>
                    {curso.nombre} ({curso.codigo})
                </MenuItem>
                ))}
            </Select>
            </FormControl>
    

        <TextField
          fullWidth
          multiline
          minRows={3}
          label="Regla para levantar"
          value={regla}
          onChange={(e) => setRegla(e.target.value)}
          sx={{ mb: 3 }}
        />

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ backgroundColor: '#405F90', '&:hover': { backgroundColor: '#324b73' } }}
            onClick={async () => {
                try {
                    const datos = {
                    idcurso_objetivo: parseInt(cursoObjetivo, 10),
                    idcurso_requerido: parseInt(cursoRequerido, 10),
                    tipo_levantamiento: planEstudio,
                    regla,
                    idcurso_regla: parseInt(cursoRegla, 10),

                    };

                    await actualizarRequisito(id, datos);
                    navigate('/administrativo/requisitosAuto'); // <- Redirige al inicio
                } catch (error) {
                    console.error(error);
                }
                }}

          >
            Guardar Cambios
          </Button>
          <Button variant="outlined" onClick={() => navigate(-1)}>
            Cancelar
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default EditarRequisitoAutomatico;
