(function() {
'use strict';

	angular
		.module('app')
		.factory('dataFactory', dataFactory);

	dataFactory.$inject = ['dependency1'];
	function dataFactory(dependency1) {
		var factory = {
			getPublished:getPublished,
			getReached:getReached
		};
		
		return factory;

		////////////////
		function getPublished() { }
		}
	
		function getReached() { }
		}
})();