(function() {
  'use strict';

  angular
  .module('Yaka')
  .factory('networkService', NetworkService);

  //
  //Network Service Routing
  NetworkService.$inject = ['$http']
  function NetworkService($http) {
      var baseUrl = "https://yaka-api.herokuapp.com";

      return {
        login: function(data, success, error) {
          $http.post(baseUrl + '/login', data).success(success).error(error)
        },
        loginFB: function(data, success, error) {
          $http.post(baseUrl + '/login/fb', data).success(success).error(error)
        },
        register: function(data, success, error) {
          $http.post(baseUrl + '/register', data).success(success).error(error)
        },
      };

}
})();
