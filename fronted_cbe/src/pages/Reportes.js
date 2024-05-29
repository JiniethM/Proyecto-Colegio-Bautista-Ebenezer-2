import React, { useEffect, useState, useRef } from 'react';
import { Button, Row, Col, Card, Container, Form } from 'react-bootstrap';
import jsPDF from 'jspdf';
import Chart from 'chart.js/auto';
import html2canvas from 'html2canvas';

// Asumimos que tienes un componente Header que maneja la cabecera y rol.
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

  const pieChartRefs = {
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

  // Efecto para crear los gráficos de torta
  useEffect(() => {
    const createPieChart = (ref, labels, data) => {
      if (ref.current) {
        const ctxPie = ref.current.getContext('2d');
        const total = data.reduce((acc, value) => acc + value, 0);
        const pieChart = new Chart(ctxPie, {
          type: 'pie',
          data: {
            labels: labels,
            datasets: [{
              data: data,
              backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
              ],
              borderWidth: 1,
            }],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'right',
              },
              tooltip: {
                callbacks: {
                  label: function(tooltipItem) {
                    const value = tooltipItem.raw;
                    const percentage = ((value / total) * 100).toFixed(2) + '%';
                    return `${tooltipItem.label}: ${value} (${percentage})`;
                  }
                }
              }
            },
          },
        });
        return pieChart;
      }
    };

    const chartConfigs = [
      { ref: pieChartRefs.alumno, labels: calificacionesPromedioAlumno.map(alumno => `${alumno.Nombres} ${alumno.Apellidos}`), data: calificacionesPromedioAlumno.map(alumno => alumno.Promedio_Calificacion) },
      { ref: pieChartRefs.asignatura, labels: calificacionesPromedioAsignatura.map(asignatura => asignatura.Nombre_Asignatura), data: calificacionesPromedioAsignatura.map(asignatura => asignatura.Promedio_Calificacion) },
      { ref: pieChartRefs.grado, labels: calificacionesPromedioGrado.map(grado => grado.Plan_Estudio), data: calificacionesPromedioGrado.map(grado => grado.Promedio_Calificacion) },
      { ref: pieChartRefs.docente, labels: calificacionesPromedioDocente.map(docente => `${docente.Nombres} ${docente.Apellidos}`), data: calificacionesPromedioDocente.map(docente => docente.Promedio_Calificacion) },
      { ref: pieChartRefs.fecha, labels: calificacionesPromedioFecha.map(fecha => `${fecha.Dia}/${fecha.Mes}/${fecha.Año}`), data: calificacionesPromedioFecha.map(fecha => fecha.Promedio_Calificacion) },
      { ref: pieChartRefs.totalesAlumno, labels: calificacionesTotalesAlumno.map(alumno => `${alumno.Nombres} ${alumno.Apellidos}`), data: calificacionesTotalesAlumno.map(alumno => alumno.Total_Calificacion) },
      { ref: pieChartRefs.totalesAsignatura, labels: calificacionesTotalesAsignatura.map(asignatura => asignatura.Nombre_Asignatura), data: calificacionesTotalesAsignatura.map(asignatura => asignatura.Total_Calificacion) },
      { ref: pieChartRefs.top5Alumnos, labels: top5Alumnos.map(alumno => `${alumno.Nombres} ${alumno.Apellidos}`), data: top5Alumnos.map(alumno => alumno.Promedio_Calificacion) },
      { ref: pieChartRefs.top5Asignaturas, labels: top5Asignaturas.map(asignatura => asignatura.Nombre_Asignatura), data: top5Asignaturas.map(asignatura => asignatura.Promedio_Calificacion) },
    ];

    const chartInstances = chartConfigs.map(config => createPieChart(config.ref, config.labels, config.data));
    return () => chartInstances.forEach(chart => chart && chart.destroy());
  }, );

  const generarReporte = async (chartRef, datos, titulo, fileName) => {
    if (chartRef.current) {
      const canvas = await html2canvas(chartRef.current);
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
            <Card className="h-100">
              <Card.Body>
                <Card.Title>Calificaciones Promedio por Alumno</Card.Title>
                <canvas ref={pieChartRefs.alumno} height="150"></canvas>
                <Button variant="primary" onClick={() => generarReporte(pieChartRefs.alumno, calificacionesPromedioAlumno, "Calificaciones Promedio por Alumno", "reporte_calificaciones_alumno")} className="mt-2">
                  Descargar Reporte
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={6} className="mb-4">
            <Card className="h-100">
              <Card.Body>
                <Card.Title>Calificaciones Promedio por Asignatura</Card.Title>
                <canvas ref={pieChartRefs.asignatura} height="150"></canvas>
                <Button variant="primary" onClick={() => generarReporte(pieChartRefs.asignatura, calificacionesPromedioAsignatura, "Calificaciones Promedio por Asignatura", "reporte_calificaciones_asignatura")} className="mt-2">
                  Descargar Reporte
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={6} className="mb-4">
            <Card className="h-100">
              <Card.Body>
                <Card.Title>Calificaciones Promedio por Grado</Card.Title>
                <canvas ref={pieChartRefs.grado} height="150"></canvas>
                <Button variant="primary" onClick={() => generarReporte(pieChartRefs.grado, calificacionesPromedioGrado, "Calificaciones Promedio por Grado", "reporte_calificaciones_grado")} className="mt-2">
                  Descargar Reporte
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={6} className="mb-4">
            <Card className="h-100">
              <Card.Body>
                <Card.Title>Calificaciones Promedio por Docente</Card.Title>
                <canvas ref={pieChartRefs.docente} height="150"></canvas>
                <Button variant="primary" onClick={() => generarReporte(pieChartRefs.docente, calificacionesPromedioDocente, "Calificaciones Promedio por Docente", "reporte_calificaciones_docente")} className="mt-2">
                  Descargar Reporte
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={6} className="mb-4">
            <Card className="h-100">
              <Card.Body>
                <Card.Title>Calificaciones Promedio por Fecha</Card.Title>
                <canvas ref={pieChartRefs.fecha} height="150"></canvas>
                <Button variant="primary" onClick={() => generarReporte(pieChartRefs.fecha, calificacionesPromedioFecha, "Calificaciones Promedio por Fecha", "reporte_calificaciones_fecha")} className="mt-2">
                  Descargar Reporte
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={6} className="mb-4">
            <Card className="h-100">
              <Card.Body>
                <Card.Title>Calificaciones Totales por Alumno</Card.Title>
                <Form.Group controlId="formYear">
                  <Form.Label>Año</Form.Label>
                  <Form.Control type="number" value={year} onChange={(e) => setYear(e.target.value)} />
                </Form.Group>
                <canvas ref={pieChartRefs.totalesAlumno} height="150"></canvas>
                <Button variant="primary" onClick={() => generarReporte(pieChartRefs.totalesAlumno, calificacionesTotalesAlumno, `Calificaciones Totales por Alumno en ${year}`, `reporte_calificaciones_totales_alumno_${year}`)} className="mt-2">
                  Descargar Reporte
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={6} className="mb-4">
            <Card className="h-100">
              <Card.Body>
                <Card.Title>Calificaciones Totales por Asignatura</Card.Title>
                <Form.Group controlId="formYear">
                  <Form.Label>Año</Form.Label>
                  <Form.Control type="number" value={year} onChange={(e) => setYear(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formMonth">
                  <Form.Label>Mes</Form.Label>
                  <Form.Control type="number" value={month} onChange={(e) => setMonth(e.target.value)} />
                </Form.Group>
                <canvas ref={pieChartRefs.totalesAsignatura} height="150"></canvas>
                <Button variant="primary" onClick={() => generarReporte(pieChartRefs.totalesAsignatura, calificacionesTotalesAsignatura, `Calificaciones Totales por Asignatura en ${month}/${year}`, `reporte_calificaciones_totales_asignatura_${year}_${month}`)} className="mt-2">
                  Descargar Reporte
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={6} className="mb-4">
            <Card className="h-100">
              <Card.Body>
                <Card.Title>Top 5 Alumnos</Card.Title>
                <canvas ref={pieChartRefs.top5Alumnos} height="150"></canvas>
                <Button variant="primary" onClick={() => generarReporte(pieChartRefs.top5Alumnos, top5Alumnos, "Top 5 Alumnos", "reporte_top5_alumnos")} className="mt-2">
                  Descargar Reporte
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={6} className="mb-4">
            <Card className="h-100">
              <Card.Body>
                <Card.Title>Top 5 Asignaturas</Card.Title>
                <canvas ref={pieChartRefs.top5Asignaturas} height="150"></canvas>
                <Button variant="primary" onClick={() => generarReporte(pieChartRefs.top5Asignaturas, top5Asignaturas, "Top 5 Asignaturas", "reporte_top5_asignaturas")} className="mt-2">
                  Descargar Reporte
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Estadisticas;
