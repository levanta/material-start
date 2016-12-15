class DropdownMenuController  {

  /**
   * Constructor
   *
   * @param $log
   */
  constructor($mdDialog, $rootScope, $scope) {
    var originatorEv;

    this.openMenu = function($mdMenu, ev) {
      originatorEv = ev;
      $mdMenu.open(ev);
    };
    this.redial = function () {
      $rootScope.$broadcast('editProj', this.selected);
    };
    this.delete = function () {
      $rootScope.$broadcast('deleteProject', this.selected, this.users);
    };

    $scope.$on('hideBtn', angular.bind(this, function(event, taskName, description){ 
      this.selected = null;
    }));
  }
}
export default DropdownMenuController;
