Instructor.controller('instructorClassesController', ['$scope', '$rootScope', '$http', '$location', '$cookies','$cookieStore',
    function($scope,$rootScope, $http, $location,$cookieStore,$cookies)  {
    if($rootScope.instructorLogged){
        
		if($rootScope.classes){
			
			console.log("classes",$rootScope.classes)
		}
		else{
			/// modify once api is created
			$rootScope.classes = [
				{className: "Medical Training", 
					classDescription: "This is a class for medical training.",
					classID:"00001"},
				{className: "Medical Procedures", 
					classDescription: "This is a class for medical procedures.", 
					classID: "00002"}]
		}
	   
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
	 
	 
	 $scope.addNewClass = function(){
		 $cookieStore.put('ClassMode', "add");
		 $location.path("index/editClass")
	 }
	 
	 $scope.editClass = function(){
		 $cookieStore.put('ClassMode', "edit");
		 $location.path("index/editClass")
		
	 }
	}]);