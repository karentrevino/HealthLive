Student.controller('classModuleController', ['$scope','$rootScope','$http','$location','$cookies','$cookieStore',
	function($scope, $rootScope,$http,$location,$cookieStore,$cookies) {

    if ($rootScope.studentLogged)
	{
  	  
	}
	else if($rootScope.adminLogged){
		$location.path('index/administratorHome')
	}
	else if($rootScope.instructorLogged){
		$location.path('index/instructorHome')
	}
	else{
		$location.path('index/login')
	}
	
	$scope.completed = false;
	
	$scope.selectedModule = [
		{"type" : "video", "videoPath": "/static/Resources/Chapter1.mp4", "slideDesc":"This is the slide description for the video",},
		{"type" : "assignment",  "assignment": [
			{"QuestType":"MC","QuestDesc": "This is the description for the question 1", 
			"AnsOptions":["answer a", "answer b", "answer c"],
			"SelectedAns": "answer b",
			"CorrectAns": "answer b"},
			{"QuestType":"MC","QuestDesc": "This is the description for the question 2", 
			"AnsOptions":["answer a", "answer b", "answer c"],
			"SelectedAns": "answer b",
			"CorrectAns": "answer c"},
			{"QuestType":"Long", "QuestDesc": "This is the description for a question with a long answer",
			"SelectedAns": "Sample response in text area"},
			
		],  "slideDesc":"This is the slide description for the assignment",},
		{"type":"assignment", "assignment":[
			{"QuestType":"Long", "QuestDesc": "This is the description for a question with a long answer",
			"SelectedAns": "Sample response in text area"}]},
		{"type" : "video", "videoPath": "/static/Resources/Chapter 2.mp4",  "slideDesc":"This is the slide description for the video",},
	];
	
	$scope.currentSlide = 0;
	$scope.totalSlide = $scope.selectedModule.length;
	
	$scope.selectedSlide = $scope.selectedModule[$scope.currentSlide];
	console.log($scope.selectedSlide)
	
	$scope.previousSlide = function(){
		$scope.currentSlide = $scope.currentSlide- 1;
		$scope.selectedSlide = $scope.selectedModule[$scope.currentSlide];
		/*console.log($scope.selectedSlide)*/
	}
	
	$scope.nextSlide = function(){
		$scope.currentSlide = $scope.currentSlide+ 1;
		$scope.selectedSlide = $scope.selectedModule[$scope.currentSlide];
		/*console.log($scope.selectedSlide)*/
		$scope.slideClass = "fadeInRight";
		$scope.slideClass = "fadeInRight"
	}
	
	$scope.submitModule = function(){
		$scope.completed = true;
		
	};
	
	/*$scope.classes = {
		"cse1310":{
		"modules":{
				"1":[
					{"video": "/static/Resources/Chapter1.mp4"},
					{"video": "/static/Resources/Chapter 2.mp4"},
					{"assignment": [
						{"QuestDesc": "This is the description for the question 1", 
						"AnsOptions":["answer a", "answer b", "answer c"],
						"CorrectAns": "answer b"},
						{"QuestDesc": "This is the description for the question 2", 
						"AnsOptions":["answer a", "answer b", "answer c"],
						"CorrectAns": "answer c"}
					]},
					{"video": "#videopath#"},
				],
				"2":[
					{"video": "#videopath#"},
					{"assignment": [
						{"QuestDesc": "This is the description for the question 1", 
						"AnsOptions":["answer a", "answer b", "answer c"],
						"CorrectAns": "answer b"},
						{"QuestDesc": "This is the description for the question 2", 
						"AnsOptions":["answer a", "answer b", "answer c"],
						"CorrectAns": "answer c"}
					]},
					{"video": "#videopath#"},
				]
	
			}
		
		},
	
		"cse3330":{
			"modules":{
				"1":[
					{"video": "#videopath#"},
					{"assignment": [
						{"QuestDesc": "This is the description for the question 1", 
						"AnsOptions":["answer a", "answer b", "answer c"],
						"CorrectAns": "answer b"},
						{"QuestDesc": "This is the description for the question 2", 
						"AnsOptions":["answer a", "answer b", "answer c"],
						"CorrectAns": "answer c"}
					]},
					{"video": "#videopath#"},
				],
				"2":[
					{"video": "#videopath#"},
					{"assignment": [
						{"QuestDesc": "This is the description for the question 1", 
						"AnsOptions":["answer a", "answer b", "answer c"],
						"CorrectAns": "answer b"},
						{"QuestDesc": "This is the description for the question 2", 
						"AnsOptions":["answer a", "answer b", "answer c"],
						"CorrectAns": "answer c"}
					]},
					{"video": "#videopath#"},
				]
	
			}
		
		}
	
	
	}*/


}]);
