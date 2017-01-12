(function () {
    'use strict';

    angular
        .module('Yaka')
        .config(config);

    function config($stateProvider) {

        $stateProvider

        //Redirects
            //Customer
            /*.state('ionic-customer-home', {
                url: "/",
                templateUrl: "modules/ionic-home/views/customer/ionic-customer-home.html",
                controller: 'IonicHomeController',
                controllerAs: 'vm'
            })*/

            //Pro
            .state('ionic-pro-home', {
                url: "/",
                templateUrl: "modules/ionic-home/views/pro/ionic-pro-home.html",
                controller: 'IonicProHomeController',
                controllerAs: 'vm'
            })
    }
})();
