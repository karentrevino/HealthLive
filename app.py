import flask
from flask import jsonify, request
from API.Queries import Student
from API.Queries import Users
import httplib

app = flask.Flask(__name__)

#default
@app.route('/')
def index():
    return app.send_static_file('index.html')
#class search, returns json list of classes
@app.route ('/api/classSearch', methods=['GET'])
def get_all_classes():
	all_classes = Student.get_all_classes()
	classes = list()
	for Class in all_classes:
		new_class ={
		'course_title' : Class[0]+ " " +str(Class[1]),
	    'course_description' : Class[2],
	    'enrolled': False
		}
		classes.append(new_class)

	return jsonify(results=classes)

#get all users, returns json list of users
@app.route ('/api/viewUsers', methods=['GET'])
def get_all_users():
	all_persons = Users.get_all_users()
	persons = list()
	for person in all_persons:
		new_person = {
		'UTSW_ID' : person[0],
	    'first_name' : person[1],
	    'middle_name': person[2],
	    'last_name': person[3],
	    'birth_date': person[4].isoformat(),
	    'physical_address': person[5],
	    'mailing_adddress': person[6],
	    'race': person[7],
	    'net_id': person[8],
	    'pw': person[9],
		}
		persons.append(new_person)

	return jsonify(results=persons)	


#login, returns json of user
@app.route ('/api/login', methods=['GET'])
def login():
	netid = request.args['netid']
	user_db = Users.check_if_user_exists(netid)
	count = 0
	for users in user_db:
		logged_user = users
		count +=1
	if count ==1:
		user = {
		'password': logged_user[0],
		'role': logged_user[1],
		'utsw_id': logged_user[2],
		'net_id': logged_user[3],
		}
	else:
		user = {
		'password': "",
		'role':"" ,
		'utsw_id':"",
		'net_id':"" ,
		}
	return jsonify(user)
    
# grades, returns student grades
@app.route ('/api/grades', methods=['GET'])
def get_grades():
	netid = request.args['netid']
	assignments = list()

	student_grades = Student.get_all_student_grades(netid)

	for Assignment in student_grades:
	    new_assignment ={
	    'assignment_id' : Assignment[0],
	    'grade' : Assignment[2],
        'class' : Assignment[4] +" " + str(Assignment[5]),
		}
	    assignments.append(new_assignment)
        
	return jsonify(results=assignments)
    

@app.route ('/api/studentClasses', methods=['GET'])
def get_student_classes():
	print(request.args['netid'])
	netid = request.args['netid']
	classes = list()

	student_classes = Student.get_all_student_classes(netid)

	for Class in student_classes:
	    new_class ={
        'class' : Class[0] +" " + str(Class[1]),
        'completed' : Class[4],
        'finalGrade' : Class[5],
		}
	    classes.append(new_class)
        
	return jsonify(results=classes)
    
@app.route ('/api/getProfileInfo', methods=['GET'])
def user_profile_info():
	netid = request.args['netid']
	users = Users.user_profile_info(netid)

	for user in users:
		person = user

	p = {
    'first_name': person[0],
	'last_name': person[1],
	'net_id': person[2],
	'utsw_id': person[3],
	'email': person[4],
	'role': person[5],
	}
	return jsonify(results=p)	

    
if __name__ == '__main__':
	app.debug = True
	app.run()