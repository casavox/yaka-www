var dependencies = [
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
    'vcRecaptcha',
    'matchMedia',
    'tabSlideBox'
];

var isMobile = typeof(ionic) !== 'undefined' && (ionic.Platform.is("ios") || ionic.Platform.is("android"));
if (isMobile) {
    dependencies.push('ionic');
}

angular.module('Yaka', dependencies);

if (isMobile) {
    angular.module('Yaka').run(function ($ionicPlatform, $rootScope) {

        $rootScope.isMobile = typeof(ionic) !== 'undefined' && (ionic.Platform.is("ios") || ionic.Platform.is("android"));
        $rootScope.mobilePlatform = "PLATFORM_WEB";
        $rootScope.mobilePackageName = "DESKTOP_NO_PACKAGE_NAME";
        $rootScope.isProApp = function () {
            return $rootScope.mobilePackageName == "com.casavox.pro";
        };

        $ionicPlatform.ready(function () {

            // Anything native should go here, like StatusBar.styleLightContent()
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
                navigator.splashscreen.hide();
            }

            if (window.FCMPlugin) {
                FCMPlugin.getToken(
                    function (token) {
                        alert(token);
                    },
                    function (err) {
                        console.log('error retrieving token: ' + err);
                    }
                );

                FCMPlugin.onNotification(function (data) {
                    if (data.wasTapped) {
                        //Notification was received on device tray and tapped by the user.
                        alert(JSON.stringify(data));
                    } else {
                        //Notification was received in foreground. Maybe the user needs to be notified.
                        alert(JSON.stringify(data));
                    }
                });
            }
        });
    });
}

(function () {
    'use strict';

    angular
        .module('Yaka')
        .constant('CONFIG', {
            'API_BASE_URL': (function () {

                // www.casa-local.com : This allow to use the heroku backend from your computer (localhost http server)
                // To use it, you need to add this line in your hosts file : "127.0.0.1   www.casa-local.com"
                // Then you can access the site here : http://www.casa-local.com:8000

                switch (window.location.hostname) {
                    case 'www.casa-local.com':
                        return 'http://localhost:8080';
                    case 'fb34936c-dd2e-4abd-bf29-4c7217.herokuapp.com':
                        return 'https://bbb5dfb4-a465-49b2-8d2f-0ee040.herokuapp.com';
                    case 'fc6310bf-0465-45a5-b3e4-88e905.herokuapp.com':
                    case 'www.casavox.com':
                        return 'https://bc3a5ece-8b03-4ee0-82dd-ea944f.herokuapp.com';
                    case 'fad2bced-1115-4049-8e43-e2e107.herokuapp.com':
                    default :
                        return 'https://baeacb59-6f35-4d43-a16b-dc71d7.herokuapp.com';
                }
            }()),
            'ENV': (function () {
                switch (window.location.hostname) {
                    case 'fad2bced-1115-4049-8e43-e2e107.herokuapp.com':
                        return 'development';
                    case 'fb34936c-dd2e-4abd-bf29-4c7217.herokuapp.com':
                        return 'staging';
                    case 'fc6310bf-0465-45a5-b3e4-88e905.herokuapp.com':
                    case 'www.casavox.com':
                        return 'production';
                    default:
                        return 'local';
                }
            }()),
            'GOOGLE_CLIENT_ID': '554065486693-44tmlohldpk2105ki1g22q4o3cncj59b.apps.googleusercontent.com',
            'GOOGLE_API_KEY': 'AIzaSyDtq1oFK_ku6rSm9OHM8Q0MlHeOYzOWgr8',
            'FACEBOOK_CLIENT_ID': (function () {

                switch (window.location.hostname) {
                    case 'fad2bced-1115-4049-8e43-e2e107.herokuapp.com':
                        return '921341561325130'; // Development
                    case 'fb34936c-dd2e-4abd-bf29-4c7217.herokuapp.com':
                        return '921338621325424'; // Staging
                    case 'fc6310bf-0465-45a5-b3e4-88e905.herokuapp.com':
                    default:
                        return '847913895334564'; // Production
                }
            }())
        })
        .config(config);

    function config($urlRouterProvider, $httpProvider, $authProvider, $locationProvider, CONFIG) {

        $locationProvider.html5Mode(true);

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

        // Social Accounts Attach

        $authProvider.oauth2({
            name: "googleLoginAttach",
            clientId: CONFIG.GOOGLE_CLIENT_ID,
            url: CONFIG.API_BASE_URL + '/login/google/attach',
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
            name: 'facebookLoginAttach',
            clientId: CONFIG.FACEBOOK_CLIENT_ID,
            url: CONFIG.API_BASE_URL + '/login/facebook/attach',
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
        // For any unmatched url, redirect to /
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

    function runBlock($rootScope, $localStorage, $injector, amMoment, moment, $state, $q) {

        $rootScope.$state = $state;

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

        moment.locale('fr');
    }
})();
