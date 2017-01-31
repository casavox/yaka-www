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

            .state('profile', {
                url: "/profile/me",
                templateUrl: "modules/profile/views/customer/profile.html",
                controller: 'ProfileCustomerController',
                controllerAs: 'vm'
            })

            //Pro

            .state('pro-profile', {
                url: "/pro/profile/me",
                templateUrl: "modules/profile/views/pro/profile-pro.html",
                controller: 'ProfileController',
                controllerAs: 'vm'
            });
    }
})();
