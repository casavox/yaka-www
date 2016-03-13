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

    networkService.projectsGET("ongoing", succesProjectsGET, errorProjectsGET);

    function succesProjectsGET(res){
      $rootScope.projects = res;
      vm.count = res.length;
      vm.dashboardProjects = sortProjects(res);
      console.log(res)
    }

    function succesProjectsDraftGET(res){
      vm.dashboardProjects = vm.dashboardProjects.concat(res);
      vm.count = vm.dashboardProjects.length;
      vm.dashboardProjects = sortProjects(vm.dashboardProjects);
      console.log(vm.dashboardProjects);
    }

    function errorProjectsGET(){
      // call service error
    }

    function errorProjectsDraftGET(){
      // call service error
    }


    function selectProject(p){
      $localStorage.projectGet = p;
      $state.go("project");
    }

    function sortProjects(tab){
      var tmp = [];
      if (tab.length > 0){
        for (var i = 0; i < tab.length; i++) {
          if (tab[i] && tab[i].type && tab[i].status && tab[i].status == "ONGOING_RATE_PRO")
          tmp.push(tab[i]);
        }
        for (var i = 0; i < tab.length; i++) {
          if (tab[i] && tab[i].type && tab[i].type == "EMERGENCY" && tab[i].status != "ONGOING_RATE_PRO")
          tmp.push(tab[i]);
        }
        for (var i = 0; i < tab.length; i++) {
          if (tab[i] && tab[i].type && tab[i].unreadMessages == true && tab[i].type != "EMERGENCY" && tab[i].status != "ONGOING_RATE_PRO")
          tmp.push(tab[i]);
        }
        if (tmp.length < 3)
        for (var i = 0; i < tab.length; i++) {
          if (tab[i] && tab[i].type && tab[i].status && tab[i].unreadMessages == false && tab[i].type != "EMERGENCY" && tab[i].status != "ONGOING_RATE_PRO")
          tmp.push(tab[i]);
        }
        else if (tmp.length > 3){
          tmp = tmp.slice(0, 3);
        }
        return tmp;
      }
      else {
        return tmp;
      }
    }

  }
})();
