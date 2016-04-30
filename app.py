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
	email = request.args['email']
	user_db = Users.check_if_user_exists(email)
	count = 0
	for users in user_db:
		logged_user = users
		count +=1
	if count ==1:
		user = {
		'user_id': logged_user[0],
		'email': logged_user[1],
		'last_name': logged_user[2],
		'first_name': logged_user[3],
		'password': logged_user[4],
		}
	else:
		user = {
		'user_id': "",
		'email': "",
		'last_name': "",
		'first_name': "",
		'password': "",
		}
	return jsonify(user)
    
@app.route ('/api/getSleepData', methods=['GET'])
def get_sleep_data():
	date = request.args['Date']
	userID = request.args['User_ID']

    
	sleepData = Users.get_sleep_data(userID, date)
	print(sleepData)
	sleep_day={'date': "", "duration": "", 'displayDate': date}
    
	for sleep in sleepData:
		sleep_day['date'] = sleep[0]
		sleep_day['duration'] = sleep[1]
    
	'''for users in user_db:
		logged_user = users
		count +=1
	if count ==1:
		user = {
		'user_id': logged_user[0],
		'email': logged_user[1],
		'last_name': logged_user[2],
		'first_name': logged_user[3],
		'password': logged_user[4],
		}
	else:
		user = {
		'user_id': "",
		'email': "",
		'last_name': "",
		'first_name': "",
		'password': "",
		}'''
	return jsonify(sleep_day)
    
@app.route ('/api/addSleepData', methods=['GET'])
def add_sleep_data():
	date = request.args['Date']
	userID = request.args['User_ID']
	duration = request.args['Duration']

    
	check = Users.add_sleep_data(userID, date, duration)

	return jsonify(check)
    
@app.route ('/api/editSleepData', methods=['GET'])
def edit_sleep_data():
	date = request.args['Date']
	userID = request.args['User_ID']
	duration = request.args['Duration']
	print(date, userID, duration)
    
	check = Users.edit_sleep_data(userID, date, duration)

	return jsonify(check)


    
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