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
       var ref = new Firebase("https://carvytal-83de6.firebaseio.com");
 
 
  if(ionic.Platform.isWebView()){
 
    $cordovaFacebook.login(["public_profile", "email"]).then(function(success){
 
      console.log(success);
 
      ref.authWithOAuthToken("facebook", success.authResponse.accessToken, function(error, authData) {
        if (error) {
          console.log('Firebase login failed!', error);
        } else {
          console.log('Authenticated successfully with payload:', authData);
        }
      });
 
    }, function(error){
      console.log(error);
    });        
 
  }
  else {
 
    ref.authWithOAuthPopup("facebook", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
      }
    });
 
  }
    };
 
    $scope.loginGmail = function(){
      //Gmail Login
    };
 
 
})

.controller('AddcarCtrl', function($scope,$rootScope,sharedUtils,$state,fireBaseData,$ionicHistory) {
    $rootScope.extras = false; // For hiding the side bar and nav icon


    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
 
        //Accessing an array of objects using firebaseObject, does not give you the $id , so use firebase array to get $id
        $scope.addresses= $firebaseArray(fireBaseData.refUser().child(user.uid).child("car"));
 
        // firebaseObject is good for accessing single objects for eg:- telephone. Don't use it for array of objects
        $scope.user_extras= $firebaseObject(fireBaseData.refUser().child(user.uid));
      
        $scope.user_info=user; //Saves data to user_info
        //NOTE: $scope.user_info is not writable ie you can't use it inside ng-model of <input>
 
        //You have to create a local variable for storing emails
        $scope.data_editable={};
        $scope.data_editable.email=$scope.user_info.email;  // For editing store it in local variable
        $scope.data_editable.password="";
 
        $scope.$apply();
 
        sharedUtils.hideLoading();
 
      }
 
    });


    $scope.ajoutCar = function (imat,marque,km,motor) {
      // body...
        fireBaseData.refUser().child($scope.user_info.uid).child("/car").set({
          Immatriculation: imat,
            Marque: marque,
            Km: km,
            Motorisation: motor
        })

    }
    $scope.addCar = function (formName, cred) {

      if (formName.$valid) {  // vérifie si les données du form sont valides
 
        sharedUtils.showLoading();


       
 
        fireBaseData.refUser().child($scope.user_info.uid).child("car").set({
            Immatriculation: cred.Immatriculation,
            Marque: cred.Marque,
            Km: cred.Km,
            Motorisation: cred.Motorisation
            });
       
       
     
 
 
      }else{
        sharedUtils.showAlert("Please note","Entered data is not valid");
      }
 
    }
 
  })


.controller('CompteCtrl', function($scope,$rootScope,fireBaseData,$firebaseObject,
                                     $ionicPopup,$state,$window,$firebaseArray,
                                     sharedUtils) {
    //Bugs are most prevailing here
    $rootScope.extras=true;
 
    //Shows loading bar
    sharedUtils.showLoading();
 
    //Vérifie si l'user est logger
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
 
        //Accessing an array of objects using firebaseObject, does not give you the $id , so use firebase array to get $id
        $scope.addresses= $firebaseArray(fireBaseData.refUser().child(user.uid).child("address"));
 
        // firebaseObject is good for accessing single objects for eg:- telephone. Don't use it for array of objects
        $scope.user_extras= $firebaseObject(fireBaseData.refUser().child(user.uid));
      
        $scope.user_info=user; //Saves data to user_info
        //NOTE: $scope.user_info is not writable ie you can't use it inside ng-model of <input>
 
        //You have to create a local variable for storing emails
        $scope.data_editable={};
        $scope.data_editable.email=$scope.user_info.email;  // For editing store it in local variable
        $scope.data_editable.password="";
 
        $scope.$apply();
 
        sharedUtils.hideLoading();
 
      }
 
    });
  
  //Function 1
    $scope.addManipulation = function(edit_val) {  // Takes care of address add and edit ie Address Manipulator
 
 
      if(edit_val!=null) {
        $scope.data = edit_val; // For editing address
        var title="Edit Address";
        var sub_title="Edit your address";
      }
      else {
        $scope.data = {};    // For adding new address
        var title="Add Address";
        var sub_title="Add your new address";
      }
      // An elaborate, custom popup
      var addressPopup = $ionicPopup.show({
        template: '<input type="text"   placeholder="Nick Name"  ng-model="data.nickname"> <br/> ' +
                  '<input type="text"   placeholder="Address" ng-model="data.address"> <br/> ' +
                  '<input type="number" placeholder="Pincode" ng-model="data.pin"> <br/> ' +
                  '<input type="number" placeholder="Phone" ng-model="data.phone">',
        title: title,
        subTitle: sub_title,
        scope: $scope,
        buttons: [
          { text: 'Close' },
          {
            text: '<b>Save</b>',
            type: 'button-positive',
            onTap: function(e) {
              if (!$scope.data.nickname || !$scope.data.address || !$scope.data.pin || !$scope.data.phone ) {
                e.preventDefault(); //don't allow the user to submit unless he enters full details
              } else {
                return $scope.data;
              }
            }
          }
        ]
      });
 
      addressPopup.then(function(res) {
 
        if(edit_val!=null) {
          //Mettre à jour une adresse
          fireBaseData.refUser().child($scope.user_info.uid).child("address").child(edit_val.$id).update({    // update
            nickname: res.nickname,
            address: res.address,
            pin: res.pin,
            phone: res.phone
          });
        }else{
          //ajouter une nouvelle adresse
          fireBaseData.refUser().child($scope.user_info.uid).child("address").push({    // push
            nickname: res.nickname,
            address: res.address,
            pin: res.pin,
            phone: res.phone
          });
        }
 
      });
 
    };
 
    // Boite de dialogue pour confirmer la suppression d'un addresse
    $scope.deleteAddress = function(del_id) {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Delete Address',
        template: 'Are you sure you want to delete this address',
        buttons: [
          { text: 'No' , type: 'button-stable' },
          { text: 'Yes', type: 'button-assertive' , onTap: function(){return del_id;} }
        ]
      });
 
      confirmPopup.then(function(res) {
        if(res) {
          fireBaseData.refUser().child($scope.user_info.uid).child("address").child(res).remove();
        }
      });
    };
 
  //Function 2
    $scope.save= function (extras,editable) {
      //1. Edit Telephone doesnt show popup 2. Using extras and editable  // Bugs
      if(extras.telephone!="" && extras.telephone!=null ){
        //Update  Telephone
        fireBaseData.refUser().child($scope.user_info.uid).update({    // set
          telephone: extras.telephone
        });
      }
 
      //Edit Password
      if(editable.password!="" && editable.password!=null  ){
        //Update Password in UserAuthentication Table
        firebase.auth().currentUser.updatePassword(editable.password).then(function(ok) {}, function(error) {});
        sharedUtils.showAlert("Account","Password Updated");
      }
 
      //Edit Email
      if(editable.email!="" && editable.email!=null  && editable.email!=$scope.user_info.email){
 
        //Update Email/Username in UserAuthentication Table
        firebase.auth().currentUser.updateEmail(editable.email).then(function(ok) {
          $window.location.reload(true);
          //sharedUtils.showAlert("Account","Email Updated");
        }, function(error) {
          sharedUtils.showAlert("ERROR",error);
        });
      }
 
    };
 
    $scope.cancel=function(){
      // Simple Reload
      //$window.location.reload(true);
      $state.go('tab.more', {}, {location: "replace"});
      console.log("CANCEL");
    }
 
})

.controller('SignupCtrl', function($scope,$rootScope,sharedUtils,$ionicSideMenuDelegate,
                                   $state,fireBaseData,$ionicHistory) {
    $rootScope.extras = false; // For hiding the side bar and nav icon

    $scope.signupEmail = function (formName, cred) {

 
      if (formName.$valid) {  // vérifie si les données du form sont valides
 
        sharedUtils.showLoading();
 
        //creation du user mail avec password
        firebase.auth().createUserWithEmailAndPassword(cred.email, cred.password).then(function (result) {
 
            //Add name and default dp to the Autherisation table
            result.updateProfile({
              displayName: cred.name,
              photoURL: "default_dp"
            }).then(function() {}, function(error) {});
 
      
      //Nous créons une table additionel information 
            //ajout du téléphone dans la table du user
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
