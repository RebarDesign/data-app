(function() {
'use strict';

	angular
		.module('app')
		.controller('PublishedController', PublishedController);

	PublishedController.$inject = ['$scope'];
	function PublishedController($scope) {
		var vm = this;
		

		activate();

		////////////////

		function activate() { }
	}
})();