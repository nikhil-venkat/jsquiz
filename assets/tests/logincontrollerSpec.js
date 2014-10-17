describe('login controller', function() {
    var scope,dataService,$rootScope, $controller,$routeParams,$window;
    var userMock = {};

    beforeEach(function() {
        
        module('login.controller');
        module('appService');

        inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $controller = $injector.get('$controller');
            $q = $injector.get('$q');
            $scope = $rootScope.$new();
            $window = $injector.get('$window');

            //createSpies($rootScope);
            createSpies($scope);

            initController = function(opts) {
                $controller('loginController', angular.extend({
                    $scope: $scope,
                    $rootScope: $rootScope,
                    dataService:dataService,
                    $routeParams:$routeParams,
                    $window:$window,
                    $location: $location
                }, (opts || {})));
            };
            initController();
        });
    });

    var createSpies = function($scope) {

        $rootScope = jasmine.createSpyObj('rootScopeSpy', ['checkUserSession','size','showNotification']);
        $rootScope.checkUserSession.andCallFake(function() {
            return (userMock);
        });
        $rootScope.flags = {
            loading : false,
            notification : {
                show: false,
                message: 'test',
                type: 'error'
            }
        };

        dataService = jasmine.createSpyObj('dataService', ['checkLogin']);
        dataService.checkLogin.andCallFake(function() {
            $rootScope.user = 'nikhil';
        });
    };

    it('should check rootScope to have checkUserSession', function() {
        expect($rootScope.checkUserSession).toBeDefined();
    });

    it('should check rootScope to have size helper function', function() {
        expect($rootScope.size).toBeDefined();
    });

    it('should set $scope.username to equal "" on load', function() {
        expect($scope.username).toEqual('');
    });

    it('should set $scope.password to equal "" on load', function() {
        expect($scope.password).toEqual('');
    });

    it('should have $scope.login method defined', function() {
        expect($scope.login).toBeDefined();
    });

    it('should show error notification on click of login without username and password', function() {
        expect($scope.username).toEqual('');
        expect($scope.password).toEqual('');
        $scope.login();
        expect($rootScope.flags.notification.show).toEqual(false);
    });

    it('should login the user in and set rootScope.user', function() {
        $scope.username = 'nikhil';
        $scope.password = 'test';
        $scope.login();
        expect($rootScope.user).toEqual('nikhil');
    });




     

});