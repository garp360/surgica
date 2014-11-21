angular.module('hb.smartcard')

.directive("infoWindow",function(){
  return{
    link:function(scope,element) {
    	scope.$watch('infoWindowIsShowing', function(){
    		if(scope.infoWindowIsShowing == true) {
        		element[0].style.display = "block";
        	} else {
        		element[0].style.display = "none";
        	}
        });
    	
    	
    }        
  };    
});