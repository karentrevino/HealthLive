HealthLive.controller('exerciseController', ['$scope', '$location','$rootScope','$http','$q','$cookies','$cookieStore',
    function($scope,$location,$rootScope,$http,$q,$cookies,$cookieStore, Idle) {
        $scope.labels = [];

        $scope.data = [[]];
        $scope.colours = [{
            fillColor: '#9c27b0'
        }];
        $scope.exerciseTemplate = {'date': "", "exerciseName": "", 'muscleGroup':"", "duration": ""}

        if($cookieStore.get('logged')){
            $rootScope.logged=true;
            $rootScope.user = $cookieStore.get('user')
        
            
        
        }
        //sevenDaysDate

        //$scope.lastMonday.subtract("7", "days")
        //console.log($scope.lastMonday)
        
        $scope.buildData= function(mondayDate){
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
                //$scope.buildChart()
                $scope.getExerciseGoal(mondayDate)
            })
            
        }
        
        $scope.getExerciseGoal = function(mondayDate){
            
            
            var MondayDate = moment(mondayDate).day(1).format("YYYY-MM-DD HH:mm:ss")
            var TuesdayDate = moment(mondayDate).day(2).format("YYYY-MM-DD HH:mm:ss")
            var WednesdayDate = moment(mondayDate).day(3).format("YYYY-MM-DD HH:mm:ss")
            var ThursdayDate = moment(mondayDate).day(4).format("YYYY-MM-DD HH:mm:ss")
            var FridayDate = moment(mondayDate).day(5).format("YYYY-MM-DD HH:mm:ss")
            var SaturdayDate = moment(mondayDate).day(6).format("YYYY-MM-DD HH:mm:ss")
            var SundayDate = moment(mondayDate).day(7).format("YYYY-MM-DD HH:mm:ss")
            
            
            //console.log(moment(mondayDate).day("Monday").toDate())
            var Monday = $http.get('/api/getExerciseGoal', {
                params: {
                    "User_ID": $rootScope.user.user_id,
                    "Date": MondayDate,}}
                )
            console.log(Monday)
            var Tuesday = $http.get('/api/getExerciseGoal', {
                params: {
                    "User_ID": $rootScope.user.user_id,
                    "Date": TuesdayDate,}})
            var Wednesday = $http.get('/api/getExerciseGoal', {
                params: {
                    "User_ID": $rootScope.user.user_id,
                    "Date": WednesdayDate,}})
            var Thursday = $http.get('/api/getExerciseGoal', {
                params: {
                    "User_ID": $rootScope.user.user_id,
                    "Date": ThursdayDate,}})
            var Friday = $http.get('/api/getExerciseGoal', {
                params: {
                    "User_ID": $rootScope.user.user_id,
                    "Date": FridayDate,}})
            var Saturday = $http.get('/api/getExerciseGoal', {
                params: {
                    "User_ID": $rootScope.user.user_id,
                    "Date": SaturdayDate,}})
            var Sunday = $http.get('/api/getExerciseGoal', {
                params: {
                    "User_ID": $rootScope.user.user_id,
                    "Date": SundayDate,}})
            
            $q.all([Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday]).then(function(arrayOfResults){
                $scope.exerciseData[MondayDate]["exerciseGoal"] = arrayOfResults[0].data.results
                $scope.exerciseData[TuesdayDate]["exerciseGoal"] = arrayOfResults[1].data.results
                $scope.exerciseData[WednesdayDate]["exerciseGoal"] = arrayOfResults[2].data.results
                $scope.exerciseData[ThursdayDate]["exerciseGoal"] = arrayOfResults[3].data.results
                $scope.exerciseData[FridayDate]["exerciseGoal"] = arrayOfResults[4].data.results
                $scope.exerciseData[SaturdayDate]["exerciseGoal"] = arrayOfResults[5].data.results
                $scope.exerciseData[SundayDate]["exerciseGoal"] = arrayOfResults[6].data.results
                
                console.log($scope.exerciseData)
                console.log($scope.exerciseData[MondayDate])
                $scope.buildChart()
            })
            
        }
        
        $scope.buildChart = function(){
            $scope.labels = [];
            $scope.data = [[]];
            for(var index in $scope.exerciseData){
                var totalDuration = 0
                $scope.labels.push(moment($scope.exerciseData[index].results.displayData).format('MMM D'))
                for(var subind in $scope.exerciseData[index].results){
                    totalDuration = totalDuration + parseFloat($scope.exerciseData[index].results[subind].duration)
                }
                $scope.data[0].push(parseFloat(totalDuration))
            }
        }
        
        $scope.exerciseEditMode = function(day,muscleGoal,durationGoal){
            $scope.editData = {}
            $scope.editData["displayDate"] = day
            if( muscleGoal == null || durationGoal == null){
                $scope.exMode = "add"
                $scope.editData["muscleGoal"] = ""
                $scope.editData["durationGoal"] = 0.0
            }
            else{
                
                $scope.editData["muscleGoal"] = muscleGoal
                $scope.editData["durationGoal"] = durationGoal
                $scope.exMode = "edit"
                
            }
        }
        
        $scope.saveExerciseGoals = function(date,muscleGoal,durationGoal){
            $http.get('/api/editExerciseGoal', {
                params: {
                    "User_ID": $rootScope.user.user_id,
                    "Date": moment(date).utc().format('YYYY-MM-DD HH:mm:ss'),
                    "MuscleGoal":muscleGoal,
                    "DurationGoal":durationGoal}
            }).success(function(data, status, headers, config) {
                
                $scope.exMode=""
                $scope.buildData($scope.lastMonday)
                $scope.editData =""
            }).error(function(data, status){console.log("failed")});
            
        }
        
        $scope.addExerciseGoal = function(date,muscleGoal,durationGoal){
            $http.get('/api/addExerciseGoal', {
                params: {
                    "User_ID": $rootScope.user.user_id,
                    "Date": moment(date).utc().format('YYYY-MM-DD HH:mm:ss'),
                    "MuscleGoal":muscleGoal,
                    "DurationGoal":durationGoal}
            }).success(function(data, status, headers, config) {
                $scope.buildData($scope.lastMonday)
                $scope.exMode=""
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
        
        $scope.editMode = function(exercise){
            console.log("edit", exercise)
            $scope.editData=exercise
            $scope.mode="edit"
        }
        
        $scope.saveData = function(){
            $http.get('/api/editExerciseData', {
                params: {
                    "User_ID": $rootScope.user.user_id,
                    "Date": moment($scope.editData.date).utc().format('YYYY-MM-DD HH:mm:ss'),
                    "MuscleGroup":$scope.editData.muscleGroup, 
                    "Duration":$scope.editData.duration 
                    }
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
            $scope.editData = angular.copy($scope.exerciseTemplate)
            $scope.editData.displayDate = day
            $scope.editData.date = $scope.editData.displayDate
            console.log($scope.editData)
            $scope.mode="add"
        }
        
        $scope.addData = function(){
            var current = moment()
            $http.get('/api/addExerciseData', {
                params: {
                    "User_ID": $rootScope.user.user_id,
                    "Date": moment($scope.editData.displayDate).hour(current.hour()).minute(current.minutes()).seconds(current.seconds()).format('YYYY-MM-DD HH:mm:ss'),
                    "MuscleGroup":$scope.editData.muscleGroup, 
                    "Duration":$scope.editData.duration}
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