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
                url: "/?invitationId?login",
                templateUrl: "/modules/home/views/customer/home.html",
                controller: 'HomeController',
                controllerAs: 'vm'
            })

            //Pro

            .state('pro-home', {
                url: "/pro/?invitationId",
                templateUrl: "/modules/home/views/pro/home-pro.html",
                controller: 'ProHomeController',
                controllerAs: 'vm'
            })
    }
})();
