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
		['$scope', '$rootScope',
			function($scope, $rootScope) {
				console.log('home controller');



			}
		]);

app.controller(
		'loginController',
		['$scope', '$rootScope',
			function($scope, $rootScope) {

				$scope.user = {
					email: 'corneliu.iancu27@gmail.com',
					password: ''
				};

				console.log('home controller');
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
						console.log(result);
						switch (result.data.code) {

							case 202 :
								{
									console.log('Registration ok');
									$rootScope.redirect('login');
									$rootScope.notificationService.notification('Successfull registration.', 'success');
								}
								break;
							case 201 :
								{
									console.log('Email already in use');
								}
								break;
							default :
								{
									console.log('Could not register.');
								}
								break;

						}

					});
				};
			}
		]);
