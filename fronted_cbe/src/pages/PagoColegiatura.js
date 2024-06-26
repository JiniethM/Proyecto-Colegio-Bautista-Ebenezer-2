import React, { useState } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button, Modal } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa'; // Import the icon
import Header from '../components/Header';
import '../styles/App.css';
import AlumnoList from './AlumnoList';

function PagoColegiatura() {
    const [monto, setMonto] = useState('');
    const [fechaPago, setFechaPago] = useState('');
    const [nivelEducativo, setNivelEducativo] = useState('');
    const [selectedAlumno, setSelectedAlumno] = useState({});
    const [showAlumnoListModal, setShowAlumnoListModal] = useState(false);
    const [errors, setErrors] = useState({});

    // Precios por nivel educativo
    const precios = {
        'Prescolar': 200,
        'Primaria': 350,
        'Secundaria': 500
    };

    // Función para actualizar el monto cuando se selecciona el nivel educativo
    const handleNivelEducativoChange = (e) => {
        const nivel = e.target.value;
        setNivelEducativo(nivel);
        setMonto(precios[nivel]);
    };

    const displayError = (field, message) => {
        setErrors((prevErrors) => ({
            ...prevErrors,
            [field]: message,
        }));
    };

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        if (!nivelEducativo) {
            displayError("nivelEducativo", "Debe seleccionar un nivel educativo");
            return;
        }

        if (!monto) {
            displayError("monto", "El campo Monto es obligatorio");
            return;
        }

        if (isNaN(parseFloat(monto)) || parseFloat(monto) < precios[nivelEducativo]) {
            displayError("monto", `Ingrese un monto válido para el nivel ${nivelEducativo}. Monto mínimo: ${precios[nivelEducativo]}`);
            return;
        }

        if (!fechaPago) {
            displayError("fechaPago", "El campo Fecha de Pago es obligatorio");
            return;
        }

        if (!selectedAlumno.ID_Alumno) {
            displayError("ID_Alumno", "Debe seleccionar un alumno");
            return;
        }

        const formData = {
            Monto: monto,
            Fecha_Pago: fechaPago,
            ID_Alumno: selectedAlumno.ID_Alumno
        };

        console.log('Datos a registrar:', formData);

        try {
            const response = await fetch('http://localhost:5000/crud/createPagoColegiatura', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Registro exitoso');
                setMonto('');
                setFechaPago('');
                setSelectedAlumno({});
                setNivelEducativo('');
            } else {
                const errorData = await response.json();
                alert('Error al registrar PagoColegiatura: ' + errorData.error);
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
                        <Card.Title>Registro de Pago de Colegiatura</Card.Title>
                        <Form className="mt-3" onSubmit={handleSubmit}>
                            <Row className="g-3">
                                <Col sm="6" md="6" lg="6">
                                    <FloatingLabel controlId="nivelEducativo" label="Nivel Educativo">
                                        <Form.Select value={nivelEducativo} onChange={handleNivelEducativoChange} isInvalid={!!errors.nivelEducativo}>
                                            <option value="">Seleccione Nivel Educativo</option>
                                            <option value="Prescolar">Prescolar</option>
                                            <option value="Primaria">Primaria</option>
                                            <option value="Secundaria">Secundaria</option>
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.nivelEducativo}
                                        </Form.Control.Feedback>
                                    </FloatingLabel>
                                </Col>
                                <Col sm="6" md="6" lg="6">
                                    <FloatingLabel controlId="Monto" label="Monto">
                                        <Form.Control
                                            type="number"
                                            placeholder="Ingrese el Monto"
                                            value={monto}
                                            onChange={(e) => setMonto(e.target.value)}
                                            readOnly
                                            isInvalid={!!errors.monto}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.monto}
                                        </Form.Control.Feedback>
                                    </FloatingLabel>
                                </Col>
                                <Col sm="6" md="6" lg="6">
                                    <FloatingLabel controlId="Fecha_Pago" label="Fecha Pago">
                                        <Form.Control
                                            type="date"
                                            placeholder="Ingrese la Fecha de Pago"
                                            value={fechaPago}
                                            onChange={(e) => setFechaPago(e.target.value)}
                                            isInvalid={!!errors.fechaPago}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.fechaPago}
                                        </Form.Control.Feedback>
                                    </FloatingLabel>
                                </Col>
                                <Col sm="6" md="6" lg="6" style={{ position: "relative" }}>
                                    <FloatingLabel controlId="IdAlumno" label="Alumno">
                                        <Form.Control
                                            type="text"
                                            placeholder="Seleccione un alumno"
                                            value={selectedAlumno.ID_Alumno ? `${selectedAlumno.ID_Alumno} - ${selectedAlumno.Nombres} ${selectedAlumno.Apellidos}` : ''}
                                            disabled
                                            isInvalid={!!errors.ID_Alumno}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.ID_Alumno}
                                        </Form.Control.Feedback>
                                        <Button
                                            variant="primary"
                                            onClick={() => setShowAlumnoListModal(true)}
                                            style={{
                                                position: "absolute",
                                                top: "50%",
                                                transform: "translateY(-50%)",
                                                right: "10px",
                                                padding: "0.375rem 0.75rem",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center"
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
            <Modal show={showAlumnoListModal} onHide={() => setShowAlumnoListModal(false)} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>Seleccionar Alumno</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AlumnoList handleAlumnoSelect={(alumno) => {
                        setSelectedAlumno(alumno);
                        setShowAlumnoListModal(false);  // Cerrar el modal después de seleccionar un alumno
                    }} />
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default PagoColegiatura;
