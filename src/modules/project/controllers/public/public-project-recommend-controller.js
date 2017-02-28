(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('PublicProjectRecommendController', PublicProjectRecommendController);

    function PublicProjectRecommendController($scope, $localStorage, $state, networkService, alertMsg, Upload, cloudinary, $filter, $stateParams, Lightbox, $rootScope, uiGmapGoogleMapApi, modalService, $translate, $auth) {

        if (!$stateParams.projectId) {
            $state.go("home");
        }

        if ($localStorage.user) {
            $state.go("project-recommend", {'projectId': $stateParams.projectId});
        }

        var vm = this;

        networkService.publicProjectRecommendGET($stateParams.projectId,
            function (project) {
                vm.project = project;
                $rootScope.pageName = vm.project.title;
            }, function (err) {
                alertMsg.send("Impossible de récupérer le projet", "danger");
            }
        );

        vm.getWhen = function () {
            if (!vm.project) {
                return "";
            }
            switch (vm.project.desiredDatePeriod) {
                case "SPECIFIC":
                    return "À partir du " + moment(vm.project.desiredDate).format("D MMMM");
                case "WITHIN_A_MONTH":
                    return "Dans le mois (avant le " + moment(vm.project.desiredDate).format("D MMMM") + ")";
                case "NONE":
                    return 'Dès que possible';
            }
        };

        vm.invitPro = {
            email: "",
            firstName: "",
            lastName: "",
            phone: "",
            activities: [],
            address: {}
        };

        angular.forEach(vm.multiChoiceInput.options, function (value) {
            value.labelTranslated = $translate.instant('ACTIVITY_' + value.label);
        });



        vm.sendProInvit = function () {
            console.log("sendProInvit");
            networkService.recommendAndInviteProPOST(vm.project.id, vm.invitPro, function (res) {
                vm.invitPro = {
                    email: "",
                    firstName: "",
                    lastName: "",
                    phone: "",
                    activities: [],
                    address: {}
                };
                vm.phoneNumber = "";
                vm.multiChoiceInput.selected = [];
                if ($localStorage.user && $localStorage.user.professional) {
                    $state.go('pro-dashboard');
                } else {
                    $state.go('dashboard');
                }
                swal({
                    title: "C'est fait !",
                    text: "Ce professionnel vient d'être invité à rejoindre vos contacts, un résumé du projet lui à également été envoyé.",
                    type: "success",
                    showConfirmButton: true,
                    confirmButtonColor: "#03a9f4",
                    confirmButtonText: "Fermer"
                });
            }, function (err) {
                alertMsg.send("Impossible d'envoyer l'invitation", 'danger');
            }, true);
        };

        vm.recommendMsg = {
            text: ""
        };

        vm.newUser = {
            password: "",
            firstName: "",
            lastName: "",
            email: "",
            googleId: "",
            facebookId: "",
            defaultAddress: {
                address: ""
            },
            recaptchaResponse: "",
            avatar: {
                cloudinaryPublicId: ""
            }
        };

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

        vm.isSocialRegister = function () {
            return !!((!angular.isUndefined(vm.newUser.googleId) && vm.newUser.googleId && vm.newUser.googleId != "") ||
            (!angular.isUndefined(vm.newUser.facebookId) && vm.newUser.facebookId && vm.newUser.facebookId != ""));

        };

        vm.registerFormIsValid = function () {
            return !(!vm.newUser.firstName || !vm.newUser.lastName || !vm.newUser.email ||
            vm.newUser.password == '' || vm.newUser.password < 6 ||
            vm.passwordConfirm == '' || vm.newUser.password != vm.passwordConfirm || vm.registering || !vm.newUser.defaultAddress.address || !vm.newUser.recaptchaResponse);
        };


        vm.googlePreRegister = function () {
            vm.socialNetwork = "Google";
            $auth.authenticate('googleRegister').then(function (res) {
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
            vm.socialNetwork = "Facebook";
            $auth.authenticate('facebookRegister').then(function (res) {
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
                vm.newUser.email = user.email.toLowerCase();
            }
            vm.newUser.googleId = user.googleId;
            vm.newUser.facebookId = user.facebookId;
            vm.newUser.avatar = user.avatar;
        }

        vm.registering = false;

        vm.register = function () {
            if (vm.registerFormIsValid()) {
                vm.registering = true;
                networkService.register(vm.newUser, successRegister, failRegister, true);
            } else {
                vm.formPublicRecoError = true;
                alertMsg.send("Merci de vérifier les champs indiqués en rouge", "danger");
            }
        };

        function successRegister(res) {
            vm.registering = false;
            $localStorage.token = res.token;
            $localStorage.user = res;
            vm.sendProInvit();
        }

        function failRegister(err) {
            vm.registering = false;
            if (err.error != undefined && err.error != "ERROR") {
                alertMsg.send($translate.instant(err.error), 'danger');
            } else {
                alertMsg.send("Impossible de créer le compte", 'danger');
            }
        }
    }
})();
