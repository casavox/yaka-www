(function() {
  'use strict';

  angular
  .module('Yaka')
  .controller('ProProposalController', ProProposalController);

  //
  //Controller login
  ProProposalController.$inject = ['$scope', '$state', '$timeout', '$localStorage', 'networkService', 'alertMsg', 'Upload', 'cloudinary', '$filter', '$stateParams']
  function ProProposalController($scope, $state, $timeout, $localStorage, networkService, alertMsg, $upload, cloudinary, $filter, $stateParams) {
    var vm = this;
    vm.getWhen = getWhen;
    vm.dateDiff = dateDiff;
    vm.myPrice = myPrice;
    vm.myDate = myDate;
    vm.selectImagePreview = selectImagePreview;
    vm.markerCoords = {}
    vm.selectPrice = selectPrice;
    vm.selectDate = selectDate;
    vm.sendOffer = sendOffer;
    vm.disabledDay = disabledDay;
    vm.imagePreviewFlag = false;
    vm.myPriceFlag = false;
    vm.myDateFlag = false;
    vm.price = 0;
    vm.offer = {};

    vm.dt = new Date();
    vm.default = angular.copy(vm.dt);
    vm.minDate = new Date();
    vm.J1 = {date: new Date()};
    vm.time = vm.J1.date.getHours();
    vm.initHours = initHours;
    vm.initHours();
    vm.J2 = {date: new Date()};
    vm.J3 = {date: new Date()};
    vm.J2.date.setDate(vm.J2.date.getDate() + 1);
    vm.J3.date.setDate(vm.J3.date.getDate() + 2);
    vm.minDate.setDate(vm.minDate.getDate() + 2);
    vm.all = all;
    vm.getSlot = getSlot;

    $scope.map = {
      center: {
        latitude: 46.5945259,
        longitude: 2.4623584
      }, zoom: 6
    };
    $scope.mapOptions = {
      draggable: false,
      disableDoubleClickZoom: true,
      scrollwheel: false
    };


    if ($stateParams.proposalId){
      var res = parseInt($stateParams.proposalId);
      if (res.toString() != $stateParams.proposalId)
      $state.go("prodashboard");
      else {
        networkService.proposalGET(res, succesProjectGET, errorProjectGET);
      }
    }
    else {
      $state.go("prodashboard");
    }


    function sendOffer(){
      vm.offer.date.date = vm.offer.date.date || null;
      vm.offer.comment = vm.offer.comment || "";
      var formData = {
        project: {id: vm.projectTmp.id},
        price: vm.offer.price.price,
        priceType: $filter('uppercase')(vm.offer.price.type),
        comment: vm.offer.comment
      }
      if (vm.projectTmp.type == 'EMERGENCY'){
        formData.availability = {date: $filter('date')(vm.offer.date.date, "yyyy-MM-dd"), slot: vm.offer.date.slot};
        networkService.proposalEmergencyPOST(formData, function(res){
          console.log(res);
          alertMsg.send("Proposal sent.", "success");
        },function(res){
          alertMsg.send("Error : proposal not sent", "danger");
        } );
      }
      else {
        formData.startDate = $filter('date')(vm.offer.date.date, "yyyy-MM-dd");
        networkService.proposalSmallPOST(formData, function(res){
          console.log(res);
          alertMsg.send("Proposal sent.", "success");
        },function(res){
          alertMsg.send("Error : proposal not sent", "danger");
        } );
      }

    }

    function selectDate(slot){
      vm.offer.date = {date: vm.dt};
      if (vm.projectTmp.type == 'EMERGENCY')
      vm.offer.date.slot = slot;
      vm.myDateFlag = false;
    }

    function getSlot(slot){
      slot = slot || null;
      switch (slot) {
        case "7H_9H":
        return "7h";
        break;
        case "9H_12H":
        return "9h";
        break;
        case "12H_14H":
        return "12h";
        break;
        case "14H_16H":
        return "14h";
        break;
        case "16H_18H":
        return "16h";
        break;
        case "18H_20H":
        return "18h";
        break;
        case "AFTER_20H":
        return "20h";
        break;
        default:
        return "";
      }
    }

    function all(j){
      if (j.all == true){
        j.all = true;
        j.c1 = true;
        j.c2 = true;
        j.c3 = true;
        j.c4 = true;
        j.c5 = true;
        j.c6 = true;
        j.c7 = true;
      }
      else {
        j.all = false;
        j.c1 = false;
        j.c2 = false;
        j.c3 = false;
        j.c4 = false;
        j.c5 = false;
        j.c6 = false;
        j.c7 = false;
      }
    }

    function disabledDay(j){
      j.allDisabled = "checkbox-disabled";
      j.c1Disabled = "checkbox-disabled";
      j.c2Disabled = "checkbox-disabled";
      j.c3Disabled = "checkbox-disabled";
      j.c4Disabled = "checkbox-disabled";
      j.c5Disabled = "checkbox-disabled";
      j.c6Disabled = "checkbox-disabled";
      j.c7Disabled = "checkbox-disabled";
    }

    function enabledDay(j){
      j.allDisabled = "";
      j.c1Disabled = "";
      j.c2Disabled = "";
      j.c3Disabled = "";
      j.c4Disabled = "";
      j.c5Disabled = "";
      j.c6Disabled = "";
      j.c7Disabled = "";
    }

    function initDate(j, tab){
      var tmp = "";
      if (j.all && j.allDisabled != "checkbox-disabled"){
        tmp = "ALL_DAY";
        tab.push({date: $filter('date')(j.date, "yyyy-MM-dd"), slot: tmp});
      }
      else {
        for (var i = 0; i < 7; i++) {
          if (j["c"+(i+1)] && j["c"+(i+1)+"Disabled"] != "checkbox-disabled"){
            if (i == 0)
            tmp = "7H_9H";
            else if (i == 1) {
              tmp = "9H_12H";
            }
            else if (i == 2) {
              tmp = "12H_14H";
            }
            else if (i == 3) {
              tmp = "14H_16H";
            }
            else if (i == 4) {
              tmp = "16H_18H";
            }
            else if (i == 5) {
              tmp = "18H_20H"
            }
            else if (i == 6) {
              tmp = "AFTER_20H";
            }
            tab.push({date: $filter('date')(j.date, "yyyy-MM-dd"), slot: tmp});
          }
        }
      }
    }

    function initHours(){
      if (vm.time >= 9) {
        if(j.date == $filter('date')(vm.J1.date, "yyyy-MM-dd")){
          vm.J1.c1Disabled = "checkbox-disabled";
          vm.J1.allDisabled = "checkbox-disabled";
        }
        else if(j.date == $filter('date')(vm.J2.date, "yyyy-MM-dd")){
          vm.J2.c1Disabled = "checkbox-disabled";
          vm.J2.allDisabled = "checkbox-disabled";
        }
        else if(j.date == $filter('date')(vm.J3.date, "yyyy-MM-dd")){
          vm.J3.c1Disabled = "checkbox-disabled";
          vm.J3.allDisabled = "checkbox-disabled";
        }
      }
      if (vm.time >= 12) {
        if(j.date == $filter('date')(vm.J1.date, "yyyy-MM-dd")){
          vm.J1.c2Disabled = "checkbox-disabled";
          vm.J1.allDisabled = "checkbox-disabled";
        }
        else if(j.date == $filter('date')(vm.J2.date, "yyyy-MM-dd")){
          vm.J2.c2Disabled = "checkbox-disabled";
          vm.J2.allDisabled = "checkbox-disabled";
        }
        else if(j.date == $filter('date')(vm.J3.date, "yyyy-MM-dd")){
          vm.J3.c2Disabled = "checkbox-disabled";
          vm.J3.allDisabled = "checkbox-disabled";
        }
      }
      if (vm.time >= 14) {
        if(j.date == $filter('date')(vm.J1.date, "yyyy-MM-dd")){
          vm.J1.c3Disabled = "checkbox-disabled";
          vm.J1.allDisabled = "checkbox-disabled";
        }
        else if(j.date == $filter('date')(vm.J2.date, "yyyy-MM-dd")){
          vm.J2.c3Disabled = "checkbox-disabled";
          vm.J2.allDisabled = "checkbox-disabled";
        }
        else if(j.date == $filter('date')(vm.J3.date, "yyyy-MM-dd")){
          vm.J3.c3Disabled = "checkbox-disabled";
          vm.J3.allDisabled = "checkbox-disabled";
        }
      }
      if (vm.time >= 16) {
        if(j.date == $filter('date')(vm.J1.date, "yyyy-MM-dd")){
          vm.J1.c4Disabled = "checkbox-disabled";
          vm.J1.allDisabled = "checkbox-disabled";
        }
        else if(j.date == $filter('date')(vm.J2.date, "yyyy-MM-dd")){
          vm.J2.c4Disabled = "checkbox-disabled";
          vm.J2.allDisabled = "checkbox-disabled";
        }
        else if(j.date == $filter('date')(vm.J3.date, "yyyy-MM-dd")){
          vm.J3.c4Disabled = "checkbox-disabled";
          vm.J3.allDisabled = "checkbox-disabled";
        }
      }
      if (vm.time >= 18) {
        if(j.date == $filter('date')(vm.J1.date, "yyyy-MM-dd")){
          vm.J1.c5Disabled = "checkbox-disabled";
          vm.J1.allDisabled = "checkbox-disabled";
        }
        else if(j.date == $filter('date')(vm.J2.date, "yyyy-MM-dd")){
          vm.J2.c5Disabled = "checkbox-disabled";
          vm.J2.allDisabled = "checkbox-disabled";
        }
        else if(j.date == $filter('date')(vm.J3.date, "yyyy-MM-dd")){
          vm.J3.c5Disabled = "checkbox-disabled";
          vm.J3.allDisabled = "checkbox-disabled";
        }
      }
      if (vm.time >= 20) {
        if(j.date == $filter('date')(vm.J1.date, "yyyy-MM-dd")){
          vm.J1.c6Disabled = "checkbox-disabled";
          vm.J1.allDisabled = "checkbox-disabled";
        }
        else if(j.date == $filter('date')(vm.J2.date, "yyyy-MM-dd")){
          vm.J2.c6Disabled = "checkbox-disabled";
          vm.J2.allDisabled = "checkbox-disabled";
        }
        else if(j.date == $filter('date')(vm.J3.date, "yyyy-MM-dd")){
          vm.J3.c6Disabled = "checkbox-disabled";
          vm.J3.allDisabled = "checkbox-disabled";
        }
      }
    }

    function selectPrice(type){
      vm.offer.price = {type: type, price: vm.price};
      vm.myPriceFlag = false;
    }

    function myPrice(){
      vm.myPriceFlag = true;
    }

    function myDate(){
      vm.myDateFlag = true;
    }

    function selectImagePreview(media){
      vm.imgTmpPreview = media;
      vm.imagePreviewFlag = true;
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

    function succesProjectGET(res){
      vm.project = res.project;
      vm.proposal = res;
      console.log(res);
      vm.projectTmp = angular.copy(vm.project);
      if (vm.projectTmp.type != "EMERGENCY"){
        vm.dateType = vm.projectTmp.desiredDatePeriod;
        vm.dt = new Date(vm.projectTmp.desiredDate);
      }
      if (vm.projectTmp.type == "EMERGENCY" && vm.projectTmp.availabilities){
        vm.disabledDay(vm.J1);
        vm.disabledDay(vm.J2);
        vm.disabledDay(vm.J3);
        for (var i = 0; i < vm.projectTmp.availabilities.length; i++) {
          switch (vm.projectTmp.availabilities[i].slot) {
            case "7H_9H":
            if(vm.projectTmp.availabilities[i].date == $filter('date')(vm.J1.date, "yyyy-MM-dd")){
              vm.J1.c1Disabled = true;
            }
            else if(vm.projectTmp.availabilities[i].date == $filter('date')(vm.J2.date, "yyyy-MM-dd")){
              vm.J2.c1Disabled ='';
            }
            else if(vm.projectTmp.availabilities[i].date == $filter('date')(vm.J3.date, "yyyy-MM-dd")){
              vm.J3.c1Disabled ='';
            }
            break;
            case "9H_12H":
            if(vm.projectTmp.availabilities[i].date == $filter('date')(vm.J1.date, "yyyy-MM-dd")){
              vm.J1.c2Disabled ='';
            }
            else if(vm.projectTmp.availabilities[i].date == $filter('date')(vm.J2.date, "yyyy-MM-dd")){
              vm.J2.c2Disabled ='';
            }
            else if(vm.projectTmp.availabilities[i].date == $filter('date')(vm.J3.date, "yyyy-MM-dd")){
              vm.J3.c2Disabled ='';
            }
            break;
            case "12H_14H":
            if(vm.projectTmp.availabilities[i].date == $filter('date')(vm.J1.date, "yyyy-MM-dd")){
              vm.J1.c3Disabled ='';
            }
            else if(vm.projectTmp.availabilities[i].date == $filter('date')(vm.J2.date, "yyyy-MM-dd")){
              vm.J2.c3Disabled ='';
            }
            else if(vm.projectTmp.availabilities[i].date == $filter('date')(vm.J3.date, "yyyy-MM-dd")){
              vm.J3.c3Disabled ='';
            }
            break;
            case "14H_16H":
            if(vm.projectTmp.availabilities[i].date == $filter('date')(vm.J1.date, "yyyy-MM-dd")){
              vm.J1.c4Disabled ='';
            }
            else if(vm.projectTmp.availabilities[i].date == $filter('date')(vm.J2.date, "yyyy-MM-dd")){
              vm.J2.c4Disabled ='';
            }
            else if(vm.projectTmp.availabilities[i].date == $filter('date')(vm.J3.date, "yyyy-MM-dd")){
              vm.J3.c4Disabled ='';
            }
            break;
            case "16H_18H":
            if(vm.projectTmp.availabilities[i].date == $filter('date')(vm.J1.date, "yyyy-MM-dd")){
              vm.J1.c5Disabled ='';
            }
            else if(vm.projectTmp.availabilities[i].date == $filter('date')(vm.J2.date, "yyyy-MM-dd")){
              vm.J2.c5Disabled ='';
            }
            else if(vm.projectTmp.availabilities[i].date == $filter('date')(vm.J3.date, "yyyy-MM-dd")){
              vm.J3.c5Disabled ='';
            }
            break;
            case "18H_20H":
            if(vm.projectTmp.availabilities[i].date == $filter('date')(vm.J1.date, "yyyy-MM-dd")){
              vm.J1.c6Disabled ='';
            }
            else if(vm.projectTmp.availabilities[i].date == $filter('date')(vm.J2.date, "yyyy-MM-dd")){
              vm.J2.c6Disabled ='';
            }
            else if(vm.projectTmp.availabilities[i].date == $filter('date')(vm.J3.date, "yyyy-MM-dd")){
              vm.J3.c6Disabled ='';
            }
            break;
            case "AFTER_20H":
            if(vm.projectTmp.availabilities[i].date == $filter('date')(vm.J1.date, "yyyy-MM-dd")){
              vm.J1.c7Disabled ='';
            }
            else if(vm.projectTmp.availabilities[i].date == $filter('date')(vm.J2.date, "yyyy-MM-dd")){
              vm.J2.c7Disabled ='';
            }
            else if(vm.projectTmp.availabilities[i].date == $filter('date')(vm.J3.date, "yyyy-MM-dd")){
              vm.J3.c7Disabled ='';
            }
            break;
            case "ALL_DAY":
            if(vm.projectTmp.availabilities[i].date == $filter('date')(vm.J1.date, "yyyy-MM-dd")){
              vm.J1.allDisabled =''
            }
            else if(vm.projectTmp.availabilities[i].date == $filter('date')(vm.J2.date, "yyyy-MM-dd")){
              vm.J2.allDisabled =''
            }
            else if(vm.projectTmp.availabilities[i].date == $filter('date')(vm.J3.date, "yyyy-MM-dd")){
              vm.J3.allDisabled =''
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
      else if (!angular.isUndefined(vm.projectTmp) && vm.projectTmp.desiredDatePeriod){
        switch (vm.projectTmp.desiredDatePeriod) {
          case "SPECIFIC":
          return "Le "+vm.projectTmp.desiredDate;
          case "WITHIN_A_WEEK":
          var d = new Date();
          d.setDate(d.getDate() + 7);
          return "until "+$filter('date')(d, "yyyy-MM-dd");
          case "WITHIN_A_MONTH":
          var d = new Date();
          d.setDate(d.getDate() + 30);
          return "Until "+$filter('date')(d, "yyyy-MM-dd");
          case "NONE":
          return "Flexible sur la date de départ";
        }
      }
      else {
        return "";
      }
    }

    function errorProjectGET(){
      $state.go("prodashboard");
    }
  }
})();
