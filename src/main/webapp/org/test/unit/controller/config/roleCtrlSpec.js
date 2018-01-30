/**
 * Created by 陶鹏飞 on 2017/8/8.
 */

describe('this is karma jasmine test',function(){
    //测试controller
    /*
    describe('test controller',function(){
        var scope ;
        beforeEach(angular.mock.module('cBoard'));
        beforeEach(angular.mock.inject(function($rootScope,$controller){
            scope = $rootScope.$new();
            $controller('roleCtrl', {$scope: scope});
        }));
        it('test roleCtrl',function(){
            expect(scope.testBool).toBe(true);
        });
    });
     angular.mock.module('ngRoute', []);
     angular.mock.module('ngAnimate', []);
     angular.mock.module('hmTouchEvents', []);
    */

    describe('roleCtrl test', function () {
        var scope;
        var controller;

        beforeEach(angular.mock.module('cBoard'));
        beforeEach(angular.mock.inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            controller = $controller('roleCtrl', {
                $scope: scope
            });
        }));
        it('should display a list', function () {
            console.log('-------------- Run Test 1 | ' + scope);
            expect(scope.testBool).toBe(true);
        });
    });

});

