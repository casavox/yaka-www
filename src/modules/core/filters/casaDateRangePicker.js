angular.module('Yaka')
    .filter('casaDateRangePicker', function () {
        return function(items, from, to, field) {
            var df = Date.parse(from);
            var endDate = new Date(to);
            endDate.setDate(endDate.getDate() + 1);
            var dt = endDate.getTime();
            var result = [];
            if (items) {
                for (var i=0; i<items.length; i++){
                    var date_bet = items[i][field];
                    if (date_bet > df && dt > date_bet)  {
                        result.push(items[i]);
                    }
                }
            }
            return result;
        };
    });
