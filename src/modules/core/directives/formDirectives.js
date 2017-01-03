angular.module('Yaka')

    .directive('yakaInputEmail', function ($q) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attr, ngModel) {

                ngModel.$asyncValidators.invalidEmail = function (modelValue, viewValue) {
                    var email = viewValue;
                    var deferred = $q.defer();

                    if (email && email != '') {
                        if (!new RegExp("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,99}").test(email)) {
                            deferred.reject();
                        }
                    }

                    deferred.resolve();
                    return deferred.promise;
                }
            }
        }
    })

    .directive('casaInputWebsite', function ($q) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attr, ngModel) {

                ngModel.$asyncValidators.invalidWebsite = function (modelValue, viewValue) {
                    var website = viewValue;
                    var deferred = $q.defer();

                    if (website && website != '') {
                        if (!new RegExp("((https?):\/\/)?([w|W]{3}\.)+[a-zA-Z0-9\-\.]{3,}\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$").test(website)) {
                            deferred.reject();
                        }
                    }

                    deferred.resolve();
                    return deferred.promise;
                }
            }
        }
    })

    .directive('yakaInputName', function ($q) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attr, ngModel) {

                ngModel.$asyncValidators.invalidName = function (modelValue, viewValue) {
                    var name = viewValue;
                    var deferred = $q.defer();

                    if (name && name != '') {
                        if (name.length < 2) {
                            deferred.reject();
                        }
                    }

                    deferred.resolve();
                    return deferred.promise;
                }
            }
        }
    })

    .directive('yakaInputPhone', function ($q, $filter, $browser) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attr, ngModel) {

                var listener = function () {
                    var value = element.val().replace(/[^0-9]/g, '');
                    element.val($filter('tel')(value, false));
                };

                // This runs when we update the text field
                ngModel.$parsers.push(function (viewValue) {
                    return viewValue.replace(/[^0-9]/g, '').slice(0, 10);
                });

                // This runs when the model gets updated on the scope directly and keeps our view in sync
                ngModel.$render = function () {
                    element.val($filter('tel')(ngModel.$viewValue, false));
                };

                element.bind('change', listener);
                element.bind('keydown', function (event) {
                    var key = event.keyCode;
                    if (key == 91 || (15 < key && key < 19)) {
                        return;
                    }
                    $browser.defer(listener);
                });

                element.bind('paste cut', function () {
                    $browser.defer(listener);
                });

                ngModel.$asyncValidators.invalidPhone = function (modelValue, viewValue) {
                    var phone = viewValue;
                    var deferred = $q.defer();

                    if (phone && phone != '') {
                        if (phone.length != 14 || !element.intlTelInput("isValidNumber")) {
                            deferred.reject();
                        }
                    }

                    deferred.resolve();
                    return deferred.promise;
                };

                element.attr('maxlength', '14');

                element.intlTelInput({
                    utilsScript: "https://cdn.rawgit.com/jackocnr/intl-tel-input/master/build/js/utils.js",
                    initialCountry: "fr",
                    onlyCountries: ["fr"]
                });

            }
        }
    })


    .filter('tel', function () {
        return function (tel) {
            if (!tel) {
                return '';
            }

            var value = tel.toString().trim().replace(/^\+/, '');

            if (value.match(/[^0-9]/)) {
                return tel;
            }

            if (value) {
                if (value.length > 2) {
                    value = value.slice(0, 2) + ' ' + value.slice(2);
                }
                if (value.length > 5) {
                    value = value.slice(0, 5) + ' ' + value.slice(5);
                }
                if (value.length > 8) {
                    value = value.slice(0, 8) + ' ' + value.slice(8);
                }
                if (value.length > 11) {
                    value = value.slice(0, 11) + ' ' + value.slice(11);
                }

                return value.trim();
            }

        };
    })

    .directive('yakaInputSiret', function ($q) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attr, ngModel) {

                ngModel.$asyncValidators.invalidSiret = function (modelValue, viewValue) {
                    var siret = viewValue;
                    var deferred = $q.defer();

                    if (siret && siret != '') {
                        if (!isSiretValid(siret)) {
                            deferred.reject();
                        }
                    }

                    deferred.resolve();
                    return deferred.promise;
                };

                function isSiretValid(siret) {
                    var estValide;
                    if ((siret.length != 14) || (isNaN(siret)))
                        estValide = false;
                    else {
                        //~ Donc le SIRET est un numérique à 14 chiffres
                        //~ Les 9 premiers chiffres sont ceux du SIREN (ou RCS), les 4 suivants
                        //~ correspondent au numéro d'établissement
                        //~ et enfin le dernier chiffre est une clef de LUHN.
                        var somme = 0;
                        var tmp;
                        for (var cpt = 0; cpt < siret.length; cpt++) {
                            if ((cpt % 2) == 0) { //~ Les positions impaires : 1er, 3è, 5è, etc...
                                tmp = siret.charAt(cpt) * 2; //~ On le multiplie par 2
                                if (tmp > 9)
                                    tmp -= 9;	//~ Si le résultat est supérieur à 9, on lui soustrait 9
                            }
                            else
                                tmp = siret.charAt(cpt);

                            somme += parseInt(tmp);
                        }

                        if ((somme % 10) == 0)
                            estValide = true; //~ Si la somme est un multiple de 10 alors le SIRET est valide
                        else
                            estValide = false;
                    }
                    return estValide;
                }
            }
        }
    })

    .directive('yakaInputNumbersOnly', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attr, ngModelCtrl) {
                function fromUser(text) {
                    if (text) {
                        var transformedInput = text.replace(/[^0-9]/g, '');

                        if (transformedInput !== text) {
                            ngModelCtrl.$setViewValue(transformedInput);
                            ngModelCtrl.$render();
                        }
                        return transformedInput;
                    }
                    return undefined;
                }

                ngModelCtrl.$parsers.push(fromUser);
            }
        };
    })

    .directive('convertToNumber', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                ngModel.$parsers.push(function (val) {
                    return parseInt(val, 10);
                });
                ngModel.$formatters.push(function (val) {
                    return '' + val;
                });
            }
        }
    })

    .directive('ngPlaceholder', function ($document) {
        return {
            restrict: 'A',
            scope: {
                placeholder: '=ngPlaceholder'
            },
            link: function (scope, elem, attr) {
                scope.$watch('placeholder', function () {
                    elem[0].placeholder = scope.placeholder;
                });
            }
        }
    });
