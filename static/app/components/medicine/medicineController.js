HealthLive.controller('medicineController', ['$scope', '$location','$rootScope','$http','$q','$cookies','$cookieStore',
    function($scope,$location,$rootScope,$http,$q,$cookies,$cookieStore, Idle) {
        $scope.labels = [];

        $scope.data = [[]];
        $scope.colours = [{
            fillColor: '#9c27b0'
        }];
        $scope.medTemplate = {'date': "", "taken": ""}

        if($cookieStore.get('logged')){
            $rootScope.logged=true;
            $rootScope.user = $cookieStore.get('user')
        
            
        
        }
        //sevenDaysDate

        //$scope.lastMonday.subtract("7", "days")
        //console.log($scope.lastMonday)
        
        $scope.buildData= function(mondayDate){
            $scope.medData = {}
            //console.log(moment().day(1).format("YYYY-MM-DD HH:mm:ss"))
            
            var MondayDate = moment(mondayDate).day(1).format("YYYY-MM-DD HH:mm:ss")
            var TuesdayDate = moment(mondayDate).day(2).format("YYYY-MM-DD HH:mm:ss")
            var WednesdayDate = moment(mondayDate).day(3).format("YYYY-MM-DD HH:mm:ss")
            var ThursdayDate = moment(mondayDate).day(4).format("YYYY-MM-DD HH:mm:ss")
            var FridayDate = moment(mondayDate).day(5).format("YYYY-MM-DD HH:mm:ss")
            var SaturdayDate = moment(mondayDate).day(6).format("YYYY-MM-DD HH:mm:ss")
            var SundayDate = moment(mondayDate).day(7).format("YYYY-MM-DD HH:mm:ss")
            
            
            //console.log(moment(mondayDate).day("Monday").toDate())
            var Monday = $http.get('/api/getMedData', {
                params: {
                    "User_ID": $rootScope.user.user_id,
                    "Date": MondayDate,}})
            var Tuesday = $http.get('/api/getMedData', {
                params: {
                    "User_ID": $rootScope.user.user_id,
                    "Date": TuesdayDate,}})
            var Wednesday = $http.get('/api/getMedData', {
                params: {
                    "User_ID": $rootScope.user.user_id,
                    "Date": WednesdayDate,}})
            var Thursday = $http.get('/api/getMedData', {
                params: {
                    "User_ID": $rootScope.user.user_id,
                    "Date": ThursdayDate,}})
            var Friday = $http.get('/api/getMedData', {
                params: {
                    "User_ID": $rootScope.user.user_id,
                    "Date": FridayDate,}})
            var Saturday = $http.get('/api/getMedData', {
                params: {
                    "User_ID": $rootScope.user.user_id,
                    "Date": SaturdayDate,}})
            var Sunday = $http.get('/api/getMedData', {
                params: {
                    "User_ID": $rootScope.user.user_id,
                    "Date": SundayDate,}})
            
            $q.all([Monday,Tuesday,Wednesday, Thursday,Friday,Saturday,Sunday]).then(function(arrayOfResults){
                $scope.medData[MondayDate] = arrayOfResults[0].data
                $scope.medData[TuesdayDate] = arrayOfResults[1].data
                $scope.medData[WednesdayDate] = arrayOfResults[2].data
                $scope.medData[ThursdayDate] = arrayOfResults[3].data
                $scope.medData[FridayDate] = arrayOfResults[4].data
                $scope.medData[SaturdayDate] = arrayOfResults[5].data
                $scope.medData[SundayDate] = arrayOfResults[6].data
                
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
            console.log(Monday)
            var Tuesday = $http.get('/api/getNewMed', {
                params: {
                    "User_ID": $rootScope.user.user_id,
                    "Date": TuesdayDate,}})
            var Wednesday = $http.get('/api/getNewMed', {
                params: {
                    "User_ID": $rootScope.user.user_id,
                    "Date": WednesdayDate,}})
            var Thursday = $http.get('/api/getNewMed', {
                params: {
                    "User_ID": $rootScope.user.user_id,
                    "Date": ThursdayDate,}})
            var Friday = $http.get('/api/getNewMed', {
                params: {
                    "User_ID": $rootScope.user.user_id,
                    "Date": FridayDate,}})
            var Saturday = $http.get('/api/getNewMed', {
                params: {
                    "User_ID": $rootScope.user.user_id,
                    "Date": SaturdayDate,}})
            var Sunday = $http.get('/api/getNewMed', {
                params: {
                    "User_ID": $rootScope.user.user_id,
                    "Date": SundayDate,}})
            
            $q.all([Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday]).then(function(arrayOfResults){
                $scope.medData[MondayDate]["newMed"] = arrayOfResults[0].data.results
                $scope.medData[TuesdayDate]["newMed"] = arrayOfResults[1].data.results
                $scope.medData[WednesdayDate]["newMed"] = arrayOfResults[2].data.results
                $scope.medData[ThursdayDate]["newMed"] = arrayOfResults[3].data.results
                $scope.medData[FridayDate]["newMed"] = arrayOfResults[4].data.results
                $scope.medData[SaturdayDate]["newMed"] = arrayOfResults[5].data.results
                $scope.medData[SundayDate]["newMed"] = arrayOfResults[6].data.results
                
                console.log($scope.medData)
                console.log($scope.medData[MondayDate])
                $scope.buildChart()
            })
            
        }
        
        $scope.buildChart = function(){
            $scope.labels = [];
            $scope.data = [[]];
            for(var index in $scope.medData){
                var totalFreq = 0
                $scope.labels.push(moment($scope.medData[index].results.displayData).format('MMM D'))
                for(var subind in $scope.medData[index].results){
                    totalFreq = totalFreq + parseInt($scope.medData[index].results[subind].frequency)
                }
                $scope.data[0].push(parseInt(totalFreq))
            }
        }
        
        $scope.medEditMode = function(day,name,frequency,duration,startDate,endDate){
            $scope.editData = {}
            $scope.editData["displayDate"] = day
            if( name == null || frequency == null || duration == null || startDate == null || endDate == null)
            {
                $scope.exMode = "add"
                $scope.editData["name"] = ""
                $scope.editData["frequency"] = 0
                $scope.editData["duration"] = ""
                $scope.editData["startDate"] = ""
                $scope.editData["endDate"] = ""
            }
            else{
                
                $scope.editData["name"] = name
                $scope.editData["frequency"] = frequency
                $scope.editData["duration"] = duration
                $scope.editData["startDate"] = startDate
                $scope.editData["endDate"] = endDate
                $scope.exMode = "edit"
                
            }
        }
        
        $scope.saveNewMeds = function(date,name,frequency,duration,startDate,endDate){
            $http.get('/api/editNewMed', {
                params: {
                    "User_ID": $rootScope.user.user_id,
                    "Date": moment(date).format('YYYY-MM-DD HH:mm:ss'),
                    "Name": name,
                    "Frequency": frequency,
                    "Duration": duration,
                    "StartDate": startDate,
                    "EndDate": endDate}
            }).success(function(data, status, headers, config) {
                
                $scope.exMode=""
                $scope.buildData($scope.lastMonday)
                $scope.editData =""
            }).error(function(data, status){console.log("failed")});
            
        }
        
        $scope.addNewMed = function(date,name,frequency,duration,startDate,endDate){
            $http.get('/api/addNewMed', {
                params: {
                    "User_ID": $rootScope.user.user_id,
                    "Date": moment(date).utc().format('YYYY-MM-DD HH:mm:ss'),
                    "Name": name,
                    "Frequency": frequency,
                    "Duration": duration,
                    "StartDate": startDate,
                    "EndDate": endDate}
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
        
        $scope.editMode = function(med){
            console.log("edit", med)
            $scope.editData=med
            $scope.mode="edit"
        }
        
        $scope.saveData = function(){
            $http.get('/api/editMedData', {
                params: {
                    "User_ID": $rootScope.user.user_id,
                    "Date": moment($scope.editData.date).utc().format('YYYY-MM-DD HH:mm:ss'),
                    "Taken":$scope.editData.taken
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
            $scope.editData = angular.copy($scope.medTemplate)
            $scope.editData.displayDate = day
            $scope.editData.date = $scope.editData.displayDate
            console.log($scope.editData)
            $scope.mode="add"
        }
        
        $scope.addData = function(){
            var current = moment()
            $http.get('/api/addMedData', {
                params: {
                    "User_ID": $rootScope.user.user_id,
                    "Date": moment($scope.editData.displayDate).hour(current.hour()).minute(current.minutes()).seconds(current.seconds()).format('YYYY-MM-DD HH:mm:ss'),
                    "Taken":$scope.editData.taken}
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