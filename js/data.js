'use strict';

window.data = (function () {
  var LOAD_DATA_URL = 'https://js.dump.academy/kekstagram/data';
  var http = window.http;

  var getPhotos = function (successHandler, errorHandler) {
    http.get(LOAD_DATA_URL, successHandler, errorHandler);
  };

  return {
    getPhotos: getPhotos
  };

})();
