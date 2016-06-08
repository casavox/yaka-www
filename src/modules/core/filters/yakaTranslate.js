/**
 * Created by MAB on 08/06/2016.
 */

angular.module('Yaka')
    .filter('yakaTranslate', function ($translate) {
            return function (projectTitle) {
                if (projectTitle) {
                    var titleArray = projectTitle.split(' ');
                    for (var i = 0; i < titleArray.length; i++) {
                        titleArray[i] = $translate.instant('ACTIVITY_' + titleArray[i]);
                    }
                    return titleArray.join(' ');
                }
                return projectTitle;
            }
        }
    );
