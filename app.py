import flask
from flask import jsonify, request
from API.Queries import Exercise
from API.Queries import Sleep
from API.Queries import Users
from API.Queries import Diet
from API.Queries import  Medicine
from API.Queries import  Alcohol
#from API.Queries import Alcohol
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
    
###########################################

# ----- SLEEP APIs -------
@app.route ('/api/getSleepData', methods=['GET'])
def get_sleep_data():
	date = request.args['Date']
	userID = request.args['User_ID']

    
	sleepData = Sleep.get_sleep_data(userID, date)
	print(sleepData)
	sleep_day={'date': "", "duration": "", 'displayDate': date}
    
	for sleep in sleepData:
		sleep_day['date'] = sleep[0]
		sleep_day['duration'] = sleep[1]
    
	return jsonify(sleep_day)
    
@app.route ('/api/addSleepData', methods=['GET'])
def add_sleep_data():
	date = request.args['Date']
	userID = request.args['User_ID']
	duration = request.args['Duration']

    
	check = Sleep.add_sleep_data(userID, date, duration)

	return jsonify(check)
    
@app.route ('/api/editSleepData', methods=['GET'])
def edit_sleep_data():
	date = request.args['Date']
	userID = request.args['User_ID']
	duration = request.args['Duration']
	print(date, userID, duration)
    
	check = Sleep.edit_sleep_data(userID, date, duration)

	return jsonify(check)
    
# --------- MEAL/DIET APIs -----------
@app.route ('/api/getDietData', methods=['GET'])
def get_diet_data():
	date = request.args['Date']
	print("------------------" + date)
	userID = request.args['User_ID']

    
	mealData = Diet.get_diet_data(userID, date)
	day_meals = []
	diet_meal={'date': "", "calories": "", 'displayDate': date, "amount": "", "type": "", "foodOrDrink": "","name":""}
    
	for meal in mealData:
		diet_meal={'date': "", "calories": "", 'displayDate': date, "amount": "", "type": "", "foodOrDrink": ""}
		diet_meal['date'] = meal[0]
		diet_meal['calories'] = meal[1]
		diet_meal['amount'] = meal[2]
		diet_meal['name'] = meal[3]
		diet_meal['type'] = meal[4]
		diet_meal['foodOrDrink'] = meal[5]
		day_meals.append(diet_meal)

	print("meals!!!!!!", day_meals)
	return jsonify(results=day_meals)
    
@app.route ('/api/addMealData', methods=['GET'])
def add_meal_data():
	date = request.args['Date']
	userID = request.args['User_ID']
	name = request.args['Name']
	calories = request.args['Calories']
	amount = request.args['Amount']
	type = request.args['Type']
	foodOrDrink = request.args['FoodOrDrink']
	print("add meals!!!!!!", date)

    
	check = Diet.add_meal_data(userID, date, name, amount,calories,type, foodOrDrink)

	return jsonify(check)

@app.route ('/api/editMealData', methods=['GET'])
def edit_meal_data():
	date = request.args['Date']
	userID = request.args['User_ID']
	name = request.args['Name']
	calories = request.args['Calories']
	amount = request.args['Amount']
	type = request.args['Type']
	foodOrDrink = request.args['FoodOrDrink']
	check = Diet.edit_meal_data(userID, date, name, amount,calories,type, foodOrDrink)

	return jsonify(check)
    
@app.route ('/api/getCaloriesGoal', methods=['GET'])
def get_calories_goal():
	date = request.args['Date']
	userID = request.args['User_ID']

    
	caloriesData = Diet.get_calories_data(userID, date)

	return jsonify(results=caloriesData)
    
@app.route ('/api/addCaloriesGoal', methods=['GET'])
def add_calories_goal():
	date = request.args['Date']
	userID = request.args['User_ID']
	caloriesGoal = request.args['CaloriesGoal']

    
	check = Diet.add_calories_data(userID, date,caloriesGoal)

	return jsonify(results=check)
    
@app.route ('/api/editCaloriesGoal', methods=['GET'])
def edit_calories_goal():
	date = request.args['Date']
	userID = request.args['User_ID']
	caloriesGoal = request.args['CaloriesGoal']

    
	check = Diet.edit_calories_data(userID, date,caloriesGoal)

	return jsonify(results=check)

# -------- EXERCISE APIs ----------
#exercise
@app.route ('/api/getExerciseData', methods=['GET'])
def get_exercise_data():
	date = request.args['Date']
	print("------------------" + date)
	userID = request.args['User_ID']

    
	exData = Exercise.get_exercise_data(userID, date)
	workout = []
	one_exercise={'date': "", "muscleGroup": "", 'displayDate': date, "duration": ""}
    
	for exercise in exData:
		one_exercise={'date': "", "muscleGroup": "", 'displayDate': date, "duration": ""}
		one_exercise['date'] = exercise[0]
		one_exercise['muscleGroup'] = exercise[1]
		one_exercise['duration'] = exercise[2]
		workout.append(one_exercise)

	print("exercises!!!", workout)
	return jsonify(results=workout)

@app.route ('/api/addExerciseData', methods=['GET'])
def add_exercise_data():
	date = request.args['Date']
	userID = request.args['User_ID']
	muscleGroup = request.args['MuscleGroup']
	duration = request.args['Duration']

	updated = Exercise.add_exercise_data(userID,date,muscleGroup,duration)

	return jsonify(updated)

@app.route ('/api/editExerciseData', methods=['GET'])
def edit_exercise_data():
	date = request.args['Date']
	userID = request.args['User_ID']
	muscleGroup = request.args['MuscleGroup']
	duration = request.args['Duration']

	updated = Exercise.edit_exercise_data(userID,date,muscleGroup,duration)

	return jsonify(updated)

#exercise goal
@app.route ('/api/getExerciseGoal', methods=['GET'])
def get_exercise_goal():
	date = request.args['Date']
	userID = request.args['User_ID']

	exerciseGoalData = Exercise.get_exercise_goal_data(userID, date)
	for g in exerciseGoalData:
		goal = g

	print("exGoal")

	e = {
		'muscle_goal': goal[0],
		'duration': goal[1],
	}
	return jsonify(results=e)

@app.route ('/api/editExerciseGoal', methods=['GET'])
def edit_exercise_goal():
	date = request.args['Date']
	userID = request.args['User_ID']
	muscleGoal = request.args['MuscleGoal']
	durationGoal = request.args['DurationGoal']
    
	updated = Exercise.edit_exercise_goal_data(userID,date,muscleGoal,durationGoal)

	return jsonify(results=updated)

@app.route ('/api/addExerciseGoal', methods=['GET'])
def add_exercise_goal():
	date = request.args['Date']
	userID = request.args['User_ID']
	muscleGoal = request.args['MuscleGoal']
	durationGoal = request.args['DurationGoal']

	updated = Exercise.add_exercise_goal_data(userID,date,muscleGoal,durationGoal)

	return jsonify(results=updated)    

# ------ MEDICINE APIs -----------
#medicine daily intake

@app.route ('/api/getMedData', methods=['GET'])
def get_med_data():
	date = request.args['Date']
	print("------------------" + date)
	userID = request.args['User_ID']

    
	medData = Medicine.get_med_data(userID, date)
	totalMed = []
	dailyMed={'date': "", "taken": "", 'displayDate': date}
    
	for med in medData:
		dailyMed={'date': "", "taken": "", 'displayDate': date}
		dailyMed['date'] = med[0]
		dailyMed['taken'] = med[1]
		totalMed.append(dailyMed)

	print("drugssss!!!", totalMed)
	return jsonify(results=totalMed)

@app.route ('/api/addMedData', methods=['GET'])
def add_med_data():
	date = request.args['Date']
	userID = request.args['User_ID']
	taken = request.args['Taken']

	updated = Medicine.add_med_data(userID,date,taken)

	return jsonify(updated)

@app.route ('/api/editMedData', methods=['GET'])
def edit_med_data():
	date = request.args['Date']
	userID = request.args['User_ID']
	taken = request.args['Taken']

	updated = Medicine.edit_med_data(userID,date,taken)

	return jsonify(updated)

#new meds
@app.route ('/api/getNewMed', methods=['GET'])
def get_new_med():
	date = request.args['Date']
	userID = request.args['User_ID']

	newMedData = Medicine.get_new_med_data(userID, date)
	for n in newMedData:
		med = n

	m = {
		'name': med[0],
		'frequency': med[1],
		'duration': med[2],
		'startDate': med[3],
		'endDate': med[4]
	}
	return jsonify(results=m)

@app.route ('/api/editNewMed', methods=['GET'])
def edit_new_med():
	date = request.args['Date']
	userID = request.args['User_ID']
	name = request.args['Name']
	frequency = request.args['Frequency']
	duration = request.args['Duration']
	startDate = request.args['StartDate']
	endDate = request.args['EndDate']
    
	updated = Medicine.edit_new_med_data(userID,date,name,frequency,duration,startDate,endDate)

	return jsonify(results=updated)

@app.route ('/api/addNewMed', methods=['GET'])
def add_new_med():
	date = request.args['Date']
	userID = request.args['User_ID']
	name = request.args['Name']
	frequency = request.args['Frequency']
	duration = request.args['Duration']
	startDate = request.args['StartDate']
	endDate = request.args['EndDate']

	updated = Medicine.add_new_med_data(userID,date,name,frequency,duration,startDate,endDate)

	return jsonify(results=updated)    
    
    
#-------------- ALCOHOL APIs ----------------
@app.route ('/api/getAlcoholData', methods=['GET'])
def get_alcohol_data():
	date = request.args['Date']
	userID = request.args['User_ID']

    
	alcoholData = Alcohol.get_alcohol_data(userID, date)
	print(alcoholData)
	alcohol_data = []
	alcohol_day={'date': "", "amount": "", "type": "","alcByVol": "",'displayDate': date}
    
	for alcohol in alcoholData:
		alcohol_day={'date': "", "amount": "", "type": "","alcByVol": "",'displayDate': date}
		alcohol_day['date'] = alcohol[0]
		alcohol_day['amount'] = alcohol[1]
		alcohol_day['type'] = alcohol[2]
		alcohol_day['alcByVol'] = alcohol[3]
		alcohol_data.append(alcohol_day) 
    
	return jsonify(results= alcohol_data)

@app.route ('/api/addAlcoholData', methods=['GET'])
def add_alcohol_data():
	date = request.args['Date']
	userID = request.args['User_ID']
	amount = request.args['Amount']
	type = request.args['Type']
	alcByVol = request.args['AlcByVol']

    
	check = Alcohol.add_alcohol_data(userID, date, amount,type,alcByVol)

	return jsonify(check)

@app.route ('/api/editAlcoholData', methods=['GET'])
def edit_alcohol_data():
	date = request.args['Date']
	userID = request.args['User_ID']
	amount = request.args['Amount']
	type = request.args['Type']
	alcByVol = request.args['AlcByVol']
	print(date, userID, amount, type, alcByVol)
    
	check = Alcohol.edit_alcohol_data(userID, date, amount,type,alcByVol)

	return jsonify(check)
    


    


#############################################
    
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