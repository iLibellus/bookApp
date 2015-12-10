bookApp.service('BookInfoService', function($http, $q) {
  return {
    'findBookById': function(book) {
      var defer = $q.defer();
      console.log('Client side Retrives book with name: /book/getBookByName/' + book)
      $http.get('/book/getBookByName/'+book).success(function(resp){
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    }
}});
