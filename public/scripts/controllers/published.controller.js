(function() {
'use strict';

	angular
		.module('app')
		.controller('PublishedController', PublishedController);

	PublishedController.$inject = ['dataFactory'];
	function PublishedController(dataFactory) {
		var vm = this;
		
		vm.publishedData = [];
		
		vm.deletePub 	= deletePub;

		activate();

		////////////////

		function activate() {
			
			return getPublishedData().then(function (data){
				vm.publishedData = data.data;
				//* ghetto-debugging *//
				console.info('OK::getPublishedData(): ',vm.publishedData);
			});
			
		 }
		 
		 function getPublishedData() {
			 return dataFactory.getPublished();
		 }
		 
		 function deletePub(index) {
			//  delete item from array
		 }
	}
})();