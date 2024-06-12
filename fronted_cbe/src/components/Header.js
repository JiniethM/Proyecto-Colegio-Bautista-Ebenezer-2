import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Offcanvas, Button, NavDropdown, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const [userRol, setUserRol] = useState('');

  useEffect(() => {
    setUserRol(localStorage.getItem('userRol'));
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div>
      <Navbar className="navbar-color" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#home">Colegio Bautista Ebenezer</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleMenu} />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link as={Link} to="/Home" className="link-unstyled">Inicio</Nav.Link>
              {userRol === 'Administrador' && (
                <>
                  <NavDropdown title="Gestión Académica" id="GestiónAcadémica">
                    <NavDropdown.Item as={Link} to="/Alumno" className="link-unstyled">Registrar Alumno</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/AlumnoList" className="link-unstyled">Listar Alumno</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/AlumnoEstadistica" className="link-unstyled">Alumno Estadística</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/Grado" className="link-unstyled">Registrar Grado</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/GradoList" className="link-unstyled">Listar Grado</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/Asignatura" className="link-unstyled">Registrar Asignatura</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/AsignaturaList" className="link-unstyled">Listar Asignatura</NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown title="Gestión Financiera" id="GestiónFinanciera">
                    <NavDropdown.Item as={Link} to="/PagoColegiatura" className="link-unstyled">Registrar Pago Colegiatura</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/PagoColegiaturaList" className="link-unstyled">Listar Pago Colegiatura</NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown title="Gestión de Personal" id="GestiónPersonal">
                    <NavDropdown.Item as={Link} to="/Docente" className="link-unstyled">Registrar Docente</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/DocenteList" className="link-unstyled">Listar Docente</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/DocenteEstadistica" className="link-unstyled">Docente Estadística</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/Tutor" className="link-unstyled">Registrar Tutor</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/actualizar-Tutor" className="link-unstyled">Listar Tutor</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/Matricula" className="link-unstyled">Registrar Matrícula</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/MatriculaList" className="link-unstyled">Listar Matrícula</NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown title="Estadísticas y Reportes" id="EstadísticasReportes">
                    <NavDropdown.Item as={Link} to="/Reporte" className="link-unstyled">Dashboard</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/EstadisticasConsulta" className="link-unstyled">Ver Reportes</NavDropdown.Item>
                  </NavDropdown>
                </>
              )}
              {(userRol === 'Docente' || userRol === 'Administrador') && (
                <NavDropdown title="Calificación" id="Calificacion">
                  <NavDropdown.Item as={Link} to="/Calificacion" className="link-unstyled">Registrar Calificación</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/CalificacionList" className="link-unstyled">Listar Calificación</NavDropdown.Item>
                </NavDropdown>

              )}
            </Nav>
          </Navbar.Collapse>
          <Button
            variant="outline-light"
            onClick={toggleMenu}
            className="d-lg-none d-block"
            aria-controls="basic-navbar-nav"
            aria-expanded={showMenu ? 'true' : 'false'}
          >
            Menú
          </Button>
        </Container>
      </Navbar>
      <Offcanvas show={showMenu} onHide={toggleMenu} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menú</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link as={Link} to="/Home" className="link-unstyled">Inicio</Nav.Link>
            {userRol === 'Administrador' && (
              <>
                <NavDropdown title="Gestión Académica" id="GestiónAcadémica">
                  <NavDropdown.Item as={Link} to="/Alumno" className="link-unstyled">Registrar Alumno</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/AlumnoList" className="link-unstyled">Listar Alumno</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/AlumnoEstadistica" className="link-unstyled">Alumno Estadística</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/Grado" className="link-unstyled">Registrar Grado</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/GradoList" className="link-unstyled">Listar Grado</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/Asignatura" className="link-unstyled">Registrar Asignatura</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/AsignaturaList" className="link-unstyled">Listar Asignatura</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Gestión Financiera" id="GestiónFinanciera">
                  <NavDropdown.Item as={Link} to="/PagoColegiatura" className="link-unstyled">Registrar Pago Colegiatura</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/PagoColegiaturaList" className="link-unstyled">Listar Pago Colegiatura</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Gestión de Personal" id="GestiónPersonal">
                  <NavDropdown.Item as={Link} to="/Docente" className="link-unstyled">Registrar Docente</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/DocenteList" className="link-unstyled">Listar Docente</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/DocenteEstadistica" className="link-unstyled">Docente Estadística</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/Tutor" className="link-unstyled">Registrar Tutor</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/actualizar-Tutor" className="link-unstyled">Listar Tutor</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/Matricula" className="link-unstyled">Registrar Matrícula</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/MatriculaList" className="link-unstyled">Listar Matrícula</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Estadísticas y Reportes" id="EstadísticasReportes">
                  <NavDropdown.Item as={Link} to="/Reporte" className="link-unstyled">Dashboard</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/EstadisticasConsulta" className="link-unstyled">Ver Reportes</NavDropdown.Item>
                </NavDropdown>
              </>
            )}
            {(userRol === 'Docente' || userRol === 'Administrador') && (
                <NavDropdown title="Calificación" id="Calificacion">
                  <NavDropdown.Item as={Link} to="/Calificacion" className="link-unstyled">Registrar Calificación</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/CalificacionList" className="link-unstyled">Listar Calificación</NavDropdown.Item>
                </NavDropdown>

            )}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default Header;

