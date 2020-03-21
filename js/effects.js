'use strict';

window.effects = (function () {
  var Effects = {
    NONE: {
      EFFECT: null
    },
    CHROME: {
      EFFECT: 'grayscale',
      UNIT: 'float',
      MIN: 0,
      MAX: 1
    },
    SEPIA: {
      EFFECT: 'sepia',
      UNIT: 'float',
      MIN: 0,
      MAX: 1
    },
    MARVIN: {
      EFFECT: 'invert',
      UNIT: 'percent',
      MIN: 0,
      MAX: 100
    },
    PHOBOS: {
      EFFECT: 'blur',
      UNIT: 'pixel',
      MIN: 0,
      MAX: 3
    },
    HEAT: {
      EFFECT: 'brightness',
      UNIT: 'float',
      MIN: 1,
      MAX: 3
    }
  };

  var ValueUnit = {
    FLOAT: 'float',
    PERCENT: 'percent',
    PIXEL: 'pixel'
  };

  var effectPicture = document.querySelector('.img-upload__preview');

  var setEffect = function (effect) {

    for (var i = 0; i < effectPicture.classList.length; i++) {
      var effectValue = effectPicture.classList[i];

      if (effectValue.indexOf('effects__preview--') === 0) {
        effectPicture.classList.remove(effectValue);
      }
    }

    effectPicture.classList.add('effects__preview--' + effect);

    var value = getEffectValue(effect);

    switch (value.UNIT) {
      case ValueUnit.FLOAT:
        effectPicture.style.filter = value.EFFECT + '(' + value.MAX + ')';
        return;
      case ValueUnit.PERCENT:
        effectPicture.style.filter = value.EFFECT + '(' + value.MAX + '%)';
        return;
      case ValueUnit.PIXEL:
        effectPicture.style.filter = value.EFFECT + '(' + value.MAX + 'px)';
        return;
      default:
        effectPicture.style.filter = null;
    }
  };

  var getDepthValue = function (currentPercent, min, max) {
    var rangeOfNumbers = max - min;
    return currentPercent * rangeOfNumbers;
  };

  var getEffectValue = function (effect) {
    return Effects[effect];
  };

  var applyEffect = function (currentPercent, effect) {
    var value = getEffectValue(effect);
    var min = value.MIN;
    var max = value.MAX;
    var effectValue = getDepthValue(currentPercent, min, max);

    switch (value.UNIT) {
      case ValueUnit.FLOAT:
        effectPicture.style.filter = value.EFFECT + '(' + effectValue + ')';
        return;
      case ValueUnit.PERCENT:
        effectPicture.style.filter = value.EFFECT + '(' + effectValue + '%)';
        return;
      case ValueUnit.PIXEL:
        effectPicture.style.filter = value.EFFECT + '(' + effectValue + 'px)';
        return;
      default:
        effectPicture.style.filter = null;
    }
  };

  return {
    setEffect: setEffect,
    applyEffect: applyEffect
  };

})();
