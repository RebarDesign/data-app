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
		
		// get color range 
		var color = d3.scale.ordinal()
    	.range(["#FFC107", "#d0743c", "#607D8B"]);
		
		// x axis on the bottom
		var xAxis = d3.svg.axis()
			.scale(x)
			.orient("bottom");
		
		// y axis on the left with 10 ticks
		var yAxis = d3.svg.axis()
			.scale(y)
			.orient("left")
			.ticks(10);
				
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
				// drawBars(vm.reachData);
				drawStackedBars(vm.reachData);
			})
		
		}
		
		function getReachData(){
			return dataFactory.getReach();
		}
		
		// manipulate array to my liking
		function cleanArray(array){
			
			//* ghetto-debugging *//
			// $log.log('Cleaned ', array);
			
			// remove empty objects
			var newArray = array.filter(function (n) {
				return n.hasOwnProperty("post_impressions");
			})
			
			
			newArray = newArray.map(function(obj, index){ 
				
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
			
			// find our element and append size it
			var svg = d3.select("#bar-chart")
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
				.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
			
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
   				.text(function(d) { return 'Post ' + d.index + ' : ' + d.total + ' at ' + parseDate(d.timestamp);});
			
			// monitor checkbox
			d3.select("input").on("change", change);
			
			function change() {
				
				
				// // delay the redraw of the elements
				// var sortTimeout = setTimeout(function() {
				// 	d3.select("input").property("checked", true).each(change);
				// }, 100);
				
				// clearTimeout(sortTimeout);
				
				// Copy-on-write since tweens are evaluated after a delay.
				// order either by post number or index
				var x0 = x.domain(array.sort(this.checked
					? function(a, b) { return b.total - a.total; }
					: function(a, b) { return d3.ascending(a.index, b.index); })
					.map(function(d) { return d.index; }))
					.copy();
					
				// sort by index
				// they can be sorted by timestamp, but it's the same
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
		
		function drawStackedBars(array){
			
			// find our element and append size it
			var svg = d3.select("#stack-chart")
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
				.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
			
			// get highest post value
			var yMax = d3.max(array, function(d){ return Math.max(d.total); });
			
			//* fancy-debugging *//
			// debugger
			
			// we only need the impression properties
			color.domain(d3.keys(array[0]).filter(function(key) { return (key !== 'timestamp' && key !== 'index' && key !== 'total'); }));
			
			
			array.forEach(function(d) {
				var y0 = 0;
				// stack the values
				d.impressions = color.domain().map(function(name) { return {name: name, y0: y0, y1 : y0 += +d[name]}; });
			});
			
			//* ghetto-debugging *//
			$log.log('With Impression ', array);
			
			// sort by value
			array.sort(function(a, b) { return b.total - a.total; });
				
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
			var impressions = svg.selectAll(".bar")
				.data(array)
				.enter().append("g")
				.attr("class", "bar")
				.attr("transform", function(d) { return "translate(" + x(d.index) + ",0)"; });

			impressions.selectAll("rect")
				.data(function(d) { return d.impressions; })
				.enter().append("rect")
				.attr("width", x.rangeBand())
				.attr("y", function(d) { return y(d.y1); })
				.attr("height", function(d) { return y(d.y0) - y(d.y1); })
				.style("fill", function(d) { return color(d.name); })
				// set rect class to it's color for manipulation
				.attr("class", function(d) { return d.name; })
				// tooltip info
				.append("svg:title")
   				.text(function(d) { return d.name + ' Impressions: ' + (d.y1 - d.y0);});
			
			var legend = svg.selectAll(".legend")
				.data(color.domain().slice().reverse())
				.enter().append("g")
				.attr("class", "legend")
				.attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
			
			var organicVisibility = false;
			var paidVisibility = false;
			var viralVisibility = false;
			
			legend.append("rect")
				.attr("x", width - 18)
				.attr("width", 18)
				.attr("height", 18)
				.attr("id", color)
				.style("cursor", "pointer")
				.style("cursor", "hand") 
				.style("fill", color)
				// lighten the bars on hover
				.on('mouseover', function(d){
					switch (d3.select(this).attr("id")){
						// organic
						case "#FFC107":
							d3.selectAll(".viral").style("opacity", '0.3');
							d3.selectAll(".paid").style("opacity", '0.3');
						break;
						// paid
						case "#d0743c":
							d3.selectAll(".organic").style("opacity", '0.3');
							d3.selectAll(".viral").style("opacity", '0.3');
						break;
						// viral
						case "#607D8B":
							d3.selectAll(".organic").style("opacity", '0.3');
							d3.selectAll(".paid").style("opacity", '0.3');
						break;
					}
				})
				.on('mouseleave', function(d){
					switch (d3.select(this).attr("id")){
						// organic
						case "#FFC107":
							d3.selectAll(".viral").style("opacity", '1');
							d3.selectAll(".paid").style("opacity", '1');
						break;
						// paid
						case "#d0743c":
							d3.selectAll(".organic").style("opacity", '1');
							d3.selectAll(".viral").style("opacity", '1');
						break;
						// viral
						case "#607D8B":
							d3.selectAll(".organic").style("opacity", '1');
							d3.selectAll(".paid").style("opacity", '1');
						break;
					}
				})
				// toggle visibility of bars 
				// TODO: More elegantly
				.on("click", function(){
					
					switch (d3.select(this).attr("id")){
						// organic
						case "#FFC107":
							var active   = organicVisibility ? false : true,
							newOpacity = active ? 0 : 1;
							// Hide or show the elements
							d3.selectAll(".viral").style("opacity", newOpacity);
							d3.selectAll(".paid").style("opacity", newOpacity);
							// Update whether or not the elements are active
							organicVisibility = active;
						break;
						// paid
						case "#d0743c":
							var active   = paidVisibility ? false : true,
							newOpacity = active ? 0 : 1;
							// Hide or show the elements
							d3.selectAll(".organic").style("opacity", newOpacity);
							d3.selectAll(".viral").style("opacity", newOpacity);
							// Update whether or not the elements are active
							paidVisibility = active;
						break;
						// viral
						case "#607D8B":
							var active   = viralVisibility ? false : true,
							newOpacity = active ? 0 : 1;
							// Hide or show the elements
							d3.selectAll(".organic").style("opacity", newOpacity);
							d3.selectAll(".paid").style("opacity", newOpacity);
							// Update whether or not the elements are active
							viralVisibility = active;
						break;
					}
				});
			
			legend.append("text")
				.attr("x", width - 24)
				.attr("y", 9)
				.attr("dy", ".35em")
				.style("text-anchor", "end")
				.text(function(d) { return d; });
				
			// monitor checkbox
			d3.select("input").on("change", change);
			
			function change() {


				// delay the redraw of the elements
				var sortTimeout = setTimeout(function() {
					d3.select("input").property("checked", true).each(change);
				}, 1000);

				clearTimeout(sortTimeout);

				// Copy-on-write since tweens are evaluated after a delay.
				// order either by post value or index
				var x0 = x.domain(array.sort(this.checked
					? function(a, b) { return a.index - b.index; }
					: function(a, b) { return b.total - a.total; })
					.map(function(d) { return d.index; }))
					.copy();
					
				// make delay relative to element index
				var transition = svg.transition().duration(750),
					delay = function(d, i) { return i * 5; };
				
				transition.selectAll("g.bar")
					.delay(delay)
					.attr("transform", function(d) { return "translate(" + x(d.index) + ",0)"; });
					
				transition.select(".x.axis")
					.call(xAxis)
					.selectAll("g.bar")
					.delay(delay);
			}
		}
	}
})();