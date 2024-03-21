CREATE DATABASE  IF NOT EXISTS `bd_cbe` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `bd_cbe`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: bd_cbe
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `alumno`
--

DROP TABLE IF EXISTS `alumno`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alumno` (
  `ID_Alumno` int NOT NULL AUTO_INCREMENT,
  `ID_Persona` int NOT NULL,
  `ID_Tutor` int NOT NULL,
  PRIMARY KEY (`ID_Alumno`),
  UNIQUE KEY `ID_Persona` (`ID_Persona`),
  KEY `FK_Alumno_ID_Tutor` (`ID_Tutor`),
  CONSTRAINT `FK_Alumno_ID_Persona` FOREIGN KEY (`ID_Persona`) REFERENCES `persona` (`ID_Persona`),
  CONSTRAINT `FK_Alumno_ID_Tutor` FOREIGN KEY (`ID_Tutor`) REFERENCES `tutor` (`ID_Tutor`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alumno`
--

LOCK TABLES `alumno` WRITE;
/*!40000 ALTER TABLE `alumno` DISABLE KEYS */;
INSERT INTO `alumno` VALUES (1,8,5),(4,12,8);
/*!40000 ALTER TABLE `alumno` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`Jinieth5`@`localhost`*/ /*!50003 TRIGGER `TriggerInsertAlumno` AFTER INSERT ON `alumno` FOR EACH ROW INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('INSERT', current_user(), NOW(), 'alumno') */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`Jinieth5`@`localhost`*/ /*!50003 TRIGGER `TriggerUpdateAlumno` BEFORE UPDATE ON `alumno` FOR EACH ROW INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('UPDATE', current_user(), NOW(), 'alumno') */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `asignatura`
--

DROP TABLE IF EXISTS `asignatura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asignatura` (
  `ID_Asignatura` int NOT NULL AUTO_INCREMENT,
  `Nombre_Asignatura` varchar(50) NOT NULL,
  `Horario` datetime NOT NULL,
  `ID_Docente` int NOT NULL,
  PRIMARY KEY (`ID_Asignatura`),
  KEY `FK_Asignatura_ID_Docente` (`ID_Docente`),
  CONSTRAINT `FK_Asignatura_ID_Docente` FOREIGN KEY (`ID_Docente`) REFERENCES `docente` (`ID_Docente`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asignatura`
--

LOCK TABLES `asignatura` WRITE;
/*!40000 ALTER TABLE `asignatura` DISABLE KEYS */;
INSERT INTO `asignatura` VALUES (2,'Español','2023-05-03 12:00:00',1),(3,'Matemáticas','2023-05-03 10:00:00',2),(4,'English','2023-05-03 11:00:00',6),(5,'English','2023-05-03 11:00:00',1);
/*!40000 ALTER TABLE `asignatura` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`Jinieth5`@`localhost`*/ /*!50003 TRIGGER `TriggerInsertAsignatura` AFTER INSERT ON `asignatura` FOR EACH ROW INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('INSERT', current_user(), NOW(), 'asignatura') */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`Jinieth5`@`localhost`*/ /*!50003 TRIGGER `TriggerUpdateAsignatura` BEFORE UPDATE ON `asignatura` FOR EACH ROW INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('UPDATE', current_user(), NOW(), 'asignatura') */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`Jinieth5`@`localhost`*/ /*!50003 TRIGGER `TriggerDeleteAsignatura` AFTER DELETE ON `asignatura` FOR EACH ROW INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('DELETE', current_user(), NOW(), 'asignatura') */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `bitacora`
--

DROP TABLE IF EXISTS `bitacora`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bitacora` (
  `id_bitacora` int NOT NULL AUTO_INCREMENT,
  `transaccion` varchar(10) NOT NULL,
  `usuario` varchar(40) NOT NULL,
  `fecha` datetime NOT NULL,
  `tabla` varchar(20) NOT NULL,
  PRIMARY KEY (`id_bitacora`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bitacora`
--

LOCK TABLES `bitacora` WRITE;
/*!40000 ALTER TABLE `bitacora` DISABLE KEYS */;
INSERT INTO `bitacora` VALUES (1,'INSERT','Jinieth5@localhost','2023-10-26 09:03:42','asignatura'),(2,'INSERT','Jinieth5@localhost','2023-10-26 10:08:26','docente'),(3,'INSERT','Jinieth5@localhost','2023-10-26 10:38:35','docente'),(4,'DELETE','Jinieth5@localhost','2023-10-26 10:39:07','docente'),(5,'UPDATE','Jinieth5@localhost','2023-10-26 10:46:31','docente'),(6,'INSERT','Jinieth5@localhost','2023-10-30 11:22:13','tutor'),(7,'INSERT','Jinieth5@localhost','2023-10-30 11:25:57','tutor'),(8,'INSERT','Jinieth5@localhost','2023-10-30 11:26:18','tutor'),(9,'INSERT','Jinieth5@localhost','2023-10-30 11:27:19','tutor'),(10,'UPDATE','Jinieth5@localhost','2023-10-30 11:51:13','tutor'),(11,'UPDATE','Jinieth5@localhost','2023-10-30 11:54:58','tutor'),(12,'INSERT','Jinieth5@localhost','2023-10-30 15:48:54','tutor'),(13,'UPDATE','Jinieth5@localhost','2023-10-30 15:49:16','tutor'),(14,'UPDATE','Jinieth5@localhost','2023-10-30 16:27:23','tutor'),(15,'UPDATE','Jinieth5@localhost','2023-10-31 08:24:05','tutor'),(16,'UPDATE','Jinieth5@localhost','2023-10-31 08:24:53','tutor'),(17,'UPDATE','Jinieth5@localhost','2023-11-02 11:15:35','docente'),(18,'INSERT','Jinieth5@localhost','2023-11-02 11:16:21','tutor'),(19,'UPDATE','Jinieth5@localhost','2023-11-02 11:21:40','tutor'),(20,'INSERT','Jinieth5@localhost','2023-11-07 08:48:27','asignatura'),(21,'INSERT','Jinieth5@localhost','2023-11-08 08:55:38','asignatura'),(22,'INSERT','Jinieth5@localhost','2023-11-08 08:58:23','tutor'),(23,'INSERT','Jinieth5@localhost','2023-11-08 18:25:54','docente'),(24,'INSERT','Jinieth5@localhost','2023-11-08 18:27:20','asignatura'),(25,'INSERT','Jinieth5@localhost','2023-11-09 09:43:03','docente'),(26,'UPDATE','Jinieth5@localhost','2023-11-09 09:43:15','docente'),(27,'UPDATE','Jinieth5@localhost','2023-11-14 08:43:46','docente'),(28,'DELETE','Jinieth5@localhost','2023-11-14 08:44:07','docente'),(29,'INSERT','Jinieth5@localhost','2023-11-14 08:49:59','alumno'),(30,'INSERT','Jinieth5@localhost','2023-11-14 08:50:34','alumno'),(31,'INSERT','Jinieth5@localhost','2023-11-14 08:50:52','tutor'),(32,'UPDATE','Jinieth5@localhost','2023-11-14 08:51:03','tutor'),(33,'INSERT','Jinieth5@localhost','2023-11-14 08:58:30','asignatura'),(34,'DELETE','Jinieth5@localhost','2023-11-14 08:58:44','asignatura'),(35,'INSERT','Jinieth5@localhost','2023-11-15 08:51:32','docente'),(36,'UPDATE','Jinieth5@localhost','2023-11-15 08:52:37','docente'),(37,'DELETE','Jinieth5@localhost','2023-11-15 08:52:40','docente'),(38,'INSERT','Jinieth5@localhost','2023-11-15 08:54:02','alumno'),(39,'INSERT','Jinieth5@localhost','2023-11-15 08:55:22','tutor'),(40,'INSERT','Jinieth5@localhost','2023-11-15 08:57:55','asignatura'),(41,'INSERT','Jinieth5@localhost','2023-11-16 11:43:36','alumno'),(42,'UPDATE','Jinieth5@localhost','2023-11-19 22:11:19','tutor'),(43,'INSERT','Jinieth5@localhost','2023-11-21 22:33:44','calificacion'),(44,'UPDATE','Jinieth5@localhost','2023-11-21 22:39:01','calificacion'),(45,'UPDATE','Jinieth5@localhost','2023-11-22 07:58:26','calificacion'),(46,'DELETE','Jinieth5@localhost','2023-11-22 09:02:57','asignatura'),(47,'INSERT','Jinieth5@localhost','2023-11-22 09:13:41','pagocolegiatura'),(48,'DELETE','Jinieth5@localhost','2023-11-22 09:13:49','pagocolegiatura'),(49,'DELETE','Jinieth5@localhost','2023-11-22 09:30:36','grado'),(50,'INSERT','Jinieth5@localhost','2023-11-22 09:39:49','pagocolegiatura'),(51,'INSERT','Jinieth5@localhost','2023-11-22 10:05:39','alumno');
/*!40000 ALTER TABLE `bitacora` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `calificacion`
--

DROP TABLE IF EXISTS `calificacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `calificacion` (
  `ID_Calificacion` int NOT NULL AUTO_INCREMENT,
  `Calificacion_Obtenida` double NOT NULL,
  `Fecha_Calificacion` date NOT NULL,
  `ID_Alumno` int NOT NULL,
  `ID_Asignatura` int NOT NULL,
  `Corte_Evaluativo` varchar(50) NOT NULL,
  PRIMARY KEY (`ID_Calificacion`),
  KEY `FK_Calificacion_ID_Alumno` (`ID_Alumno`),
  KEY `FK_Calificacion_ID_Asignatura` (`ID_Asignatura`),
  CONSTRAINT `FK_Calificacion_ID_Alumno` FOREIGN KEY (`ID_Alumno`) REFERENCES `alumno` (`ID_Alumno`),
  CONSTRAINT `FK_Calificacion_ID_Asignatura` FOREIGN KEY (`ID_Asignatura`) REFERENCES `asignatura` (`ID_Asignatura`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `calificacion`
--

LOCK TABLES `calificacion` WRITE;
/*!40000 ALTER TABLE `calificacion` DISABLE KEYS */;
INSERT INTO `calificacion` VALUES (1,75,'2023-11-20',4,2,'Segundo corte');
/*!40000 ALTER TABLE `calificacion` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`Jinieth5`@`localhost`*/ /*!50003 TRIGGER `TriggerInsertCalificacion` AFTER INSERT ON `calificacion` FOR EACH ROW INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('INSERT', current_user(), NOW(), 'calificacion') */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`Jinieth5`@`localhost`*/ /*!50003 TRIGGER `TriggerUpdateCalificacion` BEFORE UPDATE ON `calificacion` FOR EACH ROW INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('UPDATE', current_user(), NOW(), 'calificacion') */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`Jinieth5`@`localhost`*/ /*!50003 TRIGGER `TriggerDeleteCalificacion` AFTER DELETE ON `calificacion` FOR EACH ROW INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('DELETE', current_user(), NOW(), 'calificacion') */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `docente`
--

DROP TABLE IF EXISTS `docente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `docente` (
  `ID_Docente` int NOT NULL AUTO_INCREMENT,
  `Correo` varchar(50) DEFAULT NULL,
  `Especialidad` varchar(50) NOT NULL,
  `ID_Persona` int NOT NULL,
  PRIMARY KEY (`ID_Docente`),
  UNIQUE KEY `ID_Persona` (`ID_Persona`),
  CONSTRAINT `FK_Docente_ID_Persona` FOREIGN KEY (`ID_Persona`) REFERENCES `persona` (`ID_Persona`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `docente`
--

LOCK TABLES `docente` WRITE;
/*!40000 ALTER TABLE `docente` DISABLE KEYS */;
INSERT INTO `docente` VALUES (1,'luislaz23@gmail.com','Ciencias Naturales',1),(2,'Juana10@gmail.com','English',2),(6,'moiruiz12@gmail.com','Educación Física',6),(7,'idollopez@gmail.com','Español',7);
/*!40000 ALTER TABLE `docente` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`Jinieth5`@`localhost`*/ /*!50003 TRIGGER `TriggerInsertDocente` AFTER INSERT ON `docente` FOR EACH ROW INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('INSERT', current_user(), NOW(), 'docente') */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`Jinieth5`@`localhost`*/ /*!50003 TRIGGER `TriggerUpdateDocente` BEFORE UPDATE ON `docente` FOR EACH ROW INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('UPDATE', current_user(), NOW(), 'docente') */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`Jinieth5`@`localhost`*/ /*!50003 TRIGGER `TriggerDeleteDocente` AFTER DELETE ON `docente` FOR EACH ROW INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('DELETE', current_user(), NOW(), 'docente') */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `grado`
--

DROP TABLE IF EXISTS `grado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grado` (
  `ID_Grado` int NOT NULL,
  `Cant_Estudiante` int NOT NULL,
  `Plan_Estudio` varchar(100) NOT NULL,
  PRIMARY KEY (`ID_Grado`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grado`
--

LOCK TABLES `grado` WRITE;
/*!40000 ALTER TABLE `grado` DISABLE KEYS */;
INSERT INTO `grado` VALUES (0,12,'Nothing'),(4,40,'No one'),(5,42,'s'),(8,40,'M'),(10,26,'Nothing'),(12,50,'Plan de Estudio Ejemplo');
/*!40000 ALTER TABLE `grado` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`Jinieth5`@`localhost`*/ /*!50003 TRIGGER `TriggerInsertGrado` AFTER INSERT ON `grado` FOR EACH ROW INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('INSERT', current_user(), NOW(), 'grado') */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`Jinieth5`@`localhost`*/ /*!50003 TRIGGER `TriggerUpdateGrado` BEFORE UPDATE ON `grado` FOR EACH ROW INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('UPDATE', current_user(), NOW(), 'grado') */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`Jinieth5`@`localhost`*/ /*!50003 TRIGGER `TriggerDeleteGrado` AFTER DELETE ON `grado` FOR EACH ROW INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('DELETE', current_user(), NOW(), 'grado') */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `matricula`
--

DROP TABLE IF EXISTS `matricula`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `matricula` (
  `ID_Matricula` int NOT NULL AUTO_INCREMENT,
  `Anio_Escolar` varchar(50) NOT NULL,
  `ID_Grado` int NOT NULL,
  `Tipo_Matricula` varchar(50) NOT NULL,
  `ID_Alumno` int NOT NULL,
  PRIMARY KEY (`ID_Matricula`),
  KEY `FK_Matricula_ID_Alumno` (`ID_Alumno`),
  KEY `FK_Matricula_ID_Grado` (`ID_Grado`),
  CONSTRAINT `FK_Matricula_ID_Alumno` FOREIGN KEY (`ID_Alumno`) REFERENCES `alumno` (`ID_Alumno`),
  CONSTRAINT `FK_Matricula_ID_Grado` FOREIGN KEY (`ID_Grado`) REFERENCES `grado` (`ID_Grado`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `matricula`
--

LOCK TABLES `matricula` WRITE;
/*!40000 ALTER TABLE `matricula` DISABLE KEYS */;
INSERT INTO `matricula` VALUES (1,'2024',10,'Nuevo ingreso',1),(2,'2025',12,'Nuevo ingreso',1);
/*!40000 ALTER TABLE `matricula` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pagocolegiatura`
--

DROP TABLE IF EXISTS `pagocolegiatura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pagocolegiatura` (
  `ID_Pago` int NOT NULL AUTO_INCREMENT,
  `Monto` float NOT NULL,
  `Fecha_Pago` date NOT NULL,
  `ID_Alumno` int NOT NULL,
  PRIMARY KEY (`ID_Pago`),
  KEY `FK_PagoColegiatura_ID_Alumno` (`ID_Alumno`),
  CONSTRAINT `FK_PagoColegiatura_ID_Alumno` FOREIGN KEY (`ID_Alumno`) REFERENCES `alumno` (`ID_Alumno`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pagocolegiatura`
--

LOCK TABLES `pagocolegiatura` WRITE;
/*!40000 ALTER TABLE `pagocolegiatura` DISABLE KEYS */;
INSERT INTO `pagocolegiatura` VALUES (5,700,'2023-12-24',1);
/*!40000 ALTER TABLE `pagocolegiatura` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`Jinieth5`@`localhost`*/ /*!50003 TRIGGER `TriggerDeletePagocolegiatura` AFTER INSERT ON `pagocolegiatura` FOR EACH ROW INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('INSERT', current_user(), NOW(), 'pagocolegiatura') */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`Jinieth5`@`localhost`*/ /*!50003 TRIGGER `TDeletePagocolegiatura` AFTER DELETE ON `pagocolegiatura` FOR EACH ROW INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('DELETE', current_user(), NOW(), 'pagocolegiatura') */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `persona`
--

DROP TABLE IF EXISTS `persona`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `persona` (
  `ID_Persona` int NOT NULL AUTO_INCREMENT,
  `Nombres` varchar(50) NOT NULL,
  `Apellidos` varchar(50) NOT NULL,
  `Fecha_Nacimiento` date NOT NULL,
  `Direccion` varchar(100) NOT NULL,
  `Genero` char(1) NOT NULL,
  `Telefono` varchar(9) NOT NULL,
  PRIMARY KEY (`ID_Persona`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `persona`
--

LOCK TABLES `persona` WRITE;
/*!40000 ALTER TABLE `persona` DISABLE KEYS */;
INSERT INTO `persona` VALUES (1,'Luis','Lazoss','2003-01-02','Bº Sta María.','M','83262541'),(2,'Juana','Masis','2004-10-05','Teco','F','86542326'),(6,'Moises','Ruiz','2000-06-20','Frente a la Iglesia','M','83242526'),(7,'Bryan','Montenegro','1900-05-03','De la policia 4 cuadras al oeste','M','88994455'),(8,'Jeilyng','Montiel','2023-11-16','Juigalpa','F','88994454'),(12,'Angiela','Montiel','2020-02-12','Juigalpa','F','45122625');
/*!40000 ALTER TABLE `persona` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tutor`
--

DROP TABLE IF EXISTS `tutor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tutor` (
  `ID_Tutor` int NOT NULL AUTO_INCREMENT,
  `Nombres` varchar(30) NOT NULL,
  `Telefono` varchar(8) NOT NULL,
  PRIMARY KEY (`ID_Tutor`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tutor`
--

LOCK TABLES `tutor` WRITE;
/*!40000 ALTER TABLE `tutor` DISABLE KEYS */;
INSERT INTO `tutor` VALUES (5,'ReynaldoM','88512278'),(7,'Juan Lazo','88512251'),(8,'Silvia Altamirano','88994455'),(9,'Aldo','88512250');
/*!40000 ALTER TABLE `tutor` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`Jinieth5`@`localhost`*/ /*!50003 TRIGGER `TriggerInsertTutor` AFTER INSERT ON `tutor` FOR EACH ROW INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('INSERT', current_user(), NOW(), 'tutor') */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`Jinieth5`@`localhost`*/ /*!50003 TRIGGER `TriggerUpdateTutor` BEFORE UPDATE ON `tutor` FOR EACH ROW INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('UPDATE', current_user(), NOW(), 'tutor') */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id_Usuario` int NOT NULL AUTO_INCREMENT,
  `nombre_Usuario` varchar(30) NOT NULL,
  `contrasena` varchar(16) NOT NULL,
  `rol` varchar(20) NOT NULL,
  PRIMARY KEY (`id_Usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'Admi82','Admi12','admin'),(2,'Jinieth82','Jinieth18','Docente'),(3,'prueva','1234','admin');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'bd_cbe'
--

--
-- Dumping routines for database 'bd_cbe'
--
/*!50003 DROP PROCEDURE IF EXISTS `ActualizarCalificacion` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`Jinieth5`@`localhost` PROCEDURE `ActualizarCalificacion`(
    IN p_ID_Calificacion INT,
    IN p_Calificacion_Obtenida DOUBLE,
    IN p_Fecha_Calificacion DATE,
    IN p_Corte_Evaluativo VARCHAR(50)
)
BEGIN
    UPDATE Calificacion
    SET Calificacion_Obtenida = p_Calificacion_Obtenida,
        Fecha_Calificacion = p_Fecha_Calificacion,
        Corte_Evaluativo = p_Corte_Evaluativo
    WHERE ID_Calificacion = p_ID_Calificacion;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `EliminarCalificacion` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`Jinieth5`@`localhost` PROCEDURE `EliminarCalificacion`(
    IN p_ID_Calificacion INT
)
BEGIN
    DELETE FROM Calificacion
    WHERE ID_Calificacion = p_ID_Calificacion;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `RegistrarCalificacion` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`Jinieth5`@`localhost` PROCEDURE `RegistrarCalificacion`(
    IN p_Calificacion_Obtenida DOUBLE,
    IN p_Fecha_Calificacion DATE,
    IN p_ID_Alumno INT,
    IN p_ID_Asignatura INT,
    IN p_Corte_Evaluativo VARCHAR(50)
)
BEGIN
    INSERT INTO Calificacion (Calificacion_Obtenida, Fecha_Calificacion, ID_Alumno, ID_Asignatura, Corte_Evaluativo)
    VALUES (p_Calificacion_Obtenida, p_Fecha_Calificacion, p_ID_Alumno, p_ID_Asignatura, p_Corte_Evaluativo);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `VerCalificacionesConNombres` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`Jinieth5`@`localhost` PROCEDURE `VerCalificacionesConNombres`()
BEGIN
    SELECT
        C.ID_Calificacion,
        C.Calificacion_Obtenida,
        C.Fecha_Calificacion,
        CONCAT(PA.Nombres, ' ', PA.Apellidos) AS NombreAlumno,
        ASI.Nombre_Asignatura,
        C.Corte_Evaluativo
    FROM Calificacion C
    INNER JOIN Alumno A ON C.ID_Alumno = A.ID_Alumno
    INNER JOIN Persona PA ON A.ID_Persona = PA.ID_Persona
    INNER JOIN Asignatura ASI ON C.ID_Asignatura = ASI.ID_Asignatura;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-20 21:06:28
