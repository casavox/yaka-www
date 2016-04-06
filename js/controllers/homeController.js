(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('HomeController', HomeController);

    //
    //Controller login
    HomeController.$inject = ['$scope', '$rootScope', 'networkService'];
    function HomeController($scope, $rootScope, networkService) {
        var vm = this;

        $rootScope.menu = true;
    }
})();
