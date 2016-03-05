var Instructor = angular.module('Instructor', []);

Instructor.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/instructorHome');

    $stateProvider

        .state('index.instructorHome', {
            url: '/instructorHome',
           	templateUrl: '/static/Instructor/app/components/home/homeView.html',
            controller: 'instructorHomeController'
	       	})

        .state('index.instructorProfile', {
        	url: '/instructorProfile',
        	templateUrl: 'static/app/components/profile/profileView.html',
        	controller: 'profileController'
    		})
			
        .state('index.instructorClasses', {
        	url: '/instructorClasses',
        	templateUrl: 'static/Instructor/app/components/classes/instructorClasses.html',
        	controller: 'instructorClassesController'
    		})
	
		
        .state('index.editClass', {
        	url: '/editClass',
        	templateUrl: 'static/Instructor/app/components/addEditClass/addEditClass.html',
        	controller: 'addEditClassController'
    		})
		;
});
