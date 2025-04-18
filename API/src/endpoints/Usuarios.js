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

  //combina loa datos para que todo esta en un mismo archivo
  const combinedData = {
    ...data, 
    estudiante 
  };
  return res.json(combinedData);
})

router.post('/', async (req, res) => {
  const { identificacion, nombre, correoinstitucional, contrasena, telefono, idsede, idtipousuario } = req.body;

  if (!identificacion || !nombre || !correoinstitucional || !contrasena || !telefono || !idsede || !idtipousuario) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  //verifica que no existan usuarios con a mism aidentificacion
    const { data: idActual, error: idError} = await supabase.from('usuario').select('*').eq('identificacion', identificacion);
    console.log(idActual);
    console.log(idError)
    if( idError) {
        //Verifica que el correo
        const { data: existingUser, error: checkError } = await supabase.from('usuario').select('*').eq('correoinstitucional', correoinstitucional).single();
        console.log(existingUser);
        if (checkError) {
            const { data, error } = await supabase.from('usuario').insert([
                { identificacion, nombre, correoinstitucional, contrasena, telefono, idsede }
            ]);
            if (error) {
                return res.status(500).json({ error: error.message });
            }
            //verifica el tipo de usuario
            /*if(idtipousuario == 3){
                const { data: estudiante, error: errorEstudiante } = await supabase.from('estudiante').insert([
                    { idusuario: data[0].idusuario, idtipousuario }
                ]);
                if (errorEstudiante) {
                    return res.status(500).json({ error: errorEstudiante.message });
                }
            if(idtipousuario == 2){
                const { data: coordinadora, error: errorCoordinadora } = await supabase.from('coordinadora').insert([
                    { idusuario: data[0].idusuario, idtipousuario }
                ]);
                if (errorCoordinadora) {
                    return res.status(500).json({ error: errorCoordinadora.message });
                }
            }*/
            return res.status(201).json(data, { message: 'Usuario creado exitosamente.' });
        }
        if (existingUser) {
            return res.status(400).json({ error: 'El correo ya está en uso.' });
        }
    }
    if (idActual) {
        return res.status(400).json({ error: 'El usuario ya existe.' });
    }
});

export default router;