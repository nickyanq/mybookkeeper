app.directive('menu', ['userService','$rootScope', function(userService,$rootScope) {
		return {
			restrict: 'E',
			templateUrl: 'app/templates/menu.html',
			scope: {},
			link: function(scope, element, attrs) {
				scope.userService = userService;
				
				scope.redirect = function(url){
					$rootScope.redirect(url)
				}
			}

		};
	}]);

app.directive('match', [function() {
		return {
			require: 'ngModel',
			restrict: 'A',
			scope: {
				match: '='
			},
			link: function(scope, elem, attrs, ctrl) {
				scope.$watch(function() {
					return (ctrl.$pristine && angular.isUndefined(ctrl.$modelValue)) || scope.match === ctrl.$modelValue;
				}, function(currentValue) {
					ctrl.$setValidity('match', currentValue);
				});
			}
		};
	}]);