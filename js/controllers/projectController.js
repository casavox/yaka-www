(function() {
  'use strict';

  angular
  .module('Yaka')
  .controller('ProjectController', ProjectController);

  //
  //Controller login
  ProjectController.$inject = ['$scope', '$state', '$timeout', '$localStorage', 'networkService', 'alertMsg', 'uiGmapGoogleMapApi', 'Upload', 'cloudinary', '$filter']
  function ProjectController($scope, $state, $timeout, $localStorage, networkService, alertMsg, uiGmapGoogleMapApi, $upload, cloudinary, $filter) {
    var vm = this;
    vm.pro = true;
    vm.editFlag = false;
    vm.editDescriptionFlag = false;
    vm.child0 = "";
    vm.child1 = "";
    vm.child2 = "";
    vm.child3 = "";
    vm.dateSelected = false;
    vm.project = {};
    vm.projectTmp = {};
    vm.prev = prev;
    vm.getWhen = getWhen;
    vm.getTags = getTags;
    vm.selectDateType = selectDateType;
    vm.selectDate = selectDate;
    vm.unSelectdate = unSelectdate;
    vm.dateType = "";
    vm.dateFlag = false;
    vm.editDescription = editDescription
    vm.edit = edit;
    vm.put = put;
    vm.whenFlag = false;
    vm.editWhen = editWhen;
    vm.uploadFiles = uploadFiles;
    $scope.map = {center: {latitude: 51.219053, longitude: 4.404418 }, zoom: 14 };
    $scope.options = {scrollwheel: true};
    vm.dt = new Date();
    vm.default = angular.copy(vm.dt);
    vm.minDate = new Date()
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
    vm.error = {description: {flag: false, message: ""}, address: {flag: false, message: ""}, date: {flag: false, message: ""}, material: {flag: false, message: ""}};
    if (!angular.isUndefined($localStorage.projectGet) && $localStorage.projectGet)
    {
      networkService.projectGET($localStorage.projectGet.id, succesProjectGET, errorProjectGET);
    }

    function selectDateType(type){
      vm.dateSelected = false;
      vm.dateFlag = false;
      vm.dateType = type;
    }

    function selectDate(){
      vm.dateFlag = true;
    }

    function unSelectdate(){
      vm.dateSelected = false;
      vm.dateFlag = true;
    }

    $scope.$watch("vm.dt", function(newVal, oldVal){
      if(newVal !== oldVal){
        vm.dateSelected = true;
        vm.dateFlag = false;
        vm.error.date.flag = false;
        vm.error.date.message = "At least a slot is required";
      }
    })

    function put(){

      if (vm.projectTmp.type == "EMERGENCY"){
        if (!vm.dateType){
          vm.error.date.flag = true;
          vm.error.date.message = "At least a slot is required";
          return
        }
        else if (vm.dateType == 'SPECIFIC'){
          if (vm.dt.getTime() == vm.default.getTime()){
            vm.error.date.flag = true;
            vm.error.date.message = "At least a slot is required";
            return;
          }
          else {
            vm.error.date.flag = false;
            vm.error.date.message = "At least a slot is required";
          }
        }
        else {
          vm.error.date.flag = false;
          vm.error.date.message = "At least a slot is required";
        }
        var formData = {
          title: vm.title,
          description: vm.projectDescription,
          desiredDatePeriod: vm.dateType,
          address: {},
          tags: [],
        }
        for (var i = 0; i < vm.questions.length; i++) {
          formData.tags.push({name: vm.questions[i].shortName});
        }
        if (vm.dateType == "SPECIFIC"){
          formData.desiredDate = $filter('date')(vm.dt, "yyyy-mm-dd");
        }
        if (vm.continueAddress){
          for (var i = 0; i < vm.user.addresses.length; i++) {
            if (vm.user.addresses[i].address == vm.myAddress){
              formData.address.name  = vm.user.addresses[i].name;
              formData.address.address = vm.myAddress;
              break;
            }
          }
        }
        else {
          formData.address.name  = vm.newAddr.name;
          formData.address.address = vm.newAddr.address;
        }
        for (var i = 0; i < $rootScope.photos.length; i++) {
          if ($rootScope.photos[i].public_id){
            var tmp = {cloudinaryPublicId: $rootScope.photos[i].public_id};
            if ($rootScope.photos[i].commentFlag && $rootScope.photos[i].comment) {
              tmp.comment = $rootScope.photos[i].comment;
            }
            formData.images = formData.images || [];
            formData.images.push(tmp);
          }
        }
        formData.type = "small";
        if (angular.isUndefined($localStorage.token) == false && $localStorage.token)
        networkService.projectSMALLPOST(formData, succesProjectsPOST, errorProjectsPOST);
        else {
          $rootScope.newProject = formData;
          $state.go("login");
        }
      }
      else {
        var formData = {
          title: vm.title,
          description: vm.projectDescription,
          address: {},
          tags: [],
          availabilities: []
        }
        for (var i = 0; i < vm.questions.length; i++) {
          formData.tags.push({name: vm.questions[i].shortName});
        }
        if (vm.continueAddress){
          for (var i = 0; i < vm.user.addresses.length; i++) {
            if (vm.user.addresses[i].address == vm.myAddress){
              if (angular.isUndefined(formData.images))
              formData.images = [];
              formData.address.name  = vm.user.addresses[i].name;
              formData.address.address = vm.myAddress;
              break;
            }
          }
        }
        else {
          formData.address.name  = vm.newAddr.name;
          formData.address.address = vm.newAddr.address;
        }
        for (var i = 0; i < $rootScope.photos.length; i++) {
          if ($rootScope.photos[i].public_id){
            if (angular.isUndefined(formData.images))
            formData.images = [];
            var tmp = {cloudinaryPublicId: $rootScope.photos[i].public_id};
            if ($rootScope.photos[i].comment) {
              tmp.comment = $rootScope.photos[i].comment;
            }
            formData.images.push(tmp);
          }
        }
        vm.initDate(vm.J1, formData.availabilities);
        vm.initDate(vm.J2, formData.availabilities);
        vm.initDate(vm.J3, formData.availabilities);
        if (formData.availabilities.length == 0){
          vm.error.date.flag = true;
          vm.error.date.message = "At least a slot is required";
          return;
        }
        formData.type = "emergency";
        if (angular.isUndefined($localStorage.token) == false && $localStorage.token)
        networkService.projectEMERGENCYPOST(formData, succesProjectsPOST, errorProjectsPOST);
        else {
          $rootScope.newProject = formData;
          $state.go("login");
        }
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
        vm.J1.c1Disabled = "checkbox-disabled";
        vm.J1.allDisabled = "checkbox-disabled";
      }
      if (vm.time >= 12) {
        vm.J1.c2Disabled = "checkbox-disabled";
        vm.J1.allDisabled = "checkbox-disabled";
      }
      if (vm.time >= 14) {
        vm.J1.c3Disabled = "checkbox-disabled";
        vm.J1.allDisabled = "checkbox-disabled";
      }
      if (vm.time >= 16) {
        vm.J1.c4Disabled = "checkbox-disabled";
        vm.J1.allDisabled = "checkbox-disabled";
      }
      if (vm.time >= 18) {
        vm.J1.c5Disabled = "checkbox-disabled";
        vm.J1.allDisabled = "checkbox-disabled";
      }
      if (vm.time >= 20) {
        vm.J1.c6Disabled = "checkbox-disabled";
        vm.J1.allDisabled = "checkbox-disabled";
      }
    }

    function editWhen(){
      vm.whenFlag = true;
    }

     function uploadFiles(files, invalides, index){
      if (invalides.length > 0){
        if (invalides[0].$error == "maxSize")
        alertMsg.send("Error : max size 5MB.", "danger");
      }
      $scope.files = files;
      if (!$scope.files) return;
      angular.forEach(files, function(file){
        if (file && !file.$error) {
          file.upload = $upload.upload({
            url: "https://api.cloudinary.com/v1_1/" + cloudinary.config().cloud_name + "/upload",
            data: {
              upload_preset: cloudinary.config().upload_preset,
              tags: 'myphotoalbum',
              context: 'photo=' + $scope.title,
              file: file
            }
          }).progress(function (e) {
            file.progress = Math.round((e.loaded * 100.0) / e.total);
            file.status = "Uploading... " + file.progress + "%";
          }).success(function (data, status, headers, config) {
            vm.project.images = vm.project.images || [];
            data.context = {custom: {photo: $scope.title}};
            file.result = data;
            vm.projectTmp.images.push({cloudinaryPublicId: data.public_id});
          }).error(function (data, status, headers, config) {
            alertMsg.send("Error : Upload failed.", "danger");
          });
        }
      });
    };

    function editDescription(){
      vm.editDescriptionFlag = true;
    }

    function edit(){
      vm.editFlag = true;
    }

    function getTags(){
      var res = "";
      if (vm.projectTmp.tags && vm.projectTmp.tags.length > 0){
        for (var i = 0; i < vm.projectTmp.tags.length; i++) {
          if (i <  vm.projectTmp.tags.length - 1)
          res += vm.projectTmp.tags[i].name + " - ";
          else {
            res += vm.projectTmp.tags[i].name
          }
        }
        return res;
      }
      else {

      }
    }

    function getWhen(){
      var res = 0;
      if (!angular.isUndefined(vm.projectTmp.availabilities) && vm.projectTmp.availabilities && vm.projectTmp.availabilities.length > 0){
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

    function prev(){
      delete $localStorage.projectGet;
      $state.go("my-projects");
    }

    function succesProjectGET(res){
      vm.project = res;
      vm.projectTmp = vm.project;
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
          case "WITHIN_A_MONTH":
          vm.child2 = "activate";
          case "NONE":
          vm.child3 = "activate";
        }
      }
    }

    function errorProjectGET(res){
      alertMsg.send("Error : Impossible to get the mission", "danger");
      $state.go("my-projects");
    }
  }
})();
