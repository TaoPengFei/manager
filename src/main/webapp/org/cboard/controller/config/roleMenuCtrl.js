/**
 * Created by 陶鹏飞 on 2017/8/4.
 */
'use strict';
cBoard.controller('roleMenuCtrl', function ($rootScope, $scope, $http, dataService, $uibModal, ModalUtils, $filter, chartService) {

    var translate = $filter('translate');
    $scope.optFlag = 'none';
    $scope.curDataset = {data: {expressions: []}};
    $scope.curWidget = {};
    $scope.selectedRoleName = '';
    $scope.selectedMenuWithoutRole = '';
    $scope.selectedMenuWithRole = '';

    //用户角色载入
    var getRoleNameList = function () {
        $http({
            method: 'get',
            url: './role/roleLoad.do'
        }).success(function (response) {
            $scope.roleNameList = response;
        }).error(function (XMLHttpRequest, textStatus, errorThrown) {
            ModalUtils.alert(translate(errorThrown  + "!"), "modal-danger", "sm");
        });
    }
    getRoleNameList();

    //角色菜单载入
    var getMenuList = function () {
        $scope.$watch("selectedRoleName",function () {
            $http({
                method:'post',
                url:'./roleMenu/getMenus.do',
                data :{
                    roleName:$scope.selectedRoleName
                },
                headers:{'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj){
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    }
                    return str.join("&");
                }
            }).success(function (response) {
                if(response.code === 1){
                    $scope.menuList = response;
                }else if(response.code === -2){
                    ModalUtils.alert(translate(response.msg + "!"), "modal-danger", "md");
                }
            }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                ModalUtils.alert(translate(errorThrown  + "!"), "modal-danger", "sm");
            })
        })
    }
    getMenuList();

    //新增菜单
    $scope.addMenu = function () {
        /*
         $http({
         method:'post',
         url:'/roleMenu/insertRoleMenu.do',
         data :{
         roleName:$scope.selectedRoleName,
         //menuIds:$scope.selectedMenuWithoutRole[0]
         menuIds:$("#menuLeft").val()
         },
         headers:{'Content-Type': 'application/x-www-form-urlencoded'},
         transformRequest: function(obj) {
         console.log(obj);
         var str = [];
         for(var p in obj){
         str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
         }
         console.log(str);
         return str.join("&");
         }
         }).success(function (response) {
         if(response.code === 1){
         ModalUtils.alert(translate(response.msg + "!"), "modal-success", "md");
         getMenuList();
         }else if(response.code === 0){
         ModalUtils.alert(translate(response.msg + "!"), "modal-danger", "md");
         }
         }).error(function (XMLHttpRequest, textStatus, errorThrown) {
         ModalUtils.alert(translate(errorThrown  + "!"), "modal-danger", "sm");
         });
         */
        $.ajax({
            url:'./roleMenu/insertRoleMenu.do',
            dataType:"json",
            type:"POST",
            data:{
                roleName:$scope.selectedRoleName,
                menuIds:$scope.selectedMenuWithoutRole
            },
            success: function(data,textStatus) {
                if(data.code === 1){
                    ModalUtils.alert(translate(data.msg + "!"), "modal-success", "md");
                    getMenuList();
                }else if(data.code === 0){
                    ModalUtils.alert(translate(data.msg + "!"), "modal-danger", "md");
                }
            },
            error:function(XMLHttpRequest, textStatus, errorThrown){
                ModalUtils.alert(translate(errorThrown  + "!"), "modal-danger", "sm");
            }
        });
    }

    //移除菜单
    $scope.removeMenu = function () {
        console.log("removeMenu...");
        $.ajax({
            url:'./roleMenu/deleteRoleMenu.do',
            dataType:"json",
            type:"POST",
            data:{
                roleName:$scope.selectedRoleName,
                menuIds:$scope.selectedMenuWithRole
            },
            success: function(data,textStatus) {
                if(data.code === 1){
                    ModalUtils.alert(translate(data.msg + "!"), "modal-success", "md");
                    getMenuList();
                }else if(data.code === 0){
                    ModalUtils.alert(translate(data.msg + "!"), "modal-danger", "md");
                }
            },
            error:function(XMLHttpRequest, textStatus, errorThrown){
                ModalUtils.alert(translate(errorThrown  + "!"), "modal-danger", "sm");
            }
        });
    }
});