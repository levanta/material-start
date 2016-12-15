// Load libraries
import angular from 'angular';
import ngCookies from 'angular-cookies';

import 'angular-animate';
import 'angular-aria';
import 'angular-material';

import AppController from 'src/AppController';
import Users from 'src/users/Users';

export default angular.module( 'starter-app', [ 'ngMaterial', 'ngCookies', Users.name ]



  )

  .controller('AppController', AppController);
