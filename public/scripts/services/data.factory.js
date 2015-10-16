(function() {
'use strict';

	angular
		.module('app')
		.factory('dataFactory', dataFactory);

	dataFactory.$inject = ['dependency1'];
	function dataFactory(dependency1) {
		var factory = {
			exposedFn:exposedFn
		};
		
		return factory;

		////////////////
		function exposedFn() { }
	}
})();