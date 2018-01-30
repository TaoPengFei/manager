/**
 * Created by 陶鹏飞 on 2017/8/4.
 */
cBoard.controller('userCtrl', function ($rootScope, $scope, $http, dataService, $uibModal, ModalUtils, $filter, chartService) {

    var translate = $filter('translate');
    $scope.optFlag = 'none';
    $scope.dsView = '';
    $scope.curDatasource = {};
    $scope.userName = "";

    ///表格的头部
    $scope.headerInfos = [
        {'name': '序号', 'col': 'id'},
        {'name': '用户名', 'col': 'userName'},
        {'name': '角色名称', 'col': 'roleName'},
        {'name': '描述', 'col': 'description'},
        {'name': '状态', 'col': 'enabled'},
        {'name': '操作'}
    ];

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
        console.log("Previous...")
        console.log($scope.selPage - 1);
        $scope.selectPage($scope.selPage - 1);
    };

    //下一页
    $scope.Next = function () {
        console.log("Next...")
        console.log($scope.selPage + 1);
        $scope.selectPage($scope.selPage + 1);
    };

    //初始化
    var getUserList = function () {
        $http({
            method: 'get',
            url: './user/queryUser.do',
            params: {
                userName: $scope.userName
            }
        }).success(function (response) {
            console.log(response);
            //$scope.userList = response;
            $scope.initPageSort(response);
            /*
             //淘汰/启用样式控制
             $scope.setStyle = function () {
             //TODO
             }
             */
        }).error(function (XMLHttpRequest, textStatus, errorThrown) {
            ModalUtils.alert(translate(errorThrown + "!"), "modal-danger", "sm");
        });
    };
    getUserList();

    var getRoleList = function () {
        $http({
            method: 'get',
            url: './role/roleLoad.do'
        }).success(function (response) {
            $scope.roleList = response;
        }).error(function (XMLHttpRequest, textStatus, errorThrown) {
            ModalUtils.alert(translate(errorThrown + "!"), "modal-danger", "sm");
        });
    }

    //查询用户
    /*
     $scope.queryUser = function (current,$event) {
     console.log("查询用户...");
     };
     */
    //数据双向绑定+监听机制
    $scope.$watch("userName", function () {
        $http({
            method: 'post',
            url: './user/queryUser.do',
            data: {
                userName: $scope.userName
            }
        }).success(function (response) {
            $scope.userList = response;
            $scope.initPageSort($scope.userList);
        }).error(function (XMLHttpRequest, textStatus, errorThrown) {
            ModalUtils.alert(translate(errorThrown + "!"), "modal-danger", "sm");
        })
    })

    //增加用户
    $scope.addUser = function (current, $event) {
        $uibModal.open({
            templateUrl: 'org/cboard/view/config/modal/addUser.html',
            //windowTemplateUrl: 'org/cboard/view/util/modal/window.html',
            backdrop: false,
            controller: function ($scope, $uibModalInstance, $http) {
                $http({
                    method: 'get',
                    url: './role/roleLoad.do'
                }).success(function (response) {
                    $scope.roleList_1 = response;
                    console,log($scope.roleList_1);
                }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                    ModalUtils.alert(translate(errorThrown + "!"), "modal-danger", "sm");
                });
                $scope.close = function () {
                    $uibModalInstance.close();
                };
                $scope.save = function () {
                    $http({
                        method: 'POST',
                        url: './user/addUser.do',
                        data:{
                            name: $scope.newUserName,
                            role: $scope.newUserRole,
                            password: $scope.newUserPwd,
                            // oldRole:oldRole,
                            desc: $scope.newUserDesc
                        }
                    }).success(function (response) {
                        if (response.code === 0) {
                            ModalUtils.alert(translate(response.msg + "!"), "modal-danger", "md");
                        } else if (response.code === 1) {
                            ModalUtils.alert(translate(response.msg + "!"), "modal-success", "md");
                        } else if (response.code === -2) {
                            ModalUtils.alert(translate(response.msg + "!"), "modal-danger", "md");
                        }
                        getUserList();
                    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                        ModalUtils.alert(translate(errorThrown + "!"), "modal-danger", "sm");
                    });
                    $uibModalInstance.close();
                }
            }
        });
    };

    //删除用户
   /* $scope.delUser = function (current, $event) {
     console.log("删除用户...");
     };*/

    //修改用户
    $scope.modifyUser = function (current, $event) {
        console.log("修改用户...");
        console.log(current);
        $uibModal.open({
            templateUrl: 'org/cboard/view/config/modal/modifyUser.html',
            //windowTemplateUrl: 'org/cboard/view/util/modal/window.html',
            backdrop: false,
            controller: function ($scope, $uibModalInstance, $http) {
                //getRoleList();
                console.log($uibModalInstance);
                $http({
                    method: 'get',
                    url: './role/roleLoad.do'
                }).success(function (response) {
                    $scope.modifyUserRole = current.roleName;
                    $scope.modifyUserName = current.userName;
                    $scope.modifyUserDesc = current.description;
                    $scope.roleList_2 = response;
                }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                    ModalUtils.alert(translate(errorThrown + "!"), "modal-danger", "sm");
                });
                $scope.close = function () {
                    $uibModalInstance.close();
                };
                $scope.save = function () {
                    $http({
                        method: 'POST',
                        url: './user/updateUser.do',
                        data:{
                            name: $scope.modifyUserName,
                            password: $scope.modifyUserPwd,
                            role: $scope.modifyUserRole,
                            oldRole: current.password,
                            desc: $scope.modifyUserName/*,
                            enabled:current.enabled*/
                        }
                    }).success(function (response) {
                        if (response.code === 0) {
                            ModalUtils.alert(translate(response.msg + "!"), "modal-danger", "md");
                        } else if (response.code === 1) {
                            ModalUtils.alert(translate(response.msg + "!"), "modal-success", "md");
                        } else if (response.code === -2) {
                            ModalUtils.alert(translate(response.msg + "!"), "modal-danger", "md");
                        }
                        getUserList();
                    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                        ModalUtils.alert(translate(errorThrown + "!"), "modal-danger", "sm");
                    });
                    $uibModalInstance.close();
                }
            }
        });
    };

    //启动/淘汰用户
    $scope.enableUser = function (current, $event) {
        $http({
            method: 'post',
            url: './user/updateUser.do',
            data: {
                name: current.userName,
                enabled: !current.enabled
            }
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
            getUserList();
        }).error(function (XMLHttpRequest, textStatus, errorThrown) {
            ModalUtils.alert(translate(errorThrown + "!"), "modal-danger", "sm");
        });
        $event.stopPropagation();//阻止冒泡
    };
});