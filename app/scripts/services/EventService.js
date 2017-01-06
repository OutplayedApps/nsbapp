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
    .factory('EventService', function($window, $http, API_ENDPOINT) {

        if (!window.FirebasePlugin) {
            window.FirebasePlugin = {
                "logEvent": function() {}
            };
        }

        function logQuestionError(questionID, feedback) {
            window.FirebasePlugin.logEvent("questionError", {"questionID": questionID, "feedback": feedback});
        }

        function logWebError() {
            window.FirebasePlugin.logEvent("webError", {"questionID": questionID});
        }



        // public api
        return {
            logWebError: logWebError,
            logQuestionError: logQuestionError
        };

    });

