(function() {
  'use strict';

  angular
  .module('Yaka')
  .controller('DashboardController', DashboardController);

  //
  //Controller login
  DashboardController.$inject = ['$scope', 'networkService', 'socialNetworkService']
  function DashboardController($scope, networkService, socialNetworkService) {

    var vm = this;
    vm.dashboardProjects = [];
    vm.dashboardAddress = [];
    vm.dashboardPro = [];

    networkService.projectsGET("ongoing", succesProjectsGET, errorProjectsGET);

    function succesProjectsGET(res){
      vm.dashboardProjects = sortProjects(res);
    }

    function errorProjectsGET(){

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
        return tmp;
      }
    }

  }
})();
