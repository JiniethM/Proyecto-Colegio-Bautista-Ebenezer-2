import React, { useEffect, useState, useRef } from 'react';
import { Button, Row, Col, Card, Container, Form } from 'react-bootstrap';
import jsPDF from 'jspdf';
import Chart from 'chart.js/auto';
import html2canvas from 'html2canvas';
import Header from '../components/Header';

const Estadisticas = ({ rol }) => {
  const [calificacionesPromedioAlumno, setCalificacionesPromedioAlumno] = useState([]);
  const [calificacionesPromedioAsignatura, setCalificacionesPromedioAsignatura] = useState([]);
  const [calificacionesPromedioGrado, setCalificacionesPromedioGrado] = useState([]);
  const [calificacionesPromedioDocente, setCalificacionesPromedioDocente] = useState([]);
  const [calificacionesPromedioFecha, setCalificacionesPromedioFecha] = useState([]);
  const [calificacionesTotalesAlumno, setCalificacionesTotalesAlumno] = useState([]);
  const [calificacionesTotalesAsignatura, setCalificacionesTotalesAsignatura] = useState([]);
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

  // Funciones para obtener los datos
  const fetchCalificacionesPromedioAlumno = () => {
    fetch('http://localhost:5000/crudDt/calificacionesPromedioAlumno')
      .then((response) => response.json())
      .then((data) => setCalificacionesPromedioAlumno(data))
      .catch((error) => console.error('Error al obtener calificaciones promedio por alumno:', error));
  };

  const fetchCalificacionesPromedioAsignatura = () => {
    fetch('http://localhost:5000/crudDt/calificacionesPromedioAsignatura')
      .then((response) => response.json())
      .then((data) => setCalificacionesPromedioAsignatura(data))
      .catch((error) => console.error('Error al obtener calificaciones promedio por asignatura:', error));
  };

  const fetchCalificacionesPromedioGrado = () => {
    fetch('http://localhost:5000/crudDt/calificacionesPromedioGrado')
      .then((response) => response.json())
      .then((data) => setCalificacionesPromedioGrado(data))
      .catch((error) => console.error('Error al obtener calificaciones promedio por grado:', error));
  };

  const fetchCalificacionesPromedioDocente = () => {
    fetch('http://localhost:5000/crudDt/calificacionesPromedioDocente')
      .then((response) => response.json())
      .then((data) => setCalificacionesPromedioDocente(data))
      .catch((error) => console.error('Error al obtener calificaciones promedio por docente:', error));
  };

  const fetchCalificacionesPromedioFecha = () => {
    fetch('http://localhost:5000/crudDt/calificacionesPromedioFecha')
      .then((response) => response.json())
      .then((data) => setCalificacionesPromedioFecha(data))
      .catch((error) => console.error('Error al obtener calificaciones promedio por fecha:', error));
  };

  const fetchCalificacionesTotalesAlumno = (year) => {
    fetch(`http://localhost:5000/crudDt/calificacionesTotalesAlumno/${year}`)
      .then((response) => response.json())
      .then((data) => setCalificacionesTotalesAlumno(data))
      .catch((error) => console.error('Error al obtener calificaciones totales por alumno:', error));
  };

  const fetchCalificacionesTotalesAsignatura = (year, month) => {
    fetch(`http://localhost:5000/crudDt/calificacionesTotalesAsignatura/${year}/${month}`)
      .then((response) => response.json())
      .then((data) => setCalificacionesTotalesAsignatura(data))
      .catch((error) => console.error('Error al obtener calificaciones totales por asignatura:', error));
  };

  const fetchTop5Alumnos = () => {
    fetch('http://localhost:5000/crudDt/top5Alumnos')
      .then((response) => response.json())
      .then((data) => setTop5Alumnos(data))
      .catch((error) => console.error('Error al obtener los top 5 alumnos:', error));
  };

  const fetchTop5Asignaturas = () => {
    fetch('http://localhost:5000/crudDt/top5Asignaturas')
      .then((response) => response.json())
      .then((data) => setTop5Asignaturas(data))
      .catch((error) => console.error('Error al obtener las top 5 asignaturas:', error));
  };

  // Efecto para obtener los datos al montar el componente
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

  // Efecto para crear los gráficos de comparación
  useEffect(() => {
    const createBarChart = (ref, labels, data) => {
      if (ref.current) {
        const ctxBar = ref.current.getContext('2d');
        const barChart = new Chart(ctxBar, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: 'Promedio de Calificaciones',
              data: data,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
              stack: 'Stack 0'
            }],
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
                    return `${tooltipItem.label}: ${tooltipItem.raw}`;
                  }
                }
              }
            },
            scales: {
              x: {
                stacked: true,
              },
              y: {
                stacked: true,
                beginAtZero: true,
              }
            }
          },
        });
        return barChart;
      }
    };

    const chartConfigs = [
      { ref: chartRefs.alumno, labels: calificacionesPromedioAlumno.slice(0, 5).map(alumno => `${alumno.Nombres} ${alumno.Apellidos}`), data: calificacionesPromedioAlumno.slice(0, 5).map(alumno => alumno.Promedio_Calificacion), createChart: createBarChart },
      { ref: chartRefs.asignatura, labels: calificacionesPromedioAsignatura.slice(0, 5).map(asignatura => asignatura.Nombre_Asignatura), data: calificacionesPromedioAsignatura.slice(0, 5).map(asignatura => asignatura.Promedio_Calificacion), createChart: createBarChart },
      { ref: chartRefs.grado, labels: calificacionesPromedioGrado.slice(0, 5).map(grado => grado.Plan_Estudio), data: calificacionesPromedioGrado.slice(0, 5).map(grado => grado.Promedio_Calificacion), createChart: createBarChart },
      { ref: chartRefs.docente, labels: calificacionesPromedioDocente.slice(0, 5).map(docente => `${docente.Nombres} ${docente.Apellidos}`), data: calificacionesPromedioDocente.slice(0, 5).map(docente => docente.Promedio_Calificacion), createChart: createBarChart },
      { ref: chartRefs.fecha, labels: calificacionesPromedioFecha.slice(0, 5).map(fecha => `${fecha.Dia}/${fecha.Mes}/${fecha.Año}`), data: calificacionesPromedioFecha.slice(0, 5).map(fecha => fecha.Promedio_Calificacion), createChart: createBarChart },
      { ref: chartRefs.totalesAlumno, labels: calificacionesTotalesAlumno.slice(0, 5).map(alumno => `${alumno.Nombres} ${alumno.Apellidos}`), data: calificacionesTotalesAlumno.slice(0, 5).map(alumno => alumno.Total_Calificacion), createChart: createBarChart },
      { ref: chartRefs.totalesAsignatura, labels: calificacionesTotalesAsignatura.slice(0, 5).map(asignatura => asignatura.Nombre_Asignatura), data: calificacionesTotalesAsignatura.slice(0, 5).map(asignatura => asignatura.Total_Calificacion), createChart: createBarChart },
      { ref: chartRefs.top5Alumnos, labels: top5Alumnos.map(alumno => `${alumno.Nombres} ${alumno.Apellidos}`), data: top5Alumnos.map(alumno => alumno.Promedio_Calificacion), createChart: createBarChart },
      { ref: chartRefs.top5Asignaturas, labels: top5Asignaturas.map(asignatura => asignatura.Nombre_Asignatura), data: top5Asignaturas.map(asignatura => asignatura.Promedio_Calificacion), createChart: createBarChart },
    ];

    const chartInstances = chartConfigs.map(config => config.createChart(config.ref, config.labels, config.data));
    return () => chartInstances.forEach(chart => chart && chart.destroy());
  }, );

  const generarReporte = async (chartRef, datos, titulo, fileName) => {
    if (chartRef.current) {
      const canvas = await html2canvas(chartRef.current, { scale: 3 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.text(titulo, 20, 10);
      pdf.addImage(imgData, 'PNG', 10, 20, 180, 150);
      let y = 180;
      datos.forEach(dato => {
        pdf.text(`${dato.Nombres || dato.Nombre_Asignatura || dato.Plan_Estudio || `${dato.Dia}/${dato.Mes}/${dato.Año}`}: ${dato.Promedio_Calificacion || dato.Total_Calificacion}`, 10, y);
        y += 10;
        if (y > 280) { // Ajusta si el contenido supera el límite de la página
          pdf.addPage();
          y = 20;
        }
      });
      pdf.save(`${fileName}.pdf`);
    }
  };

  return (
    <div>
      <Header rol={rol} />
      <Container className="mt-3">
        <Row>
          <Col sm={6} className="mb-4">
            <Card className="h-100 d-flex flex-column">
              <Card.Body className="d-flex flex-column">
                <Card.Title>Calificaciones Promedio por Alumno</Card.Title>
                <canvas ref={chartRefs.alumno} height="150"></canvas>
                <div className="mt-auto">
                  <Button variant="primary" onClick={() => generarReporte(chartRefs.alumno, calificacionesPromedioAlumno, "Calificaciones Promedio por Alumno", "reporte_calificaciones_alumno")} className="mt-2">
                    Descargar Reporte
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={6} className="mb-4">
            <Card className="h-100 d-flex flex-column">
              <Card.Body className="d-flex flex-column">
                <Card.Title>Calificaciones Promedio por Asignatura</Card.Title>
                <canvas ref={chartRefs.asignatura} height="150"></canvas>
                <div className="mt-auto">
                  <Button variant="primary" onClick={() => generarReporte(chartRefs.asignatura, calificacionesPromedioAsignatura, "Calificaciones Promedio por Asignatura", "reporte_calificaciones_asignatura")} className="mt-2">
                    Descargar Reporte
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={6} className="mb-4">
            <Card className="h-100 d-flex flex-column">
              <Card.Body className="d-flex flex-column">
                <Card.Title>Calificaciones Promedio por Grado</Card.Title>
                <canvas ref={chartRefs.grado} height="150"></canvas>
                <div className="mt-auto">
                  <Button variant="primary" onClick={() => generarReporte(chartRefs.grado, calificacionesPromedioGrado, "Calificaciones Promedio por Grado", "reporte_calificaciones_grado")} className="mt-2">
                    Descargar Reporte
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={6} className="mb-4">
            <Card className="h-100 d-flex flex-column">
              <Card.Body className="d-flex flex-column">
                <Card.Title>Calificaciones Promedio por Docente</Card.Title>
                <canvas ref={chartRefs.docente} height="150"></canvas>
                <div className="mt-auto">
                  <Button variant="primary" onClick={() => generarReporte(chartRefs.docente, calificacionesPromedioDocente, "Calificaciones Promedio por Docente", "reporte_calificaciones_docente")} className="mt-2">
                    Descargar Reporte
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={6} className="mb-4">
            <Card className="h-100 d-flex flex-column">
              <Card.Body className="d-flex flex-column">
                <Card.Title>Calificaciones Promedio por Fecha</Card.Title>
                <canvas ref={chartRefs.fecha} height="150"></canvas>
                <div className="mt-auto">
                  <Button variant="primary" onClick={() => generarReporte(chartRefs.fecha, calificacionesPromedioFecha, "Calificaciones Promedio por Fecha", "reporte_calificaciones_fecha")} className="mt-2">
                    Descargar Reporte
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={6} className="mb-4">
            <Card className="h-100 d-flex flex-column">
              <Card.Body className="d-flex flex-column">
                <Card.Title>Calificaciones Totales por Alumno</Card.Title>
                <Form.Group controlId="formYear">
                  <Form.Label>Año</Form.Label>
                  <Form.Control type="number" value={year} onChange={(e) => setYear(e.target.value)} />
                </Form.Group>
                <canvas ref={chartRefs.totalesAlumno} height="150"></canvas>
                <div className="mt-auto">
                  <Button variant="primary" onClick={() => generarReporte(chartRefs.totalesAlumno, calificacionesTotalesAlumno, `Calificaciones Totales por Alumno en ${year}`, `reporte_calificaciones_totales_alumno_${year}`)} className="mt-2">
                    Descargar Reporte
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={6} className="mb-4">
            <Card className="h-100 d-flex flex-column">
              <Card.Body className="d-flex flex-column">
                <Card.Title>Calificaciones Totales por Asignatura</Card.Title>
                <Form.Group controlId="formYear">
                  <Form.Label>Año</Form.Label>
                  <Form.Control type="number" value={year} onChange={(e) => setYear(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formMonth">
                  <Form.Label>Mes</Form.Label>
                  <Form.Control type="number" value={month} onChange={(e) => setMonth(e.target.value)} />
                </Form.Group>
                <canvas ref={chartRefs.totalesAsignatura} height="150"></canvas>
                <div className="mt-auto">
                  <Button variant="primary" onClick={() => generarReporte(chartRefs.totalesAsignatura, calificacionesTotalesAsignatura, `Calificaciones Totales por Asignatura en ${month}/${year}`, `reporte_calificaciones_totales_asignatura_${year}_${month}`)} className="mt-2">
                    Descargar Reporte
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={6} className="mb-4">
            <Card className="h-100 d-flex flex-column">
              <Card.Body className="d-flex flex-column">
                <Card.Title>Top 5 Alumnos</Card.Title>
                <canvas ref={chartRefs.top5Alumnos} height="150"></canvas>
                <div className="mt-auto">
                  <Button variant="primary" onClick={() => generarReporte(chartRefs.top5Alumnos, top5Alumnos, "Top 5 Alumnos", "reporte_top5_alumnos")} className="mt-2">
                    Descargar Reporte
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={6} className="mb-4">
            <Card className="h-100 d-flex flex-column">
              <Card.Body className="d-flex flex-column">
                <Card.Title>Top 5 Asignaturas</Card.Title>
                <canvas ref={chartRefs.top5Asignaturas} height="150"></canvas>
                <div className="mt-auto">
                  <Button variant="primary" onClick={() => generarReporte(chartRefs.top5Asignaturas, top5Asignaturas, "Top 5 Asignaturas", "reporte_top5_asignaturas")} className="mt-2">
                    Descargar Reporte
                  </Button>
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
