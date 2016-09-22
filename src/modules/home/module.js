/**
 * Created by Vincent on 30/04/2016.
 */
(function () {
    'use strict';

    angular
        .module('Yaka')
        .config(config);

    function config($stateProvider) {

        $stateProvider

            //Customer

            .state('home', {
                url: "/?invitationId&login&email&register",
                templateUrl: "/modules/home/views/customer/home.html",
                controller: 'HomeController',
                controllerAs: 'vm'
            })

            //Pro

            .state('pro-home', {
                url: "/pro/?invitationId&login&email&register",
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
