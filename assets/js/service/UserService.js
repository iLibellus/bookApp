bookApp.service('BookInfoService', function($http, $q) {
  return {
    'signin': function(book) {
      var defer = $q.defer();
      $http.post('/auth/signin/'+user).success(function(resp){
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    }
}});
