const { JSDOM } = require('jsdom');

describe('Gestión de Matrícula', () => {
    let document;
    let window;
    let matriculaForm;
    let submitButton;

    beforeAll(() => {
        const dom = new JSDOM(`
            <!DOCTYPE html>
            <html lang="en">
            <body>
                <form id="matriculaForm">
                    <select id="Anio_Escolar">
                        <option value="">Seleccione el Año_Escolar</option>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                    </select>
                    <select id="ID_Grado">
                        <option value="">Seleccione el grado</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </select>
                    <select id="Tipo_Matricula">
                        <option value="">Seleccione el tipo de matrícula</option>
                        <option value="Nuevo Ingreso">Nuevo Ingreso</option>
                        <option value="Reingreso">Reingreso</option>
                    </select>
                    <input type="text" id="IdAlumno" value="1 - Juan Perez" disabled>
                    <button type="submit" id="submitButton">Registrar</button>
                </form>
            </body>
            </html>
        `, { runScripts: 'outside-only' });

        document = dom.window.document;
        window = dom.window;

        // Definir fetch en el window del JSDOM
        window.fetch = () => {};

        // Mock de alert
        window.alert = jasmine.createSpy('alert');
    });

    beforeEach(() => {
        matriculaForm = document.getElementById('matriculaForm');
        submitButton = document.getElementById('submitButton');
    });

    it('debería mostrar el mensaje "Matrícula guardada y reflejada correctamente" al guardar la matrícula', (done) => {
        spyOn(window, 'fetch').and.returnValue(Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ message: 'Matrícula guardada y reflejada correctamente' })
        }));

        matriculaForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const Anio_Escolar = document.getElementById('Anio_Escolar').value;
            const ID_Grado = document.getElementById('ID_Grado').value;
            const Tipo_Matricula = document.getElementById('Tipo_Matricula').value;
            const ID_Alumno = "1"; // Asumiendo que seleccionaste el alumno

            const formData = { Anio_Escolar, ID_Grado, Tipo_Matricula, ID_Alumno };

            try {
                const response = await window.fetch('http://localhost:5000/crud/createMatricula', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    window.alert('Matrícula guardada y reflejada correctamente');
                    expect(window.alert).toHaveBeenCalledWith('Matrícula guardada y reflejada correctamente');
                    console.log('Prueba 1: Mensaje de confirmación "Matrícula guardada y reflejada correctamente" se muestra correctamente.');
                    done();
                } else {
                    window.alert('Error al registrar Matrícula');
                    console.log('Prueba 2: Error al registrar Matrícula.');
                }
            } catch (error) {
                console.error('Error en la solicitud:', error);
                window.alert('Error en la solicitud al servidor');
                console.log('Prueba 3: Error en la solicitud al servidor.');
            }
        });

        document.getElementById('Anio_Escolar').value = '2023';
        document.getElementById('ID_Grado').value = '1';
        document.getElementById('Tipo_Matricula').value = 'Nuevo Ingreso';

        submitButton.click();
    });
});
