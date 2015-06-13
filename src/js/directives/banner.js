angular.module('angular-cookie-law')

    .directive('cookieLawBanner', ['$compile', 'CookieLawService', function ($compile, CookieLawService) {
      return {
        restrict: 'EA',
        replace: true,
        scope: true,
        link: function (scope, element, attr) {
          var template, options, expireDate,
              acceptButton = '',
              declineButton = '',
              policyButton = '',
              fixed = '',
              zindex = '';

          if (CookieLawService.isEnabled()) {
            return;
          }

          options = {
            message: attr.message || 'We use cookies to track usage and preferences.', //Message displayed on bar
            acceptButton: attr.acceptButton || true, //Set to true to show accept/enable button
            acceptText: attr.acceptText || 'I Understand', //Text on accept/enable button
            declineButton: attr.declineButton || false, //Set to true to show decline/disable button
            declineText: attr.declineText || 'Disable Cookies', //Text on decline/disable button
            policyButton: attr.policyButton || false, //Set to true to show Privacy Policy button
            policyText: attr.policyText || 'Privacy Policy', //Text on Privacy Policy button
            policyURL: attr.policyUrl || '/privacy-policy/', //URL of Privacy Policy
            policyBlank: attr.policyBlank && attr.policyBlank === 'true' ? 'target="_blank"' : '',
            autoEnable: attr.autoEnable || true, //Set to true for cookies to be accepted automatically. Banner still shows
            acceptOnContinue: attr.acceptOnContinue || false, //Set to true to silently accept cookies when visitor moves to another page
            expireDays: attr.expireDays || 365, //Number of days for cookieBar cookie to be stored for
            forceShow: attr.forceShow || false, //Force cookieBar to show regardless of user cookie preference
            effect: attr.effect || 'slide', //Options: slide, fade, hide
            element: attr.element || 'body', //Element to append/prepend cookieBar to. Remember "." for class or "#" for id.
            append: attr.append || false, //Set to true for cookieBar HTML to be placed at base of website. YMMV
            fixed: attr.fixed || false, //Set to true to add the class "fixed" to the cookie bar. Default CSS should fix the position
            bottom: attr.bottom || false, //Force CSS when fixed, so bar appears at bottom of website
            zindex: attr.zindex || '', //Can be set in CSS, although some may prefer to set here
            redirect: attr.redirect || String(window.location.href), //Current location
            domain: attr.domain || String(window.location.hostname), //Location of privacy policy
            referrer: attr.referrer || String(document.referrer) //Where visitor has come from
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
            policyButton = ' <a href="' + options.policyURL + '" class="cl-policy" ' + options.policyBlank + '>' + options.policyText + '</a>';
          }

          if (options.fixed) {
            if (options.bottom) {
              fixed = ' class="fixed bottom"';
            } else {
              fixed = ' class="fixed"';
            }
          }

          if (options.zindex != '') {
            zindex = ' style="z-index:' + options.zindex + ';"';
          }

          template = '<div class="cl-banner"><p>' + options.message + '<br>' + acceptButton + declineButton + policyButton + '</p></div>';

          element.html(template);
          $compile(element.contents())(scope);

          scope.accept = function () {
            CookieLawService.accept(expireDate);
            scope.onAccept();
            element.remove();
            scope.onDismiss();
          };

          scope.decline = function () {
            CookieLawService.decline();
            scope.onDecline();
          };
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