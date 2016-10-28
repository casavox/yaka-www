(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('HomeController', HomeController);

    //
    //Controller login
    function HomeController($scope, $rootScope, networkService, alertMsg, $localStorage, $state, $translate, $auth, $stateParams) {

        if ($stateParams.invitationId) {
            $localStorage.invitationId = $stateParams.invitationId;
        }

        if ($localStorage.token && $localStorage.token != '') {
            if ($localStorage.user && $localStorage.user.professional) {
                $state.go('pro-dashboard');
            } else {
                $state.go('dashboard');
            }
        }

        var vm = this;

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

        vm.loginFormIsValid = function () {
            return !(vm.loginUser.email == '' || vm.loginUser.password == '');
        };

        vm.login = function () {
            if (vm.loginFormIsValid()) {
                networkService.login(vm.loginUser, succesLogin, errorLogin, true);
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
            }
        };

        function successRegister(res) {
            vm.registering = false;
            $localStorage.token = res.token;
            $localStorage.user = res;
            if ($localStorage.urlRedirect != undefined) {
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
            }
        };

        function successPasswordForgotten(res) {
            vm.passwordForgottenMessageSent = true;
        }

        function failPasswordForgotten(err) {
            alertMsg.send("Impossible de réinitialiser le mot de passe", 'danger');
        }

        networkService.publicProjectsToRecommendGET(function (projects) {
            vm.projectsToRecommend = projects;
        }, function (err) {
            alertMsg.send("Impossible de récupérer les projets", "danger");
        });

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
                $('.chart1').data('easyPieChart').update(25);
                setTimeout(function () {
                    $('.chart2').data('easyPieChart').update(50);
                }, 500);
                setTimeout(function () {
                    $('.chart3').data('easyPieChart').update(75);
                }, 1500);
                setTimeout(function () {
                    $('.chart4').data('easyPieChart').update(100);
                }, 2400);
            }

            $(function () {
                var oTop = $('.chart').offset().top - window.innerHeight + 90;
                $(window).scroll(function () {

                    var pTop = $('body').scrollTop();
                    console.log(pTop + ' - ' + oTop);   //just for your debugging
                    if (pTop > oTop) {
                        showPieCharts();
                    }
                });
            });


        });

    }
})();
