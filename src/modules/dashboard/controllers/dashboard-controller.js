(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('DashboardController', DashboardController);

    //
    //Controller login
    function DashboardController($rootScope, $scope, networkService, $localStorage, $state, alertMsg, $translate, gmailContacts, CONFIG) {

        $rootScope.pageName = "Accueil";
        $rootScope.updateProfile();

        var vm = this;


    }
})
();
