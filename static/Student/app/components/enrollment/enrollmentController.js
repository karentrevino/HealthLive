Student.controller('enrollmentController', ['$scope','$rootScope','$http','$location','$cookies','$cookieStore','$q',
    function($scope, $rootScope,$http,$location,$cookieStore,$cookies,$q) {
    if ($rootScope.studentLogged)
    {
        /*$cookies.put('Page', '/studentEnrollment');*/
        console.log('Enrollment Controller');
		
	   var netID = $cookieStore.get('NetId')
	   var classesP = $http.get('/api/classSearch'),
			classP= $http.get('/api/studentClasses', {params: {netid: $cookieStore.get('NetId')}});
	    $q.all([classesP,classP]).then(function(arrayOfResults) { 
			$scope.courses = arrayOfResults[0].data.results;
			$scope.studentClasses = arrayOfResults[1].data.results;
			console.log($scope.studentClasses)
	      });
    }
    else if($rootScope.adminLogged){
        $location.path('index/administratorHome')
    }
    else if($rootScope.instructorLogged){
        $location.path('index/instructorHome')
    }
    else{
        $location.path('/login')
    }

}]);