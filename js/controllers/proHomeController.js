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

        vm.isSocialRegister = function () {
            if ((!angular.isUndefined(res.data.googleId) && res.data.googleId && res.data.googleId != "") ||
                (!angular.isUndefined(res.data.facebookId) && res.data.facebookId && res.data.facebookId != "")) {
                return true;
            }
            return false;
        };

        vm.googlePreRegister = function () {
            $auth.authenticate('googlePreRegister').then(function (res) {
                console.log(res);
                if (!angular.isUndefined(res.data.googleId) && res.data.googleId && res.data.googleId != "") {
                    onPreRegisterOK(res.data);
                }
            }).catch(function (res) {
                console.log("catch", res);
                alertMsg.send("Impossible de se connecter via Google", 'danger');
            });
        };

        vm.facebookPreRegister = function () {
            $auth.authenticate('facebook').then(function (res) {
                console.log(res);
                if (!angular.isUndefined(res.data.facebookId) && res.data.facebookId && res.data.facebookId != "") {
                    onPreRegisterOK(res.data);
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
            console.log("onPreRegisterOK");
            vm.newUser.professional.firstName = user.profile.firstName;
            vm.newUser.professional.lastName = user.profile.lastName;
            vm.newUser.profile.email = user.profile.email;
            vm.newUser.googleId = user.googleId;
            vm.newUser.facebookId = user.facebookId;
        }

        vm.registerUser = function () {
            console.log(vm.newUser);
        }

    }
})();
