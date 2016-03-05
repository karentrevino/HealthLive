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