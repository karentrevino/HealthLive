var HealthLive = angular.module('HealthLive', ['ui.router','ui.bootstrap','ngAnimate','ngCookies','ngIdle', 'datatables']);

HealthLive.config(function($stateProvider, $urlRouterProvider, IdleProvider, KeepaliveProvider) {   
   $urlRouterProvider.otherwise('/login');
   $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
   
   .state('home', {
       url: "/home",
       templateUrl: "static/app/components/home/homeView.html",
   })
   

    
	;
});
