angular.module('Yaka')
    .service('apiInterceptor', function ($q, $injector) {
        var service = this;

        service.responseError = function (response) {
            if (response.status == 401) {
                console.log("Current URL : " + window.location.href);

                $injector.get('$localStorage').$reset();
                $injector.get('$localStorage').urlRedirect = window.location.href;
                $injector.get('pendingRequests').cancelAll();
                $injector.get('$state').go("home");
            }
            return $q.reject(response);
        };
    })
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('apiInterceptor');
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
    }])
;
