angular.module('Yaka', [
  'ngRoute',
  'ui.router',
  'ngStorage',
  'pascalprecht.translate',
  'ap.lateralSlideMenu',
  'vsGoogleAutocomplete',
  'cloudinary',
  'ui.bootstrap',
  'ngFileUpload',
  'satellizer',
  'uiGmapgoogle-maps',
  'angular-carousel',
  'angularRipple']);

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

    function config($stateProvider, $urlRouterProvider, $httpProvider, $translateProvider, $authProvider) {
      $authProvider.baseUrl = 'https://yaka-api.herokuapp.com';
      //
      // Cloudinary configuration
      // cloudinaryProvider
      // .set("cloud_name", "CCCCCCC")
      // .set("upload_preset", "UUUUUUUU");
      //
      // Translation area

      $authProvider.google({
        clientId: "554065486693-44tmlohldpk2105ki1g22q4o3cncj59b.apps.googleusercontent.com",
        url: '/login/google',
        authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
        redirectUri: window.location.origin,
        requiredUrlParams: ['scope'],
        optionalUrlParams: ['display'],
        scope: ['profile', 'email', 'https://www.googleapis.com/auth/userinfo.profile'],
        scopePrefix: 'openid',
        scopeDelimiter: ' ',
        display: 'popup',
        type: '2.0',
        popupOptions: { width: 452, height: 633 }
      });

      $translateProvider.translations('en', {

      });
      $translateProvider.translations('fr', {

      });
      $translateProvider.preferredLanguage('en');


      //
      // For any unmatched url, redirect to /login
      $urlRouterProvider.otherwise("/login");
      //
      // The states
      $stateProvider
      .state('login', {
        url: "/login",
        templateUrl: "partials/login.html",
        controller: 'LoginController',
        controllerAs: 'vm'
      })
      .state('register', {
        url: "/register",
        templateUrl: "partials/register.html",
        controller: 'RegisterController',
        controllerAs: 'vm'
      })
      .state('dashboard', {
        url: "/dashboard",
        templateUrl: "partials/dashboard.html",
        controller: 'DashboardController',
        controllerAs: 'vm'
      })
      .state('inbox', {
        url: "/inbox",
        templateUrl: "partials/dashboard.html",
        controller: 'DashboardController',
        controllerAs: 'vm'
      })
      .state('myprojects', {
        url: "/myprojects",
        templateUrl: "partials/my_projects.html",
        controller: 'MyProjectsController',
        controllerAs: 'vm'
      })
      .state('newproject', {
        url: "/newproject",
        templateUrl: "partials/new_project.html",
        controller: 'NewProjectController',
        controllerAs: 'vm'
      })
      .state('myplaces', {
        url: "/myplaces",
        templateUrl: "partials/dashboard.html",
        controller: 'DashboardController',
        controllerAs: 'vm'
      })
      .state('mypros', {
        url: "/mypros",
        templateUrl: "partials/dashboard.html",
        controller: 'DashboardController',
        controllerAs: 'vm'
      })
      .state('prodashboard', {
        url: "/pro/dashboard",
        templateUrl: "partials/proDashboard.html",
        controller: 'ProDashboardController',
        controllerAs: 'vm'
      })

      //
      //Interceptor to put the token in the header for each request http
      $httpProvider.interceptors.push(['$q', '$injector', '$localStorage', function($q, $injector, $localStorage) {
        return {
          'request': function (config) {
            config.headers = config.headers || {};
            if (angular.isUndefined($localStorage.token) == false && $localStorage.token && config.url != "https://api.cloudinary.com/v1_1/yaka/upload") {
              config.headers.Authorization = $localStorage.token;
            }
            else if (config.url == "https://api.cloudinary.com/v1_1/yaka/upload"){
              if (config.headers.Authorization)
              delete config.headers.Authorization;
            }
            return config;
          },
          'responseError': function(response) {
            if(response.status === 401 || response.status === 403) {
              $injector.get('$state').go('login');
            }
            return $q.reject(response);
          }
        };
      }]);

    }
  })();
