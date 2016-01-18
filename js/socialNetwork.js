(function() {
  'use strict';

  angular
  .module('Yaka')
  .factory('socialNetworkService', socialNetworkService);

  //
  //Network Service Routing
  socialNetworkService.$inject = ['networkService']
  function socialNetworkService(networkService) {
    function login(){
      FB.login(function(response) {
        if (response.authResponse) {
          console.log('Welcome!  Fetching your information.... ');
          FB.api('/me', function(response) {
            console.log('Good to see you, ' + response.name + '.');
            var accessToken = FB.getAuthResponse().accessToken;
            //networkService.loginFB();
          });
        } else {
          console.log('User cancelled login or did not fully authorize.');
        }
      });
    }
    return {
      login: login
    }
  }
})();
