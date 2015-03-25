/**
 * @ngdoc function
 * @name musicPlayerApp.controller:ArtistsCtrl
 * @description
 * # ArtistsCtrl
 * Controller of the musicPlayerApp
 */
angular.module('musicPlayerApp')
	.controller('AlbumsCtrl', function ($scope, $rootScope, Spotify) {
		console.log("albums controller");
		$scope.getAlbumsFromArtist = function (artist) {
			//Data is retrieved only from Swedesh Market (if other country required change 'SE' string)
			//Limited to 20 Albums (can be extended to maximum 50 - just add in {limit: 50})

			Spotify.getArtistAlbums(artist, {
				country: 'SE'
			}).then(function (data) {
				$scope.albums = data.items;
				$rootScope.albumsOfArtist = data.items;

				console.log($rootScope.albumsOfArtist);
				//console.log("albums", $rootScope.albumsOfArtist);       
			});
		}

	})



.controller('ModalAlbumCtrl', function ($scope, $modal, $log) {

	$scope.items = ['item1', 'item2', 'item3'];

	$scope.open = function (size) {

		var modalInstance = $modal.open({
			templateUrl: '/views/ModalAlbum.html',
			controller: 'ModalInstanceCtrl',
			size: size,
			resolve: {
				items: function () {
					return $scope.items;
				}
			}
		});

		modalInstance.result.then(function (selectedItem) {
			$scope.selected = selectedItem;
		}, function () {
			$log.info('Modal dismissed at: ' + new Date());
		});
	};
})

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.


.controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {

	$scope.items = items;
	$scope.selected = {
		item: $scope.items[0]
	};

	$scope.ok = function () {
		$modalInstance.close($scope.selected.item);
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
})

//Collapse

.controller('CollapseAlbumCtrl', function ($scope) {
  $scope.isCollapsed = false;
});