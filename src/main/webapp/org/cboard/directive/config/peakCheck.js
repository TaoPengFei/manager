/**
 * Created by 陶鹏飞 on 2017/9/29.
 */
cBoard.directive('pkCheck', ['$http', function ($http) {
    return {
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {
            var topPeak = '#' + attrs.pkCheck;
            elem.add(topPeak).on('keyup', function () {
                scope.$apply(function () {
                    ctrl.$setValidity('peakCheck', (function () {
                        return Number(elem.val()) <= Number($(topPeak).val());
                        /*var pattern = /-/;
                        if(pattern.test(elem.val()) && pattern.test($(topPeak).val())){
                            return !(Number(elem.val()) <= Number($(topPeak).val()));
                        }else{
                            return Number(elem.val()) <= Number($(topPeak).val());
                        }*/
                    })());
                });
            });
        }
    }
}]);