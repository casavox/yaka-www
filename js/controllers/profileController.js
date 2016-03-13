(function() {
  'use strict';

  angular
  .module('Yaka')
  .controller('ProfileController', ProfileController);

  //
  //Controller login
  ProfileController.$inject = ['$scope', 'networkService', 'socialNetworkService', '$rootScope', '$localStorage', '$state']
  function ProfileController($scope, networkService, socialNetworkService, $rootScope, $localStorage, $state) {

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
  }
})();
