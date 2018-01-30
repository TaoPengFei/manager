/**
 * Created by yfyuan on 2016/7/19.
 */
cBoard.controller('cBoardCtrl', function ($rootScope, $scope, $location, $http, $q, $filter, $uibModal, ModalUtils) {

    var translate = $filter('translate');

    $scope.avatar = './dist/img/user-male-circle-blue-128.png';
    // $scope.username = "admin";
    // console.log($window.sessionStorage);

    /*$scope.userName = userName;
    console.log($scope.userName);*/
    /*
     $scope.collection = {};
     $scope.collection.p1 = $scope.roleName;
     $scope.collection.p2 = $scope.userName;
     console.log($scope.collection);
     $scope.$watch('collection', function () {
     alert("changed!");
     }, true);
     */

    $http({
        method: 'get',
        // url: '../user/user.do'
        url: './user/getSessionUsername.do'
    }).success(function (response) {
        $scope.sessionUser = response.code;
        console.log(response);
    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
        ModalUtils.alert(translate(errorThrown + "!"), "modal-danger", "sm");
    });

    $scope.changePwd = function (current, $event) {
        console.log(current);
        $uibModal.open({
            templateUrl: 'org/cboard/view/config/modal/changePwd.html',
            windowTemplateUrl: 'org/cboard/view/util/modal/window.html',
            backdrop: false,
            size: 'sm',
            controller: function ($scope, $uibModalInstance) {
                $scope.close = function () {
                    $uibModalInstance.close();
                };
                $scope.ok = function () {

                    $http({
                        method: 'POST',
                        url: './user/updatePassword.do',
                        data : {
                            userName : current.name,
                            oldPassword : $scope.curPwd,
                            newPassword : $scope.newPwd
                        }
                    }).success(function (response) {
                        ModalUtils.alert(translate(response.msg), "modal-success", "sm");
                        $uibModalInstance.close();
                    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                        ModalUtils.alert(translate(errorThrown + "!"), "modal-danger", "sm");
                    });
                    // document.location.href= "login.html";

                    /*$http.post("commons/changePwd.do", { ./user/updatePassword.do
                        curPwd: $scope.curPwd,
                        newPwd: $scope.newPwd,
                        cfmPwd: $scope.cfmPwd
                    }).success(function (serviceStatus) {
                        if (serviceStatus.status == '1') {
                            ModalUtils.alert(translate("COMMON.SUCCESS"), "modal-success", "sm");
                            $uibModalInstance.close();
                        } else {
                            ModalUtils.alert(serviceStatus.msg, "modal-warning", "lg");
                        }
                    });*/
                };
            }
        });
    }
});