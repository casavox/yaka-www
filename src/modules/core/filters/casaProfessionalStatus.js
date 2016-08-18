angular.module('Yaka')
    .filter('casaProfessionalStatus', function () {
        return function (status) {
            switch (status) {
                case "REGISTERED":
                    return "Incomplet";
                    break;
                case "WAITING":
                    return "En attente";
                    break;
                case "REFUSED":
                    return "Refusé";
                    break;
                case "VALIDATED":
                    return "Validé";
                    break;
                case "COMPLETED":
                    return "Complet";
            }
        };
    });
