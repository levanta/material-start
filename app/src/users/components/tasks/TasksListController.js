class TasksListController  {

  /**
   * Constructor
   *
   * @param $timeout
   * @param $http
   */
  constructor($http, $scope, $mdSidenav, $mdUtil, $rootScope, $cookies, $log) {
    this.items = [];
    this.bool = true; 
    this.hasTasks = false;
    this.dateArray = [];
    this.session = $cookies.get('session');
    var self = this;
    this.hasMoreData = true;
    this.numLoad = 0;
    this.paging_size = 5;
    this.searchString = '';
    this.noResults = false;
    this.firstPage = true;
    this.hasScrollBar = function() {
        return angular.element(document.getElementById('content'))[0].scrollHeight > angular.element(document.getElementById('content'))[0].offsetHeight;
    };
    
    $scope.$on('childEvent', function(event, proj){
      self.numLoad = 0;
      self.dateArray = [];
      self.items = [];
      self.bool = true; 
      self.firstPage = false;
      if(proj.task_count > 0){
        self.getTasksList($http, proj, self.searchString);
        self.hasTasks = true;
      }else{
        self.hasTasks = false;
      }
    })
    this.toggleNewTask = function () {
      $rootScope.$broadcast('newTask', this.selected);
    };
    this.editTask = function (task) {
      $rootScope.$broadcast('editTask', task);
    };
    this.deleteTask = function(taskId) {
      var url = 'https://api-test-task.decodeapps.io/tasks/task',
        params = {session:this.session, task_id:taskId}
      $http.delete(url, {params: params})
      for(var o in this.items){
        for(var i in this.items[o].data){
          if(this.items[o].data[i].id === taskId ){
            this.items[o].data.length>1 ? this.items[o]
              .data.splice(this.items[o].data.indexOf(this.items[o].data[i]) , 1 ) : this.items.splice(this.items.indexOf(this.items[o]) , 1 );
            this.selected.task_count --;
          }
            
        }
      }
      if (this.items.length === 0) this.hasTasks = false;
    }
    this.updateTask = function(task, newTitle, newDescription) {
      var url = 'https://api-test-task.decodeapps.io/tasks/task',
        params = {session:this.session, 'Task' : {"id":task.id, "title":newTitle,"description": newDescription}}
      $http.post(url, params).then(angular.bind(this, function (d) {
        for(var o in this.items){
          for(var i in this.items[o].data){
            if(this.items[o].data[i].id === task.id ){
              this.items[o].data[i].title = newTitle;
              this.items[o].data[i].description = newDescription;
            }
              
          }
        }
      }));
    }
    $scope.$on('delTask', angular.bind(this, function(event, task){ 
      this.deleteTask(task.id)
    }));
    $scope.$on('updateTask', angular.bind(this, function(event, task, newTitle, newDescription){ 
      this.updateTask(task, newTitle, newDescription)
    }));

    $scope.$on('createTask', angular.bind(this, function(event, taskName, description){ 
      this.hasTasks = true;
      var createTaskUrl = 'https://api-test-task.decodeapps.io/tasks/task';
      var params = {
        'session' : this.session,
        'Project' : {"id":this.selected.id},
        'Task' : {"title":taskName,"description": description}
      }
      $http.post(createTaskUrl, params).then(angular.bind(this, function (d) {
        this.selected.task_count++;
        var task = {
          description : description,
          id : d.data.Task.id,
          title : taskName
        }
        var bool = false;

        var now = new Date();
        var today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).valueOf();
        if(this.items.length == 0){
          this.items.unshift({
            data : [task],
            time : today
          })
        }else{
          for(var i in this.items){
            var dateValue = this.items[i].time;
            if(dateValue == today) {
              this.items[i].data.unshift(task)
              bool = false
            } else{
              bool = true
            }
          }
          if(bool){
            angular.merge(this.items, {
              data : [task],
              time : today
            });
          }
        }
      }))
    }))

    $scope.$on('hideBtn', angular.bind(this, function(event, taskName, description){ 
      this.selected = null;
    }));


    angular.element(document.getElementById('content')).bind("scroll", function() {
        var elem = document.getElementById('content'),
            elemHeight = elem.offsetHeight,
            contentHeight = elem.scrollHeight,
            yOffset = elem.scrollTop; 

        if(yOffset + elemHeight >= contentHeight-20){
            self.getTasksList($http, self.selected, self.searchString)
        }

    });

    $scope.$on('hideBtn', angular.bind(this, function(event, taskName, description){ 
      this.hasTasks = false;
    }));

    $scope.$on('search', angular.bind(this, function(event, searchString){ 
      this.searchString = searchString;
      this.items = [];
      this.dateArray = [];
      this.numLoad = 0;
      this.getTasksList($http, self.selected, searchString)
    }));
  }

  /**
   * Show the bottom sheet
   */
  getTasksList($http, proj, searchString) {
    this.proj = proj
    if (this.bool) {
      if(proj) {
        this.noResults = false;
        var total = this.total ? this.total : proj.task_count
        this.hasMoreData = this.numLoad*this.paging_size <= total;
        var paging_offset = this.numLoad*this.paging_size;
        var project_id = proj.id;
        var url = 'https://api-test-task.decodeapps.io/tasks?project_id=' + project_id
          + '&paging_offset=' + paging_offset
          + '&paging_size=' + this.paging_size
          + '&session=' + this.session
          + '&condition_keywords=' + this.searchString;
      } else{
        this.noResults = true;
        this.hasMoreData = false;
        this.hasTasks = true;
      }
      if(this.hasMoreData){
        this.bool = false;
        $http.get(url).then(angular.bind(this, function (obj) {
          this.total = obj.data.total_count
          this.numLoad++
          var lastDate = "";
          for(var i in obj.data.tasks){
              var dateValue = new Date(obj.data.tasks[i].Task.created_at.split(" ")[0].replace(/-/g,',')).valueOf();

              var ok = false;
              for(var j in this.dateArray) {
                  if(this.dateArray[j].time == dateValue) {
                      ok = true;
                      this.dateArray[j].data.push(obj.data.tasks[i].Task);
                  }
              }
              if(!ok) {
                  var o = {};
                  o.time = dateValue;
                  o.data = [obj.data.tasks[i].Task];
                  this.dateArray.push(o);
              }
          }
          this.items = angular.merge(this.items, this.dateArray);
          this.bool = true;
          if(!this.hasScrollBar()) {
            this.getTasksList($http, proj, self.searchString)
          }
        }));
      }
      
    }
  }

}
export default TasksListController;