(function() {
  'use strict';

  angular
  .module('Yaka')
  .controller('RegisterController', RegisterController);

  //
  //Controller login
  RegisterController.$inject = ['$scope', 'networkService', 'socialNetworkService']
  function RegisterController($scope, networkService, socialNetworkService) {
    $scope.email = "";
    $scope.password = "";
    $scope.password2 = "";
    $scope.firstName = "";
    $scope.lastName = "";
    $scope.date = new Date();

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
                  birthday: $scope.date.toString()},
        password: $scope.password
      }
      networkService.register(formData, succesRegister, errorRegister);
    };

    function succesRegister(res){
      if (res.status == 200){
        if (!angular.isUndefined(res.token) && res.token && res.token != ""){
          $localStorage.token = res.token;
          $state.go('Dashboard');
          console.log(res);
        }
        // else {
        //
        // }
      }
    };

    function errorRegister(err){
      if (!angular.isUndefined(err) && err && err.message && err.message != "")
      console.log(err.message);
    };

  }
})();
