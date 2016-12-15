angular.module('angular-cookie-law')

    .directive('cookieLawBanner', ['$compile', 'CookieLawService', function ($compile, CookieLawService) {
      return {
        restrict: 'EA',
        replace: true,
        scope: {
          message: '@',
          acceptText: '@',
          declineText: '@',
          policyText: '@',
          policyURL: '@'
        },
        link: function (scope, element, attr) {
          var template, options, expireDate,
              acceptButton = '',
              declineButton = '',
              policyButton = '';

          scope.$watchGroup(['message', 'acceptText', 'declineText', 'policyText', 'policyURL'], function() {
            if (CookieLawService.isEnabled()) {
              return;
            }

            options = {
              message: attr.message || 'We use cookies to track usage and preferences.', //Message displayed on bar
              acceptButton: attr.acceptButton === 'false' ? false : true, //Set to true to show accept/enable button
              acceptText: attr.acceptText || 'I Understand', //Text on accept/enable button
              declineButton: attr.declineButton || false, //Set to true to show decline/disable button
              declineText: attr.declineText || 'Disable Cookies', //Text on decline/disable button
              policyButton: attr.policyButton || false, //Set to true to show Privacy Policy button
              policyText: attr.policyText || 'Privacy Policy', //Text on Privacy Policy button
              policyURL: attr.policyUrl || '/privacy-policy/', //URL of Privacy Policy
              policyBlank: attr.policyBlank && attr.policyBlank === 'true' ? 'target="_blank"' : '',
              expireDays: attr.expireDays || 365, //Number of days for cookieBar cookie to be stored for
              element: attr.element || 'body' //Element to append/prepend cookieBar to. Remember "." for class or "#" for id.
            };

            //Sets expiration date for cookie
            expireDate = new Date();
            expireDate.setTime(expireDate.getTime() + (options.expireDays * 24 * 60 * 60 * 1000));
            expireDate = expireDate.toGMTString();

            if (options.acceptButton) {
              acceptButton = '<a href="" class="cl-accept" ng-click="accept()">' + options.acceptText + '</a>';
            }

            if (options.declineButton) {
              declineButton = ' <a href="" class="cl-disable" ng-click="decline()">' + options.declineText + '</a>';
            }

            if (options.policyButton) {
              policyButton =
                ' <a href="' + options.policyURL + '" class="cl-policy" ' + options.policyBlank + '>' + options.policyText + '</a>';
            }

            template =
              '<div class="cl-banner"><p>' + options.message + '<br>' + acceptButton + declineButton + policyButton + '</p></div>';

            element.html(template);
            $compile(element.contents())(scope);

            scope.accept = function() {
              CookieLawService.accept(expireDate);
              scope.onAccept();
              element.remove();
              scope.onDismiss();
            };

            scope.decline = function() {
              CookieLawService.decline();
              scope.onDecline();
            };
          });
        },
        controller: ['$rootScope', '$scope', function ($rootScope, scope) {
          scope.onAccept = function () {
            $rootScope.$broadcast('cookieLaw.accept');
          };

          scope.onDismiss = function () {
            $rootScope.$broadcast('cookieLaw.dismiss');
          };

          scope.onDecline = function () {
            $rootScope.$broadcast('cookieLaw.decline');
          };
        }]
      }
    }]);