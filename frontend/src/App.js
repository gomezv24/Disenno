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
import VistaAdministrativos from './modules/administrativos/AdministrativosVistaInclu';
import AdministrativosHistLev from './modules/administrativos/AdministrativosHistLev';
import AdministrativosVistaLev from './modules/administrativos/AdministrativosVistaLev';
import AdministradorHistInclu from './modules/administrador/AdministradorHistInclu';
import AdministradorHistLev from './modules/administrador/AdministradorHistLev';
import AdministradorUsuarios from './modules/administrador/AdministradorUsuarios';

import ReglamentoLevantamiento from './modules/administrativos/ReglamentoLevantamiento';
import PanelControl from './modules/administrativos/PanelCoordinadora';
import LevantamientosRn from './modules/administrativos/LevantamientosRn';
import ListadoInclusiones from './modules/administrativos/ListaInclusiones';
import RequisitosAuto from './modules/administrativos/RequisitosAutomaticos';
import FormularioAuto from './modules/administrativos/FormularioRequisitoAuto';
import UpdateRequisitoAuto from './modules/administrativos/updateRequisitoAuto';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path='/administrativo' element={<HomePageAdministrativos/>} />
        <Route path='/administrativo/levantamientos' element={<AdministrativosLevantamientos/>} />
        <Route path='/administrativo/historico/levantamientos' element={<AdministrativosHistLev/>} />
        <Route path='/administrativo/historico/inclusiones/informacion' element={<AdministrativosHistInclu/>} />


        <Route path="/estudiantes" element={<HomePageEstudiantes />} />
        <Route path="/inclusiones" element={<HomePageInclusiones />} />
        <Route path="/levantamientos" element={<HomePageLevantamientos />} />
        <Route path="/retiros" element={<HomePageRetiros />} />
        <Route path="/formulario-inclusiones" element={<FormularioInclusiones />} />
        <Route path="/formulario-levantamiento" element={<FormularioLevantamiento />} />
        <Route path="/infoUsuario" element={<InfoUsuario/>} />
        <Route path="/seguimiento" element={<PageSeguimiento/>} />
        <Route path="/administrativo/vista" element={<VistaAdministrativos/>} />
        <Route path="/administrativo/vista/levantamiento" element={<AdministrativosVistaLev/>} />

        <Route path="/administrador" element={<AdministradorUsuarios/>} />
        <Route path="/administrador/inclusiones" element={<AdministradorHistInclu/>} />
        <Route path="/administrador/levantamientos" element={<AdministradorHistLev/>} />

        <Route path="/administrativo/reglamento" element={<ReglamentoLevantamiento />} />
        <Route path="/administrativo/panelControl" element={<PanelControl />} />
        <Route path="/administrativo/levantamientorn" element={<LevantamientosRn/>} />
        <Route path="/administrativo/listadoInclusiones" element={<ListadoInclusiones/>} />
        <Route path="/administrativo/requisitosAuto" element={<RequisitosAuto/>} />
        <Route path="/administrativo/formularioAuto" element={<FormularioAuto/>} />
        <Route path="/administrativo/updateRequisitoAuto/:id" element={<UpdateRequisitoAuto />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;


