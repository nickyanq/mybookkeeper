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
					email : 'corneliu.iancu27@gmail.com',
					password : ''
				}
				
				console.log('home controller');
			}
		]);
app.controller(
		'registerController',
		['$scope', '$rootScope',
			function($scope, $rootScope) {
				
				$scope.user = {
					email : '',
					firstname : '',
					lastname : '',
					password : '',
					passwordConfirm : ''
				}
				
				$scope.register = function(){
					console.log('Ready to submit.');
					console.log($scope.user);
				}
			}
		]);
