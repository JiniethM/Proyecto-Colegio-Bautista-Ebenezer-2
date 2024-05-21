import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Row, Col, Form, Modal, FloatingLabel } from 'react-bootstrap';
import { FaTrashCan, FaPencil, FaPlus } from 'react-icons/fa6';
import Header from '../components/Header';

const AlumnoList = ({ handleAlumnoSelect }) => {
  const [alumnos, setAlumno] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedAlumno, setselectedAlumno] = useState({});
  const [formData, setFormData] = useState({
    Alumno_Nombres: "",
    Alumno_Apellidos: "",
    Alumno_Fecha_Nacimiento: "",
    Alumno_Direccion: "",
    Alumno_Telefono: "",
    Tutor_Nombres: ""
  });
  const [errors, setErrors] = useState({
    Alumno_Nombres: "",
    Alumno_Apellidos: "",
    Alumno_Fecha_Nacimiento: "",
    Alumno_Direccion: "",
    Alumno_Telefono: "",
  });

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredAlumnos = alumnos.filter((alumno) => {
    if (alumno && typeof alumno === 'object') {
      const alumno_Nombres = alumno.Alumno_Nombres ? alumno.Alumno_Nombres.toLowerCase() : '';
      const alumno_Apellidos = alumno.Alumno_Apellidos ? alumno.Alumno_Apellidos.toLowerCase() : '';
      const alumno_Fecha_Nacimiento = alumno.Alumno_Fecha_Nacimiento ? alumno.Alumno_Fecha_Nacimiento.toLowerCase() : '';
      const alumno_Direccion = alumno.Alumno_Direccion ? alumno.Alumno_Direccion.toLowerCase() : '';
      const tutor_Nombres = alumno.Tutor_Nombres ? alumno.Tutor_Nombres.toLowerCase() : '';

      const search = searchQuery.toLowerCase();

      return (
        alumno_Nombres.includes(search) ||
        alumno_Apellidos.includes(search) ||
        alumno_Fecha_Nacimiento.includes(search) ||
        alumno_Direccion.includes(search) ||
        tutor_Nombres.includes(search)
      );
    } else {
      return false;
    }
  });

  const openModal = (alumno) => {
    setselectedAlumno(alumno);

    // Formatea la fecha para el campo "Fecha_Nacimiento"
    const formattedFechaNacimiento = formatDateForInput(alumno.Alumno_Fecha_Nacimiento);

    setFormData({
      Alumno_Nombres: alumno.Alumno_Nombres,
      Alumno_Apellidos: alumno.Alumno_Apellidos,
      Alumno_Fecha_Nacimiento: formattedFechaNacimiento,
      Alumno_Direccion: alumno.Alumno_Direccion,
      Alumno_Telefono: alumno.Alumno_Telefono,
      Tutor_Nombres: alumno.Tutor_Nombres,
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

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const loadAlumno = () => {
    fetch('http://localhost:5000/crud/readAlumno')
      .then((response) => response.json())
      .then((data) => setAlumno(data))
      .catch((error) => console.error('Error al obtener los Alumno y personas:', error));
  };

  const handleUpdate = () => {
    // Validar campos antes de la actualización
    let isValid = true;
    const newErrors = { ...errors };

    // Validación de nombre y apellido: solo letras
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(formData.Alumno_Nombres)) {
      newErrors.Alumno_Nombres = "Ingrese solo letras";
      isValid = false;
    } else {
      newErrors.Alumno_Nombres = "";
    }

    if (!nameRegex.test(formData.Alumno_Apellidos)) {
      newErrors.Alumno_Apellidos = "Ingrese solo letras";
      isValid = false;
    } else {
      newErrors.Alumno_Apellidos = "";
    }

    // Validación de teléfono: formato específico
    const phoneRegex = /^\d{4}-\d{4}$/;
    if (!phoneRegex.test(formData.Alumno_Telefono)) {
      newErrors.Alumno_Telefono = "Ingrese un teléfono válido (####-####)";
      isValid = false;
    } else {
      newErrors.Alumno_Telefono = "";
    }

    // Asignar nuevos errores y actualizar el estado
    setErrors(newErrors);

    if (isValid) {
      const formattedFechaNacimiento = formatDateForInput(formData.Alumno_Fecha_Nacimiento);

      const updatedAlumno = {
        nombres: formData.Alumno_Nombres,
        apellidos: formData.Alumno_Apellidos,
        fecha_nacimiento: formattedFechaNacimiento,
        direccion: formData.Alumno_Direccion,
        telefono: formData.Alumno_Telefono,
      };

      console.log('Datos a actualizar:', updatedAlumno);

      fetch(`http://localhost:5000/crud/updateAlumno/${selectedAlumno.ID_Persona}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedAlumno),
      })
        .then((response) => {
          if (response.ok) {
            setShowModal(false);
            loadAlumno();
          }
        })
        .catch((error) => console.error('Error al actualizar el registro:', error));
    }
  };

  // Función para eliminar un alumno
  const handleDelete = (ID_Persona) => {
    const confirmation = window.confirm('¿Seguro que deseas eliminar este alumno?');
    if (confirmation) {
      // Realiza la solicitud DELETE al servidor para eliminar el alumno
      fetch(`http://localhost:5000/crud/deleteAlumnoPersona/${ID_Persona}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            // La eliminación fue exitosa, refresca la lista de alumnos
            loadAlumno();
          }
        })
        .catch((error) => console.error('Error al eliminar el alumno:', error));
    }
  };

  const handleSelectCliente = (idCliente, nombre, apellido) => {
    handleAlumnoSelect({
      ID_Alumno: idCliente,
      Nombres: nombre,
      Apellidos: apellido,
    });
  };

  useEffect(() => {
    loadAlumno();
  }, []);

  return (
    <div>
      <Header />
      <Card className="m-3" responsive>
        <Card.Body>
          <Card.Title className="mb-3" responsive>Listado de Alumnos</Card.Title>
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
                <th>ID2</th>
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>Fecha de Nacimiento</th>
                <th>Dirección</th>
                <th>Teléfono</th>
                <th>Tutor</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredAlumnos.map((alumno) => (
                <tr key={alumno.ID_Alumno}>
                  <td>{alumno.ID_Alumno}</td>
                  <td>{alumno.ID_Persona}</td>
                  <td>{alumno.Alumno_Nombres}</td>
                  <td>{alumno.Alumno_Apellidos}</td>
                  <td>{formatDateForInput(alumno.Alumno_Fecha_Nacimiento)}</td>
                  <td>{alumno.Alumno_Direccion}</td>
                  <td>{alumno.Alumno_Telefono}</td>
                  <td>{alumno.Tutor_Nombres}</td>
                  <td>
                    <div className="botoncitos-container" style={{ borderColor: 'blue', display: 'flex' }}>
                      <Button variant="success" onClick={() => openModal(alumno)} className='Botoncitos'>
                        <FaPencil style={{ color: 'white' }} />
                      </Button>
                      <div style={{ marginLeft: '5px' }}></div>
                      <Button variant="danger" onClick={() => handleDelete(alumno.ID_Persona)} className='Botoncitos' style={{ backgroundColor: '#DC3545', borderColor: '#DC3545' }}>
                        <FaTrashCan style={{ color: 'white' }} />
                      </Button>
                      <div style={{ marginLeft: '5px' }}></div>
                      <Button
                        variant="primary"
                        onClick={() => handleSelectCliente(alumno.ID_Alumno, alumno.Alumno_Nombres, alumno.Alumno_Apellidos)}
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
          <Modal.Title>Actualizar Alumno</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="mt-3">
            <Card.Body>
              <Card.Title>Registro de alumno</Card.Title>
              <Form className="mt-3">
                <Row className="g-3">
                  <Col sm="6" md="6" lg="4">
                    <FloatingLabel controlId="nombre" label="Nombres">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese el nombre"
                        name="Alumno_Nombres"
                        value={formData.Alumno_Nombres}
                        onChange={handleFormChange}
                        isInvalid={!!errors.Alumno_Nombres}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.Alumno_Nombres}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Col>
                  <Col sm="6" md="6" lg="4">
                    <FloatingLabel controlId="apellido" label="Apellidos">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese el apellido"
                        name="Alumno_Apellidos"
                        value={formData.Alumno_Apellidos}
                        onChange={handleFormChange}
                        isInvalid={!!errors.Alumno_Apellidos}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.Alumno_Apellidos}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Col>
                  <Col sm="6" md="6" lg="4">
                    <FloatingLabel controlId="fechanacimiento" label="Fecha de Nacimiento">
                      <Form.Control
                        type="date"
                        placeholder="Ingrese la fecha de nacimiento"
                        name="Alumno_Fecha_Nacimiento"
                        value={formData.Alumno_Fecha_Nacimiento}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>
                  <Col sm="6" md="6" lg="4">
                    <FloatingLabel controlId="direccion" label="Dirección">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese la dirección"
                        name="Alumno_Direccion"
                        value={formData.Alumno_Direccion}
                        onChange={handleFormChange}
                      />
                    </FloatingLabel>
                  </Col>
                  <Col sm="6" md="6" lg="4">
                    <FloatingLabel controlId="telefono" label="Teléfono">
                      <Form.Control
                        type="text"
                        placeholder="Ingrese el teléfono (####-####)"
                        name="Alumno_Telefono"
                        value={formData.Alumno_Telefono}
                        onChange={(e) => {
                          const phone = e.target.value.replace(/\D/g, '');
                          const formattedPhone = phone.replace(/(\d{4})(\d{4})/, '$1-$2');
                          setFormData({ ...formData, Alumno_Telefono: formattedPhone });
                        }}
                        isInvalid={!!errors.Alumno_Telefono}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.Alumno_Telefono}
                      </Form.Control.Feedback>
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

export default AlumnoList;
