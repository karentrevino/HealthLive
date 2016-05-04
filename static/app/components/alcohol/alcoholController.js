HealthLive.controller('alcoholController', ['$scope', '$location','$rootScope','$http','$q','$cookies','$cookieStore',
	function($scope,$location,$rootScope,$http,$q,$cookies,$cookieStore, Idle) {
	    $scope.labels = [];

	    $scope.data = [[]];
		$scope.colours = [{
		    fillColor: '#2196f3'
		}];
		
		$scope.alcTemplate = {'date': "", "amount": "", 'displayDate':"", "type": "", "alcByVol": ""}

		if($cookieStore.get('logged')){
			$rootScope.logged=true;
			$rootScope.user = $cookieStore.get('user')
		
			
		
		}
		//sevenDaysDate

		//$scope.lastMonday.subtract("7", "days")
		//console.log($scope.lastMonday)
		
		$scope.buildData= function(mondayDate){
			$scope.alcoholData = {}
			var MondayDate = moment(mondayDate).day(1).format("YYYY-MM-DD HH:mm:ss")
			var TuesdayDate = moment(mondayDate).day(2).format("YYYY-MM-DD HH:mm:ss")
			var WednesdayDate = moment(mondayDate).day(3).format("YYYY-MM-DD HH:mm:ss")
			var ThursdayDate = moment(mondayDate).day(4).format("YYYY-MM-DD HH:mm:ss")
			var FridayDate = moment(mondayDate).day(5).format("YYYY-MM-DD HH:mm:ss")
			var SaturdayDate = moment(mondayDate).day(6).format("YYYY-MM-DD HH:mm:ss")
			var SundayDate = moment(mondayDate).day(7).format("YYYY-MM-DD HH:mm:ss")
			//console.log(moment(mondayDate).day("Monday").toDate())
			var Monday = $http.get('/api/getAlcoholData', {params: {"User_ID": $rootScope.user.user_id,"Date": MondayDate,}})
			
		    var Tuesday = $http.get('/api/getAlcoholData', {params: {"User_ID": $rootScope.user.user_id,"Date": TuesdayDate,}})
		
		    var Wednesday = $http.get('/api/getAlcoholData', {params: {"User_ID": $rootScope.user.user_id,"Date": WednesdayDate,}})
			
		    var Thursday = $http.get('/api/getAlcoholData', {params: {"User_ID": $rootScope.user.user_id,"Date": ThursdayDate,}})
		    var Friday = $http.get('/api/getAlcoholData', {params: {"User_ID": $rootScope.user.user_id,"Date":FridayDate,}})
		
		    var Saturday = $http.get('/api/getAlcoholData', {params: {"User_ID": $rootScope.user.user_id,"Date": SaturdayDate,}})
		    var Sunday = $http.get('/api/getAlcoholData', {params: {"User_ID": $rootScope.user.user_id,"Date": SundayDate,}})
			
			$q.all([Monday,Tuesday,Wednesday, Thursday,Friday,Saturday,Sunday]).then(function(arrayOfResults){
				$scope.alcoholData[MondayDate]= arrayOfResults[0].data
				$scope.alcoholData[TuesdayDate]= arrayOfResults[1].data 
				$scope.alcoholData[WednesdayDate]= arrayOfResults[2].data
				$scope.alcoholData[ThursdayDate]= arrayOfResults[3].data
				$scope.alcoholData[FridayDate]=arrayOfResults[4].data
				$scope.alcoholData[SaturdayDate]=arrayOfResults[5].data
				$scope.alcoholData[SundayDate]=arrayOfResults[6].data
				console.log($scope.alcoholData)
				$scope.buildChart()
			})
			
		}
		
		$scope.buildChart = function(){
			//console.log("here")
		    $scope.labels = [];
		    $scope.data = [[]];
			for(var alcohol in $scope.alcoholData){
				var temp = $scope.alcoholData[alcohol]
				$scope.labels.push(moment(temp.displayDate).format('MMM D'))
				if(temp.amount == ""){
					$scope.data[0].push(0)
				}
				else{
					$scope.data[0].push(parseInt(temp.amount))
				}
				if(temp.amount > 3){
					alert("Warning: you may be consuming too much alcohol\n")
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
		    $http.get('/api/editAlcoholData', {params: {"User_ID": $rootScope.user.user_id,"Date": moment($scope.editData.date).utc().format('YYYY-MM-DD HH:mm:ss'),"Type":$scope.editData.type, "Amount":$scope.editData.amount, "AlcByVol":$scope.editData.alcByVol}
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
			$scope.editData = angular.copy($scope.alcTemplate)
			$scope.editData.displayDate = day
			$scope.editData.date = $scope.editData.displayDate
			console.log($scope.editData)
			$scope.mode="add"
		}
		$scope.addData = function(){
		    $http.get('/api/addAlcoholData', {params: {"User_ID": $rootScope.user.user_id,"Date": moment($scope.editData.displayDate).format('YYYY-MM-DD HH:mm:ss'),"Amount":$scope.editData.amount, "Type":$scope.editData.type, "AlcByVol":$scope.editData.alcByVol}
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
			$scope.todayString = moment().format("YYYY-MM-DD HH:mm:ss")
			
		}
		
		init()

}]);