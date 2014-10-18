angular.module('quiz.controller', [])
    .controller('quizController', [
        '$scope', '$rootScope','dataService','$routeParams','$window',
        function($scope,$rootScope,dataService,$routeParams,$window) {
            //checking user session
            $scope.formSubmitted = false;
            $rootScope.checkUserSession();
            $scope.userResponse = {};
            $window.onbeforeunload = function(e) {
                return 'You wil lose all your responses. Are you sure you want to reload?';
            };
            if( $rootScope.size($scope.userResponse) === 0 ) {
                dataService.getQuestionnaireList(null,function(response){
                    if(response && response[0]){
                        $scope.questionnaireList = response[0].questionnaireList;
                        angular.forEach($scope.questionnaireList,function(question,key){
                            $scope.userResponse[question.questionId] = {};
                        });
                        $scope.currentQuestion = 1;
                    }
                });
            }

            $scope.submitForm = function(){
                $scope.formSubmitted = true;
                $scope.correctAnswers = {};
                angular.forEach($scope.userResponse,function(response,key){
                    if(response == $scope.questionnaireList[key-1].corectAnswer){
                        $scope.correctAnswers[key] = response;
                    }
                });
            };

            $scope.next = function(){
                $scope.currentQuestion ++;
            };
            $scope.prev = function(){
                $scope.currentQuestion --;
            };
        }
 ]);
