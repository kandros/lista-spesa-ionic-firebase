// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', [
  'listControllersModule',
  'ionic',
  'firebase',
])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.factory("ListArray", function($firebaseArray) {
  var listRef = new Firebase("http://lista-spesa.firebaseio.com/lista");
  return $firebaseArray(listRef);
})

.config(function ($ionicConfigProvider) {
  $ionicConfigProvider.tabs.position("bottom");
})

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('list', {
      url: '/',
      views: {
        list: {
          templateUrl: 'templates/list.html',
          controller: 'listController'
        }
      }
    })

    .state('cart', {
      url: '/cart',
      views: {
        cart: {
          templateUrl: 'templates/cart.html',
          controller: 'listController'
        }
      }
    });
});
