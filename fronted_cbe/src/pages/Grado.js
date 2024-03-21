import React, { useState } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button } from 'react-bootstrap';
import Header from '../components/Header';
import '../styles/App.css';

function Grado() {

    // Crear un estado para cada campo del formulario
    const [ID_Grado, setGrado] = useState(''); // Cambiar "setID_Grado" a "setGrado"

    const [cant_estudiante, setcant_estudiante] = useState('');
    const [plan_estudio, setplan_estudio] = useState('');
    


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Verifica si ID_Grado no está vacío
        if (!ID_Grado || !cant_estudiante || !plan_estudio) {
            alert('Todos los campos son obligatorios');
            return;
        }
    
        // Crear un objeto con los datos del formulario
        const formData = {
            ID_Grado,
            cant_estudiante,
            plan_estudio,
        };
    
        try {
            // Realizar una solicitud HTTP al backend para enviar los datos
            const response = await fetch('http://localhost:5000/crud/createGrado', {
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
                setGrado('');
                setcant_estudiante('');
                setplan_estudio('');
            } else {
                alert('Error al registrar el grado');
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
                        <Card.Title>Registro de Grado</Card.Title>
                        <Form className="mt-3" onSubmit={handleSubmit}>
                            <Row className="g-3">


                            <Col sm="12" md="6" lg="6">
                                    <FloatingLabel controlId="ID_Grado" label="ID_Grado">
                                        <Form.Control
                                            type="number"
                                            placeholder="Ingrese el ID_Grado"
                                            value={ID_Grado}
                                            onChange={(e) => setGrado(e.target.value)}
                                        />
                                    </FloatingLabel>
                                </Col>





                                <Col sm="12" md="6" lg="6">
                                    <FloatingLabel controlId="Cantidad de estudiante" label="Cantidad de estudiante">
                                        <Form.Control
                                            type="number"
                                            placeholder="Ingrese la cantidad de estudiante"
                                            value={cant_estudiante}
                                            onChange={(e) => setcant_estudiante(e.target.value)}
                                        />
                                    </FloatingLabel>
                                </Col>


                                <Col sm="12" md="6" lg="6">
                                    <FloatingLabel controlId="plan de estudio" label="Plan de Estudio">
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingrese el plan de estudio"
                                            value={plan_estudio}
                                            onChange={(e) => setplan_estudio(e.target.value)}
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

export default Grado;
