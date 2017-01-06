'use strict';

/**
 * @ngdoc service
 * @name IonicGulpSeed.ApiService
 * @description
 * # ApiService
 * Retrieves correct api to make requests against.
 * Uses settings from API_ENDPOINT defined in /config/apiEndpoint.js
 *
 * Usage example: $http({
 *                      url: ApiService.getEndPoint() + '/things',
 *                      method: 'GET'
 *                 })
 *
 */
angular.module('IonicGulpSeed')
    .factory('SettingsService', function($localStorage) {

        var settings = $localStorage.$default({
            mode: 0,
            level: 1,
            readSpeed: 5
        });

        //mode: 0 is reader 1 is game mode
        //level: 0 is MS 1 is HS
        //todo: get from memory;
        function setMode(m) {
            settings.mode = m;
        }

        function setLevel(l) {
            settings.level = l;
        }


        // public api
        return {
            settings: settings,
            setMode: setMode,
            setLevel: setLevel
        };

    });

