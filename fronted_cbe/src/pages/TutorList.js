import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Row, Col, Form, Modal, FloatingLabel } from 'react-bootstrap';
import Header from '../components/Header';
import { FaPlus, FaTrashAlt, FaPencilAlt } from 'react-icons/fa';

function TutorList({ handleTutorSelect }) {
  const [tutores, setTutores] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState({});
  const [formData, setFormData] = useState({
    Nombres: '',
    Telefono: '', // Prellenado con guion para formato
  });

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredTutores = tutores.filter((tutor) => {
    return tutor.Nombres.toLowerCase().includes(searchQuery.toLowerCase()) ||
           tutor.Telefono.includes(searchQuery);
  });

  const openModal = (tutor) => {
    setSelectedTutor(tutor);
    setFormData({
      Nombres: tutor.Nombres,
      Telefono: tutor.Telefono || '----', // Puede prellenar con guión si está vacío
    });
    setShowModal(true);
  };

  const handleNameChange = (e) => {
    const value = e.target.value.slice(0, 50).replace(/\d/g, '');
    setFormData({
      ...formData,
      Nombres: value,
    });
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/[^\d-]/g, ''); // Eliminar cualquier caracter que no sea número o guión
    if (value.length > 4) {
      // Si el valor tiene más de 4 dígitos, asegurarse de que el guión esté presente
      value = value.slice(0, 4) + '-' + value.slice(4).replace(/-/g, ''); // Añadir guión automáticamente y eliminar guiones adicionales
    }
    if (value.length > 9) {
      // Si la longitud excede 9 (4 números, 1 guión, 4 números), truncar
      value = value.slice(0, 9);
    }
    setFormData({
      ...formData,
      Telefono: value,
    });
  };
  

  const loadTutores = () => {
    fetch('http://localhost:5000/crud/readTutor')
      .then((response) => response.json())
      .then((data) => setTutores(data))
      .catch((error) => console.error('Error al obtener los tutores:', error));
  };

  const handleUpdate = () => {
    if (formData.Telefono.length === 9) {
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
            alert('Tutor actualizado correctamente.');
          } else {
            throw new Error('Error al actualizar el tutor');
          }
        })
        .catch((error) => {
          console.error('Error al actualizar el tutor:', error);
          alert('Error al actualizar el tutor. Por favor, inténtalo de nuevo más tarde.');
        });
    } else {
      alert('Por favor ingrese un número de teléfono válido.');
    }
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
      <Card className="m-3" responsive>
        <Card.Body>
          <Card.Title className="mb-3" responsive>Listado de Tutores</Card.Title>
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
                      <Button variant="success" onClick={() => openModal(tutor)}>
                        <FaPencilAlt style={{ color: 'white' }} />
                      </Button>
                      <div style={{ marginLeft: '5px' }}></div>
                      <Button variant="danger" onClick={() => handleDelete(tutor.ID_Tutor)}>
                        <FaTrashAlt style={{ color: 'white' }} />
                      </Button>
                      <div style={{ marginLeft: '5px' }}></div>
                      <Button
                        variant="primary"
                        onClick={() => handleTutorSelect(tutor.ID_Tutor, tutor.Nombres)}
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
                        onChange={handleNameChange}
                      />
                    </FloatingLabel>
                  </Col>
                  <Col sm="6" md="6" lg="4">
                    <FloatingLabel controlId="Telefono" label="Teléfono">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese el número"
                        name="Telefono"
                        value={formData.Telefono}
                        onChange={handlePhoneChange}
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

