angular.module('Yaka')
    .service('apiInterceptor', function ($q, $injector) {
        var service = this;

        service.responseError = function (response) {
            if (response.status == 401) {
                $injector.get('$localStorage').$reset();
                $injector.get('pendingRequests').cancelAll();
                if ($injector.get('$state').current.name != "home" && $injector.get('$state').current.name != "pro-home" && $injector.get('$state').current.name != "new-project") {
                    $injector.get('$state').go("home", {'login': true});
                    $injector.get('alertMsg').disable();
                    setTimeout(
                        function () {
                            $injector.get('alertMsg').enable();
                        }, 100
                    );
                    if (!window.yakaRedirectUrl) {
                        window.yakaRedirectUrl = window.location.href;
                    }
                }
            }
            return $q.reject(response);
        };
    })
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('apiInterceptor');
        $httpProvider.interceptors.push('loadingInterceptor');
    }])
    .config(['cloudinaryProvider', function (cloudinaryProvider) {
        cloudinaryProvider
            .set("cloud_name", "yaka")
            .set("upload_preset", "cxsdlf5n");
    }])
    .config(['uiGmapGoogleMapApiProvider', function (GoogleMapApi) {
        GoogleMapApi.configure({
            key: 'AIzaSyDtq1oFK_ku6rSm9OHM8Q0MlHeOYzOWgr8',
            libraries: 'weather,geometry,visualization'
        });
    }])
    .config(['$translateProvider', function ($translateProvider) {
        $translateProvider.useSanitizeValueStrategy('escape');
        $translateProvider.preferredLanguage('fr');
    }])
    .filter('trusted', ['$sce', function ($sce) {
        return function (url) {
            return $sce.trustAsResourceUrl(url);
        };
    }]);
