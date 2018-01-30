/**
 * Created by 陶鹏飞 on 2017/8/21.
 */
cBoard.controller('brandCtrl', function ($rootScope, $scope, $http, dataService, $uibModal, ModalUtils, $filter, chartService) {

    var translate = $filter('translate');
    $scope.optFlag = 'none';
    $scope.selectNode = {};
    //https://stackoverflow.com/questions/11412410/angularjs-losing-scope-when-using-ng-include
    //https://stackoverflow.com/questions/32616340/angularjs-ng-model-does-not-work-with-ng-include
    $scope.addBrand = {}    //losing scope when using ng-include
    //错误用法
    /*$scope.addBrandCode = "";
     $scope.addBrandName = "";
     $scope.addBrandDesc = "";*/
    // $scope.curBrand = "";
    $scope.editBrand = {}

    $scope.treeStatus = "";

    /**
     * 新增品牌
     */
    $scope.newDs = function () {
        $scope.optFlag = 'addBrand';
    };

    /**
     * 修改品牌
     */
    $scope.editDs = function () {
        $scope.optFlag = 'editBrand';
        // console.log('editBrand...');
    };

    /**
     * 新增项保存
     */
    $scope.saveNew = function () {
        // console.log("saveNew...");
        $http({
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
            url: './brand/addBrand.do',
            data: JSON.stringify({
                pBrandId: $scope.pId,
                BrandCode: $scope.addBrand.Code,
                BrandName: $scope.addBrand.Name,
                BrandDesc: $scope.addBrand.Desc
            })
        }).success(function (response) {
            if (response.code === 0) {
                ModalUtils.alert(translate(response.msg + "!"), "modal-danger", "md");
            } else if (response.code === 1) {
                ModalUtils.alert(translate(response.msg + "!"), "modal-success", "md");
                $scope.treeStatus = response.code;
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
        // console.log("saveEdit...");
        $http({
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
            url: './brand/updateBrand.do',
            data: JSON.stringify({
                pBrandId: $scope.curBrandpId,
                BrandId: $scope.curBrandId,
                BrandCode: $scope.editBrand.Code,
                BrandName: $scope.editBrand.Name,
                BrandDesc: $scope.editBrand.Desc
            })
        }).success(function (response) {
            if (response.code === 0) {
                ModalUtils.alert(translate(response.msg + "!"), "modal-danger", "md");
            } else if (response.code === 1) {
                ModalUtils.alert(translate(response.msg + "!"), "modal-success", "md");
                $scope.treeStatus = response.code;
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
    $scope.delBrand = function () {
        $http({
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
            url: './brand/deleteBrand.do',
            data: JSON.stringify({
                BrandId: zNodesJSON
            })
        }).success(function (response) {
            if (response.code === 0) {
                ModalUtils.alert(translate(response.msg + "!"), "modal-danger", "md");
            } else if (response.code === 1) {
                ModalUtils.alert(translate(response.msg + "!"), "modal-success", "md");
                $scope.treeStatus = response.code;
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
        $scope.optFlag = 'none';
    }

    /**
     * 检索树算法：递归法
     */
    $scope.traverseTree = function (node) {
        if (!node) {
            return;
        }
        b.push(node.id);
        if (node.children && node.children.length > 0) {
            var i = 0;
            for (i = 0; i < node.children.length; i++) {
                traverseTree(node.children[i]);
            }
        }
    };
    // traverseTree(treeNode);

    /**
     * 检索树算法：非递归法
     */
    var zNodesJSON = [];
    $scope.searchTree = function (node) {
        if (!node) {
            return;
        }
        var stack = [];
        stack.push(node);
        var tmpNode;
        while (stack.length > 0) {
            tmpNode = stack.pop();
            // traverseNode2(tmpNode);
            // console.log(tmpNode);
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