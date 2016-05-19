angular.module('mySearch').controller('SearchController', ['$scope', '$rootScope',
	'flickrRepoService', function(scope, $rootScope, flickrRepoService){

		angular.extend(scope, {
			photos: [],
			error: undefined
		});

		var favouritePhotos = [];

		scope.search = function(){

			flickrRepoService.clearPhotos();
			if(!!scope.searchTerm)
				flickrRepoService.getPhotos({term: scope.searchTerm, page: 1})
				.then(function(data) {
						scope.error = undefined;
						scope.photos = data;

	                }, function(error) {
	                    scope.error = error;
	            });
		};


		scope.reset = function(){
			scope.searchTerm = '';
		};

		scope.addToFavourite = function(photo){
			favouritePhotos.push(photo);

			scope.$emit('handleEmit', {
		        photo: photo
		    });

		};
	}
]);
