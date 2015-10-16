(function() {
'use strict';

	angular
		.module('app')
		.controller('PublishedController', PublishedController);

	PublishedController.$inject = ['dataFactory', 'socketsFactory', '$log'];
	function PublishedController(dataFactory, socketsFactory, $log) {
		var vm = this;
		
		// empty array to hold publised data
		vm.publishedData = [];
		
		// ui actions
		vm.deletePub 	= deletePub;

		activate();
		
		// sockets
		
		socketsFactory.on('delete:pub:out', function (data) {
			//* ghetto-debugging *//
			$log.log("Emit Delete Element: ", data.id);
			//  delete item from array
			vm.publishedData.splice(data.id, 1);
		});

		////////////////

		function activate() {
			
			return getPublishedData().then(function (data){
				vm.publishedData = data.data;
				//* ghetto-debugging *//
				$log.info('OK::getPublishedData(): ',vm.publishedData);
			});
			
		 }
		 
		 function getPublishedData() {
			 return dataFactory.getPublished();
		 }
		 
		 function deletePub(index) {
			//  delete item from array
			vm.publishedData.splice(index,1);
			// emit to server
			socketsFactory.emit('delete:pub', { id: index });
			//* ghetto-debugging *// 
			$log.log("Deleted Element: ", index);
		 }
	}
})();