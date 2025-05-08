import express from 'express';
import { supabase } from '../config/supabase.js';

const router = express.Router();

router.get('/sede', async (req, res) => {
  const { data, error } = await supabase.from('sede').select('*');
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  return res.json(data);
});


// trae todos los formularios de levantamientos
router.get('/levantamientos', async (req, res) => {
  const { data, error } = await supabase.from('formulario').select('*').eq('idtipoformulario', 2);
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  return res.json(data);
}
);

//trae todos los formularios de inclusiones
router.get('/inclusiones', async (req, res) => {
  const { data, error } = await supabase.from('formulario').select('*').eq('idtipoformulario', 1);
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  return res.json(data);
}
);

// trae los levantamientos aprobados
router.get('/seguimiento/levantamientos', async (req, res) => {
  let levantamientos = [];
  let levantamientosAprobados = [];
  const { data, error } = await supabase.from('seguimientoformulario').select('*');
  for (let i = 0; i < data.length; i++) {
    if (data[i].idestado === 3) {
      levantamientos.push(data[i]);
    }
  }
  for (let i = 0; i < levantamientos.length; i++) {
    const { data: data2, error: error2 } = await supabase.from('formulario').select('*').eq('idformulario', levantamientos[i].idformulario);
    
    levantamientos[i] = data2[0];
    if (data2[0].idtipoformulario === 2) {
      levantamientosAprobados.push(data2[0]);
    }
  }
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  return res.json(levantamientosAprobados);
}
);


// trae los levantamientos de RN aprobados
router.get('/seguimiento/levantamientos/rn', async (req, res) => {
  let levantamientos = [];
  let levantamientosAprobados = [];
  const { data, error } = await supabase.from('seguimientoformulario').select('*');
  for (let i = 0; i < data.length; i++) {
    if (data[i].idestado === 3) {
      levantamientos.push(data[i]);
    }
  }
  for (let i = 0; i < levantamientos.length; i++) {
    const { data: data2, error: error2 } = await supabase.from('formulario').select('*').eq('idformulario', levantamientos[i].idformulario);
    
    levantamientos[i] = data2[0];
    if (data2[0].idtipoformulario === 3) {
      levantamientosAprobados.push(data2[0]);
    }
  }
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  return res.json(levantamientosAprobados);
}
);

export default router;