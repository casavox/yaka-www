(function() {
  'use strict';

  angular
  .module('Yaka')
  .controller('ProfileController', ProfileController);

  //
  //Controller login
  ProfileController.$inject = ['$scope', 'networkService', '$localStorage', '$state', 'alertMsg', 'Upload', 'cloudinary']
  function ProfileController($scope, networkService, $localStorage, $state, alertMsg, $upload, cloudinary) {

    var vm = this;

    vm.profileInfo = {};
    vm.workArea = {};
    vm.aboutMe = "";
    vm.portfolio = {};
    vm.verifications = {};
    vm.activities = {};
    vm.now = new Date();
    vm.Year = vm.now.getFullYear()
    vm.error= {password:{flag: false, message:""}, activities:{flag: false, message:""}, verif: {flag: false, message:""}, profile: {flag: false, message:""}};

    vm.years = yearsContent();
    vm.updateProfile = updateProfile;
    vm.updateAboutMe = updateAboutMe;
    vm.updateWorkArea = updateWorkArea;
    vm.updateVerifications = updateVerifications;
    vm.updateActivities = updateActivities;
    vm.updatePortfolio = updatePortfolio;
    vm.cancelProfile = cancelProfile;
    vm.cancelAboutMe = cancelAboutMe;
    vm.cancelWorkArea = cancelWorkArea;
    vm.cancelVerifications = cancelVerifications;
    vm.cancelActivities = cancelActivities;
    vm.cancelPortfolio = cancelPortfolio;
    vm.uploadPortfolio = uploadPortfolio;
    vm.indexOfObject = indexOfObject;
    vm.actionActivities = actionActivities;
    vm.changePassword = changePassword;
    vm.uploadVerifications = uploadVerifications;
    vm.uploadProfile = uploadProfile;
    vm.setVerif = setVerif;
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

    networkService.professionalGET(succesProfileGET, errorProfileGET);
    networkService.skillsGET(succeSkillsGET, errorSkillsGET);

    function changePassword(){
      vm.pwd1 = vm.pwd1 || "";
      vm.pwd2 = vm.pwd2 || "";
      if (vm.pwd1.length < 6){
        vm.error.password.message = "Password min length 6.";
        vm.error.password.flag = true;
      }
      else {
        vm.error.password.flag = false;
        var formData = {
          currentPassword: vm.pwdCurrent,
          newPassword: vm.pwd1
        }
        if (vm.pwd2 === vm.pwd1)
        networkService.changePassword(formData, function(res){
          alertMsg.send("Password updated.", "success");
        }, function(res){
          alertMsg.send("Error password not changed", "danger");
        });
        else {
          vm.error.password.message = "Password not confirmed.";
          vm.error.password.flag = true;        }
        }


      }

      function actionActivities(s){
        var res = null;
        if ((res = indexOfObject(s, 'code', vm.activities)).length == 0)
        vm.activities.push({code: s});
        else {
          for (var i = 0; i < res.length; i++) {
            vm.activities.splice(res[i], 1);
          }
        }
      }

      function indexOfObject(a, token, tab){
        var res = [];

        if (angular.isDefined(tab)){
          for (var i = 0; i < tab.length; i++) {
            if (tab[i][token] == a)
            res.push(i);
          }
        }
        return res;
      }

      function succeSkillsGET(res){
        vm.cat = res;
        console.log(res);
      }

      function errorSkillsGET(res){
        console.log(res);
      }

      function uploadPortfolio(files, invalides, index){
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
                tags: 'myPortfolio',
                context: 'photo=' + $scope.title,
                file: file
              }
            }).progress(function (e) {
              file.progress = Math.round((e.loaded * 100.0) / e.total);
              file.status = "Uploading... " + file.progress + "%";
            }).success(function (data, status, headers, config) {
              vm.portfolio = vm.portfolio || [];
              data.context = {custom: {photo: $scope.title}};
              file.result = data;
              vm.portfolio.push({cloudinaryPublicId: data.public_id});
            }).error(function (data, status, headers, config) {
              alertMsg.send("Error : Upload failed.", "danger");
            });
          }
        });
      };

      function setVerif(name){
        vm.verifTmp = {name: name};
      }

      function uploadVerifications(files, invalides, index){
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
                tags: 'verificaions',
                context: 'file=' + $scope.title,
                file: file
              }
            }).progress(function (e) {
              file.progress = Math.round((e.loaded * 100.0) / e.total);
              file.status = "Uploading... " + file.progress + "%";
            }).success(function (data, status, headers, config) {
              vm.verifications = vm.verifications || [];
              data.context = {custom: {photo: $scope.title}};
              file.result = data;
              var res = null;
              if ((res = indexOfObject(vm.verifTmp, 'name', vm.verifications)).length > 0)
              for (var i = 0; i < res.length; i++) {
                vm.verifications.slice(res[i], 1);
              }
              vm.verifications.push({name: vm.verifTmp.name, cloudinaryPublicId: data.public_id});
            }).error(function (data, status, headers, config) {
              alertMsg.send("Error : Upload failed.", "danger");
            });
          }
        });
      };

      function uploadProfile(files, invalides, index){
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
                tags: 'verificaions',
                context: 'file=' + $scope.title,
                file: file
              }
            }).progress(function (e) {
              file.progress = Math.round((e.loaded * 100.0) / e.total);
              file.status = "Uploading... " + file.progress + "%";
            }).success(function (data, status, headers, config) {
              vm.profileInfo.avatar = vm.profileInfo.avatar || {};
              data.context = {custom: {photo: $scope.title}};
              file.result = data;
              var res = null;
              vm.profileInfo.avatar.cloudinaryPublicId = data.public_id;
            }).error(function (data, status, headers, config) {
              alertMsg.send("Error : Upload failed.", "danger");
            });
          }
        });
      };

      function yearsContent(){
        var res = [];
        console.log(vm.Year);
        console.log(parseInt(vm.Year) - 1949);
        for (var i = 0; i < (parseInt(vm.Year) - 1949); i++) {
          res.push(1950 + i);
        }
        return res;
      }

      function updateProfile(){
        var f = false;
        angular.forEach(vm.profileInfo, function(value, key){
          if (angular.isUndefined(value) || !value)
          f = true;
        })
        angular.forEach(vm.profileInfo.company, function(value, key){
          if (angular.isUndefined(value) || !value)
          f = true;
        })
        if (!f){
          vm.error.profile.flag = false;
          networkService.proProfilePUT(vm.profileInfo, function(res){
            vm.profileInfo = res;
            alertMsg.send("Profile updated.", "success");
          }, errorProfilePUT);
        }
        else{
          vm.error.profile.message = "All is mandatory.";
          vm.error.profile.flag = true;
        }

      }
      function updatePortfolio(){
        networkService.proPortfolioPUT(vm.portfolio, function(res){
          vm.portfolio = res;
          alertMsg.send("Portfolio updated.", "success");
        }, errorProfilePUT);
      }
      function updateWorkArea(){
        networkService.proWorkAreaPUT(vm.workArea, succesProfilePUT, errorProfilePUT);
      }
      function updateAboutMe(){
        networkService.proAboutMePUT(vm.about, function(res){
          vm.about = angular.copy(res);
          alertMsg.send("Description updated.", "success");
        }, errorProfilePUT);
      }
      function updateVerifications(){
        vm.verifications = vm.verifications || [];
        if (vm.verifications.length < 4){
          vm.error.verif.message = "All is mandatory."
          vm.error.verif.flag = true;
        }
        else {
          vm.error.verif.flag = false;
          networkService.proVerificationsPUT(vm.verifications, function(res){
            vm.verifications = res;
            alertMsg.send("Verifications updated.", "success");
          }, errorProfilePUT);
        }
      }
      function updateActivities(){
        if (vm.activities.length > 0){
          vm.error.activities.flag = false;
          networkService.proActivitiesPUT(vm.activities, function(res){
            vm.activities = res;
            alertMsg.send("Activities updated.", "success");
          }, errorProfilePUT);
        }
        else
        {
          vm.error.activities.message = "Select at least one category or skill."
          vm.error.activities.flag = true;
        }
      }

      function cancelProfile(){
        vm.error.profile.flag = false;
        vm.profileInfo = {firstName: angular.copy(vm.profile.firstName), lastName: angular.copy(vm.profile.lastName), phoneNumber: angular.copy(vm.profile.phoneNumber), user: angular.copy(vm.profile.user), activityStartedYear: angular.copy(vm.profile.activityStartedYear), company: angular.copy(vm.profile.company), avatar: angular.copy(vm.profile.avatar)};
      }
      function cancelPortfolio(){
        vm.portfolio = angular.copy(vm.profile.portfolio);
      }
      function cancelWorkArea(){
        vm.workArea = angular.copy(vm.profile.workArea);
      }
      function cancelAboutMe(){
        vm.about = {aboutMe: angular.copy(vm.profile.aboutMe)};
      }
      function cancelVerifications(){
        vm.error.verif.flag = false;
        vm.verifications = angular.copy(vm.profile.verifications);
      }
      function cancelActivities(){
        vm.error.activities.flag = false;
        vm.activities = angular.copy(vm.profile.activities);
      }

      function succesProfilePUT(res){
        succesProfileGET(res);
        alertMsg.send("Profile updated.", "success");
      }

      function errorProfilePUT(){
        alertMsg.send("Profile not updated.", "danger");
      }

      function succesProfileGET(res){
        vm.profile = res;
        vm.profileInfo = {firstName: angular.copy(vm.profile.firstName), lastName: angular.copy(vm.profile.lastName), phoneNumber: angular.copy(vm.profile.phoneNumber), user: angular.copy(vm.profile.user), activityStartedYear: angular.copy(vm.profile.activityStartedYear), company: angular.copy(vm.profile.company), avatar: angular.copy(vm.profile.avatar)};
        vm.workArea = angular.copy(vm.profile.workArea);
        vm.about = {aboutMe: angular.copy(vm.profile.aboutMe)};
        vm.portfolio = angular.copy(vm.profile.portfolio);
        vm.verifications = angular.copy(vm.profile.verifications);
        vm.activities = angular.copy(vm.profile.activities);
        console.log(res);
      }

      function errorProfileGET(res){
        alertMsg.send("Error to get the profile informations.", "danger");
      }
    }
  })();
