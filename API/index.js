import express from 'express';
import cors from 'cors';

import routerUsuarios from './src/endpoints/Usuarios.js';
import routerEstudiantes from './src/endpoints/Estudiantes.js';


const app = express();

app.use(cors({
  origin: ['https://disenno-inw6.vercel.app', 'http://localhost:3000'],
  credentials: true
}));

app.use(express.json());

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

// Ruta de prueba
app.get('/api', (req, res) => {
  res.json({ 
    message: 'API funcionando!',
    timestamp: new Date().toISOString()
  });
});

// ✅ Exporta para Vercel
export default app;
