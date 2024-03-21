import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Row, Col, Form, Modal, FloatingLabel  } from 'react-bootstrap';
import Header from '../components/Header';
import { FaTrashCan, FaPencil } from 'react-icons/fa6';


function GradoList() {
  const [grado, setGrado] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedGrado, setSelectedGrado] = useState({});
  const [formData, setFormData] = useState({
    ID_Grado: '',
    cant_estudiante: '',
    plan_estudio: '',
   
  });
 
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };


  const filteredGrados = grado.filter((grado) => {
    // Convierte los valores de los campos a minúsculas para realizar una búsqueda insensible a mayúsculas y minúsculas
    const idgrado = grado && grado.Id ? grado.Id.toLowerCase() : '';
const cantestudiante = grado && grado.Cantestudiante ? grado.Cantestudiante.toLowerCase() : '';
const planestudio = grado && grado.Planestudio ? grado.Planestudio.toLowerCase() : '';

    const search = searchQuery.toLowerCase();
    
    // Verifica si la cadena de búsqueda se encuentra en alguno de los campos
    return (
        idgrado.includes(search.toLowerCase()) ||
        cantestudiante.includes(search.toLowerCase())||
        planestudio.includes(search.toLowerCase())
    );
});


  // Función para abrir el modal y pasar los datos del Grado seleccionado
  const openModal = (grado) => {
    setSelectedGrado(grado);


    setFormData({
      ID_Grado: grado.ID_Grado,
      cant_estudiante: grado.Cant_Estudiante,
      plan_estudio: grado.Plan_Estudio,
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

  const loadGrado = () => {
    fetch('http://localhost:5000/crud/readGrado')
      .then((response) => response.json())
      .then((data) => setGrado(data))
      .catch((error) => console.error('Error al obtener el Grado :', error));
  };


  // Función para enviar el formulario de actualización
  const handleUpdate = () => {
    // Realiza la solicitud PUT al servidor para actualizar el registro
    fetch(`http://localhost:5000/crud/updateGrado/${selectedGrado.ID_Grado}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          // La actualización fue exitosa, puedes cerrar el modal y refrescar la lista de Grado
          setShowModal(false);
          loadGrado(); // Cargar la lista de Grado actualizada
        }
      })
      .catch((error) => console.error('Error al actualizar el registro:', error));
  };

  // Función para eliminar un grado
const handleDelete = (ID_Grado) => {
  const confirmation = window.confirm('¿Seguro que deseas eliminar este grado?');
  if (confirmation) {
    // Realiza la solicitud DELETE al servidor para eliminar el alumno
    console.log('Enviando solicitud DELETE con ID_Grado:', ID_Grado);
    fetch(`http://localhost:5000/crud/deleteGrado/${ID_Grado}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          console.log('Eliminación exitosa. Refrescando la lista de grado.');
          // La eliminación fue exitosa, refresca la lista de grado
          loadGrado();
        } else {
          console.log('Error al eliminar el grado:', response.status);
        }
      })
      .catch((error) => console.error('Error al eliminar el grado:', error));
  }
};


  // Realiza una solicitud GET al servidor para obtener los grado
  useEffect(() => {
    fetch('http://localhost:5000/crud/readGrado')
      .then((response) => response.json())
      .then((data) => setGrado(data))
      .catch((error) => console.error('Error al obtener los grado y personas:', error));
  }, []);

  return (
    <div>
      <Header />

      <Card className="m-3"responsive>
        <Card.Body>
          <Card.Title className="mb-3" responsive>Listado de Grado</Card.Title>
          
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
                <th>Cantidad de Estudiante</th>
                <th>Plan de Estudio</th> 
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredGrados.map((grado) => (
                <tr key={grado.ID_Grado  }>
                  <td>{grado.ID_Grado}</td>
                  <td>{grado.Cant_Estudiante}</td>
                  <td>{grado.Plan_Estudio}</td>
                  <td>
                  <div className="botoncitos-container" style={{ borderColor: 'blue', display: 'flex' }}>
                    <Button variant="success" onClick={() => openModal(grado)}className='Botoncitos'>
                      <FaPencil style={{ color: 'white' }} />
                      </Button>
                      <div style={{ marginLeft: '5px' }}></div>
                      <Button variant="danger" onClick={() => handleDelete(grado.ID_Grado)} className='Botoncitos'style={{ backgroundColor: '#DC3545', borderColor: '#DC3545' }}>
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
          <Modal.Title>Actualizar grado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="mt-3">
            <Card.Body>
              <Card.Title>Registro de grado</Card.Title>
              <Form className="mt-3">
                <Row className="g-3">

                  <Col sm="12" md="6" lg="6">
                    <FloatingLabel controlId="Id_Grado" label="ID_Grado" >
                      <Form.Control
                        type="text"
                        placeholder="Ingrese el ID_Grado"
                        name="ID_Grado"
                        value={formData.ID_Grado}
                        onChange={handleFormChange} 
                      />
                    </FloatingLabel>
                  </Col>

                  


                  <Col sm="12" md="6" lg="6">
                    <FloatingLabel controlId="Cantidaddeestudiante"  label="Cantidad de estudiante" >
                      <Form.Control 
                        type="text"
                        placeholder="Ingrese la cantidad de estudiante"
                        name="cant_estudiante"
                        value={formData.cant_estudiante}
                        onChange={handleFormChange} 
                      />
                    </FloatingLabel>
                  </Col>

                

                  <Col sm="12" md="6" lg="6">
                                    <FloatingLabel controlId="plan de estudio" label="Plan de Estudio">
                                        <Form.Control
                                            type="text"
                                            placeholder="Ingrese el plan de estudio"
                                            name="plan_estudio"
                                            value={formData.plan_estudio}
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

export default GradoList;
