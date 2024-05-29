import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Offcanvas, Button, NavDropdown, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header() {
  const [showMenu, setShowMenu] = useState(false);

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
              <Nav.Link as={Link} to="/" className="link-unstyled">Inicio</Nav.Link>
              <NavDropdown title="Docente" id="Docente">
                <NavDropdown.Item as={Link} to="/Docente" className="link-unstyled">Registrar Docente</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/DocenteList" className="link-unstyled">Listar Docente</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/DocenteEstadistica" className="link-unstyled">Docente Estadística</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Alumno" id="Alumno">
                <NavDropdown.Item as={Link} to="/Alumno" className="link-unstyled">Registrar Alumno</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/AlumnoList" className="link-unstyled">Listar Alumno</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/AlumnoEstadistica" className="link-unstyled">Alumno Estadística</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Tutor" id="Tutor">
                <NavDropdown.Item as={Link} to="/Tutor" className="link-unstyled">Registrar Tutor</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/actualizar-Tutor" className="link-unstyled">Listar Tutor</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Matricula" id="Matricula">
                <NavDropdown.Item as={Link} to="/Matricula" className="link-unstyled">Registrar Matrícula</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/MatriculaList" className="link-unstyled">Listar Matrícula</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Grado" id="Grado">
                <NavDropdown.Item as={Link} to="/Grado" className="link-unstyled">Registrar Grado</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/GradoList" className="link-unstyled">Listar Grado</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Asignatura" id="Asignatura">
                <NavDropdown.Item as={Link} to="/Asignatura" className="link-unstyled">Registrar Asignatura</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/AsignaturaList" className="link-unstyled">Listar Asignatura</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Pago de colegiatura" id="PagoColegiatura">
                <NavDropdown.Item as={Link} to="/PagoColegiatura" className="link-unstyled">Registrar Pago Colegiatura</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/PagoColegiaturaList" className="link-unstyled">Listar Pago Colegiatura</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Dashboard" id="Reporte">
                <NavDropdown.Item as={Link} to="/Reporte" className="link-unstyled">Estadísticas</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Estadísticas Consulta" id="EstadisticasConsulta">
                <NavDropdown.Item as={Link} to="/EstadisticasConsulta" className="link-unstyled">Ver Reportes</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Calificación" id="Calificacion">
                <NavDropdown.Item as={Link} to="/Calificacion" className="link-unstyled">Registrar Calificación</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/CalificacionList" className="link-unstyled">Listar Calificación</NavDropdown.Item>
              </NavDropdown>
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
            <Nav.Link as={Link} to="/" className="link-unstyled">Inicio</Nav.Link>
            <NavDropdown title="Docente" id="Docente">
              <NavDropdown.Item as={Link} to="/Docente" className="link-unstyled">Registrar Docente</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/actualizar-Docente" className="link-unstyled">Listar Docente</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/DocenteEstadistica" className="link-unstyled">Docente Estadística</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Alumno" id="Alumno">
              <NavDropdown.Item as={Link} to="/Alumno" className="link-unstyled">Registrar Alumno</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/actualizar-Alumno" className="link-unstyled">Listar Alumno</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/AlumnoEstadistica" className="link-unstyled">Alumno Estadística</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Tutor" id="Tutor">
              <NavDropdown.Item as={Link} to="/Tutor" className="link-unstyled">Registrar Tutor</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/actualizar-Tutor" className="link-unstyled">Listar Tutor</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Matricula" id="Matricula">
              <NavDropdown.Item as={Link} to="/Matricula" className="link-unstyled">Registrar Matrícula</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/MatriculaList" className="link-unstyled">Listar Matrícula</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Grado" id="Grado">
              <NavDropdown.Item as={Link} to="/Grado" className="link-unstyled">Registrar Grado</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/GradoList" className="link-unstyled">Listar Grado</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Asignatura" id="Asignatura">
              <NavDropdown.Item as={Link} to="/Asignatura" className="link-unstyled">Registrar Asignatura</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/AsignaturaList" className="link-unstyled">Listar Asignatura</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Pago de colegiatura" id="PagoColegiatura">
              <NavDropdown.Item as={Link} to="/PagoColegiatura" className="link-unstyled">Registrar Pago Colegiatura</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/PagoColegiaturaList" className="link-unstyled">Listar Pago Colegiatura</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Dashboard" id="Reporte">
              <NavDropdown.Item as={Link} to="/Reporte" className="link-unstyled">Estadísticas</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Estadísticas Consulta" id="EstadisticasConsulta">
              <NavDropdown.Item as={Link} to="/EstadisticasConsulta" className="link-unstyled">Ver Reportes</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Calificación" id="Calificacion">
              <NavDropdown.Item as={Link} to="/Calificacion" className="link-unstyled">Registrar Calificación</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/CalificacionList" className="link-unstyled">Listar Calificación</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default Header;
