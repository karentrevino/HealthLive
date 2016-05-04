import MySQLdb
from API.DB import DbConnect as Database
from flask import jsonify

def get_alcohol_data(user_id, date):
	cursor = Database.db_connect()
	cursor.execute("SELECT date, amount, type, alcByVol, userID FROM alcohol WHERE DATE(date) = DATE(\'" + str(date) + '\') and userID = \'' + str(user_id) + '\';')
	table = cursor.fetchall()
	return table
    
def add_alcohol_data(user_id, date,amount,type,alcByVol):
	cursor = Database.db_connect()
	cursor.execute('START TRANSACTION;')
	print("INSERT into alcohol (date,amount,type,alcByVol,userID) VALUES( \'" + str(date) +'\' , \'' + str(amount) + '\',\'' + str(type) + '\',\'' + str(alcByVol) + '\', \'' + str(user_id) + '\') ;')
	cursor.execute("INSERT into alcohol (date,amount,type,alcByVol,userID) VALUES( \'" + str(date) +'\' , \'' + str(amount) + '\',\'' + str(type) + '\',\'' + str(alcByVol) + '\', \'' + str(user_id) + '\') ;')
	cursor.execute('COMMIT;')
	table = cursor.fetchall()
	return table
    
def edit_alcohol_data(user_id, date, amount, type, alcByVol):
	cursor = Database.db_connect()
	cursor.execute('START TRANSACTION;')
	print("UPDATE alcohol SET amount = \'" +str(amount) + "\' , type = \'"+ str(type) + "\', alcByVol = \'" + str(alcByVol) + '\', WHERE userID= \'' + str(user_id) +"\' and DATE(date) = DATE(\'" + str(date) + "\');")
	cursor.execute("UPDATE alcohol SET amount = \'" +str(amount) + "\' , type = \'"+ str(type) + "\', alcByVol = \'" + str(alcByVol) + '\' WHERE userID= \'' + str(user_id) +"\' and DATE(date) = DATE(\'" + str(date) + "\');")
	cursor.execute('COMMIT;')
	table = cursor.fetchall()
	return table