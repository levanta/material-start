/**
 * Users DataService
 * Uses embedded, hard-coded data model; acts asynchronously to simulate
 * remote data service call(s).
 *
 * @returns {{loadAll: Function}}
 * @constructor
 */
function UsersDataService($q, $cookies, $http) {
  return {

    loadUser: function(session) {
      var accountUrl = 'https://api-test-task.decodeapps.io/account?session=' + session
      return $http.get(accountUrl);
    }
  };
}
export default ['$q', '$cookies', '$http', UsersDataService];

