(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('RecoverPasswordController', RecoverPasswordController);

    function RecoverPasswordController($scope, $rootScope, networkService, alertMsg, $localStorage, $state, $translate, $auth, $stateParams) {

        if (angular.isUndefined($stateParams.token) ||
            !$stateParams.token &&
            $stateParams.token == '') {
            $state.go("home");
        }

        var vm = this;

        vm.newPassword = {
            password: "",
            token: $stateParams.token
        };
        vm.passwordConfirm = "";

        vm.newPasswordFormIsValid = function () {
            if (vm.newPassword.passwordlength < 6 ||
                vm.newPassword.password != vm.passwordConfirm) {
                return false;
            } else {
                return true;
            }
        };

        vm.sendNewPassword = function () {
            if (vm.newPasswordFormIsValid) {
                networkService.passwordNewPOST(vm.newPassword, successPasswordNew, failPasswordNew);
            }
        };

        function successPasswordNew(res) {
            vm.newPasswordSuccessMessage = true;
        }

        function failPasswordNew(err) {
            alertMsg.send("Impossible de réinitialiser le mot de passe", 'danger');
        }

        vm.newPasswordSuccessMessage = false;

        vm.goToHomepage = function () {
            $localStorage.$reset();
            $state.go("home");
        };
    }
})();
