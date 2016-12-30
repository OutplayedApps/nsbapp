'use strict';

/**
 * @ngdoc function
 * @name IonicGulpSeed.serive:ExampleService
 * @description
 * # ExampleService
 */
angular.module('IonicGulpSeed')
    // use factory for services
    .factory('ExampleService', function($http, $timeout, $q, $firebaseArray) {

        var kindOfPrivateVariable = 42;

        var config = {
            apiKey: "AIzaSyDlREmLiQPTgiJPeJjviIQZ7sBSkK0DYsI",
            authDomain: "nsbapp-fed9d.firebaseapp.com",
            databaseURL: "https://nsbapp-fed9d.firebaseio.com",
            storageBucket: "nsbapp-fed9d.appspot.com",
            messagingSenderId: "862524906517"
        };
        firebase.initializeApp(config);

        var doSomethingAsync = function() {
            var deferred = $q.defer();
            $timeout(deferred.resolve.bind(null, kindOfPrivateVariable), 1000);
            return deferred.promise;
        };

        var fetchQuestions = function(cat, difficulty) {
            var ref = firebase.database().ref("questions/").orderByChild("catDiff").equalTo(cat+"."+difficulty);
            var list = $firebaseArray(ref);
            return $q.when(list);


        };

        // public api
        return {
            doSomethingAsync: doSomethingAsync,
            fetchQuestions: fetchQuestions
        };

    });
