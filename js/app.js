angular.module('Yaka', [
  'ngRoute',
  'ui.router',
  'ngStorage',
  'pascalprecht.translate',
  'ap.lateralSlideMenu',
  'vsGoogleAutocomplete',
  'cloudinary',
  'ui.bootstrap',
  'ngFileUpload']);

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
      // Cloudinary configuration
      // cloudinaryProvider
      // .set("cloud_name", "CCCCCCC")
      // .set("upload_preset", "UUUUUUUU");
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
      .state('Inbox', {
        url: "/Inbox",
        templateUrl: "partials/dashboard.html",
        controller: 'DashboardController',
        controllerAs: 'vm'
      })
      .state('My-Projects', {
        url: "/My-Projects",
        templateUrl: "partials/my_projects.html",
        controller: 'MyProjectsController',
        controllerAs: 'vm'
      })
      .state('New-Project', {
        url: "/New-Project",
        templateUrl: "partials/new_project.html",
        controller: 'NewProjectController',
        controllerAs: 'vm'
      })
      .state('My-Places', {
        url: "/My-Places",
        templateUrl: "partials/dashboard.html",
        controller: 'DashboardController',
        controllerAs: 'vm'
      })
      .state('My-Pros', {
        url: "/My-Pros",
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
              config.headers.Authorization = $localStorage.token;
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
