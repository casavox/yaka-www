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
            .state('home', {
                url: "/?invitationId",
                templateUrl: "/modules/home/views/home.html",
                controller: 'HomeController',
                controllerAs: 'vm'
            })
            .state('pro-home', {
                url: "/pro?invitationId",
                templateUrl: "/modules/home/views/home-pro.html",
                controller: 'ProHomeController',
                controllerAs: 'vm'
            })
    }
})();
