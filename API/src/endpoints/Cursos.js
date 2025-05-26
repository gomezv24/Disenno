import express from 'express';
import { supabase } from '../config/supabase.js';

const router = express.Router();

// GET /cursos
router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('curso')
    .select('codigo, nombre');

  if (error) {
    return res.status(500).json({ error: 'Error al obtener los cursos: ' + error.message });
  }

  return res.json(data);
});

router.get('/getIdcurso', async (req, res) => {
  const { data, error } = await supabase
    .from('curso')
    .select('idcurso,codigo, nombre');

  if (error) {
    return res.status(500).json({ error: 'Error al obtener los cursos: ' + error.message });
  }

  return res.json(data);
});

export default router;
