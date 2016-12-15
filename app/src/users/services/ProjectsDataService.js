/**
 * Projects DataService
 * Uses embedded, hard-coded data model; acts asynchronously to simulate
 * remote data service call(s).
 *
 * @returns {{loadProjects: Function}}
 * @constructor
 */
function ProjectsDataService($q, $cookies, $http) {
  return {
    loadProjects: function(session) {
      var accountUrl = 'https://api-test-task.decodeapps.io/account?session=' + session
      var projectsUrl = 'https://api-test-task.decodeapps.io/projects?session=' + session
      var promise = $q.all({
        account: $http.get(accountUrl),
        projects: $http.get(projectsUrl)
      })
      return promise;
    }
  };
}
export default ['$q', '$cookies', '$http', ProjectsDataService];

