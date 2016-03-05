var HotspotApp = angular.module('HotspotApp', ['ui.router','ui.bootstrap','ngAnimate','ngCookies','ngIdle', 'Student', 'Instructor', 'Admin', 'datatables']);

HotspotApp.config(function($stateProvider, $urlRouterProvider, IdleProvider, KeepaliveProvider) {   
   IdleProvider.idle(60*60); // 60 minutes idle
   IdleProvider.timeout(60*5); // after 5 minutes idle, time the user out
   KeepaliveProvider.interval(5*60); // 5 minute keep-alive ping
   $urlRouterProvider.otherwise('/login');
   $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
   
   .state('index', {
       url: "/index",
       templateUrl: "static/app/components/layers/content.html",
   })
   
    .state('Login', {
        url: '/login',
        templateUrl: 'static/app/components/login/loginView.html',
        controller: 'loginController'
    })

    .state('Signup', {
        url: '/signup',
        templateUrl: 'static/app/components/signup/signupView.html',
        controller: 'signupController'
    })
    
	;
});
HotspotApp.run(function(Idle){
    console.log("run")
    // start watching when the app runs. also starts the Keepalive service by default.
    Idle.watch();
});