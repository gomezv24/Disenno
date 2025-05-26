import { Router } from 'express';
import { supabase } from '../config/supabase.js';

const router = Router();

function obtenerSemestreActual() {
  const fecha = new Date();
  const mes = fecha.getMonth() + 1;
  const year = fecha.getFullYear();
  return mes <= 6 ? `${year}-1` : `${year}-2`;
}

router.put('/actualizarEstado', async (req, res) => {
  console.log("BODY RECIBIDO:", req.body);

  try {
    if (!req.body || typeof req.body !== 'object') {
      return res.status(400).json({ error: 'Cuerpo de la solicitud inválido' });
    }

    const { idformulario, idestado } = req.body;

    if (idformulario === undefined || idestado === undefined) {
      return res.status(400).json({ error: 'Faltan parámetros requeridos' });
    }

    const { data, error } = await supabase
    .from('seguimientoformulario')
    .update({
      idestado,
      fechacambio: new Date().toISOString(),
      comentarios: ''
    })
    .eq('idformulario', idformulario);


    if (error) {
      console.error('Supabase Error:', error);
      return res.status(500).json({ error: error.message || 'Error de base de datos' });
    }

    return res.status(200).json({ mensaje: 'Estado actualizado correctamente', data });
  } catch (err) {
    console.error('Error inesperado:', err.message);
    return res.status(500).json({ error: err.message || 'Error interno del servidor' });
  }
});

router.get('/requerimientosLevAuto', async (req, res) => {
  const { data, error } = await supabase
    .from('levantamiento_requisito')
    .select(`
      idlevantamiento,
      regla,
      curso_objetivo: idcurso_objetivo (idcurso, codigo, nombre),
      curso_requerido: idcurso_requerido (idcurso, codigo, nombre)
    `);

  if (error) {
    console.error('Error al obtener datos:', error.message);
    return res.status(500).json({ error: error.message });
  }

  return res.json(data);
});



export default router;
