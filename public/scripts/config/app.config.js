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
			.otherwise({
				redirectTo: '/published'
			});;
	}
})();