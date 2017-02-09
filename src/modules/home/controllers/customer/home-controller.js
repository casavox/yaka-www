(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('HomeController', HomeController);

    //
    //Controller login
    function HomeController($scope, $rootScope, networkService, alertMsg, $http, CONFIG, $localStorage, $state, $translate, $auth, $stateParams, screenSize) {

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

        if ($rootScope.isMobile) {
            vm.isMobile = true;
        }

        $rootScope.pageName = "";

        vm.jobs = [
            "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste",
            "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste",
            "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste",
            "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste",
            "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste",
            "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste",
            "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste",
            "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste",
            "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste",
            "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste",
            "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste",
            "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste",
            "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste",
            "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste",
            "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste",
            "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste",
            "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste",
            "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste",
            "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste",
            "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste",
            "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste",
            "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste",
            "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste",
            "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste",
            "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste",
            "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste",
            "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste",
            "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste",
            "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste",
            "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste",
            "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste",
            "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste",
            "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste",
            "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste",
            "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste", "électricien", "plombier", "chauffagiste", "menuisier", "serrurier", "peintre", "architecte", "paysagiste", "maçon", "cuisiniste", "couvreur", "charpentier", "terrassier", "pisciniste", "carreleur", "plaquiste"
        ];

        vm.showLoginPopup = false;
        vm.loginTab = true;

        if ($stateParams.login) {
            vm.showLoginPopup = true;
        }
        if ($stateParams.register) {
            vm.showLoginPopup = true;
            vm.loginTab = false;
        }

        vm.currentYear = new Date().getFullYear();

        vm.noSocialAccountMessage = false;

        vm.socialNetwork = "";

        vm.showRegisterFields = false;

        vm.openPopup = function (showLoginTab) {
            vm.loginTab = showLoginTab;
            vm.showLoginPopup = true;
        };

        vm.closePopup = function () {
            vm.showLoginPopup = false;
        };

        vm.newUser = {
            password: "",
            firstName: "",
            lastName: "",
            email: "",
            facebookId: "",
            defaultAddress: {
                address: ""
            },
            referral: "",
            recaptchaResponse: "",
            avatar: {
                cloudinaryPublicId: ""
            }
        };

        vm.loginUser = {
            password: "",
            email: ""
        };

        if ($stateParams.email) {
            vm.loginUser.email = $stateParams.email;
            vm.newUser.email = $stateParams.email;
        }

        vm.passwordConfirm = "";

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

        vm.isSocialRegister = function () {
            return !!((!angular.isUndefined(vm.newUser.facebookId) && vm.newUser.facebookId && vm.newUser.facebookId != ""));
        };

        vm.registerFormIsValid = function () {
            return !(!vm.newUser.firstName || !vm.newUser.lastName || !vm.newUser.email ||
            vm.newUser.password == '' || vm.newUser.password < 6 ||
            vm.passwordConfirm == '' || vm.newUser.password != vm.passwordConfirm || vm.registering ||
            !vm.newUser.defaultAddress.address || vm.newUser.defaultAddress.address.length < 6 || !vm.newUser.recaptchaResponse);
        };

        vm.loginFormIsValid = function () {
            return !(vm.loginUser.email == '' || vm.loginUser.password == '');
        };

        vm.login = function () {


            if (vm.loginFormIsValid()) {
                networkService.login(vm.loginUser, succesLogin, errorLogin, true);
            } else {
                vm.formLoginError = true;
                alertMsg.send("Merci de vérifier les champs indiqués en rouge", "danger");
            }
        };

        function succesLogin(res) {
            if (res.token && res.token != "") {
                $localStorage.user = res;
                $localStorage.token = res.token;
                if (window.yakaRedirectUrl &&
                    window.location.href != window.yakaRedirectUrl) {
                    window.location.href = window.yakaRedirectUrl;
                    delete window.yakaRedirectUrl;
                } else {
                    if (window.recoProjectId) {
                        $state.go("project-recommend", {projectId: window.recoProjectId});
                    } else {
                        if ($localStorage.user && $localStorage.user.professional) {
                            $state.go('pro-dashboard');
                        } else {
                            $state.go('dashboard');
                        }
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

        vm.facebookPreRegister = function () {
            vm.socialNetwork = "Facebook";
            $auth.authenticate('facebookRegister').then(function (res) {
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
                vm.newUser.email = user.email.toLowerCase();
            }
            vm.newUser.facebookId = user.facebookId;
            vm.newUser.avatar = user.avatar;
        }

        vm.registering = false;

        vm.register = function () {
            if (vm.registerFormIsValid()) {
                if (vm.newUser.referral == 'REFERRAL_OTHER' && vm.referralOther) {
                    vm.newUser.referral = vm.referralOther;
                }
                vm.registering = true;
                networkService.register(vm.newUser, successRegister, failRegister, true);
            } else {
                if (vm.newUser.defaultAddress.address.length < 6) {
                    vm.addressError = true;
                }
                vm.formRegisterError = true;
                alertMsg.send("Merci de vérifier les champs indiqués en rouge", "danger");
            }
        };

        function successRegister(res) {
            vm.registering = false;
            $localStorage.token = res.token;
            $localStorage.user = res;
            if ($localStorage.urlRedirect != undefined && !vm.isMobile) {
                window.location.href = $localStorage.urlRedirect;
                delete $localStorage.urlRedirect;
            } else {
                $state.go('dashboard');
            }
        }

        function failRegister(err) {
            vm.registering = false;
            if (err.error != undefined && err.error != "ERROR") {
                alertMsg.send($translate.instant(err.error), 'danger');
            } else {
                alertMsg.send("Impossible de créer le compte", 'danger');
            }
        }

        vm.showForgottenPasswordPopup = false;

        vm.passwordForgottenMessageSent = false;

        vm.forgottenPasswordUser = {
            email: ""
        };

        vm.forgottenPassword = function () {
            if (vm.forgottenPasswordUser.email) {
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

        /*
         networkService.publicProjectsToRecommendGET(function (projects) {
         vm.projectsToRecommend = projects;
         }, function (err) {
         alertMsg.send("Impossible de récupérer les projets", "danger");
         });
         */
        $(function () {
            $('.chart').easyPieChart({
                scaleColor: false,
                lineWidth: 5,
                lineCap: 'square',
                barColor: '#03a9f4',
                trackColor: '#ededed',
                size: 100,
                animate: 500
            });

            function showPieCharts() {
                if ($('.chart1').data('easyPieChart')) {
                    $('.chart1').data('easyPieChart').update(25);
                }
                setTimeout(function () {
                    if ($('.chart2').data('easyPieChart')) {
                        $('.chart2').data('easyPieChart').update(50);
                    }
                }, 500);
                setTimeout(function () {
                    if ($('.chart3').data('easyPieChart')) {
                        $('.chart3').data('easyPieChart').update(75);
                    }
                }, 1000);
                setTimeout(function () {
                    if ($('.chart4').data('easyPieChart')) {
                        $('.chart4').data('easyPieChart').update(100);
                    }
                }, 1500);
            }

            $.fn.isOnScreen = function () {
                var win = $(window);
                var viewport = {
                    top: win.scrollTop(),
                    left: win.scrollLeft()
                };
                viewport.right = viewport.left + win.width();
                viewport.bottom = viewport.top + win.height();
                var bounds = this.offset();
                bounds.right = bounds.left + this.outerWidth();
                bounds.bottom = bounds.top + this.outerHeight();
                return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
            };

            var pieChartsShown = false;
            var pieChartsShown1 = false;
            var pieChartsShown2 = false;
            var pieChartsShown3 = false;
            var pieChartsShown4 = false;


            $scope.$watch(function () {
                return document.readyState
            }, function (newValue, oldValue) {
                if (newValue == "complete") {
                    animateCircles();
                }
            });


            function animateCircles() {

                if (!screenSize.is('xs')) { //Desktop
                    $scope.$watch(function () {
                        return $('.chart1 div').isOnScreen();
                    }, function (newValue, oldValue) {
                        if (newValue && !pieChartsShown) {
                            pieChartsShown = true;
                            showPieCharts();
                        }
                    });
                } else {  //Mobile
                    $scope.$watch(function () {
                        return $('.chart1 div').isOnScreen();
                    }, function (newValue, oldValue) {
                        if (newValue && !pieChartsShown1) {
                            pieChartsShown1 = true;
                            $('.chart1').data('easyPieChart').update(25);
                        }
                    });

                    $scope.$watch(function () {
                        return $('.chart2 div').isOnScreen();
                    }, function (newValue, oldValue) {
                        if (newValue && !pieChartsShown2) {
                            pieChartsShown2 = true;
                            $('.chart2').data('easyPieChart').update(50);
                        }
                    });

                    $scope.$watch(function () {
                        return $('.chart3 div').isOnScreen();
                    }, function (newValue, oldValue) {
                        if (newValue && !pieChartsShown3) {
                            pieChartsShown3 = true;
                            $('.chart3').data('easyPieChart').update(75);
                        }
                    });
                    $scope.$watch(function () {
                        return $('.chart4 div').isOnScreen();
                    }, function (newValue, oldValue) {
                        if (newValue && !pieChartsShown4) {
                            pieChartsShown4 = true;
                            $('.chart4').data('easyPieChart').update(100);
                        }
                    });
                }
            }

        });

        vm.getLocation = function (val) {
            if (val.length == 5) {
                networkService.postalCodeGET(val, successPostalCodeGet, errorPostalCodeGet, true);
            }
        };

       function successPostalCodeGet (response) {
           vm.PostalCodeAndCities = response;
       }

        function errorPostalCodeGet (res) {
            alertMsg.send("impossible de récupérer les communes", "danger");
        }


        vm.onKeyPress = function (e) {
            if (e.keyCode < 48 && e.keyCode != 8 || e.keyCode > 57) {
                event.preventDefault();
            }
            if (vm.newUser.defaultAddress.address.length > 5 && e.keyCode == 8) {
                event.preventDefault();
                vm.newUser.defaultAddress.address = vm.newUser.defaultAddress.address.substring(0, 5);
            }
        };

    }
})();
