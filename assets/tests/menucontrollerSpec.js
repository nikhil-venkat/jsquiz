describe('menu controller', function() {
    var scope,dataService,$rootScope, $controller,$routeParams,$window;
    var userMock = {};

    beforeEach(function() {
        
        module('menu.controller');
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
                $controller('menuController', angular.extend({
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
        dataService = jasmine.createSpyObj('dataService', ['logout']);
        dataService.logout.andCallFake(function() {
            $rootScope.user = '';
        });
    };

    it('should check rootScope to have checkUserSession', function() {
        expect($rootScope.checkUserSession).toBeDefined();
    });

    it('should check rootScope to have size helper function', function() {
        expect($rootScope.size).toBeDefined();
    });

    it('should have $scope.logout method defined', function() {
        expect($scope.logout).toBeDefined();
    });

    it('should logout user ', function() {
        $scope.logout();
        expect($rootScope.user).toEqual('');
    });

});