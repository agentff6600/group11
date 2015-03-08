/**
 * Main module of the application.
 */
angular.module('musicPlayerApp', [
    'ui.router',
    'ui.bootstrap'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {

    console.log('loading...');
    console.log($stateProvider);
    
    $stateProvider
    .state('app', {
        url: "/",
        templateUrl: "views/_main.html",
        views: {
            'mainContent': {
                templateUrl: "views/home.html"
            }
        }
    })
    .state('app.artists', {
        url: "/artists",
        controller: 'ArtistsCtrl',
        views: {
            'mainContent': {
                templateUrl: "views/artists.html"
            }
        }
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/');

  });