angular  
.module('HotspotApp')
.directive('animateOnChange', function($timeout) {
   return function(scope, element, attr) {
     scope.$watch(attr.animateOnChange, function(nv,ov) {
       if (nv>ov) {
         element.addClass('up');
         $timeout(function() {
           element.removeClass('up');
         }, 1000); // Could be enhanced to take duration as a parameter
       }
	   
       else if (nv<ov) {
         element.addClass('down');
         $timeout(function() {
           element.removeClass('down');
         }, 1000); // Could be enhanced to take duration as a parameter
       }
     });
   };
 });