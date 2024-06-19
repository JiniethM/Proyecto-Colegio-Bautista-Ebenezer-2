// Función de búsqueda extraída
function buscarAlumnos(alumnos, searchQuery) {
    return alumnos.filter((alumno) => {
      if (alumno && typeof alumno === 'object') {
        const alumno_Nombres = alumno.Alumno_Nombres ? alumno.Alumno_Nombres.toLowerCase() : '';
        const alumno_Apellidos = alumno.Alumno_Apellidos ? alumno.Alumno_Apellidos.toLowerCase() : '';
        const alumno_Fecha_Nacimiento = alumno.Alumno_Fecha_Nacimiento ? alumno.Alumno_Fecha_Nacimiento.toLowerCase() : '';
        const alumno_Direccion = alumno.Alumno_Direccion ? alumno.Alumno_Direccion.toLowerCase() : '';
        const tutor_Nombres = alumno.Tutor_Nombres ? alumno.Tutor_Nombres.toLowerCase() : '';
  
        const search = searchQuery.toLowerCase();
  
        return (
          alumno_Nombres.includes(search) ||
          alumno_Apellidos.includes(search) ||
          alumno_Fecha_Nacimiento.includes(search) ||
          alumno_Direccion.includes(search) ||
          tutor_Nombres.includes(search)
        );
      } else {
        return false;
      }
    }).sort((a, b) => a.ID_Alumno - b.ID_Alumno); // Ordena los alumnos por ID
  }
  
  module.exports = { buscarAlumnos };
  