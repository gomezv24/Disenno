// endpoints/FormularioInclusionPost.js
import express from 'express';
import { supabase } from '../config/supabase.js';

const router = express.Router();

// ======================= POST INCLUSION =========================

router.post('/', async (req, res) => {
  console.log('------------BODY RECIBIDO:', req.body);
  const {
    carnet,
    carrera,
    nombre,
    correo,
    telefono,
    idsede,
    idtipobeca,
    cursoinclusion,
    grupoinclusion,
    profesor,
    otroscursosmatriculados,
    tienechoquehorario,
    tienerequisitos,
    tienecursorn,
    consideraciones
  } = req.body;

  try {
    // Paso 1: Insertar en tabla formulario (solo campos generales)
    const { data: formulario, error: errorFormulario } = await supabase
      .from('formulario')
      .insert([
        {
          idtipoformulario: 1, // tipo inclusión
          carnet,
          carrera,
          nombre,
          correo,
          idsede,
          fechacreacion: new Date().toISOString()
        }
      ])
      .select()
      .single();
    console.log('RESULTADO FORMULARIO:', formulario, errorFormulario);

    if (errorFormulario) return res.status(500).json({ error: errorFormulario.message });

    const idformulario = formulario.idformulario;

    // Paso 2: Insertar en tabla formularioinclusion
    const { data: inclusion, error: errorInclusion } = await supabase
      .from('formularioinclusion')
      .insert([
        {
          idformulario,
          telefono,
          idtipobeca,
          cursoinclusion,
          grupoinclusion,
          profesor,
          otroscursosmatriculados,
          tienechoquehorario,
          tienerequisitos,
          tienecursorn,
          consideraciones
        }
      ])
      .select()
      .single();
    console.log('RESULTADO INCLUSION:', inclusion, errorInclusion);

    if (errorInclusion) return res.status(500).json({ error: errorInclusion.message });

    // Paso 3: Insertar en tabla seguimientoformulario
    const { data: seguimiento, error: errorSeguimiento } = await supabase
      .from('seguimientoformulario')
      .insert([
        {
          idformulario,
          idestado: 2, // Por ejemplo, 2 = Pendiente (ajusta según tu lógica de estados)
          semestre: obtenerSemestreActual(),
          fechacambio: new Date().toISOString(),
          comentarios: ''
        }
      ])
      .select()
      .single();
    console.log('RESULTADO SEGUIMIENTO:', seguimiento, errorSeguimiento);

    if (errorSeguimiento) return res.status(500).json({ error: errorSeguimiento.message });

    return res.status(201).json({
      mensaje: 'Formulario de inclusión creado exitosamente',
      formulario,
      inclusion,
      seguimiento
    });

  } catch (error) {
    console.error('ERROR INTERNO:', error);
    return res.status(500).json({ error: 'Error interno: ' + error.message });
  }
});

// Utilidad para obtener el semestre actual
function obtenerSemestreActual() {
  const fecha = new Date();
  const year = fecha.getFullYear();
  const mes = fecha.getMonth() + 1;
  return mes <= 6 ? `${year}-1` : `${year}-2`;
}

export default router;
