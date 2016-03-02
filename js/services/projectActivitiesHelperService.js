//
//Service alert message

angular.module('Yaka')
    .factory('projectActivitiesHelperService', ['$rootScope', function ($rootScope) {
        return {
            getNameFromCode: function (code) {
                switch (code) {
                    case "OTHER":
                        return "OTHER";
                    default:
                        return code;
                }
            }
        };
    }]
);
