const { registrarCalificacion } = require('../../src/ValidacionesCN/registrarCalificacion');

describe('Ingreso de Calificaciones', () => {
    let fetchSpy;

    beforeEach(() => {
        fetchSpy = spyOn(global, 'fetch').and.callFake(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ message: 'Calificación guardada y reflejada correctamente' })
        }));
    });

    it('debería mostrar el mensaje "Calificación guardada y reflejada correctamente" al guardar la calificación', async () => {
        const mensaje = await registrarCalificacion('85', '2024-06-16', '1', '101', 'Primer Corte');

        expect(fetchSpy).toHaveBeenCalledWith('http://localhost:5000/crud/createCalificacion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                p_Calificacion_Obtenida: '85',
                p_Fecha_Calificacion: '2024-06-16',
                p_ID_Alumno: '1',
                p_ID_Asignatura: '101',
                p_Corte_Evaluativo: 'Primer Corte',
            }),
        });
        expect(mensaje).toBe('Calificación guardada y reflejada correctamente.');
        console.log('Prueba 1: El mensaje de confirmación "Calificación guardada y reflejada correctamente" se muestra correctamente.');
    });

    it('debería mostrar el mensaje "Error al registrar la calificación" si la respuesta no es ok', async () => {
        fetchSpy.and.returnValue(Promise.resolve({
            ok: false
        }));

        const mensaje = await registrarCalificacion('85', '2024-06-16', '1', '101', 'Primer Corte');

        expect(mensaje).toBe('Error al registrar la calificación');
        console.log('Prueba 2: Se muestra el mensaje "Error al registrar la calificación" cuando la respuesta del servidor no es ok.');
    });
});
