import React, { useState} from 'react';
import { Form, Row, Col, Container, FloatingLabel, Card, Button, Modal } from 'react-bootstrap';
import Header from '../components/Header';
import '../styles/App.css';
import AlumnoList from './AlumnoList';

function PagoColegiatura() {

    // Crear un estado para cada campo del formulario

    const [Monto, setMonto] = useState('');
    const [Fecha_Pago, setFecha_Pago] = useState('');
    const [ID_Alumno, setID_Alumno] = useState('');


    const [showAlumnoListModal, setShowAlumnoListModal] = useState(false);
    const [selectedAlumno, setselectedAlumno] = useState({});




    // Función para manejar el envío del formulario
const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear un objeto con los datos del formulario
    const formData = {
        Monto,
        Fecha_Pago,
        ID_Alumno: selectedAlumno.ID_Alumno
    };

    console.log('Datos a registrar:', formData);

    try {
        // Realizar una solicitud HTTP al backend para enviar los datos
        const response = await fetch('http://localhost:5000/crud/createPagoColegiatura', {
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

            setMonto('');
            setFecha_Pago('');
            setID_Alumno('');
            
        } else {
            alert('Error al registrar PagoColegiatura');
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
                        <Card.Title>Registro de Pago de colegiatura</Card.Title>
                        <Form className="mt-3" onSubmit={handleSubmit}>
                            <Row className="g-3">




                                <Col sm="6" md="6" lg="6">
                                    <FloatingLabel controlId="Monto" label="Monto">
                                        <Form.Control
                                            type="number"
                                            placeholder="Ingrese el Monto"
                                            value={Monto}
                                            onChange={(e) => setMonto(e.target.value)}
                                        />
                                    </FloatingLabel>
                                </Col>


                                <Col sm="6" md="6" lg="6">
                                    <FloatingLabel controlId="Fecha_Pago" label="Fecha Pago">
                                        <Form.Control
                                            type="Date"
                                            placeholder="Ingrese la Fecha_Pago"
                                            value={Fecha_Pago}
                                            onChange={(e) => setFecha_Pago(e.target.value)}
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
                    <Modal.Title>Seleccionar Cliente</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <AlumnoList handleAlumnoSelect={setselectedAlumno} />

                </Modal.Body>
            </Modal>

        </div>
    );
}

export default PagoColegiatura;
