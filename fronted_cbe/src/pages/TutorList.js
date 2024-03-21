import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Row, Col, Form, Modal, FloatingLabel } from 'react-bootstrap';
import Header from '../components/Header';
import {FaPlus, FaTrashCan, FaPencil } from 'react-icons/fa6';

function TutorList({ handleTutorSelect }) {
  const [tutores, setTutores] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState({});
  const [formData, setFormData] = useState({
    Nombres: '',
    Telefono: '',
  });

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredTutores = tutores.filter((tutor) => {
    const nombreTutor = tutor.Nombres.toLowerCase();
    const telefonoTutor = tutor.Telefono.toLowerCase();
    const search = searchQuery.toLowerCase();

    return (
      nombreTutor.includes(search.toLowerCase()) ||
      telefonoTutor.includes(search.toLowerCase())
    );
  });

  const openModal = (tutor) => {
    setSelectedTutor(tutor);
    setFormData({
      Nombres: tutor.Nombres,
      Telefono: tutor.Telefono,
    });
    setShowModal(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const loadTutores = () => {
    fetch('http://localhost:5000/crud/readTutor')
      .then((response) => response.json())
      .then((data) => setTutores(data))
      .catch((error) => console.error('Error al obtener los tutores:', error));
  };

  const handleUpdate = () => {
    fetch(`http://localhost:5000/crud/updateTutor/${selectedTutor.ID_Tutor}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          setShowModal(false);
          loadTutores();
        }
      })
      .catch((error) => console.error('Error al actualizar el tutor:', error));
  };

  const handleDelete = (idTutor) => {
    const confirmation = window.confirm('¿Seguro que deseas eliminar este tutor?');
    if (confirmation) {
      fetch(`http://localhost:5000/crud/deleteTutor/${idTutor}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            loadTutores();
            alert('Tutor eliminado con éxito.');
          } else {
            alert('Error al eliminar el tutor. Por favor, inténtalo de nuevo más tarde.');
          }
        })
        .catch((error) => {
          console.error('Error al eliminar el tutor:', error);
          alert('Ocurrió un error al eliminar el tutor. Por favor, verifica tu conexión a Internet o inténtalo de nuevo más tarde.');
        });
    }
  };

  useEffect(() => {
    loadTutores();
  }, []);

  return (
    <div>
      <Header />
      <Card className="m-3"responsive>
        <Card.Body>
          <Card.Title className="mb-3"responsive>Listado de Tutores</Card.Title>
          <Row className="mb-3">
            <Col sm="6" md="6" lg="4">
              <FloatingLabel controlId="search" label="Buscar">
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
                <th>Nombres</th>
                <th>Teléfono</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredTutores.map((tutor) => (
                <tr key={tutor.ID_Tutor}>
                  <td>{tutor.ID_Tutor}</td>
                  <td>{tutor.Nombres}</td>
                  <td>{tutor.Telefono}</td>
                  <td>
                  <div className="botoncitos-container" style={{ borderColor: 'blue', display: 'flex' }}>
                    <Button variant="success" onClick={() => openModal(tutor)}className='Botoncitos'>
                      <FaPencil style={{ color: 'white' }} />
                      </Button>
                      <div style={{ marginLeft: '5px' }}></div>
                    <Button variant="danger" onClick={() => handleDelete(tutor.ID_Tutor)} className='Botoncitos'style={{ backgroundColor: '#DC3545', borderColor: '#DC3545' }}>
                      <FaTrashCan style={{ color: 'white' }}/>
                      </Button>
                      <div style={{ marginLeft: '5px' }}></div>

                      
                    <Button 
                    variant="primary"
                     onClick={() => handleTutorSelect(tutor.ID_Tutor, tutor.Nombres)}
                     className='Botoncitos'
                     style={{ backgroundColor: '#007BFF', borderColor: '#007BFF' }}
                     >
                     <FaPlus style={{ color: 'white' }} />
                     </Button>
                     </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Tutor</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Card className="mt-3">
            <Card.Body>
              <Card.Title>Registro de Tutor</Card.Title>
              <Form className="mt-3">
                <Row className="g-3">



                  <Col sm="6" md="6" lg="4">
                    <FloatingLabel controlId="nombres" label="Nombres">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese los nombres"
                        name="Nombres"
                        value={formData.Nombres}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>


                  <Col sm="6" md="6" lg="4">
                    <FloatingLabel controlId="Telefono" label="Telfono">
                      <Form.Control
                        type="number"
                        placeholder="Ingrese el numero"
                        name="Telefono"  // Corregido
                        value={formData.Telefono}
                        onChange={handleFormChange}
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

export default TutorList;
