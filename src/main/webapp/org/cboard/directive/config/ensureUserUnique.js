/**
 * Created by 陶鹏飞 on 2017/8/11.
 */
cBoard.directive('ifUser', ['$http', function($http) {
    return {
        restrict: "A",
        // scope:true,
        require: 'ngModel',
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
                    method: 'POST',
                    url: './user/addUser.do',
                    data:{
                        name: ngModelController.$modelValue
                    }
                }).success(function (response) {
                    if (response.code === 0) {
                        ModalUtils.alert(translate(response.msg + "!"), "modal-danger", "md");
                    } else if (response.code === 1) {
                        ModalUtils.alert(translate(response.msg + "!"), "modal-success", "md");
                    } else if (response.code === -2) {
                        ModalUtils.alert(translate(response.msg + "!"), "modal-danger", "md");
                    }
                    getUserList();
                }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                    ModalUtils.alert(translate(errorThrown + "!"), "modal-danger", "sm");
                });
                /*$http({
                    method: 'get',
                    url: './role/getRoles.do',
                    params: {
                        roleName: ngModelController.$modelValue
                    }
                }).success(function (response) {
                    console.log(response);
                    if (response.code === 1) {
                        ngModelController.$setValidity('ifUser', false);
                        return newRole;
                    } else if(response.code === 0){
                        ngModelController.$setValidity('ifUser', true);
                        return newRole;
                    }
                })*/
            })
        }
    }
}]);


