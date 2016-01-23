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
      vm.dashboardProjects = res;
    }

    function errorProjectsGET(){

    }

  }
})();
