(function() {
  'use strict';

  angular
  .module('Yaka')
  .controller('RegisterController', RegisterController);

  //
  //Controller login
  RegisterController.$inject = ['$scope', 'networkService', 'socialNetworkService', '$filter', '$localStorage', '$state']
  function RegisterController($scope, networkService, socialNetworkService, $filter, $localStorage, $state) {
    $scope.email = "";
    $scope.password = "";
    $scope.password2 = "";
    $scope.firstName = "";
    $scope.lastName = "";

    $scope.passwordVerification = function(){
      if ($scope.password == $scope.password2){
        $scope.verification = "border-green";
      }
      else {
        $scope.verification = "border-red";
      }
    }

    $scope.register = function(){
      var formData = {
        profile: {email: $scope.email,
          firstName: $scope.firstName,
          lastName: $scope.lastName,
          birthday: $filter('date')($scope.date, "yyyy-MM-dd")},
          password: $scope.password
        }
        networkService.register(formData, succesRegister, errorRegister);
      };

      function succesRegister(res){
        if (!angular.isUndefined(res.token) && res.token && res.token != ""){
          $localStorage.token = res.token;
          $state.go('dashboard');
          console.log(res);
        }
      };

      function errorRegister(err){
        if (!angular.isUndefined(err) && err && err.message && err.message != "")
        console.log(err.message);
      };

    }
  })();
