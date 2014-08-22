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
				requireLogin: true,
				forbidLogged: false,
				resolve: {
					auth: function(userService) {
						return userService.authUser();
					}
				}
			})
			.when('/register', {
				templateUrl: 'app/views/register.html',
				controller: 'registerController',
				requireLogin: false,
				forbidLogged: true,
				resolve: {
					auth: function(userService) {
						return userService.authUser();
					}
				}
			})
			.when('/login', {
				templateUrl: 'app/views/login.html',
				controller: 'loginController',
				requireLogin: false,
				forbidLogged: true,
				resolve: {
					auth: function(userService) {
						return userService.authUser();
					}
				}
			})
			.when('/profile', {
				templateUrl: 'app/views/profile.html',
				controller: 'profileController',
				requireLogin: true,
				forbidLogged: false,
				resolve: {
					auth: function(userService) {
						return userService.authUser();
					}
				}
			})
			.when('/logout', {
				requireLogin: true,
				forbidLogged: false,
				resolve: {
					logout: function(userService) {
						userService.logout();
//						console.log('logging out...');
//						return true;
					},
					auth: function(userService) {
						return userService.authUser();
					}
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
app.run(['$rootScope', '$templateCache', '$location', '$q', '$timeout', 'notificationService', 'userService', 'loadingScreenService',
	function($rootScope, $templateCache, $location, $q, $timeout, notificationService, userService, loadingScreenService) {

		$rootScope.notificationService = notificationService;
		$rootScope.loadingScreenService = loadingScreenService;

		$rootScope.$on('$viewContentLoaded', function() {
			$templateCache.removeAll();
		});

		if (navigator.cookieEnabled === false) {
			//no cookies enabled.

		}

		$rootScope.$on('$routeChangeStart', function(e, curr, prev) {
			loadingScreenService.showLoading('mainscreen');
			
			if (curr.$$route && curr.$$route.resolve) {
				// Show a loading message until promises are resolved
				$rootScope.loadingView = true;
//				console.log('Start changeing route');
			}
		});
		$rootScope.$on('$routeChangeSuccess', function(e, curr, prev) {
			// Hide loading message
			loadingScreenService.hideLoading('mainscreen');
			$rootScope.loadingView = false;
			$('#left-panel').panel("close");
			//checking if the user is allowed.
			if (curr.$$route.requireLogin === true) {
				if (userService.currentUser.logged === false) {
					$location.path('/login');
					e.preventDefault();
				}
			} else {
				if (curr.$$route.forbidLogged) {
					if (userService.currentUser.logged === true) {
						$location.path('/');
						e.preventDefault();
					}
				}
			}


//			console.log('Route changed successfully.');
		});
		$rootScope.$on("$routeChangeError", function(e, curr, prev, rejection) {
			console.log("ROUTE CHANGE ERROR: " + rejection);
		});

		$rootScope.redirect = function(url) {
			$location.path(url);
		};

	}]);