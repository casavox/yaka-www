(function() {
  'use strict';

  angular
  .module('Yaka')
  .controller('ProProjectController', ProProjectController);

  //
  //Controller login
  ProProjectController.$inject = ['$scope', '$state', '$timeout', '$localStorage', 'networkService', 'alertMsg', 'Upload', 'cloudinary', '$filter', '$stateParams']
  function ProProjectController($scope, $state, $timeout, $localStorage, networkService, alertMsg, $upload, cloudinary, $filter, $stateParams) {
    var vm = this;
    vm.getWhen = getWhen;



    if ($stateParams.projectId){
      var res = parseInt($stateParams.projectId);
      if (res.toString() != $stateParams.projectId)
      $state.go("prodashboard");
      else {
        networkService.projectGET(res, succesProjectGET, errorProjectGET);
      }
    }
    else {
      $state.go("prodashboard");
    }

    function succesProjectGET(res){
      vm.project = res;
      console.log(res);
      vm.projectTmp = angular.copy(vm.project);
      if (vm.projectTmp.type != "EMERGENCY"){
        vm.dateType = vm.projectTmp.desiredDatePeriod;
        vm.dt = new Date(vm.projectTmp.desiredDate);
      }
      if (vm.projectTmp.type == "EMERGENCY" && vm.projectTmp.availabilities){
        for (var i = 0; i < vm.projectTmp.availabilities.length; i++) {
          switch (vm.projectTmp.availabilities[i].slot) {
            case "7H_9H":
            if(vm.projectTmp.availabilities[i].date == $filter('date')(vm.J1.date, "yyyy-MM-dd")){
              vm.J1.c1 = true;
            }
            else if(vm.projectTmp.availabilities[i].date == $filter('date')(vm.J2.date, "yyyy-MM-dd")){
              vm.J2.c1 = true;
            }
            else if(vm.projectTmp.availabilities[i].date == $filter('date')(vm.J3.date, "yyyy-MM-dd")){
              vm.J3.c1 = true;
            }
            break;
            case "9H_12H":
            if(vm.projectTmp.availabilities[i].date == $filter('date')(vm.J1.date, "yyyy-MM-dd")){
              vm.J1.c2 = true;
            }
            else if(vm.projectTmp.availabilities[i].date == $filter('date')(vm.J2.date, "yyyy-MM-dd")){
              vm.J2.c2 = true;
            }
            else if(vm.projectTmp.availabilities[i].date == $filter('date')(vm.J3.date, "yyyy-MM-dd")){
              vm.J3.c2 = true;
            }
            break;
            case "12H_14H":
            if(vm.projectTmp.availabilities[i].date == $filter('date')(vm.J1.date, "yyyy-MM-dd")){
              vm.J1.c3 = true;
            }
            else if(vm.projectTmp.availabilities[i].date == $filter('date')(vm.J2.date, "yyyy-MM-dd")){
              vm.J2.c3 = true;
            }
            else if(vm.projectTmp.availabilities[i].date == $filter('date')(vm.J3.date, "yyyy-MM-dd")){
              vm.J3.c3 = true;
            }
            break;
            case "14H_16H":
            if(vm.projectTmp.availabilities[i].date == $filter('date')(vm.J1.date, "yyyy-MM-dd")){
              vm.J1.c4 = true;
            }
            else if(vm.projectTmp.availabilities[i].date == $filter('date')(vm.J2.date, "yyyy-MM-dd")){
              vm.J2.c4 = true;
            }
            else if(vm.projectTmp.availabilities[i].date == $filter('date')(vm.J3.date, "yyyy-MM-dd")){
              vm.J3.c4 = true;
            }
            break;
            case "16H_18H":
            if(vm.projectTmp.availabilities[i].date == $filter('date')(vm.J1.date, "yyyy-MM-dd")){
              vm.J1.c5 = true;
            }
            else if(vm.projectTmp.availabilities[i].date == $filter('date')(vm.J2.date, "yyyy-MM-dd")){
              vm.J2.c5 = true;
            }
            else if(vm.projectTmp.availabilities[i].date == $filter('date')(vm.J3.date, "yyyy-MM-dd")){
              vm.J3.c5 = true;
            }
            break;
            case "18H_20H":
            if(vm.projectTmp.availabilities[i].date == $filter('date')(vm.J1.date, "yyyy-MM-dd")){
              vm.J1.c6 = true;
            }
            else if(vm.projectTmp.availabilities[i].date == $filter('date')(vm.J2.date, "yyyy-MM-dd")){
              vm.J2.c6 = true;
            }
            else if(vm.projectTmp.availabilities[i].date == $filter('date')(vm.J3.date, "yyyy-MM-dd")){
              vm.J3.c6 = true;
            }
            break;
            case "AFTER_20H":
            if(vm.projectTmp.availabilities[i].date == $filter('date')(vm.J1.date, "yyyy-MM-dd")){
              vm.J1.c7 = true;
            }
            else if(vm.projectTmp.availabilities[i].date == $filter('date')(vm.J2.date, "yyyy-MM-dd")){
              vm.J2.c7 = true;
            }
            else if(vm.projectTmp.availabilities[i].date == $filter('date')(vm.J3.date, "yyyy-MM-dd")){
              vm.J3.c7 = true;
            }
            break;
            case "ALL_DAY":
            if(vm.projectTmp.availabilities[i].date == $filter('date')(vm.J1.date, "yyyy-MM-dd")){
              vm.J1.all = true
              vm.all(vm.J1);
            }
            else if(vm.projectTmp.availabilities[i].date == $filter('date')(vm.J2.date, "yyyy-MM-dd")){
              vm.J2.all = true
              vm.all(vm.J2);
            }
            else if(vm.projectTmp.availabilities[i].date == $filter('date')(vm.J3.date, "yyyy-MM-dd")){
              vm.J3.all = true
              vm.all(vm.J3);
            }
            break;
          }

        }
      }
      else{
        switch (vm.projectTmp.desiredDatePeriod) {
          case "SPECIFIC":
          vm.child0 = "activate";
          vm.dateSelected = true;
          break;
          case "WITHIN_A_WEEK":
          vm.child1 = "activate";
          vm.dateSelected = false;
          break;
          case "WITHIN_A_MONTH":
          vm.child2 = "activate";
          vm.dateSelected = false;
          break;
          case "NONE":
          vm.child3 = "activate";
          vm.dateSelected = false;
          break;
        }
      }
    }

    function getWhen(){
      var res = 0;
      if (!angular.isUndefined(vm.projectTmp) && vm.projectTmp.availabilities && vm.projectTmp.availabilities.length > 0){
        for (var i = 0; i < vm.projectTmp.availabilities.length; i++) {
          res += 1;
        }
        return "Emergency : " + res + " slots appointment"
      }
      else {
        switch (vm.projectTmp.desiredDatePeriod) {
          case "SPECIFIC":
          return "Le "+vm.projectTmp.desiredDate;
          case "WITHIN_A_WEEK":
          return "Dans la semaine";
          case "WITHIN_A_MONTH":
          return "Dans le mois";
          case "NONE":
          return "Flexible sur la date de départ";
        }
      }
    }

    function errorProjectGET(){
      $state.go("prodashboard");
    }
  }
})();
