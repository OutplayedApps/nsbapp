'use strict';

/**
 * @ngdoc function
 * @name IonicGulpSeed.controller:SettingsController
 * @description
 * # SettingsController
 */
angular.module('IonicGulpSeed')
    .controller('AboutController', function($scope, $ionicHistory, $state, $ionicViewSwitcher) {
        //console.log('lol');
        // do something with $scope
        $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
            viewData.enableBack = true;
        });

        $scope.goBack = function() {
            $ionicViewSwitcher.nextDirection('back');
            $state.go("app.home");
        }


    });
