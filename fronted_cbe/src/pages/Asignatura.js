import React, { useState } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button, Modal } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa'; // Import the icon
import Header from '../components/Header';
import '../styles/App.css';
import DocenteList from './DocenteList';

function Matricula() {
    // Crear un estado para cada campo del formulario
    const [Nombre_Asignatura, setNombre_Asignatura] = useState('');
    const [Horario, setHorario] = useState('');
    const [selectedDocente, setselectedDocente] = useState({});
    const [showDocenteListModal, setShowDocenteListModal] = useState(false);
    const [errors, setErrors] = useState({});

    const displayError = (field, message) => {
        setErrors((prevErrors) => ({
            ...prevErrors,
            [field]: message,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        if (!Nombre_Asignatura) {
            displayError("Nombre_Asignatura", "El campo Nombre de Asignatura es obligatorio");
            return;
        }

        if (!Horario) {
            displayError("Horario", "El campo Horario es obligatorio");
            return;
        }

        if (!selectedDocente.ID_Docente) {
            displayError("ID_Docente", "Debe seleccionar un Docente");
            return;
        }

        // Crear un objeto con los datos del formulario
        const formData = {
            Nombre_Asignatura,
            Horario,
            ID_Docente: selectedDocente.ID_Docente
        };

        console.log('Datos a registrar:', formData);

        try {
            // Realizar una solicitud HTTP al backend para enviar los datos
            const response = await fetch('http://localhost:5000/crud/createAsignatura', {
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
                setNombre_Asignatura('');
                setHorario('');
                setselectedDocente({});
            } else {
                alert('Error al registrar Asignatura');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            alert('Error en la solicitud al servidor');
        }
    };

    const handleDocenteSelect = (docente) => {
        setselectedDocente(docente);
        setShowDocenteListModal(false);
    };

    return (
        <div>
            <Header />
            <Container>
                <Card className="mt-3">
                    <Card.Body>
                        <Card.Title>Registro de Asignatura</Card.Title>
                        <Form className="mt-3" onSubmit={handleSubmit}>
                            <Row className="g-3">
                                <Col sm="6" md="6" lg="6">
                                    <FloatingLabel controlId="Nombre_Asignatura" label="Nombre de asignatura">
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingrese el Nombre de la asignatura"
                                            value={Nombre_Asignatura}
                                            onChange={(e) => setNombre_Asignatura(e.target.value)}
                                            isInvalid={!!errors.Nombre_Asignatura}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.Nombre_Asignatura}
                                        </Form.Control.Feedback>
                                    </FloatingLabel>
                                </Col>
                                <Col sm="6" md="6" lg="6">
                                    <FloatingLabel controlId="Horario" label="Horario">
                                        <Form.Control
                                            type="datetime-local"
                                            placeholder="Ingrese el Horario"
                                            value={Horario}
                                            onChange={(e) => setHorario(e.target.value)}
                                            isInvalid={!!errors.Horario}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.Horario}
                                        </Form.Control.Feedback>
                                    </FloatingLabel>
                                </Col>
                                <Col sm="6" md="6" lg="6" style={{ position: "relative" }}>
                                    <FloatingLabel controlId="idDocente" label="Docente">
                                        <Form.Control
                                            type="text"
                                            value={
                                                selectedDocente.ID_Docente
                                                    ? `${selectedDocente.ID_Docente} - ${selectedDocente.Nombres} ${selectedDocente.Apellidos}`
                                                    : ''
                                            }
                                            disabled
                                            isInvalid={!!errors.ID_Docente}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.ID_Docente}
                                        </Form.Control.Feedback>
                                        <Button
                                            variant="primary"
                                            onClick={() => setShowDocenteListModal(true)}
                                            style={{
                                                position: "absolute",
                                                top: "50%",
                                                transform: "translateY(-50%)",
                                                right: "10px",
                                            }}
                                        >
                                            <FaPlus />
                                        </Button>
                                    </FloatingLabel>
                                </Col>
                            </Row>
                            <div className="center-button">
                                <Button variant="primary" type="submit" className="mt-3 custom-button" size="xl">
                                    Registrar
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
            <Modal show={showDocenteListModal} onHide={() => setShowDocenteListModal(false)} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>Seleccionar Docente</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <DocenteList handleDocenteSelect={handleDocenteSelect} />
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default Matricula;
