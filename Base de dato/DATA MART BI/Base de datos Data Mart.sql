CREATE DATABASE bd_cbe_DM1;

Use bd_cbe_DM1;


-- Creación de la Tabla Alumno
CREATE TABLE Dim_Alumno (
  ID_Alumno INT PRIMARY KEY,
  Nombres VARCHAR(50),
  Apellidos VARCHAR(50),
  Fecha_Nacimiento DATE
);

-- Creación de la Tabla Asignatura
CREATE TABLE Dim_Asignatura (
  ID_Asignatura INT  PRIMARY KEY,
  Nombre_Asignatura VARCHAR(50)
);


-- Creación de la Tabla Grado
CREATE TABLE Dim_Grado (
  ID_Grado INT  PRIMARY KEY,
  Cant_Estudiante INT,
  Plan_Estudio VARCHAR(100)
);

-- Creación de la Tabla Fecha
CREATE TABLE Dim_Fecha (
  ID_Fecha INT PRIMARY KEY,
  Dia INT,
  Mes INT,
  Año INT
);




CREATE TABLE Dim_Docente (
  ID_Docente INT  PRIMARY KEY,
  Nombres VARCHAR(50),
  Apellidos VARCHAR(50),
  Especialidad VARCHAR(50)
);


CREATE TABLE Hecho_RendimientoAcademico (
  ID_Hecho_Rendimiento INT AUTO_INCREMENT PRIMARY KEY,
  ID_Alumno INT NOT NULL,
  ID_Asignatura INT NOT NULL,
  ID_Grado INT NOT NULL,
  ID_Docente INT NOT NULL,
  ID_Fecha INT NOT NULL,
  Calificacion_Obtenida double,
  Corte_Evaluativo VARCHAR(50)
);

-- Relación entre la tabla hecho y Alumno
ALTER TABLE Hecho_RendimientoAcademico
ADD CONSTRAINT FK_Hecho_Alumno
FOREIGN KEY (ID_Alumno) REFERENCES Dim_Alumno(ID_Alumno);

-- Relación entre la tabla hecho y Asignatura
ALTER TABLE Hecho_RendimientoAcademico
ADD CONSTRAINT FK_Hecho_Asignatura
FOREIGN KEY (ID_Asignatura) REFERENCES Dim_Asignatura(ID_Asignatura);

-- Relación entre la tabla hecho y Grado
ALTER TABLE Hecho_RendimientoAcademico
ADD CONSTRAINT FK_Hecho_Grado
FOREIGN KEY (ID_Grado) REFERENCES Dim_Grado(ID_Grado);

-- Relación entre la tabla hecho y Docente
ALTER TABLE Hecho_RendimientoAcademico
ADD CONSTRAINT FK_Hecho_Docente
FOREIGN KEY (ID_Docente) REFERENCES Dim_Docente(ID_Docente);

-- Relación entre la tabla hecho y Fecha
ALTER TABLE Hecho_RendimientoAcademico
ADD CONSTRAINT FK_Hecho_Fecha
FOREIGN KEY (ID_Fecha) REFERENCES Dim_Fecha(ID_Fecha);


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


