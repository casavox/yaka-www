(function () {
    'use strict';

    angular
        .module('Yaka')
        .config(config);

    function config($stateProvider) {

        $stateProvider

        //Redirects
            //Customer

            .state('ionic-home', {
                url: "/",
                templateUrl: "modules/ionic-home/views/ionic-home.html",
                controller: 'IonicHomeController',
                controllerAs: 'vm'
            })
    }
})();
