'use strict';

window.utils = (function () {
  var getRandomNumber = function (a, b) {
    return Math.floor(Math.random() * (b - a) + a);
  };

  var hasDublicate = function (array) {
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
    hasDuplicate: hasDublicate
  };

})();
