import UserDetailsController from './UserDetailsController'

export default {
  name : 'userDetails',
  config : {
    bindings         : {  users: '<', selected: '<' },
    templateUrl      : 'src/users/components/details/UserDetails.html',
    controller       : [ '$mdBottomSheet','$mdSidenav', '$mdUtil', '$scope', '$http', '$cookies', '$rootScope', UserDetailsController ]
  }
};