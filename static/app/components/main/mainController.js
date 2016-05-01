HealthLive.controller('mainController', ['$scope', '$location','$rootScope','$cookies','$cookieStore',
	function($scope,$location,$rootScope,$cookieStore,$cookies) {
	console.log("mainController");

	if($cookieStore.get('logged')){
		$rootScope.logged=true;
		$rootScope.user = $cookieStore.get('user')
		console.log($rootScope.user)
	}
	
	$scope.logout = function(){
		console.log("logout")
		$location.path('/login');
		var cookies = ['Role','NetId','logged','user'];
		angular.forEach(cookies, function (v, k) {
    	$cookies.remove(v);
		});
		$rootScope.logged=false;
		$rootScope.user = "";
	}
	
	
}]);