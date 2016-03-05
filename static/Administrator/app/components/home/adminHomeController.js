Admin.controller('adminHomeController', ['$scope','$rootScope','$http','$location','$cookies','$cookieStore',
    function($scope, $rootScope,$http,$location,$cookies,$cookieStore) {
   if ($rootScope.studentLogged)
   {
      $location.path('index/studentHome')
   }
   else if($rootScope.adminLogged){
      /*$cookies.put('Page', 'index/administratorHome');*/
      $scope.announcements = [
      {  title: "Welcome all students and faculty!",
         content: "UTSW is da best!",
         date: "November 15, 2015"},
        { title: "Maintenance",
         content: "HOTSPOT will be down for maintenance from....",
         date: "November 20, 2015"}
      ];

      $scope.stats = [
         {  title: "Student Enrollment",
            count: 3412},
         {  title: "Instructor Participation",
            count: 56},
         {  title: "Classes Offered",
            count: 583},
         {  title: "Affiliates",
            count: 3},
         {  title: "Today's Hits",
            count: 645},
         {  title: "Week's Hits",
            count: 8420}
      ];

      $scope.mail = [
      {  subject: "Request for New Student",
         date: "November 20, 2015",
         time: "10:26 a.m",
         from: "HOTSPOT System"},

      {  subject: "HOTSPOT Maintenance",
         date: "November 19, 2015",
         time: "3:12 p.m",
         from: "OIT"}
      ];
   }
   else if($rootScope.instructorLogged){
      $location.path('index/instructorHome')
   }
   else{
      $location.path('/login')
   }

}]);