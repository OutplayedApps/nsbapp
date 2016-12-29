'use strict';

/**
 * @ngdoc function
 * @name IonicGulpSeed.serive:ExampleService
 * @description
 * # ExampleService
 */
angular.module('IonicGulpSeed')
    // use factory for services
    .factory('ExampleService', function($http, $timeout, $q) {

        var kindOfPrivateVariable = 42;

        var doSomethingAsync = function() {
            var deferred = $q.defer();
            $timeout(deferred.resolve.bind(null, kindOfPrivateVariable), 1000);
            return deferred.promise;
        };

        var fetchSomethingFromServer = function() {
            /*return $http({
                    url: 'http://hipsterjesus.com/api',
                    params: {
                        paras: 2
                    },
                    method: 'GET'
                })
                .success(function(data) {
                    console.log('fetched this stuff from server:', data);
                })
                .error(function(error) {
                    console.log('an error occured', error);
                });*/
            //
            // If absolute URL from the remote server is provided, configure the CORS
            // header on that server.
            //
            var url = 'http://science.energy.gov/~/media/wdts/nsb/pdf/HS-Sample-Questions/Sample-Set-1/round15.pdf';

            //
            // Disable workers to avoid yet another cross-origin issue (workers need
            // the URL of the script to be loaded, and dynamically loading a cross-origin
            // script does not work).
            //
             PDFJS.disableWorker = true;

            //
            // The workerSrc property shall be specified.
            //
            //PDFJS.workerSrc = '../../build/pdf.worker.js';

            return PDFJS.getDocument(url).then(function(pdf) {
               return pdf.getPage(1);
            }).then(function(page) {
                return page;
            })

            //return "hello";

        };

        // public api
        return {
            doSomethingAsync: doSomethingAsync,
            fetchSomethingFromServer: fetchSomethingFromServer
        };

    });
