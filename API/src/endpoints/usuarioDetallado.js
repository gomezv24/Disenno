import express from 'express';
import { supabase } from '../config/supabase.js';

const router = express.Router();

// GET /usuariodetallado/:id
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  // Usuario base
  const { data: usuario, error: errorUsuario } = await supabase
    .from('usuario')
    .select('*')
    .eq('idusuario', id)
    .single();

  if (errorUsuario || !usuario) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  // Estudiante con idcarrera y idtipobeca
  const { data: estudiante, error: errorEstudiante } = await supabase
    .from('estudiante')
    .select('carnet, idcarrera')
    .eq('idusuario', id)
    .single();

  // Carrera
  let carreraNombre = null;
  if (estudiante?.idcarrera) {
    const { data: carrera, error: errorCarrera } = await supabase
      .from('carrera')
      .select('nombre')
      .eq('idcarrera', estudiante.idcarrera)
      .single();

    if (!errorCarrera && carrera) {
      carreraNombre = carrera.nombre;
    }
  }

  return res.json({
    ...usuario,
    estudiante: estudiante
      ? {
          carnet: estudiante.carnet,
          carrera: carreraNombre
        }
      : null
  });
});

export default router;
