import React, { useState } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button, Modal } from 'react-bootstrap';
import Header from '../components/Header';
import '../styles/App.css';
import AsignaturaList from './AsignaturaList';
import AlumnoList from './AlumnoList';

function Calificacion() {
    const [p_Calificacion_Obtenida, setp_Calificacion_Obtenida] = useState('');
    const [p_Fecha_Calificacion, setp_Fecha_Calificacion] = useState('');
    const [p_Corte_Evaluativo, setp_Corte_Evaluativo] = useState('');
    const [mensajeCalificacion, setMensajeCalificacion] = useState('');

    const [showAlumnoListModal, setShowAlumnoListModal] = useState(false);
    const [selectedAlumno, setselectedAlumno] = useState({});
    const [showAsignaturaListModal, setShowAsignaturaListModal] = useState(false);
    const [selectedAsignatura, setselectedAsignatura] = useState({});

    const handleChangeCalificacion = (e) => {
        const value = e.target.value;
        if (!/^\d{0,3}$/.test(value)) {
            return; 
        }
        const numValue = parseInt(value, 10);
        if (numValue < 0 || numValue > 100) {
            setMensajeCalificacion('Ingrese un valor entre 0 y 100');
        } else {
            setp_Calificacion_Obtenida(value);
            setMensajeCalificacion(numValue >= 60 ? 'Aprobado' : 'Desaprobado');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            p_Calificacion_Obtenida,
            p_Fecha_Calificacion,
            p_ID_Alumno: selectedAlumno.ID_Alumno,
            p_ID_Asignatura: selectedAsignatura.ID_Asignatura,
            p_Corte_Evaluativo,
        };

        try {
            const response = await fetch('http://localhost:5000/crud/createCalificacion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Calificación guardada y reflejada correctamente.');
                setp_Calificacion_Obtenida('');
                setp_Fecha_Calificacion('');
                setp_Corte_Evaluativo('');
                setselectedAlumno({});
                setselectedAsignatura({});
                setMensajeCalificacion('');
            } else {
                alert('Error al registrar la calificación');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            alert('Error en la solicitud al servidor');
        }
    };

    const handleAlumnoSelect = (alumno) => {
        setselectedAlumno(alumno);
        setShowAlumnoListModal(false);
    };

    const handleAsignaturaSelect = (idAsignatura, nombre) => {
        setselectedAsignatura({
            ID_Asignatura: idAsignatura,
            Nombre_Asignatura: nombre,
        });
        setShowAsignaturaListModal(false);
    };

    return (
        <div>
            <Header />
            <Container>
                <Card className="mt-3">
                    <Card.Body>
                        <Card.Title>Registro de Calificación</Card.Title>
                        <Form className="mt-3" onSubmit={handleSubmit}>
                            <Row className="g-3">
                                <Col sm="6" md="6" lg="6">
                                    <FloatingLabel controlId="p_Calificacion_Obtenida" label="Calificación">
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingrese la calificación"
                                            value={p_Calificacion_Obtenida}
                                            onChange={handleChangeCalificacion}
                                            isInvalid={mensajeCalificacion === 'Ingrese un valor entre 0 y 100'}
                                            isValid={mensajeCalificacion === 'Aprobado' || mensajeCalificacion === 'Desaprobado'}
                                        />
                                        <Form.Control.Feedback type="invalid">{mensajeCalificacion}</Form.Control.Feedback>
                                        <Form.Control.Feedback type="valid">{mensajeCalificacion}</Form.Control.Feedback>
                                    </FloatingLabel>
                                </Col>
                                <Col sm="6" md="6" lg="6">
                                    <FloatingLabel controlId="p_Fecha_Calificacion" label="Fecha Calificación">
                                        <Form.Control
                                            type="date"
                                            value={p_Fecha_Calificacion}
                                            onChange={(e) => setp_Fecha_Calificacion(e.target.value)}
                                        />
                                    </FloatingLabel>
                                </Col>
                                <Col sm="12" md="6" lg="6">
                                    <FloatingLabel controlId="p_Corte_Evaluativo" label="Corte Evaluativo">
                                        <Form.Select
                                            value={p_Corte_Evaluativo}
                                            onChange={(e) => setp_Corte_Evaluativo(e.target.value)}
                                        >
                                            <option value="">Seleccione un corte</option>
                                            <option value="Primer Corte">Primer Corte</option>
                                            <option value="Segundo Corte">Segundo Corte</option>
                                            <option value="Tercer Corte">Tercer Corte</option>
                                            <option value="Cuarto Corte">Cuarto Corte</option>
                                        </Form.Select>
                                    </FloatingLabel>
                                </Col>
                                <Col sm="6" md="6" lg="6">
                                    <FloatingLabel controlId="IdAlumno" label="Alumno">
                                        <Form.Control
                                            type="text"
                                            value={selectedAlumno.ID_Alumno ? `${selectedAlumno.ID_Alumno} - ${selectedAlumno.Nombres} ${selectedAlumno.Apellidos}` : ''}
                                            disabled
                                        />
                                        <Button variant="primary" onClick={() => setShowAlumnoListModal(true)}>
                                            Seleccionar Alumno
                                        </Button>
                                    </FloatingLabel>
                                </Col>
                                <Col sm="6" md="6" lg="6">
                                    <FloatingLabel controlId="idAsignatura" label="Asignatura">
                                        <Form.Control
                                            type="text"
                                            value={selectedAsignatura.ID_Asignatura ? `${selectedAsignatura.ID_Asignatura} - ${selectedAsignatura.Nombre_Asignatura}` : ''}
                                            disabled
                                        />
                                        <Button variant="primary" onClick={() => setShowAsignaturaListModal(true)}>
                                            Seleccionar Asignatura
                                        </Button>
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

            <Modal show={showAlumnoListModal} onHide={() => setShowAlumnoListModal(false)} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>Seleccionar Alumno</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AlumnoList handleAlumnoSelect={handleAlumnoSelect} />
                </Modal.Body>
            </Modal>

            <Modal show={showAsignaturaListModal} onHide={() => setShowAsignaturaListModal(false)} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>Seleccionar Asignatura</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AsignaturaList handleAsignaturaSelect={handleAsignaturaSelect} />
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default Calificacion;
