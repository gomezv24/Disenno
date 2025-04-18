import express from 'express';
import cors from 'cors';
import { supabase } from './src/config/supabase.js';
import routerUsuarios from './src/endpoints/Usuarios.js';
import routerEstudiantes from './src/endpoints/Estudiantes.js';
import routerFormularios from './src/endpoints/Formulario.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/usuarios', routerUsuarios);
app.use('/estudiantes', routerEstudiantes);
app.use('/formularios', routerFormularios);


app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});