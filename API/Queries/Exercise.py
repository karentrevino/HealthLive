import MySQLdb
from API.DB import DbConnect as Database
from flask import jsonify

def get_exercise_goal_data(userID, date):
	cursor = Database.db_connect()
	cursor.execute("SELECT muscleGoal, durationGoal FROM exercisegoal WHERE DATE(date) = DATE(\'" + str(date) + '\') and userID = \'' + str(userID) + '\';')
	table = cursor.fetchall()
	return table

def get_exercise_data(userID, date):
	cursor = Database.db_connect()
	cursor.execute("SELECT date, muscleGroup, duration FROM exercise WHERE DATE(date) = DATE(\'" + str(date) + '\') and userID = \'' + str(userID) + '\';')
	table = cursor.fetchall()
	return table
    
