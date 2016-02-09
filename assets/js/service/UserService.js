bookApp.service('UserService', function($http, $q, $localStorage) {
  function urlBase64Decode(str) {
        var output = str.replace('-', '+').replace('_', '/');
        switch (output.length % 4) {
            case 0:
                break;
            case 2:
                output += '==';
                break;
            case 3:
                output += '=';
                break;
            default:
                throw 'Illegal base64url string!';
        }
        return window.atob(output);
    }

    function getClaimsFromToken() {
        var token = $localStorage.token;
        var user = {};
        if (typeof token !== 'undefined') {
            var encoded = token.split('.')[1];
            user = JSON.parse(urlBase64Decode(encoded));
        }
        return user;
    }

    var tokenClaims = getClaimsFromToken();

    return {
       signup: function (data, success, error) {
         var defer = $q.defer();
           $http.post('/auth/signup', data).success(function(resp){
             defer.resolve(resp);
           }).error( function(err) {
             defer.reject(err);
           });
           return defer.promise;
       },
       signin: function (data, success, error) {
         var defer = $q.defer();
           $http.post('/auth/signin', data).success(function(resp){
             defer.resolve(resp);
           }).error( function(err) {
             defer.reject(err);
           });
           return defer.promise;
       },
       logout: function (success) {
           tokenClaims = {};
           delete $localStorage.token;
           success();
       },
       getTokenClaims: function () {
           return tokenClaims;
       }
   };
});
