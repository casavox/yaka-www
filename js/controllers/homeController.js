(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('HomeController', HomeController);

    //
    //Controller login
    HomeController.$inject = ['$scope', '$rootScope', 'networkService', 'alertMsg', '$localStorage', '$state', '$translate', '$auth', '$stateParams'];
    function HomeController($scope, $rootScope, networkService, alertMsg, $localStorage, $state, $translate, $auth, $stateParams) {

        console.log("invitationId : " + $stateParams.invitationId);
        if (!angular.isUndefined($stateParams.invitationId) && $stateParams.invitationId && $stateParams.invitationId != '') {
            $localStorage.invitationId = $stateParams.invitationId;
        }

        var vm = this;

        $rootScope.showMenu = false;

        vm.jobs = [
            "plombier",
            "électricien",
            "maçon",
            "couvreur",
            "maçon",
            "plombier",
            "électricien",
            "maçon",
            "couvreur",
            "maçon",
            "plombier",
            "électricien",
            "maçon",
            "couvreur",
            "maçon",
            "plombier",
            "électricien",
            "maçon",
            "couvreur",
            "maçon",
            "plombier",
            "électricien",
            "maçon",
            "couvreur",
            "maçon",
            "plombier",
            "électricien",
            "maçon",
            "couvreur",
            "maçon",
            "plombier",
            "électricien",
            "maçon",
            "couvreur",
            "maçon"
        ];

        vm.showLoginPopup = false;

        vm.currentYear = new Date().getFullYear();

        vm.noSocialAccountMessage = false;

        vm.loginTab = true;

        vm.socialNetwork = "";

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
            profile: {
                email: ""
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
            return !(name == undefined || name.length < 2 || !isNaN(name));

        };

        var doNotHide = false;

        vm.needToHideEmail = function () {
            if (doNotHide) {
                return false;
            }
            if ((!angular.isUndefined(vm.newUser.googleId) && vm.newUser.googleId && vm.newUser.googleId != "") ||
                (!angular.isUndefined(vm.newUser.facebookId) && vm.newUser.facebookId && vm.newUser.facebookId != "")) {
                if (vm.newUser.profile.email == '') {
                    doNotHide = true;
                    return false;
                } else {
                    return true;
                }
            }
            return false;
        };

        vm.isSocialRegister = function () {
            return !!((!angular.isUndefined(vm.newUser.googleId) && vm.newUser.googleId && vm.newUser.googleId != "") ||
            (!angular.isUndefined(vm.newUser.facebookId) && vm.newUser.facebookId && vm.newUser.facebookId != ""));

        };

        vm.registerFormIsValid = function () {
            return !(vm.newUser.firstName == '' || !vm.isNameValid(vm.newUser.firstName) ||
            vm.newUser.lastName == '' || !vm.isNameValid(vm.newUser.lastName) ||
            vm.newUser.profile.email == '' || !vm.isEmailValid(vm.newUser.profile.email) ||
            vm.newUser.password == '' || vm.newUser.password < 6 ||
            vm.passwordConfirm == '' || vm.newUser.password != vm.passwordConfirm);
        };

        vm.loginFormIsValid = function () {
            return !(vm.loginUser.profile.email == '' || vm.loginUser.password == '');

        };

        vm.login = function () {
            console.log(vm.loginUser);
            networkService.login(vm.loginUser, succesLogin, errorLogin);
        };

        function succesLogin(res) {
            if (!angular.isUndefined(res.token) && res.token && res.token != "") {
                $localStorage.token = res.token;
                networkService.me(function (res) {
                    $localStorage.user = res;
                    console.log(res);
                    if (angular.isUndefined(res.professional)) {
                        $localStorage.user.type = 'customer';
                        $state.go('dashboard');
                    } else if (angular.isDefined(res.professional)) {
                        $localStorage.user.type = 'pro';
                        $state.go('prodashboard');
                    }

                }, function (res) {
                    alertMsg.send('Error: impossilbe to get your profile');
                });
                $rootScope.logmail = $scope.email;
                console.log(res);
            }
        }

        function errorLogin(err) {
            if (err.error != undefined && err.error != "ERROR") {
                alertMsg.send($translate.instant(err.error), 'danger');
            } else {
                alertMsg.send("Impossible de se connecter", 'danger');
            }
        }

        vm.googleLogin = function () {
            vm.socialNetwork = "Google";
            $auth.authenticate('googleLogin').then(function (res) {
                console.log(res);
                if (!angular.isUndefined(res.data.token) && res.data.token && res.data.token != "") {
                    $localStorage.token = res.data.token;
                    $state.go('dashboard');
                    $rootScope.logmail = $scope.email;
                }
            }).catch(function (res) {
                console.log("catch", res);

                if (res.data.error == "ERROR_BAD_CREDENTIALS") {
                    vm.noSocialAccountMessage = true;
                } else if (res.data != undefined && res.data.error != undefined && res.data.error != "ERROR") {
                    alertMsg.send($translate.instant(res.data.error), 'danger');
                } else {
                    alertMsg.send("Impossible de se connecter via Google", 'danger');
                }
            });
        };

        vm.facebookLogin = function () {
            vm.socialNetwork = "Facebook";
            $auth.authenticate('facebookLogin').then(function (res) {
                console.log(res);
                if (!angular.isUndefined(res.data.token) && res.data.token && res.data.token != "") {
                    $localStorage.token = res.data.token;
                    $state.go('dashboard');
                    $rootScope.logmail = $scope.email;
                }
            }).catch(function (res) {
                console.log("catch", res);
                if (res.data.error == "ERROR_BAD_CREDENTIALS") {
                    vm.noSocialAccountMessage = true;
                } else if (res.data != undefined && res.data.error != undefined && res.data.error != "ERROR") {
                    alertMsg.send($translate.instant(res.data.error), 'danger');
                } else {
                    alertMsg.send("Impossible de se connecter via Facebook", 'danger');
                }
            });
        };

        vm.googlePreRegister = function () {
            vm.socialNetwork = "Google";
            $auth.authenticate('googleRegister').then(function (res) {
                console.log(res);
                if (!angular.isUndefined(res.data.googleId) && res.data.googleId && res.data.googleId != "") {
                    onPreRegisterOK(res.data);
                }
            }).catch(function (res) {
                console.log("catch", res);

                if (res.data != undefined && res.data.error != undefined && res.data.error != "ERROR") {
                    alertMsg.send($translate.instant(res.data.error), 'danger');
                } else {
                    alertMsg.send("Impossible de se connecter via Google", 'danger');
                }
            });
        };

        vm.facebookPreRegister = function () {
            vm.socialNetwork = "Facebook";
            $auth.authenticate('facebookRegister').then(function (res) {
                console.log(res);
                if (!angular.isUndefined(res.data.facebookId) && res.data.facebookId && res.data.facebookId != "") {
                    onPreRegisterOK(res.data);
                }
            }).catch(function (res) {
                console.log("catch", res);
                if (res.data != undefined && res.data.error != undefined && res.data.error != "ERROR") {
                    alertMsg.send($translate.instant(res.data.error), 'danger');
                } else {
                    alertMsg.send("Impossible de se connecter via Facebook", 'danger');
                }
            });
        };

        function onPreRegisterOK(user) {
            vm.newUser.firstName = user.firstName;
            vm.newUser.lastName = user.lastName;
            if (user.profile.email != undefined) {
                vm.newUser.profile.email = user.profile.email;
            }
            vm.newUser.googleId = user.googleId;
            vm.newUser.facebookId = user.facebookId;
        }

        vm.register = function () {
            if (vm.registerFormIsValid) {

                if (!angular.isUndefined($localStorage.invitationId) && $localStorage.invitationId && $localStorage.invitationId != '') {
                    vm.newUser.invitationId = $localStorage.invitationId;
                }

                networkService.register(vm.newUser, successRegister, failRegister);
            }
        };

        function successRegister(res) {
            console.log(res);
            $localStorage.token = res.token;
            $localStorage.invitationId = '';
            $state.go('dashboard');
        }

        function failRegister(err) {
            console.log(err);
            if (err.error != undefined && err.error != "ERROR") {
                alertMsg.send($translate.instant(err.error), 'danger');
            } else {
                alertMsg.send("Impossible de créer le compte", 'danger');
            }
        }
    }
})();
