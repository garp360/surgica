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

	factory.findById = function findById(surgeonId) 
	{
		return __findById(surgeonId);
	};
	
	factory.create = function create(surgeon) {
		$log.info("Creating 'Surgeon'");
		return this.load;
	};
	
	factory.update = function update(surgeon) {
		var deferred = $q.defer();
		var facility = FacilityFactory.findById(surgeon.facilityId);
		var specialty = SpecialtyFactory.findById(surgeon.specialtyId);
		var surgeonId = surgeon.id;

		$log.info("Updating 'Surgeons' (id=[" + surgeonId + "])");

		ref.child('surgeons').child(surgeonId).update({
			facilityId : facility.id,
			facility : facility,
			firstName : surgeon.firstName,
			lastName : surgeon.lastName,
			middleInitial : surgeon.middleInitial,
			modified : moment().toJSON(),
			modifiedBy : "APP",
			specialtyId : specialty.id,
			specialty : specialty,
			dob : moment(surgeon.dob).toJSON(),
			ssNumber : surgeon.ssNumber
		}, function(error) {
			  if (error) {
				  deferred.reject(error);
			  } else {
				  __findById(surgeonId).then(function(surgeon) {
					  deferred.resolve(surgeon);					  
				  }, function(error) {
					  deferred.reject(error);					  
				  });
			  };
		});
		
		return deferred.promise;
	};

	function __findById(surgeonId) 
	{
		var targetRef = ref.child('surgeons').child(surgeonId);
		var sync = $firebase(targetRef);
		var obj = sync.$asObject();
		
		return obj.$loaded();
	};
	
	return factory;
});