(function() {
	'use strict';

	angular
		.module('app')
		.directive('rdPublished', rdPublished);

	rdPublished.$inject = [];
	function rdPublished() {
		// Usage:
		//
		// Creates:
		//
		var directive = {
			templateUrl: '/scripts/directives/published.directive.html',
			link: link,
			restrict: 'EA',
			// inherit parent scope
			scope: {
			itemData: '='
			}
		};
		return directive;
		
		function link(scope, element, attrs) {
			scope.editable = false;
			scope.item = scope.itemData;
		}
	}
})();