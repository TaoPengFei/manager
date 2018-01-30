/**
 * Created by 陶鹏飞 on 2017/9/20.
 */
cBoard.controller('guestnotypeCtrl', function ($rootScope, $scope, $http, dataService, $uibModal, ModalUtils, $filter, chartService) {

    var translate = $filter('translate');

///表格的头部
    $scope.guestnotypeHeaderInfos = [
        {'name': '人数名称', 'col': 'GuestNoTypeName'},
        {'name': '人数描述', 'col': 'GuestNoTypeDesc'},
        {'name': '人数下限', 'col': 'BottomGuestQty'},
        {'name': '人数上限', 'col': 'TopGuestQty'},
        {'name': '人数状态', 'col': 'Status'},
        {'name': '创建时间', 'col': 'CreateTime'},
        {'name': '更新时间', 'col': 'UpdateTime'},
        {'name': '操作'}
    ];

    //初始化
    var getGuestNoTypeList = function () {
        $http({
            method: 'get',
            url: './guestnotype/getGuestNoType.do'
            /*params: {
             userName: $scope.userName
             }*/
        }).success(function (response) {
            $scope.guestNoTypeList = response;
        }).error(function (XMLHttpRequest, textStatus, errorThrown) {
            ModalUtils.alert(translate(errorThrown + "!"), "modal-danger", "sm");
        });
    };
    getGuestNoTypeList();
    
    $scope.addGuestNoType = function () {
        $uibModal.open({
            templateUrl: 'org/cboard/view/config/modal/addGuestNoType.html',
            //windowTemplateUrl: 'org/cboard/view/util/modal/window.html',
            backdrop: false,
            controller: function ($scope, $uibModalInstance, $http) {
                $scope.close = function () {
                    $uibModalInstance.close();
                };
                $scope.save = function () {
                    $http({
                        method: 'POST',
                        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
                        url: './guestnotype/addGuestNoType.do',
                        data: JSON.stringify({
                            GuestNoTypeName: $scope.newGuestNoTypeName,
                            Status: $scope.newStatus,
                            TopGuestQty: $scope.newTopGuestQty,
                            BottomGuestQty: $scope.newBottomGuestQty,
                            GuestNoTypeDesc: $scope.newGuestNoTypeDesc
                        })
                    }).success(function (response) {
                        if (response.code === 0) {
                            ModalUtils.alert(translate(response.msg + "!"), "modal-danger", "md");
                        } else if (response.code === 1) {
                            ModalUtils.alert(translate(response.msg + "!"), "modal-success", "md");
                        } else if (response.code === -1) {
                            ModalUtils.alert(translate(response.msg + "!"), "modal-danger", "md");
                        }
                        getGuestNoTypeList();
                    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                        ModalUtils.alert(translate(errorThrown + "!"), "modal-danger", "sm");
                    });
                    $uibModalInstance.close();
                }
            }
        });
    }

    $scope.editGuestNoType = function (current, $event) {
        $uibModal.open({
            templateUrl: 'org/cboard/view/config/modal/editGuestNoType.html',
            //windowTemplateUrl: 'org/cboard/view/util/modal/window.html',
            backdrop: false,
            controller: function ($scope, $uibModalInstance, $http) {
                $scope.close = function () {
                    $uibModalInstance.close();
                };
                $scope.editGuestNoTypeName = current.GuestNoTypeName;
                $scope.editStatus = current.Status;
                $scope.editTopGuestQty = current.TopGuestQty;
                $scope.editBottomGuestQty = current.BottomGuestQty;
                $scope.editGuestNoTypeDesc = current.GuestNoTypeDesc;
                $scope.save = function () {
                    $http({
                        method: 'POST',
                        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
                        url: './guestnotype/updateGuestNoType.do',
                        data: JSON.stringify({
                            GuestNoTypeId: current.GuestNoTypeId,
                            GuestNoTypeName: $scope.editGuestNoTypeName,
                            Status: $scope.editStatus,
                            TopGuestQty: $scope.editTopGuestQty,
                            BottomGuestQty: $scope.editBottomGuestQty,
                            GuestNoTypeDesc: $scope.editGuestNoTypeDesc
                        })
                    }).success(function (response) {
                        if (response.code === 0) {
                            ModalUtils.alert(translate(response.msg + "!"), "modal-danger", "md");
                        } else if (response.code === 1) {
                            ModalUtils.alert(translate(response.msg + "!"), "modal-success", "md");
                        } else if (response.code === -1) {
                            ModalUtils.alert(translate(response.msg + "!"), "modal-danger", "md");
                        }
                        getGuestNoTypeList();
                    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                        ModalUtils.alert(translate(errorThrown + "!"), "modal-danger", "sm");
                    });
                    $uibModalInstance.close();
                }
            }
        });
    }

    $scope.delGuestNoType = function (current, $event) {
        $http({
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
            url: './guestnotype/deleteGuestNoType.do',
            data: JSON.stringify({
                GuestNoTypeId: (function () {
                    var delArr = [];
                    delArr.push(current.GuestNoTypeId);
                    return delArr;
                })()
            })
        }).success(function (response) {
            if (response.code === 0) {
                ModalUtils.alert(translate(response.msg + "!"), "modal-danger", "md");
            } else if (response.code === 1) {
                ModalUtils.alert(translate(response.msg + "!"), "modal-success", "md");
            } else if (response.code === -1) {
                ModalUtils.alert(translate(response.msg + "!"), "modal-danger", "md");
            }
            getGuestNoTypeList();
        }).error(function (XMLHttpRequest, textStatus, errorThrown) {
            ModalUtils.alert(translate(errorThrown + "!"), "modal-danger", "sm");
        });
    }

});