var Admin = angular.module('Admin', []);

Admin.config(function($stateProvider, $urlRouterProvider) {
    
	$urlRouterProvider.otherwise('/administratorHome');
   
    $stateProvider
        
//        // HOME STATES AND NESTED VIEWS ========================================
	        .state('index.administratorHome', {
            	url: '/administratorHome',
            	templateUrl: '/static/Administrator/app/components/home/homeView.html',
            	controller: 'adminHomeController'
        })

	        .state('index.administratorProfile',{
	        	url: '/administratorProfile',
	        	templateUrl: '/static/app/components/profile/profileView.html',
	        	controller: 'profileController'
	    })
        
	        .state('index.administratorClasses',{
	        	url: '/administratorClasses',
	        	templateUrl: '/static/Administrator/app/components/classes/adminClassesView.html',
	        	controller: 'adminClassesController'
	    })
	        .state('index.administratorAllUsers',{
	        	url: '/administratorAllUsers',
	        	templateUrl: '/static/Administrator/app/components/allusers/adminAllUsersView.html',
	        	controller: 'adminAllUsersController'
	    })
        ;
});


