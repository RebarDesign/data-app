(function() {
'use strict';

	angular
		.module('app')
		.controller('MainController', MainController);

	MainController.$inject = ['socketsFactory', '$location'];
	function MainController(socketsFactory, $location) {
		var vm = this;
		
		vm.name = '..waiting';
		
		// Make current page active in nav
		vm.isActive = function (viewLocation) {
			var active = (viewLocation === $location.path());
			return active;
		};
		
		
		socketsFactory.on('send:name', function(data){
			vm.name = data.name;
		});

		activate();

		////////////////

		function activate() { }
	}
})();