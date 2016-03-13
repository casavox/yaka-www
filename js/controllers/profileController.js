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

    function succesProfileGET(res){
      vm.profile = res;
      $scope.map.center.latitude = vm.profile.workArea.latitude;
      $scope.map.center.longitude = vm.profile.workArea.longitude;
      console.log(res);
    }

    function errorProfileGET(res){
      alertMsg.send("Error to get the profile informations.", "danger");
    }
  }
})();
