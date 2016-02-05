(function() {
  'use strict';

  angular
  .module('Yaka')
  .controller('NewProjectController', NewProjectController);

  //
  //Controller login
  NewProjectController.$inject = ['$scope', 'networkService', 'socialNetworkService', '$rootScope', '$location', '$anchorScroll', '$timeout', '$localStorage', '$filter']
  function NewProjectController($scope, networkService, socialNetworkService, $rootScope, $location, $anchorScroll, $timeout, $localStorage, $filter) {
    var vm = this;
    vm.user = $localStorage.user;
    console.log(vm.user);
    vm.newProject = {};
    vm.child0 = "";
    vm.child1 = "";
    vm.child2 = "";
    vm.child3 = "";
    vm.emergency = false;
    vm.dateFlag = false;
    vm.dt = new Date();
    vm.minDate = new Date()
    vm.minDate.setDate(vm.minDate.getDate() + 2);
    vm.selectType = selectType;
    // vm.selectService = selectService;
    vm.selectSubService = selectSubService;
    vm.projectDescription = "";
    vm.material = false;
    vm.continueProject = continueProject;
    vm.continueProjectImg = continueProjectImg;
    vm.continue = false;
    vm.questions = [];
    vm.continueAddr = continueAddr;
    vm.setAddressGoogle = setAddressGoogle;
    vm.continueAddressFlag = false;
    vm.service = false;
    vm.continueImg = false;
    vm.img = [];
    vm.dateType = "";
    vm.popUpImg = false;
    vm.newAddrFlag = false;
    vm.verif = verif;
    vm.setAddress = setAddress;
    vm.selectDate = selectDate;
    vm.unSelectdate = unSelectdate;
    vm.selectDateType = selectDateType;
    vm.verifNameAddr = verifNameAddr;
    vm.post = post;
    vm.newAddr = {};
    vm.error = {description: {flag: false, message: ""}, address: {flag: false, message: ""}, date: {flag: false, message: ""}};
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

    function post(){
      var formData = {
        title: vm.title,
        description: vm.projectDescription,
        desiredDatePeriod: vm.dateType,
        address: {},
        tags: []
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
      networkService.projectSMALLPOST(formData, succesProjectsPOST, errorProjectsPOST);
    }

    function succesProjectsPOST(res){
      console.log(res);
      $timeout(function(){
        $location.hash('slideFinal');
        $anchorScroll();
      },0);
    }

    function errorProjectsPOST(){

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
      }
    })

    function setAddressGoogle(){
      vm.continueAddress = false;
      vm.continueAddressFlag = false;
      if ($scope.address.name.length > 0){
        vm.newAddrFlag = true;
        vm.myAddress = "";
      }
      else {
        vm.newAddrFlag = false;
      }
    }

    function verifNameAddr(){
      vm.continueAddressFlag = false;
    }

    function continueAddr(){
      if (vm.continueAddress == false){
        if (vm.newAddr.name){
          if ($scope.address.components.placeId){
            vm.newAddr.address = $scope.address.name;
            vm.continueAdress = true;
            vm.error.address.flag = false;
            vm.error.address.message = "";
            vm.continueAddressFlag = true;
            $timeout(function(){
              $location.hash('slide6');
              $anchorScroll();
            },0);
          }
          else {
            vm.error.address.flag = true;
            vm.error.address.message = "A valid address is required";
          }
        }
        else {
          vm.error.address.message = "An address name is required";
          vm.error.address.flag = true;
        }
      }
      else {
        if (vm.myAddress == $scope.address.name){
          vm.continueAdress = true;
          vm.error.address.flag = false;
          vm.error.address.message = "";
          vm.continueAddressFlag = true;
          $timeout(function(){
            $location.hash('slide6');
            $anchorScroll();
          },0);
        }
        else {
          vm.error.address.message = "An address is required";
          vm.error.address.flag = true;
        }
      }
      // if ($scope.address.components.placeId){
      //   for (var i = 0; i < array.length; i++) {
      //     array[i]
      //   }
      //   vm.continueAdress = true;
      //   $timeout(function(){
      //     $location.hash('slide6');
      //     $anchorScroll();
      //   },0);
      // }
      // if (vm.myAddress == $scope.address.name) {
      //   vm.continueAddress = true;
      //   $timeout(function(){
      //     $location.hash('slide6');
      //     $anchorScroll();
      //   },0);
      // }
    }

    function setAddress(){
      $scope.address.name = vm.myAddress;
      vm.continueAddress = true;
    }

    function verif(){
      if (vm.projectDescription.length < 3){
        vm.continue = false;
        vm.continueImg = false;
        vm.img = [];
        vm.continueAddressFlag = false;
        vm.error.description.message = "Add a description of your needs";
        vm.error.description.flag = true;
      }
      else {
        vm.error.description.message = "";
        vm.error.description.flag = false;
      }
    }

    function continueProject(){
      if (vm.material == null || vm.projectDescription.length < 3)
      return "";
      else {
        vm.continue = true;
        $timeout(function(){
          $location.hash('slide4');
          $anchorScroll();
        },0);
      }

    }

    function continueProjectImg(){
      vm.continueImg = true;
      $timeout(function(){
        $location.hash('slide5');
        $anchorScroll();
      },0);
    }

    function selectType(item, items){
      vm.title = item.shortName;
      vm.type = item;
      vm.questions = [];
      vm.service = false;
      vm.questions.push(item);
      vm.subService = null;
      for (var i = 0; i < items.length; i++) {
        items[i].selected = "";
      }
      if (item.childrenSteps && item.childrenSteps.length > 0)
      for (var i = 0; i < item.childrenSteps.length; i++) {
        item.childrenSteps[i].selected = "";
      }
      item.selected = "activate";
      $timeout(function(){
        $location.hash('subSlide0');
        $anchorScroll();
      },0);
    }
    // function selectService(item, items){
    //   vm.questions.push(item);
    //   for (var i = 0; i < items.length; i++) {
    //     items[i].selected = ""
    //   }
    //   item.selected = "activate";
    //   $timeout(function(){
    //     $location.hash('subSlide0');
    //     $anchorScroll();
    //   },0);
    // }
    function selectSubService(item, items, index){
      if (index == 0){
        vm.title += " "+ item.name;
      }
      vm.questions[index + 1] = item;
      vm.service = false;
      vm.questions = vm.questions.slice(0, index + 2);
      for (var i = 0; i < items.length; i++) {
        items[i].selected = ""
      }
      if (item.childrenSteps && item.childrenSteps.length > 0)
      for (var i = 0; i < item.childrenSteps.length; i++) {
        item.childrenSteps[i].selected = "";
      }
      item.selected = "activate";
      if (item.childrenSteps && item.childrenSteps.length > 0){
        $timeout(function(){
          $location.hash('subSlide'+(index + 1).toString());
          $anchorScroll();
        },0);
      }
      else {
        vm.service = true;
        $timeout(function(){
          $location.hash('slide3');
          $anchorScroll();
        },0);
      }

    }
    function succesProjectsGET(res){
      vm.newProject = res;
      console.log(res);
    }

    function errorProjectsGET(){

    }

    function succesProfileGET(res){
      vm.user = res;
      if (res.addresses.length > 0){
        vm.myAddress = res.addresses[0].address;
        $scope.address.name = vm.myAddress;
        vm.continueAddress = true;
      }
      else {
        vm.continueAddress = false;
        vm.newAddrFlag = true;
      }

      console.log(res);
    }

    function errorProfileGET(){

    }
  }
})();
