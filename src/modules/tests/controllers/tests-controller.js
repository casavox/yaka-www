(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('TestsController', TestsController);

    //
    //Controller login
    function TestsController($rootScope, $scope, networkService, $localStorage, $state, alertMsg, $translate, CONFIG) {

        $rootScope.pageName = "Tests";
        $rootScope.updateProfile();

        var vm = this;

        networkService.testCinemas(function (cinemas) {
            vm.cinemas = cinemas;
        }, function () {
            alertMsg.send("Impossible de récupérer les cinémas", "danger");
        });
    }
})
();
