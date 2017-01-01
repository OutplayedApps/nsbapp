'use strict';

/**
 * @ngdoc function
 * @name IonicGulpSeed.controller:MainController
 * @description
 * # MainController
 * This controller handles the side menu
 */
angular.module('IonicGulpSeed')
    .controller('MainController', function($scope, $timeout,
                                           $ionicSideMenuDelegate, SettingsService, $ionicTabsDelegate) {

        // do something with $scope
        $scope.settings = SettingsService.settings;
        function selectTab(handle, index) {
            $timeout(function() {
                $ionicTabsDelegate.$getByHandle(handle).select(index);
            }, 0);
        }
        selectTab("mode", $scope.settings.mode);
        selectTab("level", $scope.settings.level);


        //todo: get from memory.
        var m, l;
        $scope.toggleMode = function(m) {
            $ionicSideMenuDelegate.toggleLeft(false);
            $scope.mode = m;
            SettingsService.mode = m;

        }
        $scope.toggleLevel = function(l) {
            $ionicSideMenuDelegate.toggleLeft(false);
            $scope.level = l;
            SettingsService.level = m;
        }
        $scope.$watch(function () {
                return $ionicSideMenuDelegate.isOpenLeft();
            },
            function (ratio) {
                $scope.isLeftMenuOpen = ratio;
            });



    });
