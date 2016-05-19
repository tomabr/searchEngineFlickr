angular.module('mySearch').service('flickrRepoService', ['flickrService', '$q',
	function(flickrService, $q){
		var photos =[];
		var page = 1;
		var count = 0;


		return {
			getPage: function(){
				return page;
			},
			clearPhotos: function(){
				photos = [];
				page = 1;
			},
			getPhotos: function( _data ) {
				var term = _data.term;
				var deferred = $q.defer();
				if( ((!!_data.page && (page == _data.page)) && count===0) || !_data.page){
					count++;
					flickrService.get({ term: term, page: page}).then(function(data) {
						photos = photos.concat(data);
						page=page+1;
						deferred.resolve(photos);
						count = 0;

	                }, function(error) {
	                    deferred.reject(error.message);
	                    count = 0;
                	});
				} else{
					deferred.reject();
				}

				return deferred.promise;

			}
		};
}]);
