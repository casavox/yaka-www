(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('ProjectRecommendController', ProjectRecommendController);

    //
    //Controller login
    function ProjectRecommendController($scope, $localStorage, $state, networkService, alertMsg, Upload, cloudinary, $filter, $stateParams, Lightbox, $rootScope, uiGmapGoogleMapApi, modalService, $translate) {

        if ($localStorage.user && $localStorage.user.professional) {
            $state.go("home");
        }

        if (angular.isUndefined($stateParams.projectId) || !$stateParams.projectId) {
            $state.go("home");
        }

        $rootScope.updateProfile();
        var vm = this;

        networkService.projectRecommendGET($stateParams.projectId,
            function (project) {
                vm.project = project;
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
            firstName: "",
            lastName: "",
            phone: "",
            activities: [],
            address: {}
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
                closeOnBlur: true
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

        vm.formIsValid = function () {
            vm.invitPro.activities = angular.copy(vm.multiChoiceInput.selected);
            angular.forEach(vm.invitPro.activities, function (activity) {
                activity.code = vm.multiChoiceInput.options[activity.id].label;
                delete activity.id;
            });

            return (vm.invitPro.firstName &&
                vm.invitPro.lastName &&
                vm.invitPro.phone &&
                vm.invitPro.email &&
                vm.invitPro.activities.length > 0 &&
                vm.invitPro.relation &&
                vm.invitPro.address.address
            );
        };

        vm.sendProInvit = function () {
            networkService.inviteProPOST(vm.invitPro, function (res) {
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
                swal({
                    title: "C'est fait !",
                    text: "Ce professionnel vient d'être invité à rejoindre vos contacts, un résumé du projet lui à également été envoyé.",
                    type: "success",
                    showConfirmButton: true,
                    confirmButtonColor: "#03a9f4",
                    confirmButtonText: "Fermer"
                }, function () {
                    $state.go('dashboard');
                });
            }, function (err) {
                alertMsg.send("Impossible d'envoyer l'invitation", 'danger');
            });
        };

        vm.showInvitProPopup = false;

        vm.openProPopup = function () {
            vm.showInvitProPopup = true;
        };

        vm.closeProPopup = function () {
            vm.showInvitProPopup = false;
        };

    }
})();
