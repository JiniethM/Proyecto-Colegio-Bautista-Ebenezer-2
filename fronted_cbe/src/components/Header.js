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
      {/* Navbar principal */}
      <Navbar className="navbar-color" variant="dark" expand="md" >
        <Container>
          <Navbar.Brand href="#home">Colegio Bautista Ebenezer</Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            style={{ display: 'none' }}
            className="d-sm-none d-xs-none"
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">

              <Nav.Link>
                <Link to="/" className="link-unstyled">Inicio</Link>
              </Nav.Link>
             


              <NavDropdown title="Docente" id="Docente">
                <NavDropdown.Item>
                  <Link to="/Docente" className="link-unstyled">Registrar Docente</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/DocenteList" className="link-unstyled">Listar Docente</Link>
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Alumno" id="Alumno">
                <NavDropdown.Item>
                  <Link to="/Alumno" className="link-unstyled">Registrar Alumno</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/AlumnoList" className="link-unstyled">Listar Alumno</Link>
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Tutor" id="Tutor">
                <NavDropdown.Item>
                  <Link to="/Tutor" className="link-unstyled">Registrar Tutor</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                <Link to="/actualizar-Tutor" className="link-unstyled">Listar Tutor</Link>
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Matricula" id="Matricula">
                <NavDropdown.Item>
                  <Link to="/Matricula" className="link-unstyled">Registrar Matrícula</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                <Link to="/MatriculaList" className="link-unstyled">Listar Matrícula</Link>
              </NavDropdown.Item>


                </NavDropdown>

              
                <NavDropdown title="Grado" id="Grado">
                <NavDropdown.Item>
                  <Link to="/Grado" className="link-unstyled">Registrar Grado</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                <Link to="/GradoList" className="link-unstyled">Listar Grado</Link>
              </NavDropdown.Item>
              </NavDropdown>

              
              <NavDropdown title="Asignatura" id="Asignatura">
                <NavDropdown.Item>
                  <Link to="/Asignatura" className="link-unstyled">Registrar Asignatura</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/AsignaturaList" className="link-unstyled">Listar Asignatura</Link>
                </NavDropdown.Item>



                 


              </NavDropdown>
              <NavDropdown title="Pago de colegiatura" id="PagoColegiatura">
                <NavDropdown.Item>
                  <Link to="/PagoColegiatura" className="link-unstyled">Registrar Pago Colegiatura</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                <Link to="/PagoColegiaturaList" className="link-unstyled">Listar PagoColegiatura</Link>
              </NavDropdown.Item>
              </NavDropdown>
              
              <NavDropdown title="Reporte" id="Reporte">
              <NavDropdown.Item>
                <Link to="/Reporte" className="link-unstyled">Reporte</Link>
              </NavDropdown.Item>
              
            </NavDropdown>

            <NavDropdown title="Calificacion" id="calificacion">
              <NavDropdown.Item>
                <Link to="/Calificacion" className="link-unstyled">Calificacion</Link>
              </NavDropdown.Item>
              
              <NavDropdown.Item>
                <Link to="/CalificacionList" className="link-unstyled">Listado de calificacion</Link>
              </NavDropdown.Item>
            </NavDropdown>

            </Nav>
          </Navbar.Collapse>
          <Button
            variant="outline-light"
            onClick={toggleMenu}
            className="d-md-none d-block"
            aria-controls="basic-navbar-nav"
            aria-expanded={showMenu ? 'true' : 'false'}
          >
            Menú
          </Button>
        </Container>
      </Navbar>

      {/* Menú lateral (Offcanvas) */}
      <Offcanvas show={showMenu} onHide={toggleMenu} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menú</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">

            <Nav.Link>
              <Link to="/" className="link-unstyled">Inicio</Link>
            </Nav.Link>

            <NavDropdown title="Docente" id="Docente">
              <NavDropdown.Item>
                <Link to="/Docente" className="link-unstyled">Registrar Docente</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/actualizar-Docente" className="link-unstyled">Listar Docente</Link>
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Alumno" id="Alumno">
              <NavDropdown.Item>
                <Link to="/Alumno" className="link-unstyled">Registrar Alumno</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/actualizar-Alumno" className="link-unstyled">Listar Alumno</Link>
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Tutor" id="Tutor">
              <NavDropdown.Item>
                <Link to="/Tutor" className="link-unstyled">Registrar Tutor</Link>
              </NavDropdown.Item>

              <NavDropdown.Item>
                <Link to="/actualizar-Tutor" className="link-unstyled">Listar Tutor</Link>
              </NavDropdown.Item>
            </NavDropdown>


            <NavDropdown title="Matricula" id="Matricula">
              <NavDropdown.Item>
                <Link to="/Matricula" className="link-unstyled">Registrar Matrícula</Link>
              </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown.Item>
                <Link to="/MatriculaList" className="link-unstyled">Listar Matrícula</Link>
              </NavDropdown.Item>

              
              <NavDropdown title="Grado" id="Grado">
              <NavDropdown.Item>
                <Link to="/Grado" className="link-unstyled">Registrar Grado</Link>
              </NavDropdown.Item>

              <NavDropdown.Item>
                <Link to="/GradoList" className="link-unstyled">Listar Grado</Link>
              </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Asignatura" id="Asignatura">
                <NavDropdown.Item>
                  <Link to="/Asignatura" className="link-unstyled">Registrar Asignatura</Link>
                </NavDropdown.Item>
    
                <NavDropdown.Item>
                  <Link to="/AsignaturaList" className="link-unstyled">Listar Asignatura</Link>
                </NavDropdown.Item>


                <NavDropdown title="Calificacion" id="Calificacion">
                <NavDropdown.Item>
                  <Link to="/Calificacion" className="link-unstyled">Registrar Calificacion</Link>
                </NavDropdown.Item>
    
                <NavDropdown.Item>
                  <Link to="/CalificacionList" className="link-unstyled">Listar Calificacion</Link>
                </NavDropdown.Item>
                </NavDropdown>


                <NavDropdown title="Pago de colegiatura" id="PagoColegiatura">
                <NavDropdown.Item>
                  <Link to="/PagoColegiatura" className="link-unstyled">Registrar Pago Colegiatura</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                <Link to="/PagoColegiaturaList" className="link-unstyled">Listar PagoColegiatura</Link>
              </NavDropdown.Item>
              </NavDropdown>

              
            </NavDropdown>

            <NavDropdown title="Reporte" id="Reporte">
              <NavDropdown.Item>
                <Link to="/Reporte" className="link-unstyled">Reporte</Link>
              </NavDropdown.Item>
              
            </NavDropdown>
            

          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </div>

    
  );

}

export default Header;