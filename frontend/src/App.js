// src/App.js

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginScreen from './modules/registro/LoginScreen';
import HomePageAdministrativos from './modules/administrativos/homePageAdminitrativos';
import AdministrativosLevantamientos from './modules/administrativos/AdministrativosLevantamientos';

import AdministrativosHistInclu from './modules/administrativos/AdministrativosHistInclu';

import HomePageEstudiantes from './modules/estudiantes/homePageEstudiantes';
import HomePageInclusiones from './modules/estudiantes/homePageInclusiones';
import HomePageLevantamientos from './modules/estudiantes/homePageLevantamientos';
import HomePageRetiros from './modules/estudiantes/homePageRetiros';
import FormularioInclusiones from './modules/estudiantes/formularioInclusiones';
import FormularioLevantamiento from './modules/estudiantes/formularioLevantamientos';
import PageSeguimiento from './modules/estudiantes/pageSeguimiento';
import InfoUsuario from './modules/estudiantes/infoUsuario';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path='/administrativo' element={<HomePageAdministrativos/>} />
        <Route path='/administrativo/levantamientos' element={<AdministrativosLevantamientos/>} />

        <Route path='/administrativo/historico/inclusiones' element={<HomePageAdministrativos/>} />
        <Route path='/administrativo/historico/inclusiones/informacion' element={<AdministrativosHistInclu/>} />


        <Route path="/estudiantes" element={<HomePageEstudiantes />} />
        <Route path="/inclusiones" element={<HomePageInclusiones />} />
        <Route path="/levantamientos" element={<HomePageLevantamientos />} />
        <Route path="/retiros" element={<HomePageRetiros />} />
        <Route path="/formulario-inclusiones" element={<FormularioInclusiones />} />
        <Route path="/formulario-levantamiento" element={<FormularioLevantamiento />} />
        <Route path="/infoUsuario" element={<InfoUsuario/>} />
        <Route path="/seguimiento" element={<PageSeguimiento/>} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
