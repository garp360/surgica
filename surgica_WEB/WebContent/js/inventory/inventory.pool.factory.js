angular.module('hb.smartcard.factory.InventoryPool', [])

.factory('InventoryPoolFactory', function($firebase, $q, $log, $timeout) {
	var factory = {};
	var invPoolComparator = function(a, b) {
		var x = a.name.toLowerCase(), y = b.name.toLowerCase();

		return x < y ? -1 : x > y ? 1 : 0;
	};
	var ref = new Firebase("https://surgica.firebaseio.com/inventory/pools");

	var inventoryPools = [ {
		name : "Armitage1",
		id : "ip1",
		ordinal : -1,
		code : "XXX",
		facility : {
			id : "fc1",
			name : "Armitage"
		},
		description : "description"
	}, {
		name : "Armitage2",
		id : "ip2",
		ordinal : -1,
		code : "XXX",
		facility : {
			id : "fc1",
			name : "Armitage"
		},
		description : "description"
	} ];

	factory.findAll = function findAll() {
		var tRef = ref.child('pools');
		var sync = $firebase(proceduresRef);
		var pxArray = sync.$asArray();
		pxArray.sort(invPoolComparator);

		return pxArray;
	};

	factory.initialize = function initialize() {
		inventoryPools.sort(invPoolComparator);
		var sorted = inventoryPools.slice(0);

		for (var i = 0; i < sorted.length; i++) {
			var id = "ip:" + i;
			var item = {
				id : id,
				name : sorted[i].name,
				description : "description",
				code : "XXX",
				abbr : "XXX",
				modified : moment().toJSON(),
				modifiedBy : "APP",
				facility : {
					id : sorted[i].facility.id,
					name : sorted[i].facility.name
				}
			};
			ref.child(id).set(angular.fromJson(item));
		}
	};

	return factory;
});