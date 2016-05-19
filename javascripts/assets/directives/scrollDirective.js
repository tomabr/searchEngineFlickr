angular.module('mySearch').directive("scroll", ['$window', '$document', 'flickrRepoService',
	function ($window, $document, flickrRepoService) {
    return function(scope, element, attrs) {

        angular.element($window).bind("scroll", function() {
        	var scrollY = $window.pageYOffset;

        	var scrollHeight = $document[0].body.scrollHeight;
        	var scrollTop = $document[0].body.scrollTop;

        	var elmHeight = $(element).outerHeight();
        	var page;

        	if(!!elmHeight && scrollTop >= elmHeight){
        		page = flickrRepoService.getPage();
        		flickrRepoService.getPhotos({term:scope.searchTerm, page:page}).then(function(data){
              scope.photos = data;
            },function(error){
              scope.error = error;
            });
            scrollTop = scrollHeight;
        	}

        	if (!!elmHeight && (scrollHeight == scrollTop + $window.innerHeight)){

        		flickrRepoService.getPhotos({term:scope.searchTerm}).then(function(data){
        			scope.photos = data;
        		},function(error){
        			scope.error = error;
        		});
		        scrollTop = scrollHeight;
		    }
            scope.$apply();
        });
    };
}]);
