/**
 * Created by 陶鹏飞 on 2017/8/4.
 */
angular.module('cBoard').config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state('user', {
            url: '/user',
            abstract: true,
            template: '<div ui-view></div>'
        })
        .state('dashboard', {
            url: '/dashboard',
            abstract: true,
            template: '<div ui-view></div>'
        })
        .state('mine', {
            url: '/mine',
            abstract: true,
            template: '<div ui-view></div>'
        })
        .state('mine.view', {
            url: '/{id}',
            params: {id: null},
            templateUrl: 'org/cboard/view/dashboard/view.html',
            controller: 'dashboardViewCtrl'
        })
        .state('dashboard.category', {
            url: '/{category}',
            params: {category: null},
            abstract: true,
            template: '<div ui-view></div>',
        })
        .state('dashboard.category.view', {
            url: '/{id}',
            params: {id: null},
            templateUrl: 'org/cboard/view/dashboard/view.html',
            controller: 'dashboardViewCtrl'
        })
        //权限控制路由配置
        .state('config', {
            url: '/config',
            abstract: true,
            template: '<div ui-view></div>'
        })
        //用户路由配置
        .state('config.user', {
            url: '/user',
            templateUrl: 'org/cboard/view/config/user.html',
            controller: 'userCtrl'
        })
        //角色路由配置
        .state('config.role', {
            url: '/role',
            templateUrl: 'org/cboard/view/config/role.html',
            controller: 'roleCtrl'
        })
        //角色-菜单路由配置
        .state('config.roleMenu', {
            url: '/roleMenu',
            templateUrl: 'org/cboard/view/config/roleMenu.html',
            controller: 'roleMenuCtrl'
        })
        //角色-菜单路由配置
        .state('config.roleMenuTree', {
            url: '/roleMenuTree',
            templateUrl: 'org/cboard/view/config/roleMenuTree.html',
            controller: 'roleMenuTreeCtrl'
        })
        //datatables路由配置
        .state('config.datatables', {
            url: '/datatables',
            templateUrl: 'org/cboard/view/config/dataTables.html',
            controller: 'dataTablesCtrl'
        })
        //品牌-路由配置
        .state('config.brand', {
            url: '/brand',
            templateUrl: 'org/cboard/view/config/brand.html',
            controller: 'brandCtrl'
        })
        //区域-路由配置
        .state('config.area', {
            url: '/area',
            templateUrl: 'org/cboard/view/config/area.html',
            controller: 'areaCtrl'
        })
        //门店-路由配置
        .state('config.outlet', {
            url: '/outlet',
            templateUrl: 'org/cboard/view/config/outlet.html',
            controller: 'outletCtrl'
        })
        //通讯报表-路由配置
        .state('config.communication', {
            url: '/communication',
            templateUrl: 'org/cboard/view/config/communication.html',
            controller: 'communicationCtrl'
        })
        //商品分类-路由配置
        .state('config.itemcategory', {
            url: '/itemcategory',
            templateUrl: 'org/cboard/view/config/itemcategory.html',
            controller: 'itemcategoryCtrl'
        })
        //餐品部门-路由配置
        .state('config.itemdeptment', {
            url: '/itemdeptment',
            templateUrl: 'org/cboard/view/config/itemdeptment.html',
            controller: 'itemdeptmentCtrl'
        })
        //商圈-路由配置
        .state('config.place', {
            url: '/place',
            templateUrl: 'org/cboard/view/config/place.html',
            controller: 'placeCtrl'
        })
        //顾客档次-路由配置
        .state('config.guestgradetype', {
            url: '/guestgradetype',
            templateUrl: 'org/cboard/view/config/guestgradetype.html',
            controller: 'guestgradetypeCtrl'
        })
        //人数档次-路由配置
        .state('config.guestnotype', {
            url: '/guestnotype',
            templateUrl: 'org/cboard/view/config/guestnotype.html',
            controller: 'guestnotypeCtrl'
        })
        //促销主题-路由配置
        .state('config.promotion', {
            url: '/promotion',
            templateUrl: 'org/cboard/view/config/promotion.html',
            controller: 'promotionCtrl'
        })
        //促销相关商品-路由配置
        .state('config.promotionitem', {
            url: '/promotionitem',
            templateUrl: 'org/cboard/view/config/promotionitem.html',
            controller: 'promotionitemCtrl'
        })
        //日历-路由配置
        .state('config.date', {
            url: '/date',
            templateUrl: 'org/cboard/view/config/date.html',
            controller: 'dateCtrl'
        });
    }
]);

angular.module('cBoard').factory('sessionHelper', ["$rootScope", function ($rootScope) {
    var sessionHelper = {
        responseError: function (response) {
            if (response.status == -1) {
                window.location.href = "/";
            } else {
                return response;
            }
        }
    };
    return sessionHelper;
}]);


angular.module('cBoard').config(function ($httpProvider) {
    $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

    // Override $http service's default transformRequest
    $httpProvider.defaults.transformRequest = [function (data) {
        /**
         * The workhorse; converts an object to x-www-form-urlencoded serialization.
         * @param {Object} obj
         * @return {String}
         */
        var param = function (obj) {
            var query = '';
            var name, value, fullSubName, subName, subValue, innerObj, i;

            for (name in obj) {
                value = obj[name];

                if (value instanceof Array) {
                    for (i = 0; i < value.length; ++i) {
                        subValue = value[i];
                        fullSubName = name + '[' + i + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                } else if (value instanceof Object) {
                    for (subName in value) {
                        subValue = value[subName];
                        fullSubName = name + '[' + subName + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                } else if (value !== undefined && value !== null) {
                    query += encodeURIComponent(name) + '='
                        + encodeURIComponent(value) + '&';
                }
            }

            return query.length ? query.substr(0, query.length - 1) : query;
        };

        return angular.isObject(data) && String(data) !== '[object File]'
            ? param(data)
            : data;
    }];

    $httpProvider.interceptors.push('sessionHelper');

});


angular.module('cBoard').config(function ($translateProvider, $translatePartialLoaderProvider) {
    $translatePartialLoaderProvider.addPart('cboard');
    $translateProvider.useLoader('$translatePartialLoader', {
        urlTemplate: './i18n/{lang}/{part}.json'
    });

    // console.log(settings.preferredLanguage);
    // $translateProvider.preferredLanguage(settings.preferredLanguage);
    /*$translateProvider.preferredLanguage(function () {
        return "en";
    });*/
    $translateProvider.preferredLanguage(
        (function () {
            // return "en";
            /*console.log(document.URL.split('?')[1].split("=")[1]);
            console.log(document.URL.split('?')[1].split("=")[1].substr(0,2));*/
            var thisURL = document.URL;
            var getval =thisURL.split('?')[1];
            var showval= getval.split("=")[1];
            return showval.substr(0,2);
        })()
    );
});