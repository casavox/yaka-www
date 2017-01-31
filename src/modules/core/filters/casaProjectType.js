angular.module('Yaka')
    .filter('casaProjectType', function () {
        return function (status) {
            switch (status) {
                case "REN_500":
                    return "Multitravaux";
                case "ELE_1000":
                    return "Travaux d'électricité";
                case "PLU_2000":
                    return "Travaux de plomberie";
                case "HEA_3000":
                    return "Travaux de chauffage-Climatisation";
                case "CAR_4000":
                    return "Travaux de menuiserie";
                case "LOC_5000":
                    return "Travaux de serrurerie";
                case "PAI_6000":
                    return "Travaux revêtement-sol-peinture";
                case "WAL_7000":
                    return "Pose de cloison-plafond-combles";
                case "INS_8000":
                    return "Travaux d'isolation";
                case "BAT_10100":
                    return "Travaux dans une salle de bain";
                case "KIT_10000":
                    return "Travaux dans une cuisine";
                case "ROO_11000":
                    return "Travaux de Toiture-Charpente";
                case "GAT_12000":
                    return "Portail-Porte de garage";
                case "GAR_13000":
                    return "Jardin-Terrasse-Clôture";
                case "COU_13900":
                    return "Conseil-Architecte-Paysagiste";
                case "CON_14000":
                    return "Construction-Gros d'oeuvre";
            }
        };
    });
