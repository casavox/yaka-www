(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('MaintenanceProController', MaintenanceProController);

    function MaintenanceProController($scope, $rootScope, networkService, $auth, alertMsg, $translate, $localStorage, $state, smoothScroll, $stateParams) {

        alertMsg.send("Les services sont inaccessibles pour le moment.", 'danger');
        alertMsg.send("Votre site est en cours de mise à jour.", 'info');

        var vm = this;

        $rootScope.pageName = "Accès Pro - Maintenance";
        $rootScope.showMenu = false;

        var scrollOptions = {
            containerId: 'main-scroll-container'
        };

        vm.smoothScrollAbout = function () {
            var element = document.getElementById('about');
            smoothScroll(element, scrollOptions);
        };
    }
})
();
