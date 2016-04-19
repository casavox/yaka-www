(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('HomeController', HomeController);

    //
    //Controller login
    HomeController.$inject = ['$scope', '$rootScope', 'networkService', 'alertMsg', '$localStorage', '$state', '$translate', '$auth'];
    function HomeController($scope, $rootScope, networkService, alertMsg, $localStorage, $state, $translate, $auth) {
        var vm = this;

        $rootScope.showMenu = false;

        vm.showLoginPopup = false;

        vm.currentYear = new Date().getFullYear();

        vm.loginTab = true;

        vm.openPopup = function (showLoginTab) {
            vm.loginTab = showLoginTab;
            vm.showLoginPopup = true;
            canCloseMenu = false;
        };

        var canCloseMenu = false;

        vm.closePopup = function () {
            if (canCloseMenu) {
                vm.showLoginPopup = false;
            } else {
                canCloseMenu = true;
            }
        };

        vm.user = {
            password: "",
            profile: {
                email: "",
                firstName: "",
                lastName: ""
            },
            googleId: "",
            facebookId: ""
        };

        vm.loginUser = {
            password: "",
            profile: {
                email: ""
            }
        };

        vm.passwordConfirm = "";

        vm.isEmailValid = function (email) {
            return new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$").test(email);
        };

        vm.isNameValid = function (name) {
            if (name == undefined || name.length < 2 || !isNaN(name)) {
                return false;
            }
            return true;
        };

        var doNotHide = false;

        vm.needToHideEmail = function () {
            if (doNotHide) {
                return false;
            }
            if ((!angular.isUndefined(vm.user.googleId) && vm.user.googleId && vm.user.googleId != "") ||
                (!angular.isUndefined(vm.user.facebookId) && vm.user.facebookId && vm.user.facebookId != "")) {
                if (vm.user.profile.email == '') {
                    doNotHide = true;
                    return false;
                } else {
                    return true;
                }
            }
            return false;
        };

        vm.isSocialRegister = function () {
            if ((!angular.isUndefined(vm.user.googleId) && vm.user.googleId && vm.user.googleId != "") ||
                (!angular.isUndefined(vm.user.facebookId) && vm.user.facebookId && vm.user.facebookId != "")) {
                return true;
            }
            return false;
        };

        vm.registerFormIsValid = function () {
            if (vm.user.profile.firstName == '' || !vm.isNameValid(vm.user.profile.firstName) ||
                vm.user.profile.lastName == '' || !vm.isNameValid(vm.user.profile.lastName) ||
                vm.user.profile.email == '' || !vm.isEmailValid(vm.user.profile.email) ||
                vm.user.password == '' || vm.user.password < 6 ||
                vm.passwordConfirm == '' || vm.user.password != vm.passwordConfirm
            ) {
                return false;
            }
            return true;
        };

        vm.loginFormIsValid = function () {
            if (vm.loginUser.profile.email == '' || vm.loginUser.password == '') {
                return false;
            }
            return true;
        };

        vm.login = function () {
            console.log(vm.loginUser);
            networkService.login(vm.loginUser, succesLogin, errorLogin);
        };

        function errorLogin(err) {
            if (err.error != undefined && err.error != "ERROR") {
                alertMsg.send($translate.instant(err.error), 'danger');
            } else {
                alertMsg.send("Impossible de se connecter", 'danger');
            }
        }

        vm.googleLogin = function () {
            $auth.authenticate('googleLogin').then(succesLogin).catch(function (res) {
                console.log("catch", res);

                if (res.data != undefined && res.data.error != undefined && res.data.error != "ERROR") {
                    alertMsg.send($translate.instant(res.data.error), 'danger');
                } else {
                    alertMsg.send("Impossible de se connecter via Google", 'danger');
                }
            });
        };

        vm.facebookLogin = function () {
            $auth.authenticate('facebookLogin').then(succesLogin).catch(function (res) {
                console.log("catch", res);
                if (res.data != undefined && res.data.error != undefined && res.data.error != "ERROR") {
                    alertMsg.send($translate.instant(res.data.error), 'danger');
                } else {
                    alertMsg.send("Impossible de se connecter via Facebook", 'danger');
                }
            });
        };

        function succesLogin(res) {
            if (!angular.isUndefined(res.token) && res.token && res.token != "") {
                $localStorage.token = res.token;
                $state.go('dashboard');
                $rootScope.logmail = $scope.email;
                console.log(res);
            }
        }
    }
})();
