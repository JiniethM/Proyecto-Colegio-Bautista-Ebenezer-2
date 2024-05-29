const express = require('express');
const router = express.Router();

module.exports = (db) => {

  // Ruta para obtener calificaciones promedio por alumno
  router.get('/calificacionesPromedioAlumno', (req, res) => {
    const sql = `
      SELECT 
        a.Nombres,
        a.Apellidos,
        AVG(h.Calificacion_Obtenida) AS Promedio_Calificacion
      FROM 
        Hecho_RendimientoAcademico h
      JOIN 
        Dim_Alumno a ON h.ID_Alumno = a.ID_Alumno
      GROUP BY 
        a.Nombres, a.Apellidos;
    `;

    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al obtener calificaciones promedio por alumno:', err);
        res.status(500).json({ error: 'Error al obtener calificaciones promedio por alumno' });
      } else {
        res.status(200).json(result);
      }
    });
  });

  // Ruta para obtener calificaciones promedio por asignatura
  router.get('/calificacionesPromedioAsignatura', (req, res) => {
    const sql = `
      SELECT 
        asig.Nombre_Asignatura,
        AVG(h.Calificacion_Obtenida) AS Promedio_Calificacion
      FROM 
        Hecho_RendimientoAcademico h
      JOIN 
        Dim_Asignatura asig ON h.ID_Asignatura = asig.ID_Asignatura
      GROUP BY 
        asig.Nombre_Asignatura;
    `;

    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al obtener calificaciones promedio por asignatura:', err);
        res.status(500).json({ error: 'Error al obtener calificaciones promedio por asignatura' });
      } else {
        res.status(200).json(result);
      }
    });
  });

  // Ruta para obtener calificaciones promedio por grado
  router.get('/calificacionesPromedioGrado', (req, res) => {
    const sql = `
      SELECT 
        g.Plan_Estudio,
        AVG(h.Calificacion_Obtenida) AS Promedio_Calificacion
      FROM 
        Hecho_RendimientoAcademico h
      JOIN 
        Dim_Grado g ON h.ID_Grado = g.ID_Grado
      GROUP BY 
        g.Plan_Estudio;
    `;

    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al obtener calificaciones promedio por grado:', err);
        res.status(500).json({ error: 'Error al obtener calificaciones promedio por grado' });
      } else {
        res.status(200).json(result);
      }
    });
  });

  // Ruta para obtener calificaciones promedio por docente
  router.get('/calificacionesPromedioDocente', (req, res) => {
    const sql = `
      SELECT 
        d.Nombres,
        d.Apellidos,
        AVG(h.Calificacion_Obtenida) AS Promedio_Calificacion
      FROM 
        Hecho_RendimientoAcademico h
      JOIN 
        Dim_Docente d ON h.ID_Docente = d.ID_Docente
      GROUP BY 
        d.Nombres, d.Apellidos;
    `;

    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al obtener calificaciones promedio por docente:', err);
        res.status(500).json({ error: 'Error al obtener calificaciones promedio por docente' });
      } else {
        res.status(200).json(result);
      }
    });
  });

  // Ruta para obtener calificaciones promedio por fecha
  router.get('/calificacionesPromedioFecha', (req, res) => {
    const sql = `
      SELECT 
        f.Dia,
        f.Mes,
        f.Año,
        AVG(h.Calificacion_Obtenida) AS Promedio_Calificacion
      FROM 
        Hecho_RendimientoAcademico h
      JOIN 
        Dim_Fecha f ON h.ID_Fecha = f.ID_Fecha
      GROUP BY 
        f.Dia, f.Mes, f.Año;
    `;

    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al obtener calificaciones promedio por fecha:', err);
        res.status(500).json({ error: 'Error al obtener calificaciones promedio por fecha' });
      } else {
        res.status(200).json(result);
      }
    });
  });

  // Ruta para obtener calificaciones totales por alumno en un año específico
  router.get('/calificacionesTotalesAlumno/:year', (req, res) => {
    const { year } = req.params;
    const sql = `
      SELECT 
        a.Nombres,
        a.Apellidos,
        SUM(h.Calificacion_Obtenida) AS Total_Calificacion
      FROM 
        Hecho_RendimientoAcademico h
      JOIN 
        Dim_Alumno a ON h.ID_Alumno = a.ID_Alumno
      JOIN 
        Dim_Fecha f ON h.ID_Fecha = f.ID_Fecha
      WHERE 
        f.Año = ?
      GROUP BY 
        a.Nombres, a.Apellidos;
    `;

    db.query(sql, [year], (err, result) => {
      if (err) {
        console.error('Error al obtener calificaciones totales por alumno en un año específico:', err);
        res.status(500).json({ error: 'Error al obtener calificaciones totales por alumno en un año específico' });
      } else {
        res.status(200).json(result);
      }
    });
  });

  // Ruta para obtener calificaciones totales por asignatura en un mes y año específicos
  router.get('/calificacionesTotalesAsignatura/:year/:month', (req, res) => {
    const { year, month } = req.params;
    const sql = `
      SELECT 
        asig.Nombre_Asignatura,
        SUM(h.Calificacion_Obtenida) AS Total_Calificacion
      FROM 
        Hecho_RendimientoAcademico h
      JOIN 
        Dim_Asignatura asig ON h.ID_Asignatura = asig.ID_Asignatura
      JOIN 
        Dim_Fecha f ON h.ID_Fecha = f.ID_Fecha
      WHERE 
        f.Año = ? AND f.Mes = ?
      GROUP BY 
        asig.Nombre_Asignatura;
    `;

    db.query(sql, [year, month], (err, result) => {
      if (err) {
        console.error('Error al obtener calificaciones totales por asignatura en un mes y año específicos:', err);
        res.status(500).json({ error: 'Error al obtener calificaciones totales por asignatura en un mes y año específicos' });
      } else {
        res.status(200).json(result);
      }
    });
  });

  // Ruta para obtener los top 5 alumnos con mejores calificaciones
  router.get('/top5Alumnos', (req, res) => {
    const sql = `
      SELECT 
        a.Nombres,
        a.Apellidos,
        AVG(h.Calificacion_Obtenida) AS Promedio_Calificacion
      FROM 
        Hecho_RendimientoAcademico h
      JOIN 
        Dim_Alumno a ON h.ID_Alumno = a.ID_Alumno
      GROUP BY 
        a.Nombres, a.Apellidos
      ORDER BY 
        Promedio_Calificacion DESC
      LIMIT 5;
    `;

    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al obtener los top 5 alumnos con mejores calificaciones:', err);
        res.status(500).json({ error: 'Error al obtener los top 5 alumnos con mejores calificaciones' });
      } else {
        res.status(200).json(result);
      }
    });
  });

  // Ruta para obtener las top 5 asignaturas con mejores calificaciones
  router.get('/top5Asignaturas', (req, res) => {
    const sql = `
      SELECT 
        asig.Nombre_Asignatura,
        AVG(h.Calificacion_Obtenida) AS Promedio_Calificacion
      FROM 
        Hecho_RendimientoAcademico h
      JOIN 
        Dim_Asignatura asig ON h.ID_Asignatura = asig.ID_Asignatura
      GROUP BY 
        asig.Nombre_Asignatura
      ORDER BY 
        Promedio_Calificacion DESC
      LIMIT 5;
    `;

    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error al obtener las top 5 asignaturas con mejores calificaciones:', err);
        res.status(500).json({ error: 'Error al obtener las top 5 asignaturas con mejores calificaciones' });
      } else {
        res.status(200).json(result);
      }
    });
  });

  return router;
};
