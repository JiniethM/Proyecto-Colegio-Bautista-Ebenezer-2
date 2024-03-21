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
        // Convierte los valores de los campos a minúsculas para realizar una búsqueda insensible a mayúsculas y minúsculas
        const idasignatura = asignatura && asignatura.Id ? asignatura.Id.toLowerCase() : '';
        const nombre_Asignatura = asignatura && asignatura.Nombre_Asignatura ? asignatura.Nombre_Asignatura.toLowerCase() : '';
        const horario = asignatura && asignatura.Horario ? asignatura.Horario.toLowerCase() : '';

        const search = searchQuery.toLowerCase();

        // Verifica si la cadena de búsqueda se encuentra en alguno de los campos
        return (
            idasignatura.includes(search.toLowerCase()) ||
            nombre_Asignatura.includes(search.toLowerCase()) ||
            horario.includes(search.toLowerCase())


        );
    });

    // Formatea la fecha para el campo "Fecha_Nacimiento"
    

    // Función para abrir el modal y pasar los datos del docente seleccionado
  const openModal = (asignatura) => {
    setselectedAsignatura(asignatura);

    // Formatea la fecha para el campo "Fecha_Nacimiento"
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
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Agregar ceros iniciales
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }


    // Función para manejar cambios en el formulario
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
        // Agrega un console.log para mostrar los datos que se enviarán
        console.log('Datos a enviar para actualizar:', formData);
    
        // Realiza la solicitud PUT al servidor para actualizar el registro
        fetch(`http://localhost:5000/crud/updateAsignatura/${selectedAsignatura.ID_Asignatura}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData), // Asegúrate de que formData coincida con la estructura de datos del servidor
        })
        .then((response) => {
            if (response.ok) {
                // La actualización fue exitosa, puedes cerrar el modal y refrescar la lista de asignaturas
                setShowModal(false);
                loadAsignatura(); // Cargar la lista de asignaturas actualizada
            } else {
                console.error('Error al actualizar el registro:', response.status);
                // Maneja el error de manera adecuada, por ejemplo, mostrando un mensaje de error al usuario
            }
        })
        .catch((error) => console.error('Error al actualizar el registro:', error));
    };
    
    

    // Función para eliminar un asignatura
    const handleDelete = (id_asignatura) => {
        const confirmation = window.confirm('¿Seguro que deseas eliminar este asignatura?');
        if (confirmation) {
            // Realiza la solicitud DELETE al servidor para eliminar el alumno
            console.log('Enviando solicitud DELETE con ID_Grado:', id_asignatura);
            fetch(`http://localhost:5000/crud/deleteAsignatura/${id_asignatura}`, {
                method: 'DELETE',
            })
                .then((response) => {
                    if (response.ok) {
                        console.log('Eliminación exitosa. Refrescando la lista de asignatura.');
                        // La eliminación fue exitosa, refresca la lista de asignatura
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
                  <div className="botoncitos-container" style={{ borderColor: 'blue', display: 'flex' }}>
                    <Button variant="success" onClick={() => openModal(asignatura)}className='Botoncitos'>
                      <FaPencil style={{ color: 'white' }} />
                      </Button>
                      
                      <div style={{ marginLeft: '5px' }}></div>
                      <Button variant="danger" onClick={() => handleDelete(asignatura.ID_Asignatura)} className='Botoncitos'style={{ backgroundColor: '#DC3545', borderColor: '#DC3545' }}>
                      <FaTrashCan style={{ color: 'white' }}/>
                      </Button>

                      
                      <Button variant="success" onClick={() => handleAsignaturaSelect(asignatura.ID_Asignatura, asignatura.Nombre_Asignatura)}>Seleccionar</Button>



                      <div style={{ marginLeft: '5px' }}></div>
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
