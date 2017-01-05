(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('ProHomeController', ProHomeController);

    function ProHomeController($scope, $rootScope, networkService, $auth, alertMsg, $translate, $localStorage, $state, smoothScroll, $stateParams, $http, CONFIG) {

        if ($stateParams.invitationId) {
            $localStorage.invitationId = $stateParams.invitationId;
        }

        if ($stateParams.projectId) {
            $localStorage.projectShortId = $stateParams.projectId;
        }

        if ($localStorage.token && $localStorage.token != '') {
            if ($localStorage.user && $localStorage.user.professional) {
                $state.go('pro-dashboard');
            } else {
                $state.go('dashboard');
            }
        }

        var vm = this;

        $rootScope.pageName = "Accès Pro";

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
            facebookId: "",
            referral: "",
            recaptchaResponse: "",
            avatar: {
                cloudinaryPublicId: ""
            }
        };

        if ($stateParams.email) {
            vm.newUser.email = $stateParams.email;
        }

        vm.passwordConfirm = "";

        vm.phoneNumber = "";

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
                buttonDefaultText: "Principaux domaines d'intervention",
                dynamicButtonTextSuffix: "domaine(s) d'intervention"
            },
            options: [
                {id: 0, label: "REN_500"},
                {id: 1, label: "ELE_1000"},
                {id: 2, label: "PLU_2000"},
                {id: 3, label: "HEA_3000"},
                {id: 4, label: "CAR_4000"},
                {id: 5, label: "LOC_5000"},
                {id: 6, label: "PAI_6000"},
                {id: 7, label: "WAL_7000"},
                {id: 8, label: "INS_8000"},
                {id: 9, label: "BAT_10100"},
                {id: 10, label: "KIT_10000"},
                {id: 11, label: "ROO_11000"},
                {id: 12, label: "GAT_12000"},
                {id: 13, label: "GAR_13000"},
                {id: 14, label: "COU_13900"},
                {id: 15, label: "CON_14000"}
            ],
            selected: []
        };

        angular.forEach(vm.multiChoiceInput.options, function (value) {
            value.labelTranslated = $translate.instant('ACTIVITY_' + value.label);
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
            return !!((!angular.isUndefined(vm.newUser.facebookId) && vm.newUser.facebookId && vm.newUser.facebookId != ""));

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

        vm.getSocialServiceName = function () {
            if (!angular.isUndefined(vm.newUser.facebookId) && vm.newUser.facebookId && vm.newUser.facebookId != "") {
                return "Facebook";
            } else {
                return "";
            }
        };

        vm.facebookPreRegister = function () {
            $auth.authenticate('facebookProRegister').then(function (res) {
                if (res.data.token) {
                    succesLogin(res.data);
                } else if (!angular.isUndefined(res.data.facebookId) && res.data.facebookId && res.data.facebookId != "") {
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
            vm.newUser.lastName == '' || !vm.isNameValid(vm.newUser.lastName) || !vm.newUser.professional.phoneNumber ||
            vm.newUser.email == '' || !vm.isEmailValid(vm.newUser.email) ||
            vm.newUser.password == '' || vm.newUser.password < 6 ||
            vm.passwordConfirm == '' || vm.newUser.password != vm.passwordConfirm ||
            vm.newUser.professional.activities.length == 0 ||
            vm.newUser.professional.company.address.address == undefined || vm.newUser.professional.company.address.address == '' || !vm.newUser.recaptchaResponse);
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

        vm.deleteErrorIfSelected = function () {
            $('button.dropdown-toggle.btn.btn-default').removeClass('c-red');
        };

        vm.registerUser = function () {
            if (vm.formIsValid()) {
                if (vm.newUser.referral == 'REFERRAL_OTHER' && vm.referralOther) {
                    vm.newUser.referral = vm.referralOther;
                }
                networkService.proRegister(vm.newUser, successProRegister, failProRegister, true);
            } else {
                vm.formRegisterError = true;
                alertMsg.send("Merci de vérifier les champs indiqués en rouge", "danger");
            }
        };

        function successProRegister(res) {
            $localStorage.token = res.token;
            $localStorage.user = res;
            $state.go("help", {'card': 'tuto'});
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

        if ($stateParams.email) {
            vm.loginUser.email = $stateParams.email;
        }

        vm.showLoginPopup = false

        if ($stateParams.login) {
            vm.showLoginPopup = true;
        }
        if ($stateParams.register) {
            vm.smoothScrollRegister();
        }

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
            if (!vm.loginUser.email || !vm.loginUser.password) {
                vm.formProLoginError = true;
                alertMsg.send("Merci de vérifier les champs indiqués en rouge", "danger");
            } else {
                networkService.login(vm.loginUser, succesLogin, errorLogin, true);
            }
        };

        function succesLogin(res) {
            if (!angular.isUndefined(res.token) && res.token && res.token != "") {
                $localStorage.user = res;
                $localStorage.token = res.token;
                if (window.yakaRedirectUrl &&
                    window.location.href != window.yakaRedirectUrl) {
                    window.location.href = window.yakaRedirectUrl;
                    delete window.yakaRedirectUrl;
                } else {
                    if ($localStorage.user && $localStorage.user.professional) {
                        $state.go('pro-dashboard');
                    } else {
                        $state.go('dashboard');
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

        $scope.getLocation = function(val) {
            if(val.length == 5) {
                return $http.get(CONFIG.API_BASE_URL + '/localities/' + val).then(function(response){
                    return response.data.map(function(item){
                        return item.postalCode + " " + item.name;
                    });
                });
            }
        };
    }
})
();
