angular.module('hb.smartcard.factories', 
		['hb.smartcard.factory.SmartCard', 
          'hb.smartcard.factory.Specialty', 
          'hb.smartcard.factory.Procedure', 
          'hb.smartcard.factory.InventoryPool',
          'hb.smartcard.factory.InventoryType',
          'hb.smartcard.factory.Facility',
          'hb.smartcard.factory.Surgeon'
          ])


.factory('LookupFactory', function ( $firebase , $q , $log, $timeout )
		{
			var factory = {};
			var ref = new Firebase("https://surgica.firebaseio.com/lookup/");
			
			factory.US_STATES = function findAllStates() 
			{
				var comparator = function(a,b) {
					var x = a.value.toLowerCase(), y = b.value.toLowerCase();
				    return x < y ? -1 : x > y ? 1 : 0;
				};
				
				
				var targetRef = ref.child('address').child('states');
				var sync = $firebase(targetRef);
				var list = sync.$asArray();
				list.sort(comparator);

				return list.$loaded();
			};

			factory.LEGAL_COUNTRIES = function findLegalCountries() 
			{
//				var legal = [ {
//					name : "Canada",
//					value : "CA"
//				}, {
//					name : "United Kingdom",
//					value : "GB"
//				}, {
//					name : "United States",
//					value : "US"
//				} ];
//				
				var comparator = function(a,b) {
					var x = a.name.toLowerCase(), y = b.name.toLowerCase();
					return x < y ? -1 : x > y ? 1 : 0;
				};
				
				var targetRef = ref.child('address').child('countries');
				var sync = $firebase(targetRef);
				var list = sync.$asArray();
				list.sort(comparator);

				return list.$loaded();
			};

			return factory;
		});