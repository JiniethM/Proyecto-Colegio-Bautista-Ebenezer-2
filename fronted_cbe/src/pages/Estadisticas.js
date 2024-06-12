import React, { useRef } from 'react';
import {Container } from 'react-bootstrap';

// Asumimos que tienes un componente Header que maneja la cabecera y rol.
import Header from '../components/Header';

const Estadisticas = ({ rol }) => {
  const iframeContainerRef = useRef(null);

  

  return (
    <div>
      <Header rol={rol} />
      <Container fluid className="mt-3">
        <div ref={iframeContainerRef} style={{ textAlign: 'center', marginBottom: '20px' }}>
          <iframe
            title="Dashboard de Power BI"
            width="100%"
            height="750"
            src="https://app.powerbi.com/view?r=eyJrIjoiYmJmODVkYjItNTdlYy00ZmI1LTg4MGYtZGU5ZjVhZTY0NzFmIiwidCI6ImU0NzY0NmZlLWRhMjctNDUxOC04NDM2LTVmOGIxNThiYTEyNyIsImMiOjR9"
            frameBorder="0"
            allowFullScreen="true"
          ></iframe>
        </div>
        
      </Container>
    </div>
  );
};

export default Estadisticas;
