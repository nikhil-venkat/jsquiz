angular.module('profile.controller', [])
    .controller('profileController', [
        '$scope', '$rootScope','dataService',
        function($scope, $rootScope,dataService) {
            //checking user session
            $rootScope.checkUserSession();
        }
 ]);