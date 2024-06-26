import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Row, Col, Form, Modal, FloatingLabel } from 'react-bootstrap';
import Header from '../components/Header';
import { FaTrashCan, FaPencil } from 'react-icons/fa6';

function CalificacionList({ handleCalificacionSelect }) {
    const [calificaciones, setCalificaciones] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedCalificacion, setSelectedCalificacion] = useState({});
    const [formData, setFormData] = useState({
        ID_Calificacion: '',
        Calificacion_Obtenida: '',
        Fecha_Calificacion: '',
        Corte_Evaluativo: '',
    });

    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        loadCalificaciones();
    }, []);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredCalificaciones = calificaciones.filter((calificacion) => {
        const nombreAlumno = calificacion.NombreAlumno ? calificacion.NombreAlumno.toLowerCase() : '';
        const fechaCalificacion = calificacion.Fecha_Calificacion ? formatDateForInput(calificacion.Fecha_Calificacion) : '';
        const search = searchQuery.toLowerCase();
    
        return nombreAlumno.includes(search) || fechaCalificacion.includes(search);
    });
    

    const openModal = (calificacion) => {
        setSelectedCalificacion(calificacion);
        const formattedDate = formatDateForInput(calificacion.Fecha_Calificacion);
        setFormData({
            ID_Calificacion: calificacion.ID_Calificacion,
            Calificacion_Obtenida: calificacion.Calificacion_Obtenida,
            Fecha_Calificacion: formattedDate,
            Corte_Evaluativo: calificacion.Corte_Evaluativo,
        });

        setShowModal(true);
    };

    function formatDateForInput(dateTimeString) {
        const date = new Date(dateTimeString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const loadCalificaciones = () => {
        fetch('http://localhost:5000/crud/VerCalificaciones')
            .then((response) => response.json())
            .then((data) => {
                console.log('Datos recibidos:', data); // Asegúrate de verificar esta salida en la consola del navegador
                if (Array.isArray(data) && data.length > 0 && Array.isArray(data[0])) {
                    setCalificaciones(data[0]); // Asumiendo que el array de datos está en la primera posición
                } else if (Array.isArray(data)) {
                    setCalificaciones(data); // Si la respuesta ya es un array adecuado
                } else {
                    console.error('Formato de datos no esperado:', data);
                    setCalificaciones([]); // Asegura que calificaciones sea un array para evitar errores
                }
            })
            .catch((error) => {
                console.error('Error al obtener las calificaciones:', error);
                setCalificaciones([]); // En caso de error, también asegura que calificaciones sea un array
            });
    };
    

    const handleUpdate = () => {
        const confirmation = window.confirm('¿Seguro que deseas actualizar esta calificación?');
        if (confirmation) {
            fetch(`http://localhost:5000/crud/updateCalificacion/${selectedCalificacion.ID_Calificacion}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
                .then((response) => {
                    if (response.ok) {
                        setShowModal(false);
                        loadCalificaciones();
                    }
                })
                .catch((error) => console.error('Error al actualizar la calificación:', error));
        }
    };

    const handleDelete = (idCalificacion) => {
        const confirmation = window.confirm('¿Seguro que deseas eliminar esta calificación?');
        if (confirmation) {
            fetch(`http://localhost:5000/crud/deleteCalificacion/${idCalificacion}`, {
                method: 'DELETE',
            })
                .then((response) => {
                    if (response.ok) {
                        loadCalificaciones();
                    } else {
                        console.log('Error al eliminar la calificación:', response.status);
                    }
                })
                .catch((error) => console.error('Error al eliminar la calificación:', error));
        }
    };

    return (
        <div>
            <Header />

            <Card className="m-3">
                <Card.Body>
                    <Card.Title className="mb-3">Listado de Calificaciones</Card.Title>

                    <Row className="mb-3">
                        <Col sm="6" md="6" lg="4">
                            <FloatingLabel controlId="Buscar" label="Buscar">
                                <Form.Control
                                    type="text"
                                    placeholder="Buscar"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                />
                            </FloatingLabel>
                        </Col>
                    </Row>

                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Calificación Obtenida</th>
                                <th>Fecha Calificación</th>
                                <th>Nombre Alumno</th>
                                <th>Nombre Asignatura</th>
                                <th>Corte Evaluativo</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCalificaciones.map((calificacion, index) => (
                                <tr key={calificacion.ID_Calificacion}>
                                    <td>{index + 1}</td> {/* Mostrar el índice + 1 como ID secuencial */}
                                    <td>{calificacion.Calificacion_Obtenida}</td>
                                    <td>{formatDateForInput(calificacion.Fecha_Calificacion)}</td>
                                    <td>{calificacion.NombreAlumno}</td>
                                    <td>{calificacion.Nombre_Asignatura}</td>
                                    <td>{calificacion.Corte_Evaluativo}</td>
                                    <td>
                                        <Button
                                            variant="success"
                                            onClick={() => openModal(calificacion)}
                                            style={{ marginRight: '5px' }}
                                        >
                                            <FaPencil />
                                        </Button>
                                        <Button
                                            variant="danger"
                                            onClick={() => handleDelete(calificacion.ID_Calificacion)}
                                        >
                                            <FaTrashCan />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Actualizar Calificación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card className="mt-3">
                        <Card.Body>
                            <Card.Title>Registro de Calificación</Card.Title>
                            <Form className="mt-3">
                                <Row className="g-3">
                                    <Col sm="12" md="6" lg="4">
                                        <FloatingLabel controlId="Calificacion_Obtenida" label="Calificación Obtenida">
                                            <Form.Control
                                                type="text"
                                                placeholder="Ingrese la calificación obtenida"
                                                name="Calificacion_Obtenida"
                                                value={formData.Calificacion_Obtenida}
                                                onChange={(e) => handleFormChange(e)}
                                            />
                                        </FloatingLabel>
                                    </Col>

                                    <Col sm="12" md="6" lg="4">
                                        <FloatingLabel controlId="Fecha_Calificacion" label="Fecha Calificación">
                                            <Form.Control
                                                type="date"
                                                name="Fecha_Calificacion"
                                                value={formData.Fecha_Calificacion}
                                                onChange={(e) => handleFormChange(e)}
                                            />
                                        </FloatingLabel>
                                    </Col>

                                    <Col sm="12" md="6" lg="4">
                                        <FloatingLabel controlId="Corte_Evaluativo" label="Corte Evaluativo">
                                            <Form.Control
                                                type="text"
                                                placeholder="Ingrese el corte evaluativo"
                                                name="Corte_Evaluativo"
                                                value={formData.Corte_Evaluativo}
                                                onChange={(e) => handleFormChange(e)}
                                            />
                                        </FloatingLabel>
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                    </Card>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>
                        Actualizar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default CalificacionList;
