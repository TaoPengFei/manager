/**
 * Created by 陶鹏飞 on 2017/8/4.
 */
cBoard.controller('roleCtrl', function ($rootScope, $scope, $http, dataService, $uibModal, ModalUtils, $filter, chartService) {

    var translate = $filter('translate');
    $scope.optFlag = 'none';
    $scope.curDataset = {data: {expressions: []}};
    $scope.curWidget = {};
    $scope.roleName = "";
    $scope.newRole = "";
    $scope.newDesc = "";
    $scope.count = 0;//已选择数量
    $scope.selectData = [];//已选对象

    //用于测试
    // $scope.testBool = true;

    /*$scope.paginationConf = {
        currentPage: 1,
        totalItems: 18,    //总条目
        itemsPerPage: 8, // 每页的个数
        pagesLength: 8,  //每页长度
        perPageOptions: [10, 20, 30, 40, 50],
        onChange: function () {
            //TODO
            console.log("onChange...");
            $http({
                method: 'get',
                url: '../role/getRoles.do',
                params: {
                    roleName: $scope.roleName
                }
            }).success(function (response) {
                //$scope.roleList = response;
                //console.log("roleList:");
                //console.log($scope.roleList.data.length);
                //$scope.initPageSort(response);
                $scope.paginationConf.currentPage = 1;  //当前页
                $scope.paginationConf.totalItems = response.data.length;  //总条目
                $scope.paginationConf.itemsPerPage = 10;  // 每页的页数
                $scope.paginationConf.pagesLength = $scope.pageSize;  //每页长度
            })
        }
    };*/


    $scope.pageSize = 8;　　//分页大小，可以随意更改

    /*
     * 当页面列表数据过多时，我们经常会收到将列表内容分页的需求，列表内容分页一般会有两种做法：
     *    1、不需要后台配合，前台一次性拿完所有数据，然后进行分页展示；这种方式只是为了界面上对用户更友好，
     *  并没有实际提升页面的效率（数据量过大时页面加载压力比较大）
     *    2、需要后台配合，后台对改数据做分页处理，页面每次只请求需要展示的该页面的数据，换页时需要二次请求，这种方式是比较推荐的
     */
    //分页
    $scope.initPageSort = function (item) {
        //$scope.data = item;
        $scope.data = item.data;
        $scope.pages = Math.ceil($scope.data.length / $scope.pageSize); //分页数
        $scope.newPages = $scope.pages > 5 ? 5 : $scope.pages;
        $scope.pageList = [];
        $scope.selPage = 1;
        //设置表格数据源(分页)
        $scope.setData = function () {
            //通过当前页数筛选出表格当前显示数据
            $scope.items = $scope.data.slice(($scope.pageSize * ($scope.selPage - 1)), ($scope.selPage * $scope.pageSize));
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
        console.log("Previous...")
        $scope.selectPage($scope.selPage - 1);
    };

    //下一页
    $scope.Next = function () {
        console.log("Next...")
        $scope.selectPage($scope.selPage + 1);
    };


    var getRolesList = function () {
        $http({
            method: 'get',
            url: './role/getRoles.do',
            params: {
                roleName: $scope.roleName
            }
        }).success(function (response) {
            $scope.initPageSort(response);
        })
    };
    getRolesList();

    //数据双向绑定+监听机制
    $scope.$watch("roleName", function () {
        $http({
            method: 'post',
            url: './role/getRoles.do',
            data: {
                roleName: $scope.roleName
            }
        }).success(function (response) {
            if (response.code === 0) {
                //ModalUtils.alert(translate(response.msg + "!"), "modal-danger", "md");
            } else if (response.code === 1) {
                //ModalUtils.alert(translate(response.msg + "!"), "modal-success", "md");
            } else if (response.code === -1) {
                //ModalUtils.alert(translate(response.msg + "!"), "modal-danger", "md");
            }
            $scope.roleList = response;
            $scope.initPageSort($scope.roleList);
        }).error(function (XMLHttpRequest, textStatus, errorThrown) {
            ModalUtils.alert(translate(errorThrown + "!"), "modal-danger", "sm");
        });
    })

    //新增
    $scope.addRole = function () {
        $uibModal.open({
            templateUrl: 'org/cboard/view/config/modal/addRole.html',
            //windowTemplateUrl: 'org/cboard/view/util/modal/window.html',
            backdrop: false,
            controller: function ($scope, $uibModalInstance) {
                $scope.close = function () {
                    $uibModalInstance.close();
                };
                $scope.save = function () {
                    $http({
                        method: 'post',
                        url: './role/addRole.do',
                        data: {
                            roleName: $scope.newRole,
                            roleDesc: $scope.newDesc
                        }
                    }).success(function (response) {
                        if (response.code === 1) {
                            ModalUtils.alert(translate(response.msg + "!"), "modal-success", "md");
                        } else if (response.code === 0) {
                            ModalUtils.alert(translate(response.msg + "!"), "modal-danger", "md");
                        } else if (response.code === -1) {
                            ModalUtils.alert(translate(response.msg + "!"), "modal-danger", "md");
                        }
                        getRolesList();
                    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                        ModalUtils.alert(translate(errorThrown + "!"), "modal-danger", "sm");
                    })
                    $uibModalInstance.close();
                }
            }
        });
    }

    //编辑
    $scope.editRole = function (current, $event) {
        $uibModal.open({
            templateUrl: 'org/cboard/view/config/modal/editRole.html',
            //windowTemplateUrl: 'org/cboard/view/util/modal/window.html',
            backdrop: false,
            controller: function ($scope, $uibModalInstance) {
                $scope.close = function () {
                    $uibModalInstance.close();
                };
                $scope.editRoleName = current.roleName;
                $scope.editRoleDesc = current.roleDesc;
                $scope.save = function () {
                    $http({
                        method: 'post',
                        url: './role/updateRole.do',
                        data: {
                            roleName: current.roleName,
                            roleDesc: $scope.editRoleDesc
                        }
                    }).success(function (response) {
                        if (response.code === 1) {
                            ModalUtils.alert(translate(response.msg + "!"), "modal-success", "md");
                        } else if (response.code === 0) {
                            ModalUtils.alert(translate(response.msg + "!"), "modal-danger", "md");
                        } else if (response.code === -1) {
                            ModalUtils.alert(translate(response.msg + "!"), "modal-danger", "md");
                        }
                        getRolesList();
                    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                        ModalUtils.alert(translate(errorThrown + "!"), "modal-danger", "sm");
                    })
                    $uibModalInstance.close();
                }
            }
        });
        $event.stopPropagation();//阻止冒泡
    }

    //单个删除
    /*$scope.singleDelRole = function (current, $event) {
        $http({
            method: 'post',
            url: '/role/delRole.do',
            data: {
                roleName: current.roleName
            }
        }).success(function (response) {
            if (response.code === 1) {
                ModalUtils.alert(translate(response.msg + "!"), "modal-success", "md");
            } else if (response.code === 0) {
                ModalUtils.alert(translate(response.msg + "!"), "modal-danger", "md");
            } else if (response.code === -1) {
                ModalUtils.alert(translate(response.msg + "!"), "modal-danger", "md");
            }
            getRolesList();
        }).error(function (XMLHttpRequest, textStatus, errorThrown) {
            ModalUtils.alert(translate(errorThrown + "!"), "modal-danger", "sm");
        })
        $event.stopPropagation();//阻止冒泡
    }*/

    //多选删除
    /*$scope.multipleDelRole = function () {
        console.log("multipleDelRole...");
        //TODO.....
    }*/


    //选择单个（取消选择单个)
    /*$scope.changeCurrent = function (current, $event) {
        //计算已选数量 true加， false减
        $scope.count += current.checked ? 1 : -1;
        //判断是否全选，选数量等于数据长度为true
        $scope.selectAll = $scope.count === $scope.roleList.data.length;
        //统计已选对象
        $scope.selectData = [];
        angular.forEach($scope.roleList.data, function (item) {
            if (item.checked) {
                $scope.selectData[$scope.selectData.length] = item;
            }
        });
        $event.stopPropagation();//阻止冒泡
    };*/

    //单击行选中
    /*$scope.changeCurrents = function (current, $event) {
        if (current.checked == undefined) {
            current.checked = true;
        } else {
            current.checked = !current.checked;
        }
        $scope.changeCurrent(current, $event);
    };*/

    //全选（取消全选）
    /*$scope.changeAll = function () {
        //console.log(scope.selectAll);
        angular.forEach($scope.roleList.data, function (item) {
            item.checked = $scope.selectAll;
        });
        $scope.count = $scope.selectAll ? $scope.roleList.data.length : 0;
        if ($scope.selectAll) {
            $scope.selectData = $scope.roleList.data;
        } else {
            $scope.selectData = [];
        }
    };*/


});