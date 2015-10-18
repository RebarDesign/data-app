(function() {
	'use strict';

	angular
		.module('app')
		.directive('rdNewPublished', rdNewPublished);

	rdNewPublished.$inject = [];
	function rdNewPublished() {
		// Usage:
		//
		// Creates:
		//
		var directive = {
			templateUrl: '/scripts/directives/new.directive.html',
			link: link,
			restrict: 'EA',
			// inherit parent scope
			scope: true
		};
		return directive;
		
		function link(scope, element, attrs) {
		}
	}
})();