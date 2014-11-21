angular.module('hb.smartcard')

.directive("rightGutter",function(){
  return{
    link:function(scope,element) {
    	scope.$watch('infoWindowIsShowing', function(){
    		if(scope.infoWindowIsShowing == true) {
        		element[0].style.paddingRight = scope.gutterWidth;
        	} else {
        		element[0].style.paddingRight = scope.defaultWidth;
        	}
        });
    	
    	
    }        
  };    
});