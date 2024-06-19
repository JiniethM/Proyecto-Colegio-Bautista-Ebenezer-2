const registrarCalificacion = async (calificacion, fecha, alumnoId, asignaturaId, corteEvaluativo) => {
    const formData = {
        p_Calificacion_Obtenida: calificacion,
        p_Fecha_Calificacion: fecha,
        p_ID_Alumno: alumnoId,
        p_ID_Asignatura: asignaturaId,
        p_Corte_Evaluativo: corteEvaluativo,
    };

    try {
        const response = await fetch('http://localhost:5000/crud/createCalificacion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            return 'Calificación guardada y reflejada correctamente.';
        } else {
            return 'Error al registrar la calificación';
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        return 'Error en la solicitud al servidor';
    }
};

module.exports = { registrarCalificacion };
