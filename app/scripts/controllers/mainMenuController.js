'use strict';

/**
 * @ngdoc function
 * @name IonicGulpSeed.controller:SettingsController
 * @description
 * # SettingsController
 */
angular.module('IonicGulpSeed')
    .controller('MainMenuController', function($scope, $state, $ionicSideMenuDelegate, $cordovaNativeAudio, $ionicPlatform) {
        $ionicPlatform.ready(function() {
            $cordovaNativeAudio.preloadSimple('start', 'images/referee.mp3');
        });

        //console.log('lol');
        // do something with $scope
        $ionicSideMenuDelegate.canDragContent(false);
        $scope.start = function() {
            SoundService.play('start');
            $timeout(function() {
                $state.go("app.home");
            }, 500);
        }


    });
