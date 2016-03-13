(function() {
  'use strict';

  angular
  .module('Yaka')
  .controller('ProfileController', ProfileController);

  //
  //Controller login
  ProfileController.$inject = ['$scope', 'networkService', '$localStorage', '$state', 'alertMsg']
  function ProfileController($scope, networkService, $localStorage, $state, alertMsg) {

    var vm = this;

    vm.profileInfo = {};
    vm.workArea = {};
    vm.aboutMe = "";
    vm.portfolio = {};
    vm.verifications = {};
    vm.activities = {};
    vm.now = new Date();
    vm.Year = vm.now.getFullYear()

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
      // var formData = angular.copy(vm.profileInfo);
      // formData.phoneNumber = parseInt(formData.phoneNumber);
      var f = false;
      angular.forEach(vm.profileInfo, function(value, key){
          if (angular.isUndefined(value) || !value)
          f = true;
      })
      if (!f)
      networkService.proProfilePUT(vm.profileInfo, succesProfilePUT, errorProfilePUT);
      else
      alertMsg.send("Veuillez remplir tous les champs.", "danger");
    }
    function updatePortfolio(){
      networkService.proPortfolioPUT(vm.portfolio, succesProfilePUT, errorProfilePUT);
    }
    function updateWorkArea(){
      networkService.proWorkAreaPUT(vm.workArea, succesProfilePUT, errorProfilePUT);
    }
    function updateAboutMe(){
      networkService.proAboutMePUT(vm.aboutMe, succesProfilePUT, errorProfilePUT);
    }
    function updateVerifications(){
      networkService.proVerificationsPUT(vm.verifications, succesProfilePUT, errorProfilePUT);
    }
    function updateActivities(){
      networkService.proActivitiesPUT(vm.activities, succesProfilePUT, errorProfilePUT);
    }

    function cancelProfile(){
      vm.profileInfo = {firstName: angular.copy(vm.profile.firstName), lastName: angular.copy(vm.profile.lastName), phoneNumber: angular.copy(vm.profile.phoneNumber), user: angular.copy(vm.profile.user), activityStartedYear: angular.copy(vm.profile.activityStartedYear), company: angular.copy(vm.profile.company)};
    }
    function cancelPortfolio(){
      vm.portfolio = angular.copy(vm.profile.portfolio);
    }
    function cancelWorkArea(){
      vm.workArea = angular.copy(vm.profile.workArea);
    }
    function cancelAboutMe(){
      vm.aboutMe = angular.copy(vm.profile.aboutMe);
    }
    function cancelVerifications(){
      vm.verifications = angular.copy(vm.profile.verifications);
    }
    function cancelActivities(){
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
      vm.profileInfo = {firstName: angular.copy(vm.profile.firstName), lastName: angular.copy(vm.profile.lastName), phoneNumber: angular.copy(vm.profile.phoneNumber), user: angular.copy(vm.profile.user), activityStartedYear: angular.copy(vm.profile.activityStartedYear), company: angular.copy(vm.profile.company)};
      vm.workArea = angular.copy(vm.profile.workArea);
      vm.aboutMe = angular.copy(vm.profile.aboutMe);
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
