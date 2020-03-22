'use strict';

window.effects = (function () {
  var effects = {
    none: {
      effect: null
    },
    chrome: {
      effect: 'grayscale',
      unit: 'float',
      min: 0,
      max: 1
    },
    sepia: {
      effect: 'sepia',
      unit: 'float',
      min: 0,
      max: 1
    },
    marvin: {
      effect: 'invert',
      unit: 'percent',
      min: 0,
      max: 100
    },
    phobos: {
      effect: 'blur',
      unit: 'pixel',
      min: 0,
      max: 3
    },
    heat: {
      effect: 'brightness',
      unit: 'float',
      min: 1,
      max: 3
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

    switch (value.unit) {
      case ValueUnit.FLOAT:
        effectPicture.style.filter = value.effect + '(' + value.max + ')';
        return;
      case ValueUnit.PERCENT:
        effectPicture.style.filter = value.effect + '(' + value.max + '%)';
        return;
      case ValueUnit.PIXEL:
        effectPicture.style.filter = value.effect + '(' + value.max + 'px)';
        return;
      default:
        effectPicture.style.filter = null;
    }
  };

  var getDepthValue = function (currentPercent, min, max) {
    var rangeOfNumbers = max - min;
    return currentPercent * rangeOfNumbers + min;
  };

  var getEffectValue = function (effect) {
    return effects[effect];
  };

  var applyEffect = function (currentPercent, effect) {
    var value = getEffectValue(effect);
    var min = value.min;
    var max = value.max;
    var effectValue = getDepthValue(currentPercent, min, max);

    switch (value.unit) {
      case ValueUnit.FLOAT:
        effectPicture.style.filter = value.effect + '(' + effectValue + ')';
        return;
      case ValueUnit.PERCENT:
        effectPicture.style.filter = value.effect + '(' + effectValue + '%)';
        return;
      case ValueUnit.PIXEL:
        effectPicture.style.filter = value.effect + '(' + effectValue + 'px)';
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
