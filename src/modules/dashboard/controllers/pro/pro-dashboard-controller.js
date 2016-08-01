(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('ProDashboardController', ProDashboardController);

    function ProDashboardController($rootScope, $scope, networkService, $localStorage, $state, alertMsg, $translate, gmailContacts, CONFIG) {

        $rootScope.pageName = "Accueil";
        $rootScope.updateProfile();

        var vm = this;

        networkService.projectToRecommendGET(function (projects) {
            vm.projectsToRecommend = projects;
        }, function (err) {
            alertMsg.send("Impossible de récupérer les projets", "danger");
        });

        networkService.proDashboardDataGET(function (data) {
            vm.data = data;
        }, function (err) {
            alertMsg.send("Impossible de récupérer les données", "danger");
        });
    }
})
();
