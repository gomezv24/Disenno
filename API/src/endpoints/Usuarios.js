import express from 'express';
import { supabase } from '../config/supabase.js';
import bcrypt from 'bcrypt';

const saltRounds = 10;

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

  //combina loa datos para que todo esta en un mismo archivo
  const combinedData = {
    ...data, 
    estudiante 
  };
  return res.json(combinedData);
})

router.post('/', async (req, res) => {
  const { identificacion, nombre, correoinstitucional, contrasena, telefono, idsede, idtipousuario } = req.body;


  //se hashea la contrasena para encriptar
  const hashedPassword = await bcrypt.hash(contrasena, 10);

  //verifica que no existan usuarios con a mism aidentificacion
    const { data: idActual, error: idError} = await supabase.from('usuario').select('*').eq('identificacion', identificacion);

    if( idActual.length == 0){ 
        //Verifica que el correo
        const { data: existingUser, error: checkError } = await supabase.from('usuario').select('*').eq('correoinstitucional', correoinstitucional).single();

        if (checkError) {
            const { data, error } = await supabase.from('usuario').insert([
                { identificacion, nombre, correoinstitucional, contrasena: hashedPassword, telefono, idsede, idtipousuario }
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
            return res.status(201).json(data);
        }
        if (existingUser) {
            return res.status(400).json({ error: 'El correo ya está en uso.' });
        }
    }
    if (idActual) {
        return res.status(400).json({ error: 'El usuario ya existe.' });
    }
});


// obtener el rol del usuario
router.get('/rol/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('usuario').select('idtipousuario').eq('idusuario', id).single();
  if (error) {
    return res.status(500).json({ error: error.message });
  }

  //trae el tipo de usuario 
  const { data: tipoUsuario, error: errorTipoUsuario } = await supabase.from('tipousuario').select('nombre').eq('idtipousuario', data.idtipousuario).single();
  if (errorTipoUsuario) {
    return res.status(500).json({ error: errorTipoUsuario.message });
  }

  return res.json(tipoUsuario);
});

//autenticar
router.post('/login', async (req, res) => {


  const { correoinstitucional, contrasena } = req.body;


  const { data, error } = await supabase.from('usuario').select('*').eq('correoinstitucional', correoinstitucional).single();

  if (!data || error) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }
  const iguales = await bcrypt.compare(contrasena, data.contrasena);
  if (!iguales) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }
  return res.json(data);
});


router.post('/', async (req, res) => {
  const { identificacion, nombre, correoinstitucional, contrasena, telefono, idsede, idtipousuario } = req.body;


  //se hashea la contrasena para encriptar
  const hashedPassword = await bcrypt.hash(contrasena, 10);

  //verifica que no existan usuarios con a mism aidentificacion
    const { data: idActual, error: idError} = await supabase.from('usuario').select('*').eq('identificacion', identificacion);

    if( idActual.length == 0){ 
        //Verifica que el correo
        const { data: existingUser, error: checkError } = await supabase.from('usuario').select('*').eq('correoinstitucional', correoinstitucional).single();

        if (checkError) {
            const { data, error } = await supabase.from('usuario').insert([
                { identificacion, nombre, correoinstitucional, contrasena: hashedPassword, telefono, idsede, idtipousuario }
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
            return res.status(201).json(data);
        }
        if (existingUser) {
            return res.status(400).json({ error: 'El correo ya está en uso.' });
        }
    }
    if (idActual) {
        return res.status(400).json({ error: 'El usuario ya existe.' });
    }
});


// obtener el rol del usuario
router.get('/rol/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('usuario').select('idtipousuario').eq('idusuario', id).single();
  if (error) {
    return res.status(500).json({ error: error.message });
  }

  //trae el tipo de usuario 
  const { data: tipoUsuario, error: errorTipoUsuario } = await supabase.from('tipousuario').select('nombre').eq('idtipousuario', data.idtipousuario).single();
  if (errorTipoUsuario) {
    return res.status(500).json({ error: errorTipoUsuario.message });
  }

  return res.json(tipoUsuario);
});

//autenticar
router.post('/login', async (req, res) => {


  const { correoinstitucional, contrasena } = req.body;


  const { data, error } = await supabase.from('usuario').select('*').eq('correoinstitucional', correoinstitucional).single();

  if (!data || error) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }
  const iguales = await bcrypt.compare(contrasena, data.contrasena);
  if (!iguales) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }
  return res.json(data);
});


router.get('/tipo/:id', async (req, res) => {

  const { id } = req.params;
  const { data, error } = await supabase.from('tipousuario').select('nombre').eq('idtipousuario', id).single();
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  return res.json(data);
});

export default router;