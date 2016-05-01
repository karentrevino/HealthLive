import MySQLdb
from API.DB import DbConnect as Database
from flask import jsonify

import MySQLdb
import string
import random
from API.DB import DbConnect as Database
from flask import jsonify

def delete_user(UID):
	cursor = Database.db_connect()
	cursor.execute('START TRANSACTION;')
	cursor.execute('UPDATE users SET ACCOUNT_STATUS=\'Deleted\' WHERE users.UID='+str(UID))
	cursor.execute('COMMIT;')

def id_generator(size=10, chars=string.ascii_uppercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))

def get_all_users():
	cursor = Database.db_connect()
	cursor.execute("SELECT UID, FNAME, MNAME, LNAME, EMAIL, ROLE, NETID, ACCOUNT, ACCOUNT_STATUS FROM users")
	table = cursor.fetchall()	
	return table

def check_user_password(netid, pw):
	cursor = Database.db_connect()
	##cursor.execute("SELECT DISTINCT PW,Role,UTSW_ID,NET_ID FROM user WHERE NET_ID ="+str(netid))
	cursor.execute("SELECT UID FROM users WHERE NETID =\'"+str(netid)+"\'")
	u = cursor.fetchall()	
	
	print 'u:' + str(u[0][0])
	cursor.execute("SELECT PW FROM user_password WHERE UID ="+str(u[0][0]))
	p = cursor.fetchall();
	if p[0][0] == pw:
		print 'confirmed'
		return 'Confirmed'
	else:
		print 'error'
		return 'Error'
	#return table
def user_profile_info(netid):
	cursor = Database.db_connect()
	cursor.execute("SELECT FNAME, LNAME, UID, NETID, EMAIL, ROLE FROM users WHERE NETID =\'"+str(netid)+"\'")
	table = cursor.fetchall();
	return table
def changePassword(utsw_id,PW):
	cursor = Database.db_connect()
	cursor.execute('START TRANSACTION;')
	cursor.execute("UPDATE user_password SET PW =\'"+str(PW)+"\' WHERE UID =" +str(utsw_id))
	cursor.execute('COMMIT;')
	cursor.close()
	return 1
def get_next_id():
	cursor = Database.db_connect()
	i = 1000000000
	found = 1

	while found >= 1:
		i = i +1
		found = cursor.execute("SELECT * FROM USER WHERE UTSW_ID = "+str(i)+";")
		print 'Found = '+str(found) + ', i = ' + str(i)
	new_id = i
	return new_id

def check_if_user_exists(email):
	cursor = Database.db_connect()
	cursor.execute("SELECT DISTINCT userID,email,lname,fname,password FROM user WHERE email =\'"+str(email)+"\'")
	table = cursor.fetchall()	
	return table
