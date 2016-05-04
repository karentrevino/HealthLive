import MySQLdb
from API.DB import DbConnect as Database
from flask import jsonify

# ------- medicine data ---------

#get med data
def get_med_data(userID, date):
	cursor = Database.db_connect()
	cursor.execute("SELECT date, taken FROM medicine_intake WHERE DATE(date) = DATE(\'" + str(date) + '\') and userID = \'' + str(userID) + '\';')
	table = cursor.fetchall()
	return table

#add new med intake
def add_med_data(userID, date, taken):
	cursor = Database.db_connect()
	cursor.execute('START TRANSACTION;')
	cursor.execute("INSERT into medicine_intake (date,taken,userID) VALUES( \'" + str(date)  +'\' , \''+ str(taken) +'\' , \'' + str(userID) + '\') ;')
	cursor.execute('COMMIT;')
	table = cursor.fetchall()
	return table

#edit med intake
def edit_med_data(userID, date, taken):
	cursor = Database.db_connect()
	cursor.execute('START TRANSACTION;')
	cursor.execute("UPDATE medicine_intake SET taken = \'" + str(taken) + "\' WHERE userID= \'" + str(userID) +"\' and date = \'" + str(date) + "\';")
	cursor.execute('COMMIT;')
	table = cursor.fetchall()
	return table

# ------ new med data ------

#get new med
def get_new_med_data(userID, date):
	cursor = Database.db_connect()
	cursor.execute("SELECT name, frequency, duration, startDate, endDate FROM medicine WHERE DATE(date) = DATE(\'" + str(date) + '\') and userID = \'' + str(userID) + '\';')
	table = cursor.fetchall()
	return table

#add new med
def add_new_med_data(userID,date,name,frequency,duration,startDate,endDate):
	cursor = Database.db_connect()
	cursor.execute('START TRANSACTION;')
	cursor.execute("INSERT into medicine (date,name,frequency,duration,startDate,endDate,userID) VALUES( \'" + str(date) +'\' , \'' + str(name) + '\', \'' + str(frequency) + '\', \'' + str(duration) + '\', \'' + str(startDate) + '\', \'' + str(endDate) + '\',\'' + str(userID) + '\') ;')
	cursor.execute('COMMIT;')
	table = cursor.fetchall()
	return table

#edit new med
def edit_new_med_data(userID,date,name,frequency,duration,startDate,endDate):
	cursor = Database.db_connect()
	cursor.execute('START TRANSACTION;')
	cursor.execute("UPDATE medicine SET name = \'" + str(name) + "\', frequency = \'" + str(frequency) + "\', duration = \'" + str(duration) + "\', startDate = \'" + str(startDate) + "\', endDate = \'" + str(endDate) + "\' WHERE userID= \'" + str(userID) +"\' and DATE(date) = DATE(\'" + str(date) + "\');")
	cursor.execute('COMMIT;')
	table = cursor.fetchall()
	return table
    
