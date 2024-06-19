// Importa las funciones de validación desde el archivo de validaciones
const {
  validateNombres,
  validateApellidos,
  validateFechaNacimiento,
  validateDireccion,
  validateGenero,
  validateTelefono,
  validateIDTutor
} = require('../../src/ValidacionesCN/validations');

// Importa la función de búsqueda de alumnos desde el archivo correspondiente
const { buscarAlumnos } = require('../../src/ValidacionesCN/buscarAlumnos');

// Describe el conjunto de pruebas para validaciones y búsqueda de alumnos
describe('Validaciones y búsqueda de Alumno', function() {

  // Se ejecuta antes de todas las pruebas
  beforeAll(function() {
    console.log('Iniciando pruebas de validaciones y búsqueda de Alumno...');
  });

  // Se ejecuta después de todas las pruebas
  afterAll(function() {
    console.log('Todas las pruebas de validaciones y búsqueda de Alumno han finalizado.');
  });

  // Prueba individual que valida todos los campos obligatorios
  it('debería validar todos los campos obligatorios correctamente', function() {
    let passed = true;
    console.log('1. El sistema debe bloquear el envío y mostrar errores para cada campo obligatorio vacío.');

    // Validaciones de nombres, apellidos, fecha de nacimiento, dirección, género, teléfono e ID de tutor
    const nombreResult = validateNombres('');
    const nombreLargoResult = validateNombres('A'.repeat(51));
    const nombreInvalidoResult = validateNombres('Nombre123');
    const apellidoResult = validateApellidos('');
    const apellidoLargoResult = validateApellidos('A'.repeat(51));
    const apellidoInvalidoResult = validateApellidos('Apellido123');
    const fechaNacimientoResult = validateFechaNacimiento('');
    const direccionResult = validateDireccion('');
    const generoResult = validateGenero('');
    const telefonoResult = validateTelefono('');
    const telefonoInvalidoResult = validateTelefono('1234');
    const tutorResult = validateIDTutor('');

    // Comprueba si todos los resultados de validación son correctos
    if (nombreResult !== 'El campo Nombre es obligatorio' ||
        nombreLargoResult !== 'El nombre debe tener como máximo 50 caracteres' ||
        nombreInvalidoResult !== 'El nombre solo debe contener caracteres alfabéticos y espacios' ||
        apellidoResult !== 'El campo Apellido es obligatorio' ||
        apellidoLargoResult !== 'El apellido debe tener como máximo 50 caracteres' ||
        apellidoInvalidoResult !== 'El apellido solo debe contener caracteres alfabéticos y espacios' ||
        fechaNacimientoResult !== 'El campo Fecha de Nacimiento es obligatorio' ||
        direccionResult !== 'El campo Dirección es obligatorio' ||
        generoResult !== 'Debe seleccionar el Género' ||
        telefonoResult !== 'El campo Teléfono es obligatorio' ||
        telefonoInvalidoResult !== 'El formato de teléfono es inválido, debe ser ####-####' ||
        tutorResult !== 'Debe seleccionar un Tutor') {
      passed = false;
    }

    // Muestra el resultado de la prueba de validaciones
    console.log(passed ? 'Todas las pruebas de validaciones de Alumno pasaron correctamente' : 'Algunas pruebas de validaciones de Alumno fallaron');
  });

  // Describe el conjunto de pruebas para la funcionalidad de búsqueda de alumnos
  describe('Funcionalidad de búsqueda de alumnos', function() {

    // Se ejecuta antes de todas las pruebas de búsqueda
    beforeAll(function() {
      console.log('2. El sistema debe mostrar los registros que coincidan con los criterios de búsqueda.');
    });

    // Prueba para filtrar alumnos por nombre
    it('debería filtrar alumnos correctamente por nombre', function() {
      const alumnos = [
        { Alumno_Nombres: 'Juan', Alumno_Apellidos: 'Perez', Alumno_Fecha_Nacimiento: '2000-01-01', Alumno_Direccion: 'Calle 1', Tutor_Nombres: 'Pedro' },
        { Alumno_Nombres: 'Ana', Alumno_Apellidos: 'López', Alumno_Fecha_Nacimiento: '1999-05-05', Alumno_Direccion: 'Calle 2', Tutor_Nombres: 'Maria' }
      ];
      const searchQuery = 'Juan';
      const result = buscarAlumnos(alumnos, searchQuery);
      expect(result.length).toBe(1);
      console.log(result.length === 1 ? 'Prueba de búsqueda por nombre pasada' : 'Prueba de búsqueda por nombre fallida');
    });

    // Prueba para filtrar alumnos por apellido
    it('debería filtrar alumnos correctamente por apellido', function() {
      const alumnos = [
        { Alumno_Nombres: 'Juan', Alumno_Apellidos: 'Perez', Alumno_Fecha_Nacimiento: '2000-01-01', Alumno_Direccion: 'Calle 1', Tutor_Nombres: 'Pedro' },
        { Alumno_Nombres: 'Ana', Alumno_Apellidos: 'López', Alumno_Fecha_Nacimiento: '1999-05-05', Alumno_Direccion: 'Calle 2', Tutor_Nombres: 'Maria' }
      ];
      const searchQuery = 'López';
      const result = buscarAlumnos(alumnos, searchQuery);
      expect(result.length).toBe(1);
      console.log(result.length === 1 ? 'Prueba de búsqueda por apellido pasada' : 'Prueba de búsqueda por apellido fallida');
    });

    // Prueba para filtrar alumnos por dirección
    it('debería filtrar alumnos correctamente por dirección', function() {
      const alumnos = [
        { Alumno_Nombres: 'Juan', Alumno_Apellidos: 'Perez', Alumno_Fecha_Nacimiento: '2000-01-01', Alumno_Direccion: 'Calle 1', Tutor_Nombres: 'Pedro' },
        { Alumno_Nombres: 'Ana', Alumno_Apellidos: 'López', Alumno_Fecha_Nacimiento: '1999-05-05', Alumno_Direccion: 'Calle 2', Tutor_Nombres: 'Maria' }
      ];
      const searchQuery = 'Calle 1';
      const result = buscarAlumnos(alumnos, searchQuery);
      expect(result.length).toBe(1);
      console.log(result.length === 1 ? 'Prueba de búsqueda por dirección pasada' : 'Prueba de búsqueda por dirección fallida');
    });

    // Prueba para verificar que no se encuentran coincidencias
    it('debería devolver una lista vacía si no hay coincidencias', function() {
      const alumnos = [
        { Alumno_Nombres: 'Juan', Alumno_Apellidos: 'Perez', Alumno_Fecha_Nacimiento: '2000-01-01', Alumno_Direccion: 'Calle 1', Tutor_Nombres: 'Pedro' },
        { Alumno_Nombres: 'Ana', Alumno_Apellidos: 'López', Alumno_Fecha_Nacimiento: '1999-05-05', Alumno_Direccion: 'Calle 2', Tutor_Nombres: 'Maria' }
      ];
      const searchQuery = 'Carlos';
      const result = buscarAlumnos(alumnos, searchQuery);
      expect(result.length).toBe(0);
      console.log(result.length === 0 ? 'Prueba de búsqueda sin coincidencias pasada' : 'Prueba de búsqueda sin coincidencias fallida');
    });
  });
});
