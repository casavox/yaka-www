(function() {
  'use strict';

  angular
  .module('Yaka')
  .controller('ProjectController', ProjectController);

  //
  //Controller login
  ProjectController.$inject = ['$scope', '$state', '$timeout', '$localStorage', 'networkService', 'alertMsg', 'uiGmapGoogleMapApi']
  function ProjectController($scope, $state, $timeout, $localStorage, networkService, alertMsg, uiGmapGoogleMapApi) {
    var vm = this;
    vm.pro = true;
    vm.editFlag = false;
    vm.project = {};
    vm.prev = prev;
    vm.getWhen = getWhen;
    vm.getTags = getTags;
    vm.edit = edit;
    $scope.map = {center: {latitude: 51.219053, longitude: 4.404418 }, zoom: 14 };
    $scope.options = {scrollwheel: true};

    if (!angular.isUndefined($localStorage.projectGet) && $localStorage.projectGet)
    {
      networkService.projectGET($localStorage.projectGet.id, succesProjectGET, errorProjectGET);
    }

    function edit(){
      vm.editFlag = true;
    }

    function getTags(){
      var res = "";
      if (vm.project.tags && vm.project.tags.length > 0){
        for (var i = 0; i < vm.project.tags.length; i++) {
          if (i <  vm.project.tags.length - 1)
          res += vm.project.tags[i].name + " - ";
          else {
            res += vm.project.tags[i].name
          }
        }
        return res;
      }
      else {

      }
    }

    function getWhen(){
      var res = 0;
      if (vm.project.availabilities && vm.project.availabilities.length > 0){
        for (var i = 0; i < vm.project.availabilities.length; i++) {
          res += 1;
        }
        return "Emergency : " + res + " slots appointment"
      }
      else {

      }
    }

    function prev(){
      delete $localStorage.projectGet;
      $state.go("my-projects");
    }

    function succesProjectGET(res){
      vm.project = res;
    }

    function errorProjectGET(res){
      alertMsg.send("Error : Impossible to get the mission", "danger");
      $state.go("my-projects");
    }
  }
})();
