HealthLive.controller('dietController', ['$scope', '$location','$rootScope','$http','$q','$cookies','$cookieStore',
	function($scope,$location,$rootScope,$http,$q,$cookies,$cookieStore, Idle) {
	    $scope.labels = [];

	    $scope.data = [[]];
		$scope.colours = [{
		    fillColor: '#9c27b0'
		}];
		$scope.mealTemplate = {'date': "", "calories": "", 'displayDate':"", "amount": "", "type": "", "foodOrDrink": "","name":""}

		if($cookieStore.get('logged')){
			$rootScope.logged=true;
			$rootScope.user = $cookieStore.get('user')
		
			
		
		}
		//sevenDaysDate

		//$scope.lastMonday.subtract("7", "days")
		//console.log($scope.lastMonday)
		
		$scope.buildData= function(mondayDate){
			$scope.mealData = {}
			//console.log(moment().day(1).format("YYYY-MM-DD HH:mm:ss"))
			
			var MondayDate = moment(mondayDate).day(1).format("YYYY-MM-DD HH:mm:ss")
			var TuesdayDate = moment(mondayDate).day(2).format("YYYY-MM-DD HH:mm:ss")
			var WednesdayDate = moment(mondayDate).day(3).format("YYYY-MM-DD HH:mm:ss")
			var ThursdayDate = moment(mondayDate).day(4).format("YYYY-MM-DD HH:mm:ss")
			var FridayDate = moment(mondayDate).day(5).format("YYYY-MM-DD HH:mm:ss")
			var SaturdayDate = moment(mondayDate).day(6).format("YYYY-MM-DD HH:mm:ss")
			var SundayDate = moment(mondayDate).day(7).format("YYYY-MM-DD HH:mm:ss")
			
			
			//console.log(moment(mondayDate).day("Monday").toDate())
			var Monday = $http.get('/api/getDietData', {params: {"User_ID": $rootScope.user.user_id,"Date": MondayDate,}})
			

	
		    var Tuesday = $http.get('/api/getDietData', {params: {"User_ID": $rootScope.user.user_id,"Date": TuesdayDate,}})
		
		    var Wednesday = $http.get('/api/getDietData', {params: {"User_ID": $rootScope.user.user_id,"Date": WednesdayDate,}})
			
		    var Thursday = $http.get('/api/getDietData', {params: {"User_ID": $rootScope.user.user_id,"Date": ThursdayDate,}})
		    var Friday = $http.get('/api/getDietData', {params: {"User_ID": $rootScope.user.user_id,"Date": FridayDate,}})
		
		    var Saturday = $http.get('/api/getDietData', {params: {"User_ID": $rootScope.user.user_id,"Date": SaturdayDate,}})
		    var Sunday = $http.get('/api/getDietData', {params: {"User_ID": $rootScope.user.user_id,"Date": SundayDate,}})
			
			$q.all([Monday,Tuesday,Wednesday, Thursday,Friday,Saturday,Sunday]).then(function(arrayOfResults){
				$scope.mealData[MondayDate] = arrayOfResults[0].data
				$scope.mealData[TuesdayDate] = arrayOfResults[1].data
				$scope.mealData[WednesdayDate] = arrayOfResults[2].data
				$scope.mealData[ThursdayDate] = arrayOfResults[3].data
				$scope.mealData[FridayDate] = arrayOfResults[4].data
				$scope.mealData[SaturdayDate] = arrayOfResults[5].data
				$scope.mealData[SundayDate] = arrayOfResults[6].data
				
				console.log($scope.mealData)
				//$scope.buildChart()
				$scope.getCaloriesGoal(mondayDate)
			})
			
		}
		
		$scope.getCaloriesGoal = function(mondayDate){
			
			
			var MondayDate = moment(mondayDate).day(1).format("YYYY-MM-DD HH:mm:ss")
			var TuesdayDate = moment(mondayDate).day(2).format("YYYY-MM-DD HH:mm:ss")
			var WednesdayDate = moment(mondayDate).day(3).format("YYYY-MM-DD HH:mm:ss")
			var ThursdayDate = moment(mondayDate).day(4).format("YYYY-MM-DD HH:mm:ss")
			var FridayDate = moment(mondayDate).day(5).format("YYYY-MM-DD HH:mm:ss")
			var SaturdayDate = moment(mondayDate).day(6).format("YYYY-MM-DD HH:mm:ss")
			var SundayDate = moment(mondayDate).day(7).format("YYYY-MM-DD HH:mm:ss")
			
			
			//console.log(moment(mondayDate).day("Monday").toDate())
			var Monday = $http.get('/api/getCaloriesGoal', {params: {"User_ID": $rootScope.user.user_id,"Date": MondayDate,}})
		    var Tuesday = $http.get('/api/getCaloriesGoal', {params: {"User_ID": $rootScope.user.user_id,"Date": TuesdayDate,}})
		    var Wednesday = $http.get('/api/getCaloriesGoal', {params: {"User_ID": $rootScope.user.user_id,"Date": WednesdayDate,}})
		    var Thursday = $http.get('/api/getCaloriesGoal', {params: {"User_ID": $rootScope.user.user_id,"Date": ThursdayDate,}})
		    var Friday = $http.get('/api/getCaloriesGoal', {params: {"User_ID": $rootScope.user.user_id,"Date": FridayDate,}})
		    var Saturday = $http.get('/api/getCaloriesGoal', {params: {"User_ID": $rootScope.user.user_id,"Date": SaturdayDate,}})
		    var Sunday = $http.get('/api/getCaloriesGoal', {params: {"User_ID": $rootScope.user.user_id,"Date": SundayDate,}})
			
			$q.all([Monday,Tuesday,Wednesday, Thursday,Friday,Saturday,Sunday]).then(function(arrayOfResults){
				$scope.mealData[MondayDate]["calorieGoal"] = arrayOfResults[0].data.results[0]
				$scope.mealData[TuesdayDate]["calorieGoal"] = arrayOfResults[1].data.results[0]
				$scope.mealData[WednesdayDate]["calorieGoal"] = arrayOfResults[2].data.results[0]
				$scope.mealData[ThursdayDate]["calorieGoal"] = arrayOfResults[3].data.results[0]
				$scope.mealData[FridayDate]["calorieGoal"] = arrayOfResults[4].data.results[0]
				$scope.mealData[SaturdayDate]["calorieGoal"] = arrayOfResults[5].data.results[0]
				$scope.mealData[SundayDate]["calorieGoal"] = arrayOfResults[6].data.results[0]
				
				console.log($scope.mealData)
				$scope.buildChart()
			})
			
		}
		
		$scope.buildChart = function(){
		    $scope.labels = [];
		    $scope.data = [[]];
			for(var index in $scope.mealData){
				var totalCal = 0
				$scope.labels.push(moment($scope.mealData[index].results.displayData).format('MMM D'))
				for(var subind in $scope.mealData[index].results){
					totalCal = totalCal + parseInt($scope.mealData[index].results[subind].calories)
				}
				$scope.data[0].push(parseInt(totalCal))
			}
		}
		
		$scope.calorieEditMode = function(day,calorieGoal){
			console.log("calorieEditMode", calorieGoal)
			$scope.editData = {}
			$scope.editData["displayDate"] = day
			if(calorieGoal == null){
				$scope.calorieMode = "add"
				$scope.editData["calories"] = 0
			}
			else{
				
				$scope.editData["calories"] = calorieGoal
				$scope.calorieMode = "edit"
				
			}
		}
		
		$scope.saveCalories = function(date,caloriesGoal){
		    $http.get('/api/editCaloriesGoal', {params: {"User_ID": $rootScope.user.user_id,"Date": moment(date).utc().format('YYYY-MM-DD HH:mm:ss'),"CaloriesGoal":caloriesGoal}
		    }).success(function(data, status, headers, config) {
				
				$scope.calorieMode=""
				$scope.buildData($scope.lastMonday)
				$scope.editData =""
		    }).error(function(data, status){console.log("failed")});
			
		}
		
		$scope.addCalories = function(date,caloriesGoal){
		    $http.get('/api/addCaloriesGoal', {params: {"User_ID": $rootScope.user.user_id,"Date": moment(date).utc().format('YYYY-MM-DD HH:mm:ss'),"CaloriesGoal":caloriesGoal}
		    }).success(function(data, status, headers, config) {
				$scope.buildData($scope.lastMonday)
				$scope.calorieMode=""
				$scope.editData =""
		    }).error(function(data, status){console.log("failed")});
			
		}
		
		
		
		$scope.nextWeek = function(){
			$scope.lastMonday.add("7", "days")
			$scope.buildData($scope.lastMonday)
		}
		
		$scope.lastWeek = function(){
			$scope.lastMonday.subtract("7", "days")
			$scope.buildData($scope.lastMonday)
		}
		
		$scope.editMode = function(meal){
			console.log("edit", meal)
			$scope.editData=meal
			$scope.mode="edit"
		}
		
		$scope.saveData = function(){
		    $http.get('/api/editMealData', {
				params: {"User_ID": $rootScope.user.user_id,
				"Date": moment($scope.editData.date).utc().format('YYYY-MM-DD HH:mm:ss'),
				"Name":$scope.editData.name, 
				"Amount":$scope.editData.amount, 
				"Calories":$scope.editData.calories,
				"Type":$scope.editData.type,
				"FoodOrDrink":$scope.editData.foodOrDrink}
		    }).success(function(data, status, headers, config) {
				console.log($scope.editData.date)
				console.log(" ")
				console.log(moment(new Date($scope.editData.date)).format('YYYY-MM-DD HH:mm:ss'))
				$scope.editData={}
				$scope.mode=""
				$scope.buildData($scope.lastMonday)
		    }).error(function(data, status){console.log("failed")});
			
		}
		$scope.addMode=function(day){
			console.log(day)
			$scope.editData = angular.copy($scope.mealTemplate)
			$scope.editData.displayDate = day
			$scope.editData.date = $scope.editData.displayDate
			console.log($scope.editData)
			$scope.mode="add"
		}
		
		$scope.addData = function(){
			var current = moment()
		    $http.get('/api/addMealData', {
				params: {"User_ID": $rootScope.user.user_id,
				"Date": moment($scope.editData.displayDate).hour(current.hour()).minute(current.minutes()).seconds(current.seconds()).format('YYYY-MM-DD HH:mm:ss'),
				"Name":$scope.editData.name, 
				"Amount":$scope.editData.amount, 
				"Calories":$scope.editData.calories,
				"Type":$scope.editData.type,
				"FoodOrDrink":$scope.editData.foodOrDrink}
		    }).success(function(data, status, headers, config) {
				console.log(data)
				$scope.editData={}
				$scope.mode=""
				$scope.buildData($scope.lastMonday)
		    }).error(function(data, status){console.log("failed")});
			
		}
		

		function init(){
			$scope.todayDate = moment()
			$scope.lastMonday = $scope.todayDate.day("Monday")
			console.log($scope.lastMonday)
			$scope.buildData($scope.lastMonday)
			
		}
		
		init()

}]);