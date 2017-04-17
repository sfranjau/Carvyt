// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','firebase', 'starter.controllers', 'starter.services'])

//Permet de fixer la barre tabs en bas sur toutes les platforms
.config(function($ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom');
})


.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {


  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider


 

  .state('log', {
    url: '/log',
    
        templateUrl: 'templates/log.html',
        controller: 'LogCtrl'
      
  })

  .state('signup', {
    url: '/signup',
        templateUrl: 'templates/signup.html',
        controller: 'SignUpCtrl'
       
  })

  .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
  })

    .state('inscription', {
      url: '/inscription',
      templateUrl: 'templates/inscription.html',
      controller: 'InscriptionCtrl'
  })

      .state('contact', {
      url: '/contact',
      templateUrl: 'templates/contact.html',
      controller: 'ContactCtrl'
  })


  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.suivi', {
      url: '/suivi',
      views: {
        'tab-suivi': {
          templateUrl: 'templates/tab-suivi.html',
          controller: 'SuiviCtrl'
        }
      }
    })
    

  .state('tab.coffre', {
    url: '/coffre',
    views: {
      'tab-coffre': {
        templateUrl: 'templates/tab-coffre.html',
        controller: 'CoffreCtrl'
      }
    }
  })
 
    .state('tab.settings', {
    url: '/settings',
    views:{
      'tab-settings':{
        templateUrl: 'templates/tab-settings.html',
        controller:'SettingsCtrl'
      }
    }
  })

     .state('tab.more', {
    url: '/more',
    views:{
      'tab-more':{
        templateUrl: 'templates/tab-more.html',
        controller:'MoreCtrl'
      }
    }
  })  ;

  // if none of the above states are matched, use this as the fallback
  //permet de définir la premiere page appeler dans l'application
  $urlRouterProvider.otherwise('login');

});
