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
                "logEvent": function() {console.log("event logged but plugin not working");}
            };
        }
        else {
            console.log("FBPLUGIN found");
        }

        function logQuestionError(data) {

            //var data = {"questionID": questionID, "HSorMS": HSorMS, "currQuestionProblem": currQuestionProblem, "feedback": feedback};
            console.debug(data, "LOGINGG ERROR");
            window.FirebasePlugin.logEvent(questionID, data);
            window.FirebasePlugin.logEvent("questionError", data);
                var ref = firebase.database().ref("/feedback").child(data.time).set(data);
                /*var list = $firebaseArray(ref);
                list.$add(data);
                list.$save();*/
            //console.log(list);


            /*try {
                window.cordova.plugins.firebase.crash.report("BOOM!");
            }
            catch (e) {
                console.log("error"  + e);
            }*/

            //window.FirebasePlugin.logEvent("questionError", );
        }

        function logWebError(questionID) {
            window.FirebasePlugin.logEvent("webError",  "");
        }

        function logEvent(eventType) {
            window.FirebasePlugin.logEvent(eventType, "");
        }



        // public api
        return {
            logWebError: logWebError,
            logQuestionError: logQuestionError,
            logEvent: logEvent
        };

    });

