
/*
	loading directive
	====================
	Used to add a loading icon on the screen while waiting for ajax operations 
	to finish.

	Usage
	-----
	set $rootScope.loading = true;
 */

angular.module('loading', [])

.directive('loading', function(){
	return {
		link: function(scope, Elem, Attrs) {
			scope.$watch('flags.loading',function(newValue,oldValue){
				if(newValue){
					$('body').append('<div class="overlay"></div>');
				}else{
					$('.overlay').remove();
				}
			},true);
		}
	};
});