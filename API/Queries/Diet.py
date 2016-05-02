import MySQLdb
from API.DB import DbConnect as Database
from flask import jsonify

def get_diet_data(user_id, date):
	cursor = Database.db_connect()
	print("SELECT date, calories, amount, name, type, foodOrDrink FROM meal WHERE DATE(date) = DATE(\'" + str(date) + '\') and userID = \'' + str(user_id) + '\';')
	cursor.execute("SELECT date, calories, amount, name, type, foodOrDrink FROM meal WHERE DATE(date) = DATE(\'" + str(date) + '\') and userID = \'' + str(user_id) + '\';')
	table = cursor.fetchall()
	return table
    
def get_calories_data(user_id, date):
	cursor = Database.db_connect()
	cursor.execute("SELECT calorieGoal FROM calorieGoal WHERE DATE(date) = DATE(\'" + str(date) + '\') and userID = \'' + str(user_id) + '\';')
	table = cursor.fetchall()
	return table
    
def add_meal_data(userID, date, name,amount, calories, type, foodOrDrink):
	cursor = Database.db_connect()
	cursor.execute('START TRANSACTION;')
	print("INSERT into meal (date,name,calories,type,foodOrDrink,userID) VALUES( \'" + str(date)  +'\' , \''+ str(name) +'\' , \''+ str(amount) +'\' , \''+ str(calories)  +'\' , \''+ str(type)  +'\' , \''+ str(foodOrDrink)  + '\', \'' + str(userID) + '\') ;')
	cursor.execute("INSERT into meal (date,name,amount,calories,type,foodOrDrink,userID) VALUES( \'" + str(date)  +'\' , \''+ str(name) +'\' , \''+ str(amount) +'\' , \''+ str(calories)  +'\' , \''+ str(type)  +'\' , \''+ str(foodOrDrink)  + '\', \'' + str(userID) + '\') ;')
	cursor.execute('COMMIT;')
	table = cursor.fetchall()
	return table
    
    
def edit_meal_data(userID, date, name,amount, calories, type, foodOrDrink):
	cursor = Database.db_connect()
	cursor.execute('START TRANSACTION;')
	print("UPDATE meal SET name = \'" + str(name) + '\', amount = \'' + str(amount) + '\', calories = \''+ str(calories)+ '\', type = \''+ str(type)+ '\', foodOrDrink = \''+ str(foodOrDrink) + "\' WHERE userID= \'" + str(userID) +"\' and date = \'" + str(date) + "\';")
	cursor.execute("UPDATE meal SET name = \'" + str(name) + '\', amount = \'' + str(amount) + '\', calories = \''+ str(calories)+ '\', type = \''+ str(type)+ '\', foodOrDrink = \''+ str(foodOrDrink) + "\' WHERE userID= \'" + str(userID) +"\' and date = \'" + str(date) + "\';")
	cursor.execute('COMMIT;')
	table = cursor.fetchall()
	return table
    
def add_calories_data(user_id, date,caloriesGoal):
	cursor = Database.db_connect()
	cursor.execute('START TRANSACTION;')
	cursor.execute("INSERT into calorieGoal (date,calorieGoal,userID) VALUES( \'" + str(date) +'\' , \'' + str(caloriesGoal) + '\', \'' + str(user_id) + '\') ;')
	cursor.execute('COMMIT;')
	table = cursor.fetchall()
	return table
    
def edit_calories_data(user_id, date,caloriesGoal):
	cursor = Database.db_connect()
	cursor.execute('START TRANSACTION;')
	cursor.execute("UPDATE calorieGoal SET calorieGoal = \'" + str(caloriesGoal) + "\' WHERE userID= \'" + str(user_id) +"\' and DATE(date) = DATE(\'" + str(date) + "\');")
	cursor.execute('COMMIT;')
	table = cursor.fetchall()
	return table