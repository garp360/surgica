var app = angular.module('hb.smartcard', [ 'firebase', 'ngRoute', 'hb.smartcard.controllers', 'hb.smartcard.factories', 'hb.smartcard.filters' ]);

app.config(function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl : 'template/smartcard-viewer.html',
		controller : 'SmartCardViewer',
		reloadOnSearch : false
	});
});

$('.ui.dropdown').dropdown();
