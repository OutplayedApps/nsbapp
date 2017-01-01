'use strict';

/**
 * @ngdoc function
 * @name IonicGulpSeed.controller:SettingsController
 * @description
 * # SettingsController
 */
angular.module('IonicGulpSeed')
    .controller('MainMenuController', function($scope, $state) {
        //console.log('lol');
        // do something with $scope

        $scope.start = function() {
            $state.go("app.home");
        }

    });
