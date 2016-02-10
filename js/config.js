angular.module('Yaka')
    .config(['cloudinaryProvider', function (cloudinaryProvider) {
        cloudinaryProvider
            .set("cloud_name", "yaka")
            .set("upload_preset", "cxsdlf5n");
    }])
    .config(['uiGmapGoogleMapApiProvider', function (GoogleMapApi) {
        GoogleMapApi.configure({
            // key: 'your api key',
            // v: '3.20',
            libraries: 'weather,geometry,visualization'
        });
    }])
;
