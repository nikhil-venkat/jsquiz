describe('quiz controller', function() {
    var scope,dataService,$rootScope, $controller,$routeParams,$window;
    var userMock = {};

    beforeEach(function() {
        
        module('quiz.controller');
        module('appService');

        inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $controller = $injector.get('$controller');
            $q = $injector.get('$q');
            $location = $injector.get('$location');
            $scope = $rootScope.$new();
            $window = $injector.get('$window');

            //createSpies($rootScope);
            createSpies($scope);

            initController = function(opts) {
                $controller('quizController', angular.extend({
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
        $rootScope = jasmine.createSpyObj('rootScopeSpy', ['checkUserSession','size']);
        $rootScope.checkUserSession.andCallFake(function() {
            return (userMock);
        });
        $rootScope.flags = {
            loading : false,
            notification : {
                show: false,
                message: 'test',
                type: 'success'
            }
        };
        

    };

    it('should check rootScope to have checkUserSession', function() {
        expect($rootScope.checkUserSession).toBeDefined();
    });

    it('should check rootScope to have size helper function', function() {
        expect($rootScope.size).toBeDefined();
    });

    it('should check submitForm method to be defined', function() {
        expect($scope.submitForm).toBeDefined();
    });

    it('should check next method to be defined', function() {
        expect($scope.next).toBeDefined();
    });

    it('should check prev method to be defined', function() {
        expect($scope.prev).toBeDefined();
    });

    it('Should set loading to false on load', function() {
        expect($rootScope.flags.loading).toBe(false);
    });

    it('Should set notification to false on load', function() {
        expect($rootScope.flags.notification.show).toBe(false);
    });

    it('Should set form submitted to true on submit', function() {
        $scope.submitForm();
        expect($scope.formSubmitted).toBe(true);
    });
    it('Should set correct answers to empty object', function() {
        $scope.submitForm();
        expect($scope.correctAnswers).toEqual({});
    });

    it('Should set post user response', function() {
        $scope.userResponse = {
            1: "4"
        };
        $scope.questionnaireList = [
        {
            "questionId": 1,
            "question": "Which is not an advantage of using a closure?",
            "options": [
                {
                    "value": "Prevent pollution of global scope",
                    "id": 1
                },
                {
                    "value": "Encapsulation",
                    "id": 2
                },
                {
                    "value": "Private properties and methods",
                    "id": 3
                },
                {
                    "value": "Allow conditional use of 'strict mode'",
                    "id": 4
                }
            ],
            "corectAnswer": 4
        },
        {
            "questionId": 2,
            "question": "To create a columned list of two-line email subjects and dates for a masterdetail view, which are the most semantically correct?",
            "options": [
                {
                    "value": "<div>+<span>",
                    "id": 1
                },
                {
                    "value": "<tr>+<td>",
                    "id": 2
                },
                {
                    "value": "<ul>+<li>",
                    "id": 3
                },
                {
                    "value": "<p>+<br>",
                    "id": 4
                },
                {
                    "value": "none of these",
                    "id": 5
                },
                {
                    "value": "all of these",
                    "id": 6
                }
            ],
            "corectAnswer": 3
            }
        ];
        $scope.submitForm();
        expect($scope.userResponse).not.toEqual({});
    });
     

});