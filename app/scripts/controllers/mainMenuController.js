'use strict';

/**
 * @ngdoc function
 * @name IonicGulpSeed.controller:SettingsController
 * @description
 * # SettingsController
 */
angular.module('IonicGulpSeed')
    .controller('MainMenuController', function($scope, $state, $ionicSideMenuDelegate) {
        //console.log('lol');
        // do something with $scope
        $ionicSideMenuDelegate.canDragContent(false);
        $scope.start = function() {
            $state.go("app.home");
        }


    });
