angular.module('starter.controllers', [])

.controller('AccueilCtrl', function($scope) {})



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

.controller('MoreCtrl', function($scope,$rootScope,sharedUtils,$ionicHistory,$state,$ionicSideMenuDelegate) {
 
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

    //Check if user already logged in
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        $scope.user_info=user; //Saves data to user_info
 
        //Only when the user is logged in, the cart qty is shown
        //Else it will show unwanted console error till we get the user object
        $scope.get_total= function() {
          var total_qty=0;
          for (var i = 0; i < sharedCartService.cart_items.length; i++) {
            total_qty += sharedCartService.cart_items[i].item_qty;
          }
          return total_qty;
        };
 
      }else {
 
    // If the user is not logged in
        $ionicSideMenuDelegate.toggleLeft(); //To close the side bar
        $ionicSideMenuDelegate.canDragContent(false);  // To remove the sidemenu white space
 
        $ionicHistory.nextViewOptions({
          historyRoot: true
        });
        $rootScope.extras = false;
        sharedUtils.hideLoading();
        $state.go('log', {}, {location: "replace"});
 
      }
    });
 
    $scope.logout=function(){
 
      sharedUtils.showLoading();
 
      // Main Firebase logout
      firebase.auth().signOut().then(function() {
 
 
        $ionicSideMenuDelegate.toggleLeft(); //To close the side bar
        $ionicSideMenuDelegate.canDragContent(false);  // To remove the sidemenu white space
 
        $ionicHistory.nextViewOptions({
          historyRoot: true
        });
 
 
        $rootScope.extras = false;
        sharedUtils.hideLoading();
        $state.go('log', {}, {location: "replace"});
 
      }, function(error) {
         sharedUtils.showAlert("Error","Logout Failed")
      });
 
    }
 
  })

.controller('LogCtrl', function($scope,$rootScope,$ionicHistory,sharedUtils,$state,$ionicSideMenuDelegate) {
    $rootScope.extras = false;  // For hiding the side bar and nav icon
 
    // When the user logs out and reaches login page,
    // we clear all the history and cache to prevent back link
    $scope.$on('$ionicView.enter', function(ev) {
      if(ev.targetScope !== $scope){
        $ionicHistory.clearHistory();
        $ionicHistory.clearCache();
      }
    });
 
 
    //Check if user already logged in
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
 
    //Removes back link to login page
        $ionicHistory.nextViewOptions({
          historyRoot: true
        });
        $ionicSideMenuDelegate.canDragContent(true);  // Sets up the sideMenu dragable
        $rootScope.extras = true;
        sharedUtils.hideLoading();
        $state.go('tab.accueil', {}, {location: "replace"});
 
      }
    });
 
 
    $scope.loginEmail = function(formName,cred) {
 
 
      if(formName.$valid) {  // Check if the form data is valid or not
 
          sharedUtils.showLoading(); //starts the loading popup
 
          //Email Login via Firebase
          firebase.auth().signInWithEmailAndPassword(cred.email,cred.password).then(function(result) {
 
                // You dont need to save the users session in your local session or cookies. Firebase handles it.
                
        // You only need to :
                // 1. clear the login page history from the history stack so that you cant come back
                // 2. Set rootScope.extra;
                // 3. Turn off the loading
                // 4. Got to menu page
 
      
              $ionicHistory.nextViewOptions({
                historyRoot: true   //1
              });
              $rootScope.extras = true;  //2
              sharedUtils.hideLoading();  //3
              $state.go('tab.accueil', {}, {location: "replace"}); //4
 
            },
            function(error) {
              sharedUtils.hideLoading();
              sharedUtils.showAlert("Please note","Authentication Error");
            }
        );
 
      }else{
        sharedUtils.showAlert("Please note","Entered data is not valid");
      }
 
 
 
    };
 
 
    $scope.loginFb = function(){
      //Facebook Login
    };
 
    $scope.loginGmail = function(){
      //Gmail Login
    };
 
 
})

.controller('SignupCtrl', function($scope,$rootScope,sharedUtils,$ionicSideMenuDelegate,
                                   $state,fireBaseData,$ionicHistory) {
    $rootScope.extras = false; // For hiding the side bar and nav icon

    $scope.signupEmail = function (formName, cred) {
 
      if (formName.$valid) {  // Check if the form data is valid or not
 
        sharedUtils.showLoading();
 
        //Main Firebase Authentication part
        firebase.auth().createUserWithEmailAndPassword(cred.email, cred.password).then(function (result) {
 
            //Add name and default dp to the Autherisation table
            result.updateProfile({
              displayName: cred.name,
              photoURL: "default_dp"
            }).then(function() {}, function(error) {});
 
      
      //We create a user table to store users additional information.Here, telephone
            //Add phone number to the user table
            fireBaseData.refUser().child(result.uid).set({
              telephone: cred.phone
            });
 
            //Registered OK
            $ionicHistory.nextViewOptions({
              historyRoot: true
            });
            $ionicSideMenuDelegate.canDragContent(true);  // Sets up the sideMenu dragable
            $rootScope.extras = true;
            sharedUtils.hideLoading();
            $state.go('log', {}, {location: "replace"});
 
        }, function (error) {
            sharedUtils.hideLoading();
            sharedUtils.showAlert("Please note","Sign up Error");
        });
 
      }else{
        sharedUtils.showAlert("Please note","Entered data is not valid");
      }
 
    }
 
  })

;
