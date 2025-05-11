// src/App.js

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginScreen from './modules/registro/LoginScreen';
import HomePageEstudiantes from './modules/estudiantes/homePageEstudiantes';
import HomePageAdministrativos from './modules/administrativos/homePageAdminitrativos';
import AdministrativosLevantamientos from './modules/administrativos/AdministrativosLevantamientos';
import AdministrativosHistInclu from './modules/administrativos/AdministrativosHistInclu';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/estudiantes" element={<HomePageEstudiantes />} />
        <Route path='/administrativo' element={<HomePageAdministrativos/>} />
        <Route path='/administrativo/levantamientos' element={<AdministrativosLevantamientos/>} />
        <Route path='/administrativo/historico/inclusiones' element={<HomePageAdministrativos/>} />
        <Route path='/administrativo/historico/inclusiones/informacion' element={<AdministrativosHistInclu/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
