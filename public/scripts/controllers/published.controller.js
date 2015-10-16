(function() {
'use strict';

	angular
		.module('app')
		.controller('PublishedController', PublishedController);

	PublishedController.$inject = ['dataFactory'];
	function PublishedController(dataFactory) {
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
			 return dataFactory.getPublished();
		 }
	}
})();