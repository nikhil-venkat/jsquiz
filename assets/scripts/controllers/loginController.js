angular.module('login.controller', [])
    .controller('loginController', [
        '$scope', '$rootScope','dataService',
        function($scope, $rootScope,dataService) {
            
            //checking user session
            $rootScope.checkUserSession();
            
            $scope.username = '';
            $scope.password = '';
            
            $scope.login = function(){
                if(!$scope.username || !$scope.password){
                    $rootScope.showNotification('Please enter valid username and password','error');
                    return false;
                }
                var postData = {
                    username: $scope.username,
                    password: $scope.password
                };
                dataService.checkLogin(postData,function(response){
                    if(response && response.page){
                        window.location.hash = response.page;
                    }
                });
            };
        }
 ]);