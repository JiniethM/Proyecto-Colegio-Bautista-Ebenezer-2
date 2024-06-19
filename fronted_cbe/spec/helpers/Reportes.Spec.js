const { generarReporteCalificaciones } = require('../../../fronted_cbe/src/ValidacionesCN/generarReporte');

describe('Prueba de Caja Negra - Generación de Reporte de Calificaciones', () => {
  let calificaciones;

  beforeEach(() => {
    calificaciones = [
      { Nombres: 'Maria', Apellidos: 'Jose', Promedio_Calificacion: 72.42 },
      { Nombres: 'Juan', Apellidos: 'Carlos', Promedio_Calificacion: 74.72 },
      { Nombres: 'Ana', Apellidos: 'Sofia', Promedio_Calificacion: 73.22 }
    ];
  });

  it('debería generar el reporte de calificaciones correctamente y mostrarlo en la consola', () => {
    const semestre = "2023-4";
    const resultado = generarReporteCalificaciones(calificaciones, semestre);
    const esperado = `Reporte de Calificaciones - Semestre: 2023-4

Nombre: Maria Jose, Calificación Promedio: 72.42
Nombre: Juan Carlos, Calificación Promedio: 74.72
Nombre: Ana Sofia, Calificación Promedio: 73.22`;

    expect(resultado).toEqual(esperado);
  });

  it('debería lanzar un error si no hay calificaciones registradas', () => {
    calificaciones = [];
    const semestre = "2023-4";
    expect(() => generarReporteCalificaciones(calificaciones, semestre)).toThrowError("No hay calificaciones registradas para generar el reporte.");
  });
});
