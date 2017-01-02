'use strict';

/**
 * @ngdoc function
 * @name IonicGulpSeed.controller:MainController
 * @description
 * # MainController
 * This controller handles the side menu
 */
angular.module('IonicGulpSeed')
    .controller('MainController', function($scope, $timeout, $ionicViewService, $rootScope,
                                           $ionicSideMenuDelegate, SettingsService, $ionicTabsDelegate) {

/*$scope.$on("settingsChanged", function() {
    updateTabs();
})*/
        function updateTabs() {
            // do something with $scope
            $scope.settings = SettingsService.settings;
            function selectTab(handle, index) {
                $timeout(function() {
                    $ionicTabsDelegate.$getByHandle(handle).select(index);
                }, 0);
            }
            selectTab("mode", $scope.settings.mode);
            selectTab("level", $scope.settings.level);
        }

        $rootScope.$on('$stateChangeSuccess',
            function(event, toState, toParams, fromState, fromParams){ updateTabs();});




        //todo: get from memory.
        var m, l;
        $scope.toggleMode = function(m) {
            //$ionicSideMenuDelegate.toggleLeft(false);
            $scope.mode = m;
            SettingsService.settings.mode = m;
            //$scope.$broadcast("settingsChanged");
            console.log("mode toggled");

        }
        $scope.toggleLevel = function(l) {
            //$ionicSideMenuDelegate.toggleLeft(false);
            $scope.level = l;
            SettingsService.settings.level = l;
            //$scope.$broadcast("settingsChanged");
        }

        $scope.updateReadSpeed = function() {
            SettingsService.readSpeed = $scope.readSpeed;
        }
        /*$scope.$watch(function () {
                return $ionicSideMenuDelegate.isOpenLeft();
            },
            function (ratio) {
                $scope.isLeftMenuOpen = ratio;
            });*/
        $scope.start = function() {
            $ionicViewService.nextViewOptions({
                disableBack: true
            });
            $state.go("app.home");
        }



    });
