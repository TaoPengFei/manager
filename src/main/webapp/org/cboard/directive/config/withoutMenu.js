/**
 * Created by 陶鹏飞 on 2017/8/28.
 */
// 'use strict';

cBoard.directive('without', ['$http', '$interval', '$filter', '$log','$uibModal','ModalUtils', function ($http, $interval, $filter, $log, $uibModal, ModalUtils) {
    return {
        require: '?ngModel',
        restrict: 'A',
        link: function ($scope, element, attrs, ngModel) {
            var withoutDragId;
            var withoutDragNodes;
            var withoutDragPNodes;
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
                        // inner: false
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
                    beforeDrag: function (treeId, treeNodes) {
                        for (var i = 0, l = treeNodes.length; i < l; i++) {
                            withoutDragNodes = treeNodes[i];
                            withoutDragId = treeNodes[i].pId;
                            if(!treeNodes[i].children){
                                withoutDragPNodes = treeNodes[i].getParentNode();
                            }
                            if (treeNodes[i].drag === false || !treeNodes[i].getParentNode()) {
                                return false;
                            }
                        }
                        return true;
                    },
                    beforeDrop: function (treeId, treeNodes, targetNode, moveType) {
                        //如果有提交到后台的操作，则会先执行if…else…再执行post等提交操作
                        if(targetNode) {
                            if(targetNode.children != undefined){
                                //console.log(targetNode.children[0].name)
                                //var nodes = targetNode.children;
                                var name = treeNodes[0].name;
                                for (i = 0; i < targetNode.children.length; i++) {
                                    if(targetNode.children[i].name == name){
                                        alert("Error: This name already exists.");
                                        return false;
                                    }
                                }
                            }
                            return true;
                        }
                        return false;
                        /*if(targetNode.id == withoutDragId){
                            /!**
                             * 检索树算法：非递归法
                             *!/
                            var withoutNodesJSON = [];
                            $scope.searchWithoutTree = function (node) {
                                if (!node) {
                                    return;
                                }
                                var stack = [];
                                stack.push(node);
                                var tmpNode;
                                while (stack.length > 0) {
                                    tmpNode = stack.pop();
                                    withoutNodesJSON.push(tmpNode.id);
                                    if (tmpNode.children && tmpNode.children.length > 0) {
                                        var i = tmpNode.children.length - 1;
                                        for (i = tmpNode.children.length - 1; i >= 0; i--) {
                                            stack.push(tmpNode.children[i]);
                                        }
                                    }
                                }
                            };
                            $scope.searchWithoutTree(withoutDragNodes);
                            console.log(withoutNodesJSON);
                            $http({
                                method: 'POST',
                                headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
                                url: '/roleMenuTree/insertRoleMenuTree.do',
                                data: JSON.stringify({
                                    menuIds: withoutNodesJSON,
                                    roleName: $scope.selectedRoleName
                                })
                            }).success(function (response) {
                                if (response.code === 0) {
                                    ModalUtils.alert($scope.translate(response.msg + "!"), "modal-danger", "md");
                                } else if (response.code === 1) {
                                    // loadWithoutTree();
                                    /!*$scope.loadWithoutTree();
                                     $scope.loadWithTree();*!/
                                    // ModalUtils.alert($scope.translate(response.msg + "!"), "modal-success", "md");
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
                        }*/
                    },
                    onClick: function (event, treeId, treeNode, clickFlag) {
                        $scope.$apply(function () {
                            ngModel.$setViewValue(treeNode);
                        });
                    },
                    onDblClick: function (event, treeId, treeNode) {
                        $scope.withoutMenuEdit();
                        // alert(treeNode ? treeNode.tId + ", " + treeNode.name : "isRoot");
                    },
                    onDrop: function(event, treeId, treeNodes, targetNode, moveType, isCopy){
                        console.log("拖拽完毕");
                        console.log(targetNode);
                        /**
                         * 检索树算法：非递归法
                         */
                        var withoutNodesJSON = [];
                        $scope.searchWithoutTree = function (node) {
                            if (!node) {
                                return;
                            }
                            var stack = [];
                            stack.push(node);
                            var tmpNode;
                            while (stack.length > 0) {
                                tmpNode = stack.pop();
                                withoutNodesJSON.push(tmpNode.id);
                                if (tmpNode.children && tmpNode.children.length > 0) {
                                    var i = tmpNode.children.length - 1;
                                    for (i = tmpNode.children.length - 1; i >= 0; i--) {
                                        stack.push(tmpNode.children[i]);
                                    }
                                }
                            }
                        };
                        if(treeNodes[0].isParent){
                            $scope.searchWithoutTree(treeNodes[0]);
                            console.log(withoutNodesJSON);
                            $http({
                                method: 'POST',
                                headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
                                url: './roleMenuTree/insertRoleMenuTree.do',
                                data: JSON.stringify({
                                    menuIds: withoutNodesJSON,
                                    roleName: $scope.selectedRoleName
                                })
                            }).success(function (response) {
                                if (response.code === 0) {
                                    ModalUtils.alert($scope.translate(response.msg + "!"), "modal-danger", "md");
                                } else if (response.code === 1) {
                                    // loadWithoutTree();
                                    /*$scope.loadWithoutTree();
                                     $scope.loadWithTree();*/
                                    $scope.treeStatusArea = response.code;
                                    // ModalUtils.alert($scope.translate(response.msg + "!"), "modal-success", "md");
                                } else if (response.code === -1) {
                                    ModalUtils.alert($scope.translate(response.msg + "!"), "modal-danger", "md");
                                } else if (response.code === -2) {
                                    ModalUtils.alert($scope.translate(response.msg + "!"), "modal-danger", "md");
                                }
                            }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                                ModalUtils.alert($scope.translate(errorThrown + "!"), "modal-danger", "sm");
                            });
                        }else {
                            $scope.searchWithoutTree(treeNodes[0]);
                            withoutNodesJSON.push(withoutDragPNodes.id);
                            console.log(withoutNodesJSON);
                            $http({
                                method: 'POST',
                                headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
                                url: './roleMenuTree/insertRoleMenuTree.do',
                                data: JSON.stringify({
                                    menuIds: withoutNodesJSON,
                                    roleName: $scope.selectedRoleName
                                })
                            }).success(function (response) {
                                if (response.code === 0) {
                                    ModalUtils.alert($scope.translate(response.msg + "!"), "modal-danger", "md");
                                } else if (response.code === 1) {
                                    // loadWithoutTree();
                                    /*$scope.loadWithoutTree();
                                     $scope.loadWithTree();*/
                                    $scope.treeStatusArea = response.code;
                                    $scope.loadWithTree();
                                    // ModalUtils.alert($scope.translate(response.msg + "!"), "modal-success", "md");
                                } else if (response.code === -1) {
                                    ModalUtils.alert($scope.translate(response.msg + "!"), "modal-danger", "md");
                                } else if (response.code === -2) {
                                    ModalUtils.alert($scope.translate(response.msg + "!"), "modal-danger", "md");
                                }
                            }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                                ModalUtils.alert($scope.translate(errorThrown + "!"), "modal-danger", "sm");
                            });
                        }

                        // console.log("【源节点】节点id:"+treeNodes[0].id+"  父节点id:"+treeNodes[0].pId+"  级层："+treeNodes[0].level+"  名称："+treeNodes[0].name);
                        //如果拖拽的是目录
                        /*if(treeNodes[0].isParent){
                            $.each(treeNodes[0].children,function(i,treeNode){
                                console.log("【源节点】子节点"+i+":"+treeNode.id+"  父节点id:"+treeNode.pId+"  级层："+treeNode.level+"  名称："+treeNode.name);
                            });
                        }
                        console.log("【目标节点】 节点id:"+targetNode.id+"  父节点id:"+targetNode.pId+"  级层："+targetNode.level+"  名称："+targetNode.name);*/
                        //console.log("event:"+event+"--treeId:"+treeId+"--treeNodes:"+treeNodes+"--targetNode:"+targetNode+"--moveType:"+moveType+"--isCopy:"+isCopy);
                        return true;
                    }
                }
            };

            function dblClickExpand(treeId, treeNode) {
                return treeNode.level > 0;
            };

            $scope.loadWithoutTree = function () {
                $scope.$watch("selectedRoleName", function () {
                    $http({
                        method: 'get',
                        url: './roleMenuTree/getMenusTree.do',
                        params: {
                            roleName: $scope.selectedRoleName
                        }
                    }).success(function (response) {
                        let zNodes = [];
                        zNodes = _.map(response.menuWithoutRole, function (obj, iteratee, context) {
                            let newArr = [];
                            newArr.push({
                                "id": obj.menuid,
                                "pId": obj.pid,
                                "name": obj.menuname
                                /*"desc": obj.BrandDesc,
                                 "code": obj.BrandCode,*/
                            });
                            return newArr[0];
                        });
                        $.fn.zTree.init(element, setting, zNodes);
                        var treeObj = $.fn.zTree.getZTreeObj("withoutMenuTree");
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
                        $(".ztree>li>span.chk").hide();//隐藏root节点选择框
                    })
                });
            };
            $scope.loadWithoutTree();
            //监听的数据是一个函数，该函数必须先在父作用域定义
            /*$scope.$watch("treeStatusArea", function (newValue, oldValue, $scope) {
                if (newValue && !oldValue) {
                    $scope.loadWithTree();
                    // $scope.loadWithoutTree();
                    $scope.treeStatusArea = "";
                }
            }, true);*/
        }
    }
}]);

