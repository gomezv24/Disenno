import express from 'express';
import { supabase } from '../config/supabase.js';

const router = express.Router();

// traer formularios
router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('formulario').select('*');
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  return res.json(data);
});

//crear formularios




//formulario levantamientos
router.get('/levantamientos', async (req, res) => {
    
    const { data, errorL} = await supabase.from('formulariolevantamientorn').select('*');
    if (errorL) {
        return res.status(500).json({ error: errorL.message });
    }
    
    return res.json(data);
});

//formularios levantamientos por id
router.get('/levantamientos/:id', async (req, res) => {
    const { id } = req.params;

    const { data: levantamientos, error: errorL } = await supabase.from('formulariolevantamientorn').select('*').eq('idformulario', id)
    if (errorL) {
        return res.status(500).json({ error: errorL.message });
    }

    const combinedData = await Promise.all(
        levantamientos.map(async (levantamiento) => {
            const { data: formulario, error: errorFormulario } = await supabase
                .from('formulario')
                .select('*')
                .eq('idformulario', levantamiento.idformulario)
                .single();

            if (errorFormulario) {
                console.error(`Error al obtener formulario con id ${levantamiento.idformulario}:`, errorFormulario.message);
                return { ...levantamiento, formulario: null }; // Si hay error, incluye el formulario como null
            }

            return { ...levantamiento, formulario }; // Combina la inclusión con su formulario
        })
    );

    return res.json(combinedData);
});

//formularios levantamientos con su formulario
router.get('/levantamientosF', async (req, res) => {
    const { id } = req.params;

    const { data: levantamientos, error: errorL } = await supabase.from('formulariolevantamientorn').select('*')
    if (errorL) {
        return res.status(500).json({ error: errorL.message });
    }

    const combinedData = await Promise.all(
        levantamientos.map(async (levantamiento) => {
            const { data: formulario, error: errorFormulario } = await supabase
                .from('formulario')
                .select('*')
                .eq('idformulario', levantamiento.idformulario)
                .single();

            if (errorFormulario) {
                console.error(`Error al obtener formulario con id ${levantamiento.idformulario}:`, errorFormulario.message);
                return { ...levantamiento, formulario: null }; // Si hay error, incluye el formulario como null
            }

            return { ...levantamiento, formulario }; // Combina la inclusión con su formulario
        })
    );

    return res.json(combinedData);
});

//Formulario inclusiones
//todas las inclusiones, pero solo las inclusiones
router.get('/inclusiones', async (req, res) => {
    const { data, errorL} = await supabase.from('formularioinclusion').select('*');
    if (errorL) {
        return res.status(500).json({ error: errorL.message });
    }
    
    return res.json(data);
});

//inclusiones por id
router.get('/inclusiones/:id', async (req, res) => {
    
    const { id } = req.params;

    const { data: inclusiones, error: errorL } = await supabase.from('formularioinclusion').select('*').eq('idformulario', id)
    if (errorL) {
        return res.status(500).json({ error: errorL.message });
    }

    const combinedData = await Promise.all(
        inclusiones.map(async (inclusion) => {
            const { data: formulario, error: errorFormulario } = await supabase
                .from('formulario')
                .select('*')
                .eq('idformulario', inclusion.idformulario)
                .single();

            if (errorFormulario) {
                console.error(`Error al obtener formulario con id ${inclusion.idformulario}:`, errorFormulario.message);
                return { ...inclusion, formulario: null }; // Si hay error, incluye el formulario como null
            }

            return { ...inclusion, formulario }; // Combina la inclusión con su formulario
        })
    );

    return res.json(combinedData);

    
});

//trae inclusiones y el formulario
router.get('/inclusionesF', async (req, res) => {

    const { data: inclusiones, error: errorL } = await supabase.from('formularioinclusion').select('*')
    if (errorL) {
        return res.status(500).json({ error: errorL.message });
    }

    const combinedData = await Promise.all(
        inclusiones.map(async (inclusion) => {
            const { data: formulario, error: errorFormulario } = await supabase
                .from('formulario')
                .select('*')
                .eq('idformulario', inclusion.idformulario)
                .single();

            if (errorFormulario) {
                console.error(`Error al obtener formulario con id ${inclusion.idformulario}:`, errorFormulario.message);
                return { ...inclusion, formulario: null }; // Si hay error, incluye el formulario como null
            }

            return { ...inclusion, formulario }; // Combina la inclusión con su formulario
        })
    );

    return res.json(combinedData);
});

//fromulario de la tabla seguimiento
router.get('/seguimiento/:id', async (req, res) => {
    
    const { id } = req.params;

    const { data, errorL} = await supabase.from('seguimientoformulario').select('*').eq('idformulario', id);
    if (errorL) {
        return res.status(500).json({ error: errorL.message });
    }
    
    return res.json(data);
});

//devuelve el estado del formulario
router.get('/estado/:id', async (req, res) => {
    
    const { id } = req.params;
    const { data, errorL} = await supabase.from('estadosolicitud').select('*').eq('idestado', id);
    if (errorL) {
        return res.status(500).json({ error: errorL.message });
    }
    return res.json(data);
});

//sede por id
router.get('/sede/:id', async (req, res) => {
    
    const { id } = req.params;
    const { data, errorL} = await supabase.from('sede').select('*').eq('idsede', id);
    if (errorL) {
        return res.status(500).json({ error: errorL.message });
    }
    
    return res.json(data);
});

//becas
router.get('/tipobeca/:id', async (req, res) => {
    
    const { id } = req.params;
    const { data, errorL} = await supabase.from('tipobeca').select('*').eq('idtipobeca', id);
    if (errorL) {
        return res.status(500).json({ error: errorL.message });
    }
    
    return res.json(data);
});

export default router;