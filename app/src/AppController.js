/**
 * Main App Controller for the Angular Material Starter App
 * @param UsersDataService
 * @param $mdSidenav
 * @constructor
 */
function AppController(UsersDataService, ProjectsDataService, LoginService, $mdSidenav,  $rootScope) {
  var self = this;

  self.selected     = null;
  self.users        = [ ];
  self.selectUser   = selectUser;
  self.toggleList   = toggleUsersList;
  self.account      = null;
  self.hideProgress = false;


  LoginService.login()
    .then(function(session) {
      return ProjectsDataService.loadProjects(session)
    }).then( function( d) {
        var account = d.account.data,
          projects = d.projects.data,
          proj = {};
        self.account  = account.Account;
        for ( var i=0; i<projects.projects.length; i++ ) {
          proj[i] = projects.projects[i].Project
        }
        self.users  = proj;
        self.hideProgress = true;
      })
  // *********************************
  // Internal methods
  // *********************************

  /**
   * Hide or Show the 'left' sideNav area
   */
  function toggleUsersList() {
    $mdSidenav('left').toggle();
  }

  /**
   * Select the current avatars
   * @param menuId
   */
  function selectUser ( user ) {
    self.selected = angular.isNumber(user) ? $scope.users[user] : user;
    $rootScope.$broadcast('childEvent', self.selected);
  }
}

export default [ 'UsersDataService', 'ProjectsDataService', 'LoginService', '$mdSidenav', '$rootScope', AppController ];
