import React, { useState } from "react";
import {
  Form,
  Row,
  Col,
  Container,
  FloatingLabel,
  Card,
  Button,
  Modal,
} from "react-bootstrap";
import { FaPlus } from "react-icons/fa"; // Import the icon
import Header from "../components/Header";
import "../styles/App.css";
import TutorList from "./TutorList";

function Alumno() {
  const [Nombres, setNombres] = useState("");
  const [Apellidos, setApellidos] = useState("");
  const [Fecha_Nacimiento, setFecha_Nacimiento] = useState("");
  const [Direccion, setDireccion] = useState("");
  const [Genero, setGenero] = useState("");
  const [Telefono, setTelefono] = useState("");
  const [ID_Tutor, setID_Tutor] = useState("");
  const [TutorNombre, setTutorNombre] = useState("");

  const [errors, setErrors] = useState({});

  const displayError = (field, message) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: message,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!Nombres) {
      displayError("Nombres", "El campo Nombre es obligatorio");
      return;
    } else if (Nombres.length > 50) {
      displayError("Nombres", "El nombre debe tener como máximo 50 caracteres");
      return;
    } else if (!/^[a-zA-Z\s]+$/.test(Nombres)) {
      displayError(
        "Nombres",
        "El nombre solo debe contener caracteres alfabéticos y espacios"
      );
      return;
    }

    if (!Apellidos) {
      displayError("Apellidos", "El campo Apellido es obligatorio");
      return;
    } else if (Apellidos.length > 50) {
      displayError(
        "Apellidos",
        "El apellido debe tener como máximo 50 caracteres"
      );
      return;
    } else if (!/^[a-zA-Z\s]+$/.test(Apellidos)) {
      displayError(
        "Apellidos",
        "El apellido solo debe contener caracteres alfabéticos y espacios"
      );
      return;
    }

    if (!Fecha_Nacimiento) {
      displayError(
        "Fecha_Nacimiento",
        "El campo Fecha de Nacimiento es obligatorio"
      );
      return;
    }

    if (!Direccion) {
      displayError("Direccion", "El campo Dirección es obligatorio");
      return;
    }

    if (!Genero) {
      displayError("Genero", "Debe seleccionar el Género");
      return;
    }

    if (!Telefono) {
      displayError("Telefono", "El campo Teléfono es obligatorio");
      return;
    } else if (!/^\d{4}-\d{4}$/.test(Telefono)) {
      displayError(
        "Telefono",
        "El formato de teléfono es inválido, debe ser ####-####"
      );
      return;
    }

    if (!ID_Tutor) {
      displayError("ID_Tutor", "Debe seleccionar un Tutor");
      return;
    }

    const formData = {
      Nombres,
      Apellidos,
      Fecha_Nacimiento,
      Direccion,
      Genero,
      Telefono,
      ID_Tutor,
    };

    console.log("Datos a enviar:", formData);

    try {
      const response = await fetch("http://localhost:5000/crud/createAlumno", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Registro exitoso");
        setNombres("");
        setApellidos("");
        setFecha_Nacimiento("");
        setGenero("");
        setDireccion("");
        setTelefono("");
        setID_Tutor("");
        setTutorNombre("");
      } else {
        alert("Error al registrar el Alumno");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert("Error en la solicitud al servidor");
    }
  };

  const handleTutorSelect = (idTutor, nombre) => {
    setID_Tutor(idTutor);
    setTutorNombre(nombre);
    setShowTutorListModal(false);
  };

  const [showTutorListModal, setShowTutorListModal] = useState(false);

  return (
    <div>
      <Header />
      <Container>
        <Card className="mt-3">
          <Card.Body>
            <Card.Title>Registro de Alumno</Card.Title>
            <Form className="mt-3" onSubmit={handleSubmit}>
              <Row className="g-3">
                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="Nombres" label="Nombre">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el nombre"
                      value={Nombres}
                      onChange={(e) =>
                        setNombres(
                          e.target.value
                            .replace(/[^a-zA-Z\s]/g, "")
                            .substring(0, 50)
                        )
                      }
                      isInvalid={!!errors.Nombres}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.Nombres}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Col>

                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="Apellidos" label="Apellido">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el apellido"
                      value={Apellidos}
                      onChange={(e) =>
                        setApellidos(
                          e.target.value
                            .replace(/[^a-zA-Z\s]/g, "")
                            .substring(0, 50)
                        )
                      }
                      isInvalid={!!errors.Apellidos}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.Apellidos}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="6">
                  <FloatingLabel
                    controlId="Fecha_Nacimiento"
                    label="Fecha de Nacimiento"
                  >
                    <Form.Control
                      type="date"
                      placeholder="Ingrese la Fecha de Nacimiento"
                      value={Fecha_Nacimiento}
                      onChange={(e) => setFecha_Nacimiento(e.target.value)}
                      isInvalid={!!errors.Fecha_Nacimiento}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.Fecha_Nacimiento}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="6">
                  <FloatingLabel controlId="Genero" label="Género">
                    <Form.Select
                      aria-label="Género"
                      value={Genero}
                      onChange={(e) => setGenero(e.target.value)}
                      isInvalid={!!errors.Genero}
                    >
                      <option>Seleccione el género</option>
                      <option value="F">Femenino</option>
                      <option value="M">Masculino</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.Genero}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="6">
                  <FloatingLabel controlId="Direccion" label="Dirección">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese la Dirección"
                      value={Direccion}
                      onChange={(e) => setDireccion(e.target.value)}
                      isInvalid={!!errors.Direccion}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.Direccion}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="6">
                  <FloatingLabel controlId="Telefono" label="Teléfono">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el Teléfono"
                      value={Telefono}
                      onChange={(e) =>
                        setTelefono(
                          e.target.value
                            .replace(/[^\d-]/g, "")
                            .replace(/(\d{4})-?(\d{0,4})/, "$1-$2")
                            .substring(0, 9)
                        )
                      }
                      isInvalid={!!errors.Telefono}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.Telefono}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Col>

                <Col sm="6" md="6" lg="6" style={{ position: "relative" }}>
                  <FloatingLabel controlId="Idtutor" label="Tutor">
                    <Form.Control
                      type="text"
                      value={TutorNombre ? `${ID_Tutor} - ${TutorNombre}` : ""}
                      disabled
                      isInvalid={!!errors.ID_Tutor}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.ID_Tutor}
                    </Form.Control.Feedback>
                    <Button
                      variant="primary"
                      onClick={() => setShowTutorListModal(true)}
                      style={{
                        position: "absolute",
                        top: "50%",
                        transform: "translateY(-50%)",
                        right: "10px",
                      }}
                    >
                      <FaPlus />
                    </Button>
                  </FloatingLabel>
                </Col>
              </Row>
              <div className="center-button">
                <Button
                  variant="primary"
                  type="submit"
                  className="mt-3 custom-button"
                  size="lg"
                >
                  Registrar
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>

      <Modal
        show={showTutorListModal}
        onHide={() => setShowTutorListModal(false)}
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title>Seleccionar Tutor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TutorList handleTutorSelect={handleTutorSelect} />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Alumno;
