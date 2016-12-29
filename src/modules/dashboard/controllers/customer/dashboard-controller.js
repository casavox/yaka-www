(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('DashboardController', DashboardController);

    //
    //Controller login
    function DashboardController($rootScope, $scope, networkService, $localStorage, $state, alertMsg, $translate, gmailContacts, CONFIG) {

        if ($localStorage.user && $localStorage.user.professional) {
            $state.go("pro-dashboard");
        }

        if ($localStorage.invitationId) {
            $state.go("contacts");
        }

        $rootScope.pageName = "Accueil";
        $rootScope.updateProfile();

        var vm = this;

        networkService.projectsToRecommendGET(function (projects) {
            vm.projectsToRecommend = projects;
        }, function (err) {
            alertMsg.send("Oups ! une erreur s'est produite, merci de recharger la page depuis votre navigateur ('F5' ou 'cmd+R'), contactez le support CasaVox si nécessaire", "danger");
        });

        networkService.dashboardDataGET(function (data) {
            vm.data = data;
        }, function (err) {
            alertMsg.send("Oups ! une erreur s'est produite, merci de recharger la page depuis votre navigateur ('F5' ou 'cmd+R'), contactez le support CasaVox si nécessaire", "danger");
        });

        networkService.communitiesGET(successCommunitiesGET, errorCommunitiesGET);

        function successCommunitiesGET(res) {
            vm.communities = res;
        }

        vm.getCommunityByType = function (type) {
            if (vm.communities) {
                for (var i = 0; i < vm.communities.length; i++) {
                    if (type == vm.communities[i].type) {
                        if (!vm.communities[i].name && !vm.communities[i].address) {
                            vm.communities[i].name = " ";
                            vm.communities[i].address = " ";
                        }
                        return vm.communities[i];
                    }
                }
            }
        };

        function errorCommunitiesGET(res) {
            alertMsg.send("Impossible de récupérer les communautés", "danger");
        }

        networkService.projectsGET("ongoing", 1, 2147483647, successProjectsGET, errorProjectsGET);
        function successProjectsGET(res) {
            vm.userOnGoingProjectNumber = res.totalItemNumber;
        }

        function errorProjectsGET(res) {
        }

        vm.getUserchatsUnreadNumber = function () {
            var num = 0;
            if ($localStorage.user.userChats) {
                angular.forEach($localStorage.user.userChats, function (userChat) {
                    if (userChat.unreadMessages) {
                        num++;
                    }
                })
            }
            return num;
        };

        vm.showTopViewInvits = function () {
            if (!vm.data) {
                return false;
            }
            return vm.data.incomingInvitationNumber && vm.data.incomingInvitationNumber > 0;
        };

        vm.showTopViewUnreadMessages = function () {
            if (!vm.data) {
                return false;
            }
            return vm.getUserchatsUnreadNumber() > 0;
        };

        vm.showTopViewNoProject = function () {
            if (!vm.data) {
                return false;
            }
            return !vm.userOnGoingProjectNumber || vm.userOnGoingProjectNumber == 0;
        };

        vm.showTopViewNoContact = function () {
            if (!vm.data) {
                return false;
            }
            return !vm.data.contactsNumber || vm.data.contactsNumber == 0;
        };

        vm.recommandInfos = function () {
            swal({
                title: 'CLIQUEZ SUR "JE CONNAIS..."',
                text: '\nC\'est le bouche-à-oreille CasaVox !\nRecommandez directement vos artisans préférés à votre entourage et gagnez 10€ de chèques-cadeaux à chaque fois que le client suit votre recommandation.\n\nInvitez vos meilleurs Pros directement depuis le menu "Mon entourage".\nConsultez les détails dans les CGU.',
                confirmButtonColor: "#03a9f4",
                confirmButtonText: "FERMER"
            });
        }

        vm.displayActivity = function (codeactivity) {
            switch (codeactivity) {
                case "REN_500":
                    return "LE BON PRO";
                    break;
                case "ELE_1000":
                    return "UN ELECTRICIEN";
                    break;
                case "PLU_2000":
                    return "UN PLOMBIER";
                    break;
                case "HEA_3000":
                    return "UN CHAUFFAGISTE";
                    break;
                case "CAR_4000":
                    return "UN MENUISIER";
                    break;
                case "LOC_5000":
                    return "UN SERRURIER";
                    break;
                case "PAI_6000":
                    return "LE BON PRO";
                    break;
                case "WAL_7000":
                    return "LE BON PRO";
                    break;
                case "INS_8000":
                    return "LE BON PRO";
                    break;
                case "BAT_10100":
                    return "LE BON PRO";
                    break;
                case "KIT_10000":
                    return "UN CUISINISTE";
                    break;
                case "ROO_11000":
                    return "LE BON PRO";
                    break;
                case "GAT_12000":
                    return "LE BON PRO";
                    break;
                case "GAR_13000":
                    return "LE BON PRO";
                    break;
                case "COU_13900":
                    return "LE BON PRO";
                    break;
                case "CON_14000":
                    return "LE BON PRO";
                    break;
            }
        }
    }
})
();
