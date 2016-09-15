angular.module('Yaka')
    .filter('casaProfessionalDoc', function () {
        return function (status) {
            switch (status) {
                case "BUSINESS_REGISTRATION":
                    return "Siret";
                case "INSURANCE":
                    return "Assurance";
                case "RGE":
                    return "Certification";
                case "PARTNER":
                    return "Partenaire";
            }
        };
    });
