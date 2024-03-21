import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Row, Col, Form, Modal, FloatingLabel } from 'react-bootstrap';
import Header from '../components/Header';
import { FaTrashCan } from 'react-icons/fa6';

function PagoColegiaturaList() {
  const [pagocolegiatura, setpagocolegiatura] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPagoColegiatura, setselectedPagoColegiatura] = useState({});
  const [formData, setFormData] = useState({
    Monto: '',
    Fecha_Pago: '',
  });

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Función para formatear la fecha
  function formatDateForInput(dateTimeString) {
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Agregar ceros iniciales
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const filteredPagoColegiatura = pagocolegiatura.filter((pagocolegiatura) => {
    const Fecha_Pago = pagocolegiatura.Fecha_Pago ? pagocolegiatura.Fecha_Pago : '';
    const search = searchQuery.toLowerCase();
    return Fecha_Pago.toString().includes(search);
  });

  const openModal = (pagocolegiatura) => {
    setselectedPagoColegiatura(pagocolegiatura);

    setFormData({
      Monto: pagocolegiatura.Monto,
      Fecha_Pago: pagocolegiatura.Fecha_Pago,
      ID_Alumno: pagocolegiatura.ID_Alumno,
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

  const loadPagoCol = () => {
    fetch('http://localhost:5000/crud/readPagoColegiatura')
      .then((response) => response.json())
      .then((data) => setpagocolegiatura(data))
      .catch((error) => console.error('Error al obtener el Tutor :', error));
  };

  const handleDelete = (id_pago) => {
    const confirmation = window.confirm('¿Seguro que deseas eliminar este el pago de colegiatura?');
    if (confirmation) {
      console.log('Enviando solicitud DELETE con id_pagoColegiatura:', id_pago);
      fetch(`http://localhost:5000/crud/deletePagoColegiatura/${id_pago}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            console.log('Eliminación exitosa. Refrescando la lista de pago colegiatura.');
            loadPagoCol();
          } else {
            console.log('Error al eliminar el pago colegiatura:', response.status);
          }
        })
        .catch((error) => console.error('Error al eliminar el pago de colegiatura:', error));
    }
  };

  useEffect(() => {
    fetch('http://localhost:5000/crud/readPagoColegiatura')
      .then((response) => response.json())
      .then((data) => setpagocolegiatura(data))
      .catch((error) => console.error('Error al obtener los tutor y personas:', error));
  }, []);

  return (
    <div>
      <Header />

      <Card className="m-3">
        <Card.Body>
          <Card.Title className="mb-3">Listado de Pago de colegiatura</Card.Title>

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
                <th>Monto</th>
                <th>Fecha_Pago</th>
                <th>Alumno</th>
              </tr>
            </thead>
            <tbody>
              {filteredPagoColegiatura.map((pagocolegiatura) => (
                <tr key={pagocolegiatura.ID_Pago}>
                  <td>{pagocolegiatura.ID_Pago}</td>
                  <td>{pagocolegiatura.Monto}</td>
                  <td>{formatDateForInput(pagocolegiatura.Fecha_Pago)}</td>
                  <td>{pagocolegiatura.NombreAlumno}</td>
                  <td>
                    <Button variant="danger" onClick={() => handleDelete(pagocolegiatura.ID_Pago)}>
                      <FaTrashCan />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
}

export default PagoColegiaturaList;