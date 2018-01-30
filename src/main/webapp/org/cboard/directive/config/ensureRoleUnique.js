/**
 * Created by 陶鹏飞 on 2017/8/11.
 */
cBoard.directive('ifRole', ['$http', function($http) {
    console.log("")
    return {
        restrict: "A",
        // scope:true,
        require: '^?ngModel',
        link: function(scope, ele, attrs, ngModelController) {
            scope.$watch(attrs.ngModel,function () {
                console.log(scope);
                console.log(ele);
                console.log(attrs);
                console.log(ngModelController);
                console.log(ngModelController.$valid);
                console.log(attrs.ngModel);

                scope.inputStatus = ngModelController.$valid;
                $http({
                    method: 'get',
                    url: './role/getRoles.do',
                    params: {
                        roleName: ngModelController.$modelValue
                    }
                }).success(function (response) {
                    console.log(response);
                    if (response.code === 1) {
                        ngModelController.$setValidity('ifRole', false);
                        return newRole;
                    } else if(response.code === 0){
                        ngModelController.$setValidity('ifRole', true);
                        return newRole;
                    }
                })
            })
        }
    }
}]);


