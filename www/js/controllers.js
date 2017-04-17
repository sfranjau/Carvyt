angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('MoreCtrl', function($scope) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

})

.controller('ContactCtrl', function ($scope, $state) {

var whatToDo = this;

/**
 * Sends an email using Email composer with attachments plugin and using
 * parameter email.
 *
 * @param email
 */
whatToDo.sendEmail = function (email) {
  if (window.plugins && window.plugins.emailComposer) { //check if plugin exists

    window.plugins.emailComposer.showEmailComposerWithCallback(function (result) {
        //console.log("Email sent successfully");
      },

      "Test",        // Subject
      "Teste d'envoie de mail",        // Body
      ["franjaud.stephane@live.fr"],     // To (Email to send)
      null,        // CC
      null,        // BCC
      false,       // isHTML
      null,        // Attachments
      null);       // Attachment Data
  }

}
})

.controller('InscriptionCtrl', function($scope) {})

.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state) {
    $scope.data = {};
 
    $scope.login = function() {
        LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
            $state.go('tab.dash');
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
  var url = 'https://carvytal-83de6.firebaseio.com';

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
        var designation = {designation: value.designation};
          items.push(designation);
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
});
