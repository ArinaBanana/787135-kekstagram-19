'use strict';

window.utils = (function () {
  var ESC_KEY = 'Escape';

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

  return {
    getRandomNumber: getRandomNumber,
    hasDuplicate: hasDuplicate,
    escKey: ESC_KEY
  };

})();
