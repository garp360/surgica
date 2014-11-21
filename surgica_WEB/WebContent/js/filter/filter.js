angular.module('hb.smartcard.filters', [])


.filter('currentEvents', function() {

	return function(shgaEvents) {
		var filteredList = [];
		var now = new Date();

		now = new Date(now.setHours(0, 0, 0, 0));

		var timestamp = now.getTime();

		for (var i = 0; i < shgaEvents.length; i++) {
			if (shgaEvents[i].timestamp >= timestamp) {
				filteredList.push(shgaEvents[i]);
			}
		}

		return filteredList;
	};

})

.filter('smartCardFilter', function($log) {

	return function(smartcards, procedure, category, surgeon, direction) {
		var filteredList = [];
		var asc = function(a,b) {
			var x = a.procedure.toLowerCase(), y = b.procedure.toLowerCase();
		    
		    return x < y ? -1 : x > y ? 1 : 0;
		};
		var desc = function(a,b) {
			return x < y ? 1 : x > y ? -1 : 0;
		};
		
		for (var i = 0; i < smartcards.length; i++) {
			
			var match = false;
			
			if(smartcards[i].procedure != null && procedure != null) {
				match = match || _isMatch(smartcards[i].procedure, procedure.name);
			}
			
			if(smartcards[i].category != null && category != null) {
				match = match || _isMatch(smartcards[i].category, category.name);
			}
			
			if(smartcards[i].surgeon!= null && surgeon != null) {
				match = match || _isMatch(smartcards[i].surgeon.pid, surgeon.pid);
			}
			
			if (match) {
				filteredList.push(smartcards[i]);
			}
		}
		
		var comparator = asc;
		if(direction != null && direction.toUpperCase() == "DESC") {
			comparator = desc;
		}

		var sort=filteredList.sort(comparator);
		return sort;
	};
	
	function _isMatch(text, value) {
		var isMatch = false;
		if(value != null && value.trim().length > 0 && text.indexOf(value) > -1) {
			isMatch = true;
		}
		return isMatch;
	}

});