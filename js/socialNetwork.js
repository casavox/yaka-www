(function() {
  'use strict';

  angular
  .module('Yaka')
  .factory('socialNetworkService', socialNetworkService);

  //
  //Network Service Routing
  socialNetworkService.$inject = ['networkService', '$q', '$localStorage', '$state']
  function socialNetworkService(networkService, $q, $localStorage, $state) {
    function login(){
      FB.login(function(response) {
        if (response.authResponse) {
          console.log('Welcome!  Fetching your information.... ');
          FB.api('/me', function(response) {
            console.log(response);
            var accessToken = FB.getAuthResponse().accessToken;
            var formData = {'accessToken': accessToken};
            networkService.facebookLogin(formData, function(res){
              $localStorage.token = res.token;
              $state.go('Dashboard');
            }, function(err){
              if (!angular.isUndefined(err) && err && err.message && err.message != "")
              console.log(err.message);
            })
            console.log(accessToken);
          });
        } else {
          var err = {message: 'User cancelled login or did not fully authorize.'};
        }
      }, {scope: 'email,user_birthday'});
    }
    return {
      login: login
    }
  }
})();
