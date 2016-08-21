angular.module('Yaka')
    .filter('casaProfessionalStatus', function () {
        return function (status) {
            switch (status) {
                case "REGISTERED":
                    return "Incomplet";
                case "WAITING":
                    return "En attente";
                case "REFUSED":
                    return "Refusé";
                case "VALIDATED":
                    return "Validé";
                case "COMPLETED":
                    return "Complet";
            }
        };
    });
