/**
 * Created by 陶鹏飞 on 2017/9/20.
 */
cBoard.controller('placeCtrl', function ($rootScope, $scope, $http, dataService, $uibModal, ModalUtils, $filter, chartService) {

    var translate = $filter('translate');

    ///表格的头部
    $scope.placeHeaderInfos = [
        {'name': '编码', 'col': 'PlaceCode'},
        {'name': '名称', 'col': 'PlaceName'},
        {'name': '描述', 'col': 'PlaceDesc'},
        {'name': '序号', 'col': 'PlaceSeq'},
        {'name': '状态', 'col': 'Status'},
        {'name': '创建时间', 'col': 'CreateTime'},
        {'name': '更新时间', 'col': 'UpdateTime'},
        {'name': '操作'}
    ];

    //初始化
    var getPlaceList = function () {
        $http({
            method: 'get',
            url: './place/getPlace.do'
            /*params: {
                userName: $scope.userName
            }*/
        }).success(function (response) {
            $scope.placeList = response;
        }).error(function (XMLHttpRequest, textStatus, errorThrown) {
            ModalUtils.alert(translate(errorThrown + "!"), "modal-danger", "sm");
        });
    };
    getPlaceList();

    $scope.$watch("placeName", function () {
        $http({
            method: 'post',
            url: './place/getPlace.do',
            data: {
                PlaceName: $scope.placeName
            }
        }).success(function (response) {
            $scope.placeList = response;
            // $scope.initPageSort($scope.userList);
        }).error(function (XMLHttpRequest, textStatus, errorThrown) {
            ModalUtils.alert(translate(errorThrown + "!"), "modal-danger", "sm");
        })
    })
    
    $scope.addPlace = function (current, $event) {
        $uibModal.open({
            templateUrl: 'org/cboard/view/config/modal/addPlace.html',
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
                        url: './place/addPlace.do',
                        data: JSON.stringify({
                            PlaceCode: $scope.newPlaceCode,
                            PlaceName: $scope.newPlaceName,
                            PlaceDesc: $scope.newPlaceDesc,
                        })
                    }).success(function (response) {
                        if (response.code === 0) {
                            ModalUtils.alert(translate(response.msg + "!"), "modal-danger", "md");
                        } else if (response.code === 1) {
                            ModalUtils.alert(translate(response.msg + "!"), "modal-success", "md");
                        } else if (response.code === -1) {
                            ModalUtils.alert(translate(response.msg + "!"), "modal-danger", "md");
                        }
                        getPlaceList();
                    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                        ModalUtils.alert(translate(errorThrown + "!"), "modal-danger", "sm");
                    });
                    $uibModalInstance.close();
                }
            }
        });
    };

    $scope.editPlace = function (current, $event) {
        $uibModal.open({
            templateUrl: 'org/cboard/view/config/modal/editPlace.html',
            //windowTemplateUrl: 'org/cboard/view/util/modal/window.html',
            backdrop: false,
            controller: function ($scope, $uibModalInstance, $http) {
                $scope.close = function () {
                    $uibModalInstance.close();
                };
                $scope.editPlaceCode = current.PlaceCode;
                $scope.editPlaceName = current.PlaceName;
                $scope.editPlaceDesc = current.PlaceDesc;
                $scope.save = function () {
                    $http({
                        method: 'POST',
                        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
                        url: './place/updatePlace.do',
                        data: JSON.stringify({
                            PlaceId: current.PlaceId,
                            PlaceCode: $scope.editPlaceCode,
                            PlaceName: $scope.editPlaceName,
                            // PlaceSeq: $scope.editTopGuestQty,
                            PlaceDesc: $scope.editPlaceDesc
                        })
                    }).success(function (response) {
                        if (response.code === 0) {
                            ModalUtils.alert(translate(response.msg + "!"), "modal-danger", "md");
                        } else if (response.code === 1) {
                            ModalUtils.alert(translate(response.msg + "!"), "modal-success", "md");
                        } else if (response.code === -1) {
                            ModalUtils.alert(translate(response.msg + "!"), "modal-danger", "md");
                        }
                        getPlaceList();
                    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                        ModalUtils.alert(translate(errorThrown + "!"), "modal-danger", "sm");
                    });
                    $uibModalInstance.close();
                }
            }
        });
    }

    $scope.delPlace = function (current, $event) {
        $http({
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
            url: './place/deletePlace.do',
            data: JSON.stringify({
                PlaceId: (function () {
                    var delArr = [];
                    delArr.push(current.PlaceId);
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
            getPlaceList();
        }).error(function (XMLHttpRequest, textStatus, errorThrown) {
            ModalUtils.alert(translate(errorThrown + "!"), "modal-danger", "sm");
        });
    }

    $scope.enablePlace = function (current, $event) {
        console.log(current.Status);
        // console.log(
            /*function () {
                if(current.PlaceId = "false"){
                    return true;
                }else if(current.PlaceId = "true"{
                    return false;
                }
            }*/
        // );
        $http({
            method: 'post',
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
            url: './place/updatePlace.do',
            /*data: {
                PlaceId: current.PlaceId,
                Status: !current.Status
            }*/
            data: JSON.stringify({
                PlaceId: current.PlaceId,
                Status: !eval(current.Status)
                // Status: true
            })
        }).success(function (response) {
            if (response.code === 1) {
                ModalUtils.alert(translate(response.msg + "!"), "modal-success", "md");
            } else if (response.code === 0) {
                ModalUtils.alert(translate(response.msg + "!"), "modal-danger", "md");
            } else if (response.code === -1) {
                ModalUtils.alert(translate(response.msg + "!"), "modal-danger", "md");
            } else if (response.code === -2) {
                ModalUtils.alert(translate(response.msg + "!"), "modal-danger", "md");
            }
            getPlaceList();
        }).error(function (XMLHttpRequest, textStatus, errorThrown) {
            ModalUtils.alert(translate(errorThrown + "!"), "modal-danger", "sm");
        });
        $event.stopPropagation();//阻止冒泡
    }

});