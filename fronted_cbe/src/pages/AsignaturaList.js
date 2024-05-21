import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Row, Col, Form, Modal, FloatingLabel } from 'react-bootstrap';
import Header from '../components/Header';
import DocenteList from './DocenteList';
import { FaTrashCan, FaPencil } from 'react-icons/fa6';

function AsignaturaList({ handleAsignaturaSelect }) {
    const [asignatura, setAsignatura] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedAsignatura, setselectedAsignatura] = useState({});
    const [formData, setFormData] = useState({
        Nombre_Asignatura: '',
        Horario: '',
        ID_Docente: '',
    });
    const [showDocenteListModal, setShowDocenteListModal] = useState(false);
    const [selectedDocente, setselectedDocente] = useState({});
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredAsignatura = asignatura.filter((asignatura) => {
        const idasignatura = asignatura && asignatura.Id ? asignatura.Id.toLowerCase() : '';
        const nombre_Asignatura = asignatura && asignatura.Nombre_Asignatura ? asignatura.Nombre_Asignatura.toLowerCase() : '';
        const horario = asignatura && asignatura.Horario ? asignatura.Horario.toLowerCase() : '';
        const search = searchQuery.toLowerCase();

        return (
            idasignatura.includes(search) ||
            nombre_Asignatura.includes(search) ||
            horario.includes(search)
        );
    });

    const openModal = (asignatura) => {
        setselectedAsignatura(asignatura);
        const formattedHorarios = formatDateForInput(asignatura.Horario);
        setFormData({
            Nombre_Asignatura: asignatura.Nombre_Asignatura,
            Horario: formattedHorarios,
            ID_Docente: asignatura.ID_Docente,
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

    const loadAsignatura = () => {
        fetch('http://localhost:5000/crud/readAsignatura')
            .then((response) => response.json())
            .then((data) => setAsignatura(data))
            .catch((error) => console.error('Error al obtener la asignatura:', error));
    };

    const handleUpdate = () => {
        console.log('Datos a enviar para actualizar:', formData);
        fetch(`http://localhost:5000/crud/updateAsignatura/${selectedAsignatura.ID_Asignatura}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then((response) => {
            if (response.ok) {
                setShowModal(false);
                loadAsignatura();
            } else {
                console.error('Error al actualizar el registro:', response.status);
            }
        })
        .catch((error) => console.error('Error al actualizar el registro:', error));
    };

    const handleDelete = (id_asignatura) => {
        const confirmation = window.confirm('¿Seguro que deseas eliminar este asignatura?');
        if (confirmation) {
            console.log('Enviando solicitud DELETE con ID_Grado:', id_asignatura);
            fetch(`http://localhost:5000/crud/deleteAsignatura/${id_asignatura}`, {
                method: 'DELETE',
            })
            .then((response) => {
                if (response.ok) {
                    console.log('Eliminación exitosa. Refrescando la lista de asignatura.');
                    loadAsignatura();
                } else {
                    console.log('Error al eliminar el asignatura:', response.status);
                }
            })
            .catch((error) => console.error('Error al eliminar el asignatura:', error));
        }
    };

    useEffect(() => {
        loadAsignatura();
    }, []);

    return (
        <div>
            <Header />

            <Card className="m-3" responsive>
                <Card.Body>
                    <Card.Title className="mb-3" responsive>Listado de Asignatura</Card.Title>

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

                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre_Asignatura</th>
                                <th>Horario</th>
                                <th>ID_Docente</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAsignatura.map((asignatura) => (
                                <tr key={asignatura.ID_Asignatura}>
                                    <td>{asignatura.ID_Asignatura}</td>
                                    <td>{asignatura.Nombre_Asignatura}</td>
                                    <td>{formatDateForInput(asignatura.Horario)}</td>
                                    <td>{asignatura.ID_Docente}</td>
                                    <td>
                                        <div className="botoncitos-container" style={{ display: 'flex', gap: '5px' }}>
                                            <Button variant="success" onClick={() => openModal(asignatura)}>
                                                <FaPencil style={{ color: 'white' }} />
                                            </Button>
                                            <Button variant="danger" onClick={() => handleDelete(asignatura.ID_Asignatura)}>
                                                <FaTrashCan style={{ color: 'white' }}/>
                                            </Button>
                                            <Button variant="success" onClick={() => handleAsignaturaSelect(asignatura.ID_Asignatura, asignatura.Nombre_Asignatura)}>
                                                Seleccionar
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

            <Modal show={showModal} onHide={() => setShowModal(false)} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>Actualizar Asignatura</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card className="mt-3">
                        <Card.Body>
                            <Card.Title>Registro de Asignatura</Card.Title>
                            <Form className="mt-3">
                                <Row className="g-3">
                                    <Col sm="6" md="6" lg="4">
                                        <FloatingLabel controlId="nombreasignatura" label="Nombres Asignatura">
                                            <Form.Control
                                                type="text"
                                                placeholder="Ingrese los nombres"
                                                name="Nombre_Asignatura"
                                                value={formData.Nombre_Asignatura}
                                                onChange={handleFormChange}
                                            />
                                        </FloatingLabel>
                                    </Col>

                                    <Col sm="12" md="6" lg="6">
                                        <FloatingLabel controlId="Horario" label="Horario">
                                            <Form.Control
                                                type="text"
                                                placeholder="Ingrese el Horario"
                                                name="Horario"
                                                value={formData.Horario}
                                                onChange={handleFormChange}
                                            />
                                        </FloatingLabel>
                                    </Col>

                                    <Col sm="6" md="6" lg="6">
                                        <FloatingLabel controlId="idDocente" label="Docente">
                                            <Form.Control
                                                type="text"
                                                value={
                                                    selectedDocente.ID_Docente
                                                        ? `${selectedDocente.ID_Docente} - ${selectedDocente.Nombres} ${selectedDocente.Apellidos}`
                                                        : ''
                                                }
                                                disabled
                                            />
                                            <Button variant="primary" onClick={() => setShowDocenteListModal(true)}>
                                                Seleccionar Docente
                                            </Button>
                                        </FloatingLabel>
                                    </Col>

                                    <Modal show={showDocenteListModal} onHide={() => setShowDocenteListModal(false)} size="xl">
                                        <Modal.Header closeButton>
                                            <Modal.Title>Seleccionar Docente</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <DocenteList handleDocenteSelect={setselectedDocente} />
                                        </Modal.Body>
                                    </Modal>
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

export default AsignaturaList;
