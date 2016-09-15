angular.module('Yaka')
    .filter('yakaCloudinaryUrl', function ($filter) {
        return function (cloudinaryPublicId, thumbnail, size) {
            var generatedUrl = "";
            if (!cloudinaryPublicId) {
                return "";
            }
            if (thumbnail) {
                if (size) {
                    generatedUrl = $.cloudinary.url(cloudinaryPublicId, {
                        secure: true,
                        width: size,
                        height: size,
                        crop: 'fill',
                        format: 'png'
                    });
                } else {
                    generatedUrl = $.cloudinary.url(cloudinaryPublicId, {
                        secure: true,
                        width: 200,
                        height: 200,
                        crop: 'fill',
                        format: 'png'
                    });
                }
            } else {
                generatedUrl = $.cloudinary.url(cloudinaryPublicId, {
                    secure: true,
                    format: 'png'
                });
            }

            return $filter('trusted')(generatedUrl);
        };
    })
    .filter('yakaCloudinaryDownload', function ($filter) {
        return function (cloudinaryPublicId, resourceType) {
            var generatedUrl = "";
            if (!cloudinaryPublicId) {
                return "";
            }

            var resource_type = "image";
            if (resourceType) {
                resource_type = resourceType;
            }

            generatedUrl = $.cloudinary.url(cloudinaryPublicId, {
                secure: true,
                flags: 'attachment',
                resource_type: resource_type
            });

            return $filter('trusted')(generatedUrl);
        };
    });
