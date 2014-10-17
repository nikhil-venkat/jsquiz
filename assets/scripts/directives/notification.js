
/*
    notification directive
    ====================
    Used to show notification on the screen 

    Usage
    -----
    set $rootScope.flags.notification = {};
 */

angular.module('notification', [])

.directive('notification', function(){
    return {
        link: function(scope, Elem, Attrs) {
            scope.$watch('flags.notification',function(notification,oldValue){
                if(scope.size(notification)>0){
                    if(notification.type=='error'){
                        $('body').append('<div class="notification alert alert-danger" role="alert">'+notification.message+'</div>');
                        
                    }else{
                        $('body').append('<div class="notification alert alert-success" role="alert">'+notification.message+'</div>');
                    }
                    setTimeout(function(){
                        $('.notification').fadeOut(100);
                    },1500);
                }else{
                    $('.notification').remove();
                }
            },true);
        }
    };
});