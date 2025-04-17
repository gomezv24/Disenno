import express from 'express';
import { supabase } from '../config/supabase.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('usuario').select('*');
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  return res.json(data);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('usuario').select('*').eq('idusuario', id).single();
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  return res.json(data);
});

router.get('/email/:email', async (req, res) => {
  const { email } = req.params;
  const { data, error } = await supabase.from('usuario').select('*').eq('correoinstitucional', email).single();
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  return res.json(data);
});

router.get('/estudiante/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('usuario').select('*').eq('idusuario', id).single();
  const { data: estudiante, error: errorEstudiante } = await supabase.from('estudiante').select('*').eq('idusuario', id).single();
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  const combinedData = {
    ...data, // Datos del usuario
    estudiante // Datos del estudiante
  };
  return res.json(combinedData);
})


export default router;