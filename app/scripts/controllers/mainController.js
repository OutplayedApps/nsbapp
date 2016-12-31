'use strict';

/**
 * @ngdoc function
 * @name IonicGulpSeed.controller:MainController
 * @description
 * # MainController
 * This controller handles the side menu
 */
angular.module('IonicGulpSeed')
    .controller('MainController', function($scope) {

        // do something with $scope
        if (!$scope.mode) $scope.mode = 1;
        if (!$scope.level) $scope.level = 1;
        //todo: get from memory.
        $scope.toggleMode = function(m) {
            if (m) $scope.mode = m;
        }
        $scope.toggleLevel = function(l) {
            if (l) $scope.level = l;
        }

    });
