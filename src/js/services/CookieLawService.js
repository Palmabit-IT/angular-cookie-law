angular.module('angular-cookie-law')

    .factory('CookieLawService', [
      'CookieService',
      'cookieLawName',
      'cookieLawAccepted',
      'cookieLawDeclined',
      function (CookieService, cookieLawName, cookieLawAccepted, cookieLawDeclined) {
        var accept = function (expireDate) {
          CookieService.set(cookieLawName, cookieLawAccepted + ';expires=' + expireDate);
        };

        var decline = function (expireDate) {
          CookieService.set(cookieLawName, cookieLawDeclined + ';expires=' + expireDate);
        };

        var isEnabled = function () {
          return CookieService.get(cookieLawName) === cookieLawAccepted || CookieService.get(cookieLawName) === cookieLawDeclined;
        };

        var isAccepted = function () {
          return CookieService.get(cookieLawName) === cookieLawAccepted;
        };

        var isDeclined = function () {
          return CookieService.get(cookieLawName) === cookieLawDeclined;
        };

        return {
          accept: accept,
          decline: decline,
          isEnabled: isEnabled,
          isAccepted: isAccepted,
          isDeclined: isDeclined
        }
      }]);