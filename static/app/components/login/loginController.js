HotspotApp.controller('loginController', ['$scope', '$location','$rootScope','$http','$cookies','$cookieStore',
	function($scope,$location,$rootScope,$http,$cookies,$cookieStore, Idle) {


	if ($rootScope.studentLogged)
	{
	  $location.path('index/studentHome')
	}
	else if($rootScope.adminLogged){
	  $location.path('index/administratorHome')
	}
	else if($rootScope.instructorLogged){
	  $location.path('index/instructorHome')
	}
	else{
	  $location.path('/login')
	  /*$cookies.put('Page', '/login');*/
	}
	$scope.login = function(){
		date = new Date();
		$http.get('/api/login', {
        params: {
            netid: $scope.credentials.username
        }}).success(function(data, status, headers, config) {
	    $scope.user = data;	    
	    $scope.status1 = status;
	    //////////////////////////////
	    //delete after debug
	    console.log($scope.user)	    
		console.log($scope.user.password);
		console.log($scope.credentials.password);
		//////////////////////////////////////////
		if ($scope.user.password == $scope.credentials.password){
			role = $scope.user.role;
			$cookies.put('Role', role);
			$cookies.put('NetId', $scope.user.net_id);
			//student
			if (role =='Student') {
				$rootScope.studentLogged = true;
				$rootScope.instructorLogged = false;
				$rootScope.adminLogged = false;
				$location.path('/index/studentHome')
			}
			//Instructor
			else if (role == 'Instructor'){
				$rootScope.studentLogged = false;
				$rootScope.instructorLogged = true;
				$rootScope.adminLogged = false;
				$location.path('/index/instructorHome')
			}
			//Admin
			else if (role == 'Administrator'){
				$rootScope.studentLogged = false;
				$rootScope.instructorLogged =false;
				$rootScope.adminLogged = true;
				$location.path('/index/administratorHome')
			}
		}
		}).error(function(data, status) {
		    console.log('failed');
		    $scope.status1 = status;
		});
	}


}]);