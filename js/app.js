angular.module('Yaka', [
  'ngRoute',
  'ui.router',
  'ngStorage',
  'pascalprecht.translate',
  'ap.lateralSlideMenu']);

  window.fbAsyncInit = function() {
    FB.init({
      appId      : '847913895334564',
      xfbml      : true,
      version    : 'v2.5'
    });
  };

  (function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));


  (function() {
    'use strict';

    angular
    .module('Yaka')
    .config(config);

    function config($stateProvider, $urlRouterProvider, $httpProvider, $translateProvider) {
      //
      // Translation area
      $translateProvider.translations('en', {

      });
      $translateProvider.translations('fr', {

      });
      $translateProvider.preferredLanguage('en');


      //
      // For any unmatched url, redirect to /state1
      $urlRouterProvider.otherwise("/Login");
      //
      // The states
      $stateProvider
      .state('Login', {
        url: "/Login",
        templateUrl: "partials/login.html",
        controller: 'LoginController',
        controllerAs: 'vm'
      })
      .state('Register', {
        url: "/Register",
        templateUrl: "partials/register.html",
        controller: 'RegisterController',
        controllerAs: 'vm'
      })
      .state('Dashboard', {
        url: "/Dashboard",
        templateUrl: "partials/dashboard.html",
        controller: 'DashboardController',
        controllerAs: 'vm'
      })

      //
      //Interceptor to put the token in the header for each request http
      $httpProvider.interceptors.push(['$q', '$injector', '$localStorage', function($q, $injector, $localStorage) {
        return {
          'request': function (config) {
            config.headers = config.headers || {};
            if (angular.isUndefined($localStorage.token) == false && $localStorage.token) {
              config.headers.Authorization = 'Bearer ' + $localStorage.token;
            }
            return config;
          },
          'responseError': function(response) {
            if(response.status === 401 || response.status === 403) {
              $injector.get('$state').go('Login');
            }
            return $q.reject(response);
          }
        };
      }]);

    }
  })();
