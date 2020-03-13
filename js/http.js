'use strict';

window.http = (function () {
  var errorMessages = window.errors.errorMessages;

  var getXhr = function (success, error) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case 200:
          return success(xhr.response);
        case 404:
          return error(errorMessages.notFound);
        case 500:
          return error(errorMessages.serverError);
        default:
          return error(errorMessages.unknown);
      }
    });

    xhr.addEventListener('error', function () {
      return error(errorMessages.connectionError);
    });

    xhr.addEventListener('timeout', function () {
      return error(errorMessages.timeout + xhr.timeout + 'ms');
    });

    xhr.timeout = 10000;
    return xhr;
  };

  var get = function (url, success, error) {

    var xhr = getXhr(success, error);
    xhr.open('GET', url);
    xhr.send();
  };

  var post = function (url, data, success, error) {
    var xhr = getXhr(success, error);

    xhr.open('POST', url);
    xhr.send(data);
  };

  return {
    get: get,
    post: post
  };

})();
