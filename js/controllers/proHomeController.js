(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('ProHomeController', ProHomeController);

    ProHomeController.$inject = ['$scope', '$rootScope', 'networkService', '$auth', 'alertMsg'];
    function ProHomeController($scope, $rootScope, networkService, $auth, alertMsg) {
        var vm = this;

        $rootScope.menu = true;

        vm.currentYear = new Date().getFullYear();

        vm.newUser = {
            password: "",
            profile: {
                email: ""
            },
            professional: {
                firstName: "",
                lastName: "",
                phoneNumber: "",
                activities: []
            },
            company: {
                address: {
                    postalCode: ""
                }
            },
            googleId: "",
            facebookId: ""
        };

        vm.passwordConfirm = "";

        vm.activities = "";

        vm.googlePreRegister = function () {
            $auth.authenticate('googlePreRegister').then(function (res) {
                if (!angular.isUndefined(res.data.token) && res.data.token && res.data.token != "") {
                    console.log(res);
                    onPreRegisterOK(res);
                }
            }).catch(function (res) {
                console.log("catch", res);
                alertMsg.send("Impossible de se connecter via Google", 'danger');
            });
        };

        vm.facebookPreRegister = function () {
            $auth.authenticate('facebook').then(function (res) {
                if (!angular.isUndefined(res.accessToken) && res.accessToken && res.accessToken != "") {
                    console.log(res);
                    onPreRegisterOK(res);
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

        function onPreRegisterOK(user) {
            vm.newUser.professional.firstName = user.firstName;
            vm.newUser.professional.lastName = user.lastName;
            vm.newUser.professional.googleId = user.googleId;
            vm.newUser.professional.facebookId = user.facebookId;
        }

        vm.registerUser = function() {
            console.log(vm.newUser);
        }

    }
})();
