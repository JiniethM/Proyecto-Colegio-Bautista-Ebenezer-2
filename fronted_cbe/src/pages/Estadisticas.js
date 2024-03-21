import React, { useEffect, useState } from 'react';
import { Button, Row, Col, Card, Container } from 'react-bootstrap';
import jsPDF from 'jspdf';
import Chart from 'chart.js/auto';
import html2canvas from 'html2canvas';

import Header from '../components/Header';

const Estadisticas = ({ rol }) => {
  const [alumnosPorGrado, setAlumnosPorGrado] = useState([]);
  const [myChart, setMyChart] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (alumnosPorGrado.length > 0) {
      updateChart();
    }
  }, [alumnosPorGrado]);

  const fetchData = () => {
    fetch('http://localhost:5000/crud/readReporte')
      .then((response) => response.json())
      .then((data) => setAlumnosPorGrado(data))
      .catch((error) => console.error('Error al obtener datos:', error));
  };

  const updateChart = () => {
    const ctx = document.getElementById('myChart');

    if (myChart !== null) {
      myChart.destroy();
    }

    const nombresGrados = alumnosPorGrado.map((grado) => `Grado ${grado.ID_Grado}`);
    const cantidadesAlumnos = alumnosPorGrado.map((grado) => grado.Cant_Estudiante);

    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: nombresGrados,
        datasets: [{
          label: 'Cantidad de Alumnos',
          data: cantidadesAlumnos,
          backgroundColor: 'rgba(75, 192, 192, 0.5)', // Cambia este color según tus preferencias
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        }],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    setMyChart(chart);
  };

  const generarReporteAlumnos = () => {
    fetchData();

    fetch('http://localhost:5000/crud/readReporte')
      .then((response) => response.json())
      .then((alumnos) => {
        const doc = new jsPDF();
        let y = 15;

        doc.text("Reporte de Alumnos por Grado", 20, 10);

        alumnos.forEach((grado) => {
          doc.text(`Grado: ${grado.ID_Grado}`, 20, y);
          doc.text(`Cantidad de Alumnos: ${grado.Cant_Estudiante}`, 20, y + 10);

          y += 30;
          if (y >= 280) {
            doc.addPage();
            y = 15;
          }
        });

        doc.save("reporte_alumnos.pdf");
      })
      .catch((error) => console.error('Error al generar el reporte:', error));
  };

  const generarReporteAlumnosImg = async () => {
    try {
      const canvas = await html2canvas(document.getElementById('myChart'));
      const pdf = new jsPDF();
      const imgData = canvas.toDataURL('image/png');

      pdf.text("Reporte de Alumnos por Grado", 20, 10);
      pdf.addImage(imgData, 'PNG', 10, 20, 100, 100);
      pdf.save("reporte_alumnos_con_grafico.pdf");
    } catch (error) {
      console.error('Error al generar el reporte con imagen:', error);
    }
  };

  return (
    <div>
      <Header rol={rol} />
      <Container className="margen-contenedor">
        <Row className="mt-3">
          <Col sm="6" md="6" lg="4">
            <Card className="d-flex align-items-center justify-content-center">
              <Card.Body className="text-center">
                <Card.Title>Alumnos por Grado</Card.Title>
                <canvas id="myChart" height="300"></canvas>
                <Button onClick={generarReporteAlumnos}>
                  Generar reporte
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col sm="6" md="6" lg="4">
            <Card className="d-flex align-items-center justify-content-center">
              <Card.Body className="text-center">
                <Card.Title>Alumnos por Grado</Card.Title>
                {/* Otro contenido que puedas tener en el cuerpo de la tarjeta */}
                <Button onClick={generarReporteAlumnosImg}>
                  Generar reporte con gráfico
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Estadisticas;
