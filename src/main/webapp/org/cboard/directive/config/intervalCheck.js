/**
 * Created by 陶鹏飞 on 2017/10/9.
 */
cBoard.directive('intervalCheck', ['$http', function ($http) {
    return {
        restrict: "A",
        // scope:true,
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {
            // console.log(scope.guestGradeTypeList);
            /*console.log(elem);
            console.log(elem[0].rows);
            console.log(elem[0].rows.item(1));*/
            /*_.map(elem[0].rows, function(num){
                // return num * 3;
                console.log(num);
            });*/
            /*elem[0].rows.map(function(value, index, array) {
                console.log(value)
                console.log(index)
                console.log(array)
            });*/

            // console.log(attrs);
            /*console.log(attrs);
            console.log(ctrl);
            console.log(attrs.$$element);
            console.log(attrs.$$element.context.children[1].children);*/
            // console.log(attrs.$$element[0].rows[3]);
            var trdata = [];
            /*for (var i = 1; i < attrs.$$element[0].rows.length; i++ ){
                // trdata.push(attrs.$$element[0].rows[i].cells);
                trdata.push({
                    name: attrs.$$element[0].rows[i].children[0],
                    start: attrs.$$element[0].rows[i].children[2],
                    end: attrs.$$element[0].rows[i].children[3]
                });
            }*/
            // console.log(trdata);
            // console.log(ctrl);
            /*let rowObj = {
                trdata : attrs.$$element[0].rows,
                [Symbol.iterator](){
                    const self = this;
                    // let index = 0;
                    let index = 1;
                    return {
                        next(){
                            let done = ( index < self.trdata.length );
                            let value = done ? self.trdata[index++].toUpperCase() : undefined;
                            return {
                                done : done,
                                value : value
                            };
                        }
                    };
                }
            };
            for( let i of rowObj ){
                console.log(i);
            };*/

            // console.log(ctrl.$valid);
            // console.log(attrs.ngModel);
            /*var topPeak = '#' + attrs.pkCheck;
            elem.add(topPeak).on('keyup', function () {
                scope.$apply(function () {
                    ctrl.$setValidity('peakCheck', (function () {
                        return Number(elem.val()) <= Number($(topPeak).val());
                        /!*var pattern = /-/;
                         if(pattern.test(elem.val()) && pattern.test($(topPeak).val())){
                         return !(Number(elem.val()) <= Number($(topPeak).val()));
                         }else{
                         return Number(elem.val()) <= Number($(topPeak).val());
                         }*!/
                    })());
                });
            });*/
        }
    }
}]);
