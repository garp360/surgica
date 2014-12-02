angular.module('hb.smartcard.factory.Surgeon', [])

.factory('SurgeonFactory', function ( $firebase , $q , $log, $timeout, FacilityFactory, SpecialtyFactory )
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
		var facility = FacilityFactory.findById(surgeon.facility.id);
		var specialty = SpecialtyFactory.findById(surgeon.specialty.id);

		$log.info("Updating 'Surgeons' (id=[" + surgeon.id + "])");

		ref.child('surgeons').child(surgeon.id).update({
			facilityId : surgeon.facility.id,
			facility : facility,
			firstName : surgeon.firstName,
			lastName : surgeon.lastName,
			middleInitial : surgeon.middleInitial,
			modified : moment().toJSON(),
			modifiedBy : "APP",
			specialtyId : surgeon.specialty.id,
			specialty : specialty
		});
	};

	return factory;
});