(function() {
	'use strict';

	angular.module('app')
	.config(AppConfig);
	
	AppConfig.$inject = ['$routeProvider' , '$compileProvider'];
	
	function AppConfig($routeProvider, $compileProvider) {
		// define routes
		$routeProvider
			.when('/published', {
				templateUrl: 'views/published.html',
				controller: 'PublishedController',
				controllerAs: 'vm'
			})
			.when('/reached', {
				templateUrl: 'views/reached.html',
				controller: 'ReachController',
				controllerAs: 'vm'
			})
			.otherwise({
				redirectTo: '/published'
			});
			
		// disable debug info
  		$compileProvider.debugInfoEnabled(false);
	}
})();