import React, { useState, useEffect } from 'react';
import { Table, Button,  Card, Row, Col, Form, Modal, FloatingLabel  } from 'react-bootstrap';
import Header from '../components/Header';
import { FaTrashCan, FaPencil,  FaPlus } from 'react-icons/fa6';

function DocenteList({ handleDocenteSelect }) {
  const [docentes, setDocentes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDocente, setSelectedDocente] = useState({});
  const [formData, setFormData] = useState({
    Nombres: '',
    Apellidos: '',
    Fecha_Nacimiento: '',
    Direccion: '',
    Genero: '',
    Telefono: '',
    Correo: '',
    Especialidad: '',
  });

  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredDocentes = docentes.filter((docente) => {
    // Convierte los valores de los campos a minúsculas para realizar una búsqueda insensible a mayúsculas y minúsculas
    const nombres = docente.Nombres.toLowerCase();
    const apellidos = docente.Apellidos.toLowerCase();
    const fechaNacimiento = formatDateForInput(docente.Fecha_Nacimiento).toLowerCase();
    const direccion = docente.Direccion.toLowerCase();
    const genero = docente.Genero.toLowerCase();
    const telefono = docente.Telefono.toLowerCase();
    const correo = docente.Correo.toLowerCase();
    const especialidad = docente.Especialidad.toLowerCase();
    const search = searchQuery.toLowerCase();
  
    // Verifica si la cadena de búsqueda se encuentra en algún campo
    return (
      nombres.includes(search) ||
      apellidos.includes(search) ||
      fechaNacimiento.includes(search) ||
      direccion.includes(search) ||
      genero.includes(search) ||
      telefono.includes(search) ||
      correo.includes(search) ||
      especialidad.includes(search)
    );
  });

  // Función para abrir el modal y pasar los datos del docente seleccionado
  const openModal = (docente) => {
    setSelectedDocente(docente);

    // Formatea la fecha para el campo "Fecha_Nacimiento"
    const formattedFechaNacimiento = formatDateForInput(docente.Fecha_Nacimiento);

    setFormData({
      Nombres: docente.Nombres,
      Apellidos: docente.Apellidos,
      Fecha_Nacimiento: formattedFechaNacimiento,
      Direccion: docente.Direccion,
      Genero: docente.Genero,
      Telefono: docente.Telefono,
      Correo: docente.Correo,
      Especialidad: docente.Especialidad,
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

  const loadDocentes = () => {
    fetch('http://localhost:5000/crud/readDocentePersona')
      .then((response) => response.json())
      .then((data) => setDocentes(data))
      .catch((error) => console.error('Error al obtener los docentes y personas:', error));
  };

  // Función para enviar el formulario de actualización
  const handleUpdate = () => {
    // Realiza la solicitud PUT al servidor para actualizar el registro
    fetch(`http://localhost:5000/crud/updateDocente/${selectedDocente.ID_Persona}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          // La actualización fue exitosa, puedes cerrar el modal y refrescar la lista de docentes
          setShowModal(false);
          loadDocentes(); // Cargar la lista de docentes actualizada
        }
      })
      .catch((error) => console.error('Error al actualizar el registro:', error));
  };

  // Función para eliminar un docente
  const handleDelete = (idPersona) => {
    const confirmation = window.confirm('¿Seguro que deseas eliminar este docente?');
    if (confirmation) {
      // Realiza la solicitud DELETE al servidor para eliminar el docente
      fetch(`http://localhost:5000/crud/deleteDocentePersona/${idPersona}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            // La eliminación fue exitosa, refresca la lista de docentes
            loadDocentes();
          }
        })
        .catch((error) => console.error('Error al eliminar el docente:', error));
    }
  };

  // Realiza una solicitud GET al servidor para obtener los docentes
  useEffect(() => {
    fetch('http://localhost:5000/crud/readDocentePersona')
      .then((response) => response.json())
      .then((data) => setDocentes(data))
      .catch((error) => console.error('Error al obtener los docentes y personas:', error));
  }, []);

  // Nueva función para seleccionar un docente
  const handleSelectDocente = (idDocente, nombres, apellidos) => {
    handleDocenteSelect({
      ID_Docente: idDocente,
      Nombres: nombres,
      Apellidos: apellidos,
    });
  };

  return (
    <div>
      <Header />

      <Card className="m-3" responsive>
        <Card.Body>
          <Card.Title className="mb-3" responsive>Listado de Docente</Card.Title>

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
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>Fecha de Nacimiento</th>
                <th>Dirección</th>
                <th>Género</th>
                <th>Teléfono</th>
                <th>Correo</th>
                <th>Especialidad</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocentes.map((docente) => (
                <tr key={docente.ID_Docente}>
                  <td>{docente.ID_Docente}</td>
                  <td>{docente.Nombres}</td>
                  <td>{docente.Apellidos}</td>
                  <td>{formatDateForInput(docente.Fecha_Nacimiento)}</td>
                  <td>{docente.Direccion}</td>
                  <td>{docente.Genero}</td>
                  <td>{docente.Telefono}</td>
                  <td>{docente.Correo}</td>
                  <td>{docente.Especialidad}</td>
                  <td>
                    <div className="botoncitos-container" style={{ borderColor: 'blue', display: 'flex' }}>
                      <Button variant="success" onClick={() => openModal(docente)} className='Botoncitos'>
                        <FaPencil />
                      </Button>
                      <div style={{ marginLeft: '5px' }}></div>
                      <Button variant="danger" onClick={() => handleDelete(docente.ID_Persona)} className='Botoncitos'>
                        <FaTrashCan />
                      </Button>
                      <div style={{ marginLeft: '5px' }}></div>
                      <Button
                        variant="primary"
                        onClick={() => handleSelectDocente(docente.ID_Docente, docente.Nombres, docente.Apellidos)}
                        className='Botoncitos'
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
          <Modal.Title>Actualizar Docente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="mt-3">
            <Card.Body>
              <Card.Title>Registro de Docente</Card.Title>
              <Form className="mt-3">
                <Row className="g-3">
                  <Col sm="6" md="6" lg="4">
                    <FloatingLabel controlId="nombres" label="Nombres">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese los nombres"
                        name="Nombres"
                        value={formData.Nombres}
                        onChange={(e) => setFormData({ ...formData, Nombres: e.target.value.replace(/\d/g, "").slice(0, 50) })}
                      />
                    </FloatingLabel>
                  </Col>
                  <Col sm="6" md="6" lg="4">
                    <FloatingLabel controlId="apellidos" label="Apellidos">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese los apellidos"
                        name="Apellidos"
                        value={formData.Apellidos}
                        onChange={(e) => setFormData({ ...formData, Apellidos: e.target.value.replace(/\d/g, "").slice(0, 50) })}
                      />
                    </FloatingLabel>
                  </Col>
                  <Col sm="12" md="6" lg="4">
                    <FloatingLabel controlId="fechaNacimiendo" label="Fecha de nacimiento">
                      <Form.Control 
                        type="date" 
                        placeholder="Seleccione la fecha de nacimiento"
                        name="Fecha_Nacimiento"
                        value={formData.Fecha_Nacimiento}
                        onChange={handleFormChange} 
                      />
                    </FloatingLabel>
                  </Col>
                  <Col sm="12" md="6" lg="4">
                    <FloatingLabel controlId="genero" label="Genero">
                      <Form.Select 
                        aria-label="Genero"
                        name="Genero"
                        value={formData.Genero}
                        onChange={handleFormChange}
                      >
                        <option>Seleccione el género</option>
                        <option value="F">F</option>
                        <option value="M">M</option>
                      </Form.Select>
                    </FloatingLabel>
                  </Col>
                  <Col sm="12" md="6" lg="8">
                    <FloatingLabel controlId="direccion" label="Dirección">
                      <Form.Control 
                        type="text" 
                        placeholder="Ingrese la dirección"
                        name="Direccion"
                        value={formData.Direccion}
                        onChange={handleFormChange} 
                      />
                    </FloatingLabel>
                  </Col>
                  <Col sm="12" md="6" lg="4">
                    <FloatingLabel controlId="telefono" label="Teléfono">
                      <Form.Control 
                        type="text" 
                        placeholder="Ingrese el teléfono"
                        name="Telefono"
                        value={formData.Telefono}
                        onChange={(e) => setFormData({ ...formData, Telefono: e.target.value.replace(/\D/g, "").slice(0, 8).replace(/(\d{4})(\d{4})/, "$1-$2") })}
                      />
                    </FloatingLabel>
                  </Col>
                  <Col sm="12" md="6" lg="4">
                    <FloatingLabel controlId="correo" label="Correo">
                      <Form.Control 
                        type="email" 
                        placeholder="Ingrese el correo"
                        name="Correo"
                        value={formData.Correo}
                        onChange={(e) => setFormData({ ...formData, Correo: e.target.value })}
                        onBlur={(e) => {
                          if (!e.target.value.includes("@")) {
                            alert("Falta el símbolo '@' en el correo");
                          }
                        }}
                      />
                    </FloatingLabel>
                  </Col>  
                  <Col sm="12" md="6" lg="4">
                    <FloatingLabel controlId="Especialidad" label="Especialidad">
                      <Form.Select 
                        aria-label="Especialidad"
                        value={formData.Especialidad}
                        onChange={handleFormChange}
                        name="Especialidad"
                      >
                        <option>Seleccione la especialidad</option>
                        <option value="Lengua y Literatura">Lengua y Literatura</option>
                        <option value="Matemática">Matemática</option>
                        <option value="Ciencias Naturales">Ciencias Naturales</option>
                        <option value="Estudios Sociales">Estudios Sociales</option>
                        <option value="Educación Física">Educación Física</option>
                        <option value="Artes">Artes</option>
                      </Form.Select>
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

export default DocenteList;
