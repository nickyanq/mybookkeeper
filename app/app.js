var app = angular.module('app', ['ngRoute', 'ngCookies']);


/**
 *		Within the routeProvider we set each route to render its
 * specific template.
 *		Before the route is resolved we load the languageLogic(for translations)
 * and check the authentification status.
 *  - requireLogin : Deny access for not logged users.
 *  - forbidUser : Deny access for logged users.
 *
 */
app.config(function($routeProvider, $locationProvider, $provide, $httpProvider) {
	$routeProvider
			.when('/', {
				templateUrl: 'app/views/home.html',
				controller: 'homeController',
				resolve: {
				}
			})
			.when('/register', {
				templateUrl: 'app/views/register.html',
				controller: 'registerController',
				resolve: {
				}
			})
			.when('/login', {
				templateUrl: 'app/views/login.html',
				controller: 'loginController',
				resolve: {
				}
			})

			.otherwise({redirectTo: '/'});

//	$locationProvider.html5Mode(true);


});


/**
 *		Sets the header to fixed position on the Slip page only.
 *  - on route change start it displays the loading screen
 *  - on route change success it hides the loading screen (via loadingView)
 *	- on route change error it displays a message in the console.
 */
app.run(['$rootScope', '$templateCache', '$location', '$q', '$timeout',
	function($rootScope, $templateCache, $location, $q, $timeout) {
		$rootScope.$on('$viewContentLoaded', function() {
			$templateCache.removeAll();
		});

		if (navigator.cookieEnabled === false) {
			//no cookies enabled.

		}

		$rootScope.$on('$routeChangeStart', function(e, curr, prev) {
			if (curr.$$route && curr.$$route.resolve) {
				// Show a loading message until promises are resolved
				$rootScope.loadingView = true;
				console.log('Start changeing route');
			}
		});
		$rootScope.$on('$routeChangeSuccess', function(e, curr, prev) {
			// Hide loading message
			$rootScope.loadingView = false;
			$('#left-panel').panel("close");
			console.log('Route changed successfully.');
		});
		$rootScope.$on("$routeChangeError", function(e, curr, prev, rejection) {
			console.log("ROUTE CHANGE ERROR: " + rejection);
		});

		$rootScope.redirect = function(url) {
			$location.path(url);
		}

	}]);