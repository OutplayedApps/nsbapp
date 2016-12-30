'use strict';

/**
 * @ngdoc function
 * @name IonicGulpSeed.controller:HomeController
 * @description
 * # HomeController
 */
angular.module('IonicGulpSeed')
    .controller('HomeController', function($scope, ExampleService) {

        $scope.myHTML = null;
        var categoryList = {
            "EARTH AND SPACE": 0,
            "BIOLOGY": 1,
            "CHEMISTRY": 2,
            "PHYSICS": 3,
            "MATHEMATICS":4,
            "MATH":4,
            "ENERGY":5,
            "GENERAL SCIENCE": 6,
            "COMPUTER SCIENCE": 7
        };
        $scope.categories = [];
        $scope.catValues = [];
        function toTitleCase(str)
        {
            str = str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
            return str.replace("And", "and");
        }
        for (var i in categoryList) {
            console.log(i);
            $scope.categories.push(toTitleCase(i));
            $scope.catValues.push(categoryList[i]);
        }
        $scope.selectedCategory = $scope.categories[0];
        $scope.difficulties = ['Easy (1-4)', 'Medium (5-8)', 'Hard (9-12)', 'Extreme (13-17)', 'All'];
        $scope.selectedDifficulty = $scope.categories[0];

        $scope.nextQuestion = function() {
            ExampleService.doSomethingAsync()
                .then(function() {
                    return ExampleService.fetchQuestions(1, 12);
                })
                .then(function(list) {
                    //$scope.myHTML = response.data.text;
                    list.$loaded(function(data) {
                        $scope.data = data;
                        console.log(data);
                        // close pull to refresh loader
                        $scope.$broadcast('scroll.refreshComplete');
                    })

                });
        };

        $scope.nextQuestion();


    });
