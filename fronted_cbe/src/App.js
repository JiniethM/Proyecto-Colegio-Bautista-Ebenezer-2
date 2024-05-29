import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Docente from './pages/Docente';
import DocenteList from './pages/DocenteList';
import Alumno from './pages/Alumno';
import AlumnoList from './pages/AlumnoList';
import AlumnoEstadistica from './pages/AlumnoEstadisticas';
import DocenteEstadistica from './pages/DocenteEstadistica';
import Tutor from './pages/Tutor';
import TutorList from './pages/TutorList';
import Matricula from './pages/Matricula';
import Grado from './pages/Grado';
import GradoList from './pages/GradoList';
import MatriculaList from './pages/MatriculaList';
import Asignatura from './pages/Asignatura';
import AsignaturaList from './pages/AsignaturaList';
import PagoColegiatura from './pages/PagoColegiatura';
import PagoColegiaturaList from './pages/PagoColegiaturaList';
import Calificacion from './pages/Calificacion';
import CalificacionList from './pages/CalificacionList';
import Estadisticas from './pages/Estadisticas';
import Reportes from './pages/Reportes';  // Asegúrate de que esta ruta esté correcta

function App() {
  const [userRol, setUserRol] = useState('');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setRol={setUserRol}/>} />
        <Route path="/Home" element={<Home rol={userRol}/>} />
        <Route path="/Docente" element={<Docente rol={userRol}/>} />
        <Route path="/docenteList" element={<DocenteList rol={userRol}/>} />
        <Route path="/DocenteEstadistica" element={<DocenteEstadistica rol={userRol}/>} />
        <Route path="/Alumno" element={<Alumno rol={userRol}/>} />
        <Route path="/alumnoList" element={<AlumnoList rol={userRol}/>} />
        <Route path="/AlumnoEstadistica" element={<AlumnoEstadistica rol={userRol}/>} />
        <Route path="/Tutor" element={<Tutor rol={userRol}/>} />
        <Route path="/actualizar-Tutor" element={<TutorList rol={userRol}/>} />
        <Route path="/Matricula" element={<Matricula rol={userRol}/>} />
        <Route path="/MatriculaList" element={<MatriculaList rol={userRol}/>} />
        <Route path="/Grado" element={<Grado rol={userRol}/>} />
        <Route path="/GradoList" element={<GradoList rol={userRol}/>} />
        <Route path="/Asignatura" element={<Asignatura rol={userRol}/>} />
        <Route path="/AsignaturaList" element={<AsignaturaList rol={userRol}/>} />
        <Route path="/PagoColegiatura" element={<PagoColegiatura rol={userRol}/>} />
        <Route path="/PagoColegiaturaList" element={<PagoColegiaturaList rol={userRol}/>} />
        <Route path="/Reporte" element={<Estadisticas rol={userRol}/>} />
        <Route path="/Calificacion" element={<Calificacion rol={userRol}/>} />
        <Route path="/CalificacionList" element={<CalificacionList rol={userRol}/>} />
        <Route path="/EstadisticasConsulta" element={<Reportes rol={userRol}/>} />  {/* Añadir esta línea */}
      </Routes>
    </Router>
  );
}

export default App;
