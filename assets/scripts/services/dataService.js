angular.module("appService", [])
    .factory('serviceEndpoints',['$http', function($http){
        return {
            Urls: {
                //Backend urls
                "login": '/login',
                "signup": 'https://api.mongolab.com/api/1/databases/quizapp/collections/users?apiKey=Ty71bCX96vKu8p9bjK2dX2OMqZa2Lk3I',
                "logout": '/logout',
                "getLoggedInUser":'/getLoggedInUser',
                "getQuestionnaireList" : 'https://api.mongolab.com/api/1/databases/quizapp/collections/questionnaire?apiKey=Ty71bCX96vKu8p9bjK2dX2OMqZa2Lk3I'
            }
        };
    }])
    .service('dataService',['$http','serviceEndpoints','$q','$rootScope', function($http,serviceEndpoints,$q,$rootScope){
        var dataService = {};

        var makeAjaxRequest = function(postObject){
            var deferred = $q.defer();
            $rootScope.flags.loading = true;
            $http({
                url : postObject.url,
                method : postObject.method,
                data : postObject.data,
                headers : {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}||postObject.headers
            }).success(function(response,code){
                if(response && (code === 200)){
                    deferred.resolve(response);
                }
            }).error(function(response,code){
                $rootScope.flags.loading = false;
                $rootScope.showNotification('There was an error processing the request. Please try again later','error');
            });
            return deferred.promise;
        };

        dataService.checkLogin = function(postData,callback){
            var ajaxObject = {
                url: serviceEndpoints.Urls.login,
                method:'POST',
                data: $.param(postData),
                callback:callback
            };
            makeAjaxRequest(ajaxObject).then(function(response){
                ajaxObject.callback(response);
                $rootScope.flags.loading = false;
            });
        };
        dataService.signUpUser = function(postData,callback){
            var ajaxObject = {
                url: serviceEndpoints.Urls.signup,
                method:'POST',
                data: JSON.stringify(postData),
                callback:callback,
                headers: {'Content-Type':'application/json' }
            };
            makeAjaxRequest(ajaxObject).then(function(response){
                ajaxObject.callback(response);
                $rootScope.flags.loading = false;
            });
        };
        dataService.getLogggedInUser = function(postData,callback){
            var ajaxObject = {
                url: serviceEndpoints.Urls.getLoggedInUser,
                method:'GET',
                callback:callback
            };
            makeAjaxRequest(ajaxObject).then(function(response){
                ajaxObject.callback(response);
                $rootScope.flags.loading = false;
            });
        };

        dataService.getQuestionnaireList = function(postData,callback){
            var ajaxObject = {
                url: serviceEndpoints.Urls.getQuestionnaireList,
                method:'GET',
                callback:callback
            };
            makeAjaxRequest(ajaxObject).then(function(response){
                ajaxObject.callback(response);
                $rootScope.flags.loading = false;
            });
        };

        dataService.logout = function(postData,callback){
            var ajaxObject = {
                url: serviceEndpoints.Urls.logout,
                method:'POST',
                callback:callback
            };
            makeAjaxRequest(ajaxObject).then(function(response){
                ajaxObject.callback(response);
                $rootScope.flags.loading = false;
                $rootScope.showNotification('You have successfully logged out','success');
            });
        };

        return dataService;
}]);

