import MySQLdb
from API.DB import DbConnect as Database
from flask import jsonify

def get_sleep_data(user_id, date):
	cursor = Database.db_connect()
	cursor.execute("SELECT date, duration FROM sleep WHERE DATE(date) = DATE(\'" + str(date) + '\') and userID = \'' + str(user_id) + '\';')
	table = cursor.fetchall()
	return table
    

def add_sleep_data(user_id, date,duration):
	cursor = Database.db_connect()
	cursor.execute('START TRANSACTION;')
	print("INSERT into sleep (date,duration,userID) VALUES( \'" + str(date) +'\' , \'' + str(duration) + '\', \'' + str(user_id) + '\') ;')
	cursor.execute("INSERT into sleep (date,duration,userID) VALUES( \'" + str(date) +'\' , \'' + str(duration) + '\', \'' + str(user_id) + '\') ;')
	cursor.execute('COMMIT;')
	table = cursor.fetchall()
	return table
    
def edit_sleep_data(user_id, date,duration):
	cursor = Database.db_connect()
	cursor.execute('START TRANSACTION;')
	print("UPDATE sleep SET duration = \'" + str(duration) + "\' WHERE userID= \'" + str(user_id) +"\' and DATE(date) = DATE(\'" + str(date) + "\');")
	cursor.execute("UPDATE sleep SET duration = \'" + str(duration) + "\' WHERE userID= \'" + str(user_id) +"\' and DATE(date) = DATE(\'" + str(date) + "\');")
	cursor.execute('COMMIT;')
	table = cursor.fetchall()
	return table