HealthLive.controller('sleepController', ['$scope', '$location','$rootScope','$http','$cookies','$cookieStore',
	function($scope,$location,$rootScope,$http,$cookies,$cookieStore, Idle) {

		if($cookieStore.get('logged')){
			$rootScope.logged=true;
			$rootScope.user = $cookieStore.get('user')
		

		
		}
		//sevenDaysDate
		$scope.todayDate = moment()
		$scope.lastMonday = moment($scope.todayDate).day("Monday")
		console.log($scope.lastMonday)
		

		$scope.sleepData = []
	    $http.get('/api/getSleepData', {params: {"User_ID": $rootScope.user.user_id,"Date": moment($scope.todayDate).day("Monday").toDate(),}
	    }).success(function(data, status, headers, config) {
			console.log(moment($scope.todayDate).day("Monday").format("dddd, MMMM Do YYYY, h:mm:ss a"))
			console.log(data)
			$scope.sleepData.push(data)
	    }).error(function(data, status){console.log("failed")});
	
	    $http.get('/api/getSleepData', {params: {"User_ID": $rootScope.user.user_id,"Date": moment($scope.todayDate).day("Tuesday").toDate(),}
	    }).success(function(data, status, headers, config) {
			console.log(moment($scope.todayDate).day("Tuesday").format("dddd, MMMM Do YYYY, h:mm:ss a"))
			console.log(data)
			$scope.sleepData.push(data)
	    }).error(function(data, status){console.log("failed")});
		
	    $http.get('/api/getSleepData', {params: {"User_ID": $rootScope.user.user_id,"Date": moment($scope.todayDate).day("Wednesday").toDate(),}
	    }).success(function(data, status, headers, config) {
			console.log(moment($scope.todayDate).day("Wednesday").format("dddd, MMMM Do YYYY, h:mm:ss a"))
			console.log(data)
			$scope.sleepData.push(data)
	    }).error(function(data, status){console.log("failed")});
		
	    $http.get('/api/getSleepData', {params: {"User_ID": $rootScope.user.user_id,"Date": moment($scope.todayDate).day("Thursday").toDate(),}
	    }).success(function(data, status, headers, config) {
			console.log(moment($scope.todayDate).day("Thursday").format("dddd, MMMM Do YYYY, h:mm:ss a"))
			console.log(data)
			$scope.sleepData.push(data)
	    }).error(function(data, status){console.log("failed")});
		
	    $http.get('/api/getSleepData', {params: {"User_ID": $rootScope.user.user_id,"Date":moment($scope.todayDate).day("Friday").toDate(),}
	    }).success(function(data, status, headers, config) {
			console.log(moment($scope.todayDate).day("Friday").format("dddd, MMMM Do YYYY, h:mm:ss a"))
			console.log(data)
			$scope.sleepData.push(data)
	    }).error(function(data, status){console.log("failed")});
		
	    $http.get('/api/getSleepData', {params: {"User_ID": $rootScope.user.user_id,"Date": moment($scope.todayDate).day("Saturday").toDate(),}
	    }).success(function(data, status, headers, config) {
			console.log(moment($scope.todayDate).day("Saturday").format("dddd, MMMM Do YYYY, h:mm:ss a"))
			console.log(data)
			$scope.sleepData.push(data)
	    }).error(function(data, status){console.log("failed")});
		
	    $http.get('/api/getSleepData', {params: {"User_ID": $rootScope.user.user_id,"Date": moment($scope.todayDate).day("Sunday").toDate(),}
	    }).success(function(data, status, headers, config) {
			console.log(moment($scope.todayDate).day("Sunday").format("dddd, MMMM Do YYYY, h:mm:ss a"))
			console.log(data)
			$scope.sleepData.push(data)
	    }).error(function(data, status){console.log("failed")});
		


}]);