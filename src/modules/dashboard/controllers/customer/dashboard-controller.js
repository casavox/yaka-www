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
            return vm.getUserchatsUnreadNumber() > 0;
        };

        vm.showTopViewNoProject = function () {
            return !vm.userOnGoingProjectNumber || vm.userOnGoingProjectNumber == 0;
        };

        vm.showTopViewNoContact = function () {
            return !vm.data.contactsNumber || vm.data.contactsNumber == 0;
        };

    }
})
();
