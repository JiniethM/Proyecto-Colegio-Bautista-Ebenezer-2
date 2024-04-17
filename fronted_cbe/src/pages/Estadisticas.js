import React, { useEffect, useState, useRef } from 'react';
import { Button, Row, Col, Card, Container } from 'react-bootstrap';
import jsPDF from 'jspdf';
import Chart from 'chart.js/auto';
import html2canvas from 'html2canvas';

// Asumimos que tienes un componente Header que maneja la cabecera y rol.
import Header from '../components/Header';

const Estadisticas = ({ rol }) => {
  const [alumnosPorGrado, setAlumnosPorGrado] = useState([]);
  const [datosGenero, setDatosGenero] = useState([]);
  const barChartRef = useRef(null);
  const pieChartRef = useRef(null);
  // Función para obtener los datos de alumnos por grado
  const fetchDatosAlumnos = () => {
    fetch('http://localhost:5000/crud/readReporte')
      .then((response) => response.json())
      .then((data) => setAlumnosPorGrado(data))
      .catch((error) => console.error('Error al obtener datos de alumnos por grado:', error));
  };

  // Función para obtener los datos de género de alumnos y docentes
  // Función para obtener los datos de género de alumnos y docentes
const fetchDatosGenero = () => {
  fetch('http://localhost:5000/crud/readReporteEstadis')
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // Esto mostrará la estructura de los datos en la consola.
  setDatosGenero(data);
    })
    .catch((error) => console.error('Error al obtener datos de género:', error));
};


  // Efecto para obtener los datos al montar el componente
  useEffect(() => {
    fetchDatosAlumnos();
    fetchDatosGenero();
  }, []);

  // Efecto para crear el gráfico de barras
  useEffect(() => {
    if (alumnosPorGrado.length > 0 && barChartRef.current) {
      const ctxBar = barChartRef.current.getContext('2d');
      const barChart = new Chart(ctxBar, {
        type: 'bar',
        data: {
          labels: alumnosPorGrado.map(grado => `Grado ${grado.ID_Grado}`),
          datasets: [{
            label: 'Cantidad de Alumnos',
            data: alumnosPorGrado.map(grado => grado.Cant_Estudiante),
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
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
      return () => barChart.destroy();
    }
  }, [alumnosPorGrado]);

  // Efecto para crear el gráfico de torta
  useEffect(() => {
    if (datosGenero.length > 0 && pieChartRef.current) {
      const ctxPie = pieChartRef.current.getContext('2d');
      const total = datosGenero.reduce((acc, dato) => acc + dato.Cantidad, 0);
      const colores = [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        // Añade más colores si necesitas
      ];
  
      const pieChart = new Chart(ctxPie, {
        type: 'pie',
        data: {
          labels: datosGenero.map(dato => `${dato.Tipo} ${dato.Genero}`),
          datasets: [{
            label: 'Cantidad por Género y Rol',
            data: datosGenero.map(dato => dato.Cantidad),
            backgroundColor: colores,
            borderColor: colores.map(color => color.replace('0.5', '1')),
            borderWidth: 1,
          }],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'right',
              labels: {
                usePointStyle: true,
                padding: 20,
                generateLabels: chart => {
                  const datasets = chart.data.datasets[0];
                  return chart.data.labels.map((label, index) => {
                    const value = datasets.data[index];
                    const color = datasets.backgroundColor[index];
                    const percentage = ((value / total) * 100).toFixed(2) + '%';
                    return {
                      text: `${label}: ${percentage}`,
                      fillStyle: color,
                      strokeStyle: color,
                      lineWidth: 0.5,
                      hidden: !chart.getDataVisibility(index),
                      index
                    };
                  });
                }
              }
            },
            tooltip: {
              callbacks: {
                label: function(tooltipItem) {
                  let label = tooltipItem.chart.data.labels[tooltipItem.dataIndex] || '';
                  if (label) {
                    label += ': ';
                  }
                  const currentValue = tooltipItem.chart.data.datasets[tooltipItem.datasetIndex].data[tooltipItem.dataIndex];
                  const percentage = ((currentValue / total) * 100).toFixed(2) + '%';
                  label += `${currentValue} (${percentage})`;
                  return label;
                }
              }
            }
          }
        },
      });
      return () => pieChart.destroy();
    }
  }, [datosGenero]);
  


  const generarReporteDatos = (titulo, datos, fileName) => {
    const pdf = new jsPDF();
    pdf.text(titulo, 10, 10);
    let y = 20;
    datos.forEach(dato => {
      pdf.text(`${dato.ID_Grado ? 'Grado ' + dato.ID_Grado : dato.Tipo + ' - ' + dato.Genero}: ${dato.Cant_Estudiante || dato.Cantidad}`, 10, y);
      y += 10;
    });
    pdf.save(`${fileName}.pdf`);
  };

  const generarReporteAlumnos = async () => {
    if (barChartRef.current) {
      const canvasBar = await html2canvas(barChartRef.current);
      const imgDataBar = canvasBar.toDataURL('image/png');
      const pdfBar = new jsPDF();
      pdfBar.text("Reporte de Alumnos por Grado", 20, 10);
      pdfBar.addImage(imgDataBar, 'PNG', 10, 20, 180, 150);
      pdfBar.save("reporte_alumnos_con_grafico.pdf");
    }
  };
  
  const generarReporteGenero = async () => {
    if (pieChartRef.current) {
      const canvasPie = await html2canvas(pieChartRef.current);
      const imgDataPie = canvasPie.toDataURL('image/png');
      const pdfPie = new jsPDF();
      pdfPie.text("Reporte de Género de Alumnos y Docentes", 20, 10);
      pdfPie.addImage(imgDataPie, 'PNG', 10, 20, 180, 150);
      pdfPie.save("reporte_genero_con_grafico.pdf");
    }
  };
  

  return (
    <div>
      <Header rol={rol} />
      <Container className="mt-3">
        <Row>
          <Col sm={6}>
            <Card>
              <Card.Body>
                <Card.Title>Alumnos por Grado</Card.Title>
                <canvas ref={barChartRef} height="150"></canvas>
                {/* Botones separados con margen */}
                <Button variant="primary" onClick={() => generarReporteDatos("Datos de Alumnos por Grado", alumnosPorGrado, "reporte_alumnos")} className="mt-2 me-2">
                  Descargar Datos
                </Button>
                <Button variant="success" onClick={generarReporteAlumnos} className="mt-2">
                  Descargar Reporte de Barras
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={6}>
            <Card>
              <Card.Body>
                <Card.Title>Género de Alumnos y Docentes</Card.Title>
                <canvas ref={pieChartRef} height="150"></canvas>
                {/* Botones separados con margen */}
                <Button variant="primary" onClick={() => generarReporteDatos("Datos de Género", datosGenero, "reporte_genero")} className="mt-2 me-2">
                  Descargar Datos
                </Button>
                <Button variant="success" onClick={generarReporteGenero} className="mt-2">
                  Descargar Reporte de Torta
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