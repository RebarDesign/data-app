(function() {
'use strict';

	angular
		.module('app')
		.factory('dataFactory', dataFactory);

	dataFactory.$inject = ['$log' , '$http'];
	function dataFactory($log , $http) {
		
		var factory = {
			getPublished:getPublished,
			getReach:getReach
		};
		
		return factory;

		////////////////
		function getPublished() {
			
			return $http.get('/api/published')
				.then(getPublishedComplete)
				.catch(getPublishedFailed);
	
			function getPublishedComplete(response) {
				//* ghetto-debugging *//
				// $log.log(response);
				return response;
			}
	
			function getPublishedFailed(error) {
				$log.error('ERROR::getPublished Failed ' + error.data);
			}
			
		}
	
		function getReach() {
			
			return $http.get('/api/reach')
				.then(getReachComplete)
				.catch(getReachFailed);
	
			function getReachComplete(response) {
				//* ghetto-debugging *//
				$log.log(response);
				return response;
			}
	
			function getReachFailed(error) {
				$log.error('ERROR::getReach Failed ' + error.data);
			}
		}
	}
})();