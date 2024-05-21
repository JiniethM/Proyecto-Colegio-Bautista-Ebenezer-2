import React, { useState } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';
import '../styles/App.css';

function Tutor() {

    // Crear un estado para cada campo del formulario
    const [Nombres, setNombres] = useState('');
    const [Telefono, setTelefono] = useState('');

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Crear un objeto con los datos del formulario
        const formData = {
            Nombres,
            Telefono,
        };

        try {
            // Realizar una solicitud HTTP al backend para enviar los datos
            const response = await fetch('http://localhost:5000/crud/createTutor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // El registro se creó exitosamente
                alert('Registro exitoso');
                // Reiniciar los campos del formulario
                setNombres('');
                setTelefono('');
            } else {
                alert('Error al registrar el Tutor');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            alert('Error en la solicitud al servidor');
        }
    };

    return (
        <div>
            <Header />
            <Container>
                <Card className="mt-3">
                    <Card.Body>
                        <Card.Title>Registro de Tutor</Card.Title>
                        <Form className="mt-3" onSubmit={handleSubmit}>
                            <Row className="g-3">
                                <Col sm="12" md="6" lg="6">
                                    <FloatingLabel controlId="Nombre del tutor" label="Nombre del tutor">
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingrese el Nombre del tutor"
                                            value={Nombres}
                                            onChange={(e) => setNombres(e.target.value.replace(/\d/g, ''))}
                                        />
                                    </FloatingLabel>
                                </Col>
                                <Col sm="12" md="6" lg="6">
                                    <FloatingLabel controlId="Telefono del Tutor" label="Telefono del Tutor">
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingrese el Telefono Tutor"
                                            value={Telefono}
                                            onChange={(e) => setTelefono(e.target.value.replace(/\D/g, '').slice(0, 8).replace(/(\d{4})(\d{4})/, "$1-$2"))}
                                        />
                                    </FloatingLabel>
                                </Col>
                            </Row>
                            <div className="center-button">
                                <Button variant="primary" type="submit" className="mt-3 custom-button" size="lg">
                                    Registrar
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}

export default Tutor;
