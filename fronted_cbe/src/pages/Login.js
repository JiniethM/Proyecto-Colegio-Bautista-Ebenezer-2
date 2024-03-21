import React, { useState } from 'react';
import { Form, Button, Card, Container, Row, Col, FloatingLabel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Login = ({ setRol }) => {
  const navigate = useNavigate();

  const [nombre_Usuario, setNombre_Usuario] = useState('');
  const [contrasena, setContrasena] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();

    // Objeto con los datos del formulario
    const formData = {
      nombre_Usuario,
      contrasena
    };

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

        setRol(rol); // Actualiza el estado del rol solo si las credenciales son correctas
        navigate('/home');
      } else {
        console.log('Credenciales incorrectas');
        alert('¡Credenciales incorrectas!');
      }
    } catch (error) {
      console.error('Error en la solicitud: ', error);
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{
        height: '100vh',
        background: 'url("./Imagenes/zyro-image (1).png")', // Fondo de la imagen deseada
        backgroundSize: 'cover', // Cubre todo el contenedor
        backgroundPosition: 'center', // Centra la imagen
        backgroundRepeat: 'no-repeat', // No se repite la imagen
      }}
    >
      <Row className="justify-content-md-center">
        <Col md={12}>
          <Card
            className="cajita"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.5)', // Fondo blanco con opacidad
              borderRadius: '15px', // Borde redondeado
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', // Sombra suave
              border: 'none', // Sin borde
              textAlign: 'center' // Alineación central del contenido
            }}
          >
            <Card.Body>
              <div
                style={{
                  backgroundColor: '#1565C0', // Color de fondo azul
                  padding: '5px', // Espaciado interno aumentado para centrar más el texto
                  borderRadius: '10px', // Borde redondeado
                  marginBottom: '20px' // Margen inferior para separar del contenido siguiente
                }}
              >
                <Card.Title
                  className="mb-3"
                  style={{
                    fontSize: '24px', // Tamaño de la fuente reducido
                    fontWeight: 'bold', // Peso de la fuente
                    color: '#FFF', // Color del texto (blanco en este caso)
                    fontFamily: 'Arial, sans-serif', // Familia de fuentes
                    margin: '0' // Establece el margen a cero para centrar verticalmente
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
                    block
                    className="mt-3"
                    style={{
                      border: '1px solid #1565C0', // Color del borde
                      backgroundColor: '#1565C0', // Nuevo color de fondo azul
                      boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', // Sombra suave
                    }}
                  >
                    Iniciar Sesión
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
