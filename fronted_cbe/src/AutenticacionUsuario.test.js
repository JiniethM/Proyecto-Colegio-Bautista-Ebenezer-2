// AutenticacionUsuario.test.js
import { render, fireEvent, screen } from '@testing-library/react';
import Login from './pages/Login'; 
import { BrowserRouter } from 'react-router-dom';

describe('Componente Login', () => {
  it('debería manejar tanto las credenciales correctas como incorrectas', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve(),
      })
    );

    const mockSetRol = jest.fn();
    render(<Login setRol={mockSetRol} />, { wrapper: BrowserRouter });

    fireEvent.change(screen.getByLabelText(/ingrese su usuario/i), {
      target: { value: 'doce' },
    });
    fireEvent.change(screen.getByLabelText(/ingrese su contraseña/i), {
      target: { value: 'contraseñaIncorrecta' },
    });
    fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

    const mensajeError = await screen.findByText(/¡Credenciales incorrectas!/i);
    expect(mensajeError).toBeTruthy(); // Cambiado de toBeInTheDocument a toBeTruthy

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ rol: 'Docente' }),
    });

    fireEvent.change(screen.getByLabelText(/ingrese su usuario/i), {
      target: { value: 'doce' },
    });
    fireEvent.change(screen.getByLabelText(/ingrese su contraseña/i), {
      target: { value: '12345' },
    });
    fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

    const mensajeExito = await screen.findByText(/El usuario se ha iniciado sesión exitosamente/i);
    expect(mensajeExito).toBeTruthy(); // Cambiado de toBeInTheDocument a toBeTruthy
  });
});
