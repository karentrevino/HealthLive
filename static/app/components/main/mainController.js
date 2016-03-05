HotspotApp.controller('mainController', ['$scope', '$location','$rootScope','$cookies','$cookieStore',
	function($scope,$location,$rootScope,$cookieStore,$cookies) {
	console.log("mainController");

	if ($cookieStore.get('Role') && $cookieStore.get('Role') != "logged out"){
		
		role = $cookieStore.get('Role');
		console.log("Role:",role)
		    $('#timeoutModal').on('shown.bs.modal', function () {
  			$('#myInput').focus()
			})

		$rootScope.$on('IdleTimeout', function() {
			console.log("timeout")
			// end their session and redirect to login
	        if ($cookieStore.get('Role')){
	        $scope.logout();    
			}
			location.reload();

	    });
	    $scope.$on('IdleStart', function() {
	    	console.log("start")
	    	// end their session and redirect to login
	      if ($cookieStore.get('Role')){	      	
			$('#timeoutModal').modal("show")
	      }
	    });
	}
	if ($cookieStore.get('Role')){
		role =$cookieStore.get('Role');


		console.log("Role:",role);
		if (role =='Student') {
			$rootScope.studentLogged = true;
			$rootScope.instructorLogged = false;
			$rootScope.adminLogged = false;
		}
		//Instructor
		else if (role == 'Instructor'){
			$rootScope.studentLogged = false;
			$rootScope.instructorLogged = true;
			$rootScope.adminLogged = false;
		}
		//Admin
		else if (role == 'Administrator'){
			$rootScope.studentLogged = false;
			$rootScope.instructorLogged =false;
			$rootScope.adminLogged = true;
		}
		else{
		
			$location.path("/login")
		}
	

	}
	else{
		
		$location.path("/login")
	}	/*$location.path(page)*/
		/*console.log(page)*/
			

	
	$scope.logout = function(){
		console.log("logout")
		$rootScope.studentLogged = false;
		$rootScope.instructorLogged =false;
		$rootScope.adminLogged = false;
		$location.path('/login');
		$cookies.put('Role', 'logged out');
		var cookies = ['Role','NetId'];
		angular.forEach(cookies, function (v, k) {
    	$cookies.remove(v);
		});
	}
	
	$rootScope.main = {"userName": "Angulo Javo"};

	
	$scope.classes = {
		"cse1310":{
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
	
	
	}
	
	console.log($scope.classes)
	
	
}]);