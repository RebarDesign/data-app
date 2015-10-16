(function() {
'use strict';

	angular
		.module('app')
		.controller('ReachController', ReachController);

	ReachController.$inject = ['dataFactory', '$log'];
	function ReachController(dataFactory, $log) {
		var vm = this;
		
		// reach array
		vm.reachData = [];
		
		// actions
		
		activate();

		////////////////

		function activate() { 
		
			return getReachData().then(function (data) {
				vm.reachData = data.data.response;
				$log.info('OK:: getReachData(): ', vm.reachData);
			})
		
		}
		
		function getReachData(){
			return dataFactory.getReach();
		}
	}
})();