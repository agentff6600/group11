/**
 * Main module of the application.
 */
angular.module('musicPlayerApp', [
    'ui.router', 'spotify', 'angucomplete-alt', 'ngDragDrop', 'ui.bootstrap'
  ])
	.config(['$stateProvider', '$urlRouterProvider', 'SpotifyProvider', function ($stateProvider, $urlRouterProvider, SpotifyProvider) {

		SpotifyProvider.setClientId('16106a33d71a48499d684c8cf8672502');
  		//SpotifyProvider.setRedirectUri('http://localhost:9000/callback');
  		SpotifyProvider.setScope('user-read-private playlist-read-private playlist-modify-private playlist-modify-public');

		$stateProvider
			.state('app', {
				url: "",
				templateUrl: "views/_main.html",
				controller: "MainCtrl",				
				page: 'home',
								
			})
			.state('app.home', {
				url: "/home",
				views: {
					"mainContent": {
						controller: "HomeCtrl",
						templateUrl: "views/home.html",
					}
				}
			})
			.state('app.artists', {
				url: "/artists",
				views: {
					"mainContent": {
						controller: "ArtistsCtrl",
						templateUrl: "views/artists.html",
					}
				}
			})
			.state('app.albums', {
				url: "/albums",
				views: {
					"mainContent": {
						controller: "AlbumsCtrl",
						templateUrl: "views/albums.html",
					}
				}
			})
			.state('app.playlists', {
				url: "/playlists",
				views: {
					"mainContent": {
						//controller: "PlaylistsCtrl",
						templateUrl: "views/playlists.html",
					}
				}
			})
			.state('app.toplists', {
				url: "/toplists",
				templateUrl: "views/_main.html",
				controller: "MainCtrl",				
				page: 'home',
								
			})
			.state('app.player', {
				url: "/player",
				views: {
					"musicPlayer": {
						controller: "PlayerCtrl",
						templateUrl: "views/player.html",
					}
				}
			});
		// if none of the above states are matched, use this as the fallback
		$urlRouterProvider.otherwise('/home');
		
		
  }]);