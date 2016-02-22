(function() {
  'use strict';

  angular
  .module('Yaka')
  .controller('MyProjectsController', MyProjectscontroller);

  //
  //Controller login
  MyProjectscontroller.$inject = ['$scope', 'networkService', 'socialNetworkService', '$rootScope', '$localStorage', '$state']
  function MyProjectscontroller($scope, networkService, socialNetworkService, $rootScope, $localStorage, $state) {

    var vm = this;
    vm.projectsOnGoing = [];
    vm.projectsCompleted = [];
    vm.selectProject = selectProject;
    networkService.projectsGET("ongoing", succesProjectsGET, errorProjectsGET);
    networkService.projectsGET("completed", succesProjectsCompletedGET, errorProjectsCompletedGET);

    vm.getMenuItemClass = function (state) {
      if (state == "myprojects") {
        return "active-menu";
      }
      return "";
    }

    function selectProject(p){
      $localStorage.projectGet = p;
      $state.go("project");
    }

    function succesProjectGET(res){
      $rootScope.projects = res;
      if (res.length < 3){
        if (!angular.isUndefined(res) && res && res.length > 0)
        vm.projectsOnGoing = res;
        else {
        vm.projectsOnGoing = [];
        }
        networkService.projectsGET("draft", succesProjectsDraftGET, errorProjectsDraftGET);
      }else{
      vm.projectsOnGoing = sortProjects(res);
      }
      console.log(res);
    }

    function succesProjectsGET(res){
      $rootScope.projects = res;
      if (res.length < 3){
        if (!angular.isUndefined(res) && res && res.length > 0)
        vm.projectsOnGoing = res;
        else {
        vm.projectsOnGoing = [];
        }
        networkService.projectsGET("draft", succesProjectsDraftGET, errorProjectsDraftGET);
      }else{
      vm.projectsOnGoing = sortProjects(res);
      }
      console.log(res);
    }

    function succesProjectsCompletedGET(res){
      vm.projectsCompleted = sortProjects(res);
      console.log(res);
    }

    function succesProjectsDraftGET(res){
      vm.projectsOnGoing.concat(res);
      vm.projectsOnGoing = sortProjects(vm.projectsOnGoing);
      console.log(vm.projectsOnGoing);
    }

    function errorProjectsGET(){

    }

    function errorProjectsDraftGET(){

    }
    function errorProjectsCompletedGET(){

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
        for (var i = 0; i < tab.length; i++) {
          if (tab[i] && tab[i].type && tab[i].status && tab[i].unreadMessages == false && tab[i].type != "EMERGENCY" && tab[i].status != "ONGOING_RATE_PRO")
          tmp.push(tab[i]);
        }
        return tmp;
      }
      else {
        return tmp;
      }
    }

  }
})();
