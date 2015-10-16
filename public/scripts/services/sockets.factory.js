(function() {
'use strict';

	angular
		.module('app')
		.factory('socketsFactory', sockets);

	socketsFactory.$inject = ['$log'];
	function socketsFactory($log) {
		var service = {
			on:on,
			emit:emit
		};
		
		return service;

		////////////////
		function on() { }
		
		function emit() { }
	}
})();