import React, { useState } from 'react';
import { Form, Button, Card, Container, Row, Col, FloatingLabel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Login = ({ setRol }) => {
  const navigate = useNavigate();

  const [nombre_Usuario, setNombre_Usuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [mensaje, setMensaje] = useState('');  // Estado para manejar el mensaje

  const handleSubmit = async event => {
    event.preventDefault();
    const formData = { nombre_Usuario, contrasena };

    try {
      const response = await fetch('http://localhost:5000/crud/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const { rol } = await response.json();
        setRol(rol);
        localStorage.setItem('userRol', rol);
        setMensaje('El usuario se ha iniciado sesión exitosamente'); // Establece el mensaje de éxito
        navigate('/Home');
      } else {
        console.log('Credenciales incorrectas');
        setMensaje('¡Credenciales incorrectas!');  // Actualiza el mensaje de error
      }
    } catch (error) {
      console.error('Error en la solicitud: ', error);
      setMensaje('Error al procesar la solicitud');  // Mensaje en caso de error de solicitud
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{
        height: '100vh',
        background: 'url("./Imagenes/zyro-image (1).png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Row className="justify-content-md-center">
        <Col md={12}>
          <Card
            className="cajita"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
              borderRadius: '15px',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
              border: 'none',
              textAlign: 'center'
            }}
          >
            <Card.Body>
              <div
                style={{
                  backgroundColor: '#1565C0',
                  padding: '5px',
                  borderRadius: '10px',
                  marginBottom: '20px'
                }}
              >
                <Card.Title
                  className="mb-3"
                  style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#FFF',
                    fontFamily: 'Arial, sans-serif',
                    margin: '0'
                  }}
                >
                  Inicio de Sesión
                </Card.Title>
              </div>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col sm="12" md="12" lg="12" className="mb-3">
                    <FloatingLabel controlId="nombre_Usuario" label="Ingrese su usuario">
                      <Form.Control
                        placeholder="Ingrese su usuario"
                        type="text"
                        value={nombre_Usuario}
                        onChange={e => setNombre_Usuario(e.target.value)}
                        style={{ background: 'transparent' }}
                      />
                    </FloatingLabel>
                  </Col>
                  <Col sm="12" md="12" lg="12">
                    <FloatingLabel controlId="contrasena" label="Ingrese su contraseña">
                      <Form.Control
                        placeholder="Ingrese su contraseña"
                        type="password"
                        value={contrasena}
                        onChange={e => setContrasena(e.target.value)}
                        style={{ background: 'transparent' }}
                      />
                    </FloatingLabel>
                  </Col>
                </Row>
                <div className="center-button">
                  <Button
                    variant="primary"
                    type="submit"
                    block="true"
                    className="mt-3"
                    style={{
                      border: '1px solid #1565C0',
                      backgroundColor: '#1565C0',
                      boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
                    }}
                  >
                    Iniciar Sesión
                  </Button>
                </div>
                {mensaje && (
                  <div style={{ color: 'red', marginTop: '10px' }}>{mensaje}</div>  // Muestra el mensaje bajo el botón
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
