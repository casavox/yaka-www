(function() {
  'use strict';

  angular
  .module('Yaka')
  .controller('ProjectController', ProjectController);

  //
  //Controller login
  ProjectController.$inject = ['$scope', '$state', '$timeout', '$localStorage', 'networkService', 'alertMsg', 'uiGmapGoogleMapApi', '$upload']
  function ProjectController($scope, $state, $timeout, $localStorage, networkService, alertMsg, uiGmapGoogleMapApi, $upload) {
    var vm = this;
    vm.pro = true;
    vm.editFlag = false;
    vm.project = {};
    vm.prev = prev;
    vm.getWhen = getWhen;
    vm.getTags = getTags;
    vm.edit = edit;
    vm.uploadFiles = uploadFiles;
    $scope.map = {center: {latitude: 51.219053, longitude: 4.404418 }, zoom: 14 };
    $scope.options = {scrollwheel: true};

    if (!angular.isUndefined($localStorage.projectGet) && $localStorage.projectGet)
    {
      networkService.projectGET($localStorage.projectGet.id, succesProjectGET, errorProjectGET);
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
            vm.project.images.push({cloudinaryPublicId: data.public_id});
          }).error(function (data, status, headers, config) {
            alertMsg.send("Error : Upload failed.", "danger");
          });
        }
      });
    };

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
