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
        register: function(data, success, error) {
          $http.post(baseUrl + '/projects/me?status='+data).success(success).error(error)
        },
        login: function(data, success, error) {
          $http.post(baseUrl + '/login', data).success(success).error(error)
        },
        facebookLogin: function(data, success, error) {
          $http.post(baseUrl + '/login/facebook', data).success(success).error(error)
        },
        register: function(data, success, error) {
          $http.post(baseUrl + '/register', data).success(success).error(error)
        }
      };

}
})();
