'use strict';

var bookApp = angular.module('bookApp', ['ngRoute', 'ngAnimate', 'mgcrea.ngStrap']);
bookApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: '/templates/book.html',
      controller: 'BookCtrl'
    }) //.when adds new route definition to $route service
	   .when('/profile/:profileid',{
	   			//Profile View Routing to profile.html and controller - ProfileController
				templateUrl:'/templates/profile.html',
				controller:'ProfileController'
		})
		.otherwise({
		  redirectTo: '/',
		  caseInsensitiveMatch: true
		})
  }]);
  
  bookApp.controller('BookCtrl', ['$scope', '$rootScope', 'BookService', function($scope, $rootScope, BookService) {
      $scope.formData = {};
      $scope.books = [];
	$scope.nameFilter = null;
    
      BookService.getBooks().then(function(response) {
        $scope.books = response;
      });
    
      $scope.addBook = function() {
        BookService.addBook($scope.formData).then(function(response) {
          $scope.books.push($scope.formData)
          $scope.formData = {};
        });
      }
      
      $scope.removeBook = function(book) {
        BookService.removeBook(book).then(function(response) {
          $scope.books.splice($scope.books.indexOf(book), 1)
        });
      }
	$scope.nameFilter = function (book) {
    	var keyword = new RegExp($scope.nameFilter, 'i');
    	return !$scope.nameFilter || keyword.test(book.name) || keyword.test(book.author);
	};
}]);

bookApp.controller('DeatilController',function($scope,$http,$log,$routeParams){
	//Store detail id in Controller
	$scope.bookid = $routeParams.bookid;
	//Initialist the book Data
	$scope.book={};
	//Initialise Error Handler
	$scope.notFound = false;
	//Do an API Call to findEmployeebyEmpnum with $routeParams.profileid
	$http.get("http://localhost:1337/book/findBookbyNum/"+$scope.bookid)
		 .success(function(data){
		 	//On successful API CALL check whether empty data is returned or not
		 	if(data.notFound === true)
		 	{
		 		//If book not Found set error flag -- ng-show manages the rest 
		 		$scope.notFound = true;
		 		return;
		 	}
		 	//if book found copy book Data
		 	$scope.book=data.userData;
		 	//Log the data
		 	$log.info(data);
		 })
		 .error(function(data){
		 	//Log error Data
		 	$log.info(data);
		 });
});


