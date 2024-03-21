import React, { useState } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button, Modal } from 'react-bootstrap';
import Header from '../components/Header';
import '../styles/App.css';
import TutorList from './TutorList';
import MatriculaList from './MatriculaList';
function Alumno() {
    const [Nombres, setNombres] = useState('');
    const [Apellidos, setApellidos] = useState('');
    const [Fecha_Nacimiento, setFecha_Nacimiento] = useState('');
    const [Direccion, setDireccion] = useState('');
    const [Genero, setGenero] = useState('');
    const [Telefono, setTelefono] = useState('');
    const [ID_Tutor, setID_Tutor] = useState('');

    const [showTutorListModal, setShowTutorListModal] = useState(false);
    const [selectedTutor, setSelectedTutor] = useState({});


    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            Nombres,
            Apellidos,
            Fecha_Nacimiento,
            Direccion,
            Genero,
            Telefono,
            ID_Tutor,
        };
    
        console.log('Datos a enviar:', formData); // Agrega esta línea
    
        try {
            const response = await fetch('http://localhost:5000/crud/createAlumno', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            if (response.ok) {
                alert('Registro exitoso');
                setNombres('');
                setApellidos('');
                setFecha_Nacimiento('');
                setGenero('');
                setDireccion('');
                setTelefono('');
                setID_Tutor('');
            } else {
                alert('Error al registrar el Alumno');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            alert('Error en la solicitud al servidor');
        }
    };
    

    const handleTutorSelect = (idTutor, nombre) => {
        setID_Tutor(idTutor);
        setSelectedTutor({
            ID_Tutor: idTutor,
            Nombres: nombre,
        });
        setShowTutorListModal(false);
    };


    
    return (
        <div>
            <Header />
            <Container>
                <Card className="mt-3">
                    <Card.Body>
                        <Card.Title>Registro de Alumno</Card.Title>
                        <Form className="mt-3" onSubmit={handleSubmit}>
                            <Row className="g-3">


                                <Col sm="6" md="6" lg="6">
                                    <FloatingLabel controlId="Nombres" label="Nombre">
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingrese el nombre"
                                            value={Nombres}
                                            onChange={(e) => setNombres(e.target.value.replace(/\d/g,''))}
                                        />
                                    </FloatingLabel>
                                </Col>

                                <Col sm="6" md="6" lg="6">
                                    <FloatingLabel controlId="Apellidos" label="Apellido">
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingrese el apellido"
                                            value={Apellidos}
                                            onChange={(e) => setApellidos(e.target.value.replace(/\d/g,''))}
                                        />
                                    </FloatingLabel>
                                </Col>

                                <Col sm="12" md="6" lg="6">
                                    <FloatingLabel controlId="Fecha_Nacimiento" label="Fecha_Nacimiento">
                                        <Form.Control
                                            type="date"
                                            placeholder="Ingrese la Fecha_Nacimiento"
                                            value={Fecha_Nacimiento}
                                            onChange={(e) => setFecha_Nacimiento(e.target.value)}
                                        />
                                    </FloatingLabel>
                                </Col>

                                <Col sm="12" md="6" lg="6">
                                    <FloatingLabel controlId="Genero" label="Genero">
                                        <Form.Select
                                            aria-label="Genero"
                                            value={Genero}
                                            onChange={(e) => setGenero(e.target.value)}
                                        >
                                            <option>Seleccione el genero</option>
                                            <option value="F">F</option>
                                            <option value="M">M</option>
                                        </Form.Select>
                                    </FloatingLabel>
                                </Col>

                                <Col sm="12" md="6" lg="6">
                                    <FloatingLabel controlId="Direccion" label="Direccion">
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingrese la Direccion"
                                            value={Direccion}
                                            onChange={(e) => setDireccion(e.target.value)}
                                        />
                                    </FloatingLabel>
                                </Col>

                                <Col sm="12" md="6" lg="6">
                                    <FloatingLabel controlId="Telefono" label="Telefono">
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingrese el Telefono"
                                            value={Telefono}
                                            onChange={(e) => setTelefono(e.target.value)}
                                        />
                                    </FloatingLabel>
                                </Col>

                                

                                <Col sm="6" md="6" lg="6">
                                    <FloatingLabel controlId="Idtutor" label="Tutor">
                                        <Form.Control
                                            type="text"
                                            value={
                                                selectedTutor.ID_Tutor
                                                    ? `${selectedTutor.ID_Tutor} - ${selectedTutor.Nombres}`
                                                    : ''
                                            }
                                            disabled
                                        />
                                        <Button variant="primary" onClick={() => setShowTutorListModal(true)}>
                                            Seleccionar Tutor
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

            <Modal show={showTutorListModal} onHide={() => setShowTutorListModal(false)} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>Seleccionar Tutor</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TutorList handleTutorSelect={handleTutorSelect} />
                </Modal.Body>
            </Modal>



            
        </div>
    );
}

export default Alumno;
