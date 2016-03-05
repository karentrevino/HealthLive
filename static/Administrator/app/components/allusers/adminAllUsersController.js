Admin.controller('adminAllUsersController', ['$scope', '$rootScope', '$http', '$location', '$cookies','$cookieStore',
    function($scope,$rootScope, $http, $location,$cookieStore,$cookies)  {
    if($rootScope.adminLogged){
        
        console.log('AllUsers Controller');
        $http.get('/api/viewUsers').success(function(data, status, headers, config) {
        $scope.persons = data.results;
        $scope.status1 = status;
        }).error(function(data, status) {
        console.log('failed');
        $scope.status1 = status;
        });
     }
     else if ($rootScope.studentLogged)
     {
        $location.path('index/studentHome')
     }
     else if($rootScope.instructorLogged){
        $location.path('index/instructorHome')
     }
     else{
        $location.path('/login')
     }
	}]);