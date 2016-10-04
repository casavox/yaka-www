(function () {
    'use strict';

    angular
        .module('Yaka')
        .service('loadingInterceptor', function ($q, $rootScope, $log) {

            var xhrCreations = 0;
            var xhrResolutions = 0;

            function isLoading() {
                return xhrResolutions < xhrCreations;
            }

            function updateStatus() {
                $rootScope.loading = isLoading();
            }

            return {
                request: function (config) {
                    if (!config.ignoreLoading && !_.contains(config.url, "api.cloudinary.com")) {
                        xhrCreations++;
                    }
                    updateStatus();
                    return config;
                },
                requestError: function (rejection) {
                    if (!rejection.config.ignoreLoading && !_.contains(rejection.config.url, "api.cloudinary.com")) {
                        xhrResolutions++;
                    }
                    updateStatus();
                    return $q.reject(rejection);
                },
                response: function (response) {
                    if (!response.config.ignoreLoading && !_.contains(response.config.url, "api.cloudinary.com")) {
                        xhrResolutions++;
                    }
                    updateStatus();
                    return response;
                },
                responseError: function (rejection) {
                    if (!rejection.config.ignoreLoading && !_.contains(rejection.config.url, "api.cloudinary.com")) {
                        xhrResolutions++;
                    }
                    updateStatus();
                    return $q.reject(rejection);
                }
            };
        });
})();
