(function() {
  'use strict';

  angular
  .module('Yaka')
  .controller('NewProjectController', NewProjectController);

  //
  //Controller login
  NewProjectController.$inject = ['$scope', 'networkService', 'socialNetworkService', '$rootScope', '$location', '$anchorScroll', '$timeout', '$localStorage', '$filter', '$state', 'Upload', 'cloudinary']
  function NewProjectController($scope, networkService, socialNetworkService, $rootScope, $location, $anchorScroll, $timeout, $localStorage, $filter, $state, $upload, cloudinary) {
    var vm = this;
    vm.user = $localStorage.user;
    console.log(vm.user);
    vm.newProject = {};
    vm.child0 = "";
    vm.child1 = "";
    vm.child2 = "";
    vm.child3 = "";
    vm.continueWithoutImages = continueWithoutImages;
    vm.popupFlag = false;
    vm.emergency = false;
    vm.dateFlag = false;
    vm.dt = new Date();
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
    vm.selectType = selectType;
    // vm.selectService = selectService;
    vm.selectSubService = selectSubService;
    vm.projectDescription = "";
    vm.material = null;
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
    vm.resetProject = resetProject;
    vm.post = post;
    vm.newAddr = {};
    vm.all = all;
    vm.initDate = initDate;
    vm.error = {description: {flag: false, message: ""}, address: {flag: false, message: ""}, date: {flag: false, message: ""}, material: {flag: false, message: ""}};
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

    var d = new Date();
        $scope.title = "Image (" + d.getDate() + " - " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ")";
        $rootScope.photos = [{}, {}, {}, {}];
        //$scope.$watch('files', function() {
        $scope.uploadFiles = function(files, invalides, index){
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
                $rootScope.photos = $rootScope.photos || [{}, {}, {}, {}];
                data.context = {custom: {photo: $scope.title}};
                file.result = data;
                $rootScope.photos[index] = data;
              }).error(function (data, status, headers, config) {
                file.result = data;
              });
            }
          });
        };
        //});

        /* Modify the look and fill of the dropzone when files are being dragged over it */
        $scope.dragOverClass = function($event) {
          var items = $event.dataTransfer.items;
          var hasFile = false;
          if (items != null) {
            for (var i = 0 ; i < items.length; i++) {
              if (items[i].kind == 'file') {
                hasFile = true;
                break;
              }
            }
          } else {
            hasFile = true;
          }
          return hasFile ? "dragover" : "dragover-err";
        };

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
        if (vm.time > 9) {
          vm.J1.c1Disabled = "checkbox-disabled";
          vm.J1.allDisabled = "checkbox-disabled";
        }
        if (vm.time > 12) {
          vm.J1.c2Disabled = "checkbox-disabled";
          vm.J1.allDisabled = "checkbox-disabled";
        }
        if (vm.time > 14) {
          vm.J1.c3Disabled = "checkbox-disabled";
          vm.J1.allDisabled = "checkbox-disabled";
        }
        if (vm.time > 16) {
          vm.J1.c4Disabled = "checkbox-disabled";
          vm.J1.allDisabled = "checkbox-disabled";
        }
        if (vm.time > 18) {
          vm.J1.c5Disabled = "checkbox-disabled";
          vm.J1.allDisabled = "checkbox-disabled";
        }
        if (vm.time > 20) {
          vm.J1.c6Disabled = "checkbox-disabled";
          vm.J1.allDisabled = "checkbox-disabled";
        }
      }

      function resetProject(){
        if (vm.emergency){
          networkService.stepsGET("EMERGENCY", succesProjectsGET, errorProjectsGET);
        }
        else {
          networkService.stepsGET("SMALL_PROJECT", succesProjectsGET, errorProjectsGET);
        }
        vm.title = "";
        vm.type = {};
        vm.continue = false;
        vm.continueImg = false;
        vm.continueAddressFlag = false;
        vm.questions = [];
        vm.service = false;
        vm.subService = null;
        vm.projectDescription = "";
        vm.material = null;
        vm.error = {description: {flag: false, message: ""}, address: {flag: false, message: ""}, date: {flag: false, message: ""}, material: {flag: false, message: ""}};
        if (vm.user.addresses.length > 0){
          vm.myAddress = vm.user.addresses[0].address;
          $scope.address.name = vm.myAddress;
          vm.continueAddress = true;
        }
        else {
          vm.continueAddress = false;
          vm.newAddrFlag = true;
        }
        for (var i = 0; i < vm.newProject.childrenSteps.length; i++) {
          vm.newProject.childrenSteps[i].selected = "";
        }
      }

      function post(){
        if (!vm.emergency){
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
          for (var i = 0; i < $rootScope.photos.length; i++) {
            if ($rootScope.photos[i].public_id){
              var tmp = {cloudinaryPublicId: $rootScope.photos[i].public_id};
              if ($rootScope.photos[i].comment) {
                tmp.comment = $rootScope.photos[i].comment;
              }
              formData.images.push(tmp);
            }
          }
          formData.type = "small";
          $rootScope.newProject = formData;
          networkService.projectSMALLPOST(formData, succesProjectsPOST, errorProjectsPOST);
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
          formData.type = "emergency";
          $rootScope.newProject = formData;
          networkService.projectEMERGENCYPOST(formData, succesProjectsPOST, errorProjectsPOST);
        }
      }

      function succesProjectsPOST(res){
        console.log(res);
        $timeout(function(){
          $state.go('My-Projects')
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
        if (vm.material == null)
        {
          vm.error.material.message = "Select YES or NO";
          vm.error.material.flag = true;
        }
        if (vm.projectDescription.length < 3) {
          vm.error.description.message = "Add a description of your needs";
          vm.error.description.flag = true;
        }
        else if (vm.material != null && vm.projectDescription.length >= 3){
          vm.error.material.flag = true;
          vm.error.material.message = "";
          vm.error.description.message = "";
          vm.error.description.flag = false;
          vm.continue = true;
          $timeout(function(){
            $location.hash('slide4');
            $anchorScroll();
          },0);
        }
      }

      function continueProjectImg(){
        var flag = 0;
        for (var i = 0; i < $rootScope.photos.length; i++) {
          if ($rootScope.photos[i].public_id){
            flag += 1;
          }
        }
        if (flag == 0){
          vm.continueImg = false;
          vm.popupFlag = true;
        }
        else {
          vm.popupFlag = false;
          vm.continueImg = true;
          $timeout(function(){
            $location.hash('slide5');
            $anchorScroll();
          },0);
        }
      }

      function continueWithoutImages(){
        vm.popupFlag = false;
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
        vm.material = null;
        vm.projectDescription = "";
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
