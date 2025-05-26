// endpoints/FormularioLevantamientoPost.js
import express from 'express';
import { supabase } from '../config/supabase.js';

const router = express.Router();

// ======================= POST LEVANTAMIENTO =========================

router.post('/', async (req, res) => {
  console.log('------------------BODY RECIBIDO LEVANTAMIENTO:', req.body);
  const {
    carnet,
    carrera,
    nombre,
    correo,
    idsede,
    plandeestudio,
    cursoalevantar,
    requisitoalevantar,
    comentariosolicitud,
    otrodetalle
  } = req.body;

  try {
    // Paso 1: Insertar en tabla formulario (solo campos generales)
    const { data: formulario, error: errorFormulario } = await supabase
      .from('formulario')
      .insert([
        {
          idtipoformulario: 2, // tipo levantamiento
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
    console.log('RESULTADO FORMULARIO LEVANTAMIENTO:', formulario, errorFormulario);

    if (errorFormulario) return res.status(500).json({ error: errorFormulario.message });

    const idformulario = formulario.idformulario;

    // Paso 2: Insertar en tabla formulariolevantamientorn
    const { data: levantamiento, error: errorLevantamiento } = await supabase
      .from('formulariolevantamientorn')
      .insert([
        {
          idformulario,
          plandeestudio,
          cursoalevantar,
          requisitoalevantar,
          comentariosolicitud,
          otrodetalle
        }
      ])
      .select()
      .single();
    console.log('RESULTADO LEVANTAMIENTO:', levantamiento, errorLevantamiento);

    if (errorLevantamiento) return res.status(500).json({ error: errorLevantamiento.message });

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

    // Paso 4: Validación automática posterior (verifica si cumple con la regla)
    const { error: errorValidacion } = await supabase.rpc('verificar_aprobacion_levantamiento', {
      idform: idformulario
    });

    if (errorValidacion) {
      console.error('Error al ejecutar validación automática:', errorValidacion.message);
    }


    return res.status(201).json({
      mensaje: 'Formulario de levantamiento creado exitosamente',
      formulario,
      levantamiento,
      seguimiento
    });

  } catch (error) {
    console.error('ERROR INTERNO LEVANTAMIENTO:', error);
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
