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
    vm.project = {};
    vm.projectTmp = {};
    vm.prev = prev;
    vm.getWhen = getWhen;
    vm.getTags = getTags;
    vm.editDescription = editDescription
    vm.edit = edit;
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
    if (!angular.isUndefined($localStorage.projectGet) && $localStorage.projectGet)
    {
      networkService.projectGET($localStorage.projectGet.id, succesProjectGET, errorProjectGET);
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
        tab.push({date: $filter('date')(j.date, "yyyy-MM-dd"));
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
            tab.push({date: $filter('date')(j.date, "yyyy-MM-dd"));
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
      if (vm.projectTmp.availabilities && vm.projectTmp.availabilities.length > 0){
        for (var i = 0; i < vm.projectTMp.availabilities.length; i++) {
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
      vm.projectTmp = vm.project;
      if (vm.projectTmp.availabilities){
        for (var i = 0; i < vm.projectTmp.availabilities.length; i++) {
          switch (vm.projectTmp.availabilities[i]) {
            case "7H_9H":
            if(vm.projectTmp.desiredDate == $filter('date')(vm.J1.date, "yyyy-MM-dd")){
              vm.J1.c1 = true;
            }
            else if(vm.projectTmp.desiredDate == $filter('date')(vm.J2.date, "yyyy-MM-dd")){
              vm.J2.c1 = true;
            }
            else if(vm.projectTmp.desiredDate == $filter('date')(vm.J3.date, "yyyy-MM-dd")){
              vm.J3.c1 = true;
            }
              break;
            case "9H_12H":
            if(vm.projectTmp.desiredDate == $filter('date')(vm.J1.date, "yyyy-MM-dd")){
              vm.J1.c2 = true;
            }
            else if(vm.projectTmp.desiredDate == $filter('date')(vm.J2.date, "yyyy-MM-dd")){
              vm.J2.c2 = true;
            }
            else if(vm.projectTmp.desiredDate == $filter('date')(vm.J3.date, "yyyy-MM-dd")){
              vm.J3.c2 = true;
            }
              break;
            case "12H_14H":
            if(vm.projectTmp.desiredDate == $filter('date')(vm.J1.date, "yyyy-MM-dd")){
              vm.J1.c3 = true;
            }
            else if(vm.projectTmp.desiredDate == $filter('date')(vm.J2.date, "yyyy-MM-dd")){
              vm.J2.c3 = true;
            }
            else if(vm.projectTmp.desiredDate == $filter('date')(vm.J3.date, "yyyy-MM-dd")){
              vm.J3.c3 = true;
            }
              break;
            case "14H_16H":
            if(vm.projectTmp.desiredDate == $filter('date')(vm.J1.date, "yyyy-MM-dd")){
              vm.J1.c4 = true;
            }
            else if(vm.projectTmp.desiredDate == $filter('date')(vm.J2.date, "yyyy-MM-dd")){
              vm.J2.c4 = true;
            }
            else if(vm.projectTmp.desiredDate == $filter('date')(vm.J3.date, "yyyy-MM-dd")){
              vm.J3.c4 = true;
            }
              break;
            case "16H_18H":
            if(vm.projectTmp.desiredDate == $filter('date')(vm.J1.date, "yyyy-MM-dd")){
              vm.J1.c5 = true;
            }
            else if(vm.projectTmp.desiredDate == $filter('date')(vm.J2.date, "yyyy-MM-dd")){
              vm.J2.c5 = true;
            }
            else if(vm.projectTmp.desiredDate == $filter('date')(vm.J3.date, "yyyy-MM-dd")){
              vm.J3.c5 = true;
            }
              break;
            case "18H_20H":
            if(vm.projectTmp.desiredDate == $filter('date')(vm.J1.date, "yyyy-MM-dd")){
              vm.J1.c6 = true;
            }
            else if(vm.projectTmp.desiredDate == $filter('date')(vm.J2.date, "yyyy-MM-dd")){
              vm.J2.c6 = true;
            }
            else if(vm.projectTmp.desiredDate == $filter('date')(vm.J3.date, "yyyy-MM-dd")){
              vm.J3.c6 = true;
            }
              break;
            case "AFTER_20H":
            if(vm.projectTmp.desiredDate == $filter('date')(vm.J1.date, "yyyy-MM-dd")){
              vm.J1.c7 = true;
            }
            else if(vm.projectTmp.desiredDate == $filter('date')(vm.J2.date, "yyyy-MM-dd")){
              vm.J2.c7 = true;
            }
            else if(vm.projectTmp.desiredDate == $filter('date')(vm.J3.date, "yyyy-MM-dd")){
              vm.J3.c7 = true;
            }
              break;
            case "ALL_DAY":
            if(vm.projectTmp.desiredDate == $filter('date')(vm.J1.date, "yyyy-MM-dd")){
              vm.J1.all = true
              vm.all(vm.J1);
            }
            else if(vm.projectTmp.desiredDate == $filter('date')(vm.J2.date, "yyyy-MM-dd")){
              vm.J2.all = true
              vm.all(vm.J2);
            }
            else if(vm.projectTmp.desiredDate == $filter('date')(vm.J3.date, "yyyy-MM-dd")){
              vm.J3.all = true
              vm.all(vm.J3);
            }
              break;
          }

        }

      }
    }

    function errorProjectGET(res){
      alertMsg.send("Error : Impossible to get the mission", "danger");
      $state.go("my-projects");
    }
  }
})();
