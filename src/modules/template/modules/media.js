materialAdmin

    // =========================================================================
    // MEDIA ELEMENT
    // =========================================================================

    .directive('mediaElement', function () {
        return {
            restrict: 'A',
            link: function (scope, element) {
                element.mediaelementplayer();
            }
        }

    })


    // =========================================================================
    // LIGHTBOX
    // =========================================================================

    .directive('lightboxItemAngular', function () {
        return {
            restrict: 'C',
            link: function (scope, element) {
                if (scope.$last) {
                    // ng-repeat is completed
                    element.parent().lightGallery({
                        enableTouch: true,
                        thumbnail: false
                    });
                }
            }
        }
    });
