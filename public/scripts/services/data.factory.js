(function() {
'use strict';

	angular
		.module('app')
		.factory('dataFactory', dataFactory);

	dataFactory.$inject = ['$log' , '$http'];
	function dataFactory($log , $http) {
		
		var factory = {
			getPublished:getPublished,
			getReached:getReached
		};
		
		return factory;

		////////////////
		function getPublished() {
			
			return $http.get('/api/published')
				.then(getPublishedComplete)
				.catch(getPublishedFailed);
	
			function getPublishedComplete(response) {
				$log.log(response);
				return response;
			}
	
			function getPublishedFailed(error) {
				$log.error('ERROR::getPublished Failed ' + error.data);
			}
			
		}
	
		function getReached() {
		}
	}
})();