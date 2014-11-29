angular.module('hb.smartcard.factory.Surgeon', [])

.factory('SurgeonFactory', function ( $firebase , $q , $log, $timeout )
{
	var factory = {};
	var ref = new Firebase("https://surgica.firebaseio.com/personnel/staff/");
	
	factory.load = function load() 
	{
		var targetRef = ref.child('surgeons');
		var sync = $firebase(targetRef);
		var list = sync.$asArray();

		return list.$loaded();
		
	};
	
	factory.findAll = function findAll() 
	{
		var targetRef = ref.child('surgeons');
		var sync = $firebase(targetRef);
		var list = sync.$asArray();

		return list;
		
	};
	
	factory.create = function create(surgeon) {
		$log.info("Creating 'Surgeon'");
	};
	

	factory.update = function update(surgeon) {
		$log.info("Updating 'Surgeons' (id=[" + surgeon.id + "])");

		ref.child('surgeons').child(surgeon.id).update({
			facilityId : surgeon.facility.id,
			facility : angular.toJson(angular.copy(surgeon.facility)),
			firstName : surgeon.firstName,
			lastName : surgeon.lastName,
			middleInitial : surgeon.middleInitial,
			modified : moment().toJSON(),
			modifiedBy : "APP",
			specialtyId : surgeon.specialty.id,
			specialty : angular.toJson(angular.copy(surgeon.specialty))
		});
	};
		
// if (shgaEvent && authData) {
//			var objShgaEvent = angular.fromJson(shgaEvent);
//			var eventDate = objShgaEvent.dt;
//			var timestamp = _convertToTimestamp(eventDate);
//			var eventId = SURGEON_ID_PREFIX + ":" + timestamp;
//			var event = {
//			    eventId : eventId,
//			    uid : authData.uid,
//			    timestamp : timestamp,
//			    course : objShgaEvent.course,
//			    teeTimes : objShgaEvent.teeTimes,
//			    golfers : [],
//			    group : objShgaEvent.group
//			};
//			rootRef.child('events').child(eventId).set(angular.fromJson(event));
//		}

	
	return factory;
});