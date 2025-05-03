// src/App.js

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginScreen from './modules/registro/LoginScreen';
import HomePageEstudiantes from './modules/estudiantes/homePageEstudiantes';
import HomePageAdministrativos from './modules/administrativos/homePageAdminitrativos';
import AdministrativosLevantamientos from './modules/administrativos/AdministrativosLevantamientos';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/estudiantes" element={<HomePageEstudiantes />} />
        <Route path='/administrativo' element={<HomePageAdministrativos/>} />
        <Route path='/administrativo/levantamientos' element={<AdministrativosLevantamientos/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
