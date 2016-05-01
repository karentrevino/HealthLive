Healthlive.controller('exerciseController', ['$scope', '$rootScope', '$http', '$location', '$cookies','$cookieStore',
    function($scope,$rootScope, $http, $location,$cookieStore,$cookies)  {
  
    console.log('Exercise Controller');
    //populate instructor list
    $http.get('/api/getInstructors').success(function(data, status, headers, config) {
        $scope.instructors = data.results;
        console.log($scope.instructors);
        }).error(function(data, status) {
            console.log('failed');
        })


    $scope.createClass = function()
    {
        $http.get('/api/adminCreateNewClass',
        {
            params:
            {
                Name: $scope.givenName,
                Description: $scope.givenDescription,
                Instructor: $scope.givenInstructor
            }
        }).success(function(data, status, headers, config) 
        {
            console.log('success')
            $scope.check = data.results;
            console.log($scope.check);
        }).error(function(data, status) 
        {
            console.log('failed');
        })   
    }
    
}]);