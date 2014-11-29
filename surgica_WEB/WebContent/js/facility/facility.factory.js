angular.module('hb.smartcard.factory.Facility', [])

.factory('FacilityFactory', function($firebase, $q, $log, $timeout) {
	var factory = {};
	var ref = new Firebase("https://surgica.firebaseio.com/facility/");
	var comparator = function(a, b) {
		var x = a.name.toLowerCase(), y = b.name.toLowerCase();

		return x < y ? -1 : x > y ? 1 : 0;
	};

	factory.load = function load() {
		var tRef = ref.child('facilities');
		var sync = $firebase(tRef);
		var items = sync.$asArray();

		return items.$loaded();
	};

	factory.findAll = function findAll() {
		var tRef = ref.child('facilities');
		var sync = $firebase(tRef);
		var items = sync.$asArray();
		items.sort(comparator);

		return items;
	};

	return factory;
});