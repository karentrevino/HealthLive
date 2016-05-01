var HealthLive = angular.module('HealthLive', ['ui.router','ui.bootstrap','ngAnimate','ngCookies','ngIdle', 'datatables']);

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
   

    
	;
});
