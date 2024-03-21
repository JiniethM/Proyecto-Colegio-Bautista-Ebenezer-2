import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Row, Col, Form, Modal, FloatingLabel  } from 'react-bootstrap';
import Header from '../components/Header';
import { FaTrashCan, FaPencil } from 'react-icons/fa6';


function MatriculaList() {
  const [matricula, setMatricula] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMatricula, setselectedMatricula] = useState({});
  const [formData, setFormData] = useState({
    Anio_Escolar: '',
    ID_Grado: '',
    Tipo_Matricula: '',
    NombreCompleto: '',
    
  });
 
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };


  const filteredMatricula = matricula.filter((matricula) => {
    // Convierte los valores de los campos a minúsculas para realizar una búsqueda insensible a mayúsculas y minúsculas,
    // excepto para el campo ID_Grado
    const anio_Escolar = matricula.Anio_Escolar ? matricula.Anio_Escolar.toLowerCase() : '';
    const iD_Grado = matricula.ID_Grado ? matricula.ID_Grado : '';
    const tipo_Matricula = matricula.Tipo_Matricula ? matricula.Tipo_Matricula.toLowerCase() : '';
    const nombreCompleto = matricula.NombreCompleto ? matricula.NombreCompleto.toLowerCase() : '';
    const search = searchQuery.toLowerCase();
    
    // Verifica si la cadena de búsqueda se encuentra en alguno de los campos
    return (
        anio_Escolar.includes(search) ||
        iD_Grado.toString().includes(search) ||  // Convierte a cadena para buscar sin importar mayúsculas o minúsculas
        tipo_Matricula.includes(search) ||
        nombreCompleto.includes(search)
    );
  });
  
  
  

  // Función para abrir el modal y pasar los datos del matricula seleccionado
  const openModal = (matricula) => {
    setselectedMatricula(matricula);


    setFormData({
        Anio_Escolar: matricula.Anio_Escolar,
        ID_Grado: matricula.ID_Grado,
        Tipo_Matricula: matricula.Tipo_Matricula,
        NombreCompleto: matricula.NombreCompleto,

    });
    
    setShowModal(true);
  };

  
 

  // Función para manejar cambios en el formulario
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const loadMatricula = () => {
    fetch('http://localhost:5000/crud/readMatricula')
      .then((response) => response.json())
      .then((data) => setMatricula(data))
      .catch((error) => console.error('Error al obtener el Tutor :', error));
  };


  // Función para enviar el formulario de actualización
  const handleUpdate = () => {
    // Realiza la solicitud PUT al servidor para actualizar el registro
    fetch(`http://localhost:5000/crud/updateTutor/${selectedMatricula.ID_Matricula}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          // La actualización fue exitosa, puedes cerrar el modal y refrescar la lista de tutor
          setShowModal(false);
          loadMatricula(); // Cargar la lista de tutor actualizada
        }
      })
      .catch((error) => console.error('Error al actualizar el registro:', error));
  };

  // Función para eliminar un tutor
const handleDelete = (id_matricula) => {
  const confirmation = window.confirm('¿Seguro que deseas eliminar este tutor?');
  if (confirmation) {
    // Realiza la solicitud DELETE al servidor para eliminar el alumno
    console.log('Enviando solicitud DELETE con id_matricula:', id_matricula);
    fetch(`http://localhost:5000/crud/deleteMatricula/${id_matricula}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          console.log('Eliminación exitosa. Refrescando la lista de tutor.');
          // La eliminación fue exitosa, refresca la lista de tutor
          loadMatricula();
        } else {
          console.log('Error al eliminar el tutor:', response.status);
        }
      })
      .catch((error) => console.error('Error al eliminar el tutor:', error));
  }
};


  // Realiza una solicitud GET al servidor para obtener los tutor
  useEffect(() => {
    fetch('http://localhost:5000/crud/readMatricula')
      .then((response) => response.json())
      .then((data) => setMatricula(data))
      .catch((error) => console.error('Error al obtener los tutor y personas:', error));
  }, []);

  return (
    <div>
      <Header />

      <Card className="m-3"responsive>
        <Card.Body>
          <Card.Title className="mb-3"responsive>Listado de Matricula</Card.Title>
          
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
                <th>Año Escolar</th>
                <th>Grado</th> 
                <th>Tipo_Matricula</th>
                <th>Nombre de alumno</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredMatricula.map((matricula) => (
                <tr key={matricula.ID_Matricula   }>
                  <td>{matricula.ID_Matricula }</td>
                  <td>{matricula.Anio_Escolar }</td>
                  <td>{matricula.ID_Grado ? matricula.ID_Grado.toString() : ''}</td>


                  <td>{matricula.Tipo_Matricula  }</td>
                  <td>{matricula.NombreCompleto  }</td>
                  <td>
                  <div className="botoncitos-container" style={{ borderColor: 'blue', display: 'flex' }}>
                    <Button variant="success" onClick={() => openModal(matricula)}className='Botoncitos'>
                      <FaPencil style={{ color: 'white' }} />
                      </Button>
                      <div style={{ marginLeft: '5px' }}></div>
                      <Button variant="danger" onClick={() => handleDelete(matricula.ID_Matricula)} className='Botoncitos'style={{ backgroundColor: '#DC3545', borderColor: '#DC3545' }}>
                      <FaTrashCan style={{ color: 'white' }}/>
                      </Button>
                      <div style={{ marginLeft: '5px' }}></div>
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
          <Modal.Title>Actualizar tutor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="mt-3">
            <Card.Body>
              <Card.Title>Registro de tutor</Card.Title>
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

                  


                  <Col sm="12" md="6" lg="4">
                    <FloatingLabel controlId="telefono" label="Teléfono">
                      <Form.Control 
                        type="number" 
                        placeholder="Ingrese el teléfono"
                        name="Telefono"
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

export default MatriculaList;
