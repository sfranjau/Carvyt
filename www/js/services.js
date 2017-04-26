angular.module('starter.services', [])



.service('LoginService', function($q) {
    return {
        loginUser: function(name, pw) {
            var deferred = $q.defer();
            var promise = deferred.promise;
 
            if (name == 'stef' && pw == 'stef') {
                deferred.resolve('Welcome ' + name + '!');
            } else {
                deferred.reject('Wrong credentials.');
            }
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
})





.factory('fireBaseData', function($firebase) {
  var ref = new Firebase("https://carvytal-83de6.firebaseio.com/"),
    refCart = new Firebase("https://carvytal-83de6.firebaseio.com/cart"),
    refUser = new Firebase("https://carvytal-83de6.firebaseio.com/users"),
    refCategory = new Firebase("https://carvytal-83de6.firebaseio.com/category"),
    refOrder = new Firebase("https://carvytal-83de6.firebaseio.com/orders"),
    refFeatured = new Firebase("https://carvytal-83de6.firebaseio.com/featured"),
    refMenu = new Firebase("https://carvytal-83de6.firebaseio.com/menu");
  return {
    ref: function() {
      return ref;
    },
    refCart: function() {
      return refCart;
    },
    refUser: function() {
      return refUser;
    },
    refCategory: function() {
      return refCategory;
    },
    refOrder: function() {
      return refOrder;
    },
    refFeatured: function() {
      return refFeatured;
    },
    refMenu: function() {
      return refMenu;
    }
  }
})
 
 
.factory('sharedUtils',['$ionicLoading','$ionicPopup', function($ionicLoading,$ionicPopup){
 
 
    var functionObj={};
 
    functionObj.showLoading=function(){
      $ionicLoading.show({
        content: '<i class=" ion-loading-c"></i> ', // The text to display in the loading indicator
        animation: 'fade-in', // The animation to use
        showBackdrop: true, // Will a dark overlay or backdrop cover the entire view
        maxWidth: 200, // The maximum width of the loading indicator. Text will be wrapped if longer than maxWidth
        showDelay: 0 // The delay in showing the indicator
      });
    };
    functionObj.hideLoading=function(){
      $ionicLoading.hide();
    };
 
 
    functionObj.showAlert = function(title,message) {
      var alertPopup = $ionicPopup.alert({
        title: title,
        template: message
      });
    };
 
    return functionObj;
 
}])

;
