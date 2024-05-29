import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from './Login';

describe('Login Component', () => {
  const mockSetRol = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders Login component', () => {
    render(
      <MemoryRouter>
        <Login setRol={mockSetRol} />
      </MemoryRouter>
    );
    const titleElement = screen.getByText(/Inicio de Sesión/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('allows the user to input username and password', () => {
    render(
      <MemoryRouter>
        <Login setRol={mockSetRol} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Ingrese su usuario/i), {
      target: { value: 'testuser' }
    });
    fireEvent.change(screen.getByLabelText(/Ingrese su contraseña/i), {
      target: { value: 'password' }
    });

    expect(screen.getByLabelText(/Ingrese su usuario/i).value).toBe('testuser');
    expect(screen.getByLabelText(/Ingrese su contraseña/i).value).toBe('password');
  });

  test('shows error message on invalid login', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
      })
    );

    render(
      <MemoryRouter>
        <Login setRol={mockSetRol} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Ingrese su usuario/i), {
      target: { value: 'wronguser' }
    });
    fireEvent.change(screen.getByLabelText(/Ingrese su contraseña/i), {
      target: { value: 'wrongpassword' }
    });

    fireEvent.click(screen.getByText(/Iniciar Sesión/i));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('¡Credenciales incorrectas!');
    });
  });

  test('navigates to home on successful login', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ rol: 'admin' })
      })
    );

    render(
      <MemoryRouter>
        <Login setRol={mockSetRol} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Ingrese su usuario/i), {
      target: { value: 'correctuser' }
    });
    fireEvent.change(screen.getByLabelText(/Ingrese su contraseña/i), {
      target: { value: 'correctpassword' }
    });

    fireEvent.click(screen.getByText(/Iniciar Sesión/i));

    await waitFor(() => expect(mockSetRol).toHaveBeenCalledWith('admin'));
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/home'));
  });
});
