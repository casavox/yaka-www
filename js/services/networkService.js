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
      projectGET: function(data, success, error) {
        $http.get(baseUrl + '/projects/'+data).success(success).error(error)
      },
      projectsGET: function(data, success, error) {
        $http.get(baseUrl + '/projects/me?status='+data).success(success).error(error)
      },
      projectSMALLPOST: function(data, success, error) {
        $http.post(baseUrl + '/projects/small', data).success(success).error(error)
      },
      projectEMERGENCYPOST: function(data, success, error) {
        $http.post(baseUrl + '/projects/emergency', data).success(success).error(error)
      },
      activitiesGET: function(success, error) {
        $http.get(baseUrl + '/projects/activities').success(success).error(error)
      },
      profileGET: function(success, error) {
        $http.get(baseUrl + '/profile/me').success(success).error(error)
      },
      professionalGET: function(success, error) {
        $http.get(baseUrl + '/pro/me').success(success).error(error)
      },
      proLeadsGET: function(type, chrono, success, error) {
        $http.get(baseUrl + '/pro/leads?type=' + type + '&chrono=' + chrono).success(success).error(error)
      },
      proposalGET: function(data, success, error) {
        $http.get(baseUrl + '/proposals/'+data).success(success).error(error)
      },
      proposalAcceptPOST: function(data, success, error) {
        $http.post(baseUrl + '/proposals/'+data+"/accept").success(success).error(error)
      },
      proposalEmergencyPOST: function(data, success, error) {
        $http.post(baseUrl + '/proposals/emergency', data).success(success).error(error)
      },
      proposalSmallPOST: function(data, success, error) {
        $http.post(baseUrl + '/proposals/small', data).success(success).error(error)
      },
      projectPUT: function(data, success, error) {
        if (data.type == "EMERGENCY")
        $http.put(baseUrl + '/projects/emergency/'+data.id, data).success(success).error(error);
        else if (data.type == "SMALL_PROJECT")
        $http.put(baseUrl + '/projects/small/'+data.id, data).success(success).error(error);
      },
      proposalPUT: function(data, success, error) {
        if (data.type == "EMERGENCY")
        $http.put(baseUrl + '/proposals/emergency/'+data.id, data).success(success).error(error);
        else if (data.type == "SMALL_PROJECT")
        $http.put(baseUrl + '/proposals/small/'+data.id, data).success(success).error(error);
      },
    };

  }
})();
