angular.module('hb.smartcard.controller.Procedure', [])

.controller("ProcedureManager", [ "$rootScope", "$scope", "$filter", "$firebase", "$log", "$location", "ProcedureFactory", function($rootScope, $scope, $filter, $firebase, $log, $location, ProcedureFactory) {
	$scope.isloaded = false;
	
}]);