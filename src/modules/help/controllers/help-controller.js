(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('HelpController', HelpController);

    function HelpController($rootScope, $scope, networkService, alertMsg, $state, $localStorage, $stateParams, smoothScroll) {
        if ($localStorage.invitationId) {
            $state.go("contacts");
        }

        $scope.showList = false;

        $rootScope.pageName = "Aide";
        if ($localStorage.user) {
            $rootScope.updateProfile();
        }

        var vm = this;

        vm.showTuto = false;
        vm.showBoucheAOreille = false;
        vm.showSupport = true;
        if ($localStorage.user) {
            switch ($stateParams.card) {
                case "tuto":
                    vm.showTuto = true;
                    vm.showBoucheAOreille = false;
                    vm.showSupport = false;
                    break;
                case "bao":
                    vm.showTuto = false;
                    vm.showBoucheAOreille = true;
                    vm.showSupport = false;
                    break;
                case "support":
                    vm.showTuto = false;
                    vm.showBoucheAOreille = false;
                    vm.showSupport = true;
                    break;
            }
            if ($localStorage.user.professional) {
                networkService.professionalGET(function (pro) {
                    vm.pro = pro;
                }, function (err) {
                    alertMsg.send("Impossible de récupérer le profil", "danger");
                    $state.go("home", {'login': true});
                });
            }
        }

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
                }, true
            );
        };

        vm.smoothScroll = function (situation) {
            switch (situation) {
                case "tuto":
                    vm.showTuto = !vm.showTuto;
                    vm.showBoucheAOreille = false;
                    vm.showSupport = false;
                    setTimeout(function () {
                        smoothScroll(document.getElementById('tuto'));
                    }, 400);
                    break;
                case "bao":
                    vm.showTuto = false;
                    vm.showBoucheAOreille = !vm.showBoucheAOreille;
                    vm.showSupport = false;
                    setTimeout(function () {
                        smoothScroll(document.getElementById('bao'));
                    }, 400);
                    break;
                case "support":
                    vm.customerTuto = false;
                    vm.showTuto = false;
                    vm.showBoucheAOreille = false;
                    vm.showSupport = !vm.showSupport;
                    setTimeout(function () {
                        smoothScroll(document.getElementById('support'));
                    }, 400);
                    break;
            }
        };
    }
})();
