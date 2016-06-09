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
                        crop: 'fill'
                    });
                } else {
                    generatedUrl = $.cloudinary.url(cloudinaryPublicId, {
                        secure: true,
                        width: 200,
                        height: 200,
                        crop: 'fill'
                    });
                }
            } else {
                generatedUrl = $.cloudinary.url(cloudinaryPublicId, {secure: true});
            }

            return $filter('trusted')(generatedUrl);
        };
    });
