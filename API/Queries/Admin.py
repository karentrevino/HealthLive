import MySQLdb
from DB import DbConnect as Database
import requests


def get_all_admins():
	cursor = Database.db_connect()
	cursor.execute("SELECT * FROM administrator")

	# print all the first cell of all the rows
	for row in cursor.fetchall() :
	    print row[0]
	    