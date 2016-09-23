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
                    console.log(config.url);
                    console.log(config.ignoreLoading);
                    if (!config.ignoreLoading) {
                        xhrCreations++;
                    }
                    updateStatus();
                    return config;
                },
                requestError: function (rejection) {
                    if (!rejection.config.ignoreLoading) {
                        xhrResolutions++;
                    }
                    updateStatus();
                    return $q.reject(rejection);
                },
                response: function (response) {
                    if (!response.config.ignoreLoading) {
                        xhrResolutions++;
                    }
                    updateStatus();
                    return response;
                },
                responseError: function (rejection) {
                    if (!rejection.config.ignoreLoading) {
                        xhrResolutions++;
                    }
                    updateStatus();
                    return $q.reject(rejection);
                }
            };
        });
})();
