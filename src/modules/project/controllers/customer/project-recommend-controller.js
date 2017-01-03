(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('ProjectRecommendController', ProjectRecommendController);

    //
    //Controller login
    function ProjectRecommendController($scope, $localStorage, $state, networkService, alertMsg, CONFIG, $http, Upload, cloudinary, $filter, $stateParams, Lightbox, $rootScope, uiGmapGoogleMapApi, modalService, $translate, $location, $anchorScroll, smoothScroll) {

        if (angular.isUndefined($stateParams.projectId) || !$stateParams.projectId) {
            $state.go("home");
        }

        $rootScope.updateProfile();
        var vm = this;

        vm.user = $localStorage.user;

        networkService.projectRecommendGET($stateParams.projectId,
            function (project) {
                vm.project = project;
                $rootScope.pageName = vm.project.title;
            }, function (err) {
                alertMsg.send("Impossible de récupérer le projet", "danger");
            }
        );

        networkService.projectRecommendMyProsGET($stateParams.projectId,
            function (professionals) {
                vm.professionals = professionals;
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

        vm.getExperienceYearNumber = function () {
            if (vm.selectedProfessional && vm.selectedProfessional.activityStartedYear) {
                return (new Date().getFullYear() - vm.selectedProfessional.activityStartedYear) + 1;
            }
            return " - ";
        };

        vm.invitPro = {
            email: "",
            name: "",
            phone: "",
            activities: [],
            postalCode: ""
        };

        vm.autocomplete = {
            options: {
                types: ['(cities)'],
                componentRestrictions: {country: 'fr'}
            }
        };

        vm.multiChoiceInput = {
            settings: {
                showCheckAll: false,
                showUncheckAll: false,
                scrollable: true,
                scrollableHeight: 265,
                displayProp: "labelTranslated",
                closeOnBlur: true,
                buttonClasses: 'multiChoiceInputColor'
            },
            translation: {
                checkAll: "Tout sélectionner",
                uncheckAll: "Tout désélectionner",
                selectionCount: "choisis",
                searchPlaceholder: "Rechercher...",
                buttonDefaultText: "Préciser ses compétences",
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
                {id: 8, label: "BAT_10100"},
                {id: 9, label: "KIT_10000"},
                {id: 10, label: "ROO_11000"},
                {id: 11, label: "GAT_12000"},
                {id: 12, label: "GAR_13000"},
                {id: 13, label: "COU_13900"},
                {id: 14, label: "CON_14000"},
                {id: 15, label: "REN_500"}
            ],
            selected: []
        };

        vm.updateMultiChoiceInputColor = {
            onItemSelect: function (item) {
                $(".multiChoiceInputColor").css("color", "#2196f3");
            }, onItemDeselect: function (item) {
                if (!vm.multiChoiceInput.selected.length || vm.multiChoiceInput.selected.length == 0) {
                    $(".multiChoiceInputColor").css("color", "red");
                }
            }
        };

        angular.forEach(vm.multiChoiceInput.options, function (value) {
            value.labelTranslated = $translate.instant('ACTIVITY_' + value.label);
        });

        vm.formIsValid = function () {

            return (vm.invitPro.name &&
                vm.invitPro.email
            );
        };

        vm.isEmailValid = function (email) {
            return new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,99}$").test(email);
        };

        vm.sendProInvit = function () {
            if (!vm.invitPro.name || !vm.invitPro.address.postalCode || !vm.invitPro.email) {
                vm.formProRecoInvitError = true;
                alertMsg.send("Merci de vérifier les champs indiqués en rouge", "danger");
            } else {
                if (!vm.isEmailValid(vm.invitPro.email)) {
                    vm.formProInvitEmailError = true;
                    alertMsg.send("L'email que vous souhaitez ajouter n'est pas valide", "danger");
                } else {
                    networkService.recommendAndInviteProPOST(vm.project.id, vm.invitPro, function (res) {
                        vm.formProRecoInvitError = false;
                        vm.invitPro = {
                            email: "",
                            name: "",
                            phone: "",
                            activities: [],
                            postalCode: ""
                        };
                        vm.phoneNumber = "";
                        vm.multiChoiceInput.selected = [];
                        vm.closeProPopup();
                        if ($localStorage.user && $localStorage.user.professional) {
                            $state.go('pro-dashboard');
                        } else {
                            $state.go('dashboard');
                        }
                        swal({
                            title: "C'est fait !",
                            text: "Ce professionnel vient d'être invité à rejoindre vos contacts, un résumé du projet de travaux lui à également été envoyé.",
                            type: "success",
                            showConfirmButton: true,
                            confirmButtonColor: "#03a9f4",
                            confirmButtonText: "Fermer"
                        });
                    }, function (err) {
                        alertMsg.send("Impossible d'envoyer l'invitation", 'danger');
                    }, true);
                }
            }
        };

        vm.showInvitProPopup = false;

        vm.openProPopup = function () {
            vm.showInvitProPopup = true;
        };

        vm.closeProPopup = function () {
            vm.showInvitProPopup = false;
        };

        vm.recommendMsg = {
            text: ""
        };

        vm.recommendPro = function (proId) {
            networkService.recommendProForProjectPOST(vm.project.id, proId, vm.recommendMsg, function (res) {
                if ($localStorage.user && $localStorage.user.professional) {
                    $state.go('pro-dashboard');
                } else {
                    $state.go('dashboard');
                }
                swal({
                    title: "C'est fait !",
                    text: "Votre recommandation a été envoyée !",
                    type: "success",
                    showConfirmButton: true,
                    confirmButtonColor: "#03a9f4",
                    confirmButtonText: "Fermer"
                });
            }, function (err) {
                alertMsg.send("Impossible de recommander ce professionnel", 'danger');
            }, true);
        };

        var scrollOptions = {
            containerId: 'pro-container'
        };

        vm.smoothScrollPro = function () {
            var element = document.getElementById('pro');
            smoothScroll(element, scrollOptions);
        };

        vm.optionSelected = function () {
            if (vm.user.professional) {
                return 'COLLEAGUE';
            } else {
                return 'CLIENT';
            }
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

        vm.inviteBySms = function(invited) {
            swal({
                title: "Envoyer l'invitation par SMS",
                text: "Etes-vous sûr ?",
                type: "info",
                html: true,
                showCancelButton: true,
                confirmButtonColor: "#03a9f4",
                confirmButtonText: "Oui",
                cancelButtonText: "Non"
            }, function (isConfirm) {
                if (isConfirm) {
                    var ua = navigator.userAgent.toLowerCase();
                    var url;
                    if (ua.indexOf("iphone") > -1 || ua.indexOf("ipad") > -1) {

                        // Todo Compléter message SMS
                        url = "sms:&body=Coucou Iphone :)";
                    } else {
                        url = "sms:?body=Coucou Android :)";
                    }
                    location.href = url;
                }
            });
        };
    }
})();
