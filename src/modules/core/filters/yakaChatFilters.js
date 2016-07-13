angular.module('Yaka')
    .filter('yakaAutoMsg', function ($filter) {
        return function (autoMessage, customerUser, proUser) {

            switch (autoMessage.text) {
                case 'PRO_PRICE_UPDATED':
                    return proUser.firstName + " " + proUser.lastName + " a modifié sa proposition de prix à " + autoMessage.varPrice + " €";
                case 'PRO_DATE_UPDATED':
                    return proUser.firstName + " " + proUser.lastName + " a modifié sa date d'intervention au " + $filter('date')(autoMessage.varDate, 'dd/MM/yyyy');
                case 'CUSTOMER_DATE_UPDATED':
                    return customerUser.firstName + " " + customerUser.lastName + " a modifié la date souhaitée de début de chantier au " + $filter('date')(autoMessage.varDate, 'dd/MM/yyyy');
                case 'CUSTOMER_ADDRESS_UPDATED':
                    return customerUser.firstName + " " + customerUser.lastName + " a modifié l'addresse du chantier au " + autoMessage.varAddress;
                case 'CUSTOMER_DESCRIPTION_UPDATED':
                    return customerUser.firstName + " " + customerUser.lastName + " a modifié la description du projet";
                case 'CUSTOMER_PHOTOS_UPDATED':
                    return customerUser.firstName + " " + customerUser.lastName + " a modifié les photos du projet";
                case 'CUSTOMER_DECLINE_PROPOSAL':
                    return "La proposition n'a pas été retenue par " + customerUser.firstName + " " + customerUser.lastName;
                case 'CUSTOMER_SELECTED_PRO':
                    return proUser.firstName + " " + proUser.lastName + " embauché pour ce projet !";
                case 'CUSTOMER_RATED_PRO':
                    return customerUser.firstName + " " + customerUser.lastName + " a indiqué la fin des travaux";
                default :
                    return '';
            }
        };
    })
    .filter('yakaAutoMsgIcon', function () {
        return function (autoMessage) {
            switch (autoMessage.text) {
                case 'PRO_PRICE_UPDATED':
                    return 'zmdi-money-box';
                case 'PRO_DATE_UPDATED':
                case 'CUSTOMER_DATE_UPDATED':
                    return 'zmdi-calendar';
                case 'CUSTOMER_ADDRESS_UPDATED':
                    return 'zmdi-pin';
                case 'CUSTOMER_DESCRIPTION_UPDATED':
                    return 'zmdi-assignment';
                case 'CUSTOMER_PHOTOS_UPDATED':
                    return 'zmdi-collection-image';
                case 'CUSTOMER_DECLINE_PROPOSAL':
                    return 'zmdi-close-circle-o';
                case 'CUSTOMER_SELECTED_PRO':
                    return 'zmdi-account-calendar';
                case 'CUSTOMER_RATED_PRO':
                    return 'zmdi-assignment-check';
                default :
                    return '';
            }
        };
    });
