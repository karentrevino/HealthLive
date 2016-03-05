HealthLive.controller('mainController', ['$scope', '$location','$rootScope','$cookies','$cookieStore',
	function($scope,$location,$rootScope,$cookieStore,$cookies) {
	console.log("mainController");

	
	$scope.logout = function(){
		console.log("logout")
		$location.path('/login');
		angular.forEach(cookies, function (v, k) {
    	$cookies.remove(v);
		});
	}
	
	
}]);