'use strict';

window.scale = (function () {
  var ValueScale = {
    MIN: 25,
    MAX: 100,
    STEP: 25
  };

  var initScale = function (scale) {
    var scaleControlSmaller = scale.querySelector('.scale__control--smaller');
    var scaleControlBigger = scale.querySelector('.scale__control--bigger');
    var scaleControlValue = scale.querySelector('.scale__control--value');

    var picture = document.querySelector('.img-upload__preview');

    var applyScale = function (value) {
      picture.style.transform = 'scale(' + value / 100 + ')';
      scaleControlValue.setAttribute('value', value + '%');
    };

    var getValue = function () {
      var valueString = scaleControlValue.value;
      return parseInt(valueString, 10);
    };

    var decrementScale = function () {
      var valueNum = getValue();

      if (valueNum > ValueScale.MIN) {
        var currentScale = valueNum - ValueScale.STEP;

        applyScale(currentScale);
      }
    };

    var incrementScale = function () {
      var valueNum = getValue();

      if (valueNum < ValueScale.MAX) {
        var currentScale = valueNum + ValueScale.STEP;

        applyScale(currentScale);
      }
    };

    var remove = function () {
      scaleControlSmaller.removeEventListener('click', decrementScale);
      scaleControlBigger.removeEventListener('click', incrementScale);
    };

    var reset = function () {
      applyScale(100);
    };

    scaleControlSmaller.addEventListener('click', decrementScale);
    scaleControlBigger.addEventListener('click', incrementScale);

    reset();

    return {
      remove: remove,
      reset: reset
    };

  };

  return {
    initScale: initScale
  };

})();
