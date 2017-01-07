'use strict';

/**
 * @ngdoc function
 * @name IonicGulpSeed.controller:MainController
 * @description
 * # MainController
 * This controller handles the side menu
 */
angular.module('IonicGulpSeed')
    .controller('MainController', function($scope, $timeout, $ionicViewService, $rootScope, $ionicPopup, $state, ExampleService,
                                           $ionicSideMenuDelegate, SettingsService, $ionicTabsDelegate, $ionicPlatform, EventService) {

        /*$scope.$on("settingsChanged", function() {
         updateTabs();
         })*/




        function updateTabs() {
            // do something with $scope
            $scope.settings = SettingsService.settings;
            /*function selectTab(handle, index) {
                $timeout(function () {
                    $ionicTabsDelegate.$getByHandle(handle).select(index);
                }, 0);
            }

            selectTab("mode", $scope.settings.mode);
            selectTab("level", $scope.settings.level);*/
            $(($scope.settings.mode == 0) ? ".tabReader" : ".tabGame").click();
            $(($scope.settings.level == 0) ? ".tabMS" : ".tabHS").click();
            //mode: 0 is reader 1 is game mode
            //level: 0 is MS 1 is HS

            console.log($scope.settings.mode,"Is the mode");
        }

        $rootScope.$on('$stateChangeSuccess',
            function (event, toState, toParams, fromState, fromParams) {
                updateTabs();
            });

        updateTabs();


        //todo: get from memory.
        var m, l;
        $scope.toggleMode = function (m) {
            //$ionicSideMenuDelegate.toggleLeft(false);
            $scope.mode = m;
            SettingsService.settings.mode = m;
            //$scope.$broadcast("settingsChanged");
            console.log("mode toggled",SettingsService.settings.mode);

        }
        $scope.toggleLevel = function (l) {
            //$ionicSideMenuDelegate.toggleLeft(false);
            $scope.level = l;
            SettingsService.settings.level = l;
            //$scope.$broadcast("settingsChanged");
        };

        $("#readSpeedRange").val(SettingsService.settings.readSpeed);
        $scope.updateReadSpeed = function () {
            SettingsService.settings.readSpeed = $("#readSpeedRange").val();
            //console.log("SPEED CHANGED" + SettingsService.settings.readSpeed, $scope.readSpeed);
        }
        /*$scope.$watch(function () {
         return $ionicSideMenuDelegate.isOpenLeft();
         },
         function (ratio) {
         $scope.isLeftMenuOpen = ratio;
         });*/
        $scope.start = function () {
            $ionicViewService.nextViewOptions({
                disableBack: true
            });
            $state.go("app.home");
        }

        $scope.showAboutPopup = function() {
            var myPopup = $ionicPopup.show({
                templateUrl: 'templates/views/about.html',
                title: 'About Us',
                //subTitle: 'Please use normal things',
                scope: $scope,
                buttons: [
                    { text: 'Close',
                        type: 'button-positive'
                    },
                    /*{
                        text: '<b>Save</b>',
                        type: 'button-positive',
                        onTap: function(e) {
                            if (!$scope.data.wifi) {
                                //don't allow the user to close unless he enters wifi password
                                e.preventDefault();
                            } else {
                                return $scope.data.wifi;
                            }
                        }
                    }*/
                ],
                cssClass: 'popupAbout'
            });
        }


        $scope.showHelpPopup = function() {
            var myPopup = $ionicPopup.show({
                templateUrl: 'templates/views/help.html',
                title: 'Help',
                //subTitle: 'Please use normal things',
                scope: $scope,
                buttons: [
                    { text: 'Close',
                        type: 'button-positive'
                    },
                    /*{
                     text: '<b>Save</b>',
                     type: 'button-positive',
                     onTap: function(e) {
                     if (!$scope.data.wifi) {
                     //don't allow the user to close unless he enters wifi password
                     e.preventDefault();
                     } else {
                     return $scope.data.wifi;
                     }
                     }
                     }*/
                ],
                cssClass: 'popupAbout'
            });
        }
        window.scope = $scope;

        $scope.reportProblem = function() {
            $scope.pauseEverything = true;
            var myPopup = $ionicPopup.show({
                templateUrl: 'templates/views/feedback.html',
                title: 'Report a problem',
                //subTitle: 'Please use normal things',
                scope: $scope,
                buttons: [
                    { text: 'Cancel' },
                    { text: 'Submit',
                        type: 'button-positive',
                        onTap: function(e) {
                            EventService.logQuestionError(SettingsService.level, SettingsService.data.$id, $scope.currQuestionProblem, $scope.feedback);
                        }
                    }
                ],
                cssClass: 'popupAbout'
            }).then(function() {
                console.log("Done");
            });

            //EventService.logQuestionError($scope.data.$id);
        };

        window.scope = $scope;
        $scope.hideSplash = false;
        $scope.updated = 0;
        $ionicPlatform.ready(function () {
            $scope.showSplash = function () {
                //listener();
                if (navigator.splashscreen) {
                    navigator.splashscreen.hide();
                    //hides first splash screen.
                }
                console.log("SPLASHING");
                //$scope.showSplash = true;
                $scope.timeOutShown = false;
                $timeout(function () {
                    $scope.timeOutShown = true;
                    $scope.hideSplash = true;
                    $timeout(function() {
                        ExampleService.showAd();
                    }, 500);

                    //}
                }, 2000);
            };
            $timeout(function() {
                $scope.showSplash();
            }, 100);
        });

        /*document.addEventListener('deviceready', function() {
            //$ionicPlatform.ready(function () {
            $scope.updated = 0;
            try {
                codePush.sync(function (status) {
                    switch (status) {
                        case SyncStatus.DOWNLOADING_PACKAGE:
                            console.log("downloadgin");
                            break;
                        case SyncStatus.CHECKING_FOR_UPDATE:
                            console.log("checking for update");
                            break;
                        case SyncStatus.INSTALLING_UPDATE:
                            console.log("installing  update");
                            break;

                        default:
                            console.log("done with CODEPUSH.");
                            //$scope.updated = 1;
                            //$scope.hideSplash = true;
                            break;
                    }
                });
            }
            catch (e) {
                console.log("CODEPUSH FAILED" + e);
                $scope.updated = 1;
                if ($scope.timeOutShown) $scope.hideSplash = true;
                //$scope.showSplash();
            }*/

    });
