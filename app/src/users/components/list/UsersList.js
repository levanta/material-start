// Notice that we do not have a controller since this component does not
// have any specialized logic.
import UserListController from './UserListController'

export default {
  name : 'usersList',
  config : {
    bindings         : {  users: '<', account: '<', selected : '<', showDetails : '&onSelected'},
    templateUrl      : 'src/users/components/list/UsersList.html',
    controller       : [ '$mdSidenav', '$mdUtil', '$log','$rootScope', UserListController ]
  }
};
