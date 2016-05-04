var HealthLive = angular.module('HealthLive', ['ui.router','ui.bootstrap','ngAnimate','ngCookies','ngIdle', 'datatables','angularMoment','chart.js']);

HealthLive.config(function($stateProvider, $urlRouterProvider, IdleProvider, KeepaliveProvider) {   
   $urlRouterProvider.otherwise('/login');
   $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================

   .state('login', {
        url: '/login',
        templateUrl: 'static/app/components/login/loginView.html',
        controller: 'loginController'
    })
   
   .state('home', {
        url: '/home',
        templateUrl: "static/app/components/home/homeView.html",
   })

   .state('exercise', {
        url: '/exercise',
        templateUrl: 'static/app/components/exercise/exerciseView.html',
        controller: 'exerciseController'
   })
   
   .state('sleep', {
       url: "/sleep",
       templateUrl: "static/app/components/sleep/sleepView.html",
	   controller: 'sleepController',
   })
   
   .state('diet', {
       url: "/diet",
       templateUrl: "static/app/components/diet/dietView.html",
	   controller: 'dietController',
   })

   .state('medicine', {
      url: "/medicine",
      templateUrl: "static/app/components/medicine/medicineView.html",
      controller: 'medicineController'
   })
   

    
	;
});
