// Load the custom app ES6 modules

import UsersDataService from 'src/users/services/UsersDataService';
import ProjectsDataService from 'src/users/services/ProjectsDataService';
import LoginService from 'src/users/services/LoginService';

import UsersList from 'src/users/components/list/UsersList';
import UserDetails from 'src/users/components/details/UserDetails';
import TasksList from 'src/users/components/tasks/TasksList';
import Search from 'src/users/components/search/Search';
import DropdownMenu from 'src/users/components/dropdown/DropdownMenu';

// Define the Angular 'users' module

export default angular
  .module("users", ['ngMaterial'])

  .component(UsersList.name, UsersList.config)
  .component(UserDetails.name, UserDetails.config)
  .component(TasksList.name, TasksList.config)
  .component(Search.name, Search.config)
  .component(DropdownMenu.name, DropdownMenu.config)

  .service("UsersDataService", UsersDataService)
  .service("ProjectsDataService", ProjectsDataService)
  .service("LoginService", LoginService);
