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
    },
    'uploadFile': function(images) {
      $http.post('/file/uploadImage', images).success(function(resp){
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    },
    'searchRemoteBook': function(query) {
      var defer = $q.defer();
      var queryString = 'http://libris.kb.se/xsearch?query=' + query + '&format=json';
      var defer = $q.defer();
      $http.get(queryString).success(function(resp){
        defer.resolve(resp);
      }).error( function(err) {
        defer.reject(err);
      });
      return defer.promise;
    },
    'searhJASONP': function(query) {
      var defer = $q.defer();
      var url = 'http://libris.kb.se/xsearch?query=' + query + '&format=json';
      $http({
            method: 'JSONP',
            url: url,
            params : {callback : 'JSON_CALLBACK'}
        }).
        success(function(resp) {
            defer.resolve(resp);
        }).
        error(function(err) {
            defer.reject(err);
        });
      return defer.promise;
    }
}});
