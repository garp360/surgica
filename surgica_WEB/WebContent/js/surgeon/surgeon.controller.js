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
	$scope.addresses = [];
	
	$scope.addAddress = function() {
		var count = $scope.form.address.length+1;
		
		$scope.addresses.push({
			  ordinal : count,
	          city : "",
	          country : "",
	          state : "",
	          street1 : "",
	          street2 : "",
	          street3 : "",
	          zip : ""
	        });
	};
	
	$scope.showAddAddress = function(address) {
		return address.ordinal === $scope.addresses[$scope.addresses.length-1].ordinal;
	};
		
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
		SurgeonFactory.findById($scope.surgeons[33].id).then(function(surgeon) {
			init(surgeon);
 		}, function(error) {
			$log.debug("Error loading Surgeon");
		});
	};

	$scope.reset = function() {
		if($scope.surgeon.id == null) {
			$scope.form = {};
			$scope.form.specialty = null;
			$scope.form.facility = null;
			$scope.addresses = [];
		} else {
			init($scope.surgeon);
		}
	};
	
	$scope.save = function() {
		$scope.isloaded = false;
		if($scope.surgeon.id == null) {
			SurgeonFactory.create(transform()).then(function(surgeonsList) {
				$scope.isloaded = true;
				$scope.surgeons = surgeonsList;
			});
		} else {
			SurgeonFactory.update(transform()).then(function(surgeon) {
				$scope.isloaded = true;
				$scope.surgeon = surgeon;
				$scope.form = $scope.surgeon;
				
				$scope.form.specialty = $scope.specialties[findIndex($scope.specialties, surgeon.specialtyId)];
				$scope.form.facility = $scope.facilities[findIndex($scope.facilities, surgeon.facilityId)];
			});
		}
	};

	function init(surgeon) {
		$scope.surgeon = surgeon;
		$scope.form = angular.copy($scope.surgeon);
		$scope.form.specialty = $scope.specialties[findIndex($scope.specialties, surgeon.specialtyId)];
		$scope.form.facility = $scope.facilities[findIndex($scope.facilities, surgeon.facilityId)];
		$scope.addresses = surgeon.address.alt == null ? [] : surgeon.address.alt;
		
		$scope.addresses.push(getAddress($scope.addresses.length));
	}
	
	function getAddress(ordinal) {
		return {
		  ordinal : ordinal,
          city : "",
          country : "",
          state : "",
          street1 : "",
          street2 : "",
          street3 : "",
          zip : ""
        };
	}
	
	function transform() {
		var surgeon = {
			address : $scope.surgeon.address,
			contactInfo : $scope.surgeon.contactInfo,
			dob : $scope.form.dob,
			facilityId : $scope.form.facility.id,
			firstName : $scope.form.firstName,
			id : $scope.surgeon.id,
			lastName : $scope.form.lastName,
			middleInitial : $scope.form.middleInitial,
			modified : moment().toJSON(),
			modifiedBy : "APP",
			pid : $scope.surgeon.pid,
			specialtyId : $scope.form.specialty.id,
			ssNumber : $scope.form.ssNumber,
			title : $scope.surgeon.title,
			username : $scope.surgeon.username
		};
		
		return surgeon;
	};
	
	function findIndex(arr, id) {
		var index = null;
		for(var i=0; i<arr.length; i++) {
			if(arr[i].id === id) {
				index = i;
				break;
			};
		}
		return index;
	};
	
	function formatDate(timestamp) {
		var mDate = moment(timestamp).format("MM/dd/YYYY");
		return mDate;
	};
	
}]);