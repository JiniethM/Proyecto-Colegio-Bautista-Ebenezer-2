
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './pages/Matricula';

beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });
  
  test('TC07 - Flujo completo de matrícula de alumnos', async () => {
    render(
      <Router>
        <App />
      </Router>
    );
  
    // Paso 1: Iniciar sesión como administrador.
    const userField = screen.getByLabelText(/ingrese su usuario/i);
    const passField = screen.getByLabelText(/ingrese su contraseña/i);
    const loginButton = screen.getByRole('button', { name: /iniciar sesión/i });
  
    fireEvent.change(userField, { target: { value: 'admin' } });
    fireEvent.change(passField, { target: { value: '1234' } });
    fireEvent.click(loginButton);
  
    // Verificar la redirección al dashboard o la sección de administración.
    expect(await screen.findByText(/dashboard de administración/i)).toBeInTheDocument();
  
    // Paso 2: Navegar a la sección de matrículas.
    fireEvent.click(screen.getByText(/matrículas/i));
  
    // Paso 3: Seleccionar estudiante.
    fireEvent.click(screen.getByText(/seleccionar alumno/i));
    fireEvent.click(screen.getByText(/maria perez/i)); // Asumiendo que hay un botón o enlace por cada alumno.
  
    // Paso 4: Seleccionar el tipo de matrícula.
    const tipoMatriculaSelect = screen.getByLabelText(/tipo de matrícula/i);
    fireEvent.change(tipoMatriculaSelect, { target: { value: 'Nuevo Ingreso' } });
  
    // Paso 5: Guardar la matrícula.
    fireEvent.click(screen.getByRole('button', { name: /guardar matrícula/i }));
  
    // Verificar mensaje de éxito.
    expect(await screen.findByText(/matrícula guardada y reflejada correctamente/i)).toBeInTheDocument();
  });
  