(function() {
'use strict';

	angular
		.module('app')
		.factory('dataFactory', dataFactory);

	dataFactory.$inject = ['$log' , '$http', '$q'];
	function dataFactory($log , $http, $q) {
		
		var factory = {
			getPublished:getPublished,
			getReach:getReach
		};
		
		return factory;

		////////////////
		function getPublished() {
			var deferred = $q.defer();
			
			$http.get('/api/published')
				.then(getPublishedComplete)
				.catch(getPublishedFailed);
	
			function getPublishedComplete(response) {
				//* ghetto-debugging *//
				// $log.log(response);
				deferred.resolve(response);
			}
	
			function getPublishedFailed(error) {
				deferred.reject(error);
				$log.error('ERROR::getPublished Data Failed ' + error.data);
			}
			return deferred.promise;
		}
	
		function getReach() {
			var deferred = $q.defer();
			
			$http.get('/api/reach')
				.then(getReachComplete)
				.catch(getReachFailed);
	
			function getReachComplete(response) {
				//* ghetto-debugging *//
				// $log.log(response);
				deferred.resolve(response);
			}
	
			function getReachFailed(error) {
				deferred.reject(error);
				$log.error('ERROR::getReach Data Failed ' + error.data);
			}
			return deferred.promise;
		}
	}
})();