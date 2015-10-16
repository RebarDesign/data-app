(function() {
'use strict';

	angular
		.module('app')
		.controller('PublishedController', PublishedController);

	PublishedController.$inject = ['dataFactory', 'socketsFactory'];
	function PublishedController(dataFactory, socketsFactory) {
		var vm = this;
		
		vm.publishedData = [];
		
		vm.deletePub 	= deletePub;

		activate();
		
		// sockets
		
		socketsFactory.on('delete:pub:out', function (data) {
			console.log("Emit Delete Element: ", data.id);
			vm.publishedData.splice(data.id, 1);
		});

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
			socketsFactory.emit('delete:pub', { id: index });
		 }
	}
})();