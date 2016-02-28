(function() {
  'use strict';

  angular
  .module('Yaka')
  .controller('MyProjectsController', MyProjectscontroller);

  //
  //Controller login
  MyProjectscontroller.$inject = ['$scope', 'networkService', 'socialNetworkService', '$rootScope', '$localStorage', '$state', '$filter']
  function MyProjectscontroller($scope, networkService, socialNetworkService, $rootScope, $localStorage, $state, $filter) {

    var vm = this;
    vm.projectsOnGoing = [];
    vm.projectsCompleted = [];
    vm.selectProject = selectProject;
    vm.dateDiff = dateDiff;


    networkService.projectsGET("ongoing", succesProjectsGET, errorProjectsGET);
    networkService.projectsGET("completed", succesProjectsCompletedGET, errorProjectsCompletedGET);

    vm.getMenuItemClass = function (state) {
      if (state == "myprojects") {
        return "active-menu";
      }
      return "";
    }

    function dateDiff(d1, d2){
      var h = 0;
      var d = 0;
      var m = 0;
      var min = 0;
      d1 = new Date(d1).getTime() / 60000;
      d2 = new Date(d2).getTime() / 60000;
      var min = new Number(d2 - d1).toFixed(0)
      if (min > 60){
        h = min / 60;
        if (h > 24){
          d = h / 24;
          if (d > 30)
          m = d /30;
        }
      }
      if (m > 0){
        return $filter('number')(m, 0)+" mois"
      }
      else if (d > 0)
      return $filter('number')(d, 0)+" jours";
      else if (h > 0)
      return $filter('number')(h, 0)+"h";
      else
      return $filter('number')(min, 0)+" min";
    }

    function succesProjectDraftsGET(){

    }

    function selectProject(p){
      $localStorage.projectGet = p;
      $state.go("project");
    }

    // function succesProjectGET(res){
    //   $rootScope.projects = res;
    //   if (res.length < 3){
    //     if (!angular.isUndefined(res) && res && res.length > 0)
    //     vm.projectsOnGoing = res;
    //     else {
    //       vm.projectsOnGoing = [];
    //     }
    //     networkService.projectsGET("draft", succesProjectsDraftGET, errorProjectsDraftGET);
    //   }else{
    //     vm.projectsOnGoing = sortProjects(res);
    //   }
    //   console.log(res);
    // }

    function succesProjectsGET(res){
      $rootScope.projects = res;
      if (!angular.isUndefined(res) && res && res.length > 0)
      vm.projectsOnGoing = res;
      else {
        vm.projectsOnGoing = [];
      }
    }

    function succesProjectsCompletedGET(res){
      vm.projectsCompleted = res;
      console.log(res);
    }

    function errorProjectsGET(){

    }

    function errorProjectsDraftGET(){

    }
    function errorProjectsCompletedGET(){

    }

  }
})();
