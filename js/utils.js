'use strict';

window.utils = (function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';

  var getRandomNumber = function (a, b) {
    return Math.floor(Math.random() * (b - a) + a);
  };

  var hasDuplicate = function (array) {
    var checked = {};

    for (var i = 0; i < array.length; i++) {
      var el = array[i];
      var key = el.toLowerCase();

      if (!checked[key]) {
        checked[key] = true;
      } else {
        return false;
      }
    }

    return true;
  };

  var debounce = function (handler, interval) {
    var timerId = null;

    return function () {
      var parameters = arguments;
      var self = this;
      if (timerId) {
        clearTimeout(timerId);
        timerId = null;
      }
      timerId = setTimeout(function () {
        handler.apply(self, parameters);
      }, interval);
    };
  };

  return {
    getRandomNumber: getRandomNumber,
    hasDuplicate: hasDuplicate,
    debounce: debounce,
    escKey: ESC_KEY,
    entKey: ENTER_KEY
  };

})();
