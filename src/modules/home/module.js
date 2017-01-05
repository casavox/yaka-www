(function () {
    'use strict';

    angular
        .module('Yaka')
        .config(config);

    function config($stateProvider) {

        $stateProvider

        //Redirects

            .state('concours', {
                url: "/concours",
                onEnter: function ($window) {
                    $window.open('http://res.cloudinary.com/yaka/image/upload/v1481207905/casavox/Reglement_Concours_Dec2016.pdf', '_self');
                }
            })

            .state('short-invite', {
                url: "/i/:id",
                onEnter: function ($state, $stateParams) {
                    $state.go('home', {
                        invitationId: $stateParams.id
                    });
                }
            })

            .state('short-invite-pro', {
                url: "/r/:id",
                onEnter: function ($state, $stateParams) {
                    $state.go('pro-home', {
                        invitationId: $stateParams.id
                    });
                }
            })

            .state('short-invite-pro-reco', {
                url: "/r/:id/:projectShortId",
                onEnter: function ($state, $stateParams) {
                    $state.go('pro-home', {
                        invitationId: $stateParams.id,
                        projectId: $stateParams.projectShortId
                    });
                }
            })

            //Customer

            .state('home', {
                url: "/?invitationId&projectId&login&email&register",
                templateUrl: "/modules/home/views/customer/home.html",
                controller: 'HomeController',
                controllerAs: 'vm'
            })

            //Pro

            .state('pro-home', {
                url: "/pro?invitationId&projectId&login&email&register",
                templateUrl: "/modules/home/views/pro/home-pro.html",
                controller: 'ProHomeController',
                controllerAs: 'vm'
            })

            // Help activities

            .state('help-activities', {
                url: "/travaux/:activity",
                templateUrl: "/modules/home/views/public/help-activity.html",
                controller: 'HelpActivityController',
                controllerAs: 'vm'
            })
    }
})();
