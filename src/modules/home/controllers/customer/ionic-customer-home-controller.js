(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('IonicHomeController', IonicHomeController);

    //
    //Controller login
    function IonicHomeController($scope, $rootScope, networkService, alertMsg, $http, CONFIG, $localStorage, $state, $translate, $auth, $stateParams, screenSize, $ionicModal, $ionicPlatform) {

        var vm = this;

        if ($rootScope.isMobile) {
            if (window.outerHeight < 550) {
                vm.xsMobile = true;
            } else {
                vm.xsMobile = false;
            }
        }

        if ($rootScope.isMobile) {
            if (window.outerHeight >= 550 && window.outerHeight <= 630) {
                vm.smMobile = true;
            } else {
                vm.smMobile = false;
            }
        }

        if ($stateParams.invitationId) {
            $localStorage.invitationId = $stateParams.invitationId;
        }

        if ($localStorage.token && $localStorage.token != '') {
            if ($localStorage.user && $localStorage.user.professional) {
                $state.go('pro-dashboard');
            } else {
                $state.go('dashboard');
            }
        }

        $ionicModal.fromTemplateUrl('login-popup.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            vm.login = modal;
        });

        $ionicModal.fromTemplateUrl('forgotten-password.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            vm.forgottenPassword = modal;
        });

        $scope.openLoginModal = function () {
            vm.login.show();
        };

        $scope.closeLoginModal = function () {
            vm.login.hide();
        };

        $scope.openForgottenPasswordModal = function () {
            vm.forgottenPassword.show();
        };

        $scope.closeForgottenPasswordModal = function () {
            vm.forgottenPassword.hide();
        };

        $rootScope.pageName = "";

        vm.jobs = [
            "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste",
            "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste",
            "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste",
            "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste",
            "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste",
            "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste",
            "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste",
            "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste",
            "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste",
            "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste",
            "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste",
            "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste",
            "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste",
            "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste",
            "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste",
            "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste",
            "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste",
            "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste",
            "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste",
            "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste",
            "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste",
            "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste",
            "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste",
            "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste",
            "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste",
            "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste",
            "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste",
            "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste",
            "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste",
            "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste",
            "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste",
            "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste",
            "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste",
            "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste",
            "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste"
        ];

        vm.showLoginPopup = false;
        vm.loginTab = true;

        if ($stateParams.login) {
            vm.showLoginPopup = true;
        }
        if ($stateParams.register) {
            vm.showLoginPopup = true;
            vm.loginTab = false;
        }

        vm.currentYear = new Date().getFullYear();

        vm.noSocialAccountMessage = false;

        vm.socialNetwork = "";

        vm.showRegisterFields = false;

        vm.openPopup = function (showLoginTab) {
            vm.loginTab = showLoginTab;
            vm.showLoginPopup = true;
        };

        vm.closePopup = function () {
            vm.showLoginPopup = false;
        };

        vm.newUser = {
            password: "",
            firstName: "",
            lastName: "",
            email: "",
            facebookId: "",
            defaultAddress: {
                address: ""
            },
            referral: "",
            avatar: {
                cloudinaryPublicId: ""
            }
        };

        vm.loginUser = {
            password: "",
            email: ""
        };

        if ($stateParams.email) {
            vm.loginUser.email = $stateParams.email;
            vm.newUser.email = $stateParams.email;
        }

        vm.passwordConfirm = "";

        vm.autocomplete = {
            options: {
                types: ['(cities)'],
                componentRestrictions: {country: 'fr'}
            }
        };

        var doNotHide = false;

        vm.needToHideEmail = function () {
            if (doNotHide) {
                return false;
            }
            if ((!angular.isUndefined(vm.newUser.facebookId) && vm.newUser.facebookId && vm.newUser.facebookId != "")) {
                if (vm.newUser.email == '') {
                    doNotHide = true;
                    return false;
                } else {
                    return true;
                }
            }
            return false;
        };

        vm.isSocialRegister = function () {
            return !!((!angular.isUndefined(vm.newUser.facebookId) && vm.newUser.facebookId && vm.newUser.facebookId != ""));
        };

        vm.registerFormIsValid = function () {
            return !(!vm.newUser.firstName || !vm.newUser.lastName || !vm.newUser.email ||
            vm.newUser.password == '' || vm.newUser.password < 6 ||
            vm.passwordConfirm == '' || vm.newUser.password != vm.passwordConfirm || vm.registering || !vm.newUser.defaultAddress.address);
        };

        vm.loginFormIsValid = function () {
            return !(vm.loginUser.email == '' || vm.loginUser.password == '');
        };

        vm.userLogin = function () {
            if (vm.loginFormIsValid()) {
                networkService.login(vm.loginUser, succesLogin, errorLogin, true);
            } else {
                vm.formLoginError = true;
                alertMsg.send("Merci de vérifier les champs indiqués en rouge", "danger");
            }
        };

        function succesLogin(res) {
            if (res.token && res.token != "") {
                $localStorage.user = res;
                $localStorage.token = res.token;
                if (window.yakaRedirectUrl &&
                    window.location.href != window.yakaRedirectUrl) {
                    window.location.href = window.yakaRedirectUrl;
                    delete window.yakaRedirectUrl;
                } else {
                    if (window.recoProjectId) {
                        $state.go("project-recommend", {projectId: window.recoProjectId});
                    } else {
                        if ($localStorage.user && $localStorage.user.professional) {
                            $localStorage.$reset();
                            vm.notProUser();
                        } else {
                            vm.login.hide();
                            $state.go('dashboard');
                        }
                    }
                }
            }
        }

        function errorLogin(err) {
            if (err.error != undefined && err.error != "ERROR") {
                alertMsg.send($translate.instant(err.error), 'danger');
            } else {
                alertMsg.send("Impossible de se connecter", 'danger');
            }
        }

        vm.facebookLogin = function () {
            vm.socialNetwork = "Facebook";
            facebookConnectPlugin.login(["public_profile", "email"], function (res) {
                    if (res.authResponse.accessToken) {
                        var data = {
                            access_token: res.authResponse.accessToken
                        };
                        networkService.registerFacebookIonic(data, successIonicSocialLogin, errorIonicSocialLogin, true);
                    } else {
                        alertMsg.send("Impossible de se connecter via Facebook", 'danger');
                    }
                },
                errorIonicSocialLogin
            );
        };

        function successIonicSocialLogin(res) {
            if (res.token) {
                succesLogin(res);
            } else if (!angular.isUndefined(res.facebookId) && res.facebookId && res.facebookId != "") {
                vm.login.show();
                vm.loginTab = false;
                onPreRegisterOK(res);
            }
        }

        function errorIonicSocialLogin(res) {
            if (res.error == "ERROR_BAD_CREDENTIALS") {
                vm.noSocialAccountMessage = true;
                vm.login.show();
            } else if (res != undefined && res.error != undefined && res.error != "ERROR") {
                alertMsg.send($translate.instant(res.error), 'danger');
            } else {
                alertMsg.send("Impossible de se connecter via Facebook", 'danger');
            }
        }


        function onPreRegisterOK(user) {
            vm.newUser.firstName = user.firstName;
            vm.newUser.lastName = user.lastName;
            if (user.email != undefined) {
                vm.newUser.email = user.email.toLowerCase();
            }
            vm.newUser.facebookId = user.facebookId;
            vm.newUser.avatar = user.avatar;
        }

        vm.registering = false;

        vm.register = function () {
            if (vm.registerFormIsValid()) {
                if (vm.newUser.referral == 'REFERRAL_OTHER' && vm.referralOther) {
                    vm.newUser.referral = vm.referralOther;
                }
                vm.registering = true;
                networkService.register(vm.newUser, successRegister, failRegister, true);
            } else {
                vm.formRegisterError = true;
                alertMsg.send("Merci de vérifier les champs indiqués en rouge", "danger");
            }
        };

        function successRegister(res) {
            vm.registering = false;
            $localStorage.token = res.token;
            $localStorage.user = res;
            if ($localStorage.urlRedirect != undefined) {
                window.location.href = $localStorage.urlRedirect;
                delete $localStorage.urlRedirect;
            } else {
                vm.login.hide();
                $state.go('dashboard');
            }
        }

        function failRegister(err) {
            vm.registering = false;
            if (err.error != undefined && err.error != "ERROR") {
                alertMsg.send($translate.instant(err.error), 'danger');
            } else {
                alertMsg.send("Impossible de créer le compte", 'danger');
            }
        }

        vm.showForgottenPasswordPopup = false;

        vm.passwordForgottenMessageSent = false;

        vm.forgottenPasswordUser = {
            email: ""
        };

        vm.reinitializePassword = function () {
            if (vm.forgottenPasswordUser.email) {
                networkService.passwordForgottenPOST(vm.forgottenPasswordUser, successPasswordForgotten, failPasswordForgotten, true);
            } else {
                vm.formLostPasswordError = true;
                alertMsg.send("Merci de vérifier les champs indiqués en rouge", "danger");
            }
        };

        function successPasswordForgotten(res) {
            vm.passwordForgottenMessageSent = true;
        }

        function failPasswordForgotten(err) {
            alertMsg.send("Impossible de réinitialiser le mot de passe", 'danger');
        }

        /*
         networkService.publicProjectsToRecommendGET(function (projects) {
         vm.projectsToRecommend = projects;
         }, function (err) {
         alertMsg.send("Impossible de récupérer les projets", "danger");
         });
         */


        $scope.getLocation = function (val) {
            if (val.length == 5) {
                return $http.get(CONFIG.API_BASE_URL + '/localities/' + val).then(function (response) {
                    return response.data.map(function (item) {
                        return item.postalCode + " " + item.name;
                    });
                });
            }
        };

    }
})();
