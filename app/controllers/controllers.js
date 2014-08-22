/**
 * Determins which footer item is selected,
 * gets the number of bets the user currently has.
 *
 * @param {type} $scope
 * @param {type} $rootScope
 * @param {type} footerLogic
 * @param {type} appCache
 */
app.controller(
		'homeController',
		['$scope', '$rootScope', 'userService',
			function($scope, $rootScope, userService) {
//				console.log('home controller');



			}
		]);

app.controller(
		'loginController',
		['$scope', '$rootScope', 'apiService', '$timeout',
			function($scope, $rootScope, apiService, $timeout) {

				$scope.user = {
					email: '',
					password: ''
				};

				var resetUser = function() {
					$scope.user = {
						email: '',
						password: ''
					};
				};

				$scope.login = function() {
					apiService.login($scope.user).then(function(result) {
						switch (result.data.code) {
							case 404 :
								{
									$scope.user.email = '';
									$scope.user.password = '';
									$rootScope.notificationService.notification('User not found.', 'error');
								}
								break;
							case 2 :
								{
									$scope.user.password = '';
									$rootScope.notificationService.notification('Password did not matched.', 'error');
								}
								break;
							case 1 :
								{
									$rootScope.notificationService.notification('Successfull login.', 'success');
									$timeout(function() {
										$rootScope.redirect('/');
									}, 2000)

								}
								break;
							default :
								{
									resetUser();
									$rootScope.notificationService.notification('Login failed.', 'error');
								}
								break;
						}
					});
				};
			}
		]);
app.controller(
		'registerController',
		['$scope', '$rootScope', 'apiService',
			function($scope, $rootScope, apiService) {

				$scope.user = {
					email: '',
					firstname: '',
					lastname: '',
					gender: 'Mr.',
					password: '',
					passwordConfirm: ''
				};

				$scope.genders = [
					{
						"id": "1",
						"name": "Mr."
					},
					{
						"id": "2",
						"name": "Mrs."
					},
				];

				$scope.register = function() {
//					console.log('Ready to submit.');
					apiService.register($scope.user).then(function(result) {
						switch (result.data.code) {

							case 202 :
								{
									$rootScope.redirect('login');
									$rootScope.notificationService.notification('Successfull registration.', 'success');
								}
								break;
							case 201 :
								{
									$rootScope.notificationService.notification('Email already in use.', 'error');
								}
								break;
							default :
								{
									$rootScope.notificationService.notification('Could not register.', 'error');
								}
								break;

						}

					});
				};
			}
		]);

app.controller(
		'profileController',
		['$scope', '$rootScope', 'userService', 'apiService',
			function($scope, $rootScope, userService, apiService) {

				$scope.user = userService.currentUser;

				$scope.user.password = '';
				$scope.user.passwordConfirm = '';

				$scope.genders = [
					{
						"id": "1",
						"name": "Mr."
					},
					{
						"id": "2",
						"name": "Mrs."
					}
				];

				$scope.save = function() {
					apiService.updateUser($scope.user).then(function(d) {
						switch (d.data.code) {
							case 1 :
								{
									$rootScope.notificationService.notification('User successfully updated.', 'success');	
								}
								break;
							case 2 :
								{
									//to be defined as user not found.
								}
								break;
							default :
								{
								$rootScope.notificationService.notification('Could not update.', 'error');	
								}
								break;
						}

					});
				};

				$scope.saveNewPassword = function() {
					apiService.updatePassword($scope.user).then(function(d){
						switch(d.data.code){
							case 1 : {
									$rootScope.notificationService.notification('Password successfully updated.', 'success');	
							} break;
							
							case 2 : {
									$rootScope.notificationService.notification('Old password did not matched.', 'error');	
							} break;
							case 3 : {
									$rootScope.notificationService.notification('New password confirmation failed.', 'error');	
							} break;
							
							case 404 : {
									$rootScope.notificationService.notification('Current user was not found.', 'error');	
							} break;
							
							default : {
									$rootScope.notificationService.notification('Could not update.', 'error');	
							} break;
							
						};
						$scope.user.password = '';
						$scope.user.passwordConfirm = '';
						$scope.user.oldpassword = '';
						
					});
					
				};

			}
		]);