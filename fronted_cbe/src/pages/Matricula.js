import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button, Modal } from 'react-bootstrap';
import Header from '../components/Header';
import '../styles/App.css';
import AlumnoList from './AlumnoList';

function Matricula() {
    const [Anio_Escolar, setAnio_Escolar] = useState('');
    const [ID_Grado, setID_Grado] = useState('');
    const [Tipo_Matricula, setTipo_Matricula] = useState('');
    const [ID_Alumno, setID_Alumno] = useState('');

    const [showAlumnoListModal, setShowAlumnoListModal] = useState(false);
    const [selectedAlumno, setselectedAlumno] = useState({});

    const [matriculas, setMatriculas] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/crud/ComboGrado')
            .then(response => response.json())
            .then(data => {
                setMatriculas(data);
            })
            .catch(error => {
                console.error('Error al obtener los grados', error);
            });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            Anio_Escolar,
            ID_Grado,
            Tipo_Matricula,
            ID_Alumno: selectedAlumno.ID_Alumno
        };

        console.log('Datos a registrar:', formData);

        try {
            const response = await fetch('http://localhost:5000/crud/createMatricula', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Matrícula guardada y reflejada correctamente');  
                setAnio_Escolar('');
                setID_Grado('');
                setTipo_Matricula('');
                setID_Alumno('');
            } else {
                alert('Error al registrar Matricula');  
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
                        <Card.Title>Registro de Matricula</Card.Title>
                        <Form className="mt-3" onSubmit={handleSubmit}>
                            <Row className="g-3">
                                <Col sm="12" md="6" lg="6">
                                    <FloatingLabel controlId="Año_Escolar" label="Año_Escolar">
                                        <Form.Select
                                            aria-label="Año_Escolar"
                                            value={Anio_Escolar}
                                            onChange={(e) => setAnio_Escolar(e.target.value)}
                                        >
                                            <option>Seleccione el Año_Escolar</option>
                                            <option value="2022">2022</option>
                                            <option value="2023">2023</option>
                                            <option value="2024">2024</option>
                                            <option value="2025">2025</option>
                                            <option value="2026">2026</option>
                                            <option value="2027">2027</option>
                                        </Form.Select>
                                    </FloatingLabel>
                                </Col>

                                <Col sm="12" md="6" lg="4">
                                    <FloatingLabel controlId="ID_Grado" label="ID_Grado">
                                        <Form.Select
                                            aria-label="ID_Grado"
                                            value={ID_Grado}
                                            onChange={(e) => setID_Grado(e.target.value)}
                                        >
                                            <option>Seleccione el grado</option>
                                            {matriculas.map((matricula) => (
                                                <option key={matricula.ID_Grado} value={matricula.ID_Grado}>
                                                    {matricula.ID_Grado}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </FloatingLabel>
                                </Col>

                                <Col sm="6" md="6" lg="6">
                                    <FloatingLabel controlId="Tipo_Matricula" label="Tipo de Matricula">
                                        <Form.Select
                                            aria-label="Tipo_Matricula"
                                            value={Tipo_Matricula}
                                            onChange={(e) => setTipo_Matricula(e.target.value)}
                                        >
                                            <option value="">Seleccione el tipo de matrícula</option>
                                            <option value="Nuevo Ingreso">Nuevo Ingreso</option>
                                            <option value="Reingreso">Reingreso</option>
                                        </Form.Select>
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
                    <AlumnoList handleAlumnoSelect={setselectedAlumno} />
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default Matricula;
