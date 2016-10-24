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

            .state('homeV2', {
                url: "/V2?invitationId&login&email&register",
                templateUrl: "/modules/home/views/customer/home2.html",
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
