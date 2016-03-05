Instructor.controller('addEditClassController', ['$scope', '$rootScope', '$http', '$location', '$cookies','$cookieStore',
    function($scope,$rootScope, $http, $location,$cookieStore,$cookies)  {
	$scope.classTemplate = {className: "", 
			classDescription: "",
			classID:""};
		
		
    if($rootScope.instructorLogged){
		
		//Get from database

		
        $scope.classMode = $cookieStore.get("ClassMode")
		
       
     }
     else if ($rootScope.studentLogged)
     {
        $location.path('index/studentHome')
     }
     else if($rootScope.adminLogged){
        $location.path('index/adminHome')
     }
     else{
        $location.path('/login')
     }
	 
	 
	 $scope.addNewClass = function(newClass){
		 console.log($rootScope.classes)
		 console.log(newClass);
		 $rootScope.classes.push(newClass);
		 $location.path("index/instructorClasses");
		 
	 }
	}]);