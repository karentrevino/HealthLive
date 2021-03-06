-- MySQL Script generated by MySQL Workbench
-- 04/08/16 13:21:59
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- Version History
-- v2B: CREATE script generated by MySQL with fixed FK names
-- WARNING: Script not tested; MySQl had issues with Python modules while attempting to run script
-- v2: Fixed names on foreign keys. All FKs now have unique names
-- v1: Initial version
-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`User` (
  `idUser` INT NOT NULL,
  `emailUser` VARCHAR(45) NULL,
  `fnameUser` VARCHAR(45) NOT NULL,
  `lnameUser` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idUser`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Meal`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Meal` (
  `calories` INT NOT NULL,
  `amount` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `type` VARCHAR(45) NULL,
  `date` DATETIME NULL,
  `food//drink` VARCHAR(45) NULL,
  `idUserMeal` INT NULL,
  PRIMARY KEY (`calories`, `amount`, `name`),
  INDEX `idUser_idx` (`idUserMeal` ASC),
  CONSTRAINT `idUser`
    FOREIGN KEY (`idUserMeal`)
    REFERENCES `mydb`.`User` (`idUser`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Diet`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Diet` (
  `calorieGoal` INT NOT NULL,
  `date` DATETIME NOT NULL,
  `idUserDiet` INT NULL,
  PRIMARY KEY (`calorieGoal`, `date`),
  INDEX `idUser_idx` (`idUserDiet` ASC),
  CONSTRAINT `idUser`
    FOREIGN KEY (`idUserDiet`)
    REFERENCES `mydb`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Excercise`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Excercise` (
  `datetime` DATETIME NOT NULL,
  `nameEx` VARCHAR(45) NOT NULL,
  `type` VARCHAR(45) NULL,
  `completed` TINYINT(1) NULL,
  `idUserEx` INT NULL,
  PRIMARY KEY (`datetime`, `nameEx`),
  INDEX `idUser_idx` (`idUserEx` ASC),
  CONSTRAINT `idUser`
    FOREIGN KEY (`idUserEx`)
    REFERENCES `mydb`.`User` (`idUser`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Medicine`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Medicine` (
  `name` VARCHAR(45) NOT NULL,
  `frequency` VARCHAR(45) NOT NULL,
  `duration` VARCHAR(45) NOT NULL,
  `time` DATETIME NULL,
  `idUserMed` INT NULL,
  PRIMARY KEY (`name`, `frequency`, `duration`),
  INDEX `idUser_idx` (`idUserMed` ASC),
  CONSTRAINT `idUser`
    FOREIGN KEY (`idUserMed`)
    REFERENCES `mydb`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Sleep`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Sleep` (
  `duration` VARCHAR(45) NOT NULL,
  `datetime` DATETIME NOT NULL,
  `idUserSleep` INT NULL,
  PRIMARY KEY (`duration`, `datetime`),
  INDEX `idUser_idx` (`idUserSleep` ASC),
  CONSTRAINT `idUser`
    FOREIGN KEY (`idUserSleep`)
    REFERENCES `mydb`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Alchoholic drinks`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Alchoholic drinks` (
  `amount` VARCHAR(45) NOT NULL,
  `datetime` DATETIME NOT NULL,
  `alcbyvol` VARCHAR(45) NULL,
  `idUserAlc` INT NULL,
  PRIMARY KEY (`amount`, `datetime`),
  INDEX `idUser_idx` (`idUserAlc` ASC),
  CONSTRAINT `idUser`
    FOREIGN KEY (`idUserAlc`)
    REFERENCES `mydb`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
