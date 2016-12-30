'use strict';

/**
 * @ngdoc function
 * @name IonicGulpSeed.controller:HomeController
 * @description
 * # HomeController
 */
angular.module('IonicGulpSeed')
    .controller('HomeController', function($scope, ExampleService, $ionicScrollDelegate) {

        $scope.myHTML = null;
        var categoryList = {
            "EARTH AND SPACE": 0,
            "BIOLOGY": 1,
            "CHEMISTRY": 2,
            "PHYSICS": 3,
            "MATH":4,
            "ENERGY":5,
            "GENERAL SCIENCE": 6,
            "COMPUTER SCIENCE": 7,
            "Categories: All": 8
        };
        $scope.categories = [];
        $scope.catValues = [];
        function toTitleCase(str)
        {
            str = str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
            return str.replace("And", "and");
        }
        function randEle(items) {
            return items[Math.floor(Math.random()*items.length)];
        }
        for (var i in categoryList) {
            console.log(i);
            $scope.categories.push(toTitleCase(i));
            $scope.catValues.push(categoryList[i]);
        }
        $scope.selectedCategory = $scope.categories[8];
        $scope.difficulties = ['Easy (1-4)', 'Medium (5-8)', 'Hard (9-12)', 'Extreme (13-17)', 'Difficulty: All'];
        $scope.selectedDifficulty = $scope.difficulties[4];

        function randInt(min,max)
        {
            return Math.floor(Math.random()*(max-min+1)+min);
        }
        function processToHTML(txt) {
            //console.log(txt);
            txt = txt.replace(/(\n)/g, "");
            txt = txt.replace(/([WXYZ]\))/g, "<br>$1");
            return txt;

        }

        $scope.nextQuestion = function() {
            var catNum = $scope.categories.indexOf($scope.selectedCategory);
            console.log("CATNUM"+catNum+$scope.selectedCategory);
            //console.log($scope.selectedDifficulty);
            var diffNum = $scope.difficulties.indexOf($scope.selectedDifficulty);
            var catNumNew = catNum;
            if (catNum == 8) {
                catNumNew = randInt(0,5);
            }
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
                    diffNumFinal = randInt(13, 17);
                    break;
                case 4:
                default:
                    diffNumFinal = randInt(1, 17);
                    break;
            }
                ExampleService.fetchQuestions(catNumNew, diffNumFinal)
                .then(function(list) {
                    //$scope.myHTML = response.data.text;
                    window.list = list;
                    list.$loaded(function(data) {
                        var regularArray = [];
                        for (var i = 0; i < data.length; i++) {
                            regularArray.push(data[i]);
                        }
                        $scope.data = randEle(regularArray);
                        $scope.data.tossupQ = processToHTML($scope.data.tossupQ);
                        $scope.data.bonusQ = processToHTML($scope.data.bonusQ);
                        //processToHTML()
                        // close pull to refresh loader
                        $ionicScrollDelegate.$getByHandle('small').scrollTop();
                        //$scope.$broadcast('scroll.refreshComplete');
                    })

                });
        };

        $scope.nextQuestion();


    });

