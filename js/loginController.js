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

    $scope.FLogin = function(){
      var formData = {
        profile: {email: $scope.email},
        password: $scope.password
      }
      socialNetworkService.login(succesFLogin, errorFLogin);
      console.log(accessToken);
    };

    function succesLogin(res){
      if (!angular.isUndefined(res.token) && res.token && res.token != ""){
        $localStorage.token = res.token;
        $state.go('Dashboard');
        console.log(res);
      }
    };

    function errorLogin(err){
      if (!angular.isUndefined(err) && err && err.message && err.message != "")
      console.log(err.message);
    };

    function succesFLogin(res){
        console.log(res);
    };

    function errorFLogin(err){
      console.log(err.message);
    };

  }
})();
