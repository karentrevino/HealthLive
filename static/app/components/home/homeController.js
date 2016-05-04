HealthLive.controller('homeController', ['$scope', '$location','$rootScope','$http','$q','$cookies','$cookieStore',
	function($scope,$location,$rootScope,$http,$q,$cookies,$cookieStore, Idle) {
		$scope.dietcolours = [{
		    fillColor: '#9c27b0'
		}];
		$scope.sleepcolours = [{
		    fillColor: '#2196f3'
		}];
        $scope.exercisecolours = [{
            fillColor: '#439a46'
        }];
		
		
		if($cookieStore.get('logged')){
			$rootScope.logged=true;
			$rootScope.user = $cookieStore.get('user')

		}

		$scope.dietbuildData= function(mondayDate){
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
				$scope.dietbuildChart()
			})
			
		}
		
		$scope.dietbuildChart = function(){
		    $scope.dietlabels = [];
		    $scope.dietdata = [[]];
			console.log($scope.mealData)
			for(var index in $scope.mealData){
				var totalCal = 0
				console.log(moment(index).format('MMM D'))
				$scope.dietlabels.push(moment(index).format('MMM D'))
				for(var subind in $scope.mealData[index].results){
					totalCal = totalCal + parseInt($scope.mealData[index].results[subind].calories)
				}
				$scope.dietdata[0].push(parseInt(totalCal))
			}
			
			console.log("dietdata",$scope.dietdata)
		}
		
		$scope.sleepbuildData= function(mondayDate){
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
				$scope.sleepbuildChart()
			})
			
		}
		
		$scope.sleepbuildChart = function(){
			//console.log("here")
		    $scope.sleeplabels = [];
		    $scope.sleepdata = [[]];
			for(var sleep in $scope.sleepData){
				var temp = $scope.sleepData[sleep]
				$scope.sleeplabels.push(moment(temp.displayDate).format('MMM D'))
				if(temp.duration == ""){
					$scope.sleepdata[0].push(0)
				}
				else{
					$scope.sleepdata[0].push(parseInt(temp.duration))
				}
				
			}
			
			//console.log($scope.labels,$scope.data)
		}
		
        $scope.exercisebuildData= function(mondayDate){
            $scope.exerciseData = {}
            //console.log(moment().day(1).format("YYYY-MM-DD HH:mm:ss"))
            
            var MondayDate = moment(mondayDate).day(1).format("YYYY-MM-DD HH:mm:ss")
            var TuesdayDate = moment(mondayDate).day(2).format("YYYY-MM-DD HH:mm:ss")
            var WednesdayDate = moment(mondayDate).day(3).format("YYYY-MM-DD HH:mm:ss")
            var ThursdayDate = moment(mondayDate).day(4).format("YYYY-MM-DD HH:mm:ss")
            var FridayDate = moment(mondayDate).day(5).format("YYYY-MM-DD HH:mm:ss")
            var SaturdayDate = moment(mondayDate).day(6).format("YYYY-MM-DD HH:mm:ss")
            var SundayDate = moment(mondayDate).day(7).format("YYYY-MM-DD HH:mm:ss")
            
            
            //console.log(moment(mondayDate).day("Monday").toDate())
            var Monday = $http.get('/api/getExerciseData', {
                params: {
                    "User_ID": $rootScope.user.user_id,
                    "Date": MondayDate,}})
            var Tuesday = $http.get('/api/getExerciseData', {
                params: {
                    "User_ID": $rootScope.user.user_id,
                    "Date": TuesdayDate,}})
            var Wednesday = $http.get('/api/getExerciseData', {
                params: {
                    "User_ID": $rootScope.user.user_id,
                    "Date": WednesdayDate,}})
            var Thursday = $http.get('/api/getExerciseData', {
                params: {
                    "User_ID": $rootScope.user.user_id,
                    "Date": ThursdayDate,}})
            var Friday = $http.get('/api/getExerciseData', {
                params: {
                    "User_ID": $rootScope.user.user_id,
                    "Date": FridayDate,}})
            var Saturday = $http.get('/api/getExerciseData', {
                params: {
                    "User_ID": $rootScope.user.user_id,
                    "Date": SaturdayDate,}})
            var Sunday = $http.get('/api/getExerciseData', {
                params: {
                    "User_ID": $rootScope.user.user_id,
                    "Date": SundayDate,}})
            
            $q.all([Monday,Tuesday,Wednesday, Thursday,Friday,Saturday,Sunday]).then(function(arrayOfResults){
                $scope.exerciseData[MondayDate] = arrayOfResults[0].data
                $scope.exerciseData[TuesdayDate] = arrayOfResults[1].data
                $scope.exerciseData[WednesdayDate] = arrayOfResults[2].data
                $scope.exerciseData[ThursdayDate] = arrayOfResults[3].data
                $scope.exerciseData[FridayDate] = arrayOfResults[4].data
                $scope.exerciseData[SaturdayDate] = arrayOfResults[5].data
                $scope.exerciseData[SundayDate] = arrayOfResults[6].data
                
                console.log($scope.exerciseData)
                $scope.exercisebuildChart()
            })
            
        }
		
        $scope.exercisebuildChart = function(){
            $scope.exerciselabels = [];
            $scope.exercisedata = [[]];
            for(var index in $scope.exerciseData){
                var totalDuration = 0
                $scope.exerciselabels.push(moment(index).format('MMM D'))
                for(var subind in $scope.exerciseData[index].results){
                    totalDuration = totalDuration + parseFloat($scope.exerciseData[index].results[subind].duration)
                }
                $scope.exercisedata[0].push(parseFloat(totalDuration))
            }
        }
		
        $scope.medicinebuildData= function(mondayDate){
            $scope.medData = {}
            //console.log(moment().day(1).format("YYYY-MM-DD HH:mm:ss"))
            
            var MondayDate = moment(mondayDate).day(1).format("YYYY-MM-DD HH:mm:ss")
            
            
            //console.log(moment(mondayDate).day("Monday").toDate())
            var Monday = $http.get('/api/getMedData', {
                params: {
                    "User_ID": $rootScope.user.user_id,
                    "Date": MondayDate,}})
            $q.all([Monday]).then(function(arrayOfResults){
                $scope.medData[MondayDate] = arrayOfResults[0].data
                
                console.log($scope.medData)
                //$scope.buildChart()
                $scope.getNewMed(mondayDate)
            })
            
        }
		
        $scope.getNewMed = function(mondayDate){
            
            
            var MondayDate = moment(mondayDate).day(1).format("YYYY-MM-DD HH:mm:ss")
            var TuesdayDate = moment(mondayDate).day(2).format("YYYY-MM-DD HH:mm:ss")
            var WednesdayDate = moment(mondayDate).day(3).format("YYYY-MM-DD HH:mm:ss")
            var ThursdayDate = moment(mondayDate).day(4).format("YYYY-MM-DD HH:mm:ss")
            var FridayDate = moment(mondayDate).day(5).format("YYYY-MM-DD HH:mm:ss")
            var SaturdayDate = moment(mondayDate).day(6).format("YYYY-MM-DD HH:mm:ss")
            var SundayDate = moment(mondayDate).day(7).format("YYYY-MM-DD HH:mm:ss")
            
            
            //console.log(moment(mondayDate).day("Monday").toDate())
            var Monday = $http.get('/api/getNewMed', {
                params: {
                    "User_ID": $rootScope.user.user_id,
                    "Date": MondayDate,}}
                )
            
            $q.all([Monday]).then(function(arrayOfResults){
                $scope.medData[MondayDate]["newMed"] = arrayOfResults[0].data.results
                
                console.log($scope.medData)
                console.log($scope.medData[MondayDate])
            })
            
        }
        
		
		
		
		$scope.todayDate = moment()
		$scope.lastMonday = $scope.todayDate.day("Monday")
		$scope.dietbuildData($scope.lastMonday)
		$scope.sleepbuildData($scope.lastMonday)
		$scope.exercisebuildData($scope.lastMonday)
		$scope.medicinebuildData($scope.lastMonday)
}]);