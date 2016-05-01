HealthLive.controller('sleepController', ['$scope', '$location','$rootScope','$http','$q','$cookies','$cookieStore',
	function($scope,$location,$rootScope,$http,$q,$cookies,$cookieStore, Idle) {
	    $scope.labels = [];

	    $scope.data = [[]];

		if($cookieStore.get('logged')){
			$rootScope.logged=true;
			$rootScope.user = $cookieStore.get('user')
		
			
		
		}
		//sevenDaysDate

		//$scope.lastMonday.subtract("7", "days")
		//console.log($scope.lastMonday)
		
		$scope.buildData= function(mondayDate){
			$scope.sleepData = []
			//console.log(moment(mondayDate).day("Monday").toDate())
			var Monday = $http.get('/api/getSleepData', {params: {"User_ID": $rootScope.user.user_id,"Date": moment(mondayDate).day("Monday").toDate(),}})
			

	
		    var Tuesday = $http.get('/api/getSleepData', {params: {"User_ID": $rootScope.user.user_id,"Date": moment(mondayDate).day("Tuesday").toDate(),}})
		
		    var Wednesday = $http.get('/api/getSleepData', {params: {"User_ID": $rootScope.user.user_id,"Date": moment(mondayDate).day("Wednesday").toDate(),}})
			
		    var Thursday = $http.get('/api/getSleepData', {params: {"User_ID": $rootScope.user.user_id,"Date": moment(mondayDate).day("Thursday").toDate(),}})
		    var Friday = $http.get('/api/getSleepData', {params: {"User_ID": $rootScope.user.user_id,"Date":moment(mondayDate).day("Friday").toDate(),}})
		
		    var Saturday = $http.get('/api/getSleepData', {params: {"User_ID": $rootScope.user.user_id,"Date": moment(mondayDate).day("Saturday").toDate(),}})
		    var Sunday = $http.get('/api/getSleepData', {params: {"User_ID": $rootScope.user.user_id,"Date": moment(mondayDate).day("Sunday").add("7","days").toDate(),}})
			
			$q.all([Monday,Tuesday,Wednesday, Thursday,Friday,Saturday,Sunday]).then(function(arrayOfResults){
				$scope.sleepData.push(arrayOfResults[0].data)
				$scope.sleepData.push(arrayOfResults[1].data)
				$scope.sleepData.push(arrayOfResults[2].data)
				$scope.sleepData.push(arrayOfResults[3].data)
				$scope.sleepData.push(arrayOfResults[4].data)
				$scope.sleepData.push(arrayOfResults[5].data)
				$scope.sleepData.push(arrayOfResults[6].data)
				//console.log($scope.sleepData)
				$scope.buildChart()
			})
			
		}
		
		$scope.buildChart = function(){
			//console.log("here")
		    $scope.labels = [];
		    $scope.data = [[]];
			for(var sleep in $scope.sleepData){
				var temp = $scope.sleepData[sleep]
				$scope.labels.push(moment(temp.displayDate).format('MMM D'))
				if(temp.duration == ""){
					$scope.data[0].push(0)
				}
				else{
					$scope.data[0].push(parseInt(temp.duration))
				}
				
			}
			
			//console.log($scope.labels,$scope.data)
		}
		
		$scope.nextWeek = function(){
			$scope.lastMonday.add("7", "days")
			$scope.buildData($scope.lastMonday)
		}
		
		$scope.lastWeek = function(){
			$scope.lastMonday.subtract("7", "days")
			$scope.buildData($scope.lastMonday)
		}
		
		$scope.editMode = function(day){
			console.log("day",day)
			$scope.editData=day
			$scope.mode="edit"
		}
		
		$scope.saveData = function(){
		    $http.get('/api/editSleepData', {params: {"User_ID": $rootScope.user.user_id,"Date": moment($scope.editData.date).format('YYYY-MM-DD HH:mm:ss'),"Duration":$scope.editData.duration}
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
			$scope.editData=day
			$scope.editData.date = $scope.editData.displayDate
			$scope.mode="add"
		}
		$scope.addData = function(){
		    $http.get('/api/addSleepData', {params: {"User_ID": $rootScope.user.user_id,"Date": moment($scope.editData.displayDate).format('YYYY-MM-DD HH:mm:ss'),"Duration":$scope.editData.duration}
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
			$scope.buildData($scope.lastMonday)
			
		}
		
		init()

}]);