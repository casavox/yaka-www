(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('ProHelpController', ProHelpController);

    function ProHelpController($rootScope, $scope, networkService, alertMsg, $state, $localStorage) {
        $scope.showList = false;

        $rootScope.pageName = "Aide";
        $rootScope.updateProfile();

        var vm = this;

        networkService.professionalGET(function (pro) {
            vm.pro = pro;
            if (vm.pro && vm.pro.step2 && vm.pro.step3 && vm.pro.status && (vm.pro.status == 'VALIDATED' || vm.pro.status == 'COMPLETED')) {
                $state.go("pro-dashboard");
            }
        }, function (err) {
            alertMsg.send("Impossible de récupérer le profil", "danger");
            $state.go("home");
        });

        vm.supportMessage = {
            gender: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            message: '',
            recaptchaResponse: '',
            url: $localStorage.lastUrlBeforeSupport,
            userAgent: navigator.userAgent
        };

        vm.formIsValid = function () {
            return vm.supportMessage.gender &&
                vm.supportMessage.firstName &&
                vm.supportMessage.lastName &&
                vm.supportMessage.email &&
                vm.supportMessage.message &&
                vm.supportMessage.recaptchaResponse;
        };

        function loadUserData() {
            if ($localStorage.user) {
                vm.supportMessage.gender = $localStorage.user.gender;
                vm.supportMessage.firstName = $localStorage.user.firstName;
                vm.supportMessage.lastName = $localStorage.user.lastName;
                vm.supportMessage.phoneNumber = $localStorage.user.phoneNumber;
                vm.supportMessage.email = $localStorage.user.email;
            }
        }

        loadUserData();

        vm.loading = false;

        vm.sendSupportMessage = function () {
            vm.loading = true;
            networkService.sendSupportMessage(vm.supportMessage,
                function success(res) {
                    swal({
                        title: "Message envoyé avec succès !",
                        text: "Vous allez recevoir par mail une copie du message qui nous a été adressé",
                        type: "success",
                        confirmButtonText: "OK",
                        closeOnConfirm: true
                    });
                    if ($localStorage.lastUrlBeforeSupport) {
                        window.location.href = $localStorage.lastUrlBeforeSupport;
                    } else {
                        $state.go("home");
                    }
                }, function error() {
                    vm.loading = false;
                    alertMsg.send("Impossible d'envoyer le message", "danger");
                }
            );
        };

        vm.showTuto = false;
        vm.showSupport = false;
    }
})();
