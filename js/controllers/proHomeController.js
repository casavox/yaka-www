(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('ProHomeController', ProHomeController);

    ProHomeController.$inject = ['$scope', '$rootScope', 'networkService', '$auth'];
    function ProHomeController($scope, $rootScope, networkService, $auth) {
        var vm = this;

        $rootScope.menu = true;

        vm.currentYear = new Date().getFullYear();


        vm.authenticate = function (provider) {
            $auth.authenticate(provider).then(function (res) {
                if (!angular.isUndefined(res.data.token) && res.data.token && res.data.token != "") {
                    $localStorage.token = res.data.token;
                    //$state.go('dashboard');
                    console.log(res);
                }
            }).catch(function (res) {
                console.log("catch", res);
            });
        };

    }
})();
