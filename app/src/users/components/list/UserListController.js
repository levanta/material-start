class UserListController  {

  /**
   * Constructor
   *
   * @param $mdBottomSheet
   * @param $log
   */
  constructor($mdSidenav, $mdUtil, $log, $rootScope) {
    this.toggleNewProj = function (projectList) {
      $rootScope.$broadcast('newProj', projectList);
    };
  }
}
export default UserListController;

