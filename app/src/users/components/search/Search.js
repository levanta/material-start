import SearchController from './SearchController'

export default {
  name : 'search',
  config : {
    bindings         : {  selected: '<' },
    templateUrl      : 'src/users/components/search/Search.html',
    controller       : [ '$rootScope',  SearchController ]
  }
};