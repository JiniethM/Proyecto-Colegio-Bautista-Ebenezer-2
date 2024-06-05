CREATE DATABASE bd_cbe;
USE bd_cbe;

SELECT * FROM Matricula;


INSERT INTO usuario (nombre_Usuario, contrasena, rol) VALUES ('Admi', '1234', 'Administrador');
INSERT INTO usuario (nombre_Usuario, contrasena, rol) VALUES ('doce', '12345', 'Docente');

-- Tablas

CREATE TABLE persona (
  ID_Persona INT AUTO_INCREMENT PRIMARY KEY,
  Nombres VARCHAR(50),
  Apellidos VARCHAR(50),
  Fecha_Nacimiento DATE,
  Direccion VARCHAR(100),
  Genero CHAR(1),
  Telefono VARCHAR(9)
);

CREATE TABLE docente (
  ID_Docente INT AUTO_INCREMENT PRIMARY KEY,
  Correo VARCHAR(50),
  Especialidad VARCHAR(50),
  ID_Persona INT
);

CREATE TABLE tutor (
  ID_Tutor INT AUTO_INCREMENT PRIMARY KEY,
  Nombres VARCHAR(30),
  Telefono VARCHAR(9)
);


CREATE TABLE alumno (
  ID_Alumno INT AUTO_INCREMENT PRIMARY KEY,
  ID_Persona INT,
  ID_Tutor INT
);

CREATE TABLE asignatura (
  ID_Asignatura INT AUTO_INCREMENT PRIMARY KEY,
  Nombre_Asignatura VARCHAR(50),
  Horario DATETIME,
  ID_Docente INT
);

CREATE TABLE calificacion (
  ID_Calificacion INT AUTO_INCREMENT PRIMARY KEY,
  Calificacion_Obtenida DOUBLE,
  Fecha_Calificacion DATE,
  ID_Alumno INT,
  ID_Asignatura INT,
  Corte_Evaluativo VARCHAR(50)
);

CREATE TABLE grado (
  ID_Grado INT PRIMARY KEY,
  Cant_Estudiante INT,
  Plan_Estudio VARCHAR(100)
);

CREATE TABLE matricula (
  ID_Matricula INT AUTO_INCREMENT PRIMARY KEY,
  Anio_Escolar VARCHAR(50),
  ID_Grado INT,
  Tipo_Matricula VARCHAR(50),
  ID_Alumno INT
);

CREATE TABLE pagocolegiatura (
  ID_Pago INT AUTO_INCREMENT PRIMARY KEY,
  Monto FLOAT,
  Fecha_Pago DATE,
  ID_Alumno INT
);

CREATE TABLE bitacora (
  id_bitacora INT AUTO_INCREMENT PRIMARY KEY,
  transaccion VARCHAR(10),
  usuario VARCHAR(40),
  fecha DATETIME,
  tabla VARCHAR(20)
);

CREATE TABLE usuario (
  ID_Usuario INT AUTO_INCREMENT PRIMARY KEY,
  nombre_Usuario VARCHAR(30),
  contrasena VARCHAR(16),
  rol VARCHAR(20)
);

-- Relaciones

ALTER TABLE docente
 ADD CONSTRAINT FK_Docente_Persona 
 FOREIGN KEY (ID_Persona) REFERENCES persona (ID_Persona);
 
 
ALTER TABLE asignatura
 ADD CONSTRAINT FK_Asignatura_Docente
 FOREIGN KEY (ID_Docente) REFERENCES docente (ID_Docente);
 
 
ALTER TABLE calificacion
 ADD CONSTRAINT FK_Calificacion_Alumno 
 FOREIGN KEY (ID_Alumno) REFERENCES alumno (ID_Alumno);
 
 
ALTER TABLE calificacion 
ADD CONSTRAINT FK_Calificacion_Asignatura 
FOREIGN KEY (ID_Asignatura) REFERENCES asignatura (ID_Asignatura);


ALTER TABLE alumno 
ADD CONSTRAINT FK_Alumno_Persona 
FOREIGN KEY (ID_Persona) REFERENCES persona (ID_Persona);


ALTER TABLE alumno 
ADD CONSTRAINT FK_Alumno_Tutor 
FOREIGN KEY (ID_Tutor) REFERENCES tutor (ID_Tutor);


ALTER TABLE matricula 
ADD CONSTRAINT FK_Matricula_Alumno 
FOREIGN KEY (ID_Alumno) REFERENCES alumno (ID_Alumno);


ALTER TABLE matricula 
ADD CONSTRAINT FK_Matricula_Grado 
FOREIGN KEY (ID_Grado) REFERENCES grado (ID_Grado);


ALTER TABLE pagocolegiatura 
ADD CONSTRAINT FK_PagoColegiatura_Alumno 
FOREIGN KEY (ID_Alumno) REFERENCES alumno (ID_Alumno);

-- Procedimientos almacenados
DELIMITER //

CREATE PROCEDURE ActualizarCalificacion(
    IN p_ID_Calificacion INT,
    IN p_Calificacion_Obtenida DOUBLE,
    IN p_Fecha_Calificacion DATE,
    IN p_Corte_Evaluativo VARCHAR(50)
)
BEGIN
    UPDATE calificacion 
    SET 
        Calificacion_Obtenida = p_Calificacion_Obtenida,
        Fecha_Calificacion = p_Fecha_Calificacion,
        Corte_Evaluativo = p_Corte_Evaluativo
    WHERE 
        ID_Calificacion = p_ID_Calificacion;
END //




CREATE PROCEDURE EliminarCalificacion(p_ID_Calificacion INT)
BEGIN
    DELETE FROM calificacion WHERE ID_Calificacion = p_ID_Calificacion;
END //




CREATE PROCEDURE RegistrarCalificacion(p_Calificacion_Obtenida DOUBLE, p_Fecha_Calificacion DATE, p_ID_Alumno INT, p_ID_Asignatura INT, p_Corte_Evaluativo VARCHAR(50))
BEGIN
    INSERT INTO calificacion (Calificacion_Obtenida, Fecha_Calificacion, ID_Alumno, ID_Asignatura, Corte_Evaluativo)
    VALUES (p_Calificacion_Obtenida, p_Fecha_Calificacion, p_ID_Alumno, p_ID_Asignatura, p_Corte_Evaluativo);
END //




CREATE PROCEDURE VerCalificacionesConNombres()
BEGIN
    SELECT 
        c.ID_Calificacion,
        c.Calificacion_Obtenida,
        c.Fecha_Calificacion,
        CONCAT(p.Nombres, ' ', p.Apellidos) AS NombreAlumno,
        a.Nombre_Asignatura,
        c.Corte_Evaluativo
    FROM 
        calificacion c
    JOIN 
        alumno al ON c.ID_Alumno = al.ID_Alumno
    JOIN 
        persona p ON al.ID_Persona = p.ID_Persona
    JOIN 
        asignatura a ON c.ID_Asignatura = a.ID_Asignatura;
END //



DELIMITER ;








