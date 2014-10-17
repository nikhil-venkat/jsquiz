angular.module('quiz', [
    'ngRoute',
    'ngSanitize',
    'main.controller',
    'login.controller',
    'menu.controller',
    'signUp.controller',
    'profile.controller',
    'quiz.controller',
    'loading',
    'notification',
    'appService'
    ]).
config(['$routeProvider', function($routeProvider) {
    
    //route templates
    var quizTemplate = {
        templateUrl: 'views/quiz.html',
    },
    loginTemplate = {
        templateUrl: 'views/login.html',
    };
    signUpTemplate = {
        templateUrl: 'views/signUp.html',
    };
    profileTemplate = {
        templateUrl: 'views/profile.html',
    };
    mainTemplate = {
        templateUrl: 'views/main.html',
    };

    //setting up routes
    $routeProvider
        .when('/',mainTemplate)
        .when('/quiz',quizTemplate)
        .when('/login',loginTemplate)
        .when('/sign-up',signUpTemplate)
        .when('/profile',profileTemplate)
        .otherwise({redirectTo: '/'});
}]).run(['$rootScope', '$timeout', '$routeParams','$window','dataService', function($rootScope, $timeout, $routeParams,$window,dataService){
    
    $rootScope.flags = {
        loading : false
    };

    $rootScope.checkUserSession = function(){
        if(!$rootScope.newSignup){
            dataService.getLogggedInUser(null,function(response){
            if(response && !response.loggedInUser){
                $rootScope.isUserLoggedIn = false;
                $rootScope.user = '';
                if(window.location.hash!='#/sign-up'){
                    window.location.hash = '#/login';
                }
            }else{
                $rootScope.user = response.loggedInUser;
                $rootScope.isUserLoggedIn = true;
            }
            });
        }
    };
    

    //Helper function to determine size of an object
    $rootScope.size = function(obj){
        var size, key;
        if(obj === null || typeof obj === 'undefined'){
            // Do Nothing
        }else if(angular.isObject(obj)){
            size = 0;
            for(key in obj){
                if(obj.hasOwnProperty(key)){
                    size++;
                }
            }
        }else if(angular.isArray(obj) || angular.isString(obj)){
            size = obj.length;
        }else if(typeof obj === 'number' || angular.isNumber(obj)){
            size = obj.toString().length;
        }
        return size;
    };

    $rootScope.showNotification = function(msg,type){
        $rootScope.flags.notification = {};
        $timeout(function(){
                $rootScope.flags.notification = {
                show: true,
                message: msg,
                type: type
            };
        },100);
    };
    
    $rootScope.hideNotification = function(msg,type){
        $rootScope.flags.notification = {
            show: false,
            message: msg,
            type: type
        };
    };

    $rootScope.checkUserSession();



}]);