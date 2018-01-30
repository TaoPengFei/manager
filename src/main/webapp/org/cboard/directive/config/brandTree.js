/**
 * Created by 陶鹏飞 on 2017/8/21.
 */
// 'use strict';

cBoard.directive('brand', ['$http', '$interval', '$filter', '$log', function ($http, $interval, $filter, $log) {
    return {
        require: '?ngModel',
        // scope: true,     //坑，这是一个坑呀！
        restrict: 'A',
        link: function ($scope, element, attrs, ngModel) {
            //var opts = angular.extend({}, $scope.$eval(attrs.nlUploadify));
            var setting = {
                view: {
                    dblClickExpand: dblClickExpand,
                    addDiyDom: addDiyDom,
                    selectedMulti: false
                },
                data: {
                    key: {
                        title: "desc"
                    },
                    simpleData: {
                        enable: true
                    }
                },
                callback: {
                    onClick: function (event, treeId, treeNode, clickFlag) {
                        $scope.$apply(function () {
                            ngModel.$setViewValue(treeNode);
                        });
                    }
                }
            };

            function dblClickExpand(treeId, treeNode) {
                return treeNode.level > 0;
            };
            function addDiyDom(treeId, treeNode) {
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
            };

            var reloadTree = function () {
                $http({
                    method: 'get',
                    url: './brand/selectBrand.do'
                }).success(function (response) {
                    let zNodes = [];
                    zNodes = _.map(response.data, function (obj, iteratee, context) {
                        let newArr = [];
                        newArr.push({
                            "id": obj.BrandId,
                            "pId": obj.pBrandId,
                            "name": obj.BrandName,
                            "desc": obj.BrandDesc,
                            "code": obj.BrandCode,
                            "open": true
                        });
                        return newArr[0];
                    })
                    $.fn.zTree.init(element, setting, zNodes);
                })
            };
            reloadTree();
            //监听的数据是一个函数，该函数必须先在父作用域定义
            $scope.$watch("treeStatus", function (newValue, oldValue, $scope) {
                if (newValue && !oldValue) {
                    reloadTree();
                    $scope.treeStatus = "";
                }
            }, true);
        }
    }
}]);
