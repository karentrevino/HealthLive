HotspotApp.controller('profileController', ['$scope', '$location','$rootScope','$http','$cookies','$cookieStore',
	function($scope,$location,$rootScope,$http,$cookies,$cookieStore, Idle) {


	if ($rootScope.studentLogged)
	{
	  console.log('Student Profile Controller');
	  $http.get('/api/getProfileInfo', {
	  	params: {
	  		netid: $cookies.get('NetId')
	  	}}).success(function(data, status, headers, config) {
      $scope.p = data.results;
      $scope.status1 = status;
      console.log('success');
      }).error(function(data, status)
      {
      	console.log('failed');
      	$scope.status1 = status;
      	console.log(status);
      })
	}
	else if($rootScope.adminLogged)
	{
	  console.log('Administrator Profile Controller');
	  $http.get('/api/getProfileInfo', {
	  	params: {
	  		netid: $cookies.get('NetId')
	  	}}).success(function(data, status, headers, config) {
      $scope.p = data.results;
      $scope.status1 = status;
      console.log('success');
      }).error(function(data, status)
      {
      	console.log('failed');
      	$scope.status1 = status;
      	console.log(status);
      })

	}
	else if($rootScope.instructorLogged){
	  console.log('Instructor Profile Controller');
	  $http.get('/api/getProfileInfo', {
	  	params: {
	  		netid: $cookies.get('NetId')
	  	}}).success(function(data, status, headers, config) {
      $scope.p = data.results;
      $scope.status1 = status;
      console.log('success');
      }).error(function(data, status)
      {
      	console.log('failed');
      	$scope.status1 = status;
      	console.log(status);
      })
	}
	else{
	  $location.path('/login')
	  /*$cookies.put('Page', '/login');*/
	}
	
	//getting current date
	var d = new Date();
	$scope.date = {
		month: Number(d.getMonth()) + 1,
    	day: d.getDate(),
     	year: d.getFullYear()
     }



}]);