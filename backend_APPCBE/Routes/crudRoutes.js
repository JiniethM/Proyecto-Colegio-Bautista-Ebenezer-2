const express = require('express');
const router = express.Router();

module.exports = (db) => {


  // Ruta para verificar las credenciales y obtener el rol del usuario
router.post('/login', (req, res) => {
  const { nombre_Usuario, contrasena } = req.body;

  if (!nombre_Usuario || !contrasena) {
    return res.status(400).json({ error: 'Nombre de usuario y contraseña son obligatorios' });
  }

  // Realizar la consulta para verificar las credenciales en la base de datos
  const sql = 'SELECT rol FROM usuario WHERE nombre_Usuario = ? AND contrasena = ?';
  db.query(sql, [nombre_Usuario, contrasena], (err, result) => {
    if (err) {
      console.error('Error al verificar credenciales:', err);
      return res.status(500).json({ error: 'Error al verificar credenciales' });
    }

    if (result.length === 1) {
      const { rol } = result[0];
      res.json({ rol }); // Devolver el rol si las credenciales son correctas
    } else {
      res.status(401).json({ error: 'Credenciales incorrectas' });
    }
  });
});


router.get('/reporteEstadisticoAlumnos', (req, res) => {
  const sqlAlumnos = `
    SELECT 'Alumno' AS Tipo, p.Genero, COUNT(*) AS Cantidad
    FROM alumno a
    JOIN persona p ON a.ID_Persona = p.ID_Persona
    GROUP BY p.Genero;
  `;

  db.query(sqlAlumnos, (err, result) => {
    if (err) {
      console.error('Error al leer registros de alumnos:', err);
      res.status(500).json({ error: 'Error al leer registros de alumnos' });
    } else {
      res.status(200).json(result);
    }
  });
});


router.get('/reporteEstadisticoDocentes', (req, res) => {
  const sqlDocentes = `
    SELECT 'Docente' AS Tipo, p.Genero, COUNT(*) AS Cantidad
    FROM docente d
    JOIN persona p ON d.ID_Persona = p.ID_Persona
    GROUP BY p.Genero;
  `;

  db.query(sqlDocentes, (err, result) => {
    if (err) {
      console.error('Error al leer registros de docentes:', err);
      res.status(500).json({ error: 'Error al leer registros de docentes' });
    } else {
      res.status(200).json(result);
    }
  });
});



router.get('/readReporteEstadis', (req, res) => {
  // Consulta SQL que une las cantidades de género de alumnos y docentes
  const sql = `
    SELECT 'Alumno' AS Tipo, p.Genero, COUNT(*) AS Cantidad
    FROM alumno a
    JOIN persona p ON a.ID_Persona = p.ID_Persona
    GROUP BY p.Genero

    UNION ALL

    SELECT 'Docente' AS Tipo, p.Genero, COUNT(*) AS Cantidad
    FROM docente d
    JOIN persona p ON d.ID_Persona = p.ID_Persona
    GROUP BY p.Genero;
  `;

  // Ejecuta la consulta
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error al leer registros de Personas:', err);
      res.status(500).json({ error: 'Error al leer registros de Personas' });
    } else {
      // Devuelve los registros en formato JSON como respuesta
      res.status(200).json(result);
    }
  });
});





  // Ruta para leer registros de alumnos y su información de persona
  router.get('/readAlumno', (req, res) => {
    // Utiliza la instancia de la base de datos pasada como parámetro
    // Realiza una consulta SQL para seleccionar los registros de Alumno junto con la información de Persona
    const sql = `
    SELECT 
  Alumno.ID_Alumno,
  Persona.ID_Persona,
  Persona.Nombres AS Alumno_Nombres,
  Persona.Apellidos AS Alumno_Apellidos,
  Persona.Fecha_Nacimiento AS Alumno_Fecha_Nacimiento,
  Persona.Direccion AS Alumno_Direccion,
  Persona.Genero AS Alumno_Genero,
  Persona.Telefono AS Alumno_Telefono,
  Tutor.Nombres AS Tutor_Nombres
FROM Alumno
INNER JOIN Persona ON Alumno.ID_Persona = Persona.ID_Persona
INNER JOIN Tutor ON Alumno.ID_Tutor = Tutor.ID_Tutor;
  `;

    // Ejecuta la consulta
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al leer registros de Alumnos:', err);
        res.status(500).json({ error: 'Error al leer registros de Alumnos' });
      } else {
        // Devuelve los registros en formato JSON como respuesta
        res.status(200).json(result);
      }
    });
  });


  router.post('/createAlumno', (req, res) => {
    // Recibe los datos del nuevo alumno desde el cuerpo de la solicitud (req.body)
    const {
      Nombres,
      Apellidos,
      Fecha_Nacimiento,
      Direccion,
      Genero,
      Telefono,
      ID_Tutor
    } = req.body;

    // Verifica si se proporcionaron los datos necesarios
    if (!Nombres || !Apellidos || !Fecha_Nacimiento || !Direccion || !Genero || !Telefono || !ID_Tutor ) {
      return res.status(400).json({ error: 'Los campos "Nombres", "Apellidos", "Fecha_Nacimiento", "Direccion", "Genero", "Telefono", "ID_Tutor"  son obligatorios' });
    }

    // Realiza la consulta SQL para insertar un nuevo registro en la tabla "Persona"
    const personaSql = `
      INSERT INTO Persona (Nombres, Apellidos, Fecha_Nacimiento, Direccion, Genero, Telefono)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const personaValues = [Nombres, Apellidos, Fecha_Nacimiento, Direccion, Genero, Telefono];

    // Ejecuta la consulta para insertar en la tabla "Persona"
    db.query(personaSql, personaValues, (err, personaResult) => {
      if (err) {
        console.error('Error al insertar registro de Persona:', err);
        res.status(500).json({ error: 'Error al insertar registro de Persona' });
      } else {
        const ID_Persona = personaResult.insertId; // Obtenemos el ID_Persona recién insertado

        // Realiza la consulta SQL para insertar un nuevo registro de Alumno
        const alumnoSql = `
          INSERT INTO Alumno (ID_Persona, ID_Tutor)
          VALUES (?, ?)
        `;

        const alumnoValues = [ID_Persona, ID_Tutor];

        // Ejecuta la consulta para insertar en la tabla "Alumno"
        db.query(alumnoSql, alumnoValues, (err, alumnoResult) => {
          if (err) {
            console.error('Error al insertar registro de Alumno:', err);
            res.status(500).json({ error: 'Error al insertar registro de Alumno' });
          } else {
            // Devuelve el ID del nuevo registro de Alumno como respuesta
            res.status(201).json({ ID_Alumno: alumnoResult.insertId });
          }
        });
      }
    });
  });


  

  router.put('/updateAlumno/:id_persona', (req, res) => {
    // Obtén el ID del registro a actualizar desde los parámetros de la URL
    const id_persona = req.params.id_persona;
  
    // Recibe los datos actualizados desde el cuerpo de la solicitud (req.body)
    const { nombres, apellidos, fecha_nacimiento, direccion, telefono } = req.body;
  
    // Verifica si se proporcionaron los datos necesarios
    if (!nombres || !apellidos || !fecha_nacimiento || !direccion || !telefono) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
  
    // Realiza la consulta SQL para actualizar el registro por ID en la tabla persona
    const sqlPersona = `
      UPDATE persona
      SET Nombres = ?, Apellidos = ?, Fecha_Nacimiento = ?, Direccion = ?, Telefono = ?
      WHERE ID_Persona = ?
    `;
  
    const valuesPersona = [nombres, apellidos, fecha_nacimiento, direccion, telefono, id_persona];
  
    // Ejecuta la primera consulta para actualizar persona
    db.query(sqlPersona, valuesPersona, (errPersona, resultPersona) => {
      if (errPersona) {
        console.error('Error al actualizar el registro en la tabla persona:', errPersona);
        res.status(500).json({ error: 'Error al actualizar el registro en la tabla persona' });
      } else {
        // Devuelve un mensaje de éxito
        res.status(200).json({ message: 'Registro actualizado con éxito' });
      }
    });
  });
  




router.delete('/deleteAlumnoPersona/:id_persona', (req, res) => {
  const idPersona = req.params.id_persona;

  // Iniciar una transacción
  db.beginTransaction((err) => {
    if (err) {
      console.error('Error al iniciar la transacción:', err);
      return res.status(500).json({ error: 'Error al eliminar el Alumno' });
    }

    // Realizar la eliminación en la tabla 
    const deleteAlumnoSQL = 'DELETE FROM Alumno WHERE ID_Persona = ?';
    db.query(deleteAlumnoSQL, [idPersona], (err, result) => {
      if (err) {
        db.rollback(() => {
          console.error('Error al eliminar el Alumno:', err);
          return res.status(500).json({ error: 'Error al eliminar el Alumno' });
        });
      }

      // Realizar la eliminación en la tabla Persona
      const deletePersonaSQL = 'DELETE FROM Persona WHERE ID_Persona = ?';
      db.query(deletePersonaSQL, [idPersona], (err, result) => {
        if (err) {
          db.rollback(() => {
            console.error('Error al eliminar la persona:', err);
            return res.status(500).json({ error: 'Error al eliminar la persona' });
          });
        }

        // Confirmar la transacción
        db.commit((err) => {
          if (err) {
            db.rollback(() => {
              console.error('Error al confirmar la transacción:', err);
              return res.status(500).json({ error: 'Error al eliminar el Alumno' });
            });
          }

          res.status(200).json({ message: 'Alumno eliminado con éxito' });
        });
      });
    });
  });
});



  // Ruta para obtener datos de ambas tablas Persona y Docente
  router.get('/readDocentePersona', (req, res) => {
    const sql = 'SELECT D.*, P.* FROM Docente D INNER JOIN Persona P ON D.ID_Persona = P.ID_Persona';

    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error al obtener los datos de Docente y Persona:', err);
        res.status(500).json({ error: 'Error al obtener los datos de Docente y Persona' });
      } else {
        res.json(results);
      }
    });
  });

  router.post('/createDocente', (req, res) => {
    // Recibe los datos del nuevo docente desde el cuerpo de la solicitud (req.body)
    const {
      Nombres,
      Apellidos,
      Fecha_Nacimiento,
      Direccion,
      Genero,
      Telefono,
      Correo,
      Especialidad
    } = req.body;

    // Verifica si se proporcionaron los datos necesarios
    if (!Nombres || !Apellidos || !Fecha_Nacimiento || !Direccion || !Genero || !Telefono || !Correo || !Especialidad) {
      return res.status(400).json({ error: 'Los campos "Nombres", "Apellidos", "Fecha_Nacimiento", "Direccion", "Genero", "Telefono", "Correo" y "Especialidad" son obligatorios' });
    }

    // Realiza la consulta SQL para insertar un nuevo registro en la tabla "Persona"
    const personaSql = `
        INSERT INTO Persona (Nombres, Apellidos, Fecha_Nacimiento, Direccion, Genero, Telefono)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    const personaValues = [Nombres, Apellidos, Fecha_Nacimiento, Direccion, Genero, Telefono];

    // Ejecuta la consulta para insertar en la tabla "Persona"
    db.query(personaSql, personaValues, (err, personaResult) => {
      if (err) {
        console.error('Error al insertar registro de Persona:', err);
        res.status(500).json({ error: 'Error al insertar registro de Persona' });
      } else {
        const ID_Persona = personaResult.insertId; // Obtenemos el ID_Persona recién insertado

        // Realiza la consulta SQL para insertar un nuevo registro de Docente
        const docenteSql = `
          INSERT INTO Docente (Correo, Especialidad, ID_Persona)
          VALUES (?, ?, ?)
        `;

        const docenteValues = [Correo, Especialidad, ID_Persona];

        // Ejecuta la consulta para insertar en la tabla "Docente"
        db.query(docenteSql, docenteValues, (err, docenteResult) => {
          if (err) {
            console.error('Error al insertar registro de Docente:', err);
            res.status(500).json({ error: 'Error al insertar registro de Docente' });
          } else {
            // Devuelve el ID del nuevo registro de Docente como respuesta
            res.status(201).json({ ID_Docente: docenteResult.insertId });
          }
        });
      }
    });
  });




  // Ruta para actualizar un registro existente por ID
  router.put('/updateDocente/:id_persona', (req, res) => {
    // Obtén el ID del registro a actualizar desde los parámetros de la URL
    const id_persona = req.params.id_persona;

    // Recibe los datos actualizados desde el cuerpo de la solicitud (req.body)
    const { Nombres, Apellidos, Fecha_Nacimiento, Direccion, Genero, Telefono, Correo, Especialidad } = req.body;

    // Verifica si se proporcionaron los datos necesarios
    if (!Nombres || !Apellidos || !Fecha_Nacimiento || !Direccion || !Genero || !Telefono || !Correo || !Especialidad) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Realiza la consulta SQL para actualizar el registro en la tabla Persona
    const sqlPersona = `
      UPDATE Persona
      SET Nombres = ?, Apellidos = ?, Fecha_Nacimiento = ?, Direccion = ?, Genero = ?, Telefono = ?
      WHERE ID_Persona = ?
    `;
    const valuesPersona = [Nombres, Apellidos, Fecha_Nacimiento, Direccion, Genero, Telefono, id_persona];

    // Ejecuta la consulta para actualizar en la tabla Persona
    db.query(sqlPersona, valuesPersona, (err, resultPersona) => {
      if (err) {
        console.error('Error al actualizar el registro en Persona:', err);
        return res.status(500).json({ error: 'Error al actualizar el registro en Persona' });
      }

      // Realiza la consulta SQL para actualizar el registro en la tabla Docente
      const sqlDocente = `
        UPDATE Docente
        SET Correo = ?, Especialidad = ?
        WHERE ID_Persona = ?
      `;
      const valuesDocente = [Correo, Especialidad, id_persona];

      // Ejecuta la consulta para actualizar en la tabla Docente
      db.query(sqlDocente, valuesDocente, (err, resultDocente) => {
        if (err) {
          console.error('Error al actualizar el registro en Docente:', err);
          return res.status(500).json({ error: 'Error al actualizar el registro en Docente' });
        }

        // Devuelve un mensaje de éxito
        res.status(200).json({ message: 'Registro actualizado con éxito' });
      });
    });
  });

  // Ruta para eliminar un docente por ID
  router.delete('/deleteDocentePersona/:id_persona', (req, res) => {
    const idPersona = req.params.id_persona;

    // Iniciar una transacción
    db.beginTransaction((err) => {
      if (err) {
        console.error('Error al iniciar la transacción:', err);
        return res.status(500).json({ error: 'Error al eliminar el docente' });
      }

      // Realizar la eliminación en la tabla Docente
      const deleteDocenteSQL = 'DELETE FROM Docente WHERE ID_Persona = ?';
      db.query(deleteDocenteSQL, [idPersona], (err, result) => {
        if (err) {
          db.rollback(() => {
            console.error('Error al eliminar el docente:', err);
            return res.status(500).json({ error: 'Error al eliminar el docente' });
          });
        }

        // Realizar la eliminación en la tabla Persona
        const deletePersonaSQL = 'DELETE FROM Persona WHERE ID_Persona = ?';
        db.query(deletePersonaSQL, [idPersona], (err, result) => {
          if (err) {
            db.rollback(() => {
              console.error('Error al eliminar la persona:', err);
              return res.status(500).json({ error: 'Error al eliminar la persona' });
            });
          }

          // Confirmar la transacción
          db.commit((err) => {
            if (err) {
              db.rollback(() => {
                console.error('Error al confirmar la transacción:', err);
                return res.status(500).json({ error: 'Error al eliminar el docente' });
              });
            }

            res.status(200).json({ message: 'Docente eliminado con éxito' });
          });
        });
      });
    });
  });



  // Ruta para actualizar un registro existente por ID
  router.put('/updateAlumno/:id_persona', (req, res) => {
    // Obtén el ID del registro a actualizar desde los parámetros de la URL
    const id_persona = req.params.id_persona;

    // Recibe los datos actualizados desde el cuerpo de la solicitud (req.body)
    const { nombres, apellidos, fecha_nacimiento, direccion, genero, telefono, id_docente, correo, especialidad } = req.body;

    // Verifica si se proporcionaron los datos necesarios
    if (!nombres || !apellidos || !fecha_nacimiento || !direccion || !genero || !telefono || !id_docente || !correo || !especialidad) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Realiza la consulta SQL para actualizar el registro por ID
    const sql = `
        UPDATE persona
        SET Nombres = ?, Apellidos = ?, Fecha_Nacimiento = ?, Direccion = ?, Genero = ?, Telefono = ?
        WHERE ID_Persona = ?
        UPDATE docente
        SET ID_Docente = ?, Correo = ?, Especialidad = ?
        WHERE ID_Docente = ?
      `;

    const values = [nombres, apellidos, fecha_nacimiento, direccion, genero, telefono, id_docente, correo, especialidad, id_persona];

    // Ejecuta la consulta
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al actualizar el registro:', err);
        res.status(500).json({ error: 'Error al actualizar el registro' });
      } else {
        // Devuelve un mensaje de éxito
        res.status(200).json({ message: 'Registro actualizado con éxito' });
      }
    });
  });

  // Ruta para eliminar un registro con ID_Docente
  router.delete('/deleteDocente/:id_persona', (req, res) => {
    // Obtén el ID del registro a eliminar desde los parámetros de la URL
    const id_persona = req.params.id_persona;

    // Realiza la consulta SQL para eliminar el registro por ID
    const sql = 'DELETE FROM docente WHERE ID_Persona = ?';

    // Ejecuta la consulta
    db.query(sql, [id_persona], (err, result) => {
      if (err) {
        console.error('Error al eliminar el registro:', err);
        res.status(500).json({ error: 'Error al eliminar el registro' });
      } else {
        // Devuelve un mensaje de éxito
        res.status(200).json({ message: 'Registro eliminado con éxito' });
      }
    });
  });

  //Ruta para leer registros de asignatura
  router.get('/readAsignatura', (req, res) => {

    //Utiliza la instancia de la base de datos pasada como parametro
    //Realizar una consulta SQL para seleccionar todos los registros
    const sql = 'Select * From asignatura';

    //Ejecutar la consulta
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al leer registros:', err);
        res.status(500).json({ error: 'Error al leer registros' });
      } else {
        //Devolver los registros en formato JSON como respuestas
        res.status(200).json(result);
      }
    });
  });
  
// Ruta para crear un nuevo registro de docente
router.post('/createAsignatura', (req, res) => {
  // Recibe los datos del nuevo registro desde el cuerpo de la solicitud (req.body)
  const { Nombre_Asignatura, Horario, ID_Docente } = req.body;

  // Verifica si se proporcionaron los datos necesarios
  if (!Nombre_Asignatura || !Horario || !ID_Docente) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  // Realiza la consulta SQL para insertar un nuevo registro Asignatura
  const sql = `INSERT INTO asignatura (Nombre_Asignatura, Horario, ID_Docente) VALUES (?, ?, ?)`;
  const values = [Nombre_Asignatura, Horario, ID_Docente];

  // Ejecuta la consulta
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error al insertar registro:', err);
      res.status(500).json({ error: 'Error al insertar registro' });
    } else {
      const ID_Asignatura = result.insertId; // Corregir aquí: result.insertId
      // Devuelve el ID del nuevo registro como respuesta
      res.status(201).json({ insertId: ID_Asignatura }); // Corregir aquí: insertId
    }
  });
});

  
// Ruta para actualizar un registro existente de Asignatura por ID
router.put('/updateAsignatura/:id_asignatura', (req, res) => {
  // Obtén el ID del registro a actualizar desde los parámetros de la URL
  const id_asignatura = req.params.id_asignatura;

  // Recibe los datos actualizados desde el cuerpo de la solicitud (req.body)
  const { Nombre_Asignatura, Horario, ID_Docente } = req.body;

  // Verifica si se proporcionaron los datos necesarios
  if (!Nombre_Asignatura || !Horario || !ID_Docente) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  // Realiza la consulta SQL para actualizar el registro por ID
  const sql = `
    UPDATE asignatura
    SET Nombre_Asignatura = ?, Horario = ?, ID_Docente = ?
    WHERE ID_Asignatura = ?
  `;

  const values = [Nombre_Asignatura, Horario, ID_Docente, id_asignatura];

  // Ejecuta la consulta
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error al actualizar el registro:', err);
      res.status(500).json({ error: 'Error al actualizar el registro' });
    } else {
      // Devuelve un mensaje de éxito
      res.status(200).json({ message: 'Registro actualizado con éxito' });
    }
  });
});


  // Ruta para eliminar un registro con ID_Asignatura
  router.delete('/deleteAsignatura/:id_asignatura', (req, res) => {
    // Obtén el ID del registro a eliminar desde los parámetros de la URL
    const id_asignatura = req.params.id_asignatura;

    // Realiza la consulta SQL para eliminar el registro por ID
    const sql = 'DELETE FROM asignatura WHERE ID_Asignatura = ?';

    // Ejecuta la consulta
    db.query(sql, [id_asignatura], (err, result) => {
      if (err) {
        console.error('Error al eliminar el registro:', err);
        res.status(500).json({ error: 'Error al eliminar el registro' });
      } else {
        // Devuelve un mensaje de éxito
        res.status(200).json({ message: 'Registro eliminado con éxito' });
      }
    });
  });

// Ruta para obtener todos los registros de Calificacion
router.get('/VerCalificaciones', (req, res) => {
  // Nombre del procedimiento almacenado
  const storedProcedure = 'VerCalificacionesConNombres';

  // Llama al procedimiento almacenado
  db.query(`CALL ${storedProcedure}`, (err, result) => {
      if (err) {
          console.error(`Error al ejecutar el procedimiento almacenado ${storedProcedure}:`, err);
          res.status(500).json({ error: `Error al ejecutar el procedimiento almacenado ${storedProcedure}` });
      } else {
          // Devolver los registros en formato JSON como respuesta
          res.status(200).json(result[0]); // Los resultados están en el primer elemento del array result
      }
  });
});

// Ruta para crear una nueva calificación
router.post('/createCalificacion', (req, res) => {
  console.log(req.body);  // Agrega esta línea para imprimir en la consola del servidor

  // Recibe los datos de la nueva calificación desde el cuerpo de la solicitud (req.body)
  const { p_Calificacion_Obtenida, p_Fecha_Calificacion, p_ID_Alumno, p_ID_Asignatura, p_Corte_Evaluativo } = req.body;

  // Verifica si todos los campos necesarios están presentes
  if (!(p_Calificacion_Obtenida && p_Fecha_Calificacion && p_ID_Alumno && p_ID_Asignatura && p_Corte_Evaluativo)) {
      console.error('Datos recibidos:', req.body);  // Agrega esta línea para imprimir en la consola del servidor
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  // Nombre del procedimiento almacenado
  const storedProcedure = 'RegistrarCalificacion';

  // Llama al procedimiento almacenado
  db.query(
      `CALL ${storedProcedure}(?, ?, ?, ?, ?)`,
      [p_Calificacion_Obtenida, p_Fecha_Calificacion, p_ID_Alumno, p_ID_Asignatura, p_Corte_Evaluativo],
      (err, result) => {
          if (err) {
              console.error(`Error al ejecutar el procedimiento almacenado ${storedProcedure}:`, err);
              res.status(500).json({ error: `Error al ejecutar el procedimiento almacenado ${storedProcedure}` });
          } else {
              // Devuelve un mensaje de éxito
              res.status(200).json({ message: 'Calificación registrada exitosamente' });
          }
      }
  );
});


// Ruta para actualizar una calificación
router.put('/updateCalificacion/:ID_Calificacion', (req, res) => {
  // Obtén el ID de la calificación a actualizar desde los parámetros de la URL
  const ID_Calificacion = req.params.ID_Calificacion;

  // Recibe los datos actualizados desde el cuerpo de la solicitud (req.body)
  const { Calificacion_Obtenida, Fecha_Calificacion, Corte_Evaluativo } = req.body;

  // Verifica si se proporcionaron los datos necesarios
  if (!Calificacion_Obtenida || !Fecha_Calificacion || !Corte_Evaluativo) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  // Nombre del procedimiento almacenado
  const storedProcedure = 'ActualizarCalificacion';

  // Llama al procedimiento almacenado
  db.query(
      `CALL ${storedProcedure}(?, ?, ?, ?)`,
      [ID_Calificacion, Calificacion_Obtenida, Fecha_Calificacion, Corte_Evaluativo],
      (err, result) => {
          if (err) {
              console.error(`Error al ejecutar el procedimiento almacenado ${storedProcedure}:`, err);
              res.status(500).json({ error: `Error al ejecutar el procedimiento almacenado ${storedProcedure}` });
          } else {
              // Devuelve un mensaje de éxito
              res.status(200).json({ message: 'Calificación actualizada exitosamente' });
          }
      }
  );
});



  // Ruta para eliminar una calificación
router.delete('/deleteCalificacion/:ID_Calificacion', (req, res) => {
  // Obtén el ID de la calificación a eliminar desde los parámetros de la URL
  const ID_Calificacion = req.params.ID_Calificacion;

  // Nombre del procedimiento almacenado
  const storedProcedure = 'EliminarCalificacion';

  // Llama al procedimiento almacenado
  db.query(`CALL ${storedProcedure}(?)`, [ID_Calificacion], (err, result) => {
      if (err) {
          console.error(`Error al ejecutar el procedimiento almacenado ${storedProcedure}:`, err);
          res.status(500).json({ error: `Error al ejecutar el procedimiento almacenado ${storedProcedure}` });
      } else {
          // Devuelve un mensaje de éxito
          res.status(200).json({ message: 'Calificación eliminada exitosamente' });
      }
  });
});

  //Ruta para leer registros de grado
  router.get('/readGrado', (req, res) => {

    //Utiliza la instancia de la base de datos pasada como parametro
    //Realizar una consulta SQL para seleccionar todos los registros
    const sql = 'Select * From grado';

    //Ejecutar la consulta
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al leer registros:', err);
        res.status(500).json({ error: 'Error al leer registros' });
      } else {
        //Devolver los registros en formato JSON como respuestas
        res.status(200).json(result);
      }
    });
  });





  // Ruta para crear un nuevo registro de tutor
  router.post('/createGrado', (req, res) => {
    // Recibe los datos del nuevo registro desde el cuerpo de la solicitud (req.body)
    const { ID_Grado, cant_estudiante, plan_estudio } = req.body;

    // Verifica si se proporcionaron los datos necesarios
    if (!ID_Grado || !cant_estudiante || !plan_estudio) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Realiza la consulta SQL para insertar un nuevo registro Asignatura
    const sqlgrado = `INSERT INTO grado ( ID_Grado, cant_estudiante, plan_estudio) VALUES (?, ?, ?)`;
    const valuesgrado = [ID_Grado, cant_estudiante, plan_estudio];

    // Ejecuta la consulta
    db.query(sqlgrado, valuesgrado, (err, resultgrado) => {
      if (err) {
        console.error('Error al insertar registro:', err);
        res.status(500).json({ error: 'Error al insertar registro' });
      } else {
        // Devuelve el ID del nuevo registro como respuesta
        res.status(201).json({ ID_Grado: resultgrado.insertId });
      }
    });
  });







  // Ruta para actualizar un registro existente por ID
  router.put('/updategrado/:id_grado', (req, res) => {
    // Obtén el ID del registro a actualizar desde los parámetros de la URL
    const id_grado = req.params.id_grado;

    // Recibe los datos actualizados desde el cuerpo de la solicitud (req.body)
    const { cant_estudiante, plan_estudio } = req.body;

    // Verifica si se proporcionaron los datos necesarios
    if (!cant_estudiante || !plan_estudio) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Realiza la consulta SQL para actualizar el registro por ID
    const sql = `
    UPDATE grado
    SET Cant_Estudiante = ?, Plan_Estudio = ?
    WHERE ID_Grado = ?
  `;

    const values = [cant_estudiante, plan_estudio, id_grado];

    // Ejecuta la consulta
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al actualizar el registro:', err);
        res.status(500).json({ error: 'Error al actualizar el registro' });
      } else {
        // Devuelve un mensaje de éxito
        res.status(200).json({ message: 'Registro actualizado con éxito' });
      }
    });
  });

  // Ruta para eliminar un registro con ID_Grado
  router.delete('/deleteGrado/:id_grado', (req, res) => {
    // Obtén el ID del registro a eliminar desde los parámetros de la URL
    const id_grado = req.params.id_grado;

    // Realiza la consulta SQL para eliminar el registro por ID
    const sql = 'DELETE FROM grado WHERE ID_Grado = ?';

    // Ejecuta la consulta
    db.query(sql, [id_grado], (err, result) => {
      if (err) {
        console.error('Error al eliminar el registro:', err);
        res.status(500).json({ error: 'Error al eliminar el registro' });
      } else {
        // Devuelve un mensaje de éxito
        res.status(200).json({ message: 'Registro eliminado con éxito' });
      }
    });
  });

  // Ruta para leer registros de tutor
  router.get('/readTutor', (req, res) => {
    // Realiza una consulta SQL para seleccionar todos los registros de la tabla "tutor"
    const sql = 'SELECT * FROM tutor';

    // Ejecuta la consulta
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error al leer registros:', err);
        return res.status(500).json({ error: 'Error al leer registros' });
      }

      // Devuelve los registros en formato JSON como respuesta
      res.status(200).json(results);
    });
  });


  // Ruta para crear un nuevo registro de tutor
  router.post('/createTutor', (req, res) => {
    // Recibe los datos del nuevo registro desde el cuerpo de la solicitud (req.body)
    const { Nombres, Telefono } = req.body;

    // Verifica si se proporcionaron los datos necesarios
    if (!Nombres || !Telefono) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Realiza la consulta SQL para insertar un nuevo registro Asignatura
    const sqlTutor = `INSERT INTO Tutor ( Nombres, Telefono) VALUES (?, ?)`;
    const valuesTutor = [Nombres, Telefono];

    // Ejecuta la consulta
    db.query(sqlTutor, valuesTutor, (err, resultTutor) => {
      if (err) {
        console.error('Error al insertar registro:', err);
        res.status(500).json({ error: 'Error al insertar registro' });
      } else {
        // Devuelve el ID del nuevo registro como respuesta
        res.status(201).json({ ID_Tutor: resultTutor.insertId });
      }
    });
  });

  // Ruta para actualizar un registro existente por ID
  router.put('/updateTutor/:id_tutor', (req, res) => {
    // Obtén el ID del registro a actualizar desde los parámetros de la URL
    const id_tutor = req.params.id_tutor;

    // Recibe los datos actualizados desde el cuerpo de la solicitud (req.body)
    const { Nombres, Telefono } = req.body;

    // Verifica si se proporcionaron los datos necesarios
    if (!Nombres || !Telefono) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Realiza la consulta SQL para actualizar el registro por ID
    const sql = `
    UPDATE tutor
    SET Nombres = ?, Telefono = ?
    WHERE ID_Tutor = ?
  `;

    const values = [Nombres, Telefono, id_tutor];

    // Ejecuta la consulta
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al actualizar el registro:', err);
        res.status(500).json({ error: 'Error al actualizar el registro' });
      } else {

        // Devuelve un mensaje de éxito
        res.status(200).json({ message: 'Registro actualizado con éxito' });
      }
    });
  });


  // Ruta para eliminar un registro de tutor por ID
  router.delete('/deleteTutor/:ID_Tutor', (req, res) => {
    const idTutor = req.params.ID_Tutor; // Obtiene el ID del tutor de los parámetros de la URL

    // Consulta SQL para eliminar el tutor por ID
    const sql = 'DELETE FROM Tutor WHERE ID_Tutor = ?';

    // Ejecuta la consulta SQL
    db.query(sql, [idTutor], (err, result) => {
      if (err) {
        console.error('Error al eliminar el tutor:', err);
        res.status(500).json({ error: 'Error al eliminar el tutor' });
      } else {
        if (result.affectedRows > 0) {
          // El tutor se eliminó con éxito
          res.status(200).json({ message: 'Tutor eliminado con éxito' });
        } else {
          // No se encontró un tutor con ese ID
          res.status(404).json({ error: 'Tutor no encontrado' });
        }
      }
    });
  });

   // Ruta para leer registros de pago colegiatura
router.get('/readPagoColegiatura', (req, res) => {
  // Realizar una consulta SQL para seleccionar todos los registros con nombres y apellidos del alumno
  const sql = `
    SELECT
      PagoColegiatura.ID_Pago,
      PagoColegiatura.Monto,
      PagoColegiatura.Fecha_Pago,
      Alumno.ID_Alumno,
      CONCAT(Persona.Nombres, ' ', Persona.Apellidos) AS NombreAlumno
    FROM
      PagoColegiatura
    JOIN
      Alumno ON PagoColegiatura.ID_Alumno = Alumno.ID_Alumno
    JOIN
      Persona ON Alumno.ID_Persona = Persona.ID_Persona;
  `;

  // Ejecutar la consulta
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error al leer registros:', err);
      res.status(500).json({ error: 'Error al leer registros' });
    } else {
      // Devolver los registros en formato JSON como respuestas
      res.status(200).json(result);
    }
  });
});

// Ruta para crear un nuevo registro de pago colegiatura
router.post('/createPagoColegiatura', (req, res) => {
  // Recibe los datos del nuevo registro desde el cuerpo de la solicitud (req.body)
  const { Monto, Fecha_Pago, ID_Alumno } = req.body;

  // Verifica si se proporcionaron los datos necesarios
  if (!Monto || !Fecha_Pago || !ID_Alumno) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  // Realiza la consulta SQL para insertar un nuevo registro Asignatura
  const sql = `INSERT INTO pagocolegiatura ( Monto, Fecha_Pago, ID_Alumno) VALUES ( ?, ?, ?)`;
  const values = [Monto, Fecha_Pago, ID_Alumno];

  // Ejecuta la consulta
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error al insertar registro:', err);
      res.status(500).json({ error: 'Error al insertar registro' });
    } else {
      // Devuelve el ID del nuevo registro como respuesta
      const ID_Pago = result.insertId; // Aquí obtenemos el ID del nuevo registro
      res.status(201).json({ ID_Pago });
    }
  });
});


  // Ruta para actualizar un registro existente por ID
  router.put('/updatePagoColegiatura/:id_pago', (req, res) => {
    // Obtén el ID del registro a actualizar desde los parámetros de la URL
    const id_pago = req.params.id_pago;

    // Recibe los datos actualizados desde el cuerpo de la solicitud (req.body)
    const { monto, fecha_pago, id_alumno } = req.body;

    // Verifica si se proporcionaron los datos necesarios
    if (!monto || !fecha_pago || !id_alumno) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Realiza la consulta SQL para actualizar el registro por ID
    const sql = `
    UPDATE pagocolegiatura
    SET Monto = ?, Fecha_Pago = ?, ID_Alumno = ?
    WHERE ID_Pago = ?
  `;

    const values = [monto, fecha_pago, id_alumno, id_pago];

    // Ejecuta la consulta
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al actualizar el registro:', err);
        res.status(500).json({ error: 'Error al actualizar el registro' });
      } else {
        // Devuelve un mensaje de éxito
        res.status(200).json({ message: 'Registro actualizado con éxito' });
      }
    });
  });



  // Ruta para eliminar un registro con ID_Pago
  router.delete('/deletePagoColegiatura/:id_pago', (req, res) => {
    // Obtén el ID del registro a eliminar desde los parámetros de la URL
    const id_pago = req.params.id_pago;

    // Realiza la consulta SQL para eliminar el registro por ID
    const sql = 'DELETE FROM pagocolegiatura WHERE ID_Pago = ?';

    // Ejecuta la consulta
    db.query(sql, [id_pago], (err, result) => {
      if (err) {
        console.error('Error al eliminar el registro:', err);
        res.status(500).json({ error: 'Error al eliminar el registro' });
      } else {
        // Devuelve un mensaje de éxito
        res.status(200).json({ message: 'Registro eliminado con éxito' });
      }
    });
  });

  // Ruta para leer registros de matrícula
router.get('/readMatricula', (req, res) => {
  // Realizar una consulta SQL para seleccionar todos los registros con el nombre completo del alumno
  const sql = `
    SELECT M.ID_Matricula, M.Anio_Escolar, M.ID_Grado, M.Tipo_Matricula, CONCAT(P.Nombres, ' ', P.Apellidos) AS NombreCompleto
    FROM Matricula M
    JOIN Alumno A ON M.ID_Alumno = A.ID_Alumno
    JOIN Persona P ON A.ID_Persona = P.ID_Persona
  `;

  // Ejecutar la consulta
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error al leer registros:', err);
      res.status(500).json({ error: 'Error al leer registros' });
    } else {
      // Devolver los registros en formato JSON como respuesta
      res.status(200).json(result);
    }
  });
});





  // Ruta para leer registros
  router.get('/ComboGrado', (reg, res) => {



    const sql = 'select ID_Grado from Grado';


    // Ejecutar la consulta
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al leer registro:', err);
        res.status(500).json({ error: 'Error al leer registros' });
      } else {
        // Devolver los registros en formato JSON como respuesta
        res.status(200).json(result);
      }
    });
  });




  // Ruta para crear un nuevo registro de matricula
  router.post('/createMatricula', (req, res) => {
    // Recibe los datos del nuevo registro desde el cuerpo de la solicitud (req.body)
    const {  Anio_Escolar, ID_Grado, Tipo_Matricula,ID_Alumno } = req.body;

    // Verifica si se proporcionaron los datos necesarios
    if (!Anio_Escolar || !ID_Grado || !Tipo_Matricula) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Realiza la consulta SQL para insertar un nuevo registro matricula
    const sql = `INSERT INTO matricula ( Anio_Escolar, ID_Grado, Tipo_Matricula,ID_Alumno) VALUES ( ?, ?, ?, ?)`;
    const values = [ Anio_Escolar, ID_Grado, Tipo_Matricula,ID_Alumno];

    // Ejecuta la consulta
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al insertar registro:', err);
        res.status(500).json({ error: 'Error al insertar registro' });
      } else {
        const ID_Matricula = result.insertId;
        // Devuelve el ID del nuevo registro como respuesta
        res.status(201).json({ ID_Matricula });
      }
    });
  });




  // Ruta para actualizar un registro existente de Asignatura por ID
  router.put('/updateMatricula/:id_matricula', (req, res) => {
    // Obtén el ID del registro a actualizar desde los parámetros de la URL
    const id_matricula = req.params.id_matricula;

    // Recibe los datos actualizados desde el cuerpo de la solicitud (req.body)
    const { anio_escolar, id_grado, tipo_matricula } = req.body;

    // Verifica si se proporcionaron los datos necesarios
    if (!anio_escolar || !id_grado || !tipo_matricula) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Realiza la consulta SQL para actualizar el registro por ID
    const sql = `
    UPDATE matricula
    SET Anio_Escolar = ?, ID_Grado = ?, Tipo_Matricula = ?
    WHERE ID_Matricula = ?
  `;

    const values = [anio_escolar, id_grado, tipo_matricula, id_matricula];

    // Ejecuta la consulta
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al actualizar el registro:', err);
        res.status(500).json({ error: 'Error al actualizar el registro' });
      } else {
        // Devuelve un mensaje de éxito
        res.status(200).json({ message: 'Registro actualizado con éxito' });
      }
    });
  });

  // Ruta para eliminar un registro con ID_Matricula
  router.delete('/deleteMatricula/:id_matricula', (req, res) => {
    // Obtén el ID del registro a eliminar desde los parámetros de la URL
    const id_matricula = req.params.id_matricula;

    // Realiza la consulta SQL para eliminar el registro por ID
    const sql = 'DELETE FROM matricula WHERE ID_Matricula = ?';

    // Ejecuta la consulta
    db.query(sql, [id_matricula], (err, result) => {
      if (err) {
        console.error('Error al eliminar el registro:', err);
        res.status(500).json({ error: 'Error al eliminar el registro' });
      } else {
        // Devuelve un mensaje de éxito
        res.status(200).json({ message: 'Registro eliminado con éxito' });
      }
    });
  });




  // Ruta para leer registros de alumnos y su información de persona
  router.get('/readReporte', (req, res) => {
    // Utiliza la instancia de la base de datos pasada como parámetro
    // Realiza una consulta SQL para seleccionar los registros de Alumno junto con la información de Persona
    const sql = `
    SELECT G.ID_Grado, G.Cant_Estudiante
FROM Grado G
LEFT JOIN Matricula M ON G.ID_Grado = M.ID_Grado
GROUP BY G.ID_Grado, G.Cant_Estudiante;

  `;

    // Ejecuta la consulta
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al leer registros de Alumnos:', err);
        res.status(500).json({ error: 'Error al leer registros de Alumnos' });
      } else {
        // Devuelve los registros en formato JSON como respuesta
        res.status(200).json(result);
      }
    });
  });


  //Otras rutas CRUD
  return router;
};