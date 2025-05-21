// src/App.js

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginScreen from './modules/registro/LoginScreen';
import HomePageEstudiantes from './modules/estudiantes/homePageEstudiantes';
import HomePageAdministrativos from './modules/administrativos/homePageAdminitrativos';
import AdministrativosLevantamientos from './modules/administrativos/AdministrativosLevantamientos';
import SemestralLevantamientos from './modules/administrativos/SemestralLevantamientos';
import ReglamentoLevantamiento from './modules/administrativos/ReglamentoLevantamiento';
import PanelControl from './modules/administrativos/PanelCoordinadora';
import LevantamientosRN from './modules/administrativos/LevantamientosRn';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/estudiantes" element={<HomePageEstudiantes />} />
        <Route path='/administrativo' element={<HomePageAdministrativos/>} />
        <Route path='/administrativo/levantamientos' element={<AdministrativosLevantamientos/>} />
        <Route path="/administrativo/semestral" element={<SemestralLevantamientos />} />
        <Route path="/administrativo/reglamento" element={<ReglamentoLevantamiento />} />
        <Route path="/administrativo/panelControl" element={<PanelControl />} />
        <Route path="/administrativo/levantamientosRN" element={<LevantamientosRN />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
