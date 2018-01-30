/**
 *
 */
cBoard.controller('outletCtrl', function ($rootScope, $scope, $http, dataService, $uibModal, ModalUtils, $filter, chartService) {

    var translate = $filter('translate');
    $scope.optFlag = 'none';
    $scope.curDataset = {data: {expressions: []}};
    $scope.curWidget = {};
    $scope.outletName = "";
    $scope.SelectArea = "";
    $scope.SelectPlace = "";
    $scope.SelectBrand = "";
    $scope.count = 0;// 已选择数量
    $scope.selectData = [];// 已选对象

    // /表格的头部
    $scope.headerInfos = [
        {'name': '序号', 'col': 'id'},
        {'name': '门店编码', 'col': 'OutletCode'},
        {'name': '门店名称', 'col': 'OutletName'},
        {'name': '门店简称', 'col': 'OutletShortName'},
        {'name': '区域', 'col': 'AreaId'},
        {'name': '商圈', 'col': 'PlaceId'},
        {'name': '品牌', 'col': 'BrandId'},
        {'name': '创建时间', 'col': 'CreateTime'},
        {'name': '更新时间', 'col': 'UpdateTime'},
        {'name': '操作'}
    ];

    $scope.pageSize = 8;　　// 分页大小，可以随意更改

    /*
     * 当页面列表数据过多时，我们经常会收到将列表内容分页的需求，列表内容分页一般会有两种做法：
     * 1、不需要后台配合，前台一次性拿完所有数据，然后进行分页展示；这种方式只是为了界面上对用户更友好，
     * 并没有实际提升页面的效率（数据量过大时页面加载压力比较大）
     * 2、需要后台配合，后台对改数据做分页处理，页面每次只请求需要展示的该页面的数据，换页时需要二次请求，这种方式是比较推荐的
     */
    // 分页
    $scope.initPageSort = function (item) {
        // $scope.data = item;
        $scope.data = item.data;
        $scope.pages = Math.ceil($scope.data.length / $scope.pageSize); // 分页数
        $scope.newPages = $scope.pages > 5 ? 5 : $scope.pages;
        $scope.pageList = [];
        $scope.selPage = 1;
        // 设置表格数据源(分页)
        $scope.setData = function () {
            // 通过当前页数筛选出表格当前显示数据
            $scope.items = $scope.data.slice(($scope.pageSize * ($scope.selPage - 1)), ($scope.selPage * $scope.pageSize));
        };
        $scope.items = $scope.data.slice(0, $scope.pageSize);
        // 分页要repeat的数组
        for (var i = 0; i < $scope.newPages; i++) {
            $scope.pageList.push(i + 1);
        }
        // 打印当前选中页索引
        $scope.selectPage = function (page) {
            // 不能小于1大于最大
            if (page < 1 || page > $scope.pages) return;
            // 最多显示分页数5
            if (page > 2) {
                // 因为只显示5个页数，大于2页开始分页转换
                var newpageList = [];
                for (var i = (page - 3); i < ((page + 2) > $scope.pages ? $scope.pages : (page + 2)); i++) {
                    newpageList.push(i + 1);
                }
                $scope.pageList = newpageList;
            }
            $scope.selPage = page;
            $scope.setData();
            $scope.isActivePage(page);
            // console.log("选择的页：" + page);
        }
    };

    // 设置当前选中页样式
    $scope.isActivePage = function (page) {
        return $scope.selPage == page;
    };

    // 上一页
    $scope.Previous = function () {
        console.log("Previous...")
        $scope.selectPage($scope.selPage - 1);
    };

    // 下一页
    $scope.Next = function () {
        console.log("Next...")
        $scope.selectPage($scope.selPage + 1);
    };

    var getOutletsList = function () {
        $http({
            method: 'get', /* get是从服务器上获取数据 */
            url: './outlet/doOutlet.do',
            params: {
                outletName: $scope.outletName
            }
        }).success(function (response) {
            $scope.initPageSort(response);
        })
    }
    getOutletsList();


    // 数据双向绑定+监听机制
    $scope.$watch("outletName", function () {
        $http({
            method: 'post', /* post是向服务器传送数据 */
            url: './outlet/doOutlet.do',
            data: {
                outletName: $scope.outletName
            }
        }).success(function (response) {
            if (response.code === 0) {
                // alert("无此店名，请重新输入...");
            } else if (response.code === 1) {
                $scope.outletList = response;
            }
            $scope.initPageSort($scope.outletList);
        }).error(function (XMLHttpRequest, textStatus, errorThrown) {
            ModalUtils.alert(translate(errorThrown + "!"), "modal-danger", "sm");
        });
    })

    // 修改用户
    $scope.editOutlet = function (current, $event) {
        $uibModal.open({
            templateUrl: 'org/cboard/view/config/modal/editOutlet.html',
            backdrop: false,
            controller: function ($scope, $uibModalInstance, $http) {
                $scope.close = function () {
                    $uibModalInstance.close();
                };
                $http({
                    method: 'get',
                    url: './outlet/queryArea.do'
                }).success(function (response) {
                    // $scope.SelectArea = current.AreaId; // 下拉框获取当前行的值
                    console.log(current.AreaName);
                    console.log($scope.areaList_1);
                    $scope.SelectArea = current.AreaName;
                    $scope.areaList_1 = response;
                }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                    ModalUtils.alert(translate(errorThrown + "!"), "modal-danger", "sm");
                });
                $http({
                    method: 'get',
                    url: './outlet/queryPlace.do'
                }).success(function (response) {
                    // $scope.SelectPlace = current.PlaceId;
                    $scope.SelectPlace = current.PlaceName;
                    $scope.placeList_1 = response;
                }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                    ModalUtils.alert(translate(errorThrown + "!"), "modal-danger", "sm");
                });
                $http({
                    method: 'get',
                    url: './outlet/queryBrand.do'
                }).success(function (response) {
                    $scope.SelectBrand = current.BrandId;
                    $scope.brandList_1 = response;
                }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                    ModalUtils.alert(translate(errorThrown + "!"), "modal-danger", "sm");
                });
                $scope.save = function () {
                    $http({
                        method: 'post',
                        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
                        url: './outlet/updateApb.do',
                        data: JSON.stringify({
                            areaId: $scope.SelectArea,
                            placeId: $scope.SelectPlace,
                            brandId: $scope.SelectBrand,
                            outletId: current.OutletId
                        })
                    }).success(function (response) {
                        getOutletsList();
                    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                        ModalUtils.alert(translate(errorThrown + "!"), "modal-danger", "sm");
                    });
                    $uibModalInstance.close();
                }
            }
        });
    };

    $scope.changeOpt = function (x) {
        console.log(x);
        console.log($scope.SelectArea);
    }
});