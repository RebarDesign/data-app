(function() {
'use strict';

	angular
		.module('app')
		.controller('MainController', MainController);

	MainController.$inject = ['socketsFactory'];
	function MainController(socketsFactory) {
		var vm = this;
		
		vm.name = '..waiting';
		
		socketsFactory.on('send:name', function(data){
			vm.name = data.name;
		});

		activate();

		////////////////

		function activate() { }
	}
})();