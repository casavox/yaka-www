(function () {
    'use strict';

    angular
        .module('Yaka')
        .config(config);

    function config($stateProvider, CONFIG) {

        if (CONFIG.AIM == "CUSTOMER") {

            $stateProvider

            //Redirects

            // CUSTOMER


                .state('ionic-customer-home', {
                    url: "/",
                    templateUrl: "modules/ionic-home/views/customer/ionic-customer-home.html",
                    controller: 'IonicHomeController',
                    controllerAs: 'vm'
                })
        }


        // PRO
        if (CONFIG.AIM == "PRO") {

            $stateProvider


                .state('ionic-pro-home', {
                    url: "/",
                    templateUrl: "modules/ionic-home/views/pro/ionic-pro-home.html",
                    controller: 'IonicProHomeController',
                    controllerAs: 'vm'
                })
        }


        //Pro
        /**/
    }
})();
