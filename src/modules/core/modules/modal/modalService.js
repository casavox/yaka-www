angular.module('Yaka')
    .factory('modalService', ['$uibModal', function ($uibModal) {
        return {
            proCancelProposal: function (proposalStatus, onOkClicked) {
                return $uibModal.open({
                    templateUrl: "modules/coremodules/modal/views/proCancelProposal.html",
                    backdrop: true,
                    windowClass: "animated",
                    size: '',
                    keyboard: true,
                    controller: function ($scope, $uibModalInstance) {
                        $scope.ok = function (chatMessage) {
                            onOkClicked(chatMessage);
                            $uibModalInstance.close("ok");
                        };
                        $scope.cancel = function () {
                            $uibModalInstance.dismiss('cancel');
                        };
                        $scope.yesClicked = function () {
                            if (proposalStatus && proposalStatus != 'RECOMMENDATION') {
                                $scope.yesChoice = true;
                            } else {
                                onOkClicked(null);
                                $uibModalInstance.close("ok");
                            }
                        };
                    },
                    resolve: {
                        resCancelProposal: function () {
                            return "";
                        }
                    }
                });
            },
            proCancelRecommandation: function (proposalStatus, onOkClicked) {
                return $uibModal.open({
                    templateUrl: "modules/coremodules/modal/views/proCancelRecommandation.html",
                    backdrop: true,
                    windowClass: "animated",
                    size: '',
                    keyboard: true,
                    controller: function ($scope, $uibModalInstance) {
                        $scope.ok = function (chatMessage) {
                            onOkClicked(chatMessage);
                            $uibModalInstance.close("ok");
                        };
                        $scope.cancel = function () {
                            $uibModalInstance.dismiss('cancel');
                        };
                        $scope.yesClicked = function () {
                            $scope.yesChoice = true;
                        };
                    },
                    resolve: {
                        resCancelProposal: function () {
                            return "";
                        }
                    }
                });
            },
            cancelProject: function (professionalName, onOkClicked) {
                return $uibModal.open({
                    templateUrl: "modules/coremodules/modal/views/cancelProject.html",
                    backdrop: true,
                    windowClass: "animated",
                    size: '',
                    keyboard: true,
                    controller: function ($scope, $uibModalInstance) {
                        $scope.professionalName = professionalName;
                        $scope.ok = function (chatMessage) {
                            onOkClicked(chatMessage);
                            $uibModalInstance.close("ok");
                        };
                        $scope.cancel = function () {
                            $uibModalInstance.dismiss('cancel');
                        };
                        $scope.yesClicked = function () {
                            if (professionalName) {
                                $scope.yesChoice = true;
                            } else {
                                onOkClicked(null);
                                $uibModalInstance.close("ok");
                            }
                        };
                    },
                    resolve: {
                        resCancelProject: function () {
                            return "";
                        }
                    }
                });
            }
        };
    }]);
