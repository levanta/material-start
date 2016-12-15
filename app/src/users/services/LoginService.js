/**
 * Users DataService
 * Uses embedded, hard-coded data model; acts asynchronously to simulate
 * remote data service call(s).
 *
 * @returns {{login: Function}}
 * @constructor
 */
function LoginService($q, $cookies, $http) {
  
  // Promise-based API
  return {
    
    login: function() {
        var session = $cookies.get('session');
        if(!session){
          var promise =  $q(function(resolve, reject){
            var sessionUrl = 'https://api-test-task.decodeapps.io/signup';
            $http.post(sessionUrl).then(
              function(response){
                session = response.data.session;
                $cookies.put('session', session);
                resolve(session);
              }
            )
          });
          return promise;
        } else {
          var promise =  $q(function(resolve, reject){
            resolve(session);
          });
          return promise;
        }
    }
  };
}
export default ['$q', '$cookies', '$http', LoginService];

