angular.module('hb.smartcard.controller.Surgeon', [])

.controller("SurgeonManager", [ "$rootScope", "$scope", "$filter", 
                                "$firebase", "$log", "$location", "SurgeonFactory", 
                                "SpecialtyFactory", "FacilityFactory",
                                function($rootScope, $scope, $filter, 
                                		$firebase, $log, $location, SurgeonFactory, 
                                		SpecialtyFactory, FacilityFactory) {
	$scope.isloaded = false;
	$scope.surgeons = [];
	$scope.specialties = [];
	$scope.facilities = [];
	$scope.surgeon = {};
	$scope.form = {};
	
	
	SurgeonFactory.load().then(function(surgeonsList){
		SpecialtyFactory.load().then(function(specialtiesList){
			FacilityFactory.load().then(function(facilitiesList){
				$scope.isloaded = true;
				$scope.surgeons = surgeonsList;
				$scope.specialties = specialtiesList;
				$scope.facilities = facilitiesList;
				$scope.form.specialty = $scope.specialties[0];
				$scope.form.facility = $scope.facilities[0];
			});
		});
	});
	
	$scope.find = function() {
		$scope.surgeon = $scope.surgeons[33];
		$scope.form = $scope.surgeon;
	}

	$scope.reset = function() {
		if($scope.surgeon.id == null) {
			$scope.form = {};
		} else {
			$scope.form = angular.copy($scope.surgeon);
		}
	}
	
	$scope.save = function() {
		var surgeon = transform();
		if($scope.surgeon.id == null) {
			SurgeonFactory.create(transform());
		} else {
			SurgeonFactory.update(transform());
		}
	}
	

	function transform() {
		var surgeon = {
			address : $scope.surgeon.address,
			contactInfo : $scope.surgeon.contactInfo,
			dob : $scope.surgeon.dob,
			facilityId : $scope.form.facility.id,
			facility : $scope.form.facility,
			firstName : $scope.form.firstName,
			id : $scope.surgeon.id,
			lastName : $scope.form.lastName,
			middleInitial : $scope.form.middleInitial,
			modified : moment().toJSON(),
			modifiedBy : "APP",
			pid : $scope.surgeon.pid,
			specialtyId : $scope.form.specialty.id,
			specialty : $scope.form.specialty,
			ssNumber : $scope.surgeon.ssNumber,
			title : $scope.surgeon.title,
			username : $scope.surgeon.username
		};
		
		return surgeon;
	}
	
}]);