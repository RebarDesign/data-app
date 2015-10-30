(function() {
'use strict';

	angular
		.module('app')
		.factory('socketsFactory', socketsFactory);

	socketsFactory.$inject = ['$rootScope', '$window'];
	function socketsFactory($rootScope, $window) {
		// assign to window object
		var io = $window.io;
		// connect to port 3000 when Factory is called
		var socket = io.connect('http://localhost:3003');
		// if connection from lan
		// var socket = io.connect('http://192.168.1.2:3000');
		
		var factory = {
			on:on,
			emit:emit
		};
		
		return factory;

		////////////////
		function on(eventName, callback) {
			socket.on(eventName, function () {  
				var args = arguments;
				$rootScope.$apply(function () {
					callback.apply(socket, args);
				});
			});
		}
		
		function emit(eventName, data , callback) {
			socket.emit(eventName, data, function () {
				var args = arguments;
				$rootScope.$apply(function () {
					if (callback) {
						callback.apply(socket, args);
					}
				});
			})
		};
	}
})();