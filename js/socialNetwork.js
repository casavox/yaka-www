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
            console.log(response);
            var accessToken = FB.getAuthResponse().accessToken;
            resolve(accessToken);
          });
        } else {
          console.log('User cancelled login or did not fully authorize.');
          return null;
        }
      });
    }
    return {
      login: login
    }
  }
})();
