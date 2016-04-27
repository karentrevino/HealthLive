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
def create_new_class(CNAME, DESCRIPTION, INSTRUCTOR):
	"""
	Creates a new class with the given class name, class description, and instructor who will teach the class.
	Used by: Administrator only
	:param CNAME: string class name
	:param DESCRIPTION: string class description
	:param INSTRUCTOR: int instructor id
	"""
	args = (CNAME, DESCRIPTION, INSTRUCTOR, 0, 0)
	cursor = Database.db_connect()
	cursor.execute('START TRANSACTION;')
	cursor.callproc('addClass', args)
	cursor.execute('SELECT @_addClass_3, @_addClass_4')
	result_args = cursor.fetchall();
	cursor.execute('COMMIT;')
	results = {
		'classUID': result_args[0][0],
		'errorThrown': result_args[0][1]
		}
	cursor.close()
	print 'Results: '+str(results)
	# returns created UID, netid, and password
	return results