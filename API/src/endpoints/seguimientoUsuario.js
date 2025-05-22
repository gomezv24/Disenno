// endpoints/seguimientoUsuario.js
import express from 'express';
import { supabase } from '../config/supabase.js';

const router = express.Router();

// ======================= GET SEGUIMIENTO USUARIO =========================
// Devuelve el historial de formularios (inclusiones y levantamientos) y su seguimiento para un usuario
router.get('/:idusuario', async (req, res) => {
  const { idusuario } = req.params;
  try {
    // Buscar todos los formularios del usuario
    const { data: formularios, error: errorFormularios } = await supabase
      .from('formulario')
      .select('idformulario, idtipoformulario, carnet, nombre, correo, fechacreacion')
      .eq('idusuario', idusuario);
    if (errorFormularios) return res.status(500).json({ error: errorFormularios.message });

    // Buscar todos los seguimientos de estos formularios
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
    // Mapear estado (ajusta según tu lógica de estados)
    const estadoMap = { 1: 'Nuevo', 2: 'Pendiente', 3: 'Aprobado', 4: 'Rechazado' };

    // Unir datos para frontend
    const resultado = await Promise.all((formularios || []).map(async f => {
      const seg = (seguimientos || []).find(s => s.idformulario === f.idformulario);
      let curso = '';
      if (f.idtipoformulario === 1) {
        // Inclusión: buscar en formularioinclusion
        const { data: inc, error: errInc } = await supabase
          .from('formularioinclusion')
          .select('cursoinclusion')
          .eq('idformulario', f.idformulario)
          .single();
        if (inc && inc.cursoinclusion) curso = inc.cursoinclusion;
      } else if (f.idtipoformulario === 2) {
        // Levantamiento: buscar en formulariolevantamientorn
        const { data: lev, error: errLev } = await supabase
          .from('formulariolevantamientorn')
          .select('cursoalevantar')
          .eq('idformulario', f.idformulario)
          .single();
        if (lev && lev.cursoalevantar) curso = lev.cursoalevantar;
      }
      return {
        tipo: tipoMap[f.idtipoformulario] || 'Desconocido',
        semestre: seg ? seg.semestre : '',
        curso,
        estado: seg ? (estadoMap[seg.idestado] || seg.idestado) : 'Sin seguimiento',
        fecha: f.fechacreacion
      };
    }));
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

export default router;
