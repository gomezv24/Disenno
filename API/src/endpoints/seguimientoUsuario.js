import express from 'express';
import { supabase } from '../config/supabase.js';

const router = express.Router();

// ======================= GET SEGUIMIENTO USUARIO =========================
// Devuelve el historial de formularios (inclusiones y levantamientos) y su seguimiento para un usuario
router.get('/:idusuario', async (req, res) => {
  const { idusuario } = req.params;

  try {
    // Paso 1: Obtener el carnet del estudiante desde su idusuario
    const { data: estudiante, error: errorEst } = await supabase
      .from('estudiante')
      .select('carnet')
      .eq('idusuario', idusuario)
      .single();

    if (errorEst || !estudiante) {
      return res.status(404).json({ error: 'No se encontró el estudiante para este usuario.' });
    }

    // Paso 2: Buscar los formularios relacionados al carnet del estudiante
    const { data: formularios, error: errorFormularios } = await supabase
      .from('formulario')
      .select('idformulario, idtipoformulario, carnet, nombre, correo, fechacreacion')
      .eq('carnet', estudiante.carnet);

    if (errorFormularios) {
      return res.status(500).json({ error: errorFormularios.message });
    }

    // Paso 3: Buscar todos los seguimientos de esos formularios
    const ids = (formularios || []).map(f => f.idformulario);
    let seguimientos = [];
    if (ids.length > 0) {
      const { data: segs, error: errorSegs } = await supabase
        .from('seguimientoformulario')
        .select('idformulario, idestado, semestre, fechacambio, comentarios')
        .in('idformulario', ids);

      if (errorSegs) return res.status(500).json({ error: errorSegs.message });
      seguimientos = segs;
    }

    // Mapear tipo de formulario
    const tipoMap = { 1: 'Inclusión', 2: 'Levantamiento' };
    const estadoMap = { 1: 'Nuevo', 2: 'Pendiente', 3: 'Aprobado', 4: 'Rechazado' };

    // Paso 4: Unir datos para el frontend
    const resultado = await Promise.all((formularios || []).map(async f => {
      const seg = (seguimientos || []).find(s => s.idformulario === f.idformulario);
      let curso = '';

      if (f.idtipoformulario === 1) {
        // Inclusión: buscar curso
        const { data: inc, error: errInc } = await supabase
          .from('formularioinclusion')
          .select('cursoinclusion')
          .eq('idformulario', f.idformulario)
          .single();
        if (inc && inc.cursoinclusion) curso = inc.cursoinclusion;
      } else if (f.idtipoformulario === 2) {
        // Levantamiento: buscar curso
        const { data: lev, error: errLev } = await supabase
          .from('formulariolevantamientorn')
          .select('cursoalevantar')
          .eq('idformulario', f.idformulario)
          .single();
        if (lev && lev.cursoalevantar) curso = lev.cursoalevantar;
      }

      return {
        idformulario: f.idformulario, // <-- Asegura que el id esté presente para el frontend
        tipo: tipoMap[f.idtipoformulario] || 'Desconocido',
        semestre: seg ? seg.semestre : '',
        curso,
        estado: seg ? (estadoMap[seg.idestado] || seg.idestado) : 'Sin seguimiento',
        fecha: f.fechacreacion
      };
    }));

    res.json(resultado);
  } catch (error) {
    console.error('Error en seguimientoUsuario:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

// ======================= DELETE SOLICITUD =========================
// Elimina una solicitud y sus datos relacionados
router.delete('/:idformulario', async (req, res) => {
  const { idformulario } = req.params;
  try {
    // 1. Eliminar de seguimientoformulario (primero los hijos)
    const delSeg = await supabase.from('seguimientoformulario').delete().eq('idformulario', idformulario);
    // 2. Eliminar de formularioinclusion y formulariolevantamientorn (solo uno existirá)
    const delInc = await supabase.from('formularioinclusion').delete().eq('idformulario', idformulario);
    const delLev = await supabase.from('formulariolevantamientorn').delete().eq('idformulario', idformulario);
    // 3. Eliminar de formulario (al final)
    const delForm = await supabase.from('formulario').delete().eq('idformulario', idformulario);

    res.json({
      success: true,
      deleted: {
        seguimiento: delSeg.count,
        inclusion: delInc.count,
        levantamiento: delLev.count,
        formulario: delForm.count
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la solicitud', detalle: error.message });
  }
});

export default router;
