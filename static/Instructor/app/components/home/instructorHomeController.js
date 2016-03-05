Instructor.controller('instructorHomeController', ['$scope','$rootScope','$http','$location','$cookies','$cookieStore', 
    function($scope, $rootScope,$http,$location,$cookies,$cookieStore) {
   if ($rootScope.studentLogged)
   {
      $location.path('index/studentHome')
   }
   else if($rootScope.adminLogged){
      $location.path('index/administratorHome')
   }
   else if($rootScope.instructorLogged){      
      /*$cookies.put('Page', 'index/instructorHome');*/
      $scope.courses = [
      {course_title: "CSE 1310: Introduction to Programming",
      course_description: "Students learn the introductory programming topics in the Computer Science field. This course includes 3 presentations and 1 quiz. Professor O'Dell.",
      enrolled: false,
      grade: null,
      completed: false,

      },
      {course_title: "CSE 2320: Discrete Structures",
      course_description : "Students learn the introductory discrete mathematics topics in the Computer Science field. This course includes 2 presentations and 2 quizzes. Professor O'Dell",
      enrolled: false,
      grade: null,
      completed: false,
      },
      {course_title: "CSE 2315: Course",
      course_description : "Students learn topics. This course includes 2 presentations and 2 quizzes",
      enrolled: false,
      grade: null,
      completed: false,
      },
      {course_title: "CSE 3320: Class",
      course_description : "Students learn the introductory topics in the Computer Science field. This course includes 2 presentations and 2 quizzes",
      enrolled: true,
      grade: 96,
      completed: false,
      semester: "FALL 2015"
      },
      {course_title: "CSE 3100: Basic Class",
      course_description : "Students learn the introductory topics in the Computer Science field. This course includes 2 presentations and 2 quizzes",
      enrolled: true,
      grade: 46,
      completed: false,
      semester: "SPRING 2016"
      },
      {course_title: "CE 2320: Bridges",
      course_description : "Students learn topics in the CE field. This course includes 2 presentations and 2 quizzes",
      enrolled: true,
      grade: 76,
      completed: true,
      },
      ];


      $scope.announcements = [
      {  title: "Information of New Classes",
      content: "New classes have been added", 
      date:"October 23,2015"},
      { title: "Maintenance",
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
   }
   else{
      $location.path('/login')
   }

}]);
