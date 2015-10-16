(function() {
'use strict';

	angular
		.module('app')
		.controller('ReachController', ReachController);

	ReachController.$inject = ['dataFactory', '$log', '$window'];
	function ReachController(dataFactory, $log, $window) {
		var vm = this;
		
		// reach array
		vm.reachData = [];
		
		// d3
		var d3 = $window.d3;
		var margin = {top: 20, right: 20, bottom: 30, left: 40},
				width = 1200 - margin.left - margin.right,
				height = 500 - margin.top - margin.bottom;
				
		var parseDate = d3.time.format("%X");
		
		// actions
		activate();

		////////////////

		function activate() { 
		
			return getReachData().then(function (data) {
				// assign data to reachData array
				vm.reachData = data.data.response;
				// clean up array
				vm.reachData = cleanArray(vm.reachData);
				//* ghetto-debugging *//
				// $log.info('OK:: getReachData(): ', vm.reachData);
				drawBars(vm.reachData);
				
			})
		
		}
		
		function getReachData(){
			return dataFactory.getReach();
		}
		
		// manipulate array to my liking
		function cleanArray(array){
			
			// remove empty objects
			// var newArray = array.filter(function (n) {
			// 	return n.post_impressions != undefined;
			// })
			
			//* ghetto-debugging *//
			// $log.log('Cleaned ', newArray);
			
			var newArray = array.map(function(obj, index){ 
				
				//* ghetto-debugging *//
				// $log.log('Obj ', obj);
				
				// how we want the object to look
				var item = {
					index 		: 	null,
					timestamp 	:	null,
    				total 		:	null,
					organic		:	null,
					paid 		: 	null,
					viral		:	null
				};
				
				item.index = ++index;
				
				// if has impressions
				if (obj.post_impressions){
					// start index from 1
					// timestamp as Date so we can quanitfy it. Timestamp is same for all properties
					item.timestamp = new Date(obj.post_impressions[0].timestamp);
					
					item.total 		= obj.post_impressions[0].value;
					item.organic 	= obj.post_impressions_organic[0].value;
					item.paid 		= obj.post_impressions_paid[0].value;
					item.viral 		= obj.post_impressions_viral[0].value;
				};
				return item;
			});
			
			//* ghetto-debugging *//
			// $log.log('Cleaned ', newArray);
			
			return newArray;
		}
		
		function drawBars(array){
			
			// get highest post value
			var yMax = d3.max(array, function(d){ return Math.max(d.total); });
			
			//* fancy-debugging *//
			// debugger
			
		}
	}
})();