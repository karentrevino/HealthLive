import MySQLdb
from API.DB import DbConnect as Database
from flask import jsonify

# ------- exercise data ---------

#get exercise data
def get_exercise_data(userID, date):
	cursor = Database.db_connect()
	cursor.execute("SELECT date, muscleGroup, duration FROM exercise WHERE DATE(date) = DATE(\'" + str(date) + '\') and userID = \'' + str(userID) + '\';')
	table = cursor.fetchall()
	return table

#add new exercise
def add_exercise_data(userID, date, muscleGroup, duration):
	cursor = Database.db_connect()
	cursor.execute('START TRANSACTION;')
	cursor.execute("INSERT into exercise (date,muscleGroup,duration,userID) VALUES( \'" + str(date)  +'\' , \''+ str(muscleGroup) +'\' , \''+ str(duration) +'\' , \'' + str(userID) + '\') ;')
	cursor.execute('COMMIT;')
	table = cursor.fetchall()
	return table

#edit exercise
def edit_exercise_data(userID, date, muscleGroup, duration):
	cursor = Database.db_connect()
	cursor.execute('START TRANSACTION;')
	cursor.execute("UPDATE exercise SET muscleGroup = \'" + str(muscleGroup) + "\', duration = \'" + str(duration) + "\' WHERE userID= \'" + str(userID) +"\' and date = \'" + str(date) + "\';")
	cursor.execute('COMMIT;')
	table = cursor.fetchall()
	return table

# ------ exercise goal data ------

#get exercise goal of that day
def get_exercise_goal_data(userID, date):
	cursor = Database.db_connect()
	cursor.execute("SELECT muscleGoal, durationGoal FROM exercisegoal WHERE DATE(date) = DATE(\'" + str(date) + '\') and userID = \'' + str(userID) + '\';')
	table = cursor.fetchall()
	return table

#add new exercise goal
def add_exercise_goal_data(userID,date,muscleGoal,durationGoal):
	cursor = Database.db_connect()
	cursor.execute('START TRANSACTION;')
	cursor.execute("INSERT into exercisegoal (date,muscleGoal,durationGoal,userID) VALUES( \'" + str(date) +'\' , \'' + str(muscleGoal) + '\', \'' + str(durationGoal) + '\', \'' + str(userID) + '\') ;')
	cursor.execute('COMMIT;')
	table = cursor.fetchall()
	return table

#edit exercise goal
def edit_exercise_goal_data(userID,date,muscleGoal,durationGoal):
	cursor = Database.db_connect()
	cursor.execute('START TRANSACTION;')
	cursor.execute("UPDATE exercisegoal SET muscleGoal = \'" + str(muscleGoal) + "\', durationGoal = \'" + str(durationGoal) + "\' WHERE userID= \'" + str(userID) +"\' and DATE(date) = DATE(\'" + str(date) + "\');")
	cursor.execute('COMMIT;')
	table = cursor.fetchall()
	return table
    
