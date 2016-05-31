materialAdmin

    // =========================================================================
    // INPUT FEILDS MODIFICATION
    // =========================================================================

    //Add blue animated border and remove with condition when focus and blur

    .directive('fgLine', function () {
        return {
            restrict: 'C',
            link: function (scope, element) {

                if ($('.fg-line')[0]) {
                    $('body').on('focus', '.form-control, .intl-tel-input', function () {
                        $(this).closest('.fg-line').addClass('fg-toggled');
                        $(this).parent().parent().find('[ng-messages]').addClass('hidden')
                    });

                    $('body').on('blur', '.form-control, .intl-tel-input', function () {
                        var p = $(this).closest('.form-group');
                        var i = p.find('.form-control').val();

                        if (p.hasClass('fg-float')) {
                            if (i.length == 0) {
                                $(this).closest('.fg-line').removeClass('fg-toggled');
                            }
                        }
                        else {
                            $(this).closest('.fg-line').removeClass('fg-toggled');
                        }
                        $(this).parent().parent().find('[ng-messages]').removeClass('hidden')
                    });
                }

                scope.$watch(function () {
                    return element.closest('.form-group').find('.form-control').val();
                }, function (newValue, oldValue) {
                    if (newValue) {
                        element.closest('.fg-line').addClass('fg-toggled');
                    } else {
                        element.closest('.fg-line').removeClass('fg-toggled');
                    }
                });
            }
        }
    })


    // =========================================================================
    // AUTO SIZE TEXTAREA
    // =========================================================================

    .directive('autoSize', function () {
        return {
            restrict: 'A',
            link: function (scope, element) {

                if (element[0]) {
                    autosize(element);
                }
            }
        }
    })


    // =========================================================================
    // BOOTSTRAP SELECT
    // =========================================================================

    .directive('selectPicker', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                //if (element[0]) {
                element.selectpicker();
                //}
            }
        }
    })


    // =========================================================================
    // INPUT MASK
    // =========================================================================

    .directive('inputMask', function () {
        return {
            restrict: 'A',
            scope: {
                inputMask: '='
            },
            link: function (scope, element) {
                element.mask(scope.inputMask.mask);
            }
        }
    })


    // =========================================================================
    // COLOR PICKER
    // =========================================================================

    .directive('colordPicker', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                $(element).each(function () {
                    var colorOutput = $(this).closest('.cp-container').find('.cp-value');
                    $(this).farbtastic(colorOutput);
                });

            }
        }
    })


    // =========================================================================
    // PLACEHOLDER FOR IE 9 (on .form-control class)
    // =========================================================================

    .directive('formControl', function () {
        return {
            restrict: 'C',
            link: function (scope, element, attrs) {
                if (angular.element('html').hasClass('ie9')) {
                    $('input, textarea').placeholder({
                        customClass: 'ie9-placeholder'
                    });
                }
            }

        }
    })