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

        var fetchQuestions = function(cat, difficulty, HSorMS) {
            console.log(cat, difficulty);
            var ref = firebase.database().ref("/questions/questions"+(HSorMS?"HS":"MS")+"/").orderByChild("catDiff").equalTo(cat+"."+difficulty);
            var list = $firebaseArray(ref);
            return $q.when(list);


        };
        var showAd = function() {
            // select the right Ad Id according to platform
            var admobid = {};
            if( /(android)/i.test(navigator.userAgent) ) { // for android & amazon-fireos
                admobid = {
                    banner: 'ca-app-pub-9328159054616225/3119613792', // or DFP format "/6253334/dfp_example_ad"
                    interstitial: 'ca-app-pub-xxx/yyy'
                };
            } else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) { // for ios
                admobid = {
                    banner: 'ca-app-pub-9328159054616225/3119613792', // or DFP format "/6253334/dfp_example_ad"
                    interstitial: 'ca-app-pub-xxx/kkk'
                };
            } else { // for windows phone
                admobid = {
                    banner: 'ca-app-pub-9328159054616225/3119613792', // or DFP format "/6253334/dfp_example_ad"
                    interstitial: 'ca-app-pub-xxx/kkk'
                };
            }
            if(AdMob) AdMob.createBanner({
                adId: admobid.banner,
                position: AdMob.AD_POSITION.TOP_CENTER,
                autoShow: true });
        }

        // public api
        return {
            doSomethingAsync: doSomethingAsync,
            fetchQuestions: fetchQuestions,
            showAd: showAd
        };

    });
