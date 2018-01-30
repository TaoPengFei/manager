/**
 * Created by 陶鹏飞 on 2017/8/28.
 */
// 'use strict';

cBoard.directive('with', ['$http', '$interval', '$filter', '$log','$uibModal','ModalUtils', function ($http, $interval, $filter, $log, $uibModal, ModalUtils) {
    return {
        require: '?ngModel',
        restrict: 'A',
        link: function ($scope, element, attrs, ngModel) {
            var withDragNodes;
            var withDragId;
            var setting = {
                edit: {
                    enable: true,
                    showRemoveBtn: false,
                    showRenameBtn: false,
                    drag: {
                        isCopy: true,
                        isMove: true,
                        prev: false,
                        next: false,
                        inner: true
                        // inner: canInner

                    }
                },
                /*check: {
                    enable: true
                },*/
                view: {
                    dblClickExpand: false,
                    // dblClickExpand: dblClickExpand,
                    // addDiyDom: addDiyDom,
                    selectedMulti: false
                },
                data: {
                    key: {
                        title: "name"
                    },
                    simpleData: {
                        enable: true
                    }
                },
                callback: {
                    beforeDrag: beforeDrag,
                    beforeDrop: beforeDrop,
                    onClick: function (event, treeId, treeNode, clickFlag) {
                        $scope.$apply(function () {
                            ngModel.$setViewValue(treeNode);
                        });
                    },
                    onDblClick: withoutTreeOnDblClick
                }
            };

            /*function canInner(treeId, nodes, targetNode) {
                return !(targetNode && targetNode.level === 2);
            };*/

            function dblClickExpand(treeId, treeNode) {
                return treeNode.level > 0;
            };

            function beforeDrag(treeId, treeNodes) {
                /*for (var i=0,l=treeNodes.length; i<l; i++) {
                    if (treeNodes[i].drag === false) {
                        return false;
                    }
                }
                return true;*/
                for (var i=0,l=treeNodes.length; i<l; i++) {
                    withDragNodes = treeNodes[i];
                    withDragId = treeNodes[i].pId;
                    if (treeNodes[i].drag === false || !treeNodes[i].getParentNode()) {
                        return false;
                    }
                }
                return true;
            };

            function beforeDrop(treeId, treeNodes, targetNode, moveType) {
                // return targetNode ? targetNode.drop !== false : true;
                if(targetNode.id == withDragId){
                    /**
                     * 检索树算法：非递归法
                     */
                    var withNodesJSON = [];
                    $scope.searchWithTree = function (node) {
                        if (!node) {
                            return;
                        }
                        var stack = [];
                        stack.push(node);
                        var tmpNode;
                        while (stack.length > 0) {
                            tmpNode = stack.pop();
                            withNodesJSON.push(tmpNode.id);
                            if (tmpNode.children && tmpNode.children.length > 0) {
                                var i = tmpNode.children.length - 1;
                                for (i = tmpNode.children.length - 1; i >= 0; i--) {
                                    stack.push(tmpNode.children[i]);
                                }
                            }
                        }
                    };
                    $scope.searchWithTree(withDragNodes);
                    console.log(withNodesJSON);
                    $http({
                        method: 'POST',
                        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
                        url: './roleMenuTree/deleteRoleMenuTree.do',
                        data: JSON.stringify({
                            menuIds: withNodesJSON,
                            roleName: $scope.selectedRoleName
                        })
                    }).success(function (response) {
                        if (response.code === 0) {
                            ModalUtils.alert($scope.translate(response.msg + "!"), "modal-danger", "md");
                        } else if (response.code === 1) {
                            // ModalUtils.alert($scope.translate(response.msg + "!"), "modal-success", "md");
                            /*$scope.loadWithoutTree();
                            $scope.loadWithTree();*/
                        } else if (response.code === -1) {
                            ModalUtils.alert($scope.translate(response.msg + "!"), "modal-danger", "md");
                        } else if (response.code === -2) {
                            ModalUtils.alert($scope.translate(response.msg + "!"), "modal-danger", "md");
                        }
                    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                        ModalUtils.alert($scope.translate(errorThrown + "!"), "modal-danger", "sm");
                    });
                    return true;
                }else{
                    return false;
                }
            };

            /*function beforeDrag(treeId, treeNodes) {
                for (var i=0,l=treeNodes.length; i<l; i++) {
                    dragId = treeNodes[i].pId;
                    if (treeNodes[i].drag === false) {
                        return false;
                    }
                }
                return true;
            }
            function beforeDrop(treeId, treeNodes, targetNode, moveType) {
                if(targetNode.pId == dragId){
                    return true;
                }else{
                    return false;
                }
            }*/

            function withoutTreeOnDblClick(event, treeId, treeNode) {
                $scope.withMenuEdit();
                // alert(treeNode ? treeNode.tId + ", " + treeNode.name : "isRoot");
            };
            /*function addDiyDom(treeId, treeNode) {
                var aObj = $("#" + treeNode.tId + "_a");
                if ($("#diyBtn_" + treeNode.id).length > 0) return;
                var editStr = "<span class='addTree button add' id='addBtn_" + treeNode.id + "' title='增加' onfocus='this.blur();'></span>"
                    + "<span class='addTree button edit' id='editBtn_" + treeNode.id + "' title='修改' onfocus='this.blur();'></span>"
                    + "<span class='addTree button remove' id='delBtn_" + treeNode.id + "' title='删除' onfocus='this.blur();'></span>";
                aObj.append(editStr);
                var addbtn = $("#addBtn_" + treeNode.id);
                var editbtn = $("#editBtn_" + treeNode.id);
                var delbtn = $("#delBtn_" + treeNode.id);
                if (addbtn) addbtn.bind("click", function () {
                    $scope.$apply(function () {
                        $scope.curBrand = treeNode.name;
                        //提交父ID参数
                        $scope.pId = treeNode.id;
                    });
                    $scope.addBrand.Code = "";
                    $scope.addBrand.Name = "";
                    $scope.addBrand.Desc = "";
                    $scope.newDs();
                });
                if (editbtn) editbtn.bind("click", function () {
                    $scope.$apply(function () {
                        //提交父ID参数
                        $scope.curBrandpId = treeNode.pId;
                        $scope.curBrandId = treeNode.id;
                        $scope.editBrand.Code = treeNode.code;
                        $scope.editBrand.Name = treeNode.name;
                        $scope.editBrand.Desc = treeNode.desc;
                    });
                    $scope.editDs();
                });
                if (delbtn) delbtn.bind("click", function () {
                    $scope.optFlag = 'none';
                    $scope.searchTree(treeNode);
                    $scope.delBrand();
                });
            };*/

            $scope.loadWithTree = function () {
                $scope.$watch("selectedRoleName",function () {
                    $http({
                        method: 'get',
                        url: './roleMenuTree/getMenusTree.do',
                        params: {
                            roleName: $scope.selectedRoleName
                        }
                    }).success(function (response) {
                        let zNodes = [];
                        // let arr = [];
                        console.log(response.menuWithRole);
                        zNodes = _.map(response.menuWithRole, function (obj, iteratee, context) {
                            let newArr = [];
                            newArr.push({
                                "id": obj.menuid,
                                "pId": obj.pid,
                                "name": obj.menuname
                                /*"desc": obj.BrandDesc,
                                 "code": obj.BrandCode,*/
                            });
                            console.log(newArr);
                            return newArr[0];
                        });
                        $.fn.zTree.init(element, setting, zNodes);

                        var treeObj = $.fn.zTree.getZTreeObj("withMenuTree");
                        var nodes = treeObj.getNodes();
                        for (var i = 0; i < nodes.length; i++) { //设置节点展开
                            treeObj.expandNode(nodes[i], true, false, true);
                        }
                        //去掉选框
                        if (nodes.length > 0) {
                            for (var i = 0; i < nodes.length; i++) {
                                if (nodes[i].isParent) {//找到父节点
                                    nodes[i].nocheck = true;//nocheck为true表示没有选择框
                                }
                            }
                        }
                        ;
                        $(".ztree>li>span.chk").hide();//隐藏root节点选择框
                    })
                });
            };
            $scope.loadWithTree();
        }
    }
}]);

