import MySQLdb
from API.DB import DbConnect as Database
from flask import jsonify

def get_all_users():
	cursor = Database.db_connect()
	cursor.execute("SELECT * FROM user")
	table = cursor.fetchall()	
	return table
def check_if_user_exists(netid):
	cursor = Database.db_connect()
	cursor.execute("SELECT DISTINCT PW,Role,UTSW_ID,NET_ID FROM user WHERE NET_ID ="+str(netid))
	table = cursor.fetchall()	
	return table
def user_profile_info(netid):
	cursor = Database.db_connect()
	cursor.execute("SELECT FIRST_NAME, LAST_NAME, NET_ID, UTSW_ID, EMAIL, Role FROM user WHERE NET_ID ="+str(netid))
	table = cursor.fetchall()
	return table