-- INSERT script for test user, filling all attributes in all tables

-- Values for User
INSERT INTO User(idUser,emailUser,fnameUser,lnameUser,password)
VALUES ('111','email@email.com', 'John', 'Doe', 'password');

-- Values for Excercise
-- Note: May need to rename 'datetime' and 'type' attributes in tables if they conflict with keywords
INSERT INTO Excercise(datetime, nameEx, type, completed, EidUser)
VALUES ('01/01/2001','Cycling', 'Cardio', 'true', '111');

-- Values for Alchoholic drinks
INSERT INTO `HealthLive`.`Alchoholic drinks` (`amount`, `datetime`, `alcbyvol`, `AidUser`) 
VALUES ('12oz','02/02/2002', '8%', '111');

-- Values for Meal
INSERT INTO `HealthLive`.`Meal` (`calories`, `amount`, `name`, `type`, `date`, `food//drink`, `idUser`)
VALUES ('330','12oz', 'Salmon', 'Fish', '01/01/2001','food','111');

-- Values for Diet
INSERT INTO Diet(calorieGoal, date, DidUser)
VALUES ('1200','01/01/2001','111');

-- Values for Medicine
INSERT INTO Medicine(name, frequency, duration, time, MidUser)
VALUES ('Claritin','1 per 24h', '2 weeks', '01/01/2001', '111');

-- Values for Sleep
INSERT INTO Sleep(duration,datetime, SidUser)
VALUES ('6 hours', '01/01/2001', '111')