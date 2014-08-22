app.factory('footerLogic',
		['$location', '$rootScope', 'appCache',
			function($location, $rootScope, appCache) {
				var obj = {};


				return obj;
			}]
		);



app.factory('serverService', ['$rootScope',
	function($rootScope) {

		var obj = {};

		obj.urls = {
			server: 'http://local.web/mybookkeeper/server/index.php/provider/',
			register: 'register',
			login: 'login',
			logout: 'logout',
			updateuser: 'updateUser',
			updatepassword: 'updatePassword',
			auth: 'auth'
		};

		return obj;


	}
]);

app.factory('apiService', ['$rootScope', '$http', 'configRequests', 'serverService',
	function($rootScope, $http, configRequests, serverService) {
		configRequests.init();
		var obj = {};

		obj.register = function(user) {

			var data = {
				firstname: user.firstname,
				lastname: user.lastname,
				email: user.email,
				gender: user.gender,
				password: user.password
			};

			var promise = $http({
				url: serverService.urls.server + serverService.urls.register,
				method: "POST",
				data: data,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			});
			return promise;
		};

		obj.login = function(user) {
			var promise = $http({
				url: serverService.urls.server + serverService.urls.login,
				method: "POST",
				data: user,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			});
			return promise;
		};
		obj.logout = function() {
			var promise = $http({
				url: serverService.urls.server + serverService.urls.logout,
				method: "POST",
				data: {},
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			});
			return promise;
		};

		obj.updateUser = function(user) {
			var promise = $http({
				url: serverService.urls.server + serverService.urls.updateuser,
				method: "POST",
				data: user,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			});
			return promise;
		};

		obj.updatePassword = function(user) {
			var promise = $http({
				url: serverService.urls.server + serverService.urls.updatepassword,
				method: "POST",
				data: user,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			});
			return promise;
		};


		obj.auth = function() {
			var promise = $http({
				url: serverService.urls.server + serverService.urls.auth,
				method: "POST",
				data: {},
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			});
			return promise;
		};

		return obj;
	}
]);



app.service('userService', ['$rootScope', '$q', 'apiService', 'serverService', function($rootScope, $q, apiService, serverService) {

		var obj = {};

		obj.currentUser = {
			id_user: '',
			firstname: '',
			lastname: '',
			email: '',
			gender: '',
			logged: false
		};

		var resetCurrentUser = function() {
			obj.currentUser.id_user = false;
			obj.currentUser.firstname = false;
			obj.currentUser.lastname = false;
			obj.currentUser.email = false;
			obj.currentUser.gender = false;
			obj.currentUser.logged = false;
		};
		var setCurrentUser = function(user) {
			obj.currentUser.id_user = user.id_user;
			obj.currentUser.firstname = user.firstname;
			obj.currentUser.lastname = user.lastname;
			obj.currentUser.email = user.email;
			obj.currentUser.gender = user.gender;
			obj.currentUser.logged = true;
		};

		obj.authUser = function() {

			var self = this;

			var deferred = $q.defer();
			var successCb = function(d) {
				if (!jQuery.isEmptyObject(d.data.user)) {
					setCurrentUser(d.data.user);
				} else {
					resetCurrentUser();
				}
				deferred.resolve(d);
			};

			apiService.auth().then(function(res) {
				successCb(res);

			});
			return deferred.promise;

		};

		obj.logout = function() {
			var promise = apiService.logout();
			promise.then(function(response) {
				$rootScope.redirect("/");
			});

			resetCurrentUser();
		};

		return obj;
	}]);


app.factory('notificationService', ['$rootScope', '$timeout',
	function($rootScope, $timeout) {

		var obj = {};

		obj.notification = function(message, type) {


			$('#content').scrollTop(0);

			switch (type) {
				case 'success' :
					{
						$('#notificatin-holder').addClass('notification-success');
					}
					break;
				case 'error' :
					{
						$('#notificatin-holder').addClass('notification-error');
					}
					break;

				default :
					{
						$('#notificatin-holder').addClass('notification-notice');
					}
					;
			}
			$("#notificatin-holder").html(message);
			$('#notificatin-holder').slideDown();

			$timeout(function() {
				$('#notificatin-holder').slideUp();

			}, 2000);
			$timeout(function() {
				$("#notificatin-holder").html("");
				$('#notificatin-holder').removeClass('notification-success');
				$('#notificatin-holder').removeClass('notification-error');
				$('#notificatin-holder').removeClass('notification-notice');
			}, 2500);


		};

		return obj;

	}
]);

app.factory('loadingScreenService', ['$rootScope',
	function($rootScope) {

		var obj = {};

		obj.start = false;
		obj.end = false;

		obj.showLoading = function(loader) {
			$('#loadingmask').fadeIn()
			console.log('Showing loading screen - ' + loader);
			obj.start = new Date().getTime();
		}
		obj.hideLoading = function(loader) {
			$('#loadingmask').fadeOut()
			console.log('Hiding loading screen - ' + loader);
			obj.end = new Date().getTime();
			console.log('Total loading screen : ' + (this.end - this.start) + 'ms.');
		}


		return obj;

	}
]);



app.service('configRequests', ['$http', function($http) {

		var obj = {};

		obj.init = function() {
			$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
			/**
			 * The workhorse; converts an object to x-www-form-urlencoded serialization.
			 * @param {Object} obj
			 * @return {String}
			 */
			var param = function(obj) {
				var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

				for (name in obj) {
					value = obj[name];

					if (value instanceof Array) {
						for (i = 0; i < value.length; ++i) {
							subValue = value[i];
							fullSubName = name + '[' + i + ']';
							innerObj = {};
							innerObj[fullSubName] = subValue;
							query += param(innerObj) + '&';
						}
					}
					else if (value instanceof Object) {
						for (subName in value) {
							subValue = value[subName];
							fullSubName = name + '[' + subName + ']';
							innerObj = {};
							innerObj[fullSubName] = subValue;
							query += param(innerObj) + '&';
						}
					}
					else if (value !== undefined && value !== null)
						query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
				}

				return query.length ? query.substr(0, query.length - 1) : query;
			};

			// Override $http service's default transformRequest
			$http.defaults.transformRequest = [function(data) {
					return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
				}];
		};

		return obj;

	}]);

