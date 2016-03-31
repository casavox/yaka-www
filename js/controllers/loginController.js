(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('LoginController', LoginController);

    //
    //Controller login
    LoginController.$inject = ['$scope', 'networkService', 'socialNetworkService', '$localStorage', '$state', '$rootScope', '$auth', 'alertMsg']
    function LoginController($scope, networkService, socialNetworkService, $localStorage, $state, $rootScope, $auth, alertMsg) {

        $scope.email = "";
        $scope.password = "";
        $scope.error = {email: {flag: false, message: ""}, password: {flag: false, message: ""}};
        if (angular.isUndefined($localStorage.token) == false && $localStorage.token)
            delete $localStorage.token;

        $scope.pressEnter = function (event) {
            if (event.keyCode == 13)
                $scope.login();
        }

        $scope.login = function () {
            if ($scope.email && $scope.password) {
                var formData = {
                    profile: {email: $scope.email},
                    password: $scope.password
                }
                networkService.login(formData, succesLogin, errorLogin);
            }
            else {
                if (!$scope.email) {
                    $scope.error.email.flag = true;
                    $scope.error.email.message = "Please enter an email";
                }
                else {
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
            }
        };

        $scope.FLogin = function () {
            var formData = {
                profile: {email: $scope.email},
                password: $scope.password
            }
            socialNetworkService.login(succesFLogin, errorFLogin);
        };


        $scope.authenticate = function (provider) {
            $auth.authenticate(provider).then(function (res) {
                if (!angular.isUndefined(res.data.token) && res.data.token && res.data.token != "") {
                    $localStorage.token = res.data.token;
                    if ($rootScope.newProject) {
                        if ($rootScope.newProject.type == "small")
                            networkService.projectSMALLPOST(formData, succesProjectsPOST, errorProjectsPOST);
                        else {
                            networkService.projectEMERGENCYPOST(formData, succesProjectsPOST, errorProjectsPOST);
                        }
                    }
                    else {
                        $state.go('dashboard');
                        console.log(res);
                    }
                }
            }).catch(function (res) {
                console.log("catch", res);
            });
        };

        function succesLogin(res) {
            if (!angular.isUndefined(res.token) && res.token && res.token != "") {
                $localStorage.token = res.token;
                if ($rootScope.newProject) {
                    if ($rootScope.newProject.type == "small")
                        networkService.projectSMALLPOST($rootScope.newProject, succesProjectsPOST, errorProjectsPOST);
                    else {
                        networkService.projectEMERGENCYPOST($rootScope.newProject, succesProjectsPOST, errorProjectsPOST);
                    }
                }
                else {
                    $state.go('dashboard');
                    console.log(res);
                }
            }
        };

        function succesProjectsPOST(err) {
            $state.go("end-project")
        };

        function errorProjectsPOST(err) {
            $state.go("dashboard");
        };

        function errorLogin(err) {
            alertMsg.send("La combinaison login/mot de passe n'existe pas.", 'danger');
        };

        function succesFLogin(res) {
            if (!angular.isUndefined(res.token) && res.token && res.token != "") {
                $localStorage.token = res.token;
                if ($rootScope.newProject) { // if create project and log just after.
                    if ($rootScope.newProject.type == "small")
                        networkService.projectSMALLPOST(formData, succesProjectsPOST, errorProjectsPOST);
                    else {
                        networkService.projectEMERGENCYPOST(formData, succesProjectsPOST, errorProjectsPOST);
                    }
                }
                else {
                    $state.go('dashboard');
                    console.log(res);
                }
            }
        };

        function errorFLogin(err) {
            console.log(err.message);
            // call alertMSg error danger-theme
        };

    }
})();
