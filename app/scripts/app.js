/**
 * Main module of the application.
 */
angular.module('musicPlayerApp', [
    'ui.router'
  ])
	.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

		$stateProvider
			.state('app', {
				url: "",
				templateUrl: "views/_main.html",
				controller: "MainCtrl",
				page: 'home'
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
						controller: "PlaylistsCtrl",
						templateUrl: "views/playlists.html",
					}
				}
			})
			.state('app.player', {
				url: "",
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