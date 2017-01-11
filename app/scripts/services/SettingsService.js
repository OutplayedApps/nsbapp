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


        var storage = $localStorage.$default({
            mode: 0,
            level: 1,
            readSpeed: 5,
            heardQuestions: []
        });


        function addQuestionToHeard(id) {
            storage.heardQuestions.push(id);
        }

        function checkIfQuestionHeard(id) {
            return ~storage.heardQuestions.indexOf(id);
        }

        //mode: 0 is reader 1 is game mode
        //level: 0 is MS 1 is HS
        //todo: get from memory;

        function setLevel(l) {
            storage.level = l;
            console.log("SETTING LEVEL"+l);
        }

        function setMode(m) {
            storage.mode = m;
        }

        function setReadSpeed(s) {
            storage.readSpeed = s;
        }

        function getLevel() {
            return parseInt(storage.level);
        }

        function getMode() {
            return parseInt(storage.mode);
        }


        function getReadSpeed() {
            return parseFloat(storage.readSpeed);
        }





        // public api
        return {
            settings: $localStorage,
            setMode: setMode,
            setLevel: setLevel,
            setReadSpeed: setReadSpeed,
            getMode: getMode,
            getLevel: getLevel,
            getReadSpeed: getReadSpeed,
            addQuestionToHeard: addQuestionToHeard,
            checkIfQuestionInHeard: checkIfQuestionHeard

        };

    });

