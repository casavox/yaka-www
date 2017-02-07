angular.module('Yaka')
    .directive('casaPhoneToLinks', function ($q) {
        return {
            restrict: 'E',
            scope: {
                text: '=',
                author: '=',
                user: '='
            },
            link: function (scope) {

                var phoneNumberReg = /(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}/g;
                var textTmp = scope.text;

                if (textTmp.match(phoneNumberReg)) {
                    numberPhone = textTmp.match(phoneNumberReg)[0];
                    scope.text = textTmp.replace(phoneNumberReg, "<a class='underline' data-ng-class=\"{\'c-white\' : (author == \'CUSTOMER\' && user.professional) || (author == \'PRO\' && !user.professional)}\"  ng-href=\"tel:" + numberPhone + "\"><strong>" + numberPhone  + "</strong></a>");
                }
            },
            templateUrl: "modules/core/directives/views/casaPhoneLinks.html"

        }
    });

