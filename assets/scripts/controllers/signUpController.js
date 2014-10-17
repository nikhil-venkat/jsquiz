angular.module('signUp.controller', [])
    .controller('signUpController', [
        '$scope', '$rootScope','dataService','$window',
        function($scope, $rootScope,dataService,$window) {
             //checking user session
            $rootScope.checkUserSession();
            $scope.signUp = function(){
                var postData = {
                    username: $scope.username,
                    password: $scope.password
                };
                $rootScope.user = postData.username;
                $rootScope.isUserLoggedIn = true;
                $rootScope.newSignup = true;
                $window.location.hash = '#/profile';
            };
        }
 ]);