(function() {
  'use strict';

  angular
  .module('Yaka')
  .controller('NewProjectController', NewProjectController);

  //
  //Controller login
  NewProjectController.$inject = ['$scope', 'networkService', 'socialNetworkService', '$rootScope', '$location', '$anchorScroll', '$timeout', '$localStorage']
  function NewProjectController($scope, networkService, socialNetworkService, $rootScope, $location, $anchorScroll, $timeout, $localStorage) {
    var vm = this;
    vm.user = $localStorage.user;
    console.log(vm.user);
    vm.newProject = {};
    vm.emergency = false;
    vm.selectType = selectType;
    vm.selectService = selectService;
    vm.selectSubService = selectSubService;
    vm.projectDescription = "";
    vm.material = false;
    vm.continueProject = continueProject;
    vm.continueProjectImg = continueProjectImg;
    vm.continue = false;
    vm.continueAddr = continueAddr;
    vm.setAddressGoogle = setAddressGoogle;
      vm.continueAdress = false;

    vm.continueImg = false;
    vm.img = [];
    vm.popUpImg = false;
    vm.verif = verif;
    vm.setAddress = setAddress;
    $scope.options = {
      types: ['(cities)'],
      componentRestrictions: { country: 'FR' }
    };

    $scope.address = {
      name: '',
      place: '',
      components: {
        placeId: '',
        streetNumber: '',
        street: '',
        city: '',
        state: '',
        countryCode: '',
        country: '',
        postCode: '',
        district: '',
        location: {
          lat: '',
          long: ''
        }
      }
    };

    networkService.stepsGET("SMALL_PROJECT", succesProjectsGET, errorProjectsGET);
    networkService.profileGET(succesProfileGET, errorProfileGET);

    function setAddressGoogle(){
      vm.continueAddress = false;
    }

    function continueAddr(){
      if ($scope.address.components.placeId){
        vm.continueAdress = true;
        $timeout(function(){
          $location.hash('slide7');
          $anchorScroll();
        },0);
      }
      else if (vm.myAddress == $scope.address.name) {
        vm.continueAddress = true;
        $timeout(function(){
          $location.hash('slide7');
          $anchorScroll();
        },0);
      }
    }

    function setAddress(){
      $scope.address.name = vm.myAddress;
    }

    function verif(){
      if (vm.projectDescription.length == 0){
        vm.continue = false;
        vm.continueImg = false;
        vm.img = [];
        vm.continueAddress = false;
      }
    }

    function continueProject(){
      if (vm.material == null || vm.projectDescription == "")
      return "";
      else {
        vm.continue = true;
        $timeout(function(){
          $location.hash('slide5');
          $anchorScroll();
        },0);
      }

    }

    function continueProjectImg(){
      vm.continueImg = true;
      $timeout(function(){
        $location.hash('slide6');
        $anchorScroll();
      },0);
    }

    function selectType(item, items){
      vm.type = item;
      vm.service = null;
      vm.subService = null;
      for (var i = 0; i < items.length; i++) {
        items[i].selected = ""
      }
      item.selected = "activate";
      $timeout(function(){
        $location.hash('slide2');
        $anchorScroll();
      },0);
    }
    function selectService(item, items){
      vm.service = item;
      vm.subService = null;
      for (var i = 0; i < items.length; i++) {
        items[i].selected = ""
      }
      item.selected = "activate";
      $timeout(function(){
        $location.hash('slide3');
        $anchorScroll();
      },0);
    }
    function selectSubService(item, items){
      vm.subService = item;
      for (var i = 0; i < items.length; i++) {
        items[i].selected = ""
      }
      item.selected = "activate";
      $timeout(function(){
        $location.hash('slide4');
        $anchorScroll();
      },0);
    }
    function succesProjectsGET(res){
      vm.newProject = res;
      console.log(res);
    }

    function errorProjectsGET(){

    }

    function succesProfileGET(res){
      vm.user = res;
      if (res.addresses.length > 0)
      vm.myAddress = res.addresses[0].address;
      $scope.address.name = vm.myAddress;
      console.log(res);
    }

    function errorProfileGET(){

    }
  }
})();
