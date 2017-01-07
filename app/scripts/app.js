'use strict';

/**
 * @ngdoc overview
 * @name IonicGulpSeed
 * @description
 * # Initializes main application and routing
 *
 * Main module of the application.
 */


angular.module('IonicGulpSeed', ['ionic', 'ngCordova', 'ngResource', 'ngSanitize', 'firebase', 'ionic-native-transitions',
'ngStorage'])

    .run(function($ionicPlatform) {

        $ionicPlatform.ready(function() {
            // save to use plugins here
        });

        // add possible global event handlers here

    })

    .config(function($httpProvider, $stateProvider, $urlRouterProvider, $ionicConfigProvider, $ionicNativeTransitionsProvider) {
        // register $http interceptors, if any. e.g.
        // $httpProvider.interceptors.push('interceptor-name');
        $ionicConfigProvider.scrolling.jsScrolling(false);

        /*$ionicNativeTransitionsProvider.setDefaultOptions({
            duration: 400, // in milliseconds (ms), default 400,
            slowdownfactor: 4, // overlap views (higher number is more) or no overlap (1), default 4
            iosdelay: -1, // ms to wait for the iOS webview to update before animation kicks in, default -1
            androiddelay: -1, // same as above but for Android, default -1
            winphonedelay: -1, // same as above but for Windows Phone, default -1,
            fixedPixelsTop: 0, // the number of pixels of your fixed header, default 0 (iOS and Android)
            fixedPixelsBottom: 0, // the number of pixels of your fixed footer (f.i. a tab bar), default 0 (iOS and Android)
            triggerTransitionEvent: '$ionicView.afterEnter', // internal ionic-native-transitions option
            backInOppositeDirection: false // Takes over default back transition and state back transition to use the opposite direction transition to go back
        });*/

        // Application routing
        $stateProvider
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/main.html',
                controller: 'MainController'
            })
            .state('app.home', {
                url: '/home',
                cache: true,
                views: {
                    'viewContent': {
                        templateUrl: 'templates/views/home.html',
                        controller: 'HomeController'
                    }
                }
            })
            .state('app.settings', {
                url: '/settings',
                cache: true,
                views: {
                    'viewContent': {
                        templateUrl: 'templates/views/settings.html',
                        controller: 'SettingsController'
                    }
                }
            })
            .state('mainMenu', {
                url: '/mainMenu',
                cache: true,
                //views: {
                //    'viewContent': {
                        templateUrl: 'templates/views/mainMenu.html',
                        controller: 'MainController'
                //    }
                //}
            });
            /*.state('about', {
                url: '/about',
                cache: true,
                //views: {
                //    'viewContent': {
                        templateUrl: 'templates/views/about.html',//,
                        controller: 'AboutController'
                 //   }
                //}
            });*/


        // redirects to default route for undefined routes
        $urlRouterProvider.otherwise('/mainMenu');
    });


