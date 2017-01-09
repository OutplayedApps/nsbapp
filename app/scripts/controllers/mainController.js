'use strict';

/**
 * @ngdoc function
 * @name IonicGulpSeed.controller:MainController
 * @description
 * # MainController
 * This controller handles the side menu
 */
angular.module('IonicGulpSeed')
    .controller('MainController', function($scope, $timeout,
                                           $ionicViewService, $rootScope, $ionicPopup, $state, ExampleService,
                                           $ionicSideMenuDelegate, SettingsService, $ionicTabsDelegate, $ionicPlatform, EventService) {


        function updateTabs() {
            // do something with $scope
            //$scope.settings = SettingsService.settings;
            function selectTab(handle, index) {
                $timeout(function () {
                    $ionicTabsDelegate.$getByHandle(handle).select(index);
                }, 0);
            }

            console.log("LEVEL IS " + SettingsService.getLevel());
            selectTab("mode", 1 - SettingsService.getMode()); //hax.
            selectTab("level", SettingsService.getLevel());

            //console.debug($scope.settings);
            //$(($scope.settings.mode == 0) ? ".tabReader" : ".tabGame").click();
            //$(($scope.settings.level == 0) ? ".tabMS" : ".tabHS").click();

            //mode: 0 is reader 1 is game mode
            //level: 0 is MS 1 is HS

            //console.log($scope.settings.mode,"Is the mode");
        }

        $ionicPlatform.ready(function () {
            updateTabs();
        });

        $scope.$on('menuSlide', function () {
            updateTabs();
            console.log('slide -oooo');
        });

        $rootScope.$on('$stateChangeStart',
            function (event, toState, toParams, fromState, fromParams) {
                $timeout(function () {
                    updateTabs();
                }, 500);
                console.log('$statechgstart');
            });

        //updateTabs();


        //todo: get from memory.
        var m, l;
        $scope.toggleMode = function (m) {
            $scope.toggleMode = function (m) { //only happens after the first time.
                //$ionicSideMenuDelegate.toggleLeft(false);
                $scope.mode = m;
                SettingsService.setMode(m);
                //$scope.$broadcast("settingsChanged");
                EventService.logEvent("tabModeToggled");
                console.log("mode toggled", SettingsService.getMode());
            }

        }
        $scope.toggleLevel = function (l) {
            console.log("first tie");
            //$timeout(function() {
            $scope.toggleLevel = function (l) {
                console.log("nth tie");
                //$ionicSideMenuDelegate.toggleLeft(false);
                $scope.level = l;
                SettingsService.setLevel(l);
                console.log("level toggled");
                EventService.logEvent("tabLevelToggled");
                //$scope.$broadcast("settingsChanged");
            }
            //}, 300);
        };

        var range = angular.element(document.getElementById("readSpeedRange"));
        range.val(SettingsService.getReadSpeed());
        $scope.updateReadSpeed = function () {
            SettingsService.setReadSpeed(range.val());
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
            EventService.logEvent("startButtonPressed");

            $state.go("app.home");
        }

        $scope.showAboutPopup = function () {
            EventService.logEvent("showAboutPopup");
            var myPopup = $ionicPopup.show({
                templateUrl: 'templates/views/about.html',
                title: 'About Us',
                //subTitle: 'Please use normal things',
                scope: $scope,
                buttons: [
                    {
                        text: 'Close',
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


        $scope.showHelpPopup = function () {
            EventService.logEvent("showHelpPopup");
            var myPopup = $ionicPopup.show({
                templateUrl: 'templates/views/help.html',
                title: 'Help',
                //subTitle: 'Please use normal things',
                scope: $scope,
                buttons: [
                    {
                        text: 'Close',
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

        $scope.reportProblem = function () {
            $scope.feedback = {};
            $scope.pauseEverything = true;
            var myPopup = $ionicPopup.show({
                templateUrl: 'templates/views/feedback.html',
                title: 'Report a problem',
                //subTitle: 'Please use normal things',
                scope: $scope,
                buttons: [
                    {text: 'Cancel'},
                    {
                        text: 'Submit',
                        type: 'button-positive',
                        onTap: function (e) {
                            $scope.feedback.questionID = SettingsService.data.$id;
                            $scope.feedback.HSorMS = SettingsService.getLevel();
                            $scope.feedback.mode = SettingsService.getMode();
                            $scope.feedback.time = moment().format("DD-MM-YYYY HH:MM:ss");
                            $scope.feedback.device = (navigator.userAgent.match(/iPad/i))  == "iPad" ? "iPad" : (navigator.userAgent.match(/iPhone/i))  == "iPhone" ? "iPhone" : (navigator.userAgent.match(/Android/i)) == "Android" ? "Android" : (navigator.userAgent.match(/BlackBerry/i)) == "BlackBerry" ? "BlackBerry" : "null";
                            EventService.logQuestionError($scope.feedback);
                        }
                    }
                ],
                cssClass: 'popupAbout'
            }).then(function () {
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
                    $timeout(function () {
                        ExampleService.showAd();
                    }, 500);

                    //}
                }, 2000);
            };
            $timeout(function () {
                $scope.showSplash();
            }, 100);
        });

        document.addEventListener('deviceready', function () {
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
                }, { installMode: InstallMode.ON_NEXT_RESUME, minimumBackgroundDuration: 60 * 10 });
            }
            catch (e) {
                console.log("CODEPUSH FAILED" + e);
                $scope.updated = 1;
                if ($scope.timeOutShown) $scope.hideSplash = true;
                //$scope.showSplash();
            }

        });
    });