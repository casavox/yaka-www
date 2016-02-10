(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('Dashboard2Controller', Dashboard2Controller);

    Dashboard2Controller.$inject = ['$scope', 'networkService', 'socialNetworkService', '$rootScope']
    function Dashboard2Controller($scope, networkService, socialNetworkService, $rootScope) {

        var vm = this;
    }
})();
