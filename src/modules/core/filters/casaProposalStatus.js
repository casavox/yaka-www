angular.module('Yaka')
    .filter('casaProposalStatus', function () {
        return function (status) {
            switch (status) {
                case "RECOMMENDATION":
                    return "En attente de propositions";
                case "START":
                    return "En cours";
                case "SELECTED":
                    return "Sélectionné";
                case "RATE_PRO":
                    return "Evaluer Pro";
                case "COMPLETED":
                    return "Complet";
                case "PRO_DECLINED":
                    return "Annulé par le Pro";
                case "CUSTOMER_DECLINED":
                    return "Annulé par le Client";
                case "RECO_PRO_DECLINED":
                    return "Annulé par le Pro";
                case "RECO_CUSTOMER_DECLINED":
                    return "Annulé par le Client";
            }
        };
    });
