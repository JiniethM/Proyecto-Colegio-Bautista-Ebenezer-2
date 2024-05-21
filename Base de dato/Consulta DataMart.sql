
Use bd_cbe_DM1;


-- Calificaciones promedio por alumno

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
    
    
    
    
-- Calificaciones promedio por asignatura

SELECT 
    asig.Nombre_Asignatura,
    AVG(h.Calificacion_Obtenida) AS Promedio_Calificacion
FROM 
    Hecho_RendimientoAcademico h
JOIN 
    Dim_Asignatura asig ON h.ID_Asignatura = asig.ID_Asignatura
GROUP BY 
    asig.Nombre_Asignatura;
    
    
    
    
    
-- Calificaciones promedio por grado
    
    
    SELECT 
    g.Plan_Estudio,
    AVG(h.Calificacion_Obtenida) AS Promedio_Calificacion
FROM 
    Hecho_RendimientoAcademico h
JOIN 
    Dim_Grado g ON h.ID_Grado = g.ID_Grado
GROUP BY 
    g.Plan_Estudio;
    
    
    
    
-- Calificaciones promedio por docente
    
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
    
    
    
    
    
-- Calificaciones promedio por fecha ----
    
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
    
    
    
    
    
--  Calificaciones totales por alumno en un año específico

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
    f.Año = 2023
GROUP BY 
    a.Nombres, a.Apellidos;
    
    
    
    
    
    
-- Calificaciones totales por asignatura en un mes y año específicos
  
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
    f.Año = 2023 AND f.Mes = 5
GROUP BY 
    asig.Nombre_Asignatura;





-- Top 5 alumnos con mejores calificaciones


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





-- Top 5 asignaturas con mejores calificaciones

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

