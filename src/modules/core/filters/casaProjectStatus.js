angular.module('Yaka')
    .filter('casaProjectStatus', function () {
        return function (status) {
            switch (status) {
                case "ONGOING_WAITING_FOR_PROPOSITIONS":
                    return "En attente de propositions";
                case "ONGOING_PROPOSITIONS_RECEIVED":
                    return "Proposition reçue";
                case "ONGOING_PROJECT_ONGOING":
                    return "En cours";
                case "ONGOING_RATE_PRO":
                    return "Evaluer Pro";
                case "COMPLETED":
                    return "Complet";
                case "CANCELED":
                    return "Annulé";
            }
        };
    });
