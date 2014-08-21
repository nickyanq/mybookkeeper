app.directive('menu', [function() {
		return {
			restrict: 'E',
			templateUrl: 'app/templates/menu.html',
//			scope: {},
			link: function(scope, element, attrs) {
				scope.name = 'something';
			}

		};
	}]);