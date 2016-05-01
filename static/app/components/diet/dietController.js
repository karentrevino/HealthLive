HealthLive.controller('dietController', ['$scope', '$location','$rootScope','$http','$q','$cookies','$cookieStore',
	function($scope,$location,$rootScope,$http,$q,$cookies,$cookieStore, Idle) {
	    $scope.labels = [];

	    $scope.data = [[]];
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
			//console.log(moment(mondayDate).day("Monday").toDate())
			var Monday = $http.get('/api/getDietData', {params: {"User_ID": $rootScope.user.user_id,"Date": moment(mondayDate).day("Monday").toDate(),}})
			

	
		    var Tuesday = $http.get('/api/getDietData', {params: {"User_ID": $rootScope.user.user_id,"Date": moment(mondayDate).day("Tuesday").toDate(),}})
		
		    var Wednesday = $http.get('/api/getDietData', {params: {"User_ID": $rootScope.user.user_id,"Date": moment(mondayDate).day("Wednesday").toDate(),}})
			
		    var Thursday = $http.get('/api/getDietData', {params: {"User_ID": $rootScope.user.user_id,"Date": moment(mondayDate).day("Thursday").toDate(),}})
		    var Friday = $http.get('/api/getDietData', {params: {"User_ID": $rootScope.user.user_id,"Date":moment(mondayDate).day("Friday").toDate(),}})
		
		    var Saturday = $http.get('/api/getDietData', {params: {"User_ID": $rootScope.user.user_id,"Date": moment(mondayDate).day("Saturday").toDate(),}})
		    var Sunday = $http.get('/api/getDietData', {params: {"User_ID": $rootScope.user.user_id,"Date": moment(mondayDate).day("Sunday").add("7","days").toDate(),}})
			
			$q.all([Monday,Tuesday,Wednesday, Thursday,Friday,Saturday,Sunday]).then(function(arrayOfResults){
				$scope.mealData[ moment(mondayDate).day("Monday").toDate()] = arrayOfResults[0].data
				$scope.mealData[ moment(mondayDate).day("Tuesday").toDate()] = arrayOfResults[1].data
				$scope.mealData[ moment(mondayDate).day("Wednesday").toDate()] = arrayOfResults[2].data
				$scope.mealData[ moment(mondayDate).day("Thursday").toDate()] = arrayOfResults[3].data
				$scope.mealData[ moment(mondayDate).day("Friday").toDate()] = arrayOfResults[4].data
				$scope.mealData[ moment(mondayDate).day("Saturday").toDate()] = arrayOfResults[5].data
				$scope.mealData[ moment(mondayDate).day("Sunday").toDate()] = arrayOfResults[5].data
				//console.log($scope.mealData)
				//$scope.buildChart()
			})
			
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
			$scope.editData=meal
			$scope.mode="edit"
		}
		
		$scope.saveData = function(){
		    $http.get('/api/editMealData', {
				params: {"User_ID": $rootScope.user.user_id,
				"Date": moment($scope.editData.displayDate).format('YYYY-MM-DD HH:mm:ss'),
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
		    $http.get('/api/addMealData', {
				params: {"User_ID": $rootScope.user.user_id,
				"Date": moment($scope.editData.displayDate).format('YYYY-MM-DD HH:mm:ss'),
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