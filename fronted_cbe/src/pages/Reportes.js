import React, { useEffect, useState, useRef } from "react";
import { Button, Row, Col, Card, Container, Form } from "react-bootstrap";
import jsPDF from "jspdf";
import Chart from "chart.js/auto";
import html2canvas from "html2canvas";
import Header from "../components/Header";
import portada from "../Imagenes/zyro-image (1).png";
import emailjs from "emailjs-com";
import * as XLSX from "xlsx";
import { FaChartBar, FaEnvelope, FaFileExcel, FaFileAlt } from "react-icons/fa";

const Estadisticas = ({ rol }) => {
  const [calificacionesPromedioAlumno, setCalificacionesPromedioAlumno] =
    useState([]);
  const [
    calificacionesPromedioAsignatura,
    setCalificacionesPromedioAsignatura,
  ] = useState([]);
  const [calificacionesPromedioGrado, setCalificacionesPromedioGrado] =
    useState([]);
  const [calificacionesPromedioDocente, setCalificacionesPromedioDocente] =
    useState([]);
  const [calificacionesPromedioFecha, setCalificacionesPromedioFecha] =
    useState([]);
  const [calificacionesTotalesAlumno, setCalificacionesTotalesAlumno] =
    useState([]);
  const [calificacionesTotalesAsignatura, setCalificacionesTotalesAsignatura] =
    useState([]);
  const [top5Alumnos, setTop5Alumnos] = useState([]);
  const [top5Asignaturas, setTop5Asignaturas] = useState([]);
  const [year, setYear] = useState(2023);
  const [month, setMonth] = useState(1);

  const chartRefs = {
    alumno: useRef(null),
    asignatura: useRef(null),
    grado: useRef(null),
    docente: useRef(null),
    fecha: useRef(null),
    totalesAlumno: useRef(null),
    totalesAsignatura: useRef(null),
    top5Alumnos: useRef(null),
    top5Asignaturas: useRef(null),
  };

  const fetchCalificacionesPromedioAlumno = () => {
    fetch("http://localhost:5000/crudDt/calificacionesPromedioAlumno")
      .then((response) => response.json())
      .then((data) => setCalificacionesPromedioAlumno(data))
      .catch((error) =>
        console.error(
          "Error al obtener calificaciones promedio por alumno:",
          error
        )
      );
  };

  const fetchCalificacionesPromedioAsignatura = () => {
    fetch("http://localhost:5000/crudDt/calificacionesPromedioAsignatura")
      .then((response) => response.json())
      .then((data) => setCalificacionesPromedioAsignatura(data))
      .catch((error) =>
        console.error(
          "Error al obtener calificaciones promedio por asignatura:",
          error
        )
      );
  };

  const fetchCalificacionesPromedioGrado = () => {
    fetch("http://localhost:5000/crudDt/calificacionesPromedioGrado")
      .then((response) => response.json())
      .then((data) => setCalificacionesPromedioGrado(data))
      .catch((error) =>
        console.error(
          "Error al obtener calificaciones promedio por grado:",
          error
        )
      );
  };

  const fetchCalificacionesPromedioDocente = () => {
    fetch("http://localhost:5000/crudDt/calificacionesPromedioDocente")
      .then((response) => response.json())
      .then((data) => setCalificacionesPromedioDocente(data))
      .catch((error) =>
        console.error(
          "Error al obtener calificaciones promedio por docente:",
          error
        )
      );
  };

  const fetchCalificacionesPromedioFecha = () => {
    fetch("http://localhost:5000/crudDt/calificacionesPromedioFecha")
      .then((response) => response.json())
      .then((data) => setCalificacionesPromedioFecha(data))
      .catch((error) =>
        console.error(
          "Error al obtener calificaciones promedio por fecha:",
          error
        )
      );
  };

  const fetchCalificacionesTotalesAlumno = (year) => {
    fetch(`http://localhost:5000/crudDt/calificacionesTotalesAlumno/${year}`)
      .then((response) => response.json())
      .then((data) => setCalificacionesTotalesAlumno(data))
      .catch((error) =>
        console.error(
          "Error al obtener calificaciones totales por alumno:",
          error
        )
      );
  };

  const fetchCalificacionesTotalesAsignatura = (year, month) => {
    fetch(
      `http://localhost:5000/crudDt/calificacionesTotalesAsignatura/${year}/${month}`
    )
      .then((response) => response.json())
      .then((data) => setCalificacionesTotalesAsignatura(data))
      .catch((error) =>
        console.error(
          "Error al obtener calificaciones totales por asignatura:",
          error
        )
      );
  };

  const fetchTop5Alumnos = () => {
    fetch("http://localhost:5000/crudDt/top5Alumnos")
      .then((response) => response.json())
      .then((data) => setTop5Alumnos(data))
      .catch((error) =>
        console.error("Error al obtener los top 5 alumnos:", error)
      );
  };

  const fetchTop5Asignaturas = () => {
    fetch("http://localhost:5000/crudDt/top5Asignaturas")
      .then((response) => response.json())
      .then((data) => setTop5Asignaturas(data))
      .catch((error) =>
        console.error("Error al obtener las top 5 asignaturas:", error)
      );
  };

  useEffect(() => {
    fetchCalificacionesPromedioAlumno();
    fetchCalificacionesPromedioAsignatura();
    fetchCalificacionesPromedioGrado();
    fetchCalificacionesPromedioDocente();
    fetchCalificacionesPromedioFecha();
    fetchCalificacionesTotalesAlumno(year);
    fetchCalificacionesTotalesAsignatura(year, month);
    fetchTop5Alumnos();
    fetchTop5Asignaturas();
  }, [year, month]);

  const generateRandomColors = (length) => {
    return Array.from(
      { length },
      () =>
        `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
          Math.random() * 256
        )}, ${Math.floor(Math.random() * 256)}, 0.2)`
    );
  };

  useEffect(() => {
    const createBarChart = (ref, labels, data) => {
      if (ref.current) {
        const ctxBar = ref.current.getContext("2d");
        const colors = generateRandomColors(data.length);
        const barChart = new Chart(ctxBar, {
          type: "bar",
          data: {
            labels: labels,
            datasets: [
              {
                label: "Promedio de Calificaciones",
                data: data.map((value) => parseFloat(value).toFixed(2)),
                backgroundColor: colors,
                borderColor: colors.map((color) => color.replace("0.2", "1")),
                borderWidth: 1,
                stack: "Stack 0",
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                callbacks: {
                  label: function (tooltipItem) {
                    return `${tooltipItem.label}: ${parseFloat(
                      tooltipItem.raw
                    ).toFixed(2)}`;
                  },
                },
              },
            },
            scales: {
              x: {
                stacked: true,
              },
              y: {
                stacked: true,
                beginAtZero: true,
              },
            },
          },
        });
        return barChart;
      }
    };

    const chartConfigs = [
      {
        ref: chartRefs.alumno,
        labels: calificacionesPromedioAlumno
          .slice(0, 5)
          .map((alumno) => `${alumno.Nombres} ${alumno.Apellidos}`),
        data: calificacionesPromedioAlumno
          .slice(0, 5)
          .map((alumno) => alumno.Promedio_Calificacion),
        createChart: createBarChart,
      },
      {
        ref: chartRefs.asignatura,
        labels: calificacionesPromedioAsignatura
          .slice(0, 5)
          .map((asignatura) => asignatura.Nombre_Asignatura),
        data: calificacionesPromedioAsignatura
          .slice(0, 5)
          .map((asignatura) => asignatura.Promedio_Calificacion),
        createChart: createBarChart,
      },
      {
        ref: chartRefs.grado,
        labels: calificacionesPromedioGrado
          .slice(0, 5)
          .map((grado) => grado.Plan_Estudio),
        data: calificacionesPromedioGrado
          .slice(0, 5)
          .map((grado) => grado.Promedio_Calificacion),
        createChart: createBarChart,
      },
      {
        ref: chartRefs.docente,
        labels: calificacionesPromedioDocente
          .slice(0, 5)
          .map((docente) => `${docente.Nombres} ${docente.Apellidos}`),
        data: calificacionesPromedioDocente
          .slice(0, 5)
          .map((docente) => docente.Promedio_Calificacion),
        createChart: createBarChart,
      },
      {
        ref: chartRefs.fecha,
        labels: calificacionesPromedioFecha
          .slice(0, 5)
          .map((fecha) => `${fecha.Dia}/${fecha.Mes}/${fecha.Año}`),
        data: calificacionesPromedioFecha
          .slice(0, 5)
          .map((fecha) => fecha.Promedio_Calificacion),
        createChart: createBarChart,
      },
      {
        ref: chartRefs.totalesAlumno,
        labels: calificacionesTotalesAlumno
          .slice(0, 5)
          .map((alumno) => `${alumno.Nombres} ${alumno.Apellidos}`),
        data: calificacionesTotalesAlumno
          .slice(0, 5)
          .map((alumno) => alumno.Total_Calificacion),
        createChart: createBarChart,
      },
      {
        ref: chartRefs.totalesAsignatura,
        labels: calificacionesTotalesAsignatura
          .slice(0, 5)
          .map((asignatura) => asignatura.Nombre_Asignatura),
        data: calificacionesTotalesAsignatura
          .slice(0, 5)
          .map((asignatura) => asignatura.Total_Calificacion),
        createChart: createBarChart,
      },
      {
        ref: chartRefs.top5Alumnos,
        labels: top5Alumnos.map(
          (alumno) => `${alumno.Nombres} ${alumno.Apellidos}`
        ),
        data: top5Alumnos.map((alumno) => alumno.Promedio_Calificacion),
        createChart: createBarChart,
      },
      {
        ref: chartRefs.top5Asignaturas,
        labels: top5Asignaturas.map(
          (asignatura) => asignatura.Nombre_Asignatura
        ),
        data: top5Asignaturas.map(
          (asignatura) => asignatura.Promedio_Calificacion
        ),
        createChart: createBarChart,
      },
    ];

    const chartInstances = chartConfigs.map((config) =>
      config.createChart(config.ref, config.labels, config.data)
    );
    return () => chartInstances.forEach((chart) => chart && chart.destroy());
  }, [
    calificacionesPromedioAlumno,
    calificacionesPromedioAsignatura,
    calificacionesPromedioGrado,
    calificacionesPromedioDocente,
    calificacionesPromedioFecha,
    calificacionesTotalesAlumno,
    calificacionesTotalesAsignatura,
    top5Alumnos,
    top5Asignaturas,
    chartRefs.alumno,
    chartRefs.asignatura,
    chartRefs.grado,
    chartRefs.docente,
    chartRefs.fecha,
    chartRefs.totalesAlumno,
    chartRefs.totalesAsignatura,
    chartRefs.top5Alumnos,
    chartRefs.top5Asignaturas,
  ]);

  const formatearCalificaciones = (calificaciones, tipo) => {
    return calificaciones
      .map((calificacion) => {
        let nombre = "";
        if (tipo === "alumno") {
          nombre = `${calificacion.Nombres || "Sin Nombre"} ${
            calificacion.Apellidos || "Sin Apellido"
          }`;
        } else if (tipo === "asignatura") {
          nombre = calificacion.Nombre_Asignatura || "Sin Nombre de Asignatura";
        } else if (tipo === "grado") {
          nombre = `Nombre de Grado: ${
            calificacion.Plan_Estudio || "Sin Nombre de Grado"
          }`;
        } else if (tipo === "fecha") {
          nombre =
            `Fecha: ${calificacion.Dia}/${calificacion.Mes}/${calificacion.Año}` ||
            "Sin Fecha";
        }

        const calificacionPromedio =
          calificacion.Promedio_Calificacion || calificacion.Total_Calificacion;

        return `${nombre}\nPromedio Calificación: ${parseFloat(
          calificacionPromedio
        ).toFixed(2)}`;
      })
      .join("\n\n");
  };

  const enviarCorreo = (calificaciones, titulo, tipo, fromName) => {
    const calificacionesFormateadas = formatearCalificaciones(
      calificaciones,
      tipo
    );

    const data = {
      to_name: "Diedrizon",
      user_email: "diedrinzonfargas@gmail.com",
      message: `${titulo}\n\n${calificacionesFormateadas}`,
      from_name: fromName,
      titulo: titulo,
      mensaje: calificacionesFormateadas,
    };

    emailjs
      .send("service_xzspcel", "template_lcsbfqx", data, "KEmZYqIQ5EQwin3nT")
      .then((response) => {
        alert("Correo enviado.");
        console.log("Correo enviado.", response);
      })
      .catch((error) => {
        alert("Error al enviar el correo.");
        console.error("Error al enviar el correo:", error);
      });
  };

  const generarReporte = async (chartRef, datos, titulo, fileName) => {
    if (chartRef.current) {
      const canvas = await html2canvas(chartRef.current, { scale: 3 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();

      const imgPortada = new Image();
      imgPortada.src = portada;
      imgPortada.onload = () => {
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        pdf.addImage(imgPortada, "PNG", 0, 0, pageWidth, pageHeight);
        pdf.setFontSize(30);
        pdf.setTextColor(23, 32, 42);
        pdf.text(titulo, pageWidth / 2, pageHeight / 2, { align: "center" });

        pdf.addPage();
        pdf.addImage(imgData, "PNG", 10, 20, 180, 150);
        pdf.setFontSize(12);
        pdf.setTextColor(0, 0, 0);

        let y = 180;
        datos.forEach((dato) => {
          const nombre =
            dato.Nombres ||
            dato.Nombre_Asignatura ||
            dato.Plan_Estudio ||
            `${dato.Dia}/${dato.Mes}/${dato.Año}`;
          const calificacion =
            dato.Promedio_Calificacion || dato.Total_Calificacion;
          pdf.text(`${nombre}: ${parseFloat(calificacion).toFixed(2)}`, 10, y);
          y += 10;
          if (y > 280) {
            pdf.addPage();
            y = 20;
          }
        });

        const finalPDF = pdf.output("blob");
        const compressedPDF = new Blob([finalPDF], { type: "application/pdf" });

        const link = document.createElement("a");
        link.href = URL.createObjectURL(compressedPDF);
        link.download = `${fileName}.pdf`;
        link.click();
      };
    }
  };

  const exportarAExcel = (datos, nombreArchivo) => {
    const worksheet = XLSX.utils.json_to_sheet(datos);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");
    XLSX.writeFile(workbook, `${nombreArchivo}.xlsx`);
  };

  const styleDivLine = {
    borderTop: "1px solid #ccc",
    margin: "10px 0",
  };

  const buttonContainerStyle = {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "10px",
  };

  const exportarATXT = (datos, nombreArchivo) => {
    const txtData = datos
      .map((row) =>
        Object.entries(row)
          .map(([key, value]) => `${key}: ${value}`)
          .join("\n")
      )
      .join("\n\n");

    const txtBlob = new Blob([txtData], { type: "text/plain" });
    const txtUrl = URL.createObjectURL(txtBlob);
    const link = document.createElement("a");
    link.href = txtUrl;
    link.download = `${nombreArchivo}.txt`;
    link.click();
  };

  return (
    <div>
      <Header rol={rol} />
      <Container className="mt-3">
        <Row>
          <Col xs={12} sm={12} md={12} lg={6} className="mb-4">
            <Card className="h-100 d-flex flex-column">
              <Card.Body className="d-flex flex-column justify-content-between">
                <div>
                  <Card.Title>Calificaciones Promedio por Alumno</Card.Title>
                  <canvas ref={chartRefs.alumno} height="150"></canvas>
                </div>
                <div>
                  <div style={styleDivLine}></div>
                  <div style={buttonContainerStyle}>
                    <Button
                      variant="primary"
                      onClick={() =>
                        generarReporte(
                          chartRefs.alumno,
                          calificacionesPromedioAlumno,
                          "Calificaciones Promedio por Alumno",
                          "reporte_calificaciones_alumno"
                        )
                      }
                    >
                      <FaChartBar style={{ color: "white" }} />
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() =>
                        enviarCorreo(
                          calificacionesPromedioAlumno,
                          "Calificaciones Promedio por Alumno",
                          "alumno",
                          "Reporte Calificaciones por Alumno"
                        )
                      }
                    >
                      <FaEnvelope style={{ color: "white" }} />
                    </Button>
                    <Button
                      variant="success"
                      onClick={() =>
                        exportarAExcel(
                          calificacionesPromedioAlumno,
                          "reporte_calificaciones_alumno"
                        )
                      }
                    >
                      <FaFileExcel style={{ color: "white" }} />
                    </Button>
                    <Button
                      variant="info"
                      onClick={() =>
                        exportarATXT(
                          calificacionesPromedioAlumno,
                          "reporte_calificaciones_alumno"
                        )
                      }
                    >
                      <FaFileAlt style={{ color: "white" }} />
                    </Button>

                    
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} sm={12} md={12} lg={6} className="mb-4">
            <Card className="h-100 d-flex flex-column">
              <Card.Body className="d-flex flex-column justify-content-between">
                <div>
                  <Card.Title>
                    Calificaciones Promedio por Asignatura
                  </Card.Title>
                  <canvas ref={chartRefs.asignatura} height="150"></canvas>
                </div>
                <div>
                  <div style={styleDivLine}></div>
                  <div style={buttonContainerStyle}>
                    <Button
                      variant="primary"
                      onClick={() =>
                        generarReporte(
                          chartRefs.asignatura,
                          calificacionesPromedioAsignatura,
                          "Calificaciones Promedio por Asignatura",
                          "reporte_calificaciones_asignatura"
                        )
                      }
                    >
                      <FaChartBar style={{ color: "white" }} />
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() =>
                        enviarCorreo(
                          calificacionesPromedioAsignatura,
                          "Calificaciones Promedio por Asignatura",
                          "asignatura",
                          "Reporte Calificaciones por Asignatura"
                        )
                      }
                    >
                      <FaEnvelope style={{ color: "white" }} />
                    </Button>
                    <Button
                      variant="success"
                      onClick={() =>
                        exportarAExcel(
                          calificacionesPromedioAsignatura,
                          "reporte_calificaciones_asignatura"
                        )
                      }
                    >
                      <FaFileExcel style={{ color: "white" }} />
                    </Button>
                    <Button
                      variant="info"
                      onClick={() =>
                        exportarATXT(
                          calificacionesPromedioAsignatura,
                          "reporte_calificaciones_asignatura"
                        )
                      }
                    >
                      <FaFileAlt style={{ color: "white" }} />
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} sm={12} md={12} lg={6} className="mb-4">
            <Card className="h-100 d-flex flex-column">
              <Card.Body className="d-flex flex-column justify-content-between">
                <div>
                  <Card.Title>Calificaciones Promedio por Grado</Card.Title>
                  <canvas ref={chartRefs.grado} height="150"></canvas>
                </div>
                <div>
                  <div style={styleDivLine}></div>
                  <div style={buttonContainerStyle}>
                    <Button
                      variant="primary"
                      onClick={() =>
                        generarReporte(
                          chartRefs.grado,
                          calificacionesPromedioGrado,
                          "Calificaciones Promedio por Grado",
                          "reporte_calificaciones_grado"
                        )
                      }
                    >
                      <FaChartBar style={{ color: "white" }} />
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() =>
                        enviarCorreo(
                          calificacionesPromedioGrado,
                          "Calificaciones Promedio por Grado",
                          "grado",
                          "Reporte Calificaciones por Grado"
                        )
                      }
                    >
                      <FaEnvelope style={{ color: "white" }} />
                    </Button>
                    <Button
                      variant="success"
                      onClick={() =>
                        exportarAExcel(
                          calificacionesPromedioGrado,
                          "reporte_calificaciones_grado"
                        )
                      }
                    >
                      <FaFileExcel style={{ color: "white" }} />
                    </Button>
                    <Button
                      variant="info"
                      onClick={() =>
                        exportarATXT(
                          calificacionesPromedioGrado,
                          "reporte_calificaciones_grado"
                        )
                      }
                    >
                      <FaFileAlt style={{ color: "white" }} />
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} sm={12} md={12} lg={6} className="mb-4">
            <Card className="h-100 d-flex flex-column">
              <Card.Body className="d-flex flex-column justify-content-between">
                <div>
                  <Card.Title>Calificaciones Promedio por Docente</Card.Title>
                  <canvas ref={chartRefs.docente} height="150"></canvas>
                </div>
                <div>
                  <div style={styleDivLine}></div>
                  <div style={buttonContainerStyle}>
                    <Button
                      variant="primary"
                      onClick={() =>
                        generarReporte(
                          chartRefs.docente,
                          calificacionesPromedioDocente,
                          "Calificaciones Promedio por Docente",
                          "reporte_calificaciones_docente"
                        )
                      }
                    >
                      <FaChartBar style={{ color: "white" }} />
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() =>
                        enviarCorreo(
                          calificacionesPromedioDocente,
                          "Calificaciones Promedio por Docente",
                          "docente",
                          "Reporte Calificaciones por Docente"
                        )
                      }
                    >
                      <FaEnvelope style={{ color: "white" }} />
                    </Button>
                    <Button
                      variant="success"
                      onClick={() =>
                        exportarAExcel(
                          calificacionesPromedioDocente,
                          "reporte_calificaciones_docente"
                        )
                      }
                    >
                      <FaFileExcel style={{ color: "white" }} />
                    </Button>
                    <Button
                      variant="info"
                      onClick={() =>
                        exportarATXT(
                          calificacionesPromedioDocente,
                          "reporte_calificaciones_docente"
                        )
                      }
                    >
                      <FaFileAlt style={{ color: "white" }} />
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} sm={12} md={12} lg={6} className="mb-4">
            <Card className="h-100 d-flex flex-column">
              <Card.Body className="d-flex flex-column justify-content-between">
                <div>
                  <Card.Title>Calificaciones Promedio por Fecha</Card.Title>
                  <canvas ref={chartRefs.fecha} height="150"></canvas>
                </div>
                <div>
                  <div style={styleDivLine}></div>
                  <div style={buttonContainerStyle}>
                    <Button
                      variant="primary"
                      onClick={() =>
                        generarReporte(
                          chartRefs.fecha,
                          calificacionesPromedioFecha,
                          "Calificaciones Promedio por Fecha",
                          "reporte_calificaciones_fecha"
                        )
                      }
                    >
                      <FaChartBar style={{ color: "white" }} />
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() =>
                        enviarCorreo(
                          calificacionesPromedioFecha,
                          "Calificaciones Promedio por Fecha",
                          "fecha",
                          "Reporte Calificaciones por Fecha"
                        )
                      }
                    >
                      <FaEnvelope style={{ color: "white" }} />
                    </Button>
                    <Button
                      variant="success"
                      onClick={() =>
                        exportarAExcel(
                          calificacionesPromedioFecha,
                          "reporte_calificaciones_fecha"
                        )
                      }
                    >
                      <FaFileExcel style={{ color: "white" }} />
                    </Button>
                    <Button
                      variant="info"
                      onClick={() =>
                        exportarATXT(
                          calificacionesPromedioFecha,
                          "reporte_calificaciones_fecha"
                        )
                      }
                    >
                      <FaFileAlt style={{ color: "white" }} />
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} sm={12} md={12} lg={6} className="mb-4">
            <Card className="h-100 d-flex flex-column">
              <Card.Body className="d-flex flex-column justify-content-between">
                <div>
                  <Card.Title>Calificaciones Totales por Alumno</Card.Title>
                  <Form.Group controlId="formYear">
                    <Form.Label>Año</Form.Label>
                    <Form.Control
                      type="number"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                    />
                  </Form.Group>
                  <canvas ref={chartRefs.totalesAlumno} height="150"></canvas>
                </div>
                <div>
                  <div style={styleDivLine}></div>
                  <div style={buttonContainerStyle}>
                    <Button
                      variant="primary"
                      onClick={() =>
                        generarReporte(
                          chartRefs.totalesAlumno,
                          calificacionesTotalesAlumno,
                          `Calificaciones Totales por Alumno en ${year}`,
                          `reporte_calificaciones_totales_alumno_${year}`
                        )
                      }
                    >
                      <FaChartBar style={{ color: "white" }} />
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() =>
                        enviarCorreo(
                          calificacionesTotalesAlumno,
                          `Calificaciones Totales por Alumno en ${year}`,
                          "alumno",
                          `Reporte Calificaciones por Alumno en ${year}`
                        )
                      }
                    >
                      <FaEnvelope style={{ color: "white" }} />
                    </Button>
                    <Button
                      variant="success"
                      onClick={() =>
                        exportarAExcel(
                          calificacionesTotalesAlumno,
                          `reporte_calificaciones_totales_alumno_${year}`
                        )
                      }
                    >
                      <FaFileExcel style={{ color: "white" }} />
                    </Button>
                    <Button
                      variant="info"
                      onClick={() =>
                        exportarATXT(
                          calificacionesTotalesAlumno,
                          `reporte_calificaciones_totales_alumno_${year}`
                        )
                      }
                    >
                      <FaFileAlt style={{ color: "white" }} />
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} sm={12} md={12} lg={6} className="mb-4">
            <Card className="h-100 d-flex flex-column">
              <Card.Body className="d-flex flex-column justify-content-between">
                <div>
                  <Card.Title>Calificaciones Totales por Asignatura</Card.Title>
                  <Form.Group controlId="formYear">
                    <Form.Label>Año</Form.Label>
                    <Form.Control
                      type="number"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="formMonth">
                    <Form.Label>Mes</Form.Label>
                    <Form.Control
                      type="number"
                      value={month}
                      onChange={(e) => setMonth(e.target.value)}
                    />
                  </Form.Group>
                  <canvas
                    ref={chartRefs.totalesAsignatura}
                    height="150"
                  ></canvas>
                </div>
                <div>
                  <div style={styleDivLine}></div>
                  <div style={buttonContainerStyle}>
                    <Button
                      variant="primary"
                      onClick={() =>
                        generarReporte(
                          chartRefs.totalesAsignatura,
                          calificacionesTotalesAsignatura,
                          `Calificaciones Totales por Asignatura en ${month}/${year}`,
                          `reporte_calificaciones_totales_asignatura_${year}_${month}`
                        )
                      }
                    >
                      <FaChartBar style={{ color: "white" }} />
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() =>
                        enviarCorreo(
                          calificacionesTotalesAsignatura,
                          `Calificaciones Totales por Asignatura en ${month}/${year}`,
                          "asignatura",
                          `Reporte Calificaciones por Asignatura en ${month}/${year}`
                        )
                      }
                    >
                      <FaEnvelope style={{ color: "white" }} />
                    </Button>
                    <Button
                      variant="success"
                      onClick={() =>
                        exportarAExcel(
                          calificacionesTotalesAsignatura,
                          `reporte_calificaciones_totales_asignatura_${year}_${month}`
                        )
                      }
                    >
                      <FaFileExcel style={{ color: "white" }} />
                    </Button>
                    <Button
                      variant="info"
                      onClick={() =>
                        exportarATXT(
                          calificacionesTotalesAsignatura,
                          `reporte_calificaciones_totales_asignatura_${year}_${month}`
                        )
                      }
                    >
                      <FaFileAlt style={{ color: "white" }} />
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} sm={12} md={12} lg={6} className="mb-4">
            <Card className="h-100 d-flex flex-column">
              <Card.Body className="d-flex flex-column justify-content-between">
                <div>
                  <Card.Title>Top 5 Alumnos</Card.Title>
                  <canvas ref={chartRefs.top5Alumnos} height="150"></canvas>
                </div>
                <div>
                  <div style={styleDivLine}></div>
                  <div style={buttonContainerStyle}>
                    <Button
                      variant="primary"
                      onClick={() =>
                        generarReporte(
                          chartRefs.top5Alumnos,
                          top5Alumnos,
                          "Top 5 Alumnos",
                          "reporte_top5_alumnos"
                        )
                      }
                    >
                      <FaChartBar style={{ color: "white" }} />
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() =>
                        enviarCorreo(
                          top5Alumnos,
                          "Top 5 Alumnos",
                          "alumno",
                          "Reporte Top 5 Alumnos"
                        )
                      }
                    >
                      <FaEnvelope style={{ color: "white" }} />
                    </Button>
                    <Button
                      variant="success"
                      onClick={() =>
                        exportarAExcel(top5Alumnos, "reporte_top5_alumnos")
                      }
                    >
                      <FaFileExcel style={{ color: "white" }} />
                    </Button>
                    <Button
                      variant="info"
                      onClick={() =>
                        exportarATXT(top5Alumnos, "reporte_top5_alumnos")
                      }
                    >
                      <FaFileAlt style={{ color: "white" }} />
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} sm={12} md={12} lg={6} className="mb-4">
            <Card className="h-100 d-flex flex-column">
              <Card.Body className="d-flex flex-column justify-content-between">
                <div>
                  <Card.Title>Top 5 Asignaturas</Card.Title>
                  <canvas ref={chartRefs.top5Asignaturas} height="150"></canvas>
                </div>
                <div>
                  <div style={styleDivLine}></div>
                  <div style={buttonContainerStyle}>
                    <Button
                      variant="primary"
                      onClick={() =>
                        generarReporte(
                          chartRefs.top5Asignaturas,
                          top5Asignaturas,
                          "Top 5 Asignaturas",
                          "reporte_top5_asignaturas"
                        )
                      }
                    >
                      <FaChartBar style={{ color: "white" }} />
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() =>
                        enviarCorreo(
                          top5Asignaturas,
                          "Top 5 Asignaturas",
                          "asignatura",
                          "Reporte Top 5 Asignaturas"
                        )
                      }
                    >
                      <FaEnvelope style={{ color: "white" }} />
                    </Button>
                    <Button
                      variant="success"
                      onClick={() =>
                        exportarAExcel(
                          top5Asignaturas,
                          "reporte_top5_asignaturas"
                        )
                      }
                    >
                      <FaFileExcel style={{ color: "white" }} />
                    </Button>
                    <Button
                      variant="info"
                      onClick={() =>
                        exportarATXT(
                          top5Asignaturas,
                          "reporte_top5_asignaturas"
                        )
                      }
                    >
                      <FaFileAlt style={{ color: "white" }} />
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Estadisticas;
