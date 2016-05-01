import MySQLdb
from API.DB import DbConnect as Database
from flask import jsonify

def get_all_classes():
	cursor = Database.db_connect()
	cursor.execute("SELECT * FROM class")
	table = cursor.fetchall()	
	return table
def get_all_student_classes(utswid):
	cursor = Database.db_connect()
	cursor.execute("SELECT * FROM student_class, user where user.UTSW_ID = student_class.UTSW_ID AND user.NET_ID ="+str(utswid))
	table = cursor.fetchall()	
	return table
    
def get_all_student_grades(utswid):
	cursor = Database.db_connect()
	cursor.execute("SELECT * FROM student_assignment, assignments, class, user where student_assignment.Assignment_id = assignments.Assignment_id AND assignments.Department = class.Department AND assignments.Course_number = class.Course_number AND user.UTSW_ID = student_assignment.Student_id AND user.NET_ID="+str(utswid))
	table = cursor.fetchall()	
	return table
    
def get_student_info(netid):
    cursor = Database.db_connect("SELECT * FROM student, user WHERE student.UTSW_ID = user.UTSW_ID AND user.NET_ID=" + str(netid))
    cursor.execute()
    table = cursor.fetchall()
    return table

def import_user(fn, mn, ln, email, role, account_type, account_status):
	pw = id_generator()
	# id_num, netid will be returned by the function
	args = (fn, mn, ln, email, role, account_type, account_status, pw, 0, '0')
	cursor = Database.db_connect()
	cursor.execute('START TRANSACTION;')
	cursor.callproc('addUser', args)
	cursor.execute('SELECT @_addUser_8, @_addUser_9')
	result_args = cursor.fetchall();
	cursor.execute('COMMIT;')
	print 'result_args: ' + str(result_args)
	print 'Added_user:'+str(result_args[0])
	cursor.close()
	# returns created UID, netid, and password
	return result_args[0][0], result_args[0][1], pw