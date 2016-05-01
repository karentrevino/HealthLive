HealthLive.controller('loginController', ['$scope', '$location','$rootScope','$http','$cookies','$cookieStore',
	function($scope,$location,$rootScope,$http,$cookies,$cookieStore, Idle) {


	$scope.login = function(){
		date = new Date();
		$http.get('/api/login', {
        params: {
            email: $scope.credentials.username,
            password: $scope.credentials.password
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
			$location.path('/home')
		}}).error(function(data, status) {
		    console.log('failed');
		    $scope.status1 = status;
		});
	
	}



}]);