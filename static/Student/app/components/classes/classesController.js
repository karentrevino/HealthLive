Student.controller('classesController',['$scope','$rootScope','$http','$location','$cookies','$cookieStore','$q',
	function($scope, $rootScope,$http,$location,$cookieStore,$cookies,$q) {
	if ($rootScope.studentLogged)
	{
		/*$cookies.put('Page', '/studentClasses');*/
		
	   	var netID = $cookieStore.get('NetId')
		var classP= $http.get('/api/studentClasses', {params: {netid: $cookieStore.get('NetId')}});
	    $q.all([classP]).then(function(arrayOfResults) { 
			
			$scope.coursesEnrolled = arrayOfResults[0].data.results;
			console.log($scope.coursesEnrolled)
	      });
		
		/*$scope.coursesEnrolled = [
		{course_title: "CSE 3320: Class",
			course_description : "Students learn the introductory topics in the Computer Science field. This course includes 2 presentations and 2 quizzes",
			grade: 96,
			completed: false,
		},
		{course_title: "CSE 3100: Basic Class",
			course_description : "Students learn the introductory topics in the Computer Science field. This course includes 2 presentations and 2 quizzes",
			grade: 46,
			completed: false,
		},
		{course_title: "CE 2320: Bridges",
			course_description : "Students learn topics in the CE field. This course includes 2 presentations and 2 quizzes",
			grade: 76,
			completed: true,
		},
		{course_title: "CE 2320: Something",
			course_description : "Students learn topics in the CE field. This course includes 2 presentations and 2 quizzes",
			grade: 83,
			completed: true,
		},
		];*/
	}
	else if($rootScope.adminLogged){
		$location.path('/administratorHome')
	}
	else if($rootScope.instructorLogged){
		$location.path('/instructorHome')
	}
	else{
		$location.path('/login')
	}

}]);