'use strict';

window.http = (function () {
  var get = function (url, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        success(xhr.response);
      } else {
        error();
      }
    });

    xhr.open('GET', url);
    xhr.send();
  };

  var post = function (url, data, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        success();
      } else {
        error();
      }
    });

    xhr.open('POST', url);
    xhr.send(data);
  };

  return {
    get: get,
    post: post
  };

})();
