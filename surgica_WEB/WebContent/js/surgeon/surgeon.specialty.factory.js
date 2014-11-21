angular.module('hb.smartcard.factory.SurgeonSpecialty', [])

.factory('SurgeonSpecialtyFactory', function ( $firebase , $q , $log, $timeout )
{
	var factory = {};
	
	var specialties = [
	     { name: "Cardio-Thoracic Surgery" },
	     { name: "General Surgery" },
	     { name: "Neurosurgery" },
	     { name: "Orthopaedic Surgery" },
	     { name: "Otolaryngology Surgery" },
	     { name: "Oral And Maxillofacial Surgery" },
	     { name: "Paediatric Surgery" },
	     { name: "Plastic Surgery" },
	     { name: "Urology" },
	     { name: "Vascular Surgery" } ];
	
	factory.findAll = function findAll() 
	{
		return specialties;
	};
	
	return factory;
});