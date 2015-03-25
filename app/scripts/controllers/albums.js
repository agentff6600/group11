/**
 * @ngdoc function
 * @name musicPlayerApp.controller:ArtistsCtrl
 * @description
 * # ArtistsCtrl
 * Controller of the musicPlayerApp
 */
angular.module('musicPlayerApp')
	.controller('AlbumsCtrl', function ($scope, $rootScope, AlbumsModal, Spotify) {
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

		var modalOptions = {
			closeButtonText: 'Close',
			actionButtonText: 'Delete Customer',
			headerText: 'Delete ',
			bodyText: 'Are you sure you want to delete this customer?'
		};
		$scope.modalService.showModal({}, modalOptions).then(function () {
			console.log("Albums");
		});
	})



.controller('ModalAlbumCtrl', function ($scope, $modal, $log) {

	$scope.items = ['item1', 'item2', 'item3'];

	$scope.open = function (size) {

		var modalInstance = $modal.open({
			templateUrl: 'myModalContent.html',
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
});