angular.module('Yaka', [
        'ngRoute',
        'ui.router',
        'materialAdmin',
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
        'monospaced.elastic',
        'smoothScroll',
        'angularMoment',
        'ngStomp',
        'luegg.directives',
        'angularjs-dropdown-multiselect',
        'angularTypewrite',
        'ngCookies',
        'angulartics',
        'angulartics.google.analytics',
        'bootstrapLightbox',
        'ngMessages',
        'vcRecaptcha'
    ]
);

(function () {
    'use strict';

    angular
        .module('Yaka')
        .constant('CONFIG', {
            'API_BASE_URL': (function () {
                if (window.location.hostname == 'yaka-frontend-development.herokuapp.com') {
                    return 'https://yaka-backend-development.herokuapp.com';
                } else if (window.location.hostname == 'yaka-frontend-staging.herokuapp.com') {
                    return 'https://yaka-backend-staging.herokuapp.com';
                } else if (window.location.hostname == 'yaka-frontend-production.herokuapp.com') {
                    return 'https://yaka-backend-production.herokuapp.com';
                } else if (window.location.hostname == 'www.yakaclub.com') {
                    return 'https://yaka-backend-production.herokuapp.com';
                } else if (window.location.hostname == 'www.yaka-local.com') {
                    // This allow to use the heroku backend from your computer (localhost http server)
                    // To use it, you need to add this line in your hosts file : "127.0.0.1   www.yaka-local.com"
                    // Then you can access the site here : http://www.yaka-local.com:8000
                    return 'https://yaka-backend-development.herokuapp.com';
                } else {
                    return 'http://localhost:8080';
                }
            }()),
            'GOOGLE_CLIENT_ID': '554065486693-44tmlohldpk2105ki1g22q4o3cncj59b.apps.googleusercontent.com',
            'FACEBOOK_CLIENT_ID': (function () {
                if (window.location.hostname == 'yaka-frontend-development.herokuapp.com') {
                    return '921341561325130'; // Development
                } else if (window.location.hostname == 'yaka-frontend-staging.herokuapp.com') {
                    return '921338621325424'; // Staging
                } else {
                    return '847913895334564'; // Production
                }
            }())
        })
        .config(config);

    function config($urlRouterProvider, $httpProvider, $authProvider, CONFIG) {

        $authProvider.oauth2({
            name: "googleLogin",
            clientId: CONFIG.GOOGLE_CLIENT_ID,
            url: CONFIG.API_BASE_URL + '/login/google',
            authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
            redirectUri: window.location.origin,
            requiredUrlParams: ['scope'],
            optionalUrlParams: ['display'],
            scope: ['profile', 'email', 'https://www.googleapis.com/auth/userinfo.profile'],
            scopePrefix: 'openid',
            scopeDelimiter: ' ',
            display: 'popup',
            type: '2.0',
            popupOptions: {width: 452, height: 633}
        });

        $authProvider.oauth2({
            name: 'facebookLogin',
            clientId: CONFIG.FACEBOOK_CLIENT_ID,
            url: CONFIG.API_BASE_URL + '/login/facebook',
            authorizationEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
            redirectUri: window.location.origin + '/',
            requiredUrlParams: ['display', 'scope'],
            scope: ['email'],
            scopeDelimiter: ',',
            display: 'popup',
            type: '2.0',
            popupOptions: {width: 580, height: 400}
        });

        $authProvider.oauth2({
            name: "googleRegister",
            clientId: CONFIG.GOOGLE_CLIENT_ID,
            url: CONFIG.API_BASE_URL + '/register/google',
            authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
            redirectUri: window.location.origin,
            requiredUrlParams: ['scope'],
            optionalUrlParams: ['display'],
            scope: ['profile', 'email', 'https://www.googleapis.com/auth/userinfo.profile'],
            scopePrefix: 'openid',
            scopeDelimiter: ' ',
            display: 'popup',
            type: '2.0',
            popupOptions: {width: 452, height: 633}
        });

        $authProvider.oauth2({
            name: 'facebookRegister',
            clientId: CONFIG.FACEBOOK_CLIENT_ID,
            url: CONFIG.API_BASE_URL + '/register/facebook',
            authorizationEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
            redirectUri: window.location.origin + '/',
            requiredUrlParams: ['display', 'scope'],
            scope: ['email'],
            scopeDelimiter: ',',
            display: 'popup',
            type: '2.0',
            popupOptions: {width: 580, height: 400}
        });

        // Pro Auth

        $authProvider.oauth2({
            name: "googleProRegister",
            clientId: CONFIG.GOOGLE_CLIENT_ID,
            url: CONFIG.API_BASE_URL + '/pro/register/google',
            authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
            redirectUri: window.location.origin,
            requiredUrlParams: ['scope'],
            optionalUrlParams: ['display'],
            scope: ['profile', 'email', 'https://www.googleapis.com/auth/userinfo.profile'],
            scopePrefix: 'openid',
            scopeDelimiter: ' ',
            display: 'popup',
            type: '2.0',
            popupOptions: {width: 452, height: 633}
        });

        $authProvider.oauth2({
            name: 'facebookProRegister',
            clientId: CONFIG.FACEBOOK_CLIENT_ID,
            url: CONFIG.API_BASE_URL + '/pro/register/facebook',
            authorizationEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
            redirectUri: window.location.origin + '/',
            requiredUrlParams: ['display', 'scope'],
            scope: ['email'],
            scopeDelimiter: ',',
            display: 'popup',
            type: '2.0',
            popupOptions: {width: 580, height: 400}
        });

        //
        // For any unmatched url, redirect to /login
        $urlRouterProvider.otherwise("/");


        //
        //Interceptor to put the token in the header for each http request
        $httpProvider.interceptors.push(['$q', '$injector', '$localStorage', function ($q, $injector, $localStorage) {
            return {
                'request': function (config) {
                    config.headers = config.headers || {};
                    if (angular.isUndefined($localStorage.token) == false && $localStorage.token && config.url != "https://api.cloudinary.com/v1_1/yaka/upload") {
                        config.headers.Authorization = $localStorage.token;
                    }
                    else if (config.url == "https://api.cloudinary.com/v1_1/yaka/upload") {
                        if (config.headers.Authorization)
                            delete config.headers.Authorization;
                    }
                    return config;
                },
                'responseError': function (response) {

                    return $q.reject(response);
                }
            };
        }]);
    }
})();


(function () {
    'use strict';

    angular
        .module('Yaka')
        .run(runBlock);

    function runBlock($rootScope, $localStorage, $injector, amMoment) {
        $rootScope.$on('$stateChangeStart',
            function (event, toState, toParams, fromState, fromParams) {
                $rootScope.menu = false;
                $rootScope.from = fromState;
                $rootScope.state = toState;
                if ($rootScope.rating && $rootScope.rate_counter) {
                    $rootScope.rating = false;
                    $rootScope.rate_counter = false;
                }
                else if ($rootScope.rating && !$rootScope.rate_counter)
                    $rootScope.rate_counter = true;
                else {
                    $rootScope.rating = false;
                    $rootScope.rate_counter = false;
                }
                if (toState.name != "login" && toState.name != "new-project")
                    $rootScope.rate_watcher = !$rootScope.rate_watcher;
            });

        amMoment.changeLocale('fr');
    }
})();
