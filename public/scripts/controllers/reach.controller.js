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
				
		// ordinal scale for X ( post index )
		var x = d3.scale.ordinal()
			.rangeRoundBands([0, width], .1);
		
		// linear scale for Y post impressions
		var y = d3.scale.linear()
			.range([height, 0]);
		
		// x axis on the bottom
		var xAxis = d3.svg.axis()
			.scale(x)
			.orient("bottom");
		
		// y axis on the left with 10 ticks
		var yAxis = d3.svg.axis()
			.scale(y)
			.orient("left")
			.ticks(10);
			
		// find our element and append size it
		var svg = d3.select("#bar-chart")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
				
		// var parseDate = d3.time.format("%X");
		
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
				
			// set x domain the number of elements
			x.domain(array.map(function(d) { return d.index; }));
			
			// set y domain, the highest post value
			y.domain([0, yMax]);
			
			// style the x axis
			svg.append("g")
				.attr("class", "x axis")
				.attr("transform", "translate(0," + height + ")")
				.attr("font-size", "7px")
				.call(xAxis);
			
			// x axis label
			svg.append("text")
				.attr("class", "x axis")
				.attr("text-anchor", "end")
				.attr("x", width / 2)
				.attr("y", height+ 25)
				.text("Post Item");
				
			//TODO Style the label 
				
				
			// style the y axis
			svg.append("g")
				.attr("class", "y axis")
				.call(yAxis)
				.append("text")
				.attr("transform", "rotate(-90)")
				.attr("y", 6)
				.attr("dy", ".71em")
				.style("text-anchor", "end")
				.text("Impressions");
				
			// draw the bars
			svg.selectAll(".bar")
				.data(array)
				.enter().append("rect")
				.attr("class", "bar")
				.attr("x", function(d) { return x(d.index); })
				.attr("width", x.rangeBand())
				.attr("y", function(d) { return y(d.total); })
				.attr("height", function(d) { return height - y(d.total); })
				// info on hover
				.append("svg:title")
   				.text(function(d) { return 'Post ' + d.index + ' : ' + d.total; });
			
			// monitor checkbox
			d3.select("#sort-box").on("change", change);
			
			function change() {
				
				
				// delay the redraw of the elements
				var sortTimeout = setTimeout(function() {
					d3.select("input").property("checked", true).each(change);
				}, 100);
				
				clearTimeout(sortTimeout);
				
				// Copy-on-write since tweens are evaluated after a delay.
				// order either by post number or index
				var x0 = x.domain(array.sort(this.checked
					? function(a, b) { return b.total - a.total; }
					: function(a, b) { return d3.ascending(a.index, b.index); })
					.map(function(d) { return d.index; }))
					.copy();
					
				// sort by index
				// they can be sorted by timestamp, but then the null timestamps have to be removed
				svg.selectAll(".bar")
					.sort(function(a, b) { return x0(a.index) - x0(b.index); });
					
				// make relay relative to element index
				var transition = svg.transition().duration(750),
					delay = function(d, i) { return i * 5; };
					
				
				transition.selectAll(".bar")
					.delay(delay)
					.attr("x", function(d) { return x0(d.index); });
					
				transition.select(".x.axis")
					.call(xAxis)
					.selectAll("g")
					.delay(delay);
			}
		}
	}
})();