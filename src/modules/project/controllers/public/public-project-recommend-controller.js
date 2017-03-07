(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('PublicProjectRecommendController', PublicProjectRecommendController);

    function PublicProjectRecommendController($scope, $localStorage, $state, networkService, alertMsg, Upload, cloudinary, $filter, $stateParams, Lightbox, $rootScope, uiGmapGoogleMapApi, modalService, $translate, $auth) {

        window.scrollTo(0, 0);

        if (!$stateParams.projectId) {
            $state.go("home");
            return;
        }

        if ($localStorage.user) {
            $state.go("project-recommend", {'projectId': $stateParams.projectId});
            return;
        }

        var vm = this;

        networkService.publicProjectRecommendGET($stateParams.projectId,
            function (project) {
                vm.project = project;
                $rootScope.pageName = vm.project.title;
            }, function (err) {
                alertMsg.send("Impossible de récupérer le projet", "danger");
                $state.go("pro-home");
                return;
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

        vm.recommendationData = {
            toName: "",
            toEmail: "",
            fromName: "",
            fromEmail: "",
            fromMessage: ""
        };

        vm.isEmailValid = function (email) {
            return new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,99}$").test(email);
        };

        vm.sendPublicRecoByEmail = function () {
            if (!vm.recommendationData.toName || !vm.recommendationData.toEmail || !vm.recommendationData.fromName || !vm.recommendationData.fromEmail) {
                vm.formProRecoInvitError = true;
                var errorText = "";
                if (!vm.isEmailValid(vm.recommendationData.fromEmail)) {
                    vm.formProInvitEmailError = true;
                    errorText = "Votre email n'est pas valide.<br>";
                }
                if (!vm.isEmailValid(vm.recommendationData.toEmail)) {
                    vm.formProInvitEmailError = true;
                    errorText += "L'email du Pro n'est pas valide.<br>";
                }

                alertMsg.send(errorText + "Merci de vérifier tous les champs en rouge !", "danger");

            } else {
                networkService.publicProjectRecommendPOST(vm.project.id, vm.recommendationData, function (res) {
                    vm.formProRecoInvitError = false;
                    vm.recommendationData = {
                        toName: "",
                        toEmail: "",
                        fromName: "",
                        fromEmail: "",
                        fromMessage: ""
                    };
                    swal({
                        title: "C'est fait !",
                        text: "Un résumé de ce projet de travaux a été envoyé au Pro, merci !",
                        type: "success",
                        showConfirmButton: true,
                        confirmButtonColor: "#03a9f4",
                        confirmButtonText: "Fermer"
                    });
                    $state.go('pro-home');
                }, function (err) {
                    alertMsg.send("Impossible d'envoyer la recommandation, vérifiez votre saisie et votre connection internet puis réessayer, si le problème persiste contactez le support", 'danger');
                }, true);

            }
        };

        vm.sendPublicRecoBySms = function (invited) {
            var ua = navigator.userAgent.toLowerCase();
            var url;
            if (ua.indexOf("iphone") > -1 || ua.indexOf("ipad") > -1) {
                url = "sms:&body=" + getSmsBody();
            } else {
                url = "sms:?body=" + getSmsBody();
            }
            location.href = url;
        };

        function getSmsBody() {
            return "Bonjour, j'ai vu sur CasaVox.com/pro un chantier qui pourrait t'intéresser, '"
                + vm.project.title + "' "
                + "à " + vm.project.address.locality + " (" + vm.project.address.postalCode + "),"
                + " tu peux voir directement le détail ici : " + vm.getInviteProUrl();
        }

        vm.getInviteProUrl = function () {
            if (vm.project) {
                return window.location.hostname + "/p/" + vm.project.shortId;
            }
        }

        vm.goUpState = function () {
            $state.go("public-project-proposal", {'projectId': $stateParams.projectId});
            return;
        }
    }
})();
