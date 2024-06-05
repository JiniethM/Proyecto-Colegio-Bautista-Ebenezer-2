import React, { useRef } from 'react';
import { Button, Container } from 'react-bootstrap';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Asumimos que tienes un componente Header que maneja la cabecera y rol.
import Header from '../components/Header';

const Estadisticas = ({ rol }) => {
  const iframeContainerRef = useRef(null);

  const generarReportePDF = async () => {
    if (iframeContainerRef.current) {
      const canvas = await html2canvas(iframeContainerRef.current, {
        useCORS: true,
        scale: 2,
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape', 'mm', 'a4');
      const imgWidth = 297; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Calculate height to maintain aspect ratio
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save("reporte_dashboard.pdf");
    }
  };

  return (
    <div>
      <Header rol={rol} />
      <Container fluid className="mt-3">
        <div ref={iframeContainerRef} style={{ textAlign: 'center', marginBottom: '20px' }}>
          <iframe
            title="Dashboard de Power BI"
            width="75%"
            height="750"
            src="https://app.powerbi.com/view?r=eyJrIjoiYmJmODVkYjItNTdlYy00ZmI1LTg4MGYtZGU5ZjVhZTY0NzFmIiwidCI6ImU0NzY0NmZlLWRhMjctNDUxOC04NDM2LTVmOGIxNThiYTEyNyIsImMiOjR9"
            frameBorder="0"
            allowFullScreen="true"
          ></iframe>
        </div>
        <Button variant="success" onClick={generarReportePDF}>
          Descargar Informe en PDF
        </Button>
      </Container>
    </div>
  );
};

export default Estadisticas;
