(function () {
    'use strict';

    angular
        .module('Yaka')
        .config(config);

    function config($stateProvider) {

        $stateProvider

            .state('ionic-customer-home', {
                url: "/",
                templateUrl: "modules/ionic-home/views/customer/ionic-customer-home.html",
                controller: 'IonicProHomeController',
                controllerAs: 'vm'
            })
    }
})();
