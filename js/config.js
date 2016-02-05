
angular.module('Yaka').config(['cloudinaryProvider', function (cloudinaryProvider) {
  cloudinaryProvider
      .set("cloud_name", "yaka")
      .set("api_key", "cxsdlf5n");
}]);
