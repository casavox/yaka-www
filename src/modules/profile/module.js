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
            .state('profile', {
                url: "/profile/me",
                templateUrl: "modules/profile/views/profile.html",
                controller: 'ProfileCustomerController',
                controllerAs: 'vm'
            })
            .state('pro-profile', {
                url: "/pro/profile/me",
                templateUrl: "modules/profile/views/profile-pro.html",
                controller: 'ProfileController',
                controllerAs: 'vm'
            });
    }
})();
