'use strict';

/**
 * @ngdoc function
 * @name IonicGulpSeed.controller:HomeController
 * @description
 * # HomeController
 */
angular.module('IonicGulpSeed')
    .controller('HomeController', function($scope, ExampleService, $ionicScrollDelegate, $ionicLoading, $ionicPopup,
    SettingsService, $ionicPlatform, $ionicSideMenuDelegate, $ionicHistory, $interval, $timeout) {
        $ionicPlatform.ready(function () {
            $ionicLoading.show(); //for a first time.
            //required for side menu to work lol:
            $ionicHistory.clearHistory();
            $ionicSideMenuDelegate.canDragContent(true);

            $timeout(function() {
                $scope.$on("settingsChanged", function (evt, data) {
                    init();

                    //$scope.nextQuestion();
                    console.log("ok");

                });
                init();
            }, 0);



            function init() {

                $scope.mode = SettingsService.settings.mode;
                var mode = $scope.mode;
                $scope.questionNum = (mode == 0) ? 0 : 1;
                console.log("MODE"+mode);
                $scope.HSorMS = (SettingsService.settings.level == 1);
                var HSorMS = $scope.HSorMS;
                console.log(SettingsService.settings.level);
                //mode: 0 is reader 1 is game mode
                //level: 0 is MS 1 is HS

                $scope.myHTML = null;
                //var categoryList = {};
                var categoryList;
                if (HSorMS) {
                    categoryList = {
                        "EARTH AND SPACE": 0,
                        "BIOLOGY": 1,
                        "CHEMISTRY": 2,
                        "PHYSICS": 3,
                        "MATH": 4,
                        "ENERGY": 5,
                        "GENERAL SCIENCE": 6,
                        "COMPUTER SCIENCE": 7,
                        "Categories: All": -1
                    };
                }
                else {
                    categoryList = {
                        "EARTH AND SPACE": 0,
                        "LIFE SCIENCE": 1,
                        "PHYSICAL SCIENCE": 3,
                        "MATH": 4,
                        "ENERGY": 5,
                        "GENERAL SCIENCE": 6,
                        "Categories: All": -1
                    };
                }

                $scope.categories = [];
                $scope.catValues = [];
                $scope.HSorMS = HSorMS;
                function toTitleCase(str) {
                    str = str.replace(/\w\S*/g, function (txt) {
                        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                    });
                    return str.replace("And", "and");
                }

                function randEle(items) {
                    return items[Math.floor(Math.random() * items.length)];
                }

                for (var i in categoryList) {
                    //console.log(i);
                    $scope.categories.push({"name": toTitleCase(i), "index": categoryList[i]});
                    $scope.catValues.push(categoryList[i]); //list of indices.
                }
                $scope.selectedCategory = $scope.categories[$scope.categories.length - 1];
                $scope.difficulties = [
                    {'name': 'Easy (1-4)', 'index': 0},
                    {'name': 'Medium (5-8)', 'index': 1},
                    {'name': 'Hard (9-12)', 'index': 2},
                    {'name': 'Extreme (13+)', 'index': 3},
                    {'name': 'Difficulty: All', 'index': -1}
                ];


                $scope.selectedDifficulty = $scope.difficulties[$scope.difficulties.length - 1];

                $("select").focus(function() {
                    this.selectedIndex = -1;
                }).blur(function() {
                    //if (this.selectedIndex == -2)
                     //   this.selectedIndex = $(this).data("tempSelect");
                })

                function randInt(min, max) {
                    return Math.floor(Math.random() * (max - min + 1) + min);
                }

                function processToHTML(txt) {
                    //console.log(txt);
                    txt = txt.replace(/(\n)/g, "");
                    txt = txt.replace(/([WXYZ]\))/g, "<br>$1");
                    txt = txt.replace(/(.*[Ss]hort [Aa]nswer)/, "<b>$1</b>")
                        .replace(/(.*[Mm]ultiple [Cc]hoice)/, "<b>$1</b>");
                    return txt;

                }
                $scope.readSpeed = 200;
                $scope.loading = false;
                $scope.progress = 0;
                $scope.nextQuestion = function () {
                    /*
                    PROGRESS: 10 - everything shown.
                    1- tossup being read
                    2- tossup frozen
                    3 - full tossup + answer shown
                    4 - bonus being read
                    5- bonus frozen
                    6 - full bonus + answer shown
                     */

                    $scope.initTimer();
                    if ($scope.mode == 0) { //reader mode
                        $scope.progress = 0;
                        $scope.questionNum++;
                    }
                    else if ($scope.mode == 1) { //game mode.
                        console.log($scope.progress);
                        var promise;
                        var fullQuestion;
                        $scope.progress++;

                        //console.log("PROGRESS "+$scope.progress);
                            switch ($scope.progress) {
                                case 1:
                                    break;
                                case 2: //about to start 1
                                    $scope.dataReal = {
                                        tossupQ: $scope.data.tossupQ,
                                        bonusQ: $scope.data.bonusQ
                                    };

                                    $scope.fullQuestion = $scope.dataReal.tossupQ.split(" ");
                                    $scope.data.tossupQ = "";
                                    var index = 0;
                                    promise = $interval(function() {
                                        $scope.data.tossupQ += " "+$scope.fullQuestion[index];
                                        if (index == $scope.fullQuestion.length-1 || $scope.progress != 2) {
                                            $interval.cancel(promise);
                                            if ($scope.progress == 1)
                                                $scope.nextQuestion();
                                        }
                                        index++;
                                    }, $scope.readSpeed);
                                    return;
                                case 3:
                                    //question paused, buzzing.
                                    $interval.cancel(promise);
                                    $scope.timer.timeTU();
                                    return;
                                case 4:
                                    $scope.data.tossupQ = $scope.dataReal.tossupQ;
                                    return;
                                case 5:
                                    $scope.fullQuestion = $scope.data.bonusQ.split(" ");
                                    $scope.data.bonusQ = "";
                                    var index = 0;
                                    promise = $interval(function() {
                                        $scope.data.bonusQ += " "+$scope.fullQuestion[index];
                                        if (index == $scope.fullQuestion.length-1 || $scope.progress != 5) {
                                            $interval.cancel(promise);
                                            if ($scope.progress == 1)
                                                $scope.nextQuestion();
                                        }
                                        index++;
                                    }, $scope.readSpeed);
                                    return;
                                case 6:
                                    $interval.cancel(promise);
                                    $scope.timer.timeBonus();
                                    $scope.data.bonusQ = $scope.dataReal.bonusQ; //shows full bonus this time.
                                    return;
                                case 7:

                                    return;
                                case 8:
                                default:
                                    $scope.progress = 0;
                                    $scope.questionNum++;
                                    $scope.nextQuestion();
                                    return;
                            }

                    }

                    $scope.loading = true;
                    var catNum = $scope.selectedCategory.index;
                    //console.log("CATNUM"+catNum+$scope.selectedCategory);

                    var diffNum = $scope.selectedDifficulty.index;
                    var catNumNew = catNum;
                    if (catNum == -1) {
                        while (catNumNew == -1)
                            catNumNew = $scope.catValues[Math.floor(Math.random() * $scope.catValues.length)];
                        //picks a random index from the array.
                    }
                    var maxDifficulty = $scope.HSorMS ? 17 : 18;
                    var diffNumFinal = 1;
                    switch (diffNum) {
                        case 0:
                            diffNumFinal = randInt(1, 4);
                            break;
                        case 1:
                            diffNumFinal = randInt(5, 8);
                            break;
                        case 2:
                            diffNumFinal = randInt(9, 12);
                            break;
                        case 3:
                            diffNumFinal = randInt(13, maxDifficulty);
                            break;
                        case -1:
                        default:
                            diffNumFinal = randInt(1, maxDifficulty);
                            break;
                    }

                    ExampleService.fetchQuestions(catNumNew, diffNumFinal, $scope.HSorMS)
                        .then(function (list) {
                            window.list = list;

                            //$scope.myHTML = response.data.text;

                            list.$loaded(function (data) {
                                if (data.length == 0) throw "No results found.";
                                var regularArray = [];
                                for (var i = 0; i < data.length; i++) {
                                    regularArray.push(data[i]);
                                }
                                $scope.data = randEle(regularArray);

                                $scope.data.tossupQ = processToHTML($scope.data.tossupQ);
                                $scope.data.bonusQ = processToHTML($scope.data.bonusQ);
                                $scope.data.category = $scope.data.category;
                                $scope.data.setNum = $scope.data.setNum;
                                $scope.data.roundNum = $scope.data.roundNum;
                                //processToHTML()
                                // close pull to refresh loader
                                $ionicScrollDelegate.$getByHandle('small').scrollTop();
                                $scope.loading = false;
                                //$scope.$broadcast('scroll.refreshComplete');
                                if ($scope.mode == 1 & $scope.progress == 1)
                                    $scope.nextQuestion();
                                if ($ionicLoading)  $ionicLoading.hide();
                            })


                        }).catch(function (e) {
                        if ($ionicLoading)  $ionicLoading.hide();
                        $ionicPopup.alert({"title": "Error", "template": "Sorry, there was an error. " + e});
                        //todo: GO BACK.
                    });
                };

                $scope.nextQuestion();

            }



        });

        var clearTimers = function() {
            if ($scope.timer.int1) $interval.cancel($scope.timer.int1);
            if ($scope.timer.timeout1) $timeout.cancel($scope.timer.timeout1);
            if ($scope.timer.int2) $interval.cancel($scope.timer.int2);
            if ($scope.timer.timeout2) $timeout.cancel($scope.timer.timeout2);
            $scope.timer.time1 = null;
            $scope.timer.time2 = null;
            $scope.timer.timeUp1 = false;
            $scope.timer.timeUp2 = false;
        }

        $scope.initTimer = function() {
            if ($scope.timer) {
                clearTimers();
            }
            $scope.timer = {};
            $scope.timer.timeTU = function() {
                makeTimer(5);
            };
            $scope.timer.timeBonus = function() {
                makeTimer(20);
            };
            function makeTimer(numSecs) {
                var intNum = (numSecs == 5) ? "1" : "2";
                console.log("INNTNUM"+intNum);
                if ($scope.timer["time" + intNum]) {
                    //pause the timer. todo.

                    return;
                }
                var duration = moment.duration(numSecs, 'seconds');
                var interval = 10;
                clearTimers();

                $scope.timer["int" + intNum] = $interval(function(){
                    duration = moment.duration(duration.asMilliseconds() - interval, 'milliseconds');
                    //show how many hours, minutes and seconds are left
                    //console.log(duration.asMilliseconds());
                    $scope.timer["time" + intNum] = moment(duration.asMilliseconds()).format('s.S');
                    //console.log('yea');
                    if (duration.asMilliseconds() <= 0) {
                        $interval.cancel($scope.timer["int" + intNum]);
                        $scope.timer["time" + intNum] = "Time's up!";
                        $scope.timer["timeUp"+intNum] = true;
                        $scope.timer["timeout" + intNum] = $timeout(function() {
                            $scope.timer["time" + intNum] = null;
                            $scope.timer["timeUp"+intNum] = false;
                            if ($scope.mode == 1) { //game mode.
                                $scope.nextQuestion();
                            }
                        }, ($scope.mode == 1)? 500: 2000); //timeUpTime is smaller in game mode.

                    }
                }, interval);
                //console.log('timeTU');
            }
        }

    });

