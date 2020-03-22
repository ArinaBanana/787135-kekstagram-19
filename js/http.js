'use strict';

window.http = (function () {
  var StatusCode = {
    OK: 200,
    NOT_FOUND: 404,
    SERVER_ERROR: 500
  };

  var ErrorMessages = window.errors.ErrorMessages;

  var getXhr = function (successHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case StatusCode.OK:
          return successHandler(xhr.response);
        case StatusCode.NOT_FOUND:
          return errorHandler(ErrorMessages.NOT_FOUND);
        case StatusCode.SERVER_ERROR:
          return errorHandler(ErrorMessages.SERVER_ERROR);
        default:
          return errorHandler(ErrorMessages.UNKNOWN);
      }
    });

    xhr.addEventListener('error', function () {
      return errorHandler(ErrorMessages.CONNECTION_ERROR);
    });

    xhr.addEventListener('timeout', function () {
      return errorHandler(ErrorMessages.timeout + xhr.timeout + 'ms');
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
