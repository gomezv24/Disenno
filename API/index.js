import express from 'express';
import cors from 'cors';
import { supabase } from './src/config/supabase.js';

import routerUsuarios from './src/endpoints/Usuarios.js';
import routerEstudiantes from './src/endpoints/Estudiantes.js';
import routerFormularios from './src/endpoints/Formulario.js';
import routerEstadisticas from './src/endpoints/Estadisticas.js';
import usuarioDetalladoRouter from './src/endpoints/usuarioDetallado.js';
import seguimientoUsuarioRouter from './src/endpoints/seguimientoUsuario.js';
import procesosRouter from './src/endpoints/Procesos.js';
import inclusionPostRoutes from './src/endpoints/FormularioInclusionPost.js';
import levantamientoPostRoutes from './src/endpoints/FormularioLevantamientoPost.js';
import cursosRoutes from './src/endpoints/Cursos.js';
import coordinadoraRoutes from './src/endpoints/Coordinadora.js';

const app = express(); // 

app.use(cors({
  origin: 'https://disenno-inw6.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

// Endpoints
app.use('/api/usuarios', routerUsuarios);
app.use('/api/estudiantes', routerEstudiantes);
app.use('/api/formularios', routerFormularios);
app.use('/api/estadisticas', routerEstadisticas);
app.use('/api/usuariodetallado', usuarioDetalladoRouter);
app.use('/api/formularios/inclusiones', inclusionPostRoutes); 
app.use('/api/formularios/levantamientos', levantamientoPostRoutes); 
app.use('/api/procesos', procesosRouter);
app.use('/api/seguimientoUsuario', seguimientoUsuarioRouter);
app.use('/api/cursos', cursosRoutes);
app.use('/api/coordinadora', coordinadoraRoutes);

app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to the API!' });
});


export default app;
