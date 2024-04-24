CREATE DATABASE bd_cbe_DM;

Use bd_cbe_DM;


-- Creación de la Tabla Alumno
CREATE TABLE Dim_Alumno (
  ID_Alumno INT AUTO_INCREMENT PRIMARY KEY,
  Nombres VARCHAR(50),
  Apellidos VARCHAR(50),
  Fecha_Nacimiento DATETIME
);

-- Creación de la Tabla Asignatura
CREATE TABLE Dim_Asignatura (
  ID_Asignatura INT AUTO_INCREMENT PRIMARY KEY,
  Nombre_Asignatura VARCHAR(50)
);


-- Creación de la Tabla Grado
CREATE TABLE Dim_Grado (
  ID_Grado INT AUTO_INCREMENT PRIMARY KEY,
  Nombre_Grado VARCHAR(50),
  Cant_Estudiante INT,
  Plan_Estudio VARCHAR(50)
);

-- Creación de la Tabla Fecha
CREATE TABLE Dim_Fecha (
  ID_Fecha INT PRIMARY KEY,
  Dia INT,
  Mes INT,
  Año INT,
  hora TIME
);

CREATE TABLE Dim_Docente (
  ID_Docente INT AUTO_INCREMENT PRIMARY KEY,
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
  Nota_Final FLOAT,
  Asistencias INT,
  Inasistencias INT

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

