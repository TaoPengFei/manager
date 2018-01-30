/**
 * Created by 陶鹏飞 on 2017/9/20.
 */
cBoard.controller('itemdeptmentCtrl', function ($rootScope, $scope, $http, dataService, $uibModal, ModalUtils, $filter, chartService) {

    var translate = $filter('translate');

///表格的头部
    $scope.itemDeptmentHeaderInfos = [
        {'name': '编码', 'col': 'ItemDeptCode'},
        {'name': '名称', 'col': 'ItemDeptName'},
        {'name': '简称', 'col': 'ItemDeptShortName'},
        {'name': '描述', 'col': 'ItemDeptDesc'},
        {'name': '父部门ID', 'col': 'pItemDeptId'},
        {'name': '序列', 'col': 'ItemDeptSeq'},
        {'name': '状态', 'col': 'Status'},
        {'name': '创建时间', 'col': 'CreateTime'},
        {'name': '更新时间', 'col': 'UpdateTime'},
        {'name': '操作'}
    ];

    $scope.pageSize = 12;　　//分页大小，可以随意更改

    /*
     * 当页面列表数据过多时，我们经常会收到将列表内容分页的需求，列表内容分页一般会有两种做法：
     *    1、不需要后台配合，前台一次性拿完所有数据，然后进行分页展示；这种方式只是为了界面上对用户更友好，
     *  并没有实际提升页面的效率（数据量过大时页面加载压力比较大）
     *    2、需要后台配合，后台对改数据做分页处理，页面每次只请求需要展示的该页面的数据，换页时需要二次请求，这种方式是比较推荐的
     */

    //分页
    $scope.initPageSort = function (item) {
        $scope.data = item.data;
        $scope.pages = Math.ceil($scope.data.length / $scope.pageSize); //分页数
        $scope.newPages = $scope.pages > 5 ? 5 : $scope.pages;
        $scope.pageList = [];
        $scope.selPage = 1;
        //设置表格数据源(分页)
        $scope.setData = function () {
            $scope.items = $scope.data.slice(($scope.pageSize * ($scope.selPage - 1)), ($scope.selPage * $scope.pageSize));//通过当前页数筛选出表格当前显示数据
        };
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

    //初始化
    var getItemDeptmentList = function () {
        $http({
            method: 'get',
            url: './itemdeptment/getItemDep.do'
            /*params: {
             userName: $scope.userName
             }*/
        }).success(function (response) {
            // $scope.itemDeptmentList = response;
            $scope.initPageSort(response);
        }).error(function (XMLHttpRequest, textStatus, errorThrown) {
            ModalUtils.alert(translate(errorThrown + "!"), "modal-danger", "sm");
        });
    };
    getItemDeptmentList();

    $scope.addItemDeptment = function () {
        $uibModal.open({
            templateUrl: 'org/cboard/view/config/modal/addItemDeptment.html',
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
                        url: './itemdeptment/addItemDep.do',
                        data: JSON.stringify({
                            ItemDeptCode: $scope.newItemDeptmentCode,
                            ItemDeptName: $scope.newItemDeptmentName,
                            ItemDeptShortName: $scope.newItemDeptmentShortName,
                            pItemDeptId: $scope.newPID,
                            ItemDeptSeq: $scope.newItemDeptmentSeq,
                            Status: $scope.newItemDeptmentStatus,
                            ItemDeptDesc: $scope.newItemDeptDesc,
                        })
                    }).success(function (response) {
                        if (response.code === 0) {
                            ModalUtils.alert(translate(response.msg + "!"), "modal-danger", "md");
                        } else if (response.code === 1) {
                            ModalUtils.alert(translate(response.msg + "!"), "modal-success", "md");
                        } else if (response.code === -1) {
                            ModalUtils.alert(translate(response.msg + "!"), "modal-danger", "md");
                        }
                        getItemDeptmentList();
                    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                        ModalUtils.alert(translate(errorThrown + "!"), "modal-danger", "sm");
                    });
                    $uibModalInstance.close();
                }
            }
        });
    }

    $scope.editItemDeptment = function (current, $event) {
        $uibModal.open({
            templateUrl: 'org/cboard/view/config/modal/editItemDeptment.html',
            //windowTemplateUrl: 'org/cboard/view/util/modal/window.html',
            backdrop: false,
            controller: function ($scope, $uibModalInstance, $http) {
                $scope.close = function () {
                    $uibModalInstance.close();
                };
                $scope.editItemDeptmentCode = current.ItemDeptCode;
                $scope.editItemDeptmentName = current.ItemDeptName;
                $scope.editItemDeptmentShortName = current.ItemDeptShortName;
                $scope.editPID = current.pItemDeptId;
                $scope.editItemDeptmentSeq = current.ItemDeptSeq;
                $scope.editItemDeptmentStatus = current.Status;
                $scope.editItemDeptDesc = current.ItemDeptDesc;
                $scope.save = function () {
                    $http({
                        method: 'POST',
                        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
                        url: './itemdeptment/updateItemDep.do',
                        data: JSON.stringify({
                            ItemDeptId: current.ItemDeptId,
                            ItemDeptSeq: $scope.editItemDeptmentSeq,
                            ItemDeptCode: $scope.editItemDeptmentCode,
                            ItemDeptName: $scope.editItemDeptmentName,
                            ItemDeptShortName: $scope.editItemDeptmentShortName,
                            pItemDeptId: $scope.editPID,
                            Status: $scope.editItemDeptmentStatus,
                            ItemDeptDesc: $scope.editItemDeptDesc
                        })
                    }).success(function (response) {
                        if (response.code === 0) {
                            ModalUtils.alert(translate(response.msg + "!"), "modal-danger", "md");
                        } else if (response.code === 1) {
                            ModalUtils.alert(translate(response.msg + "!"), "modal-success", "md");
                        } else if (response.code === -1) {
                            ModalUtils.alert(translate(response.msg + "!"), "modal-danger", "md");
                        }
                        getItemDeptmentList();
                    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                        ModalUtils.alert(translate(errorThrown + "!"), "modal-danger", "sm");
                    });
                    $uibModalInstance.close();
                }
            }
        });
    }

    $scope.delItemDeptment = function (current, $event) {
        $http({
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
            url: './itemdeptment/deleteItemDep.do',
            data: JSON.stringify({
                ItemDeptId: (function () {
                    var delArr = [];
                    delArr.push(current.ItemDeptId);
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
            getItemDeptmentList();
        }).error(function (XMLHttpRequest, textStatus, errorThrown) {
            ModalUtils.alert(translate(errorThrown + "!"), "modal-danger", "sm");
        });
    }

});