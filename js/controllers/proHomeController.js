(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('ProHomeController', ProHomeController);

    ProHomeController.$inject = ['$scope', '$rootScope', 'networkService'];
    function ProHomeController($scope, $rootScope, networkService) {
        var vm = this;

        $rootScope.menu = true;

        vm.currentYear = new Date().getFullYear();
    }
})();
