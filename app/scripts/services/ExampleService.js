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
            return list;


        };
        var showAdOld = function() {
            // select the right Ad Id according to platform
            var admobid = {};
            if( /(android)/i.test(navigator.userAgent) ) { // for android & amazon-fireos
                admobid = {
                    banner: 'ca-app-pub-9328159054616225/3119613792', // or DFP format "/6253334/dfp_example_ad"
                    interstitial: 'ca-app-pub-xxx/yyy'
                };
            } else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) { // for ios
                admobid = {
                    banner: 'ca-app-pub-9328159054616225/6488222591', // or DFP format "/6253334/dfp_example_ad"
                    interstitial: 'ca-app-pub-xxx/kkk'
                };
            } else { // for windows phone
                admobid = {
                    banner: 'ca-app-pub-9328159054616225/6488222591', // or DFP format "/6253334/dfp_example_ad"
                    interstitial: 'ca-app-pub-xxx/kkk'
                };
            }
            if (typeof AdMob != 'undefined' && AdMob) {
                AdMob.createBanner({
                    adId: admobid.banner,
                    position: AdMob.AD_POSITION.BOTTOM_CENTER,
                    autoShow: true });
            }
            else {
                console.log("No ads!");
            }
        }

        var showAd = function() {
            var ad_units = {
                ios : {
                    banner:"372948276430920_372948909764190",
                    interstitial:"your_ad_place_id",
                    nativeAd:"372948276430920_372948909764190"
                },
                android : {
                    banner:"372948276430920_372948909764190",
                    interstitial:"your_ad_place_id",
                    nativeAd:"372948276430920_372948909764190"
                }
            };

// select the right Ad Id according to platform
            var adid = (/(android)/i.test(navigator.userAgent)) ? ad_units.android : ad_units.ios;

// set your hashed device id if testing on device (optional)
            /*if(FacebookAds) FacebookAds.setOptions({
                isTesting: true,
                deviceHash: "18B9918C46B6A383E3D79973DBB9204D"
            });*/

            if(FacebookAds) FacebookAds.createBanner( adid.banner );

            return;
            //var nativeId = null;
            /*function updateClickArea() {
                if (nativeId != null) {
                    // change the click area
                    var offset = $("#nativead").offset();
                    var y = offset.top - $(window).scrollTop();
                    var x = offset.left - $(window).scrollLeft();
                    var w = $("#nativead").width();
                    var h = $("#nativead").height();
                    if (FacebookAds) FacebookAds.setNativeAdClickArea(nativeId, x, y, w, h);
                    //}
                }
            }*/

            var nativeId;
            document.addEventListener('onAdLoaded',function(data) {
                console.debug(data);
                if (data.adType == "native") {
                    var adRes = data.adRes;
                    //alert( JSON.stringify(adRes) );

                    // show ad
                    //var nativeId = data.adId;
                    var nativeAdContent = adRes.title + '<br/>'
                            + adRes.body
                            + "<br/>rating: " + adRes.rating + ", " + adRes.buttonText + "<br/>"
                            + adRes.socialContext + "<br/>"
                            + "<img src='" + adRes.icon.url + "' width='" + adRes.icon.width + "' height='" + adRes.icon.height + "'/><br/>"
                        //+ "<img src='" + adRes.coverImage.url + "' width='" + adRes.coverImage.width + "' height='" + adRes.coverImage.height + "'/>"
                        ;
                    console.log(nativeAdContent);
                    $('#nativeAd').html(nativeAdContent);

                    updateClickArea();
                }
            });

            if(FacebookAds) FacebookAds.createNativeAd(adid.nativeAd);
        }

        // public api
        return {
            doSomethingAsync: doSomethingAsync,
            fetchQuestions: fetchQuestions,
            showAd: showAdOld
        };

    });
