(function(angular) {
    'use strict';

angular.module('musicApp')

    .controller('UpdateGenreCtrl',
        ['$scope','GenreRetrieveResource',
        function($scope,GenreRetrieveResource) {


        	$scope.genre_id = window.location.pathname.split('/')[3]
        	
            function getGenre() {
		    	GenreRetrieveResource.get({
		    		'genreId': $scope.genre_id
		    	}, function(resp) {
	                $scope.genre = resp;
	            });
		    	return true;
		    }

		    getGenre();

		    $scope.resetGenreForm = function(form){
		    	$scope.form.$submitted=false;	
		    	$scope.edit_genre_name = '';
	            $scope.edit_genre_type = '';
		    }

		    $scope.updateGenre = function(form) {
		    	$scope.form.$submitted=true;
		       	if ($scope.form.$valid) {
		       		GenreRetrieveResource.update({
		    			"genreId": $scope.genre_id,
		    			"genre_name": $scope.edit_genre_name,
    					"genre_type": $scope.edit_genre_type	
		    	}, function(resp) {
	                $scope.genre = resp;
	                $('#updateGenre').modal('hide');
	                $scope.resetGenreForm(form);
	            },
	            function(error) {
	            	console.log(error);
				});
		    	return true;
		       	}
		    };            
    }]);

})(angular);



