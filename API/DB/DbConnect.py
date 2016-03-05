import MySQLdb
try:
	import API.config_local as config
except:
	import API.config as config

def db_connect():
	db = MySQLdb.connect(host= config.HOST, # your host, usually localhost
	                     user= config.USER, # your username
	                      passwd= config.PASS, # your password
	                      db=config.HOTSPOT_DB) # name of the data base

	cursor = db.cursor() 
	
	return cursor

