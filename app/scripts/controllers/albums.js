/**
 * @ngdoc function
 * @name musicPlayerApp.controller:ArtistsCtrl
 * @description
 * # ArtistsCtrl
 * Controller of the musicPlayerApp
 */
 angular.module('musicPlayerApp')
	 .controller('ModalAlbumCtrl', function ($scope, $rootScope, $modal, $log, Spotify) {
	 	console.log("ModalAlbumCtrl");	 

	 	$scope.open = function (artist, size) {	 		

	 				$rootScope.artistModal = artist;	 				

					//Data is retrieved only from Swedesh Market (if other country required change 'SE' string)
					//Limited to 20 Albums (can be extended to maximum 50 - just add in {limit: 50})
					Spotify.getArtistAlbums(artist.id, {
						country: 'SE'
					}).then(function (data) {					
						$rootScope.albumsOfArtist = data.items;							

						var modalInstance = $modal.open({
							templateUrl: '/views/ModalAlbum.html',
							controller: 'ModalInstanceCtrl',
							size: size,
							resolve: {
								items: function () {								
									return $rootScope.albumsOfArtist;
								}
							}
						});

						modalInstance.result.then(function (selectedItem) {	
							$scope.selected = selectedItem;
						}, function () {
							$log.info('Modal dismissed at: ' + new Date());
						});										
					});						
				};

			})


	// Please note that $modalInstance represents a modal window (instance) dependency.
	// It is not the same as the $modal service used above.
	.controller('ModalInstanceCtrl', function ($scope, $rootScope, $modalInstance, items) {		

		$rootScope.albumsOfArtist = items;		
		$scope.selected = {
			item: $rootScope.albumsOfArtist[0]
		};		
	});
