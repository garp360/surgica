angular.module('hb.smartcard.controller.SmartCard', [])

.controller("SmartCardViewer", [ "$rootScope", "$scope", "$filter", "$firebase", "$log", "$location", 
                                 "SmartCardFactory", "SurgeonFactory", "ProcedureFactory",
                                 "InventoryPoolFactory", "InventoryTypeFactory", "FacilityFactory",
                                 "SpecialtyFactory",
                                 function($rootScope, $scope, $filter, $firebase, $log, $location, 
                                		 SmartCardFactory, SurgeonFactory, ProcedureFactory,
                                		 InventoryPoolFactory, InventoryTypeFactory, FacilityFactory,
                                		 SpecialtyFactory) {
//	var init = false;
	$scope.isloaded = false;
	$scope.defaultWidth = '0px';
	$scope.gutterWidth = '300px';
	$scope.infoWindowIsShowing = false;
	$scope.selectedSmartcard = {};
	$scope.smartcards = SmartCardFactory.findAll();
	$scope.surgeons = SurgeonFactory.findAll();
	$scope.procedures = ProcedureFactory.findAll();
	$scope.procedureCategories = ProcedureFactory.findAllCategories();
	
//	
//	if(!init) {
//		SurgeonSpecialtyFactory.initialize();
//	}
	
	$scope.title = function(smartcard) {
		return smartcard.procedure;
	};
	
	$scope.fullName = function(surgeon) {
		var surgeonName = "Generic";
		
		if(surgeon != null) {
			surgeonName =  surgeon.lastName + ", " + surgeon.firstName;
			var middleInitial = surgeon.middleInitial == null ? "" : surgeon.middleInitial + ".";
			if(middleInitial != null && middleInitial.length > 0) {
				surgeonName = surgeonName + " " + middleInitial;
			}
		}
		return surgeonName;
	};
	
	$scope.clearSearch = function() {
		$scope.pxCriteria = null;
		$scope.pxCategory = null;
		$scope.pxSurgeon = null;
		$scope.infoWindowIsShowing = false;
	};
	
	$scope.showInfo = function(smartcard) {
		$scope.infoWindowIsShowing = true;
		$scope.selectedSmartcard = angular.copy(smartcard);
	};
	
	
	$scope.manageSurgeon = function() {
		$location.path('/surgeon');
	}
	
	$scope.$watchGroup(['pxCriteria', 'pxCategory', 'pxSurgeon'], function(newValues, oldValues, scope) {
		var x = $filter('smartCardFilter')($scope.smartcards, $scope.pxCriteria, $scope.pxCategory, $scope.pxSurgeon, null);
		if(x== null || x.length == 0) {
        	$scope.infoWindowIsShowing = false;
        }
	});
	
}]);