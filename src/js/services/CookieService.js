angular.module('angular-cookie-law')

    .factory('CookieService', function () {
      var readCookie = function (key) {
        var nameEQ = key + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') c = c.substring(1, c.length);
          if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
      }

      var get = function (key) {
        return readCookie(key);
      };

      var set = function (key, value) {
        document.cookie = key + '=' + value;
      };

      return {
        get: get,
        set: set
      }
    });