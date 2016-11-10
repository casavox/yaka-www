//
//Service alert message

angular.module('Yaka')
    .factory('alertMsg', function ($rootScope, $timeout, $localStorage, growlService) {
            return {
                send: function (msg, type) {
                    if ($localStorage.disableAlertMsg) {
                        return;
                    }

                    $.growl({
                        message: msg,
                        url: ''
                    }, {
                        type: type,
                        offset: {
                            x: 20,
                            y: 85
                        },
                        spacing: 10,
                        z_index: 1031,
                        delay: 5000
                    });

                },
                stop: function () {
                    $rootScope.alertMsgFlag = false;
                    $rootScope.msgQueu = [];
                },
                enable: function () {
                    if ($localStorage.disableAlertMsg) {
                        delete $localStorage.disableAlertMsg;
                    }
                },
                disable: function () {
                    $localStorage.disableAlertMsg = true;
                }
            };
        }
    );
