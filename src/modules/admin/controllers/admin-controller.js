(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('AdminController', AdminController);

    //
    //Controller login
    function AdminController($rootScope, $scope, networkService, $localStorage, $state, alertMsg, $translate, gmailContacts, CONFIG) {

        $rootScope.pageName = "Admin";
        $rootScope.updateProfile();

        var vm = this;


    }
})
();
