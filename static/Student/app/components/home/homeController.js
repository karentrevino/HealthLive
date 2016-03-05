Student.controller('homeController', ['$scope','$rootScope', '$location','$cookies','$cookieStore','$q','$http',
  function($scope,$rootScope,$location,$cookieStore,$cookies,$q,$http) {
    if ($rootScope.studentLogged)
    {
		
	   var netID = $cookieStore.get('NetId')
	   var gradesP = $http.get('/api/grades', {params: {netid: $cookieStore.get('NetId')}}),
			classP= $http.get('/api/studentClasses', {params: {netid: $cookieStore.get('NetId')}});
	    $q.all([gradesP,classP]).then(function(arrayOfResults) { 
			$scope.assignments = arrayOfResults[0].data.results;
			$scope.courses = arrayOfResults[1].data.results;
	        console.log($scope.assignments)
			console.log($scope.courses)
	      });
        
       $scope.announcements = [
       {	title: "Information of New Classes",
       		content: "New classes have been added", 
       		date:"October 23,2015"},
       	{	title: "Maintenance",
       		content: "HOTSPOT will be down for maintenance from October 28 9AM to October 30 5PM",
       		date:"October 21,2015"}
       	];
       	
       	$scope.studentInfo = {
       		firstName: "John",
       		lastName: "Doe",
       		emailAddress: "johndoe@email.com",
       		institution:"University of Texas at Arlington",
       		highestDegree: "Bachelor's of Science in Computer Science"
       		}
      
      /*$cookies.put('Page', '/studentHome');*/

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