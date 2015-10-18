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
		
		// empty publish itme
		vm.emptyItem	= {
			"id": "",
			"content": {
				"message": "",
				"id": "",
				"network": "",
				"postType": "",
				"media": {
					"fileName": "",
					"url": ""
				}
			},
			"tags": [],
			"status": "",
			"channels": [],
			"scheduled": "",
			"geo": {
			"countries": [],
			"languages": [],
			"cities": [],
			"regions": []
			}
		}
		
		// new item
		vm.newItem 			= vm.emptyItem;
		vm.showAddForm 		= false;
		vm.toggleAddForm 	= toggleAddForm;

		// actions
		vm.deletePub 		= deletePub;
		vm.addPub			= addPub;
		vm.updatePub		= updatePub;

		activate();
		
		// sockets
		
		// listen to deleted item
		socketsFactory.on('delete:pub:out', function (data) {
			//* ghetto-debugging *//
			$log.log("Emit Delete Element: ", data.id);
			//  delete item from array
			vm.publishedData.splice(data.id, 1);
		});
		
		// listen to added item
		socketsFactory.on('add:pub:out', function (data) {
			//* ghetto-debugging *//
			$log.log("Emit Add Element: ", data.item.id);
			//  add item to array
			vm.publishedData.push(data.item);
		});
		
		// listen to updated item
		socketsFactory.on('update:pub:out', function (data) {
			//* ghetto-debugging *//
			$log.log("Emit Updated Element: ", data.id);
			//  update item in array
			vm.publishedData[data.id] = data.item;
		});

		////////////////

		function activate() {
			
			return getPublishedData().then(function (data){
				vm.publishedData = data.data;
				//* ghetto-debugging *//
				$log.info('OK::getPublishedData(): ',vm.publishedData);
			});
			
		}
		
		//  get data from factory
		function getPublishedData() {
			return dataFactory.getPublished();
		}
		
		//  delete item
		function deletePub(index) {
			//  delete item from array
			vm.publishedData.splice(index,1);
			// emit to server
			socketsFactory.emit('delete:pub', { id: index });
			//* ghetto-debugging *// 
			$log.log("Deleted Element: ", index);
		}
		 
		// add item
		function addPub(item) {
			// close new item form
			vm.showAddForm = false;
			// add item to current array
			vm.publishedData.push(item);
			// send new itemect through socket
			socketsFactory.emit('add:pub', { item: item });
			//* ghetto-debugging *// 
			$log.log("Added Element: ", item.id);
		 }
		 
		 function updatePub(index , item) {
			// update array with item
			vm.publishedData[index] = item;
			// emit item and index
			socketsFactory.emit('update:pub', { id: index, item: item });
			//* ghetto-debugging *// 
			$log.log("Updated Element: ", index);
		}
		 
		// manage new item form
		function toggleAddForm() {
			// open/close form on click
			vm.showAddForm = !vm.showAddForm;
			// clear item on click
			vm.newItem = {};
		 }
	}
})();