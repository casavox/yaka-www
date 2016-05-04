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
    'angularRipple',
    'monospaced.elastic',
    'smoothScroll',
    'ngMaterial',
    'internationalPhoneNumber',
    'bootstrapLightbox',
    'angularMoment',
    'ngStomp',
    'luegg.directives',
    'angularjs-dropdown-multiselect',
    'angular-click-outside',
    'angularTypewrite']);


// facebook library API
window.fbAsyncInit = function () {
    FB.init({
        appId: '847913895334564',
        xfbml: true,
        version: 'v2.5'
    });
};

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


(function () {
    'use strict';

    angular
        .module('Yaka')
        .constant('CONFIG', {
            //'API_BASE_URL' : 'http://localhost:8080',
            'API_BASE_URL': (function () {
                if (window.location.hostname == 'yaka-frontend-development.herokuapp.com') {
                    return 'https://yaka-backend-development.herokuapp.com';
                } else if (window.location.hostname == 'yaka-frontend-staging.herokuapp.com') {
                    return 'https://yaka-backend-staging.herokuapp.com';
                } else if (window.location.hostname == 'yaka-frontend-production.herokuapp.com') {
                    return 'https://yaka-backend-production.herokuapp.com';
                } else if (window.location.hostname == 'yaka-development.local') {
                    return 'https://yaka-backend-development.herokuapp.com'
                } else {
                    return 'http://localhost:8080';
                }
            }()),
            'GOOGLE_CLIENT_ID': '554065486693-44tmlohldpk2105ki1g22q4o3cncj59b.apps.googleusercontent.com',
            'FACEBOOK_CLIENT_ID': '847913895334564'
        })
        .config(config);

    function config($stateProvider, $urlRouterProvider, $httpProvider, $translateProvider, $authProvider, ipnConfig, LightboxProvider, CONFIG) {

        ipnConfig.defaultCountry = 'fr';
        // Translation area

        LightboxProvider.templateUrl = 'partials/template-lightbox.html';
        LightboxProvider.calculateModalDimensions = function (dimensions) {
            var width = Math.max(400, dimensions.imageDisplayWidth + 32);

            if (width >= dimensions.windowWidth - 20 || dimensions.windowWidth < 768) {
                width = 'auto';
            }

            return {
                'width': width,                             // default
                'height': 'auto'                            // custom
            };
        };

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
        // The states
        $stateProvider
            .state('home', {
                url: "/?invitationId",
                templateUrl: "partials/home.html",
                controller: 'HomeController',
                controllerAs: 'vm'
            })
            .state('pro-home', {
                url: "/pro?invitationId",
                params: {
                    invitationId: null
                },
                templateUrl: "partials/pro_home.html",
                controller: 'ProHomeController',
                controllerAs: 'vm'
            })
            .state('dashboard', {
                url: "/dashboard",
                templateUrl: "partials/dashboard.html",
                controller: 'DashboardController',
                controllerAs: 'vm'
            })
            .state('my-projects', {
                url: "/my-projects",
                templateUrl: "partials/my_projects.html",
                controller: 'MyProjectsController',
                controllerAs: 'vm'
            })
            .state('new-project', {
                url: "/new-project",
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
            .state('end-project', {
                url: "/new-project/end-project",
                templateUrl: "partials/end.html",
                controller: 'EndController',
                controllerAs: 'vm'
            })
            .state('pro-project-proposal-new', {
                url: "/pro/project/:projectId/proposal/new",
                templateUrl: "partials/details_project_pro.html",
                controller: 'ProProjectController',
                controllerAs: 'vm'
            })
            .state('pro-proposal', {
                url: "/pro/proposal/:proposalId/edit",
                templateUrl: "partials/details_proposal.html",
                controller: 'ProProposalController',
                controllerAs: 'vm'
            })
            .state('pro-job', {
                url: "/pro/proposals/:proposalId/edit",
                templateUrl: "partials/proposalEditJob.html",
                controller: 'ProJobController',
                controllerAs: 'vm'
            })
            .state('profile', {
                url: "/profile/me",
                templateUrl: "partials/profile-customer.html",
                controller: 'ProfileCustomerController',
                controllerAs: 'vm'
            })
            .state('pro-profile', {
                url: "/pro/profile/me",
                templateUrl: "partials/profile.html",
                controller: 'ProfileController',
                controllerAs: 'vm'
            })
            .state('inbox', {
                url: "/inbox/:proposalId",
                templateUrl: "partials/inbox.html",
                controller: 'InboxController',
                controllerAs: 'vm'
            })
            .state('pro-inbox', {
                url: "/pro/inbox/:proposalId",
                templateUrl: "partials/inbox.html",
                controller: 'InboxController',
                controllerAs: 'vm'
            })
            .state('proposal', {
                url: "/proposal/:proposalId",
                templateUrl: "partials/proposal.html",
                controller: 'ProposalController',
                controllerAs: 'vm'
            })
            .state('project', {
                url: "/project/:projectId",
                templateUrl: "partials/project.html",
                controller: 'ProjectController',
                controllerAs: 'vm'
            })
            .state('proposals', {
                url: "/proposals/:projectId",
                templateUrl: "partials/proposals.html",
                controller: 'ProposalsController',
                controllerAs: 'vm'
            })
            .state('pro-proposals', {
                url: "/pro/proposals/quotes",
                templateUrl: "partials/pro-proposals.html",
                controller: 'ProProposalsController',
                controllerAs: 'vm'
            })
            .state('pro-jobs', {
                url: "/pro/proposals/jobs",
                templateUrl: "partials/pro-jobs.html",
                controller: 'ProJobsController',
                controllerAs: 'vm'
            })
            .state('contacts', {
                url: "/contacts",
                templateUrl: "partials/contacts.html",
                controller: 'ContactsController',
                controllerAs: 'vm'
            });

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
                if ((angular.isUndefined($localStorage.token) || !$localStorage.token) && toState.name != "home" && toState.name != "pro-home" && toState.name != "login" && toState.name != "new-project" && toState.name != "register") {
                    event.preventDefault();
                    $injector.get('$state').go('home');
                }
            })

        amMoment.changeLocale('fr');
    }
})();
