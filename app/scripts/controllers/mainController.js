'use strict';

/**
 * @ngdoc function
 * @name IonicGulpSeed.controller:MainController
 * @description
 * # MainController
 * This controller handles the side menu
 */
angular.module('IonicGulpSeed')
    .controller('MainController', function($scope, $ionicSideMenuDelegate) {

        // do something with $scope
        if (!$scope.mode) $scope.mode = 1;
        if (!$scope.level) $scope.level = 1;
        //todo: get from memory.
        $scope.toggleMode = function(m) {
            $ionicSideMenuDelegate.toggleLeft(false);
            if (m) $scope.mode = m;
        }
        $scope.toggleLevel = function(l) {
            $ionicSideMenuDelegate.toggleLeft(false);
            if (l) $scope.level = l;
        }
        $scope.$watch(function () {
                return $ionicSideMenuDelegate.isOpenLeft();
            },
            function (ratio) {
                $scope.isLeftMenuOpen = ratio;
            });


    });
