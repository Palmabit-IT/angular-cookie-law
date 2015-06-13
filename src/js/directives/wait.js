angular.module('angular-cookie-law')

    .directive('cookieLawWait', ['CookieLawService', function (CookieLawService) {
      return {
        priority: 1,
        terminal: true,
        restrict: 'EA',
        replace: true,
        template: '<span ng-transclude></span>',
        transclude: true,
        scope: false,
        link: function link(scope, element, attrs, controller, transclude) {
          function loadTransclude () {
            element.html('');

            transclude(scope, function (clone) {
              element.html('');
              element.append(clone);
            });
          }

          if (CookieLawService.isEnabled()) {
            loadTransclude();
          }

          scope.$on('cookieLaw.accept', function () {
            loadTransclude();
          });
        }
      };
    }]);