
/*
	detectScroll directive
	====================
	Used for detec when you have scrolled into a div

	Usage
	-----
	<div detectScroll>
 */

angular.module('detectscroll', [])

.directive('bodyscroll', function(){
	return {
		link: function(scope, elem, attrs) {
			$(window).scroll(function () {
				//console.log($(window).scrollTop());
			});
		}
	};
})

.directive('sectionscroll', function(){
	return {
		link: function(scope, elem, attrs) {
			$(window).scroll(function () {
				//console.log($(elem).scrollTop());
			});
		}
	};
})
