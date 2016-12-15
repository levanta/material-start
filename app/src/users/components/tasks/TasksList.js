import TasksListController from './TasksListController'

export default {
  name : 'tasksList',
  config : {
    bindings         : {  selected: '<' },
    templateUrl      : 'src/users/components/tasks/TasksList.html',
    controller       : [ '$http','$scope','$mdSidenav', '$mdUtil', '$rootScope', '$cookies', '$log', TasksListController]
  }
};