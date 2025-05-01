// src/App.js

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginScreen from './modules/registro/LoginScreen';
import HomePageEstudiantes from './modules/estudiantes/homePageEstudiantes';
import HomePageAdministrativos from './modules/administrativos/homePageAdminitrativos';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/estudiantes" element={<HomePageEstudiantes />} />
        <Route path='/administrativo' element={<HomePageAdministrativos/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
