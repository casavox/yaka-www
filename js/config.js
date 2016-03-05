angular.module('Yaka')
    .config(['cloudinaryProvider', function (cloudinaryProvider) {
        cloudinaryProvider
            .set("cloud_name", "yaka")
            .set("upload_preset", "cxsdlf5n");
    }])
    .config(['uiGmapGoogleMapApiProvider', function (GoogleMapApi) {
        GoogleMapApi.configure({
            key: 'AIzaSyDtq1oFK_ku6rSm9OHM8Q0MlHeOYzOWgr8',
            libraries: 'weather,geometry,visualization'
            // v: '3.20',
        });
    }])
    .config(['$translateProvider', function (translateProvider) {
        // Simply register translation table as object hash
        translateProvider.useSanitizeValueStrategy('escape');
        translateProvider.translations('en', {
            'ACTIVITY_OTHER': "Other - I don't know",
            'ACTIVITY_PLUMBER': "Plumber",
            'ACTIVITY_LOCKSMITH': "Locksmith",
            'ACTIVITY_CARPENTER': "Carpenter",
            'ACTIVITY_ELECTRICIAN': "Electrician",
            'ACTIVITY_PAINTER': "Painter",
            'ACTIVITY_TILESETTER': "Tilesetter",
            'ACTIVITY_PL_WC': "Wc",
            'ACTIVITY_PL_SHOWER': "Shower"
        });
    }])
;
