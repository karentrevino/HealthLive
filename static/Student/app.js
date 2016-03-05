var Student = angular.module('Student', []);

Student.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/studentHome');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('index.studentEnrollment', {
            url: '/studentEnrollment',
            templateUrl: '/static/Student/app/components/enrollment/enrollmentView.html',
            controller: 'enrollmentController'
        })
        
        .state('index.studentHome', {
            url: '/studentHome',
            templateUrl: '/static/Student/app/components/home/homeView.html',
            controller: 'homeController'
        })
        
        .state('index.studentClasses', {
            url: '/studentClasses',
            templateUrl: '/static/Student/app/components/classes/classesView.html',
            controller: 'classesController'
        })
        
        .state('index.studentGrades', {
            url: '/studentGrades',
            templateUrl: '/static/Student/app/components/grades/gradesView.html',
            controller: 'gradesController'
			
        })    
		
        .state('index.classModule', {
            url: '/classModule',
            templateUrl: '/static/Student/app/components/classModule/classModule.html',
            controller: 'classModuleController'
        })    
		     
        .state('index.studentProfile',{
            url: '/studentProfile',
            templateUrl: 'static/app/components/profile/profileView.html',
            controller: 'profileController'
        })           
        ;
});