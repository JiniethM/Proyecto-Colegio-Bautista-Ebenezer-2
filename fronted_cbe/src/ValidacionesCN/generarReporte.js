const generarReporteCalificaciones = (calificaciones, semestre) => {
    if (!calificaciones || calificaciones.length === 0) {
      throw new Error("No hay calificaciones registradas para generar el reporte.");
    }
  
    console.log("Creando reporte");
  
    const reporte = calificaciones.map(calificacion => {
      const nombre = `${calificacion.Nombres || 'Sin Nombre'} ${calificacion.Apellidos || 'Sin Apellido'}`;
      const calificacionPromedio = calificacion.Promedio_Calificacion;
      return `Nombre: ${nombre}, Calificación Promedio: ${parseFloat(calificacionPromedio).toFixed(2)}`;
    }).join('\n');
  
    const resultado = `Reporte de Calificaciones - Semestre: ${semestre}\n\n${reporte}`;
  
    console.log("Reporte generado con estos datos:");
    console.log(resultado);
  
    return resultado;
  };
  
  module.exports = { generarReporteCalificaciones };
  