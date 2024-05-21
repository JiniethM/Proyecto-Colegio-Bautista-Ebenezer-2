import React, { useState, useEffect } from "react";
import {
  Form,
  Row,
  Col,
  Container,
  FloatingLabel,
  Card,
  Button,
} from "react-bootstrap";
import Header from "../components/Header";
import "../styles/App.css";

function Docente() {
  // Crear un estado para cada campo del formulario

  const [Nombres, setNombres] = useState("");
  const [Apellidos, setApellidos] = useState("");
  const [Fecha_Nacimiento, setFecha_Nacimiento] = useState("");
  const [Direccion, setDireccion] = useState("");
  const [Genero, setGenero] = useState("");
  const [Telefono, setTelefono] = useState("");
  const [Correo, setCorreo] = useState("");

  const [especialidades, setEspecialidades] = useState([]); // Estado para almacenar las especialidades
  const [Especialidad, setEspecialidad] = useState(""); // Estado para el valor seleccionado

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear un objeto con los datos del formulario
    const formData = {
      Nombres,
      Apellidos,
      Fecha_Nacimiento,
      Direccion,
      Genero,
      Telefono,
      Correo,
      Especialidad,
    };

    try {
      // Realizar una solicitud HTTP al backend para enviar los datos
      const response = await fetch("http://localhost:5000/crud/createDocente", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // El registro se creó exitosamente
        alert("Registro exitoso");
        // Reiniciar los campos del formulario

        setNombres("");
        setApellidos("");
        setFecha_Nacimiento("");
        setGenero("");
        setDireccion("");
        setTelefono("");
        setCorreo("");
        setEspecialidad("");
      } else {
        alert("Error al registrar el Docente");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert("Error en la solicitud al servidor");
    }
  };

  useEffect(() => {
    // Realiza una solicitud a tu ruta para obtener las especialidades
    fetch("http://localhost:5000/crud/readEspecialidades")
      .then((response) => response.json())
      .then((data) => {
        // Actualiza el estado con las especialidades obtenidas
        setEspecialidades(data);
      })
      .catch((error) => {
        console.error("Error al obtener las especialidades", error);
      });
  }, []);

  return (
    <div>
      <Header />

      <Container>
        <Card className="mt-3">
          <Card.Body>
            <Card.Title>Registro de Docente</Card.Title>
            <Form className="mt-3" onSubmit={handleSubmit}>
              <Row className="g-3">
                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="Nombres" label="Nombre">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el nombre"
                      value={Nombres}
                      onChange={(e) =>
                        setNombres(e.target.value.replace(/\d/g, "").slice(0, 50))
                      }
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="6" md="6" lg="6">
                  <FloatingLabel controlId="Apellidos" label="Apellido">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el apellido"
                      value={Apellidos}
                      onChange={(e) =>
                        setApellidos(e.target.value.replace(/\d/g, "").slice(0, 50))
                      }
                    />
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
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="6">
                  <FloatingLabel controlId="genero" label="Género">
                    <Form.Select
                      aria-label="Género"
                      value={Genero}
                      onChange={(e) => setGenero(e.target.value)}
                    >
                      <option>Seleccione el género</option>
                      <option value="F">F</option>
                      <option value="M">M</option>
                    </Form.Select>
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="6">
                  <FloatingLabel controlId="Direccion" label="Dirección">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese la Dirección"
                      value={Direccion}
                      onChange={(e) => setDireccion(e.target.value)}
                    />
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
                            .replace(/\D/g, "")
                            .slice(0, 8)
                            .replace(/(\d{4})(\d{4})/, "$1-$2")
                        )
                      }
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="6">
                  <FloatingLabel controlId="Correo" label="Correo">
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el Correo"
                      value={Correo}
                      onChange={(e) => setCorreo(e.target.value)}
                      onBlur={(e) => {
                        if (!e.target.value.includes("@")) {
                          alert("Falta el símbolo '@' en el correo");
                        }
                      }}
                    />
                  </FloatingLabel>
                </Col>

                <Col sm="12" md="6" lg="6">
                <FloatingLabel controlId="Especialidad" label="Especialidad">
                    <Form.Select
                      aria-label="Especialidad"
                      value={Especialidad}
                      onChange={(e) => setEspecialidad(e.target.value)}
                    >
                      <option>Seleccione la especialidad</option>
                      <option value="English">English</option>
                      <option value="Español">Español</option>
                      <option value="Matemáticas">Matemáticas</option>
                      <option value="Taller de Arte y cultura">
                        Taller de Arte y cultura
                      </option>
                      <option value="Ciencias Naturales">
                        Ciencias Naturales
                      </option>
                      <option value="Educación Física">Educación Física</option>
                      <option value="Historia">Historia</option>

                      {especialidades.map((especialidad) => (
                        <option
                          key={especialidad.Id_Especialidad}
                          value={especialidad.Nombre_Especialidad}
                        >
                          {especialidad.Nombre_Especialidad}
                        </option>
                      ))}
                    </Form.Select>
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
    </div>
  );
}

export default Docente;
