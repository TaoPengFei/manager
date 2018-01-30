/**
 * Created by 陶鹏飞 on 2017/8/25.
 */
cBoard.controller('areaCtrl', function ($rootScope, $scope, $http, dataService, $uibModal, ModalUtils, $filter, chartService) {

    var translate = $filter('translate');
    $scope.optFlagArea = 'none';
    $scope.addArea = {}
    $scope.editArea = {}
    $scope.areaTreeStatus = "";

    /**
     * 新增项保存
     */
    $scope.saveNew = function () {
        $http({
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
            url: './area/addArea.do',
            data: JSON.stringify({
                pAreaId: $scope.pId,
                AreaCode: $scope.addArea.Code,
                AreaName: $scope.addArea.Name,
                AreaDesc: $scope.addArea.Desc
            })
        }).success(function (response) {
            if (response.code === 0) {
                ModalUtils.alert(translate(response.msg + "!"), "modal-danger", "md");
            } else if (response.code === 1) {
                ModalUtils.alert(translate(response.msg + "!"), "modal-success", "md");
                $scope.treeStatusArea = response.code;
            } else if (response.code === -1) {
                ModalUtils.alert(translate(response.msg + "!"), "modal-danger", "md");
            } else if (response.code === -2) {
                ModalUtils.alert(translate(response.msg + "!"), "modal-danger", "md");
            }
        }).error(function (XMLHttpRequest, textStatus, errorThrown) {
            ModalUtils.alert(translate(errorThrown + "!"), "modal-danger", "sm");
        });
    }

    /**
     * 修改项保存
     */
    $scope.saveEdit = function () {
        $http({
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
            url: './area/updateArea.do',
            data: JSON.stringify({
                pAreaId: $scope.curAreapId,
                AreaId: $scope.curAreaId,
                AreaCode: $scope.editArea.Code,
                AreaName: $scope.editArea.Name,
                AreaDesc: $scope.editArea.Desc
            })
        }).success(function (response) {
            if (response.code === 0) {
                ModalUtils.alert(translate(response.msg + "!"), "modal-danger", "md");
            } else if (response.code === 1) {
                ModalUtils.alert(translate(response.msg + "!"), "modal-success", "md");
                $scope.treeStatusArea = response.code;
            } else if (response.code === -1) {
                ModalUtils.alert(translate(response.msg + "!"), "modal-danger", "md");
            } else if (response.code === -2) {
                ModalUtils.alert(translate(response.msg + "!"), "modal-danger", "md");
            }
        }).error(function (XMLHttpRequest, textStatus, errorThrown) {
            ModalUtils.alert(translate(errorThrown + "!"), "modal-danger", "sm");
        });
    }

    /**
     * 删除项保存
     */
    $scope.delArea = function () {
        $http({
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
            url: './area/deleteArea.do',
            data: JSON.stringify({
                AreaId: zNodesJSON
            })
        }).success(function (response) {
            if (response.code === 0) {
                ModalUtils.alert(translate(response.msg + "!"), "modal-danger", "md");
            } else if (response.code === 1) {
                ModalUtils.alert(translate(response.msg + "!"), "modal-success", "md");
                $scope.treeStatusArea = response.code;
            } else if (response.code === -1) {
                ModalUtils.alert(translate(response.msg + "!"), "modal-danger", "md");
            } else if (response.code === -2) {
                ModalUtils.alert(translate(response.msg + "!"), "modal-danger", "md");
            }
        }).error(function (XMLHttpRequest, textStatus, errorThrown) {
            ModalUtils.alert(translate(errorThrown + "!"), "modal-danger", "sm");
        });
    }

    /**
     * 取消
     */
    $scope.canel = function () {
        $scope.optFlagArea = 'none';
    }

    /**
     * 检索树算法：非递归法
     */
    var zNodesJSON = [];
    $scope.searchAreaTree = function (node) {
        if (!node) {
            return;
        }
        var stack = [];
        stack.push(node);
        var tmpNode;
        while (stack.length > 0) {
            tmpNode = stack.pop();
            zNodesJSON.push(tmpNode.id);
            if (tmpNode.children && tmpNode.children.length > 0) {
                var i = tmpNode.children.length - 1;
                for (i = tmpNode.children.length - 1; i >= 0; i--) {
                    stack.push(tmpNode.children[i]);
                }
            }
        }
    };

});