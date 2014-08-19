app.directive('menu', [function() {
		return {
			restrict: 'E',
			templateUrl: 'app/templates/menu.html',
//			scope: {},
			link: function(scope, element, attrs) {
				console.log('kewl')
				scope.name = 'something';

			}

		};
	}]);