'use strict';

/**
 * @ngdoc overview
 * @name IonicGulpSeed
 * @description
 * # Initializes main application and routing
 *
 * Main module of the application.
 */


angular.module('IonicGulpSeed', ['ionic', 'ngCordova', 'ngResource', 'ngSanitize', 'firebase', 'ionic-native-transitions'])

    .run(function($ionicPlatform) {

        $ionicPlatform.ready(function() {
            // save to use plugins here
        });

        // add possible global event handlers here

    })

    .config(function($httpProvider, $stateProvider, $urlRouterProvider, $ionicConfigProvider) {
        // register $http interceptors, if any. e.g.
        // $httpProvider.interceptors.push('interceptor-name');
        $ionicConfigProvider.scrolling.jsScrolling(false);

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


