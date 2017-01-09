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

        //var settings = $localStorage;
        var def = {
            mode: 0,
            level: 1,
            readSpeed: 5
        };
        function initHeard() {
            if (!$localStorage.heardQuestions || $localStorage.heardQuestions.length == 0) {
                $localStorage.heardQuestions = [];
            }
        }


        function addQuestionToHeard(id) {
            initHeard();
            $localStorage.heardQuestions.push(id);
        }

        function checkIfQuestionHeard(id) {
            initHeard();
            return ~$localStorage.heardQuestions.indexOf(id);
        }

        //mode: 0 is reader 1 is game mode
        //level: 0 is MS 1 is HS
        //todo: get from memory;

        function setLevel(l) {
            localStorage.setItem("level", l);
            console.log("SETTING LEVEL"+l);
        }

        function setMode(m) {
            localStorage.setItem("mode", m);
        }

        function setReadSpeed(s) {
            localStorage.setItem("readSpeed", s);
        }

        function getLevel() {
            if (localStorage.getItem("level") == null) {
                setLevel(def.level);
                return def.level;
            }
            return parseInt(localStorage.getItem("level"));
        }

        function getMode() {
            if (localStorage.getItem("mode") == null) {
                setMode(def.mode);
                return def.mode;
            }
            return parseInt(localStorage.getItem("mode"));
        }


        function getReadSpeed() {
            if (localStorage.getItem("readSpeed") == null) {
                setReadSpeed(def.readSpeed);
                return def.readSpeed;
            }
            return parseFloat(localStorage.getItem("readSpeed"));
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

