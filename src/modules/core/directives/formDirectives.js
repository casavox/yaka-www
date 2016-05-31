angular.module('Yaka')

    .directive('yakaInputEmail', function ($q) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attr, ngModel) {

                console.log("HELLO !!!!");

                ngModel.$asyncValidators.invalidEmail = function (modelValue, viewValue) {
                    var email = viewValue;
                    var deferred = $q.defer();

                    if (!email ||
                        email == '' ||
                        email.length < 10) {
                        console.log("REJECT");
                        deferred.reject();
                    } else {
                        console.log("ACCEPT");
                        deferred.resolve();
                    }
                    return deferred.promise;
                }
            }
        }
    });
