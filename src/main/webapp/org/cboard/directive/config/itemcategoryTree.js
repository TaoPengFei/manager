/**
 * Created by 陶鹏飞 on 2017/9/25.
 */
cBoard.directive('item', ['$http', '$interval', '$filter', '$log', function ($http, $interval, $filter, $log) {
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
                        console.log("click...");
                        // $scope.optFlag = 'editItemCategory';
                        // $scope.itemTreeStatus = "";
                        // $scope.newItemCat();
                    }
                }
            };

            function dblClickExpand(treeId, treeNode) {
                return treeNode.level > 0;
            };
            function addDiyDom(treeId, treeNode) {
                var aObj = $("#" + treeNode.tId + "_a");
                if ($("#diyBtn_" + treeNode.id).length > 0) return;
                // var editStr = "<span class='addTree button add' id='addBtn_" + treeNode.id + "' title='增加' onfocus='this.blur();'></span>"
                // var editStr = "<span id='addBtn_" + treeNode.id + "' title='增加' onfocus='this.blur();'></span>"
                var editStr = ""
                    + "<span class='addTree button edit' id='editBtn_" + treeNode.id + "' title='修改' onfocus='this.blur();'></span>"
                    + "<span class='addTree button remove' id='delBtn_" + treeNode.id + "' title='删除' onfocus='this.blur();'></span>";
                aObj.append(editStr);
                // var addbtn = $("#addBtn_" + treeNode.id);
                var editbtn = $("#editBtn_" + treeNode.id);
                var delbtn = $("#delBtn_" + treeNode.id);
                /*if (addbtn) addbtn.bind("click", function () {
                    $scope.$apply(function () {
                        $scope.curBrand = treeNode.name;
                        //提交父ID参数
                        $scope.pId = treeNode.id;
                    });
                    $scope.addBrand.Code = "";
                    $scope.addBrand.Name = "";
                    $scope.addBrand.Desc = "";
                    $scope.newDs();
                });*/
                if (editbtn) editbtn.bind("click", function () {
                    $scope.optFlag = 'editItemCategory';
                    $scope.$apply(function () {
                        //提交父ID参数
                        $scope.curBrandpId = treeNode.pId;
                        $scope.curBrandId = treeNode.id;
                        $scope.editBrand.Code = treeNode.code;
                        $scope.editBrand.Name = treeNode.name;
                        $scope.editBrand.Desc = treeNode.desc;
                    });
                    // $scope.editDs();
                });
                if (delbtn) delbtn.bind("click", function () {
                    $scope.optFlag = 'none';
                    $scope.searchTree(treeNode);
                    $scope.delBrand();
                });
            };


            //设置当前选中页样式
            $scope.isActivePage = function (page) {
                return $scope.selPage == page;
            };
            //上一页
            $scope.Previous = function () {
                $scope.selectPage($scope.selPage - 1);
            };
            //下一页
            $scope.Next = function () {
                $scope.selectPage($scope.selPage + 1);
            };
            var reloadTree = function () {
                $http({
                    method: 'get',
                    url: './itemcategory/getItemCat.do'
                }).success(function (response) {
                    $scope.pageSize = 20;　　//分页大小，可以随意更改
                    $scope.data = response.data;
                    $scope.pages = Math.ceil($scope.data.length / $scope.pageSize); //分页数
                    $scope.newPages = $scope.pages > 5 ? 5 : $scope.pages;
                    $scope.pageList = [];
                    $scope.selPage = 1;
                    //设置树数据源(分页)
                    ($scope.setData = function () {
                        $scope.items = $scope.data.slice(($scope.pageSize * ($scope.selPage - 1)), ($scope.selPage * $scope.pageSize));//通过当前页数筛选出表格当前显示数据
                        let zNodes = [];
                        zNodes = _.map($scope.items, function (obj, iteratee, context) {
                            let newArr = [];
                            newArr.push({
                                "id": obj.ItemCatId,
                                "pId": obj.pItemCatId,
                                "name": obj.ItemCatName,
                                "ShortName": obj.ItemCatShortName,
                                "desc": obj.ItemCatDesc,
                                "code": obj.ItemCatCode,
                                "Status": obj.Status,
                                "pItemCatId2": obj.pItemCatId2,
                                "ItemCatSeq": obj.ItemCatSeq,
                                "open": true
                            });
                            return newArr[0];
                        })
                        zNodes.push({
                            "id": 0,
                            "pId": -1,
                            "name": "Root",
                            "desc": "Root",
                            "code": "Root",
                            "open": true
                        });
                        $.fn.zTree.init(element, setting, zNodes);
                    })();
                    $scope.items = $scope.data.slice(0, $scope.pageSize);

                    //分页要repeat的数组
                    for (var i = 0; i < $scope.newPages; i++) {
                        $scope.pageList.push(i + 1);
                    }
                    //打印当前选中页索引
                    $scope.selectPage = function (page) {
                        //不能小于1大于最大
                        if (page < 1 || page > $scope.pages) return;
                        //最多显示分页数5
                        if (page > 2) {
                            //因为只显示5个页数，大于2页开始分页转换
                            var newpageList = [];
                            for (var i = (page - 3); i < ((page + 2) > $scope.pages ? $scope.pages : (page + 2)); i++) {
                                newpageList.push(i + 1);
                            }
                            $scope.pageList = newpageList;
                        }
                        $scope.selPage = page;
                        $scope.setData();
                        $scope.isActivePage(page);
                        //console.log("选择的页：" + page);
                    }

                    /*let zNodes = [];
                     zNodes = _.map(item.data, function (obj, iteratee, context) {
                     let newArr = [];
                     newArr.push({
                     "id": obj.ItemCatId,
                     "pId": obj.pItemCatId,
                     "name": obj.ItemCatName,
                     "ShortName": obj.ItemCatShortName,
                     "desc": obj.ItemCatDesc,
                     "code": obj.ItemCatCode,
                     "Status": obj.Status,
                     "pItemCatId2": obj.pItemCatId2,
                     "ItemCatSeq": obj.ItemCatSeq,
                     "open": false
                     });
                     /!*newArr.push({
                     "id": obj.ItemCatId,
                     "pId": obj.pItemCatId,
                     "name": obj.ItemCatName,
                     "ShortName": obj.ItemCatShortName,
                     "desc": obj.ItemCatDesc,
                     "code": obj.ItemCatCode,
                     "Status": obj.Status,
                     "pItemCatId2": obj.pItemCatId2,
                     "ItemCatSeq": obj.ItemCatSeq,
                     "open": false
                     });*!/
                     return newArr[0];
                     })
                     console.log(zNodes.push({
                     "id": 0,
                     "pId": -1,
                     "name": "Root",
                     "desc": "Root",
                     "code": "Root",
                     "open": false
                     }));
                     $.fn.zTree.init(element, setting, zNodes);*/
                })
            };
            reloadTree();
            //监听的数据是一个函数，该函数必须先在父作用域定义
            /*$scope.$watch("treeStatus", function (newValue, oldValue, $scope) {
             if (newValue && !oldValue) {
             reloadTree();
             $scope.treeStatus = "";
             }
             }, true);*/
        }
    }
}]);