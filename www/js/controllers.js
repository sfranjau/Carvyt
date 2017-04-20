angular.module('starter.controllers', [])

.controller('AccueilCtrl', function($scope) {})

.controller('MoreCtrl', function($scope) {
  $scope.sendFeedback= function() {
        if(window.plugins && window.plugins.emailComposer) {
            window.plugins.emailComposer.showEmailComposerWithCallback(function(result) {
                console.log("Response -> " + result);
            }, 
            "Contact CarVytal", // Subject
            "",                      // Body
            ["contact.carvytal@gmail.com"],    // To
            null,                    // CC
            null,                    // BCC
            false,                   // isHTML
            null,                    // Attachments
            null);                   // Attachment Data
        }
    }
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

})

.controller('ContactCtrl', function($scope) {
    
})

.controller('InscriptionCtrl', function($scope) {})

.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state) {
    $scope.data = {};
 
    $scope.login = function() {
        LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
            $state.go('tab.accueil');
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        });
    }
})

//controller qui récupere la platform et la version d'os
.controller('SettingsCtrl', function($scope) {
     $scope.info = {
     platform: ionic.Platform.platform(),
     version: ionic.Platform.version()
   };
})
.controller('SuiviCtrl', function($scope, $http) {
  var url = 'https://carvytal-83de6.firebaseio.com/piece.json';

  $scope.items = getItems();

  $scope.addItem = function() {
    var name = prompt("Que devez-vous acheter?");
    if (name) {
      var postData = {
        "name": name
      };
      $http.post(url, postData).success(function(data) {
        $scope.items = getItems();
      });
    }
  };

  function getItems() {
    var items = [];
    $http.get(url).success(function(data) {
      angular.forEach(data, function(value, key) {
        if (value!= null) {
        var designation = {designation: value.designation};
          items.push(designation);
          }
      });
    });

    return items;
  }

})
.controller('CoffreCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
    $scope.list = [
    { id: 1, title: 'Titre 1'},
    { id: 2, title: 'Titre 2'},
    { id: 3, title: 'Titre 3'},
    { id: 4, title: 'Titre 4'},
    { id: 5, title: 'Titre 5'},
    { id: 6, title: 'Titre 6'}
  ];
})

.controller('LogCtrl', function($scope, $state, AuthService, $ionicLoading) {
  $scope.login = function(user){
    $ionicLoading.show({
      template: 'Logging in ...'
    });

    AuthService.doLogin(user)
    .then(function(user){
      // success
      $state.go('tab.dash');
      $ionicLoading.hide();
    },function(err){
      // error
      $scope.errors = err;
      $ionicLoading.hide();
    });
  };

  $scope.facebookLogin = function(){
    $ionicLoading.show({
      template: 'Logging in with Facebook ...'
    });

    AuthService.doFacebookLogin()
    .then(function(user){
      // success
      $state.go('tab.dash');
      $ionicLoading.hide();
    },function(err){
      // error
      $scope.errors = err;
      $ionicLoading.hide();
    });
  };
})

.controller('SignUpCtrl', function($scope, $state, AuthService, $ionicLoading) {
  $scope.signup = function(user){
    $ionicLoading.show({
      template: 'Signing up ...'
    });

    AuthService.doSignup(user)
    .then(function(user){
      // success
      $state.go('tab.dash');
      $ionicLoading.hide();
    },function(err){
      // error
      $scope.errors = err;
      $ionicLoading.hide();
    });
  };
})

.controller('UserCtrl', function($scope, $state, AuthService){
  $scope.current_user = {};

  var current_user = AuthService.getUser();

  if(current_user && current_user.provider == "facebook"){
    $scope.current_user.email = current_user.facebook.displayName;
    $scope.current_user.image = current_user.facebook.profileImageURL;
  } else {
    $scope.current_user.email = current_user.password.email;
    $scope.current_user.image = current_user.password.profileImageURL;
  }

  $scope.logout = function(){
    AuthService.doLogout();

    $state.go('log');
  };
})

;
