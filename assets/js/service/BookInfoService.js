bookApp.service('BookInfoService', function($http, $q) {
  return {
    'findBookById': function() {
      var defer = $q.defer();
      $http.get('/book/getBookById', book).success(function(resp){
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    }
}});
