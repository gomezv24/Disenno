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

const app = express(); // ✅ debe ir ANTES de cualquier `app.use(...)`
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

// Endpoints
app.use('/usuarios', routerUsuarios);
app.use('/estudiantes', routerEstudiantes);
app.use('/formularios', routerFormularios);
app.use('/estadisticas', routerEstadisticas);
app.use('/usuariodetallado', usuarioDetalladoRouter);
app.use('/formularios/inclusiones', inclusionPostRoutes); 
app.use('/formularios/levantamientos', levantamientoPostRoutes); 
app.use('/procesos', procesosRouter);
app.use('/seguimientoUsuario', seguimientoUsuarioRouter);
app.use('/cursos', cursosRoutes); // ✅ ahora está en la posición correcta
app.use('/coordinadora', coordinadoraRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
