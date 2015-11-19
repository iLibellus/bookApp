bookApp.service('BookService', function($http, $q) {
  return {
    'getBooks': function() {
      var defer = $q.defer();
      $http.get('/book/getBooks').success(function(resp){
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    },
    'addBook': function(book) {
      var defer = $q.defer();
      $http.post('/book/addBook', book).success(function(resp){
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    },
    'removeBook': function(book) {
      var defer = $q.defer();
      $http.post('/book/removeBook', book).success(function(resp){
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    }
}});
