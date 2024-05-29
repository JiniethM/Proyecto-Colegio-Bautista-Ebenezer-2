// Importamos los módulos necesarios de React 
import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../pages/Login';

// describe agrupa varios casos de prueba relacionados con un componente o funcionalidad
describe('Componente Login', () => {
    // beforeEach se ejecuta antes de cada prueba, inicializando o restableciendo condiciones
    beforeEach(() => {
      // Simulamos la función global fetch, alert y console.error para poder controlar su comportamiento en las pruebas
      global.fetch = jest.fn();
      global.alert = jest.fn();
      console.error = jest.fn();
    });
  
    // it define un caso de prueba específico
    it('manejar envío de formulario con credenciales correctas', async () => {
      // Mock de fetch que simula una respuesta exitosa del servidor
      global.fetch.mockResolvedValueOnce({
        ok: true, // Indica que la solicitud fue exitosa
        json: () => Promise.resolve({ rol: 'Administrador' }), // Simula la respuesta JSON del servidor
      });
  
      const setRol = jest.fn(); // Simulamos una función para manejar el rol del usuario
  
      // Renderiza el componente Login dentro de un enrutador de memoria para simular el comportamiento del enrutador
      render(
        <MemoryRouter>
          <Login setRol={setRol} />
        </MemoryRouter>
      );
  
      // Simula cambios en los campos de entrada de usuario y contraseña y luego un click en el botón de iniciar sesión
      fireEvent.change(screen.getByLabelText(/Ingrese su usuario/i), { target: { value: 'Admi' } });
      fireEvent.change(screen.getByLabelText(/Ingrese su contraseña/i), { target: { value: '1234' } });
      fireEvent.click(screen.getByText(/Iniciar Sesión/i));
  
      // Verifica que se haya llamado a setRol con 'Administrador' tras una respuesta exitosa del servidor
      await waitFor(() => expect(setRol).toHaveBeenCalledWith('Administrador'));
    });
  
    // Segundo caso de prueba para cuando las credenciales son incorrectas
    it('mostrar una alerta con credenciales incorrectas', async () => {
      // Mock de fetch que simula una respuesta fallida del servidor
      global.fetch.mockResolvedValueOnce({
        ok: false, // Indica que la solicitud falló
      });
  
      // Renderiza el componente Login
      render(
        <MemoryRouter>
          <Login setRol={jest.fn()} />
        </MemoryRouter>
      );
  
      // Simula cambios en los campos de usuario y contraseña con credenciales incorrectas y un click en el botón
      fireEvent.change(screen.getByLabelText(/Ingrese su usuario/i), { target: { value: 'Admi' } });
      fireEvent.change(screen.getByLabelText(/Ingrese su contraseña/i), { target: { value: 'wrongpassword' } });
      fireEvent.click(screen.getByText(/Iniciar Sesión/i));
  
      // Verifica que se haya mostrado una alerta indicando que las credenciales son incorrectas
      await waitFor(() => expect(global.alert).toHaveBeenCalledWith('¡Credenciales incorrectas!'));
    });
  
    // Tercer caso de prueba para manejar errores de red o del servidor
    it('manejar errores de red o del servidor', async () => {
      // Simula un error en fetch para representar un fallo de red o del servidor
      global.fetch.mockRejectedValue(new Error('Failed to fetch'));
  
      // Renderiza el componente Login
      render(
        <MemoryRouter>
          <Login setRol={jest.fn()} />
        </MemoryRouter>
      );
  
      // Simula cambios en los campos de usuario y contraseña y un click en el botón
      fireEvent.change(screen.getByLabelText(/Ingrese su usuario/i), { target: { value: 'Admi' } });
      fireEvent.change(screen.getByLabelText(/Ingrese su contraseña/i), { target: { value: '1234' } });
      fireEvent.click(screen.getByText(/Iniciar Sesión/i));
  
      // Verifica que se haya registrado un error en la consola correspondiente al error de la solicitud
      await waitFor(() => expect(console.error).toHaveBeenCalledWith('Error en la solicitud: ', new Error('Failed to fetch')));
    });
  
    // afterEach se ejecuta después de cada prueba, usado aquí para restablecer todos los mocks
    afterEach(() => {
      jest.resetAllMocks();
    });
  });
