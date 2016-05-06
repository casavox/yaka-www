(function () {
    'use strict';

    angular
        .module('Yaka')
        .controller('LightBoxController', LightBoxController);

    //
    //Controller login
    function LightBoxController($scope, $rootScope) {

        $scope.simplePreview = false;
        $scope.editMode = $rootScope.editMode;
        $scope.url = $rootScope.media.cloudinaryPublicId;
        $scope.media = $rootScope.media;
        $scope.simplePreview = $rootScope.simplePreview;
        $scope.deleteImg = $rootScope.deleteImg;
        $scope.updateImg = $rootScope.updateImg;

        $scope.limitLength = function (obj, token, limit) {
            if (obj[token].length >= limit) {
                obj[token] = obj[token].slice(0, limit);
            }
        }
    }
})();
