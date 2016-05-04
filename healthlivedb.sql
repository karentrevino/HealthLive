-- MySQL dump 10.13  Distrib 5.6.24, for Win64 (x86_64)
--
-- Host: localhost    Database: healthlivedb
-- ------------------------------------------------------
-- Server version	5.6.26-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `alcohol`
--

DROP TABLE IF EXISTS `alcohol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `alcohol` (
  `date` datetime NOT NULL,
  `amount` float DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  `alcByVol` varchar(45) DEFAULT NULL,
  `userID` int(11) NOT NULL,
  PRIMARY KEY (`date`),
  KEY `userID_idx` (`userID`),
  CONSTRAINT `alcohol_1` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alcohol`
--

LOCK TABLES `alcohol` WRITE;
/*!40000 ALTER TABLE `alcohol` DISABLE KEYS */;
INSERT INTO `alcohol` VALUES ('2016-04-26 20:08:00',1,'beer','5',1);
/*!40000 ALTER TABLE `alcohol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `caloriegoal`
--

DROP TABLE IF EXISTS `caloriegoal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `caloriegoal` (
  `date` datetime NOT NULL,
  `calorieGoal` int(11) DEFAULT NULL,
  `userID` int(11) NOT NULL,
  PRIMARY KEY (`date`,`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `caloriegoal`
--

LOCK TABLES `caloriegoal` WRITE;
/*!40000 ALTER TABLE `caloriegoal` DISABLE KEYS */;
INSERT INTO `caloriegoal` VALUES ('2016-04-27 02:43:49',1800,1),('2016-04-27 03:47:35',1500,1),('2016-04-30 00:32:27',1500,1),('2016-05-02 00:32:27',1500,1),('2016-05-02 03:47:35',1300,1),('2016-05-03 00:32:27',1200,1),('2016-05-04 03:47:35',1150,1),('2016-05-08 01:18:58',5,1);
/*!40000 ALTER TABLE `caloriegoal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exercise`
--

DROP TABLE IF EXISTS `exercise`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `exercise` (
  `date` datetime NOT NULL,
  `muscleGroup` varchar(45) DEFAULT NULL,
  `duration` float DEFAULT NULL,
  `userID` int(11) DEFAULT NULL,
  PRIMARY KEY (`date`),
  KEY `userID_idx` (`userID`),
  CONSTRAINT `exercise_1` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercise`
--

LOCK TABLES `exercise` WRITE;
/*!40000 ALTER TABLE `exercise` DISABLE KEYS */;
INSERT INTO `exercise` VALUES ('2016-04-26 06:08:00','Legs',2,1),('2016-04-27 06:18:00','Arms',1.5,1),('2016-04-27 07:30:00','Abs',0.5,1),('2016-05-01 01:02:45','abs',0.5,1),('2016-05-01 08:01:00','legs',1.5,1),('2016-05-01 08:05:00','cardio',0.5,1),('2016-05-02 00:38:37','abs',0.5,1),('2016-05-02 08:05:00','cardio',1,1),('2016-05-03 08:05:00','arms',1.3,1),('2016-05-04 08:05:00','none',0,1),('2016-05-05 08:05:00','abs',1.5,1),('2016-05-06 08:05:00','cardio',0.5,1),('2016-05-07 08:05:00','legs',2,1),('2016-05-08 08:05:00','none',0,1);
/*!40000 ALTER TABLE `exercise` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exercisegoal`
--

DROP TABLE IF EXISTS `exercisegoal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `exercisegoal` (
  `date` datetime NOT NULL,
  `muscleGoal` varchar(45) DEFAULT NULL,
  `durationGoal` float DEFAULT NULL,
  `userID` int(11) DEFAULT NULL,
  PRIMARY KEY (`date`),
  KEY `ex_goal_1_idx` (`userID`),
  CONSTRAINT `ex_goal_1` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercisegoal`
--

LOCK TABLES `exercisegoal` WRITE;
/*!40000 ALTER TABLE `exercisegoal` DISABLE KEYS */;
INSERT INTO `exercisegoal` VALUES ('2016-05-01 06:05:00','legs',2,1),('2016-05-02 06:01:08','arms',4,1),('2016-05-02 06:02:03','arms',4,1),('2016-05-02 08:47:29','arms',4,1),('2016-05-02 09:26:00','arms',4,1),('2016-05-02 16:05:46','arms',4,1),('2016-05-03 06:04:01','arms',4,1),('2016-05-04 06:00:00','arms',1.5,1),('2016-05-05 06:25:00','cardio',0.5,1),('2016-05-06 06:01:00','shoulders',1.5,1),('2016-05-07 06:08:00','chest',1,1),('2016-05-08 06:04:00','legs',2,1);
/*!40000 ALTER TABLE `exercisegoal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `meal`
--

DROP TABLE IF EXISTS `meal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `meal` (
  `date` datetime NOT NULL,
  `calories` int(11) DEFAULT NULL,
  `amount` float DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  `foodOrDrink` varchar(45) DEFAULT NULL,
  `userID` int(11) DEFAULT NULL,
  PRIMARY KEY (`date`),
  KEY `meal_1_idx` (`userID`),
  CONSTRAINT `meal_1` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `meal`
--

LOCK TABLES `meal` WRITE;
/*!40000 ALTER TABLE `meal` DISABLE KEYS */;
INSERT INTO `meal` VALUES ('2016-04-26 09:15:00',300,1,'Breakfast Sandwich','breakfast','food',1),('2016-04-26 12:15:00',375,1,'Starbucks','caffeine','drink',1),('2016-04-26 20:52:00',680,1,'Chicken Pesto','dinner','food',1),('2016-05-01 22:50:54',200,1,'ramen','lunch','food',1),('2016-05-01 22:52:00',750,1,'orange chicken with rice','dinner','food',1),('2016-05-01 22:52:37',475,1,'starbucks coffee','caffeine','drink',1),('2016-05-02 19:35:02',301,1,'lunchable','lunch','food',1),('2016-05-02 19:36:16',200,1,'rice','dinner','food',1),('2016-05-02 23:47:29',384,3,'redbull','caffeine','drink',1);
/*!40000 ALTER TABLE `meal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medicine`
--

DROP TABLE IF EXISTS `medicine`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `medicine` (
  `date` datetime NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `frequency` varchar(45) DEFAULT NULL,
  `duration` varchar(45) DEFAULT NULL,
  `startDate` varchar(45) DEFAULT NULL,
  `endDate` varchar(45) DEFAULT NULL,
  `userID` int(11) DEFAULT NULL,
  PRIMARY KEY (`date`),
  KEY `medicine_1_idx` (`userID`),
  CONSTRAINT `medicine_1` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medicine`
--

LOCK TABLES `medicine` WRITE;
/*!40000 ALTER TABLE `medicine` DISABLE KEYS */;
INSERT INTO `medicine` VALUES ('2016-04-26 08:00:00','Dayquil','2','daily','March 30, 2016','May 14, 2016',1),('2016-05-01 01:19:25','tylenol','twice a day','1 day','today','today',1),('2016-05-02 01:20:25','Claritin','twice a day','10 days','Today','May 12th, 2016',1),('2016-05-03 01:14:19','Pamprin','once a day','10 days','Today','May 12th, 2016',1),('2016-05-03 08:00:00','Pamprin','once a day','10 days','Today','May 12th, 2016',1),('2016-05-04 01:19:25','Claritin','once a day','10 days','May 2nd, 2016','May 12th, 2016',1),('2016-05-05 01:19:25','Pamprin','once a day','today','today','today',1),('2016-05-06 01:19:25','Claritin','once a day','10 days','May 2nd, 2016','May 12th, 2016',1),('2016-05-07 01:19:25','Claritin','once a day','10 days','May 2nd, 2016','May 12th, 2016',1),('2016-05-08 01:19:25','Claritin','once a day','10 days','May 2nd, 2016','May 12th, 2016',1);
/*!40000 ALTER TABLE `medicine` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medicine_intake`
--

DROP TABLE IF EXISTS `medicine_intake`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `medicine_intake` (
  `date` datetime NOT NULL,
  `taken` varchar(45) DEFAULT NULL,
  `userID` int(11) DEFAULT NULL,
  PRIMARY KEY (`date`),
  KEY `med_intake_1_idx` (`userID`),
  CONSTRAINT `med_intake_1` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medicine_intake`
--

LOCK TABLES `medicine_intake` WRITE;
/*!40000 ALTER TABLE `medicine_intake` DISABLE KEYS */;
INSERT INTO `medicine_intake` VALUES ('2016-04-26 08:15:00','yes',1),('2016-05-01 08:00:00','yes',1),('2016-05-02 08:00:00','no',1),('2016-05-02 20:48:48','yes',1),('2016-05-03 08:00:00','yes',1),('2016-05-04 08:00:00','yes',1),('2016-05-05 08:00:00','no',1),('2016-05-06 08:00:00','no',1),('2016-05-07 08:00:00','yes',1),('2016-05-08 08:00:00','no',1);
/*!40000 ALTER TABLE `medicine_intake` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sleep`
--

DROP TABLE IF EXISTS `sleep`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sleep` (
  `date` datetime NOT NULL,
  `duration` float DEFAULT NULL,
  `userID` int(11) DEFAULT NULL,
  PRIMARY KEY (`date`),
  KEY `uID_idx` (`userID`),
  CONSTRAINT `sleep_1` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sleep`
--

LOCK TABLES `sleep` WRITE;
/*!40000 ALTER TABLE `sleep` DISABLE KEYS */;
INSERT INTO `sleep` VALUES ('2016-04-26 06:34:00',8,1),('2016-04-27 06:00:00',5,1),('2016-04-28 19:30:07',6,1),('2016-05-02 19:30:07',5,1),('2016-05-03 23:10:20',0,1);
/*!40000 ALTER TABLE `sleep` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `userID` int(11) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `lname` varchar(45) DEFAULT NULL,
  `fname` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'dariaaafool','dupont','daria','123456'),(2,'test@yahoo.com','user','test','test');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'healthlivedb'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-05-03 22:05:22
