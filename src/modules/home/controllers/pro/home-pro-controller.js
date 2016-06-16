(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('ProHomeController', ProHomeController);

    function ProHomeController($scope, $rootScope, networkService, $auth, alertMsg, $translate, $localStorage, $state, smoothScroll, $stateParams) {

        if ($localStorage.token && $localStorage.token != '') {
            if ($localStorage.user && $localStorage.user.professional) {
                $state.go('prodashboard');
            } else {
                $state.go('my-projects');
            }
        }

        if (!angular.isUndefined($stateParams.invitationId) && $stateParams.invitationId && $stateParams.invitationId != '') {
            $localStorage.invitationId = $stateParams.invitationId;
        }

        var vm = this;

        $rootScope.pageName = "Accès Pro";
        $rootScope.showMenu = false;

        vm.currentYear = new Date().getFullYear();

        vm.newUser = {
            password: "",
            email: "",
            professional: {
                company: {
                    address: {
                        address: ""
                    }
                },
                phoneNumber: "",
                activities: []
            },
            firstName: "",
            lastName: "",
            googleId: "",
            facebookId: "",
            avatar: {
                cloudinaryPublicId: ""
            }
        };

        vm.passwordConfirm = "";

        vm.phoneNumber = "";

        vm.isPhoneNumberValid = false;

        vm.multiChoiceInput = {
            settings: {
                showCheckAll: false,
                showUncheckAll: false,
                scrollable: true,
                scrollableHeight: 265,
                displayProp: "labelTranslated"
            },
            translation: {
                checkAll: "Tout sélectionner",
                uncheckAll: "Tout désélectionner",
                selectionCount: "choisis",
                searchPlaceholder: "Rechercher...",
                buttonDefaultText: "Domaines d'intervention",
                dynamicButtonTextSuffix: "domaine(s) d'intervention"
            },
            options: [
                {id: 0, label: "ELE_1000"},
                {id: 1, label: "PLU_2000"},
                {id: 2, label: "HEA_3000"},
                {id: 3, label: "CAR_4000"},
                {id: 4, label: "LOC_5000"},
                {id: 5, label: "PAI_6000"},
                {id: 6, label: "WAL_7000"},
                {id: 7, label: "INS_8000"},
                {id: 8, label: "COU_9000"},
                {id: 9, label: "KIT_10000"},
                {id: 10, label: "ROO_11000"},
                {id: 11, label: "GAT_12000"},
                {id: 12, label: "GAR_13000"},
                {id: 13, label: "CON_14000"}
            ],
            selected: []
        };

        angular.forEach(vm.multiChoiceInput.options, function (value) {
            value.labelTranslated = $translate.instant('ACTIVITY_' + value.label);
        });

        $('#proRegisterPhone').intlTelInput({
            utilsScript: "https://cdn.rawgit.com/jackocnr/intl-tel-input/master/build/js/utils.js",
            initialCountry: "fr",
            onlyCountries: ["fr"]
            //DOM-TOM : onlyCountries: ["fr", "mq", "gf", "re", "yt", "pm", "bl", "mf", "tf", "wf", "pf", "nc"]
        });
        $('#proRegisterPhone').blur(function () {
            if ($.trim($('#proRegisterPhone').val())) {
                if ($('#proRegisterPhone').intlTelInput("isValidNumber")) {
                    vm.newUser.professional.phoneNumber = $('#proRegisterPhone').intlTelInput("getNumber");
                }
            }
        });
        $('#proRegisterPhone').keyup(function (e) {
            var code = (e.keyCode || e.which);

            if (code == 37 || code == 38 || code == 39 || code == 40) {
                return;
            }

            if ($.trim($('#proRegisterPhone').val())) {
                if ($('#proRegisterPhone').intlTelInput("isValidNumber")) {
                    vm.isPhoneNumberValid = true;
                } else {
                    vm.isPhoneNumberValid = false;
                }
                vm.phoneNumber = $('#proRegisterPhone').val();
                vm.phoneNumber = vm.phoneNumber.replace(/\D/g, '');
                vm.phoneNumber = addCharEveryNChar(vm.phoneNumber, 2, ' ');
                if (vm.phoneNumber.length > 14) {
                    vm.phoneNumber = vm.phoneNumber.substring(0, 14);
                }
                $('#proRegisterPhone').val(vm.phoneNumber);
                $scope.$apply();
            }
        });

        function addCharEveryNChar(str, n, char) {
            var ret = [];
            var i;
            var len;

            for (i = 0, len = str.length; i < len; i += n) {
                ret.push(str.substr(i, n));
            }

            return ret.join(char);
        }

        vm.autocomplete = {
            options: {
                types: ['(cities)'],
                componentRestrictions: {country: 'fr'}
            }
        };

        vm.isSocialRegister = function () {
            return !!((!angular.isUndefined(vm.newUser.googleId) && vm.newUser.googleId && vm.newUser.googleId != "") ||
            (!angular.isUndefined(vm.newUser.facebookId) && vm.newUser.facebookId && vm.newUser.facebookId != ""));

        };

        var doNotHide = false;

        vm.needToHideEmail = function () {
            if (doNotHide) {
                return false;
            }
            if ((!angular.isUndefined(vm.newUser.googleId) && vm.newUser.googleId && vm.newUser.googleId != "") ||
                (!angular.isUndefined(vm.newUser.facebookId) && vm.newUser.facebookId && vm.newUser.facebookId != "")) {
                if (vm.newUser.email == '') {
                    doNotHide = true;
                    return false;
                } else {
                    return true;
                }
            }
            return false;
        };

        vm.getSocialServiceName = function () {
            if (!angular.isUndefined(vm.newUser.googleId) && vm.newUser.googleId && vm.newUser.googleId != "") {
                return "Google";
            } else if (!angular.isUndefined(vm.newUser.facebookId) && vm.newUser.facebookId && vm.newUser.facebookId != "") {
                return "Facebook";
            } else {
                return "";
            }
        };

        vm.googlePreRegister = function () {
            $auth.authenticate('googleProRegister').then(function (res) {
                if (!angular.isUndefined(res.data.googleId) && res.data.googleId && res.data.googleId != "") {
                    onPreRegisterOK(res.data);
                }
            }).catch(function (res) {
                if (res.data != undefined && res.data.error != undefined && res.data.error != "ERROR") {
                    alertMsg.send($translate.instant(res.data.error), 'danger');
                } else {
                    alertMsg.send("Impossible de se connecter via Google", 'danger');
                }
            });
        };

        vm.facebookPreRegister = function () {
            $auth.authenticate('facebookProRegister').then(function (res) {
                if (!angular.isUndefined(res.data.facebookId) && res.data.facebookId && res.data.facebookId != "") {
                    onPreRegisterOK(res.data);
                }
            }).catch(function (res) {
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
            if (user.email != undefined) {
                vm.newUser.email = user.email;
            }
            vm.newUser.googleId = user.googleId;
            vm.newUser.facebookId = user.facebookId;
            vm.newUser.avatar = user.avatar;
        }

        vm.isEmailValid = function (email) {
            return new RegExp("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,99}").test(email);
        };

        vm.isNameValid = function (name) {
            return !(name == undefined || name.length < 2 || !isNaN(name));

        };

        vm.formIsValid = function () {
            vm.newUser.professional.activities = angular.copy(vm.multiChoiceInput.selected);
            angular.forEach(vm.newUser.professional.activities, function (activity) {
                activity.code = vm.multiChoiceInput.options[activity.id].label;
                delete activity.id;
            });

            return !(vm.newUser.firstName == '' || !vm.isNameValid(vm.newUser.firstName) ||
            vm.newUser.lastName == '' || !vm.isNameValid(vm.newUser.lastName) || !$('#proRegisterPhone').intlTelInput("isValidNumber") || vm.newUser.professional.phoneNumber == '' ||
            vm.newUser.email == '' || !vm.isEmailValid(vm.newUser.email) ||
            vm.newUser.password == '' || vm.newUser.password < 6 ||
            vm.passwordConfirm == '' || vm.newUser.password != vm.passwordConfirm ||
            vm.newUser.professional.activities.length == 0 ||
            vm.newUser.professional.company.address.address == undefined || vm.newUser.professional.company.address.address == '');
        };

        var scrollOptions = {
            containerId: 'main-scroll-container'
        };

        vm.smoothScrollRegister = function () {
            var element = document.getElementById('registerForm');
            smoothScroll(element, scrollOptions);
        };

        vm.smoothScrollAbout = function () {
            var element = document.getElementById('about');
            smoothScroll(element, scrollOptions);
        };

        vm.registerUser = function () {
            if (vm.formIsValid()) {

                networkService.proRegister(vm.newUser, successProRegister, failProRegister);
            }
        };

        function successProRegister(res) {
            $localStorage.token = res.token;
            if ($localStorage.user && $localStorage.user.professional) {
                $state.go('prodashboard');
            } else {
                $state.go('my-projects');
            }
        }

        function failProRegister(err) {
            if (err.error != undefined && err.error != "ERROR") {
                alertMsg.send($translate.instant(err.error), 'danger');
            } else {
                alertMsg.send("Impossible de créer le compte", 'danger');
            }
        }

        /* Login */

        vm.loginUser = {
            password: "",
            email: ""
        };

        vm.showLoginPopup = false;

        vm.openPopup = function () {
            vm.showLoginPopup = true;
        };

        vm.closePopup = function () {
            vm.showLoginPopup = false;
        };

        vm.loginFormIsValid = function () {
            return !(vm.loginUser.email == '' || vm.loginUser.password == '');

        };

        vm.login = function () {
            networkService.login(vm.loginUser, succesLogin, errorLogin);
        };

        function succesLogin(res) {
            if (!angular.isUndefined(res.token) && res.token && res.token != "") {
                $localStorage.user = res;
                $localStorage.token = res.token;
                if (window.yakaRedirectUrl != undefined) {
                    window.location.href = window.yakaRedirectUrl;
                    delete window.yakaRedirectUrl;
                } else {
                    if ($localStorage.user && $localStorage.user.professional) {
                        $state.go('prodashboard');
                    } else {
                        $state.go('my-projects');
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

        vm.googleLogin = function () {
            vm.socialNetwork = "Google";
            $auth.authenticate('googleLogin').then(function (res) {
                succesLogin(res.data);
            }).catch(function (res) {
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
                succesLogin(res.data);
            }).catch(function (res) {
                if (res.data.error == "ERROR_BAD_CREDENTIALS") {
                    vm.noSocialAccountMessage = true;
                } else if (res.data != undefined && res.data.error != undefined && res.data.error != "ERROR") {
                    alertMsg.send($translate.instant(res.data.error), 'danger');
                } else {
                    alertMsg.send("Impossible de se connecter via Facebook", 'danger');
                }
            });
        };

        /* Forgot password */

        vm.showForgottenPasswordPopup = false;

        vm.passwordForgottenMessageSent = false;

        vm.forgottenPasswordUser = {
            email: ""
        };

        vm.forgottenPassword = function () {
            if (vm.isEmailValid(vm.forgottenPasswordUser.email)) {
                networkService.passwordForgottenPOST(vm.forgottenPasswordUser, successPasswordForgotten, failPasswordForgotten);
            }
        };

        function successPasswordForgotten(res) {
            vm.passwordForgottenMessageSent = true;
        }

        function failPasswordForgotten(err) {
            alertMsg.send("Impossible de réinitialiser le mot de passe", 'danger');
        }
    }
})
();