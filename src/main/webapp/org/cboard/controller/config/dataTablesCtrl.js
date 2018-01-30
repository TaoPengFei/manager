/**
 * Created by 陶鹏飞 on 2017/8/9.
 */
cBoard.controller('dataTablesCtrl', function ($rootScope, $scope, $stateParams, $http, $uibModal, dataService, ModalUtils, updateService, $filter, chartService) {

    var translate = $filter('translate');
    //图表类型初始化
    $scope.chart_types = [
        {name: translate('TABLE'), value: 'table'}
    ];

    $scope.preview = function () {
        chartService.render($('#preview_widget'), $scope.widgetData, $scope.curWidget.config, function (option) {
            switch ($scope.curWidget.config.chart_type) {
                case 'table':
                    $scope.previewDivWidth = 12;
                    break;
            }
        });
    };





});