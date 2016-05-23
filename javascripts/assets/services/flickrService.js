angular.module('mySearch').service('flickrService', ['$http', '$q', 'apiKey',
  function($http, $q, apiKey) {
    return {
      get: function(_data) {

        var data = {
          page: _data.page,
          term: _data.term
        };


        var apiURL = 'https://api.flickr.com/services/rest/';
        var params = {
          text: data.term,
          method: 'flickr.photos.search',
          api_key: encodeURIComponent(apiKey),
          format: 'json',
          per_page: 30,
          nojsoncallback: 1,
          page: data.page
        };


        var url = apiURL + '?' + $.param(params);
        var deferred = $q.defer();
        $http.get(url).then(function(response) {

          if (response.data.stat === 'fail')
            return deferred.reject({ message: 'Problem with connection' });

          if (response.data.photos.pages === 0) {
            return deferred.reject({ message: 'Not found photos' });
          }

          if (response.data.photos.page > response.data.photos.pages) {
            return deferred.reject({ message: 'Not more photos' });
          }


          var photos = response.data.photos.photo;
          var len = photos.length;
          var urlPhotos = [];

          for (var i = 0; i < len; i++) {
            var photo = photos[i];
            var img = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server +
              '/' + photo.id + '_' + photo.secret + '_q' + '.jpg';

            var obj = {
              url: img,
              title: photo.title
            };
            urlPhotos.push(obj);
          }


          deferred.resolve(urlPhotos);

        }, function(response) {
          deferred.reject({ message: 'Problem with connection' });
        });

        return deferred.promise;
      }
    };
  }
]);
