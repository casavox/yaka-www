(function() {
  'use strict';

  angular
  .module('Yaka')
  .controller('LoginController', LoginController);

  //
  //Controller login
  LoginController.$inject = ['$scope', 'networkService', 'socialNetworkService', '$localStorage', '$state', '$rootScope', '$auth']
  function LoginController($scope, networkService, socialNetworkService, $localStorage, $state, $rootScope, $auth) {

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
    };


    $scope.authenticate = function(provider) {
     $auth.authenticate(provider).then(function(res){
       if (!angular.isUndefined(res.token) && res.token && res.token != ""){
         $localStorage.token = res.token;
         if ($rootScope.newProject){
           if ($rootScope.newProject.type == "small")
           networkService.projectSMALLPOST(formData, succesProjectsPOST, errorProjectsPOST);
           else {
             networkService.projectEMERGENCYPOST(formData, succesProjectsPOST, errorProjectsPOST);
           }
         }
         else {
           $state.go('Dashboard');
           console.log(res);
         }
       }
     }).catch(function(res){
       console.log("catch", res);
     });
   };

    function succesLogin(res){
      if (!angular.isUndefined(res.token) && res.token && res.token != ""){
        $localStorage.token = res.token;
        if ($rootScope.newProject){
          if ($rootScope.newProject.type == "small")
          networkService.projectSMALLPOST(formData, succesProjectsPOST, errorProjectsPOST);
          else {
            networkService.projectEMERGENCYPOST(formData, succesProjectsPOST, errorProjectsPOST);
          }
        }
        else {
          $state.go('Dashboard');
          console.log(res);
        }
      }
    };

    function errorLogin(err){
      if (!angular.isUndefined(err) && err && err.message && err.message != "")
      console.log(err.message);
    };

    function succesFLogin(res){
      if (!angular.isUndefined(res.token) && res.token && res.token != ""){
        $localStorage.token = res.token;
        if ($rootScope.newProject){
          if ($rootScope.newProject.type == "small")
          networkService.projectSMALLPOST(formData, succesProjectsPOST, errorProjectsPOST);
          else {
            networkService.projectEMERGENCYPOST(formData, succesProjectsPOST, errorProjectsPOST);
          }
        }
        else {
          $state.go('Dashboard');
          console.log(res);
        }
      }
    };

    function errorFLogin(err){
      console.log(err.message);
    };

  }
})();
