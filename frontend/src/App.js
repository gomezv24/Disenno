// src/App.js

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginScreen from './modules/registro/LoginScreen';
import HomePageEstudiantes from './modules/estudiantes/homePageEstudiantes';
import HomePageInclusiones from './modules/estudiantes/homePageInclusiones';
import HomePageLevantamientos from './modules/estudiantes/homePageLevantamientos';
import HomePageRetiros from './modules/estudiantes/homePageRetiros';
import FormularioInclusiones from './modules/estudiantes/formularioInclusiones';
import FormularioLevantamiento from './modules/estudiantes/formularioLevantamientos';
import PageSeguimiento from './modules/estudiantes/pageSeguimiento';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/estudiantes" element={<HomePageEstudiantes />} />
        <Route path="/inclusiones" element={<HomePageInclusiones />} />
        <Route path="/levantamientos" element={<HomePageLevantamientos />} />
        <Route path="/retiros" element={<HomePageRetiros />} />
        <Route path="/formulario-inclusiones" element={<FormularioInclusiones />} />
        <Route path="/formulario-levantamiento" element={<FormularioLevantamiento />} />
        <Route path="/seguimiento" element={<PageSeguimiento/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
