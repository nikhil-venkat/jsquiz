
/*
	scrollarama directive
	====================
	Used for fading in contents of the div when you scroll into that div.

	Usage
	-----
	<div scrollarama>
 */

angular.module('scrollarama', [])

.directive('scrollarama', function(){
	return {
		link: function(scope, elem, attrs) {
			var section = ($(elem).attr('id'));
			var controller = $.superscrollorama();
	        controller.addTween(
	            '#'+section, 
	            TweenMax.from( $('#'+section),.5,{css:{opacity: 0}}),
	              0,
	              0,
	              false
	            );
		}
	};
})