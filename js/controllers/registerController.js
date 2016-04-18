(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('RegisterController', RegisterController);

    //
    //Controller login
    RegisterController.$inject = ['$rootScope', '$scope', 'networkService', 'socialNetworkService', '$filter', '$localStorage', '$state'];
    function RegisterController($rootScope, $scope, networkService, socialNetworkService, $filter, $localStorage, $state) {

        $rootScope.showMenu = false;

        $scope.email = "";
        $scope.password = "";
        $scope.password2 = "";
        $scope.firstName = "";
        $scope.lastName = "";
        $scope.error = {
            email: {flag: false, message: ""},
            password: {flag: false, message: ""},
            password2: {flag: false, message: ""},
            first: {flag: false, message: ""},
            last: {flag: false, message: ""}
        };

        $scope.passwordVerification = function () {
            if ($scope.password == $scope.password2) {
                $scope.verification = "border-green";
            }
            else {
                $scope.verification = "border-red";
            }
        };

        $scope.register = function () {
            if ($scope.email && $scope.password && $scope.firstName && $scope.lastName) {
                var formData = {
                    profile: {
                        email: $scope.email,
                        firstName: $scope.firstName,
                        lastName: $scope.lastName,
                        birthday: $filter('date')($scope.date, "yyyy-MM-dd")
                    },
                    password: $scope.password
                };
                networkService.register(formData, succesRegister, errorRegister);
            }
            else {
                if (!$scope.email) {
                    $scope.error.email.flag = true;
                    $scope.error.email.message = "Please enter an email";
                } else {
                    $scope.error.email.flag = false;
                    $scope.error.email.message = "Please enter an email";
                }
                if (!$scope.password) {
                    $scope.error.password.flag = true;
                    $scope.error.password.message = "Please enter a password";
                }
                else {
                    $scope.error.password.flag = false;
                    $scope.error.password.message = "Please enter a password";
                }
                if (!$scope.firstName) {
                    $scope.error.first.flag = true;
                    $scope.error.first.message = "Please enter your firstName";
                }
                else {
                    $scope.error.first.flag = false;
                    $scope.error.first.message = "Please enter your firstName";
                }
                if (!$scope.lastName) {
                    $scope.error.last.flag = true;
                    $scope.error.last.message = "Please enter your lastName";
                }
                else {
                    $scope.error.last.flag = false;
                    $scope.error.last.message = "Please enter your lastName";
                }
            }
        };


        function succesRegister(res) {
            if (!angular.isUndefined(res.token) && res.token && res.token != "") {
                $localStorage.token = res.token;
                $state.go('dashboard');
                console.log(res);
            }
        }

        function errorRegister(err) {
            if (!angular.isUndefined(err) && err && err.message && err.message != "")
                console.log(err.message);
        }

    }
})();
