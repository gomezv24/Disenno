import express from 'express';
import { supabase } from '../config/supabase.js';

const router = express.Router();

router.get('/:tipo', async (req, res) => {
  const tipoOriginal = req.params.tipo;
  const tipoLimpio = tipoOriginal.trim();

  //console.log('Tipo recibido limpio:', tipoLimpio);

  // Buscar el tipo de formulario
  const { data: tipoForm, error: errorTipo } = await supabase
    .from('tipoformulario')
    .select('idtipoformulario')
    .ilike('nombre', tipoLimpio)
    .maybeSingle();

  //console.log('tipoForm:', tipoForm);
  if (errorTipo) {
    console.error('Error en tipoformulario:', errorTipo.message);
    return res.status(500).json({ error: errorTipo.message });
  }

  if (!tipoForm) {
    return res.status(404).json({ error: `No se encontró el tipo de formulario: ${tipoLimpio}` });
  }

  console.log('ID tipoformulario:', tipoForm.idtipoformulario);

  // Buscar el contenido
  const { data, error } = await supabase
    .from('contenido_solicitud')
    .select('*')
    .eq('"id_tipo_formulario"', tipoForm.idtipoformulario);

  console.log('Data cruda obtenida:', data);
  if (error) {
    console.error('Error al consultar contenido_solicitud:', error.message);
    return res.status(500).json({ error: error.message });
  }

  if (!data || data.length === 0) {
    console.warn('No se encontró contenido con id_tipo_formulario =', tipoForm.idtipoformulario);
    return res.status(404).json({ error: 'No se encontró contenido para este tipo de formulario' });
  }

  return res.json(data);
});

export default router;
