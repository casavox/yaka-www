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


        vm.googlePreRegister = function () {
            $auth.authenticate('googlePreRegister').then(function (res) {
                if (!angular.isUndefined(res.data.token) && res.data.token && res.data.token != "") {
                    //$state.go('dashboard');
                    console.log(res);
                }
            }).catch(function (res) {
                console.log("catch", res);
                alertMsg.send("Impossible de se connecter via Google", 'danger');
            });
        };

        vm.facebookPreRegister = function () {
            $auth.authenticate('facebook').then(function (res) {
                console.log(res);
                if (!angular.isUndefined(res.accessToken) && res.accessToken && res.accessToken != "") {
                    networkService.facebookPreRegister(res, onFacebookRegisterOk, onFacebookRegisterFail);
                }
            }).catch(function (res) {
                console.log("catch", res);
                alertMsg.send("Impossible de se connecter via Facebook", 'danger');
            });
        };

        function onFacebookRegisterOk() {
            //$state.go('dashboard');
            console.log(res);
        }

        function onFacebookRegisterFail() {
            alertMsg.send("Impossible de se connecter via Facebook", 'danger');
        }
    }
})();
