(function() {
  'use strict';

  angular
  .module('Yaka')
  .controller('DashboardController', DashboardController);

  //
  //Controller login
  DashboardController.$inject = ['$scope', 'networkService', 'socialNetworkService', '$rootScope', '$localStorage', '$state']
  function DashboardController($scope, networkService, socialNetworkService, $rootScope, $localStorage, $state) {
    var vm = this;
    vm.dashboardProjects = [];
    vm.dashboardAddress = [];
    vm.dashboardPro = [];
    vm.count = 0;
    vm.selectProject = selectProject;

    vm.getMenuItemClass = function (state) {
      if (state == "dashboard") {
        return "active-menu";
      }
      return "";
    }

    networkService.projectsGET("ongoing", 1, 3, succesProjectsGET, errorProjectsGET);

    function succesProjectsGET(res){
      $rootScope.projects = res.items;
      vm.count = res.totalItemNumber;
      vm.dashboardProjects = res.items;
      console.log(res)
    }


    function errorProjectsGET(){
      alertMsg.send("Error : Impossible to get the projects.", "warning");
    }

    function selectProject(p){
      $localStorage.projectGet = p;
      $state.go("project");
    }


  }
})();
