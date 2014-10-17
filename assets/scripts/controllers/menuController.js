angular.module('menu.controller', [])
    .controller('menuController', [
        '$scope', '$rootScope','dataService',
        function($scope, $rootScope,dataService) {
            $scope.logout = function(){
                $rootScope.newSignup = false;
                dataService.logout(null,function(response){
                    if(response && !response.loggedInUser){
                        window.location.hash = '/login';
                    }
                });
            };
        }
 ]);