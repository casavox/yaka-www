(function () {
    'use strict';

    angular
        .module('Yaka')
        .config(config);

    function config($stateProvider, CONFIG) {

        $stateProvider

            .state('ionic-pro-home', {
                url: "/",
                templateUrl: "modules/ionic-home/views/pro/ionic-pro-home.html",
                controller: 'IonicProHomeController',
                controllerAs: 'vm'
            })
    }
})();
