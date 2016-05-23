angular.module('mySearch').controller('FavouriteListController', ['$scope', '$rootScope',
  function(scope, $rootScope) {

    angular.extend(scope, {
      favouritePhotos: []
    });

    var favouritePhotos = JSON.parse(localStorage.getItem('favouritePhotos')) || [];
    scope.favouritePhotos = favouritePhotos;

    scope.$on('handleBroadcast', function(evt, arg) {
      var pos = $.inArray(arg.photo, favouritePhotos);
      if (pos < 0) {
        favouritePhotos.push(arg.photo);
        scope.favouritePhotos = favouritePhotos;
        localStorage.setItem('favouritePhotos', JSON.stringify(favouritePhotos));
      }
    });

    scope.clearFavouritePhotos = function() {
      scope.favouritePhotos = [];
      favouritePhotos = [];
      localStorage.removeItem('favouritePhotos');
    };
  }
]);
