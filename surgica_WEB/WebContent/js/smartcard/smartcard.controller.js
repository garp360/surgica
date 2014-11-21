angular.module('hb.smartcard.controller.SmartCard', [])

.controller("SmartCardViewer", [ "$rootScope", "$scope", "$filter", "$firebase", "$log", "$location", "SmartCardFactory", "SurgeonFactory", function($rootScope, $scope, $filter, $firebase, $log, $location, SmartCardFactory, SurgeonFactory) {
	$scope.isloaded = false;
	$scope.defaultWidth = '0px';
	$scope.gutterWidth = '400px';
	$scope.infoWindowIsShowing = false;
	$scope.selectedSmartcard = {};
	$scope.smartcards = SmartCardFactory.findAll();
	$scope.surgeons = SurgeonFactory.findAll();
	
	$scope.pxSurgeon = $scope.surgeons[0];
	
	$scope.title = function(smartcard) {
		return smartcard.procedure;
	};
	
	$scope.fullName = function(surgeon) {
		var fullName =  surgeon.lastName + ", " + surgeon.firstName;
		var middleInitial = surgeon.middleInitial == null ? "" : surgeon.middleInitial + "."
		if(middleInitial != null && middleInitial.length > 0) {
			fullName = fullName + " " + middleInitial;
		}
		
		return fullName;
	};
	
	$scope.showInfo = function(smartcard) {
		$scope.infoWindowIsShowing = true;
		$scope.selectedSmartcard = angular.copy(smartcard);
	};
	
	$scope.$watch('pxCriteria', function(newValue, oldValue) {
        var x = $filter('smartCardFilter')($scope.smartcards, $scope.pxCriteria);
        if(x== null || x.length == 0) {
        	$scope.infoWindowIsShowing = false;
        }
	});
	
	$scope.$watch('pxCategory', function(newValue, oldValue) {
		var x = $filter('smartCardFilter')($scope.smartcards, $scope.pxCategory);
		if(x== null || x.length == 0) {
			$scope.infoWindowIsShowing = false;
		}
	});
	
	$scope.$watch('pxSurgeon', function(newValue, oldValue) {
		var x = $filter('smartCardFilter')($scope.smartcards, $scope.pxSurgeon);
		if(x== null || x.length == 0) {
			$scope.infoWindowIsShowing = false;
		}
	});
}]);