angular.module('hb.smartcard.factory.Specialty', [])

.factory('SpecialtyFactory', function($firebase, $q, $log, $timeout) {
	var factory = {};
	var ref = new Firebase("https://surgica.firebaseio.com/personnel/specialties");
	var comparator = function(a, b) {
		var x = a.name.toLowerCase(), y = b.name.toLowerCase();

		return x < y ? -1 : x > y ? 1 : 0;
	};

	factory.load = function load() {
		var sync = $firebase(ref);
		var list = sync.$asArray();

		return list.$loaded();
	};

	factory.findAll = function findAll() {
		var sync = $firebase(ref);
		var list = sync.$asArray();
		list.sort(comparator);
		
		return list;
	};
	
	factory.findById = function findById(id) {
		var obj = {};
		new Firebase("https://surgica.firebaseio.com/personnel/specialties/" + id).once('value', function(snap) {
			obj = snap.val();
		});

		return obj;
	};

	return factory;
});