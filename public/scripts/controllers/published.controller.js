(function() {
'use strict';

	angular
		.module('app')
		.controller('PublishedController', PublishedController);

	PublishedController.$inject = ['dataFactory', 'socketFactory'];
	function PublishedController(dataFactory, socketFactory) {
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
			vm.publishedData.splice(index,1);
			socketFactory.emit('delete:pub', { id: index });
		 }
	}
})();