'use strict';

window.effects = (function () {
  var effectPicture = document.querySelector('.img-upload__preview');

  var applyEffect = function (effect) {

    for (var i = 0; i < effectPicture.classList.length; i++) {
      var effectValue = effectPicture.classList[i];

      if (effectValue.indexOf('effects__preview--') === 0) {
        effectPicture.classList.remove(effectValue);
      }
    }

    effectPicture.classList.add('effects__preview--' + effect);
  };

  return {
    applyEffect: applyEffect
  };

})();
