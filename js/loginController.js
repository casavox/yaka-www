(function() {
  'use strict';

  angular
  .module('Yaka')
  .controller('LoginController', LoginController);

  //
  //Controller login
  LoginController.$inject = ['$scope', 'networkService', 'socialNetworkService']
  function LoginController($scope, networkService, socialNetworkService) {

    $scope.email = "";
    $scope.password = "";

    $scope.login = function(){
      var formData = {
        profile: {email: $scope.email},
        password: $scope.password
      }
      networkService.login(formData, succesLogin, errorLogin);
    };

    function succesLogin(res){
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

    function errorLogin(err){
      if (!angular.isUndefined(err) && err && err.message && err.message != "")
      console.log(err.message);
    };

  }
})();
