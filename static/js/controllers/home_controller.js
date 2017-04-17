(function(angular) {
    'use strict';

angular.module('musicApp')

    .controller('HomeCtrl',
        ['$scope','TrackResource',
        function($scope,TrackResource) {
            $scope.message = "yeah baby it is correct message."

            $scope.trackPerPage = 10;

            function getTracks(pageNumber) {
		    	TrackResource.get({
		    		'offset': (pageNumber - 1) * $scope.trackPerPage,
		    		'limit': $scope.trackPerPage
		    	}, function(resp) {
		    		console.log(resp)
	                $scope.tracks = resp.results;
	                $scope.totalTracks = resp.count;

	            });
		    	return true;
		    }
		    getTracks(1);
            
    }]);

})(angular);



