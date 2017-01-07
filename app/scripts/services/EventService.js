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
    .factory('EventService', function($window, $http, API_ENDPOINT, $firebaseArray) {

        if (!window.FirebasePlugin) {
            console.log("FBPLUGIN NOT FOUND");
            window.FirebasePlugin = {
                "logEvent": function() {}
            };
        }
        else {
            console.log("FBPLUGIN found");
        }

        function logQuestionError(questionID, HSorMS, currQuestionProblem, feedback) {
            var data = {"questionID": questionID, "HSorMS": HSorMS, "currQuestionProblem": currQuestionProblem, "feedback": feedback};
            window.FirebasePlugin.logEvent("questionError", data);
                var ref = firebase.database().ref("/questions/feedback");
                var list = $firebaseArray(ref);
                list.$add(data);

            /*try {
                window.cordova.plugins.firebase.crash.report("BOOM!");
            }
            catch (e) {
                console.log("error"  + e);
            }*/

            //window.FirebasePlugin.logEvent("questionError", );
        }

        function logWebError(questionID) {
            window.FirebasePlugin.logEvent("webError");
        }



        // public api
        return {
            logWebError: logWebError,
            logQuestionError: logQuestionError
        };

    });

