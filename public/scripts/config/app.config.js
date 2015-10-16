(function() {
	'use strict';

	angular.module('app')
	.config(AppConfig);
	
	AppConfig.$inject = ['$routeProvider'];
	
	function AppConfig($routeProvider) {
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
			});;
	}
})();