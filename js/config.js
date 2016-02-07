
angular.module('Yaka').config(['cloudinaryProvider', function (cloudinaryProvider) {
  cloudinaryProvider
      .set("cloud_name", "yaka")
      .set("upload_preset", "cxsdlf5n");
}]);
