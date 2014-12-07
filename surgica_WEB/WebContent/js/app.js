var app = angular.module('hb.smartcard', [ 'firebase', 'ngRoute', 
          'hb.smartcard.controllers', 'hb.smartcard.factories', 'hb.smartcard.filters' ]);

app.config(function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl : 'template/smartcard-viewer.html',
		controller : 'SmartCardViewer',
		reloadOnSearch : false
	})
	.when('/surgeon', {
		templateUrl : 'template/surgeon.html',
		controller : 'SurgeonManager',
		reloadOnSearch : false
	})
	.otherwise({
        redirectTo: '/'
      });
});

$('.ui.dropdown').dropdown();

$( '.manageSurgeonView' ).scroll(function() {
	$( '#manageSurgeonFooter' ).css('position','absolute');
	$( '#manageSurgeonFooter' ).css('bottom','0px');
	$( '#manageSurgeonFooter' ).css('left','0px');
});
