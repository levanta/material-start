class SearchController  {

  /**
   * Constructor
   *
   * @param $timeout
   * @param $http
   */
  constructor($rootScope) {
    this.searchString = ''
    var self = this;
    this.search = function(){
      $rootScope.$broadcast('search', self.searchString);
    }
    
  }

}
export default SearchController;