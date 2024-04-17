import React, { useEffect, useState, useRef } from "react";
import { Button, Col, Card, Container } from "react-bootstrap";
import jsPDF from "jspdf";
import Chart from "chart.js/auto";
import html2canvas from "html2canvas";
import Header from "../components/Header";

const Estadisticas = ({ rol }) => {
  const [datosDocente, setDatosDocente] = useState([]);
  const pieChartRef = useRef(null);

  const fetchDatosDocente = () => {
    fetch("http://localhost:5000/crud/reporteEstadisticoDocentes")
      .then((response) => response.json())
      .then((data) => {
        setDatosDocente(data);
      })
      .catch((error) =>
        console.error("Error al obtener datos de género de docentes:", error)
      );
  };

  useEffect(() => {
    fetchDatosDocente();
  }, []);

  useEffect(() => {
    if (datosDocente.length > 0 && pieChartRef.current) {
      const ctxPie = pieChartRef.current.getContext("2d");
      const total = datosDocente.reduce((acc, dato) => acc + dato.Cantidad, 0);
      const colores = ["rgba(255, 159, 64, 0.5)", "rgba(153, 102, 255, 0.5)"];

      const pieChart = new Chart(ctxPie, {
        type: "pie",
        data: {
          labels: datosDocente.map((dato) => `Docente ${dato.Genero}`),
          datasets: [
            {
              label: "Cantidad por Género",
              data: datosDocente.map((dato) => dato.Cantidad),
              backgroundColor: colores,
              borderColor: colores.map((color) => color.replace("0.5", "1")),
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "right",
              align: "middle",
              labels: {
                boxWidth: 20,
                padding: 20,
                generateLabels: function (chart) {
                  const dataset = chart.data.datasets[0];
                  return chart.data.labels.map((label, index) => {
                    const value = dataset.data[index];
                    const percentage = ((value / total) * 100).toFixed(2) + "%";
                    return {
                      text: `${label}: ${percentage}`,
                      fillStyle: dataset.backgroundColor[index],
                    };
                  });
                },
              },
            },
            tooltip: {
              callbacks: {
                label: function (tooltipItem) {
                  const currentValue = tooltipItem.parsed;
                  const percentage =
                    ((currentValue / total) * 100).toFixed(2) + "%";
                  return `${tooltipItem.label}: ${currentValue} (${percentage})`;
                },
              },
            },
          },
        },
      });

      return () => pieChart.destroy();
    }
  }, [datosDocente]);

  const generarReporteDocente = async (conImagen) => {
    const pdf = new jsPDF();
    pdf.text("Reporte de Género de Docentes", 20, 10);
    let y = 30;

    if (conImagen && pieChartRef.current) {
      const canvasPie = await html2canvas(pieChartRef.current);
      const imgDataPie = canvasPie.toDataURL("image/png");
      pdf.addImage(imgDataPie, "PNG", 10, y, 180, 150);
      y += 160;
    }

    datosDocente.forEach((dato) => {
      pdf.text(`Docente ${dato.Genero}: ${dato.Cantidad}`, 10, y);
      y += 10;
    });

    pdf.save("reporte_genero_docentes.pdf");
  };

  return (
    <div>
      <Header rol={rol} />
      <Container className="mt-3">
        <Col sm={6}>
          <Card>
            <Card.Body>
              <Card.Title>Género de Docentes</Card.Title>
              <div style={{ position: "relative", height: "300px" }}>
                <canvas ref={pieChartRef} style={{ maxWidth: "100%" }}></canvas>
              </div>
              <Button
                variant="primary"
                onClick={() => generarReporteDocente(false)}
                className="mt-2 me-2"
              >
                Descargar Datos
              </Button>
              <Button
                variant="success"
                onClick={() => generarReporteDocente(true)}
                className="mt-2"
              >
                Descargar El grafico
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Container>
    </div>
  );
};

export default Estadisticas;
