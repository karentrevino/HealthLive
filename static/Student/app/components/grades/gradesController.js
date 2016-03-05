Student.controller('gradesController', ['$scope','$rootScope','$http','$location','$cookies','$cookieStore', '$q',
	function($scope, $rootScope,$http,$location,$cookieStore,$cookies, $q) {

    if ($rootScope.studentLogged)
	{
	   var netID = $cookieStore.get('NetId')
	   var gradesP = $http.get('/api/grades', {params: {netid: $cookieStore.get('NetId')}}),
			classP= $http.get('/api/studentClasses', {params: {netid: $cookieStore.get('NetId')}});
	    $q.all([gradesP,classP]).then(function(arrayOfResults) { 
			$scope.assignments = arrayOfResults[0].data.results;
			$scope.studentClasses = arrayOfResults[1].data.results;
	        console.log($scope.assignments)
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
		$location.path('index/login')
	}
	



}]);
