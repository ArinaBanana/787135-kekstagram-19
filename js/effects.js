'use strict';

window.effects = (function () {
  var effects = {
    none: {
      EFFECT: null
    },
    chrome: {
      EFFECT: 'grayscale',
      UNIT: 'float',
      MIN: 0,
      MAX: 1
    },
    sepia: {
      EFFECT: 'sepia',
      UNIT: 'float',
      MIN: 0,
      MAX: 1
    },
    marvin: {
      EFFECT: 'invert',
      UNIT: 'percent',
      MIN: 0,
      MAX: 100
    },
    phobos: {
      EFFECT: 'blur',
      UNIT: 'pixel',
      MIN: 0,
      MAX: 3
    },
    heat: {
      EFFECT: 'brightness',
      UNIT: 'float',
      MIN: 1,
      MAX: 3
    }
  };

  var effectPicture = document.querySelector('.img-upload__preview');

  var setEffect = function (effect, getDefaultPositionToggle) {

    for (var i = 0; i < effectPicture.classList.length; i++) {
      var effectValue = effectPicture.classList[i];

      if (effectValue.indexOf('effects__preview--') === 0) {
        effectPicture.classList.remove(effectValue);
      }
    }

    effectPicture.classList.add('effects__preview--' + effect);

    var value = getEffectValue(effect);

    switch (value.UNIT) {
      case 'float':
        effectPicture.style.filter = value.EFFECT + '(' + value.MAX + ')';
        getDefaultPositionToggle();
        return;
      case 'percent':
        effectPicture.style.filter = value.EFFECT + '(' + value.MAX + '%)';
        getDefaultPositionToggle();
        return;
      case 'pixel':
        effectPicture.style.filter = value.EFFECT + '(' + value.MAX + 'px)';
        getDefaultPositionToggle();
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
    return effects[effect];
  };

  var applyEffect = function (currentPercent, effect) {
    var value = getEffectValue(effect);
    var min = value.MIN;
    var max = value.MAX;
    var effectValue = getDepthValue(currentPercent, min, max);

    switch (value.UNIT) {
      case 'float':
        effectPicture.style.filter = value.EFFECT + '(' + effectValue + ')';
        return;
      case 'percent':
        effectPicture.style.filter = value.EFFECT + '(' + effectValue + '%)';
        return;
      case 'pixel':
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
