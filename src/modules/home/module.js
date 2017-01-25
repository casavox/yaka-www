(function () {
    'use strict';

    angular
        .module('Yaka')
        .config(config)
        .run(function ($rootScope, $location, $state) {
            $rootScope.isProApp = function () {
                return true;
            }
            $rootScope.$on('$stateChangeStart',
                function (event, toState, toParams, fromState, fromParams, options) {
                    if (toState.name == "home") {
                        if ($rootScope.isMobile) {
                            if ($rootScope.isProApp()) {
                                $state.go("ionic-pro-home");
                                event.preventDefault();
                            } else {
                                $state.go("ionic-home");
                                event.preventDefault();
                            }
                        }
                    }

                    if (toState.name == "pro-home") {
                        if ($rootScope.isMobile) {
                            if ($rootScope.isProApp()) {
                                $state.go("ionic-pro-home");
                                event.preventDefault();
                            } else {
                                $state.go("ionic-home");
                                event.preventDefault();
                            }
                        }
                    }
                });
        });

    function config($stateProvider) {

        $stateProvider
            .state('concours', {
                url: "/concours",
                onEnter: function ($window) {
                    $window.open('http://res.cloudinary.com/yaka/image/upload/v1481207905/casavox/Reglement_Concours_Dec2016.pdf', '_self');
                }
            })

            //Customer

            .state('home', {
                url: "/?invitationId&login&email&register",
                templateUrl: "modules/home/views/customer/home.html",
                controller: 'HomeController',
                controllerAs: 'vm'
            })

            .state('ionic-home', {
                url: "/",
                templateUrl: "modules/home/views/customer/ionic-customer-home.html",
                controller: "IonicHomeController",
                controllerAs: 'vm'
            })

            //Pro

            .state('pro-home', {
                url: "/pro?invitationId&login&email&register",
                templateUrl: "modules/home/views/pro/home-pro.html",
                controller: 'ProHomeController',
                controllerAs: 'vm'
            })

            .state('ionic-pro-home', {
                url: "/",
                templateUrl: "modules/home/views/pro/ionic-pro-home.html",
                controller: "IonicProHomeController",
                controllerAs: 'vm'
            })


            // Help activities

            .state('help-activities', {
                url: "/travaux/:activity",
                templateUrl: "modules/home/views/public/help-activity.html",
                controller: 'HelpActivityController',
                controllerAs: 'vm'
            })
    }
})();
