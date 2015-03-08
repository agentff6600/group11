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
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/home');

  }]);