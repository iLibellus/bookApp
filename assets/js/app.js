'use strict';

var bookApp = angular.module('bookApp', ['ngRoute', 'ngAnimate', 'mgcrea.ngStrap', 'ngDroplet']);
bookApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: '/templates/book.html',
      controller: 'BookCtrl'
    }) //.when adds new route definition to $route service
	   .when('/book/getBookByName/:bookid',{
	   			//Profile View Routing to profile.html and controller - ProfileController
				templateUrl:'/templates/detail.html',
				controller:'BookInfoCtrl'
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
      $scope.selectedImage = {};
      $scope.interface = {};

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

bookApp.controller('BookInfoCtrl',['$scope', '$http', '$log' ,'$routeParams', 'BookInfoService', function($scope,$http,$log,$routeParams, BookInfoService){
	//Store detail id in Controller
	$scope.bookid = $routeParams.bookid;
	//Initialist the book Data
	$scope.book={};
	//Initialise Error Handler
	$scope.notFound = false;

	BookInfoService.findBookById($scope.bookid).then(function(response) {
        $scope.book = response;
        $log.info(response);
      });

	//$scope.findBookById = function(book) {
		//BookInfoService.findBookById(book).then(function(response) {
			//$scope.book = response;
		//})
	//}
}]);

bookApp.controller('ModalController', function($scope, $modal) {
  // Pre-fetch an external template populated with a custom scope
  var myModal = $modal({scope: $scope, animation:"am-fade-and-scale", template: '/templates/modal/modal.bookinfo.tpl.html', show: false});
  // Show when some event occurs (use $promise property to ensure the template has been loaded)
  $scope.showModal = function(book) {
    $scope.selectedBook = book
    myModal.$promise.then(myModal.show);
  };
});

bookApp.controller('FileController', ['$scope', '$timeout', 'BookService', function($scope, $timeout, BookService) {
    $scope.interface = {};
    $scope.uploadCount = 0;
    $scope.success = false;
    $scope.error = false;

    // Listen for when the interface has been configured.
    $scope.$on('$dropletReady', function whenDropletReady() {

            $scope.interface.allowedExtensions(['png', 'jpg', 'bmp', 'gif', 'svg', 'torrent']);
            $scope.interface.setRequestUrl('/file/uploadImage');
            $scope.interface.defineHTTPSuccess([/2.{2}/]);
            $scope.interface.useArray(false);

    });

    // Listen for when the files have been successfully uploaded.
    $scope.$on('$dropletSuccess', function onDropletSuccess(event, response, files) {

        $scope.uploadCount = files.length;
        $scope.success     = true;
        console.log(response, files);

        $timeout(function timeout() {
            $scope.success = false;
        }, 5000);

    });

    // Listen for when the files have failed to upload.
    $scope.$on('$dropletError', function onDropletError(event, response) {

        $scope.error = true;
        console.log(response);

        $timeout(function timeout() {
            $scope.error = false;
        }, 5000);

    });
}]);

bookApp.directive('progressbar', function ProgressbarDirective() {

    return {
        restrict: 'A',
        scope: {
            model: '=ngModel'
        },

        require: 'ngModel',

        link: function link(scope, element) {

            var progressBar = new ProgressBar.Path(element[0], {
                strokeWidth: 2
            });

            scope.$watch('model', function() {

                progressBar.animate(scope.model / 100, {
                    duration: 1000
                });

            });

            scope.$on('$dropletSuccess', function onSuccess() {
                progressBar.animate(0);
            });

            scope.$on('$dropletError', function onSuccess() {
                progressBar.animate(0);
            });
        }
    }
});
