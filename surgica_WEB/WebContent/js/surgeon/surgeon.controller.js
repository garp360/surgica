angular.module('hb.smartcard.controller.Surgeon', [])

.controller("SurgeonManager", [ "$rootScope", "$scope", "$filter", 
                                "$firebase", "$log", "$location", "SurgeonFactory", 
                                "SpecialtyFactory", "FacilityFactory", "LookupFactory",
                                function($rootScope, $scope, $filter, 
                                		$firebase, $log, $location, SurgeonFactory, 
                                		SpecialtyFactory, FacilityFactory, LookupFactory) {
	$scope.isloaded = false;
	$scope.surgeons = [];
	$scope.specialties = [];
	$scope.facilities = [];
	$scope.usStates = [];
	$scope.countries = [];
	$scope.surgeon = {};
	$scope.form = {};
	$scope.addresses = [];
	$scope.activeAddress = {}
	
	$scope.taddress1 = "700 N Edenbridge Way";
	$scope.taddress2 = "";
	$scope.taddress3 = "";
	$scope.tcountry = "United States";
	$scope.tcity = "Saint Augustine";
	$scope.tstate = "Florida";
	$scope.tzip = "32092";
	$scope.tprimary = false;
	
	
	$scope.addAddress = function() {
		var count = $scope.addresses.length + 1;
		
		$scope.addresses.push({
			  ordinal : count,
			  primary : false,
	          city : $scope.form.city,
	          country : $scope.form.country,
	          state : $scope.form.state,
	          street1 : $scope.form.street1,
	          street2 : $scope.form.street2,
	          street3 : $scope.form.street3,
	          zip : $scope.form.zip
	        });
	};
	
	SurgeonFactory.load().then(function(surgeonsList){
		SpecialtyFactory.load().then(function(specialtiesList){
			FacilityFactory.load().then(function(facilitiesList){
				LookupFactory.US_STATES().then(function(usStates){
					LookupFactory.LEGAL_COUNTRIES().then(function(countries){
						$scope.isloaded = true;
						$scope.surgeons = surgeonsList;
						$scope.specialties = specialtiesList;
						$scope.facilities = facilitiesList;
						$scope.usStates = usStates;
						$scope.countries = countries;
						$scope.form.country = $scope.countries[0];
						$scope.form.state = $scope.usStates[0];
						$scope.form.specialty = $scope.specialties[0];
						$scope.form.facility = $scope.facilities[0];
					});
				});
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
			$scope.form.country = null;
			$scope.form.state = null;
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
		$scope.addresses = [];
		$scope.activeAddress = {}
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