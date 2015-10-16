(function() {
'use strict';

	angular
		.module('app')
		.controller('PublishedController', PublishedController);

	PublishedController.$inject = ['dataService'];
	function PublishedController(dataService) {
		var vm = this;
		
		vm.PublishedData = [];

		activate();

		////////////////

		function activate() {
			
			return getPublishedData().then(function (data){
				console.log(data);
			});
			
		 }
		 
		 function getPublishedData() {
			 return dataService.getPublished();
		 }
	}
})();