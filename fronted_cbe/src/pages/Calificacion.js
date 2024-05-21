import React, { useState } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button, Modal } from 'react-bootstrap';
import Header from '../components/Header';
import '../styles/App.css';
import AsignaturaList from './AsignaturaList';
import AlumnoList from './AlumnoList';

function Calificacion() {
    const [p_Calificacion_Obtenida, setp_Calificacion_Obtenida] = useState('');
    const [p_Fecha_Calificacion, setp_Fecha_Calificacion] = useState('');
    const [p_ID_Alumno, setp_ID_Alumno] = useState('');
    const [p_ID_Asignatura, setp_ID_Asignatura] = useState('');
    const [p_Corte_Evaluativo, setp_Corte_Evaluativo] = useState('');

    const [showAlumnoListModal, setShowAlumnoListModal] = useState(false);
    const [selectedAlumno, setselectedAlumno] = useState({});

    const [showAsignaturaListModal, setShowAsignaturaListModal] = useState(false);
    const [selectedAsignatura, setselectedAsignatura] = useState({});



    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            p_Calificacion_Obtenida,
            p_Fecha_Calificacion,
            p_ID_Alumno: selectedAlumno.ID_Alumno,
            p_ID_Asignatura,
            p_Corte_Evaluativo,
        };
    
        console.log('Datos a enviar:', formData); // Asegúrate de que esto registra los datos correctos
    
        try {
            const response = await fetch('http://localhost:5000/crud/createCalificacion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            const data = await response.json(); // Obtén los datos de la respuesta para depuración
            console.log('Respuesta del servidor:', data); // Registra la respuesta del servidor
    
            if (response.ok) {
                alert('Registro exitoso');
                // Limpia los campos del formulario
            } else {
                alert('Error al registrar la calificación');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            alert('Error en la solicitud al servidor');
        }
    };
    


    

    const handleAsignaturaSelect = (idAsignatura, nombre) => {
        setp_ID_Asignatura(idAsignatura);
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
                        <Card.Title>Registro de Calificacion</Card.Title>
                        <Form className="mt-3" onSubmit={handleSubmit}>
                            <Row className="g-3">


                                <Col sm="6" md="6" lg="6">
                                    <FloatingLabel controlId="p_Calificacion_Obtenida" label="Calificacion">
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingrese el nombre"
                                            value={p_Calificacion_Obtenida}
                                            onChange={(e) => setp_Calificacion_Obtenida(e.target.value)}
                                        />
                                    </FloatingLabel>
                                </Col>

                                <Col sm="6" md="6" lg="6">
                                    <FloatingLabel controlId="p_Fecha_Calificacion" label="Fecha Calificacion">
                                        <Form.Control
                                            type="date"
                                            placeholder="Ingrese la fecha de calificacion"
                                            value={p_Fecha_Calificacion}
                                            onChange={(e) => setp_Fecha_Calificacion(e.target.value)}
                                        />
                                    </FloatingLabel>
                                </Col>

                                <Col sm="12" md="6" lg="6">
                                    <FloatingLabel controlId="Corte_Evaluativo" label="Corte_Evaluativo">
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingrese el Corte_Evaluativo"
                                            value={p_Corte_Evaluativo}
                                            onChange={(e) => setp_Corte_Evaluativo(e.target.value)}
                                        />
                                    </FloatingLabel>
                                </Col>



                              
                                <Col sm="6" md="6" lg="6">
                                    <FloatingLabel controlId="IdAlumno" label="Alumno">
                                        <Form.Control
                                            type="text"
                                            value={
                                                selectedAlumno.ID_Alumno
                                                    ? `${selectedAlumno.ID_Alumno} - ${selectedAlumno.Nombres} ${selectedAlumno.Apellidos}`
                                                    : ''
                                            }
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
                                            value={
                                                selectedAsignatura.ID_Asignatura
                                                    ? `${selectedAsignatura.ID_Asignatura} - ${selectedAsignatura.Nombre_Asignatura}`
                                                    : ''
                                            }
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
                    <Modal.Title>Seleccionar Cliente</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <AlumnoList handleAlumnoSelect={setselectedAlumno} />

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
