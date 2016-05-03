HealthLive.controller('sleepController', ['$scope', '$location','$rootScope','$http','$q','$cookies','$cookieStore',
	function($scope,$location,$rootScope,$http,$q,$cookies,$cookieStore, Idle) {
	    $scope.labels = [];

	    $scope.data = [[]];
		$scope.colours = [{
		    fillColor: '#2196f3'
		}];

		if($cookieStore.get('logged')){
			$rootScope.logged=true;
			$rootScope.user = $cookieStore.get('user')
		
			
		
		}
		//sevenDaysDate

		//$scope.lastMonday.subtract("7", "days")
		//console.log($scope.lastMonday)
		
		$scope.buildData= function(mondayDate){
			$scope.sleepData = []
			var MondayDate = moment(mondayDate).day(1).format("YYYY-MM-DD HH:mm:ss")
			var TuesdayDate = moment(mondayDate).day(2).format("YYYY-MM-DD HH:mm:ss")
			var WednesdayDate = moment(mondayDate).day(3).format("YYYY-MM-DD HH:mm:ss")
			var ThursdayDate = moment(mondayDate).day(4).format("YYYY-MM-DD HH:mm:ss")
			var FridayDate = moment(mondayDate).day(5).format("YYYY-MM-DD HH:mm:ss")
			var SaturdayDate = moment(mondayDate).day(6).format("YYYY-MM-DD HH:mm:ss")
			var SundayDate = moment(mondayDate).day(7).format("YYYY-MM-DD HH:mm:ss")
			//console.log(moment(mondayDate).day("Monday").toDate())
			var Monday = $http.get('/api/getSleepData', {params: {"User_ID": $rootScope.user.user_id,"Date": MondayDate,}})
			

	
		    var Tuesday = $http.get('/api/getSleepData', {params: {"User_ID": $rootScope.user.user_id,"Date": TuesdayDate,}})
		
		    var Wednesday = $http.get('/api/getSleepData', {params: {"User_ID": $rootScope.user.user_id,"Date": WednesdayDate,}})
			
		    var Thursday = $http.get('/api/getSleepData', {params: {"User_ID": $rootScope.user.user_id,"Date": ThursdayDate,}})
		    var Friday = $http.get('/api/getSleepData', {params: {"User_ID": $rootScope.user.user_id,"Date":FridayDate,}})
		
		    var Saturday = $http.get('/api/getSleepData', {params: {"User_ID": $rootScope.user.user_id,"Date": SaturdayDate,}})
		    var Sunday = $http.get('/api/getSleepData', {params: {"User_ID": $rootScope.user.user_id,"Date": SundayDate,}})
			
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
		    $http.get('/api/editSleepData', {params: {"User_ID": $rootScope.user.user_id,"Date": moment($scope.editData.date).utc().format('YYYY-MM-DD HH:mm:ss'),"Duration":$scope.editData.duration}
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