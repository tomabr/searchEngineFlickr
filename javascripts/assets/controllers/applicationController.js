angular.module('mySearch').controller('ApplicationController', ['$scope', '$rootScope',
	function(scope, $rootScope){


		$rootScope.$on('handleEmit', function(evt,arg){

			$rootScope.$broadcast('handleBroadcast',{
				photo: arg.photo
			});
		});
  }
]);
