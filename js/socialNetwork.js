(function() {
  'use strict';

  angular
  .module('Yaka')
  .factory('socialNetworkService', socialNetworkService);

  //
  //Network Service Routing
  socialNetworkService.$inject = ['networkService', '$q']
  function socialNetworkService(networkService, $q) {
    function login(){
      FB.login(function(response) {
        if (response.authResponse) {
          console.log('Welcome!  Fetching your information.... ');
          FB.api('/me', function(response) {
            console.log(response);
            var accessToken = FB.getAuthResponse().accessToken;

            console.log(accessToken);
          });
        } else {
          var err = {message: 'User cancelled login or did not fully authorize.'};
        }
      });
    }
    return {
      login: login
    }
  }
})();
