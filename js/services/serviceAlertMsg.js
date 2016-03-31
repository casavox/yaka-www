//
//Service alert message

angular.module('Yaka')
    .factory('alertMsg', ['$rootScope', '$timeout', function ($rootScope, $timeout) {
        return {
            send: function (msg, type) {
                if (angular.isUndefined($rootScope.msgQueu) || !$rootScope.msgQueu)
                    $rootScope.msgQueu = [];
                var self = this;
                if (!$rootScope.alertMsgFlag) {
                    $rootScope.alertMessage = msg;
                    switch (type) {
                        case "danger":
                            $rootScope.alertMsgStyle = "alert-" + type;
                            $rootScope.alertMsgStylIcon = "glyphicon glyphicon-exclamation-sign";
                            break;
                        case "info":
                            $rootScope.alertMsgStyle = "alert-" + type;
                            $rootScope.alertMsgStylIcon = "glyphicon glyphicon-info-sign";
                            break;
                        case "warning":
                            $rootScope.alertMsgStyle = "alert-" + type;
                            $rootScope.alertMsgStylIcon = "glyphicon glyphicon-warning-sign";
                            break;
                        case "success":
                            $rootScope.alertMsgStyle = "alert-" + type;
                            $rootScope.alertMsgStylIcon = "glyphicon glyphicon-ok-sign";
                            break;
                        default:
                            $rootScope.alertMsgStyle = "alert-danger";
                    }
                    $rootScope.alertMsgFlag = true;
                    $timeout(function () {
                    }, 0);
                    $timeout(function () {
                        $rootScope.alertMsgFlag = false;
                        $timeout(function () {
                            if ($rootScope.msgQueu && $rootScope.msgQueu.length > 0) {
                                self.send($rootScope.msgQueu[0].msg, $rootScope.msgQueu[0].type);
                                $rootScope.msgQueu.splice(0, 1);
                            }
                        }, 500);
                    }, 5000);
                } else
                    $rootScope.msgQueu.push({
                        msg: msg,
                        type: type
                    });
            },
            stop: function () {
                $rootScope.alertMsgFlag = false;
                $rootScope.msgQueu = [];
            }
        };
    }]);
