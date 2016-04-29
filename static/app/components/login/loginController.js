HealthLive.controller('loginController', ['$scope', '$location','$rootScope','$http','$cookies','$cookieStore',
	function($scope,$location,$rootScope,$http,$cookies,$cookieStore, Idle) {

	$scope.login = function(){
		date = new Date();
		
		
		
		$http.get('/api/login', {
        params: {
            email: $scope.credentials.username
        }}).success(function(data, status, headers, config) {
	    $rootScope.user = data;	    
	    $scope.status1 = status;
	    //////////////////////////////
	    //delete after debug
	    console.log($rootScope.user)	    
		console.log($rootScope.user.password);
		console.log($scope.credentials.password);
		$rootScope.logged = true;

		//////////////////////////////////////////
		if ($rootScope.user.password == $scope.credentials.password){
			$cookieStore.put('logged', true)
			$cookieStore.put('user', $rootScope.user)
			$location.path('/home')
		}
		}).error(function(data, status) {
		    console.log('failed');
		    $scope.status1 = status;
		});
	}


}]);