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
    .factory('SettingsService', function($window, $http, API_ENDPOINT) {

        var settings = {};
        settings.mode = 0;
        settings.level = 0;
        //todo: get from memory;

        // public api
        return {
            settings: settings
        };

    });

