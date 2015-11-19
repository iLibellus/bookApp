'use strict';

var bookApp = angular.module('bookApp', ['ngRoute', 'ngAnimate', 'mgcrea.ngStrap']);
bookApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: '/templates/book.html',
      controller: 'BookCtrl'
    }).otherwise({
      redirectTo: '/',
      caseInsensitiveMatch: true
    })
  }]);
  
  bookApp.controller('BookCtrl', ['$scope', '$rootScope', 'BookService', function($scope, $rootScope, BookService) {
      $scope.formData = {};
      $scope.books = [];
    
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
	$scope.searchFilter = function (book) {
    	var keyword = new RegExp($scope.nameFilter, 'i');
    	return !$scope.nameFilter || keyword.test(book.Book.name) || keyword.test(book.Book.author);
	};
}]);


