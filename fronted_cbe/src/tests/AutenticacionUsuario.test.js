// Importación de las herramientas necesarias de la biblioteca de pruebas.
import { render, fireEvent, screen } from '@testing-library/react';
// Importación del componente Login desde la carpeta de páginas.
import Login from '../pages/Login'; 
// Importación de BrowserRouter de react-router-dom, necesario para envolver componentes que usan enrutamiento.
import { BrowserRouter } from 'react-router-dom';

// describe es una función para declarar un bloque de pruebas que contienen varios tests relacionados.
describe('Componente Login', () => {
  // it es una función para declarar un test individual. 'async' indica que se realizarán operaciones asíncronas dentro.
  it('debería manejar tanto las credenciales correctas como incorrectas', async () => {
    // Configura globalmente fetch para simular una respuesta no exitosa cuando se hagan llamadas fetch en este bloque.
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false, // "ok" falso simula que la respuesta del servidor indica un error (como credenciales incorrectas).
        json: () => Promise.resolve(), // Función json que simplemente resuelve un objeto vacío.
      })
    );

    // jest.fn() crea una función simulada para 'setRol' para ser usada como prop en el componente Login.
    const mockSetRol = jest.fn();
    // renderiza el componente Login dentro de un Router para manejar cualquier lógica de navegación.
    render(<Login setRol={mockSetRol} />, { wrapper: BrowserRouter });

    // Simula un cambio en el campo de usuario, ingresando 'doce' como valor.
    fireEvent.change(screen.getByLabelText(/ingrese su usuario/i), {
      target: { value: 'doce' },
    });
    // Simula un cambio en el campo de contraseña, ingresando 'contraseñaIncorrecta' como valor.
    fireEvent.change(screen.getByLabelText(/ingrese su contraseña/i), {
      target: { value: 'contraseñaIncorrecta' },
    });
    // Simula un clic en el botón de iniciar sesión.
    fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

    // Espera y verifica que el mensaje de error "¡Credenciales incorrectas!" esté en el documento.
    const mensajeError = await screen.findByText(/¡Credenciales incorrectas!/i);
    expect(mensajeError).toBeInTheDocument();

    // Configura fetch para simular una respuesta exitosa una sola vez.
    global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ rol: 'Docente' }), // Simula que el servidor responde con un rol de 'Docente'.
    });

    // Simula nuevamente un cambio en el campo de usuario con el mismo valor.
    fireEvent.change(screen.getByLabelText(/ingrese su usuario/i), {
      target: { value: 'doce' },
    });
    // Simula un cambio en el campo de contraseña, esta vez con la contraseña correcta '12345'.
    fireEvent.change(screen.getByLabelText(/ingrese su contraseña/i), {
      target: { value: '12345' },
    });
    // Simula un clic en el botón de iniciar sesión.
    fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

    // Espera y verifica que el mensaje de éxito "El usuario se ha iniciado sesión exitosamente" esté en el documento.
    const mensajeExito = await screen.findByText(/El usuario se ha iniciado sesión exitosamente/i);
    expect(mensajeExito).toBeInTheDocument();
  });
});
